import { Cfg, Common, Data } from "#miao"
import { HardChallenge, MysApi, Player } from "#miao.models"

export async function HardChallengeSummary(e) {
  let isMatch = /^#(喵喵)(幽境|危战|幽境危战)(数据)?$/.test(e.original_msg || e.msg || "")
  if (!Cfg.get("hardChallenge", false) && !isMatch) return false

  // 需要自身 ck 查询
  let mys = await MysApi.init(e, "cookie")
  if (!mys || !await mys.checkCk()) {
    if (isMatch) e.reply(mys ? `UID: ${mys.uid} Cookie失效，请重新登录或尝试【#刷新ck】` : `请绑定ck后再使用${e.original_msg || e.msg}`)
    return false
  }
  let uid = mys.uid
  let player = Player.create(e)
  let hardChallenge = await mys.getHardChallenge()
  let hardChallengePopularity = await mys.getHardChallengePopularity()
  let lvs = Data.getVal(hardChallenge, "data.0")
  // 检查是否查询到了幽境危战信息
  if (!lvs || !lvs.single.has_data) return e.reply("暂未获得本期幽境危战挑战数据...")

  let resDetail = await mys.getCharacter()
  if (!resDetail || !hardChallenge || !resDetail.avatars || resDetail.avatars.length <= 3) return e.reply("角色信息获取失败")
  delete resDetail._res
  delete hardChallenge._res

  // 更新player信息
  player.setMysCharData(resDetail)
  if (hardChallenge.data.length === 0) return e.reply("暂未获得本期幽境危战挑战数据...")

  let hc = new HardChallenge(hardChallenge.data[0], hardChallengePopularity.avatar_list)
  let hcData = hc.getData()
  let avatarIds = hc.getAvatars()
  let rawAvatarData = player.getAvatarData(avatarIds)
  let avatarData = hc.applyPopularity(rawAvatarData)

  return await Common.render("stat/hard-summary", {
    hard: hcData,
    avatars: avatarData,
    save_id: uid,
    uid
  }, { e, scale: 1.2 })
}
