import lodash from "lodash"
import CharTalent from "./CharTalent.js"
import CharWikiData from "./CharWikiData.js"
import CharMaterial from "./CharMaterial.js"
import { Cfg, Common } from "#miao"
import { miaoPath } from "#miao.path"

const CharWiki = {
  async wiki(e) {
    let mode = e.wikiMode
    let char = e.char

    if (mode === "pic") {
      let img = char.getCardImg(Cfg.get("charPicSe", false), false)
      if (img && img.img) {
        e.reply(segment.image(`file://${miaoPath}/resources/${img.img}`))
      } else {
        e.reply("暂无图片")
      }
      return true
    }
    if (char.isCustom) {
      if (mode === "wiki") return false
      return e.reply("暂不支持自定义角色")
    }
    if (!char.isRelease && Cfg.get("notReleasedData") === false) return e.reply("未实装角色资料已禁用...")

    if (mode === "wiki") {
      if (char.source === "amber") return e.reply("暂不支持该角色图鉴展示")
      return await CharWiki.render({ e, char })
    } else if (mode === "material") {
      return CharMaterial.render({ e, char })
    }
    return await CharTalent.render(e, mode, char)
  },

  async render({ e, char }) {
    let data = char.getData()
    if (char.isGs) lodash.extend(data, char.getData("weaponTypeName,elemName"))

    let datas = {
      game: char.game,
      data,
      attr: char.getAttrList(),
      detail: char.getDetail(),
      imgs: char.getImgs(),
      // 命座持有
      holding: await CharWikiData.getHolding(char.id) || {},
      usage: await CharWikiData.getUsage(char.id) || {},
      materials: char.getMaterials(),
      elem: char.elem
    }
    return await Common.render("wiki/character-wiki", datas, { e, scale: 1.4 })
  }
}

export default CharWiki
