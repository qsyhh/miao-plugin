/** 角色圣遗物评分详情 */
import ArtisMarkCfg from "../../models/artis/ArtisMarkCfg.js"
import { getProfileRefresh } from "./ProfileCommon.js"
import { Common, Meta } from "#miao"
import { Artifact, Button } from "#miao.models"

/** 角色圣遗物面板 */
export async function profileArtis(e) {
  let { uid, avatar } = e
  let profile = e._profile || await getProfileRefresh(e, avatar)
  if (!profile) return true
  if (!profile.hasArtis()) return e.reply("未能获得圣遗物详情，请重新获取面板信息后查看")
  let char = profile.char
  let { game } = char
  let charCfg = ArtisMarkCfg.getCfg(profile)

  let { attrMap } = Meta.getMeta(game, "arti")

  let artisDetail = profile.getArtisMark()
  let artisKeyTitle = Artifact.getArtisKeyTitle(game)

  // 渲染图像
  return e.reply([
    await Common.render("character/artis-mark", {
      uid,
      elem: char.elem,
      splash: profile.costumeSplash,
      imgs: profile.imgs,
      data: profile,
      costume: profile.costume ? "2" : "",
      artisDetail,
      artisKeyTitle,
      attrMap,
      charCfg,
      game,
      changeProfile: e._profileMsg
    }, { e, scale: 1.6 / 1.1, retType: "base64" }), new Button(e).profile(char, uid)
  ])
}
