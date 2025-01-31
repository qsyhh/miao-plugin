export const details = [
  {
    title: "E技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "E持续攻击伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["持续攻击伤害"], "e")
  }, {
    title: "Q技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    title: "Q梦念冲击波伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["梦念冲击波伤害"], "q")
  }, {
    title: "Q拾取点心回复生命值",
    dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.mastery) * talent.q["拾取点心回复生命值2"][0] / 100 + talent.q["拾取点心回复生命值2"][1])
  }, {
    title: "扩散反应伤害",
    dmg: ({ cons }, { reaction }) => {
      let { avg } = reaction("swirl")
      let swirlDmg = { avg }
      if (cons == 6) swirlDmg = { dmg: avg * 2, avg: avg * 1.3 }
      return swirlDmg
    }
  }, {
    check: ({ cons }) => cons > 0,
    title: "二十三夜待扩散反应",
    params: { cons1: true },
    dmg: ({ cons }, { reaction }) => {
      let { avg } = reaction("swirl")
      let swirlDmg = { avg }
      if (cons == 6) swirlDmg = { dmg: avg * 2, avg: avg * 1.3 }
      return swirlDmg
    }
  }
]

export const defDmgIdx = 4
export const mainAttr = "atk,cpct,cdmg,mastery"

export const buffs = [
  {
    title: "元素战技-秋沙歌枕巡礼：梦浮状态下，附近的角色触发的扩散反应造成的伤害提升[swirl]%",
    sort: 9,
    data: {
      swirl: ({ attr, calc, talent }) => calc(attr.mastery) * talent.e["每点精通提升扩散伤害百分比"]
    }
  }, {
    title: "元素爆发-安乐秘汤疗法：瑞希拾取梦见风名物点心并触发治疗时，治疗量提升[heal]%。",
    data: {
      heal: 100
    }
  }, {
    title: "天赋-昼想夜梦：队伍中附近的其他角色的元素类型为火元素、水元素、冰元素或雷元素的攻击命中敌人时，梦见月瑞希的元素精通提升[mastery]点",
    data: {
      mastery: 100
    }
  }, {
    title: "梦见月瑞希1命：处于二十三夜待状态下的敌人受到风元素伤害而触发扩散反应时，使此次扩散反应对该敌人造成的伤害提升[_fyplus]",
    cons: 1,
    sort: 9,
    data: {
      _fyplus: ({ attr, calc }) => calc(attr.mastery) * 11,
      fyplus: ({ attr, calc, params }) => params.cons1 ? calc(attr.mastery) * 11 : 0
    }
  }, {
    title: "梦见月瑞希2命：进入梦浮状态时，为附近的队伍中所有其他角色提供[_dmg]%火、水、冰与雷元素伤害加成",
    cons: 2,
    sort: 9,
    data: {
      // 啊？0.04%？
      _dmg: ({ attr, calc }) => calc(attr.mastery) * 0.0004
    }
  }, {
    title: "梦见月瑞6命：处于梦浮状态下时，队伍中附近的角色触发的扩散反应造成的伤害能够造成暴击，暴击率固定为[_cpct]暴击伤害固定为[_cdmg]%",
    cons: 6,
    data: {
      _cpct: 30,
      _cdmg: 100
    }
  }
]

export const createdBy = "其实雨很好"
