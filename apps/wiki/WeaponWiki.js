/* eslint-disable import/no-unresolved */
import lodash from "lodash"
import { Format, Common } from "#miao"
import { Weapon } from "#miao.models"

const wikiReg = /^(?:#|喵喵)?(?:星铁)?(.*)(资料|图鉴)$/

const WeaponWiki = {
  check(e) {
    let msg = e.original_msg || e.msg
    if (!e.msg) return false
    e.game = /星铁/.test(e.msg) ? "sr" : e.game ?? "gs"

    let ret = wikiReg.exec(msg)
    if (!ret || !ret[1] || !ret[2]) return false

    if (!Common.cfg("weapomWiki")) return false

    let weapon = Weapon.get(ret[1], e.game)
    if (!weapon) return false
    if (weapon.game !== "sr") return false

    e.msg = "#喵喵武器WIKI"
    e.weapon = weapon
    return true
  },

  async render(e) {
    let weapon = e.weapon

    let base = weapon.calcAttr(80, 6)
    lodash.forEach(base, (value, key) => {
      base[key] = Format.comma(value, 1)
    })
    return await Common.render("wiki/weapon-wiki", {
      ...weapon,
      base,
      icon: weapon.img,
      desc: weapon.desc,
      affixText: weapon.getAffixDesc("all"),
      materials: weapon.getMaterials(),
      elem: "sr"
    }, { e, scale: 2.4 })
  }
}

export default WeaponWiki
