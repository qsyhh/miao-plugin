/* eslint-disable import/no-unresolved */
import { Format } from "#miao"

export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent, attr }, { basic }) => basic(talent.a["技能伤害"] * attr.hp, "a")
  }, {
    title: "战技生命回复(主目标)",
    dmg: ({ talent, attr }, { heal }) => heal(attr.hp * talent.e["目标治疗·百分比生命"] + talent.e["目标治疗·固定值"])
  }, {
    title: "战技生命回复(相邻目标)",
    dmg: ({ talent, attr }, { heal }) => heal(attr.hp * talent.e["相邻目标治疗·百分比生命"] + talent.e["相邻目标治疗·固定值"])
  }, {
    title: "终结技能量恢复",
    dmg: ({ talent }) => {
      return {
        avg: Format.percent(talent.q["能量恢复百分比"]),
        type: "text"
      }
    }
  }, {
    title: "终结技攻击力提高",
    dmg: ({ talent }) => {
      return {
        avg: Format.percent(talent.q["攻击力提高百分比"]),
        type: "text"
      }
    }
  }, {
    title: "天赋禳命生命回复",
    dmg: ({ talent, attr }, { heal }) => heal(attr.hp * talent.t["治疗·百分比生命"] + talent.t["治疗·百分比生命"])
  }
]

export const defDmgIdx = 1
export const mainAttr = "hp,cpct,cdmg,heal"

export const buffs = [
  {
    title: "秘技-凶煞•劾压鬼物：恐吓周围的敌人，使其攻击力降低[atkDef]%。",
    data: {
      atkDef: 25
    }
  }, {
    title: "霍霍1魂：[岁阳寄体,妖邪凭依] 当藿藿拥有【禳命】时我方全体提高[speedPct]%的速度",
    cons: 1,
    data: {
      speedPct: 12
    }
  }, {
    title: "霍霍4魂：施放战技或触发天赋为我方目标提供治疗时，最多使治疗量提高[heal]%",
    cons: 4,
    data: {
      heal: 80
    }
  }, {
    title: "霍霍6魂：为我方目标提供治疗时，使目标造成的伤害提高[dmg]%",
    cons: 6,
    data: {
      dmg: 50
    }
  }
]

export const createdBy = "其实雨很好"
