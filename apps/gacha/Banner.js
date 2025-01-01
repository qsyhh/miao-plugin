/* eslint-disable import/no-unresolved */
import lodash from "lodash"
import { Common, Data } from "#miao"
import { Character, Weapon } from "#miao.models"
import { poolNameSr, poolDetailSr } from "../../resources/meta-sr/info/index.js"
import { poolName, poolDetail, mixPoolDetail } from "../../resources/meta-gs/info/index.js"

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
// 添加混池
mixPoolDetail.forEach(k => {
  k.half += "(混池)"
  poolDetail.push(k)
})

let Banner = {
  async detail(e) {
    let isMatch = /^#(原神|星铁)?((四星|五星)?(角色|武器|光锥|up)?|.*)复刻统计$/
    let msg = e.original_msg || e.msg || ""
    if (!isMatch.test(msg)) return false
    let regRet = isMatch.exec(msg)
    let game = /星铁|光锥/.test(e.msg) ? "sr" : "gs"
    if (regRet[2] && !regRet[3] && !regRet[4]) {
      let data = Character.get(regRet[2], game) || Weapon.get(regRet[2], game)
      if (!data) return false
      data = Banner.calcSingle(data)
      // 渲染图像
      return e.reply([ await Common.render("gacha/banner-single", data, { e, scale: 1.4, retType: "base64" }) ])
    }
    let data = Banner.calcAll(regRet, game)
    // 渲染图像
    return e.reply([ await Common.render("gacha/banner-all", data, { e, scale: 1.4, retType: "base64" }) ])
  },
  calcSingle(data) {
    let type = /^character/.test(data._uuid) ? "char" : "weapon"
    let poolData = Banner._sort(data.game == "sr" ? poolDetailSr : poolDetail, "version")
    const result = { type, name: data.name, game: data.game, version_list: [] }
    let pool_list = []
    poolData.forEach(k => {
      if (k[`${type}4`]?.includes(data.name) || k[`${type}5`].includes(data.name)) pool_list.push(k)
    })
    pool_list.forEach((k, index) => {
      let modes = [ "char4", "char5", "weapon4", "weapon5" ]
      let pool_detail = { ...k, title: [], char: [], weapon: [] }
      k.char5.forEach(i => pool_detail.title.push(poolName[i] || poolNameSr[i]))
      modes.forEach(i => {
        if (!k[i]) return
        let mode = /(char|weapon)(4|5)/.exec(i)
        k[i].forEach(d => {
          let meta = mode[1] == "char" ? Character.get(d, data.game) : Weapon.get(d, data.game)
          pool_detail[mode[1]].push({
            name: meta?.sName || meta?.abbr,
            star: mode[2],
            icon: meta.getImgs?.()?.face || meta?.img
          })
        })
        pool_detail.char = Banner._sort(pool_detail.char, "star")
        pool_detail.weapon = Banner._sort(pool_detail.weapon, "star")
        if (index + 1 != pool_list.length) pool_detail.diffDay = Banner.daysSince(pool_list[index + 1].to, pool_detail.from)
      })
      result.version_list.push(pool_detail)
    })
    result.count = result.version_list.length
    result.daysDiff = Banner.daysSince(result.version_list[0].to)
    return result
  },
  calcAll(regRet, game) {
    let mode = "char5"
    if (regRet[3] || regRet[4]) mode = `${regRet[4] ? dataLists[regRet[4]] : "char"}${regRet[3] ? dataLists[regRet[3]] : 5}`
    let type = /(char|weapon)(4|5)/.exec(mode)
    let stats = { game, type: regRet[4] || "角色", star: type[2] || 5, data: {}, new_pool: { name: [], data: [] } }
    let data = Banner._sort(game == "sr" ? poolDetailSr : poolDetail, "version", true)
    data.forEach(k => {
      if (!k[mode]) return
      k[mode].forEach(i => {
        if (Blacklist.includes(i)) return
        if (!stats.data[i]) stats.data[i] = { name: i, count: 0, icon: "" }
        stats.data[i].count++
        stats.data[i].version = k.version + k.half
        stats.data[i].daysDiff = Banner.daysSince(k.to)
        stats.data[i] = { ...stats.data[i], ...k }
        if (stats.data[i].daysDiff < 0 && Banner.daysSince(k.from) < -1) stats.data[i].daysStar = Banner.daysSince(k.from)
      })
    })
    let dataMap = []
    Object.keys(stats.data).forEach(i => {
      stats.data[i].icon = type[1] == "char" ? Character.get(i, game).getImgs?.()?.face : Weapon.get(i, game)?.img
      if (stats.data[i].daysDiff < 0) {
        if (!stats.data[i].daysStar) {
          stats.new_pool.name.push(i)
          stats.new_pool.data.push(stats.data[i])
        }
      }
      dataMap.push(stats.data[i])
    })
    stats.data = Banner._sort(dataMap, "daysDiff")

    return stats
  },
  daysSince(from, to = "") {
    const today = to ? new Date(to) : new Date()
    const date = new Date(from)
    const diffInDays = Math.round((today - date) / (1000 * 60 * 60 * 24))
    return diffInDays
  },
  _sort(data, type, order = false) {
    return data.sort((a, b) => order ? a[type] - b[type] : b[type] - a[type])
  }
}

export default Banner
