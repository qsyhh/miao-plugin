export const details = [
  {
    title: "重击伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["重击伤害"], "a2,nightsoul")
  }, {
    title: "炽热激情状态重击伤害",
    params: { zrjq: true },
    dmg: ({ talent }, dmg) => dmg(talent.a["炽热激情状态重击伤害"], "a2,nightsoul")
  }, {
    title: "下落攻击伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["低空/高空坠地冲击伤害"][1], "a3,nightsoul")
  }, {
    title: "炽热激情状态下落攻击伤害",
    params: { zrjq: true },
    dmg: ({ talent }, dmg) => dmg(talent.a["炽热激情状态低空/高空坠地冲击伤害"][1], "a3,nightsoul")
  }, {
    title: "E突进伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["突进伤害"], "e,nightsoul")
  }, {
    title: "E炽热激情状态突进伤害",
    params: { zrjq: true },
    dmg: ({ talent }, dmg) => dmg(talent.e["炽热激情状态突进伤害"], "e,nightsoul")
  }, {
    title: "Q飞踢伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["飞踢伤害"], "q,nightsoul")
  }, {
    title: "Q炽热激情状态飞踢伤害",
    params: { zrjq: true },
    dmg: ({ talent }, dmg) => dmg(talent.q["炽热激情状态飞踢伤害"], "q,nightsoul")
  }, {
    title: "Q后「大火山崩落」伤害",
    params: { zrjq: true, jxqd: true },
    dmg: ({ talent }, dmg) => dmg(talent.q["「大火山崩落」伤害"], "a3,nightsoul")
  }
]

export const defDmgIdx = 3
export const defParams = { Nightsoul: true }
export const mainAttr = "atk,cpct,cdmg,dmg"

export const buffs = [
  {
    title: "天赋-连势，三重腾跃！：「虹色坠击」持续期间，坠地冲击能额外造成[a3Plus]的伤害",
    data: {
      a3Plus: ({ params, cons, attr, calc }) => calc(attr.atk) * ((params.zrjq || cons > 0) ? 180 : 50) / 100
    }
  }, {
    title: "天赋-英雄，二度归来！：队伍中的附近的角色触发「夜魂迸发」时，攻击力提升[atkPct]%",
    data: {
      atkPct: 35 * 2
    }
  }, {
    title: "瓦雷莎1命：「虹色坠击」持续期间，无论是否处于炽热激情状态，进行下落攻击时，坠地冲击都会改为额外造成[_a3Plus]的伤害",
    cons: 1,
    data: {
      _a3Plus: ({ attr, calc }) => calc(attr.atk) * 180 / 100
    }
  }, {
    title: "瓦雷莎4命：施放元素爆发时，不处于炽热激情状态或极限驱动状态时，提升下落攻击[_a3Plus]的伤害；处于炽热激情状态或极限驱动状态时，本次元素爆发造成的伤害提升100%。",
    cons: 4,
    data: {
      _a3Plus: ({ attr, calc }) => Math.min(calc(attr.atk) * 500 / 100, 20000),
      a3Plus: ({ params, attr, calc }) => params.zrjq ? 0 : Math.min(calc(attr.atk) * 500 / 100, 20000),
      qDmg: ({ params }) => params.zrjq ? 100 : 0
    }
  }, {
    title: "瓦雷莎6命：下落攻击与元素爆发的暴击率提升[a3Cpct]%,暴击伤害提升[a3Cdmg]%",
    cons: 6,
    data: {
      a3Cpct: 10,
      a3Cdmg: 100,
      qCpct: 10,
      qCdmg: 100
    }
  }
]

export const createdBy = "其实雨很好"
