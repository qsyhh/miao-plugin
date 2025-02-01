export const details = [
  {
    title: "E冲天转转搭乘伤害",
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.def) * talent.e["冲天转转搭乘伤害"] / 100, "e,nightsoul")
  }, {
    title: "E冲天转转独立伤害",
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.def) * talent.e["冲天转转独立伤害"] / 100, "e,nightsoul")
  }, {
    title: "Q技能伤害",
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.def) * talent.q["技能伤害"] / 100, "q")
  }, {
    check: ({ cons }) => cons === 6,
    title: "6命护盾摧毁伤害",
    dmg: ({ calc, attr }, { basic }) => basic(calc(attr.def) * 200 / 100, "")
  }
]

export const defDmgIdx = 2
export const defParams = { Nightsoul: true }
export const mainAttr = "def,cpct,cdmg"

export const buffs = [
  {
    title: "天赋-山的回声：队伍中的附近的角色触发「夜魂迸发」后，卡齐娜的岩元素伤害加成提升[dmg]%(单人不触发)",
    data: {
      dmg: 20
    }
  }, {
    title: "天赋-坚岩之重：冲天转转造成的伤害提升[ePlus]%。",
    sort: 9,
    data: {
      ePlus: ({ calc, attr }) => calc(attr.def) * 20 / 100,
      qPlus: ({ calc, attr }) => calc(attr.def) * 20 / 100
    }
  }, {
    title: "卡齐娜4命：存在4名敌人，领域中的队伍中当前场上角色的防御力提升[defPct]%",
    cons: 4,
    data: {
      defPct: 20
    }
  }
]

export const createdBy = "其实雨很好"
