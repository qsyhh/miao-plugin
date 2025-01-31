/* eslint-disable no-empty-pattern */

export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "强化普攻伤害(主目标单段)",
    dmg: ({ talent }, dmg) => dmg(talent.a2["前2段目标伤害"], "a")
  }, {
    // 3敌方单位
    title: "强化普攻伤害(完整)",
    dmg: ({ talent }, dmg) => dmg(talent.a2["前2段目标伤害"] * 2 + talent.a2["前2段相邻目标伤害"] * 4 + talent.a2["第3段伤害"], "a")
  }, {
    title: "战技伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    // 前两段主目标1削韧
    title: "强普超击破伤害(前2段主目标)",
    check: ({ trees }) => trees["102"] === true,
    params: { q: true },
    dmg: ({ cons }, { reaction }) => {
      // 2魂提升前两段主目标削韧值50%，故削韧1*(1+0.5)
      let cost = cons > 1 ? 1.5 : 1
      return {
        avg: reaction("superBreak").avg / 0.9 * 0.6 * 1.5 * cost
      }
    }
  }, {
    // 3敌方单位，前两段主目标1削韧，副目标0.5削韧，第三段0.5削韧
    title: "强普超击破伤害(完整)",
    check: ({ trees }) => trees["102"] === true,
    params: { q: true },
    dmg: ({ cons }, { reaction }) => {
      // 2魂提升前两段主目标削韧值50%，故共削韧 前两段主目标(1*(1+0.5)*2)+前两段相邻目标(0.5*4)+第三段削韧(0.5*3)
      let cost = cons > 1 ? 6.5 : 5.5
      return {
        avg: reaction("superBreak").avg / 0.9 * 0.6 * 1.5 * cost
      }
    }
  }, {
    title: "强普第3段击破伤害(10韧性怪1充能)",
    dmgKey: "a2_Break_1",
    params: { q: true },
    dmg: ({ talent }, { reaction }) => {
      return {
        avg: reaction("imaginaryBreak").avg / 0.9 * (10 + 2) / 4 * (talent.t["击破伤害"] + talent.t["击破倍率提高"])
      }
    }
  }, {
    title: "强普第3段击破伤害(10韧性怪10充能)",
    dmgKey: "a2_Break_10",
    params: { q: true },
    dmg: ({ talent }, { reaction }) => {
      return {
        avg: reaction("imaginaryBreak").avg / 0.9 * (10 + 2) / 4 * (talent.t["击破伤害"] + talent.t["击破倍率提高"] * 10)
      }
    }
  }, {
    check: ({ cons }) => cons === 6,
    title: "强普第3段击破伤害(10韧性怪15充能)",
    dmgKey: "a2_Break_15",
    params: { q: true },
    dmg: ({ talent }, { reaction }) => {
      return {
        avg: reaction("imaginaryBreak").avg / 0.9 * (10 + 2) / 4 * (talent.t["击破伤害"] + talent.t["击破倍率提高"] * 15)
      }
    }
  }
]

export const defDmgKey = "a2_Break_10"
// export const defDmgIdx = 2
export const mainAttr = "atk,stance"

export const buffs = [
  {
    title: "终结技-忍道•极•爱死天流：进入【结印】状态，击破特攻提高[_stance]%",
    data: {
      _stance: ({ talent }) => talent.q["击破特攻提高"] * 100,
      stance: ({ talent, params }) => params.q ? talent.q["击破特攻提高"] * 100 : 0
    }
  }, {
    title: "天赋-忍•科学•堪忍袋：10点充能使本次击破伤害倍率提高[_stancePct]%",
    data: {
      _stancePct: ({ talent }) => talent.t["击破倍率提高"] * 1000
    }
  }, {
    title: "行迹-忍法帖•枯叶：敌方目标的弱点被击破时，受到的击破伤害提高[breakEnemydmg]%",
    tree: 3,
    data: {
      breakEnemydmg: ({ attr }) => 2 + (attr.ark > 2400 ? Math.min(Math.floor(attr.atk - 2400) / 100, 8) : 0)
    }
  }, {
    title: "乱破1魂：【结印】状态期间，乱破造成的伤害无视目标15%的防御",
    cons: 1,
    data: {
      ignore: ({ params }) => params.q ? 15 : 0
    }
  }, {
    title: "乱破4魂：【结印】状态期间，我方全体速度提高50%",
    cons: 4,
    data: {
      speedPct: ({ params }) => params.q ? 50 : 0
    }
  }
]

export const createdBy = "其实雨很好"
