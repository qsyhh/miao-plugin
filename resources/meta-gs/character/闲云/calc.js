export const details = [
  {
    title: "E技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "E一段跳冲击波伤害",
    params: { btt: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e["闲云冲击波伤害"][0], "a3")
  }, {
    title: "E二段跳冲击波伤害",
    params: { btt: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.e["闲云冲击波伤害"][1], "a3")
  }, {
    title: "E三段跳冲击波伤害",
    params: { btt: 3 },
    dmg: ({ talent }, dmg) => dmg(talent.e["闲云冲击波伤害"][2], "a3")
  }, {
    title: "Q技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    title: "Q竹星伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["竹星伤害"], "q")
  }, {
    title: "Q治疗量",
    dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.atk) * talent.q["治疗量2"][0] / 100 + talent.q["治疗量2"][1])
  }, {
    title: "Q持续治疗量",
    dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.atk) * talent.q["持续治疗量2"][0] / 100 + talent.q["持续治疗量2"][1])
  }
]

export const defDmgIdx = 6
export const mainAttr = "atk,cpct,cdmg,heal"

export const buffs = [
  {
    title: "天赋-细想应是洞中仙：释放元素爆发后，下落攻击坠地冲击造成的伤害提升[a3Plus]",
    sort: 9,
    data: {
      a3Plus: ({ cons, attr, calc }) => {
        let cost = cons > 1 ? 2 : 1
        return Math.min(calc(attr.atk) * cost, 9000 * cost)
      }
    }
  }, {
    title: "闲云2命：施放元素战技后，攻击力提升[atkPct]%",
    cons: 2,
    data: {
      atkPct: 20
    }
  }, {
    title: "闲云6命：施放了1/2/3次步天梯后，闲云冲击波的暴击伤害提升15%/35%/70%",
    cons: 6,
    data: {
      a3Cdmg: ({ params }) => params.btt ? (params.btt === 3 ? 70 : params.bbt === 2 ? 35 : 15) : 0
    }
  }
]

export const createdBy = "其实雨很好"
