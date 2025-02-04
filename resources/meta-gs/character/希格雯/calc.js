export const details = [
  {
    title: "E激愈水球单体伤害",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e["激愈水球伤害"] / 100, "e")
  }, {
    title: "E激愈水球单体蒸发",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e["激愈水球伤害"] / 100, "e", "蒸发")
  }, {
    title: "长按E三级激愈水球单体伤害",
    params: { e3Lv: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e["激愈水球伤害"] / 100, "e")
  }, {
    title: "长按E三级激愈水球单体蒸发",
    params: { e3Lv: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e["激愈水球伤害"] / 100, "e", "蒸发")
  }, {
    title: "长按E三级激愈水球弹跳三次伤害",
    dmg: ({ talent, attr, calc }, { basic }) => {
      let dmg1 = basic(calc(attr.hp) * talent.e["激愈水球伤害"] / 100, "e", false, { dynamicDmg: 5 * 2 })
      let dmg2 = basic(calc(attr.hp) * talent.e["激愈水球伤害"] / 100, "e", false, { dynamicDmg: 5 })
      let dmg3 = basic(calc(attr.hp) * talent.e["激愈水球伤害"] / 100, "e")
      return {
        dmg: dmg1.dmg + dmg2.dmg + dmg3.dmg,
        avg: dmg1.avg + dmg2.avg + dmg3.avg
      }
    }
  }, {
    title: "长按E三级激愈水球弹跳三次蒸发",
    dmg: ({ talent, attr, calc }, { basic }) => {
      let dmg1 = basic(calc(attr.hp) * talent.e["激愈水球伤害"] / 100, "e", "蒸发", { dynamicDmg: 5 * 2 })
      let dmg2 = basic(calc(attr.hp) * talent.e["激愈水球伤害"] / 100, "e", "蒸发", { dynamicDmg: 5 })
      let dmg3 = basic(calc(attr.hp) * talent.e["激愈水球伤害"] / 100, "e", "蒸发")
      return {
        dmg: dmg1.dmg + dmg2.dmg + dmg3.dmg,
        avg: dmg1.avg + dmg2.avg + dmg3.avg
      }
    }
  }, {
    title: "长按E三级激愈水球治疗",
    dmg: ({ talent, attr, calc }, { heal }) => {
      // 三级提升治疗量5%*2
      let cost = 1 + 0.1
      // 拾取2枚源水之滴，获得20%生命之契
      // 天赋-细致入微的诊疗
      cost += Math.min(Math.floor((calc(attr.hp) * 20 / 100) / 1000) * 0.03, 0.3)
      return heal((calc(attr.hp) * talent.e["激愈水球治疗量2"][0] / 100 + talent.e["激愈水球治疗量2"][1]) * cost)
    }
  }, {
    title: "Q单次冲击伤害",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q["技能伤害"] / 100, "q")
  }, {
    title: "Q单次冲击蒸发",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q["技能伤害"] / 100, "q", "蒸发")
  }, {
    title: "1层静养后台队友E伤害提升值",
    dmg: ({ cons, attr, calc }) => {
      let everyUp = cons > 0 ? 100 : 80
      let maxUp = cons > 0 ? 3500 : 2800
      return {
        avg: Math.max(0, Math.min((Math.floor((calc(attr.hp) - 30000) / 1000) * everyUp), maxUp))
      }
    }
  }
]

export const defDmgIdx = 8
export const mainAttr = "hp,cpct,cdmg,mastery,dmg"

export const buffs = [
  {
    title: "元素战技-弹跳水疗法：每级激愈水球使弹跳伤害提升5%,治疗量提升5%",
    data: {
      eDmg: ({ params }) => params.e3Lv ? 5 * 2 : params.e2Lv ? 5 : 0
    }
  }, {
    title: "天赋-应有适当的休憩：施放弹跳水疗法，获得[dmg]%水元素伤害加成",
    data: {
      dmg: 8
    }
  }, {
    title: "天赋-细致入微的诊疗：基于当前生命之契的总和，每1000点生命之契将提升3%治疗量，最多提升30%"
  }, {
    title: "希格雯2命：元素战技或元素爆发命中敌人后，该敌人水元素抗性降低[kx]%",
    cons: 2,
    data: {
      kx: 35
    }
  }, {
    title: "希格雯6命：进行治疗时，元素爆发的暴击率提高[qCpct]%，暴击伤害提高[qCdmg]%",
    sort: 9,
    cons: 6,
    data: {
      qCpct: ({ attr, calc }) => Math.min(Math.floor(calc(attr.hp) / 1000) * 0.4, 20),
      qCdmg: ({ attr, calc }) => Math.min(Math.floor(calc(attr.hp) / 1000) * 2.2, 110)
    }
  }
]

export const createdBy = "其实雨很好"
