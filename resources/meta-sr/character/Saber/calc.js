export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "强化普攻伤害(>2目标)",
    dmg: ({ talent }, dmg) => dmg(talent.a2["技能伤害"], "a")
  }, {
    title: "强化普攻伤害(2目标)",
    dmg: ({ talent }, dmg) => dmg(talent.a2["技能伤害"] + talent.a2["额外伤害"], "a")
  }, {
    title: "强化普攻伤害(1目标)",
    dmg: ({ talent }, dmg) => dmg(talent.a2["技能伤害"] + talent.a2["额外伤害2"], "a")
  }, {
    title: "战技伤害(主目标)",
    dmg: ({ talent }, dmg) => dmg(talent.e["目标伤害"], "e")
  }, {
    title: "战技伤害(完整 0点炉心共鸣)",
    dmg: ({ talent }, dmg) => dmg(talent.e["目标伤害"] + talent.e["相邻目标伤害"] * 2, "e")
  }, {
    title: "战技伤害(完整 8点炉心共鸣)",
    params: { buff: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.e["目标伤害"] + talent.e["相邻目标伤害"] * 2 + (talent.e["倍率提高"] + (cons > 1 ? 7 : 0) / 100) * 8, "e")
  }, {
    title: "终结技伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    title: "终结技单次随机伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["随机伤害"], "q")
  }, {
    title: "终结技伤害(完整)",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"] + talent.q["随机伤害"] * 10, "q")
  }
]

export const defDmgIdx = 9
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "战技-风王铁槌：每1点【炉心共鸣】使本次战技的伤害倍率提高[_ePct]%",
    data: {
      _ePct: ({ talent, cons }) => talent.e["倍率提高"] * 100 + (cons > 1 ? 7 : 0)
    }
  }, {
    title: "天赋-龙之炉心：我方任意目标施放终结技时，Saber造成的伤害提高[dmg]%",
    data: {
      dmg: ({ talent }) => talent.t["伤害提高"] * 100
    }
  }, {
    title: "行迹-龙之骑士：暴击率提高[cpct]%",
    tree: 1,
    data: {
      cpct: 20
    }
  }, {
    title: "行迹-星之冠冕：施放战技时，暴击伤害提高50%，8点【炉心共鸣】使暴击伤害提高32%",
    tree: 3,
    data: {
      cdmg: ({ params }) => 50 + (params.buff ? 4 * 8 : 0)
    }
  }, {
    title: "Saber1魂：终结技伤害提高[qDmg]%",
    cons: 1,
    data: {
      qDmg: 60
    }
  }, {
    title: "Saber2魂：满层无视敌方目标20%的防御力。每点【炉心共鸣】额外使本次战技的伤害倍率提高7%",
    cons: 2,
    data: {
      ignore: 20
    }
  }, {
    title: "Saber4魂：风属性抗性穿透提高8%，施放三次终结技后，风属性抗性穿透提高12%",
    cons: 4,
    data: {
      kx: 20
    }
  }, {
    title: "Saber6魂：终结技伤害的风属性抗性穿透提高[qKx]%",
    cons: 6,
    data: {
      qKx: 20
    }
  }
]

export const createdBy = "其实雨很好"
