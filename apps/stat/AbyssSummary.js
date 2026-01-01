import lodash from "lodash"
import moment from "moment"
import LelaerApi from "./LelaerApi.js"
import { Cfg, Common, Data } from "#miao"
import { Abyss, MysApi, Player } from "#miao.models"

export async function AbyssSummary(e) {
  let isMatch = /^#(喵喵|上传)深渊(数据)?$/.test(e.original_msg || e.msg || "")
  if (!Cfg.get("uploadAbyssData", false) && !isMatch) return false

  let mys = await MysApi.init(e, "all")
  if (!mys || !await mys.checkCk()) {
    if (isMatch) e.reply(mys ? `UID: ${mys.uid} Cookie失效，请重新登录或尝试【#刷新ck】` : `请绑定ck后再使用${e.original_msg || e.msg}`)
    return false
  }
  let uid = mys.uid
  let player = Player.create(e)
  let resDetail, resAbyss
  try {
    resAbyss = await mys.getSpiralAbyss(/上期/.test(e.original_msg || e.msg || "") ? 2 : 1)
    let lvs = Data.getVal(resAbyss, "floors.0.levels.0")
    // 检查是否查询到了深渊信息
    if (!lvs || !lvs.battles) {
      return e.reply("暂未获得本期深渊挑战数据...")
    } else if (lvs && lvs.battles && lvs.battles.length === 0) {
      if (!mys.isSelfCookie) {
        if (isMatch) e.reply(`请绑定ck后再使用${e.original_msg || e.msg}`)
        return false
      }
    }
    resDetail = await mys.getCharacter()
    if (!resDetail || !resAbyss || !resDetail.avatars || resDetail.avatars.length <= 3) return e.reply("角色信息获取失败")
    delete resDetail._res
    delete resAbyss._res
  } catch (err) {
    logger.error(err)
  }
  // 更新player信息
  player.setMysCharData(resDetail)

  let stat = []
  if (resAbyss.floors.length === 0) return e.reply("暂未获得本期深渊挑战数据...")

  let abyss = new Abyss(resAbyss)
  let abyssData = abyss.getData()
  let avatarIds = abyss.getAvatars()
  let abyssStat = abyssData?.stat || {}
  lodash.forEach({ dmg: "最强一击", takeDmg: "最高承伤", defeat: "最多击破", e: "元素战技", q: "元素爆发" }, (title, key) => {
    if (abyssStat[key]) {
      stat.push({
        title,
        id: abyssStat[key]?.id || 0,
        value: [ "dmg", "takeDmg" ].includes(key) ? `${(abyssStat[key]?.value / 10000).toFixed(1)} W` : `${abyssStat[key]?.value}次`
      })
    } else {
      stat.push({})
    }
  })
  await player.refreshTalent(avatarIds)
  let avatarData = player.getAvatarData(avatarIds)
  let upTip
  if (isMatch && abyssData?.floors?.["12"].star === 9) upTip = await LelaerApi.uploadData(uid, abyssData.floors["12"].levels, avatarData)
  return await Common.render("stat/abyss-summary", {
    abyss: abyssData,
    avatars: avatarData,
    msg: upTip ? "上传" : /上期/.test(e.original_msg || e.msg || "") ? "上期" : "",
    upTip,
    stat,
    save_id: uid,
    uid
  }, { e, scale: 1.2 })
}

export async function AbyssChallenge(e) {
  if (!Cfg.get("uploadAbyssData", false)) return false

  let mys = await MysApi.init(e, "all")
  if (!mys || !await mys.checkCk()) {
    e.reply(mys ? `UID: ${mys.uid} Cookie失效，请重新登录或尝试【#刷新ck】` : `请绑定ck后再使用${e.original_msg || e.msg}`)
    return false
  }
  let type = /上期/.test(e.original_msg || e.msg || "") ? 2 : 1
  let uid = mys.uid
  let player = Player.create(e)
  let resDetail, resAbyss
  try {
    resAbyss = await mys.getSpiralAbyss(type)
    resAbyss.floor_detail = Array.isArray(resAbyss?.all_floor_detail) ? resAbyss.all_floor_detail.filter(floor => !floor.is_fast) : []
    let lvs = Data.getVal(resAbyss, "floor_detail.0.node_1")
    // 检查是否查询到了混沌信息
    if (!lvs || resAbyss.floor_detail.length === 0) return e.reply(`暂未获得${type === 2 ? "上期" : "本期"}混沌回忆挑战数据...`)
    if (resAbyss.floor_detail.length > 4) resAbyss.floor_detail.splice(4)
    resDetail = await mys.getCharacter()
  } catch (err) {
    // logger.error(err)
  }
  // 更新player信息
  player.setMysCharData(resDetail)

  let avatarIds = []
  lodash.forEach(resAbyss.floor_detail, (floor, idx) => {
    resAbyss.floor_detail[idx].node_1.time = moment(floor.node_1.challenge_time).format("MM-DD HH:mm")
    resAbyss.floor_detail[idx].node_2.time = moment(floor.node_1.challenge_time).format("MM-DD HH:mm")
    lodash.forEach(floor.node_1.avatars, avatars => {
      if (!avatarIds.includes(avatars.id)) avatarIds.push(avatars.id)
    })
    lodash.forEach(floor.node_2.avatars, avatars => {
      if (!avatarIds.includes(avatars.id)) avatarIds.push(avatars.id)
    })
  })

  await player.refreshTalent(avatarIds)
  let avatarData = player.getAvatarData(avatarIds)
  if (Object.keys(avatarData).length !== avatarIds.length) return e.reply("角色信息获取失败")

  return await Common.render("stat/abyss-challenge", {
    type,
    abyss: resAbyss,
    avatars: avatarData,
    save_id: uid,
    uid
  }, { e, scale: 1.6 })
}
