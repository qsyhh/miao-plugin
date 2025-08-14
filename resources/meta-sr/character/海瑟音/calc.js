export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "终结技伤害",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    title: "q后持续伤害",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.q["持续伤害"], "dot", "skillDot")
  }, {
    title: "风/火/雷属性持续伤害",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.t["风/火/雷属性持续伤害"], "dot", "skillDot")
  }, {
    title: "物理属性持续伤害",
    params: { q: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.t["物理属性持续伤害"] + (cons > 5 ? 20 : 0), "dot", "skillDot")
  }
]

export const defDmgIdx = 5
export const mainAttr = "atk,cpct,cdmg,dmg,effPct"

export const buffs = [
  {
    title: "战技-暗流后齐鸣：使敌方全体受到的伤害提高[enemydmg]%",
    data: {
      enemydmg: ({ talent }) => talent.e["伤害提高"] * 100
    }
  }, {
    title: "终结技-绝海回涛，噬魂舞曲：展开结界，使敌方目标攻击力降低15%，防御力降低[enemyDef]%",
    data: {
      enemyDef: ({ talent }) => talent.q["防御力降低"] * 100
    }
  }, {
    title: "行迹珍珠的琴弦：基于效果命中，提高造成的伤害[dmg]%",
    tree: 3,
    data: {
      dmg: ({ attr, calc }) => calc(attr.effPct) > 60 ? Math.min(Math.floor(calc(attr.effPct) - 60 / 10) * 15, 90) : 0
    }
  }, {
    title: "海瑟音1魂：在场时，我方目标造成的持续伤害为原伤害的[dotMulti]%",
    cons: 1,
    data: {
      dotMulti: 16
    }
  }, {
    title: "海瑟音4魂：结界持续期间，使敌方全体全属性抗性降低20%",
    cons: 4,
    data: {
      kx: ({ params }) => params.q ? 20 : 0
    }
  }, {
    title: "海瑟音6魂：结界持续期间，物理持续伤害造成的伤害倍率提高20%",
    cons: 6
  }
]

export const createdBy = "其实雨很好"
