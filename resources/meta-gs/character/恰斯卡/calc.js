export const details = [
  {
    title: "E共鸣伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["共鸣伤害"], "e,nightsoul")
  }, {
    title: "E后普攻点按伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["多重瞄准点按伤害"], "a,nightsoul")
  }, {
    title: "E后追影弹伤害(单枚)",
    params: { cons6: true },
    dmg: ({ talent }, dmg) => dmg(talent.e["追影弹伤害"], "a2,nightsoul")
  }, {
    title: "E后追影弹伤害(六枚)",
    params: { cons6: true },
    dmg: ({ talent }, dmg) => dmg(talent.e["追影弹伤害"] * 6, "a2,nightsoul")
  }, {
    title: "E后焕光追影弹(单枚)",
    params: { cons6: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.e["焕光追影弹伤害"] * (cons > 1 ? 1.35 : 1.15), "a2,nightsoul")
  }, {
    title: "Q裂风索魂弹伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["裂风索魂弹伤害"], "q,nightsoul")
  }, {
    title: "Q索魂弹伤害(单枚)",
    dmg: ({ talent }, dmg) => dmg(talent.q["索魂弹伤害"], "q,nightsoul")
  }, {
    title: "Q溢光索魂弹伤害(单枚)",
    dmg: ({ talent }, dmg) => dmg(talent.q["溢光索魂弹伤害"], "q,nightsoul")
  }, {
    check: ({ cons }) => cons > 1,
    title: "2、4命额外范围伤害",
    dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 400 / 100, "a2")
  }
]

export const defDmgIdx = 4
export const defParams = { Nightsoul: true }
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "天赋-子弹的戏法：一种元素使焕光追影弹造成的伤害提升[_a2Dmg]%",
    data: {
      _a2Dmg: 15
    }
  }, {
    title: "恰斯卡2命：恰斯卡登场时，获得一层固有天赋「子弹的戏法」的「焕影之灵」。",
    cons: 2
  }, {
    title: "恰斯卡6命：「命袭」状态下，恰斯卡施放元素战技的多重瞄准会立即完成蓄力，并且本次多重瞄准中的追影弹和焕光追影弹的暴击伤害提升120%。",
    cons: 6,
    data: {
      a2Cdmg: ({ params }) => params.cons6 ? 120 : 0
    }
  }
]

export const createdBy = "其实雨很好"
