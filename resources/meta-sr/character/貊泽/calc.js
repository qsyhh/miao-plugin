export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "终结技伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    title: "天赋附加伤害",
    dmg: ({ talent }, dmg) => dmg(talent.t["附加伤害"], "t")
  }, {
    title: "天赋追击伤害",
    params: { zj: true },
    dmg: ({ talent, cons }, dmg) => {
      let cost = cons == 6 ? 0.25 : 0
      return dmg(talent.t["追加攻击伤害"] + cost, "t")
    }
  }, {
    title: "终结技后天赋追击伤害",
    params: { zj: true, q: true },
    dmg: ({ talent, cons }, dmg) => {
      let cost = cons === 6 ? 0.25 : 0
      return dmg(talent.t["追加攻击伤害"] + cost, "t")
    }
  }, {
    check: ({ cons }) => cons > 1,
    title: "二命追击伤害",
    params: { zj: true },
    dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 0.6, "t")
  }
]

export const defDmgIdx = 5
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "秘技-胁翼匿迹：貊泽在隐身状态下攻击敌人进入战斗时伤害提高[dmg]%",
    data: {
      dmg: 30
    }
  }, {
    check: ({ params }) => params.zj === true,
    title: "行迹-不折镆干：【猎物】受到的追加攻击伤害提高[tDmg]%",
    data: {
      tDmg: 25
    }
  }, {
    title: "貊泽2命：我方全体目标对成为【猎物】的敌方目标造成伤害时，暴击伤害提高[speedPct]%",
    cons: 2,
    data: {
      cdmg: 40
    }
  }, {
    check: ({ params }) => params.q === true,
    title: "貊泽4命：施放终结技时，貊泽造成的伤害提高[dmg]%",
    cons: 4,
    data: {
      dmg: 30
    }
  }, {
    title: "貊泽6命：天赋的追加攻击的伤害倍率提高[_tDmg]%",
    cons: 6,
    data: {
      _tDmg: 25
    }
  }
]

export const createdBy = "喵喵"
