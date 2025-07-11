export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害(首次释放)",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "战技伤害(二次释放)",
    dmg: ({ talent }, { dynamic }) => dynamic(talent.e["技能伤害"], "e", { dynamicDmg: talent.e["战技伤害提高"] * 100 })
  }, {
    title: "战技伤害(四次释放)",
    dmg: ({ talent, cons }, { dynamic }) => dynamic(talent.e["技能伤害"], "e", { dynamicDmg: talent.e["战技伤害提高"] * 100 * (cons === 6 ? 3 : 2) })
  }, {
    title: "终结技伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    title: "天赋追击伤害",
    dmg: ({ talent }, dmg) => dmg(talent.t["技能伤害"], "t")
  }
]

export const defDmgIdx = 3
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "战技-伪•螺旋剑：释放战技后，使战技造成的伤害提高[_eDmg]%，可叠加2层",
    data: {
      _eDmg: ({ talent }) => talent.e["战技伤害提高"] * 100
    }
  }, {
    title: "行迹-守护者：战技点大于等于4点，暴击伤害提高[cdmg]%",
    tree: 3,
    data: {
      cdmg: 120
    }
  }, {
    title: "Archer2魂：施放终结技时，使敌方目标的量子属性的抗性降低[kx]%",
    cons: 2,
    data: {
      kx: 20
    }
  }, {
    title: "Archer4魂：造成的终结技伤害提高[qDmg]%",
    cons: 4,
    data: {
      qDmg: 150
    }
  }, {
    title: "Archer6魂：战技提供的伤害提高效果上限层数提高1层，造成的战技伤害无视[eIgnore]%的防御力",
    cons: 6,
    data: {
      eIgnore: 20
    }
  }
]

export const createdBy = "其实雨很好"
