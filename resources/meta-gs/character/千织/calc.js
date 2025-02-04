export const details = [
  {
    title: "E后普攻一段伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["一段伤害"], "a")
  }, {
    title: "E后重击伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["重击伤害"], "a2")
  }, {
    title: "E后下落攻击伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["低空/高空坠地冲击伤害2"][0], "a3")
  }, {
    title: "E上挑攻击伤害",
    dmg: ({ talent, attr, calc }, { basic }) => basic((calc(attr.atk) * talent.e["上挑攻击伤害2"][0] + calc(attr.def) * talent.e["上挑攻击伤害2"][1]) / 100, "e")
  }, {
    title: "E袖切斩伤害",
    dmg: ({ talent, attr, calc }, { basic }) => basic((calc(attr.atk) * talent.e["袖伤害2"][0] + calc(attr.def) * talent.e["袖伤害2"][1]) / 100, "e")
  }, {
    title: "Q技能伤害",
    dmg: ({ talent, attr, calc }, { basic }) => basic((calc(attr.atk) * talent.q["技能伤害2"][0] + calc(attr.def) * talent.q["技能伤害2"][1]) / 100, "q")
  }, {
    check: ({ cons }) => cons > 1,
    title: "2命绢切斩伤害",
    dmg: ({ talent, attr, calc }, { basic }) => basic(((calc(attr.atk) * talent.e["袖伤害2"][0] + calc(attr.def) * talent.e["袖伤害2"][1]) / 100) * 1.7, "e")
  }
]

export const defDmgIdx = 5
export const mainAttr = "atk,def,cpct,cdmg,dmg"

export const buffs = [
  {
    title: "天赋-锦上添花：队伍中附近的角色创造岩元素创造物时，获得[_dmg]%岩伤加成(单人不触发)",
    data: {
      _dmg: 20
    }
  }, {
    title: "千织6命：普攻造成的伤害提升[aPlus]",
    sort: 9,
    cons: 6,
    data: {
      aPlus: ({ attr, calc }) => calc(attr.def) * 235 / 100
    }
  }
]

export const createdBy = "其实雨很好"
