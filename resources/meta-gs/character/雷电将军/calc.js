export const details = [
  {
    title: "E技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "E协同攻击伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["协同攻击伤害"], "e")
  }, {
    title: "Q梦想一刀伤害(零愿力)",
    dmg: ({ talent }, dmg) => dmg(talent.q["梦想一刀基础伤害"], "q")
  }, {
    title: "Q梦想一刀伤害(满愿力)",
    params: { type: 0, num: 60 },
    dmg: ({ talent }, dmg) => dmg(talent.q["梦想一刀基础伤害"], "q")
  }, {
    title: "Q后普攻一段伤害(满愿力)",
    params: { type: 1, num: 60 },
    dmg: ({ talent }, dmg) => dmg(talent.q["一段伤害"], "q")
  }, {
    title: "Q后重击伤害(满愿力)",
    params: { type: 1, num: 60 },
    dmg: ({ talent }, dmg) => dmg(talent.q["重击伤害"], "q")
  }
]

export const defDmgIdx = 3
export const mainAttr = "atk,cpct,cdmg,recharge,dmg"

export const buffs = [
  {
    title: "元素战技-神变·恶曜开眼：元素战技期间元素爆发伤害提升[qDmg]%",
    data: {
      qDmg: ({ talent }) => talent.e["元素爆发伤害提高"] * 90
    }
  }, {
    title: "元素爆发-梦想真说：每消耗一层诸愿百眼之轮的愿力，提升梦想一刀[_qDmg1]%的倍率，与梦想一心[_qDmg2]%的倍率",
    data: {
      _qDmg1: ({ talent }) => talent.q["愿力加成"][0],
      _qDmg2: ({ talent }) => talent.q["愿力加成"][1],
      qPct: ({ talent, params }) => "type" in params ? talent.q["愿力加成"][params.type] * params.num : 0
    }
  }, {
    title: "天赋-殊胜之御体：[_recharge]%元素充能效率，获得[dmg]%雷伤加成",
    sort: 4,
    data: {
      _recharge: ({ attr, calc }) => calc(attr.recharge),
      dmg: ({ attr, calc }) => Math.max(calc(attr.recharge) - 100, 0) * 0.4
    }
  }, {
    cons: 2,
    title: "雷电将军2命：元素爆发造成的伤害无视敌人[qIgnore]%防御力",
    data: {
      qIgnore: 60
    }
  }
]

export const createdBy = "其实雨很好"
