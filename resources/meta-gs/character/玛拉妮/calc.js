export const details = [
  {
    title: "E后鲨鲨撕咬基础伤害",
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e["鲨鲨撕咬基础伤害"] / 100, "a,nightsoul")
  }, {
    title: "E后鲨鲨撕咬一层伤害",
    params: { buffCount: 1 },
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e["鲨鲨撕咬基础伤害"] / 100, "a,nightsoul")
  }, {
    title: "E后鲨鲨撕咬二层伤害",
    params: { buffCount: 2 },
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e["鲨鲨撕咬基础伤害"] / 100, "a,nightsoul")
  }, {
    title: "E后巨浪鲨鲨撕咬伤害",
    params: { buffCount: 3 },
    dmg: ({ talent, calc, attr, cons }, { basic }) => basic(calc(attr.hp) * (talent.e["鲨鲨撕咬基础伤害"] + (cons > 0 ? 66 : 0)) / 100, "a,nightsoul")
  }, {
    title: "E后巨浪鲨鲨撕咬蒸发",
    params: { buffCount: 3 },
    dmg: ({ talent, calc, attr, cons }, { basic }) => basic(calc(attr.hp) * (talent.e["鲨鲨撕咬基础伤害"] + (cons > 0 ? 66 : 0)) / 100, "a,nightsoul", "vaporize")
  }, {
    title: "Q爆瀑飞弹伤害",
    dmg: ({ talent, calc, attr, cons }, { basic }) => basic(calc(attr.hp) * (talent.q["技能伤害"] / 100 + (cons > 0 ? 66 : 0)), "q,nightsoul")
  }, {
    title: "Q爆瀑飞弹蒸发",
    dmg: ({ talent, calc, attr, cons }, { basic }) => basic(calc(attr.hp) * (talent.q["技能伤害"] / 100 + (cons > 0 ? 66 : 0)), "q,nightsoul", "vaporize")
  }
]

export const defDmgIdx = 4
export const defParams = { Nightsoul: true }
export const mainAttr = "hp,cpct,cdmg,mastery"

export const buffs = [
  {
    title: "元素战技-踏鲨破浪：对敌人施加猎物标记，每层浪势充能使造成的伤害提高[_aPlus1]，拥有3层浪势充能时，造成的伤害进一步提升[_aPlus2]",
    sort: 9,
    data: {
      aPlus: ({ talent, calc, attr, params }) => {
        if (!params.buffCount) return false
        let cost = params.buffCount === 3 ? talent.e["巨浪鲨鲨撕咬伤害额外提升"] : 0
        return calc(attr.hp) * (talent.e["浪势充能伤害提升"] * params.buffCount + cost) / 100
      },
      _aPlus1: ({ talent, calc, attr }) => calc(attr.hp) * talent.e["浪势充能伤害提升"] / 100,
      _aPlus2: ({ talent, calc, attr }) => calc(attr.hp) * talent.e["巨浪鲨鲨撕咬伤害额外提升"] / 100
    }
  }, {
    title: "玛拉妮1命：进入夜魂加持状态后的第一次巨浪鲨鲨撕咬及它所触发的鲨鲨飞弹造成的伤害提升[_aPlus]",
    cons: 1,
    sort: 9,
    data: {
      _aPlus: ({ calc, attr }) => calc(attr.hp) * 66 / 100
    }
  }, {
    title: "玛拉妮4命：爆瀑飞弹造成的伤害提升[qDmg]%",
    cons: 4,
    data: {
      qDmg: 75
    }
  }
]

export const createdBy = "其实雨很好"
