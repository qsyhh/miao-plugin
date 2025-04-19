export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害",
    dmg: ({ talent }, { dynamic }) => dynamic(talent.e["技能伤害"], "e", { dynamicDmg: 20 })
  }, {
    title: "战技伤害(3目标)",
    dmg: ({ talent }, { dynamic }) => dynamic(talent.e["技能伤害"], "e", { dynamicDmg: 60 })
  }, {
    title: "战技伤害(5目标 完整)",
    dmg: ({ talent }, { dynamic }) => dynamic(talent.e["技能伤害"] * 5, "e", { dynamicDmg: 100 })
  }, {
    title: "终结技伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }
]

export const defDmgIdx = 3
export const mainAttr = "atk,cpct,cdmg,dmg"

export const buffs = [
  {
    title: "战技-分形，驱逐虚知：场上每有1个可攻击的敌方目标，本次战技造成的伤害提高20%"
  }, {
    title: "天赋-四分明哲，三重至高：对处于【质性揭露】状态的目标造成的伤害提高[dmg]%",
    data: {
      dmg: ({ talent }) => talent.t["伤害提高"] * 100
    }
  }, {
    title: "行迹-必要的留白：我方队伍中至少有2名「智识」命途角色时，我方全体造成的伤害提高[dmg]%",
    check: ({ cons }) => cons < 6,
    tree: 2,
    data: {
      dmg: 50
    }
  }, {
    title: "行迹-必要的留白：暴击伤害提高[cdmg]%，我方全体造成的伤害提高[dmg]%",
    check: ({ cons }) => cons > 5,
    tree: 2,
    data: {
      cdmg: 140,
      dmg: 50
    }
  }, {
    title: "行迹-质性的嬗变：敌方目标拥有7个不同属性的弱点，那刻夏对其造成的伤害无视[ignore]%的防御力",
    tree: 3,
    data: {
      ignore: 28
    }
  }, {
    title: "那刻夏1魂：战技击中敌方目标时，使目标防御力降低[enemyDef]%",
    cons: 1,
    data: {
      enemyDef: 16
    }
  }, {
    title: "那刻夏2魂：敌方目标入场时，使其全属性抗性降低[kx]%",
    cons: 2,
    data: {
      kx: 20
    }
  }, {
    title: "那刻夏4魂：施放战技时，攻击力提高30%，叠加2层",
    cons: 4,
    data: {
      atkPct: 30 * 2
    }
  }, {
    title: "那刻夏6魂：那刻夏造成的伤害为原伤害的130.0%。行迹【必要的留白】的2种效果都会直接触发，不再依赖我方队伍中「智识」命途角色的数量。",
    cons: 6,
    data: {
      multi: 30
    }
  }
]

export const createdBy = "其实雨很好"
