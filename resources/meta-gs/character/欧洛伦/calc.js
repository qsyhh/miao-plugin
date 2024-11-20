export const details = [
  {
    title: "E宿灵球伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["宿灵球伤害"], "e,nightsoul")
  }, {
    title: "Q秘仪伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["秘仪伤害"], "q,nightsoul")
  }, {
    title: "Q音波碰撞伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["音波碰撞伤害"], "q,nightsoul")
  }, {
    title: "Q后E宿灵球伤害",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.e["宿灵球伤害"], "e,nightsoul")
  }, {
    title: "显象超感伤害",
    dmg: ({ attr, calc, cons }, { basic }) => {
      let cost = cons > 0 ? 1.5 : 1
      return basic(calc(attr.atk) * 160 / 100 * cost, "")
    }
  }, {
    check: ({ cons }) => cons == 6,
    title: "Q后显象超感伤害",
    dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 160 / 100 * 2, "")
  }
]

export const defDmgIdx = 3
export const defParams = { Nightsoul: true }
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "天赋-夜翳的通感：「显象超感」基于欧洛伦攻击力的160%，对周围至多4名敌人造成具有夜魂性质的雷元素伤害。"
  },
  {
    title: "欧洛伦1命：对处于「夜暝」效果的影响下的敌人，固有天赋「夜翳的通感」触发的「显象超感」造成的伤害提升[_xDmg]%",
    cons: 1,
    data: {
      _xDmg: 50
    }
  },
  {
    check: ({ params }) => params.q === true,
    title: "欧洛伦2命：「灵式超感」获得8%雷元素伤害加成，元素爆发黯声回响或超音灵眼命中4名敌人，获得32%雷元素伤害加成。",
    cons: 2,
    data: {
      dmg: 40
    }
  },
  {
    check: ({ params }) => params.cons6 === true,
    title: "欧洛伦6命：施放元素爆时，将触发一次等同于原本伤害200%的「显象超感」。",
    cons: 6
  }
]

export const createdBy = "其实雨很好"
