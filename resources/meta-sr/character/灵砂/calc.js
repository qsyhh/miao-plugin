/* eslint-disable no-empty-pattern */
export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "战技生命回复",
    dmg: ({ talent, calc, attr }, { heal }) => heal(calc(attr.atk) * talent.e["回复·百分比攻击"] + talent.e["回复·固定值"])
  }, {
    title: "终结技伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    title: "终结技生命回复",
    dmg: ({ talent, calc, attr }, { heal }) => heal(calc(attr.atk) * talent.q["回复·百分比攻击"] + talent.q["回复·固定值"])
  }, {
    title: "天赋追击伤害",
    dmg: ({ talent }, dmg) => dmg(talent.t["全体伤害"], "t")
  }, {
    title: "天赋生命回复",
    dmg: ({ talent, calc, attr }, { heal }) => heal(calc(attr.atk) * talent.t["回复·百分比攻击"] + talent.t["回复·固定值"])
  }, {
    check: ({ cons }) => cons >= 4,
    title: "4魂生命回复",
    dmg: ({ calc, attr }, { heal }) => heal(calc(attr.atk) * 0.4)
  }
]

export const defDmgIdx = 6
export const mainAttr = "atk,heal,stance"

export const buffs = [
  {
    title: "行迹-朱燎：使自身攻击力/治疗量提高，[atkPct]%/[heal]%",
    tree: 1,
    data: {
      atkPct: ({ attr }) => Math.min(Math.floor(attr.stance * 0.25, 50)),
      heal: ({ attr }) => Math.min(Math.floor(attr.stance * 0.1, 20))
    }
  }, {
    title: "行迹-兰烟：施放普攻时额外恢复10点能量",
    tree: 2,
    data: {
      _energyevery: 10
    }
  }, {
    title: "灵砂1魂：敌方单位的弱点被击破其防御力降低[enemyDef]%",
    cons: 1,
    data: {
      enemyDef: 20
    }
  }, {
    check: ({ params }) => params.q === true,
    title: "灵砂2魂：施放终结技时，使我方全体击破特攻提高[stance]%",
    cons: 2,
    data: {
      stance: 40
    }
  }
]

export const createdBy = "喵喵"
