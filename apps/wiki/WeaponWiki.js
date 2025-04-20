import lodash from "lodash"
import { Format, Common } from "#miao"
import { Character, Weapon } from "#miao.models"

const wikiReg = /^(?:#|喵喵)?(?:星铁)?(.*)(资料|图鉴)$/
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

const WeaponWiki = {
  check(e) {
    let msg = e.original_msg || e.msg
    if (!e.msg) return false
    e.game = /星铁/.test(e.msg) ? "sr" : e.game ?? "gs"

    let ret = wikiReg.exec(msg)
    if (!ret || !ret[1] || !ret[2]) return false

    if (!Common.cfg("weapomWiki")) return false

    if (/专武/.test(ret[1])) {
      let char = Character.get(ret[1].replace("专武", ""), e.game)
      if (char) ret[1] = `${char.name}专武`
    }
    let weapon = Weapon.get(ret[1], [ "gs", "sr" ])
    if (!weapon) return false

    e.msg = "#喵喵武器WIKI"
    e.weapon = weapon
    return true
  },

  async render(e) {
    let weapon = e.weapon
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
}

export default WeaponWiki
