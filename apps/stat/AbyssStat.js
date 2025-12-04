import lodash from "lodash"
import LelaerApi from "./LelaerApi.js"
import { Common } from "#miao"
import { Character } from "#miao.models"

export async function ConsStat(e) {
  return e.reply("命座统计暂未适配，敬请期待~")
  // let consData = await HutaoApi.getCons()
  // let overview = await HutaoApi.getOverview()

  // if (!consData) return e.reply("角色持有数据获取失败，请稍后重试~")

  // let msg = e.msg

  // let mode = /持有/.test(msg) ? "char" : "cons"

  // let conNum = -1
  // if (mode === "cons") {
  //   lodash.forEach([ /0|零/, /1|一/, /2|二/, /3|三/, /4|四/, /5|五/, /6|六|满/ ], (reg, idx) => {
  //     if (reg.test(msg)) {
  //       conNum = idx
  //       return false
  //     }
  //   })
  // }

  // if (!consData && !consData.data) return true

  // let data = consData.data

  // let Lumine = lodash.filter(data, (ds) => ds.avatar === 10000007)[0] || {}
  // let Aether = lodash.filter(data, (ds) => ds.avatar === 10000005)[0] || {}

  // Lumine.holdingRate = (1 - Aether.holdingRate) || Lumine.holdingRate

  // let ret = []

  // lodash.forEach(data, (ds) => {
  //   let char = Character.get(ds.avatar)

  //   let data = {
  //     name: char.name || ds.avatar,
  //     abbr: char.abbr,
  //     star: char.star || 3,
  //     side: char.side,
  //     hold: ds.holdingRate
  //   }

  //   if (mode === "char") {
  //     data.cons = lodash.map(ds.rate, (c) => {
  //       c.value = c.value * ds.holdingRate
  //       return c
  //     })
  //   } else {
  //     data.cons = ds.rate
  //   }
  //   data.cons = lodash.sortBy(data.cons, [ "id" ])

  //   ret.push(data)
  // })

  // if (conNum > -1) {
  //   ret = lodash.sortBy(ret, [ `cons[${conNum}].value` ])
  //   ret.reverse()
  // } else {
  //   ret = lodash.sortBy(ret, [ "hold" ])
  // }
  // // 渲染图像
  // return await Common.render("stat/character", {
  //   chars: ret,
  //   mode,
  //   conNum,
  //   totalCount: overview?.data?.totalPlayerCount || 0,
  //   lastUpdate: consData.lastUpdate,
  //   pct: function(num) {
  //     return (num * 100).toFixed(2)
  //   }
  // }, { e, scale: 1.5 })
}

export async function AbyssPct(e) {
  if (!/使用/.test(e.msg)) return e.reply("出场率统计暂未适配，敬请期待~")
  const mode = /深渊/.test(e.msg) ? "abyss" : "hardchallenge"
  const modeName = mode === "abyss" ? "深渊" : "幽境危战"
  const abyssData = await LelaerApi.getAbyssRank(mode)

  if (!abyssData) return e.reply(`${modeName}深渊率数据获取失败，请稍后重试~`)

  let data = abyssData.data
  data = lodash.sortBy(data, "use_rate")
  data = data.reverse()

  let avatars = {}
  let ret = []
  lodash.forEach(data, (ds) => {
    if (!avatars[ds.rank_class]) {
      ret.push(ds.rank_class)
      avatars[ds.rank_class] = []
    }
    let char = Character.get(ds.name)
    if (char) {
      avatars[ds.rank_class].push({
        ...ds,
        name: char.name,
        star: char.star,
        face: char.face
      })
    }
  })

  return await Common.render("stat/abyss-pct", {
    ...abyssData,
    ret,
    avatars,
    mode,
    modeName
  }, { e, scale: 1.5 })
}
