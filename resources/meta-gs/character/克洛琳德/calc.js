export const details = [
  {
    title: "E后穿透伤害(生命之契<100%)",
    dmg: ({ talent }, dmg) => dmg(talent.e["驰猎伤害2"][1], "a")
  }, {
    title: "E后普攻伤害(生命之契>=100%)",
    dmg: ({ talent }, dmg) => dmg(talent.e["驰猎伤害2"][2], "a")
  }, {
    title: "E剑击伤害(生命之契=0%)",
    dmg: ({ talent }, dmg) => dmg(talent.e["贯夜伤害2"][0], "a")
  }, {
    title: "E强化剑击伤害(0%<生命之契<100%)",
    dmg: ({ talent }, dmg) => dmg(talent.e["贯夜伤害2"][1], "a")
  }, {
    title: "E贯夜·契令伤害(生命之契>=100%)",
    params: { maxBondOfLife: true },
    dmg: ({ talent }, dmg) => dmg(talent.e["贯夜伤害2"][2], "a")
  }, {
    title: "Q单段伤害(0%生命之契)",
    params: { BondOfLife: 0 },
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害2"][0], "q")
  }, {
    title: "Q单段伤害(100%生命之契)",
    params: { maxBondOfLife: true, BondOfLife: 100 },
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害2"][0], "q")
  }, {
    title: "Q完整伤害(100%生命之契)",
    params: { maxBondOfLife: true, BondOfLife: 100 },
    dmg: ({ talent }, dmg) => {
      let qDmg = dmg(talent.q["技能伤害2"][0], "q")
      return {
        dmg: qDmg.dmg * 5,
        avg: qDmg.avg * 5
      }
    }
  }, {
    check: ({ cons }) => cons > 0,
    title: "1命E后单次协同攻击伤害",
    dmg: ({ calc, attr }, { basic }) => basic(calc(attr.atk) * 30 / 100, "a")
  }
]

export const defDmgIdx = 4
export const mainAttr = "atk,cpct,cdmg,mastery,dmg"

export const buffs = [
  {
    // 单人不能触发，但还是算进去吧
    title: "天赋-破夜的明焰：触发雷元素反应普通攻击与残光将终造成的伤害提升[aPlus]",
    data: {
      aPlus: ({ attr, cons }) => Math.min((attr.atk * (cons > 1 ? 30 : 20) / 100 * 3), cons > 1 ? 2700 : 1800),
      qPlus: ({ attr, cons }) => Math.min((attr.atk * (cons > 1 ? 30 : 20) / 100 * 3), cons > 1 ? 2700 : 1800)
    }
  }, {
    title: "天赋-契令的酬偿：生命之契大于或等于生命值上限的100%，生命之契的数值提升或降低时，暴击率提升20% ",
    data: {
      cpct: ({ params }) => params.maxBondOfLife ? 20 : 0
    }
  }, {
    title: "克洛琳德2命：固有天赋「破夜的明焰」的效果获得强化(详情通过【#克洛琳德命座】查看)",
    cons: 2
  }, {
    title: "克洛琳德4命：每1%生命之契都将使此次残光将终造成的伤害提升2%，至多提升200%",
    cons: 4,
    data: {
      qDmg: ({ params }) => params.BondOfLife ? Math.min(params.BondOfLife * 2, 200) : 0
    }
  }, {
    title: "克洛琳德6命：施放狩夜之巡后暴击率提高[cpct]%,暴击伤害提高[cdmg]%",
    cons: 6,
    data: {
      cpct: 10,
      cdmg: 70
    }
  }, {
    title: "tip：伤害类型中生命之契默认不显示武器加成，但最终计算会计算武器加成"
  }
]

export const createdBy = "其实雨很好"
