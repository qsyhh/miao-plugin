export const details = [
  {
    title: "雷霆飞缒伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["雷霆飞缒伤害"], "a2,nightsoul")
  }, {
    title: "E技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e,nightsoul")
  }, {
    title: "Q技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q,nightsoul")
  }, {
    title: "天赋治疗量",
    dmg: ({ attr, calc }, { heal }) => heal(calc(attr.atk) * 60 / 100)
  }
]

export const defDmgIdx = 0
export const defParams = { Nightsoul: true }
export const mainAttr = "atk,cpct,cdmg,dmg"

export const buffs = [
  {
    title: "元素爆发-力的三原理：拥有至少42点夜魂值时，提高攻击力[atkPlus]点",
    data: {
      atkPlus: ({ talent, calc, attr }) => Math.min(calc(attr.atk) * 27 / 100, talent.q["最大攻击力加成"])
    }
  }, {
    title: "天赋-强化抗阻练习：攻击力提升[atkPct]%",
    data: {
      atkPct: 20
    }
  }, {
    title: "伊安珊6命：夜魂值恢复量溢出时，使队伍中自己的当前场上角色造成的伤害提升[dmg]%",
    cons: 6,
    data: {
      dmg: 25
    }
  }
]

export const createdBy = "其实雨很好"
