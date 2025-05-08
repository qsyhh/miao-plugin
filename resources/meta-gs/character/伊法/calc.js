/* eslint-disable no-empty-pattern */
export const details = [
  {
    title: "E秘药弹伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["秘药弹伤害"], "e,nightsoul")
  }, {
    title: "E秘药弹治疗量",
    dmg: ({ talent, attr }, { heal }) => heal(talent.e["秘药弹命中治疗量2"][0] / 100 * attr.mastery + talent.e["秘药弹命中治疗量2"][1])
  }, {
    title: "Q技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q,nightsoul")
  }, {
    title: "Q镇静标记伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["镇静标记伤害"], "q,nightsoul")
  }, {
    title: "扩散反应伤害",
    dmg: ({}, { reaction }) => reaction("swirl")
  }, {
    check: ({ cons }) => cons > 5,
    title: "6命秘药弹伤害",
    dmg: ({}, dmg) => dmg(120, "a")
  }
]

export const defParams = { Nightsoul: true }
export const defDmgIdx = 1
export const mainAttr = "atk,cpct,cdmg,mastery"

export const buffs = [
  {
    title: "天赋-场中医者视野：80点夜魂值使扩散反应伤害提高[swirl]%",
    data: {
      swirl: ({ cons }) => (cons > 1 ? 160 : 80) * 1.5
    }
  }, {
    title: "天赋-互助救援协议：元素精通提升[mastery]点",
    data: {
      mastery: 80
    }
  }, {
    title: "伊法2命：基于夜魂值的总和超过60点的部分，每1点夜魂值都将使伊法额外获得4点「救援要义」。",
    cons: 2
  }, {
    title: "伊法4命：施放元素爆发后，伊法的元素精通提升[mastery]点",
    cons: 4,
    data: {
      mastery: 100
    }
  }
]

export const createdBy = "其实雨很好"
