export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "强化普攻伤害(3段)",
    params: { a2: true },
    dmg: ({ talent }, dmg) => dmg(talent.a2["技能伤害"] * 3, "a")
  }, {
    title: "强化普攻伤害(6段)",
    params: { a2: true },
    dmg: ({ talent }, dmg) => dmg(talent.a2["技能伤害"] * 6, "a")
  }, {
    title: "战技附加伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["附加伤害"], "e")
  }, {
    title: "终结技伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    check: ({ cons }) => cons > 1,
    title: "二命追击伤害",
    dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 0.6, "t")
  }
]

export const defDmgIdx = 2
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "天赋-师父，我悟了！：【师父】施放攻击或终结技后，造成的伤害提高[_aDmg]%",
    data: {
      _aDmg: ({ talent }) => talent.t["伤害提高"] * 100,
      aDmg: ({ talent, params }) => params.a2 ? talent.t["伤害提高"] * 100 : 0
    }
  }, {
    title: "三月七1魂：场上存在【师父】时，三月七速度提高[speedPct]%",
    cons: 1,
    data: {
      speedPct: 10
    }
  }, {
    title: "三月七6魂：施放终结技后，下一次强化普攻造成的暴击伤害提高50%",
    cons: 6,
    data: {
      aCdmg: ({ params }) => params.a2 ? 50 : 0
    }
  }
]

export const createdBy = "其实雨很好"
