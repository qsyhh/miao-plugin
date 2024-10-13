export const details = [
  {
    title: "E突进伤害",
    dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e["突进伤害"] * calc(attr.def) / 100, "e,nightsoul")
  },
  {
    title: "Q技能伤害",
    dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q["技能伤害"] * calc(attr.def) / 100, "q,nightsoul")
  },
  {
    title: "Q追加节拍伤害",
    dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q["追加节拍伤害"] * calc(attr.def) / 100, "q,nightsoul")
  },
  {
    title: "Q单次治疗",
    dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q["持续治疗量2"][0] * calc(attr.def) / 100 + talent.q["持续治疗量2"][1])
  },
  {
    title: "E后刃轮巡猎四段伤害",
    dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a["刃轮巡猎四段伤害"] * calc(attr.def) / 100, "a,nightsoul")
  }
]

export const defDmgIdx = 4
export const defParams = { Nightsoul: true }
export const mainAttr = "def,cpct,cdmg,heal"

export const buffs = [
  {
    title: "技能-音火锻淬：采样器在激活时降低附近的敌人的对应元素抗性[kx]%",
    data: {
      kx: ({ talent }) => talent.e["元素抗性降低"]
    }
  },
  {
    title: "天赋-四境四象回声：拥有少于两枚经过元素转化的「源音采样」，普通攻击与下落攻击造成的伤害提升[aDmg]%",
    data: {
      aDmg: 30,
      a3Dmg: 30
    }
  },
  {
    title: "希诺宁2命：根据「源音采样」的元素类型，使造成的伤害提升[dmg]%",
    cons: 2,
    data: {
      dmg: 50
    }
  },
  {
    title: "希诺宁4命：施放音火锻淬后，普通攻击、重击与下落攻击造成的伤害值提升[aPlus]",
    cons: 4,
    data: {
      aPlus: ({ attr, calc }) => calc(attr.def) * 65 / 100,
      a2Plus: ({ attr, calc }) => calc(attr.def) * 65 / 100,
      a3Plus: ({ attr, calc }) => calc(attr.def) * 65 / 100
    }
  },
  {
    title: "希诺宁6命：获得「永夜的祝福」后，普通攻击与下落攻击造成的伤害值提升[aPlus] ",
    cons: 6,
    data: {
      aPlus: ({ attr, calc }) => calc(attr.def) * 300 / 100,
      a3Plus: ({ attr, calc }) => calc(attr.def) * 300 / 100
    }
  }
]

export const createdBy = "喵喵"
