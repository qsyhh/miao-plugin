/* eslint-disable import/no-unresolved */
import lodash from "lodash"
import { Common, Data } from "#miao"
import { Character, Weapon } from "#miao.models"
import { poolDetailSr } from "../../resources/meta-sr/info/index.js"
import { poolDetail } from "../../resources/meta-gs/info/index.js"

let dataList = {
  4: "四星",
  5: "五星",
  char: "角色,up",
  weapon: "武器,光锥"
}
let Blacklist = [ "刻晴", "提纳里", "迪希雅", "狼的末路", "风鹰剑", "阿莫斯之弓", "四风原典", "和璞鸢", "天空之翼", "天空之刃", "天空之傲", "天空之卷", "天空之脊" ]
let dataLists = {}
lodash.forEach(dataList, (txt, key) => {
  Data.eachStr(txt, (t) => (dataLists[t] = key))
})

let Banner = {
  async detail(e) {
    let isMatch = /^#*(原神|星铁)?(四星|五星)?(角色|武器|光锥|up)?复刻统计$/
    let msg = e.original_msg || e.msg || ""
    if (!isMatch.test(msg)) return false
    let regRet = isMatch.exec(msg)
    e.game = "gs"
    if (e.isSr || /光锥/.test(msg)) e.game = "sr"
    let data = Banner.calculateStats(regRet, e.game)
    // 渲染图像
    return e.reply([ await Common.render("gacha/banner", data, { e, scale: 1.4, retType: "base64" }) ])
  },
  calculateStats(regRet, game) {
    let mode = "char5"
    if (regRet[2] || regRet[3]) mode = `${regRet[3] ? dataLists[regRet[3]] : "char"}${regRet[2] ? dataLists[regRet[2]] : 5}`
    let type = /(char|weapon)(4|5)/.exec(mode)
    let stats = { type: regRet[3] || "角色", star: regRet[2] || 5, data: {}, new_pool: { name: [], data: [] } }
    let data = game == "sr" ? poolDetailSr : poolDetail
    data.forEach(k => {
      k[mode].forEach(i => {
        if (Blacklist.includes(i)) return
        if (!stats.data[i]) stats.data[i] = { name: i, count: 0, icon: "" }
        stats.data[i].count++
        stats.data[i].version = k.version + k.half
        stats.data[i].daysDiff = Banner.daysSince(k.to)
      })
    })
    let dataMap = []
    Object.keys(stats.data).forEach(i => {
      stats.data[i].icon = type[1] == "char" ? Character.get(i, game).getImgs?.()?.face : Weapon.get(i, game)?.img
      if (stats.data[i].daysDiff < 0) {
        stats.new_pool.name += ` ${i}`
        stats.new_pool.data.push(stats.data[i])
      }
      dataMap.push(stats.data[i])
    })
    stats.data = dataMap.sort((a, b) => {
      return b.daysDiff - a.daysDiff
    })

    return stats
  },
  daysSince(dateString) {
    const today = new Date()
    const date = new Date(dateString)
    const diffInMs = today - date
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24))
    return diffInDays
  }
}

export default Banner
