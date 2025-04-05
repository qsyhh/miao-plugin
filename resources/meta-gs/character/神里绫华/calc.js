export const details = [
  {
    title: "普攻一段伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["一段伤害"], "a")
  }, {
    title: "E后普攻一段伤害",
    params: { e: true },
    dmg: ({ talent }, dmg) => dmg(talent.a["一段伤害"], "a")
  }, {
    title: "重击伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["重击伤害"], "a2")
  }, {
    title: "E后重击伤害",
    params: { e: true },
    dmg: ({ talent }, dmg) => dmg(talent.a["重击伤害"], "a2")
  }, {
    title: "E技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "Q单段切割伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["切割伤害"], "q")
  }, {
    title: "Q绽放伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["绽放伤害"], "q")
  }, {
    check: ({ cons }) => cons >= 2,
    title: "Q单个霜见雪关扉单段伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["切割伤害"] * 20 / 100, "q")
  }, {
    check: ({ cons }) => cons >= 2,
    title: "Q单个霜见雪关扉绽放伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["绽放伤害"], "q")
  }
]

export const defDmgIdx = 3
export const mainAttr = "atk,cpct,cdmg,dmg"

export const buffs = [
  {
    passive: 1,
    check: ({ params }) => params.e,
    title: "天赋-天罪国罪镇词：释放元素战技后普攻与重击伤害提高30%",
    data: {
      aDmg: 30,
      a2Dmg: 30
    }
  }, {
    passive: 2,
    title: "天赋-寒天宣命祝词：霰步命中敌人获得18%冰伤加成",
    data: {
      dmg: 18
    }
  }, {
    cons: 2,
    title: "神里绫华2命：施放元素爆发时，会额外释放两股规模较小的霜见雪关扉，各自能造成原本20%的伤害"
  }, {
    cons: 4,
    title: "神里绫华4命：元素爆发后敌人防御力降低30%",
    data: {
      qDef: 30
    }
  }, {
    cons: 6,
    title: "神里绫华6命：每10秒重击伤害提高[a2Dmg]%",
    data: {
      a2Dmg: 298
    }
  }
]

export const createdBy = "其实雨很好"
