/* eslint-disable import/no-unresolved */
import { Format } from "#miao"

export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技提高暴击伤害",
    dmg: ({ talent, attr, calc, cons }) => {
      let extraCdmg = cons == 6 ? 0.3 : 0
      return {
        avg: Format.percent(calc(attr.cdmg) * (talent.e["百分比爆伤"] + extraCdmg) / 100 + talent.e["额外爆伤"]),
        type: "text"
      }
    }
  }, {
    title: "终结技3层天赋提高伤害",
    dmg: ({ talent }) => {
      let dmgNum = (talent.q["天赋增伤每层额外提高"] + talent.t["伤害提高"]) * 3
      return {
        avg: Format.percent(dmgNum),
        type: "text"
      }
    }
  }
]

export const defDmgIdx = 1
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "行迹-夜想曲：单人攻击力提高[atkPct]%",
    data: {
      atkPct: 15
    }
  }, {
    title: "花火2魂：3层天赋使造成伤害时无视目标[ignore]%的防御力",
    cons: 2,
    data: {
      ignore: 8
    }
  }, {
    title: "花火6魂：战技的暴击伤害提高效果额外提高[_cdmg]%",
    sort: 9,
    cons: 6,
    data: {
      _cdmg: ({ attr, calc }) => calc(attr.cdmg) * 0.3
    }
  }
]

export const createdBy = "其实雨很好"
