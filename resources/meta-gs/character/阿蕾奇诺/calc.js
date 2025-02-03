export const details = [
  {
    title: "E尖刺伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["尖刺伤害"], "e")
  }, {
    title: "E切斩伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["切斩伤害"], "e")
  }, {
    title: "E血偿勒令伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["血偿勒令伤害"], "e")
  }, {
    title: "E后普攻一段伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["一段伤害"], "a")
  }, {
    title: "E后普攻一段蒸发",
    dmg: ({ talent }, dmg) => dmg(talent.a["一段伤害"], "a", "蒸发")
  }, {
    title: "Q技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    title: "Q技能蒸发",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q", "蒸发")
  }, {
    title: "Q治疗量(145%生命之契)",
    params: { BondOfLife: 145 },
    dmg: ({ attr, calc, params }, { heal }) => heal(150 / 100 * (params.BondOfLife + calc(attr.atk)))
  }, {
    check: ({ cons }) => cons > 1,
    title: "2命厄月血火伤害",
    dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 900 / 100, "")
  }
]

export const defDmgIdx = 4
export const mainAttr = "atk,cpct,cdmg,mastery,dmg"
export const defParams = { BondOfLife: 130 }

export const buffs = [
  {
    title: "普攻-斩首之邀：红死之宴状态下，每1%最大生命值的生命之契，普通攻击伤害提升[_aPlus]",
    data: {
      _aPlus: ({ talent, attr, calc, cons }) => calc(attr.atk) * 1 / 100 * (talent.a["红死之宴提升"] + (cons > 0 ? 100 : 0)) / 100,
      aPlus: ({ talent, attr, calc, params, cons }) => calc(attr.atk) * params.BondOfLife / 100 * (talent.a["红死之宴提升"] + (cons > 0 ? 100 : 0)) / 100
    }
  }, {
    title: "天赋-唯厄月可知晓：战斗状态下，获得[dmg]%火伤加成",
    data: {
      dmg: 40
    }
  }, {
    title: "阿蕾奇诺1命：红死之宴提升进一步提高100%",
    cons: 1
  }, {
    title: "阿蕾奇诺2命：回收血偿勒令·结时，将在前方唤出厄月血火，造成相当于她的攻击力900%的火元素范围伤害",
    cons: 2
  }, {
    title: "阿蕾奇诺6命：每1%生命之契使元素爆发造成的伤害提高[_qPlus]，释放元素战技后普攻与元素爆发的暴击率提高[aCpct]%，暴击伤害提高[aCdmg]%",
    cons: 6,
    data: {
      _qPlus: ({ attr, calc }) => calc(attr.atk) * 1 / 100 * 700 / 100,
      qPlus: ({ attr, calc, params }) => calc(attr.atk) * params.BondOfLife / 100 * 700 / 100,
      aCpct: 10,
      aCdmg: 70,
      qCpct: 10,
      qCdmg: 70
    }
  }, {
    title: "tip：伤害类型中生命之契默认不显示武器加成，但最终计算会计算武器加成"
  }
]

export const createdBy = "其实雨很好"
