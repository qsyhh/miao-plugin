export const details = [
  {
    title: "E黑曜星魔伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["黑曜星魔伤害"], "e,nightsoul")
  }, {
    title: "E黑曜星魔融化",
    dmg: ({ talent }, dmg) => dmg(talent.e["黑曜星魔伤害"], "e,nightsoul", "melt")
  }, {
    title: "E霜陨风暴伤害",
    dmg: ({ talent, calc, attr }, dmg) => {
      let eDmg = dmg(talent.e["霜陨风暴伤害"], "e,nightsoul")
      return {
        dmg: eDmg.dmg + calc(attr.mastery) * 0.9,
        avg: eDmg.avg + calc(attr.mastery) * 0.9
      }
    }
  }, {
    title: "E护盾吸收量",
    dmg: ({ talent, calc, attr }, { shield }) => shield(talent.e["护盾吸收量2"][0] * calc(attr.mastery) / 100 + talent.e["护盾吸收量2"][1])
  }, {
    title: "Q冰风暴伤害",
    dmg: ({ talent, calc, attr }, dmg) => {
      let qDmg = dmg(talent.q["冰风暴伤害"], "q,nightsoul")
      return {
        dmg: qDmg.dmg + calc(attr.mastery) * 12,
        avg: qDmg.avg + calc(attr.mastery) * 12
      }
    }
  }, {
    title: "Q冰风暴融化",
    dmg: ({ talent, calc, attr }, dmg) => {
      let qDmg = dmg(talent.q["冰风暴伤害"], "q,nightsoul", "melt")
      return {
        dmg: qDmg.dmg + calc(attr.mastery) * 12,
        avg: qDmg.avg + calc(attr.mastery) * 12
      }
    }
  }, {
    title: "Q宿灵之髑伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["宿灵之髑伤害"], "q,nightsoul")
  }, {
    check: ({ cons }) => cons > 0,
    title: "一命1层「星刃」伤害提升值",
    dmg: ({ calc, attr }) => {
      return {
        avg: calc(attr.mastery) * 2
      }
    }
  }, {
    check: ({ cons }) => cons > 3,
    title: "四命宿灵之髑·黑星爆炸伤害",
    dmg: ({ calc, attr }) => {
      return {
        avg: calc(attr.mastery) * 18
      }
    }
  }
]

export const defDmgIdx = 3
export const defParams = { Nightsoul: true }
export const mainAttr = "atk,cpct,cdmg,mastery"

export const buffs = [
  {
    title: "天赋-五重天的寒雨：伊兹帕帕存在期间，队伍中附近的角色触发冻结反应或融化反应后，敌人的抗性降低[kx]%",
    data: {
      kx: 20
    }
  }, {
    title: "天赋-白燧蝶的星衣：元素战技霜陨风暴造成的伤害提升[_ePlus]，元素爆发中冰风暴造成的伤害提升[_qPlus]",
    sort: 9,
    data: {
      _ePlus: ({ attr, calc }) => calc(attr.mastery) * 0.9,
      _qPlus: ({ attr, calc }) => calc(attr.mastery) * 12
    }
  }, {
    title: "茜特菈莉2命：元素精通提升[mastery]点，队伍中附近的角色触发冻结反应或融化反应后，敌人的抗性还会额外降低[kx]%",
    cons: 2,
    data: {
      mastery: 125,
      kx: 20
    }
  },
  {
    title: "茜特菈莉6命：施放元素战技时提供[dmg]%元素伤害加成",
    cons: 6,
    data: {
      dmg: 2.5 * 40
    }
  }
]

export const createdBy = "其实雨很好"
