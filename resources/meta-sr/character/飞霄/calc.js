export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "终结技最多造成伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["最多造成伤害"], "q")
  }, {
    title: "终结技结束伤害",
    params: { cons1: true },
    dmg: ({ talent }, dmg) => dmg(talent.q["最后造成伤害"], "q")
  }, {
    title: "天赋追加伤害",
    dmg: ({ talent, cons }, dmg) => {
      let talentConfig = cons === 6 ? "q,t" : "t"
      return dmg(talent.t["追加攻击伤害"], `${talentConfig}`)
    }
  }
]

export const defDmgIdx = 2
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "天赋-雷狩：发动天赋攻击时使自身造成的伤害提高[dmg]%",
    data: {
      dmg: ({ talent }) => talent.t["造成伤害提高"] * 100
    }
  }, {
    title: "行迹-解形：追加攻击的暴击伤害提高[tCpct]%",
    tree: 2,
    data: {
      tCpct: 36
    }
  }, {
    title: "行迹-电举：施放战技时，攻击力提高[atkPct]%",
    tree: 3,
    data: {
      atkPct: 48
    }
  }, {
    title: "飞霄1魂：5层buff，使终结技伤害额外提高[_qPlus]",
    cons: 1,
    data: {
      _qPlus: ({ talent, attr, calc }) => calc(attr.atk) * talent.q["最后造成伤害"] * 10 / 100 * 5,
      qPlus: ({ talent, attr, calc, params }) => params.cons1 ? calc(attr.atk) * talent.q["最后造成伤害"] * 10 / 100 * 5 : 0
    }
  }, {
    title: "飞霄4魂：发动天赋的追加攻击时速度提高[speedPct]%",
    cons: 4,
    data: {
      speedPct: 8
    }
  }, {
    title: "飞霄6魂：终结技抗性穿透提高[qKx]%,天赋的追加攻击伤害同时视为终结技伤害，并且伤害提高[tPlus]",
    cons: 6,
    data: {
      qKx: 20,
      tPlus: ({ attr, calc }) => calc(attr.atk) * 140 / 100
    }
  }
]

export const createdBy = "其实雨很好"
