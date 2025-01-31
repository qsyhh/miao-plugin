export const details = [
  {
    title: "E环绕射击伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["环绕射击伤害"], "e,nightsoul")
  }, {
    title: "E环绕射击激化",
    dmg: ({ talent }, dmg) => dmg(talent.e["环绕射击伤害"], "e,nightsoul", "spread")
  }, {
    title: "E迴猎贯鳞炮伤害",
    params: { Scalespiker: true },
    dmg: ({ talent }, dmg) => dmg(talent.e["迴猎贯鳞炮伤害"], "e,nightsoul")
  }, {
    title: "E迴猎贯鳞炮激化",
    params: { Scalespiker: true },
    dmg: ({ talent }, dmg) => dmg(talent.e["迴猎贯鳞炮伤害"], "e,nightsoul", "spread")
  }, {
    title: "Q技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q,nightsoul")
  }, {
    title: "Q技能激化",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q,nightsoul", "spread")
  }, {
    title: "Q龙息伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["龙息伤害"], "q,nightsoul")
  }, {
    title: "Q龙息激化",
    dmg: ({ talent }, dmg) => dmg(talent.q["龙息伤害"], "q,nightsoul", "spread")
  }, {
    check: ({ cons }) => cons == 6,
    title: "6命弹跳攻击伤害",
    dmg: ({ calc, attr }) => {
      return {
        avg: calc(attr.atk) * 7
      }
    }
  }
]

export const defDmgIdx = 3
export const defParams = { Nightsoul: true }
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "天赋-焰灵的契约：2层「猎人心得」使本次迴猎贯鳞炮造成的伤害提高[_ePlus](单人不触发)",
    sort: 9,
    data: {
      _ePlus: ({ calc, attr }) => calc(attr.atk) * 6.4
    }
  }, {
    title: "基尼奇1命：迴猎贯鳞炮的暴击伤害提升[eCdmg]%",
    cons: 1,
    data: {
      eCdmg: ({ params }) => params.Scalespiker ? 100 : 0
    }
  }, {
    title: "基尼奇2命：元素战技命中敌人使其草元素抗性降低[kx]%，此外，基尼奇在进入夜魂加持状态下的首次迴猎贯鳞炮的伤害提升[eDmg]%",
    cons: 2,
    data: {
      kx: 30,
      eDmg: ({ params }) => params.Scalespiker ? 100 : 0
    }
  }, {
    title: "基尼奇4命：向伟大圣龙致意造成的伤害提升[qDmg]%",
    cons: 4,
    data: {
      qDmg: 70
    }
  }
]

export const createdBy = "其实雨很好"
