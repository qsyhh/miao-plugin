import lodash from "lodash"
import { Cfg, Common, Data } from "#miao"
import { RoleCombat, MysApi, Player } from "#miao.models"

export async function RoleCombatSummary(e) {
  let isMatch = /^#(喵喵)(幻想|幻境|剧诗|幻想真境剧诗)(数据)?$/.test(e.original_msg || e.msg || "")
  if (!Cfg.get("roleCombat", false) && !isMatch) return false
  // 需要自身 ck 查询
  let mys = await MysApi.init(e, "cookie")
  if (!mys || !await mys.checkCk()) {
    if (isMatch) e.reply(mys ? `UID: ${mys.uid} Cookie失效，请重新登录或尝试【#刷新ck】` : `请绑定ck后再使用${e.original_msg || e.msg}`)
    return false
  }
  let uid = mys.uid
  let player = Player.create(e)
  let resDetail, resRole
  try {
    resRole = await mys.getRoleCombat(true)
    let lvs = Data.getVal(resRole, "data.0")
    // 检查是否查询到了幻想真境剧诗信息
    if (!lvs || !lvs.has_detail_data) return e.reply("暂未获得本期幻想真境剧诗挑战数据...")

    resDetail = await mys.getCharacter()
    if (!resDetail || !resRole || !resDetail.avatars || resDetail.avatars.length <= 3) return e.reply("角色信息获取失败")
    delete resDetail._res
    delete resRole._res
  } catch (err) {
    // logger.error(err);
  }

  // 更新player信息
  player.setMysCharData(resDetail)

  if (resRole.data.length === 0) return e.reply("暂未获得本期幻想真境剧诗挑战数据...")
  let role = new RoleCombat(resRole.data[0])
  let roleData = role.getData()
  let ownAvatarIds = role.getOwnAvatars()
  let ownAvatarData = player.getAvatarData(ownAvatarIds)
  let otherAvatarData = role.getOtherAvatarsData()

  let avatarData = lodash.merge(ownAvatarData, otherAvatarData)
  return await Common.render("stat/role-summary", {
    role: roleData,
    avatars: avatarData,
    save_id: uid,
    uid
  }, { e, scale: 1.2 })
}
