import { Format } from "#miao"

export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害提高",
    dmg: ({ talent }) => {
      return {
        avg: Format.percent(talent.e["造成的伤害提高"]),
        type: "text"
      }
    }
  }, {
    title: "终结技暴伤提高",
    dmg: ({ attr, calc, talent }) => {
      return {
        avg: Format.percent(calc(attr.cdmg) * talent.q["暴伤提高·百分比"] / 100 + talent.q["暴伤提高·固定值"]),
        type: "text"
      }
    }
  }, {
    title: "天赋暴率提高",
    dmg: ({ talent, cons }) => {
      let cost = cons < 6 ? 1 : 3
      return {
        avg: Format.percent(talent.t["暴击率提高"] * cost),
        type: "text"
      }
    }
  }
]

export const defDmgIdx = 2
export const mainAttr = "atk,cdmg"

export const buffs = [
  {
    title: "星期日6命：天赋的暴击率提高效果可以叠加，最多叠加3层",
    cons: 6
  }
]

export const createdBy = "其实雨很好"
