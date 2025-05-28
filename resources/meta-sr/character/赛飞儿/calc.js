export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害(主目标)",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "战技伤害(完整)",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"] + talent.e["相邻目标伤害"] * 2, "e")
  }, {
    title: "终结技首段单体伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    title: "终结技伤害(完整)",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"] + talent.q["相邻目标伤害"] * 3, "q")
  }, {
    title: "天赋追击伤害",
    params: { t: true },
    dmg: ({ talent }, dmg) => dmg(talent.t["技能伤害"], "t")
  }, {
    check: ({ cons }) => cons > 3,
    title: "四魂附加伤害",
    dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 0.5)
  }
]

export const defDmgIdx = 5
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "战技-嘿，空手套白银：攻击力提高[atkPct]%",
    data: {
      atkPct: 30
    }
  }, {
    check: ({ attr, calc }) => calc(attr.speed) >= 140,
    title: "行迹-神行宝鞋：当前速度[_speed]，速度大于等于[_speedScale]时，暴击率提高[cpct]%",
    tree: 1,
    data: {
      _speed: ({ attr, calc }) => calc(attr.speed),
      _speedScale: ({ attr, calc }) => calc(attr.speed) < 170 ? 140 : 170,
      cpct: ({ attr, calc }) => calc(attr.speed) < 170 ? 25 : 50
    }
  }, {
    title: "行迹-偷天换日：天赋的追加攻击造成的暴击伤害提高[tCdmg]%。在场时，敌方全体目标受到的伤害提高[enemydmg]%",
    tree: 3,
    data: {
      tCdmg: 100,
      enemydmg: 40
    }
  }, {
    title: "赛飞儿1魂：施放天赋的追加攻击时，攻击力提高80%",
    cons: 1,
    data: {
      atkPct: ({ params }) => params.t ? 80 : 0
    }
  }, {
    title: "赛飞儿2魂：击中敌方目标时，使其受到的伤害提高[enemydmg]%",
    cons: 2,
    data: {
      enemydmg: 30
    }
  }, {
    title: "赛飞儿6魂：天赋的追加攻击造成的伤害提高[tDmg]%",
    cons: 6,
    data: {
      tDmg: 350
    }
  }
]

export const createdBy = "其实雨很好"
