import lodash from "lodash"
import Calendar from "./wiki/Calendar.js"
import TodayMaterial from "./wiki/TodayMaterial.js"
import CharTalent from "./wiki/CharTalent.js"
import CharWiki from "./wiki/CharWiki.js"
import CalendarSr from "./wiki/CalendarSr.js"
import CalendarZzz from "./wiki/CalendarZzz.js"
import { Format, Common } from "#miao"
import { Character, Weapon } from "#miao.models"

const attrName = {
  hp: "生命值",
  atk: "攻击力",
  def: "防御力",
  cpct: "暴击率",
  cdmg: "暴击伤害",
  recharge: "充能效率",
  mastery: "元素精通",
  phy: "物伤加成"
}

export class wiki extends plugin {
  constructor() {
    super({
      name: "喵喵:角色资料",
      dsc: "角色资料",
      event: "message",
      priority: 50,
      rule: [
        {
          reg: "#喵喵角色WIKI",
          fnc: "wiki"
        },
        {
          reg: "^#?(星铁|绝区零)?(喵喵)?.+(资料|图鉴)$",
          fnc: "weaponWiki"
        },
        {
          reg: "^#(星铁|绝区零)?(喵喵)?(日历|日历列表)$",
          fnc: "calendar"
        },
        {
          reg: "^#(今日|今天|每日|我的|明天|明日|周([1-7]|一|二|三|四|五|六|日))*(素材|材料|天赋)[ |0-9]*$",
          fnc: "today"
        },
        {
          reg: "^#(星铁)?昔涟忆灵技$",
          fnc: "cyreneSkill"
        }
      ]
    })
  }

  accept(e) {
    let msg = e.original_msg || e.msg
    if (!e.msg) return false
    e.game = /星铁|开拓者/.test(e.msg) ? "sr" : e.game ?? "gs"

    let ret = /^(?:#|喵喵)?(?:星铁)?(.*)(天赋|技能|行迹|命座|命之座|星魂|资料|图鉴|照片|写真|图片|图像)$/.exec(msg)
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
    e.msg = "#喵喵角色WIKI"
    e.char = char
    return true
  }

  async wiki(e) {
    return await CharWiki.wiki(e)
  }

  async weaponWiki(e) {
    if (!Common.cfg("weapomWiki")) return false

    let ret = /^(?:#|喵喵)?(?:星铁)?(.*)(资料|图鉴)$/.exec(e.msg)
    if (!ret || !ret[1] || !ret[2]) return false

    if (/专武/.test(ret[1])) {
      let char = Character.get(ret[1].replace("专武", ""), e.game)
      if (char) ret[1] = `${char.name}专武`
    }
    let weapon = Weapon.get(ret[1], [ "gs", "sr" ])
    if (!weapon) return false

    e.msg = "#喵喵武器WIKI"
    let data = weapon.getData("typeName,gacha,desc,maxLv,maxPromote")

    let base = weapon.calcAttr(data.maxLv, data.maxPromote)
    lodash.forEach(base, (value, key) => {
      if (key === "attr") {
        if (!base.attr.value) return
        base.attr.key = attrName[base.attr.key]
        base.attr.value = base.attr.key === "元素精通" ? Format.comma(base[key].value, 1) : Format.pct(base[key].value, 1)
        return
      }
      base[key] = Format.comma(value, 1)
    })
    return await Common.render("wiki/weapon-wiki", {
      base,
      ...weapon,
      ...data,
      affixText: weapon.getAffixDesc("all"),
      materials: weapon.getMaterials(),
      elem: weapon.game === "gs" ? "hydro" : "sr"
    }, { e, scale: 2.4 })
  }

  async calendar(e) {
    if (e.game === "sr") {
      return await CalendarSr.render(e)
    } else if (e.game === "zzz") {
      return await CalendarZzz.render(e)
    }
    return await Calendar.render(e)
  }

  async today(e) {
    return await TodayMaterial.render(e)
  }

  async cyreneSkill(e) {
    let char = Character.get(1415, e.game)
    let lvs = []
    for (let i = 1; i <= 15; i++) {
      lvs.push("Lv" + i)
    }
    let detail = JSON.parse(JSON.stringify(char.getDetail()))
    lodash.forEach(detail.talent.me2list, (ds, idx) => {
      let desc = CharTalent.getDesc(ds.desc, ds.tables, 5)
      ds.desc = desc.desc
      ds.tables = desc.tables
    })
    return await Common.render("wiki/cyrene-talent", {
      saveId: `talent-${char.id}`,
      game: "sr",
      mode: "talent",
      ...char.getData(),
      detail,
      imgs: char.getImgs(),
      lvs,
      line: CharTalent.getLineData(char)
    }, { e, scale: 1.6 })
  }
}
