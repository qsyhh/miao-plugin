export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害(主目标)",
    dmg: ({ talent }, dmg) => dmg(talent.e["目标伤害"], "e")
  }, {
    title: "战技伤害(完整)",
    dmg: ({ talent }, dmg) => dmg(talent.e["目标伤害"] + talent.e["相邻目标伤害"] * 2, "e")
  }, {
    title: "战技生命恢复",
    dmg: ({ calc, attr, talent }, { heal }) => heal(calc(attr.atk) * talent.e["回复·百分比攻击"] + talent.e["回复·固定值"])
  }, {
    title: "终结技反击伤害(主目标)",
    params: { q: true, fj: true, cons2: true },
    dmg: ({ talent }, dmg) => dmg(talent.q["反击·目标伤害"], "t")
  }, {
    title: "终结技反击伤害(不含随机单体)",
    params: { q: true, fj: true, cons2: true },
    dmg: ({ talent }, dmg) => dmg(talent.q["反击·目标伤害"] + talent.q["反击·相邻目标伤害"] * 2, "q")
  }, {
    title: "终结技【勘破·灭】随机单体伤害",
    params: { q: true, fj: true, cons2: true },
    dmg: ({ talent, cons }, dmg) => {
      let cost = cons > 0 ? 9 : 6
      return dmg(talent.q["勘破灭·随机伤害"] * cost, "q")
    }
  }, {
    title: "天赋反击伤害(主目标)",
    params: { fj: true, cons2: true },
    dmg: ({ talent }, dmg) => dmg(talent.t["反击·目标伤害"], "t")
  }, {
    title: "天赋反击伤害(完整)",
    params: { fj: true, cons2: true },
    dmg: ({ talent }, dmg) => dmg(talent.t["反击·目标伤害"] + talent.t["反击·相邻目标伤害"] * 2, "t")
  }
]

export const defDmgIdx = 4
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    check: ({ params }) => params.q === true,
    title: "终结技-剑为地纪，刃惊天宗：下一次反击造成的暴击伤害提高[cdmg]%",
    data: {
      cdmg: ({ talent }) => talent.q["暴击伤害提高"] * 100
    }
  }, {
    check: ({ params }) => params.fj === true,
    title: "行迹-真刚：施放反击时，云璃的攻击力提高[atkPct]%",
    tree: 3,
    data: {
      atkPct: 30
    }
  }, {
    title: "云璃1命：【勘破•斩】与【勘破•灭】造成的伤害提高[qDmg]%，【勘破•灭】的额外伤害段数增加3次。",
    cons: 1,
    data: {
      qDmg: 20
    }
  }, {
    check: ({ params }) => params.cons2 === true,
    title: "云璃2命：发动反击造成伤害时无视敌方目标[ignore]%的防御力。",
    cons: 2,
    data: {
      ignore: 20
    }
  }, {
    check: ({ params }) => params.q === true,
    title: "云璃6命：发动【勘破•斩】或【勘破•灭】造成伤害时暴击率提高[cpct]%，物理属性抗性穿透提高[kx]%",
    cons: 6,
    data: {
      cpct: 15,
      kx: 20
    }
  }
]
