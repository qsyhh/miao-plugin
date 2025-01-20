export const details = [
  {
    title: "E翦月环伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["翦月环伤害"], "e")
  }, {
    title: "E翦月环染色伤害",
    dmg: ({ talent, cons }, dmg) => {
      let cost = cons > 0 ? 2 : 1
      return dmg(talent.e["翦月环伤害"] * 1.5 * cost, "e")
    }
  }, {
    title: "E护盾吸收量",
    dmg: ({ talent, calc, attr }, { shield }) => shield(talent.e["护盾吸收量2"][0] * calc(attr.atk) / 100 + talent.e["护盾吸收量2"][1])
  }, {
    title: "Q单次伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"][0], "q")
  }
]

export const defDmgIdx = 2
export const mainAttr = "atk,cpct,cdmg,mastery"

export const buffs = [
  {
    title: "天赋-四戈封刀灵卜：元素战技凤缕随翦舞使凤缕护盾发生了元素转化时，蓝砚向敌人抛出的翦月环将附加原本[_dmg]%对应元素伤害",
    data: {
      _dmg: 50
    }
  }, {
    title: "天赋-苍翎镇邪敕符：元素战技凤缕随翦舞与元素爆发鹍弦踏月出造成的伤害值提升，提升值分别为[ePlus]/[qPlus]",
    sort: 9,
    data: {
      ePlus: ({ attr, calc }) => calc(attr.mastery) * 0.309,
      qPlus: ({ attr, calc }) => calc(attr.mastery) * 0.774
    }
  }, {
    title: "蓝砚1命：触发固有天赋四戈封刀灵卜中的元素转化后，元素战技向敌人抛出翦月环时，将额外抛出一枚翦月环。",
    cons: 1
  }, {
    title: "蓝砚4命：施放元素爆发后，元素精通提升[mastery]点",
    cons: 4,
    data: {
      mastery: 60
    }
  }
]

export const createdBy = "其实雨很好"
