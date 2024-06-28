/* eslint-disable import/no-unresolved */
import lodash from "lodash"
import { Cfg, Common } from "#miao"
import { miaoPath } from "#miao.path"
import { Character } from "#miao.models"
import CharTalent from "./CharTalent.js"
import CharWikiData from "./CharWikiData.js"
import CharMaterial from "./CharMaterial.js"

const wikiReg = /^(?:#|喵喵)?(?:星铁)?(.*)(天赋|技能|行迹|命座|命之座|星魂|资料|图鉴|照片|写真|图片|图像)$/

const CharWiki = {
  check(e) {
    let msg = e.original_msg || e.msg
    if (!e.msg) return false

    let ret = wikiReg.exec(msg)
    if (!ret || !ret[1] || !ret[2]) return false

    let mode = "talent"
    if (/(命|星魂)/.test(ret[2])) {
      mode = "cons"
    } else if (/(图鉴|资料)/.test(ret[2])) {
      mode = "wiki"
      if (!Common.cfg("charWiki")) return false
    } else if (/图|画|写真|照片/.test(ret[2])) {
      mode = "pic"
      if (!Common.cfg("charPic")) return false
    } else if (/(材料|养成|成长)/.test(ret[2])) {
      mode = "material"
    }
    if ([ "cons", "talent" ].includes(mode) && !Common.cfg("charWikiTalent")) return false

    let char = Character.get(ret[1], e.game)
    if (!char || (char.isCustom && mode !== "pic")) return false

    e.wikiMode = mode
    e.msg = "#喵喵WIKI"
    e.char = char
    return true
  },

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
      return await e.reply("暂不支持自定义角色")
    }
    if (!char.isRelease && Cfg.get("notReleasedData") === false) return await e.reply("未实装角色资料已禁用...")

    if (mode === "wiki") {
      if (char.source === "amber") return await e.reply("暂不支持该角色图鉴展示")

      if (char.isSr) return await e.reply("暂不支持星铁角色")
      return await CharWiki.render({ e, char })
    } else if (mode === "material") {
      return CharMaterial.render({ e, char })
    }
    return await CharTalent.render(e, mode, char)
  },

  async render({ e, char }) {
    let data = char.getData()
    lodash.extend(data, char.getData("weaponTypeName,elemName"))
    // 命座持有
    let holding = await CharWikiData.getHolding(char.id)
    let usage = await CharWikiData.getUsage(char.id)
    return await Common.render("wiki/character-wiki", {
      data,
      attr: char.getAttrList(),
      detail: char.getDetail(),
      imgs: char.getImgs(),
      holding,
      usage,
      materials: char.getMaterials(),
      elem: char.elem
    }, { e, scale: 1.4 })
  }
}

export default CharWiki
