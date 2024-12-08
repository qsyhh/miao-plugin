/* eslint-disable import/no-unresolved */
import { Format } from "#miao"

export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "强化普攻伤害(主目标)",
    dmg: ({ talent }, dmg) => dmg(talent.a2["技能伤害"], "a")
  }, {
    title: "强化普攻伤害(完整)",
    dmg: ({ talent }, dmg) => dmg(talent.a2["单体伤害"] + talent.a2["相邻目标伤害"] * 2, "a")
  }, {
    title: "战技击破特攻提高",
    dmg: ({ talent }) => {
      return {
        avg: Format.percent(talent.e["击破特攻提高"]),
        type: "text"
      }
    }
  }, {
    title: "终结技伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    title: "普攻·超击破伤害",
    dmg: ({ cons, talent }, { reaction }) => {
      let cost = cons > 5 ? 1.5 : 1
      return {
        avg: reaction("superBreak").avg / 0.9 * talent.t["超击破伤害"] * cost
      }
    }
  }, {
    title: "强化普攻·超击破伤害",
    dmg: ({ cons, talent }, { reaction }) => {
      let cost = cons > 5 ? 1.5 : 1
      return {
        avg: reaction("superBreak").avg / 0.9 * talent.t["超击破伤害"] * cost * 3
      }
    }
  }
]

export const defDmgIdx = 6
export const mainAttr = "atk,stance"

export const buffs = [
  {
    title: "战技-有道祥见，衔书摇风：持有【狐祈】的我方目标每次施放攻击时，忘归人使受到攻击的敌方目标防御力降低[enemyDef]%",
    data: {
      enemyDef: ({ talent }) => talent.e["防御力降低"] * 100
    }
  }, {
    title: "行迹-涂山玄设：使自身击破特攻提高[stance]%",
    tree: 2,
    data: {
      stance: 40
    }
  }, {
    title: "忘归人6魂：忘归人的弱点击破效率提高50%",
    cons: 6
  }
]

export const createdBy = "其实雨很好"
