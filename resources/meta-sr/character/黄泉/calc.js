export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent, cons }, dmg) => {
      return cons < 6 ? dmg(talent.a["技能伤害"], "a") : dmg(talent.a["技能伤害"], "a,q")
    }
  }, {
    title: "战技伤害(主目标)",
    dmg: ({ talent, cons }, dmg) => {
      let cost = cons < 6 ? "e" : "e,q"
      return dmg(talent.e["单体伤害"], `${cost}`)
    }
  }, {
    title: "战技伤害(完整)",
    dmg: ({ talent, cons }, dmg) => {
      let cost = cons < 6 ? "e" : "e,q"
      return dmg(talent.e["单体伤害"] + talent.e["相邻目标伤害"] * 2, `${cost}`)
    }
  }, {
    title: "终结技伤害·对单",
    params: { q: true },
    dmg: ({ talent, trees }, dmg) => dmg(talent.q["单体伤害"] + trees["103"] ? 1.5 : 0, "q")
  }, {
    title: "终结技伤害·对无花目标",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.q["相邻目标伤害"], "q")
  }
]

export const defDmgIdx = 3
export const mainAttr = "atk,cpct,cdmg,dmg"

export const buffs = [
  {
    title: "天赋-红叶时雨，万倾一空：终结技期间使敌方全属性抗性降低[_kx]%",
    data: {
      _kx: ({ talent }) => talent.t["全属性抗性降低"] * 100,
      kx: ({ talent, params }) => params.q ? talent.t["全属性抗性降低"] * 100 : 0
    }
  }, {
    title: "行迹-奈落：黄泉普攻、战技、终结技造成的伤害为原伤害的160%",
    tree: 2,
    data: {
      multi: 60
    }
  }, {
    title: "行迹-雷心：黄泉造成的伤害提高[dmg]%，终结技额外造成150%攻击力的伤害（仅在对单时计算）",
    tree: 3,
    data: {
      dmg: 90
    }
  }, {
    title: "黄泉1魂：对处于负面状态敌方造成伤害时暴击率提高[cpct]%",
    cons: 1,
    data: {
      cpct: 18
    }
  }, {
    title: "黄泉4魂：使敌方陷入终结技易伤状态，受到终结技伤害提高[qEnemydmg]%",
    cons: 4,
    data: {
      qEnemydmg: 8
    }
  }, {
    title: "黄泉6魂：造成的终结技伤害全属性抗性穿透提高[kx]%，释放的普攻、战技伤害同时视为终结技伤害",
    cons: 6,
    data: {
      kx: 20
    }
  }
]

export const createdBy = "其实雨很好"
