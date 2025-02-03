export const details = [
  {
    title: "重击贯影箭伤害",
    dmg: ({ talent, attr, calc }, { basic }) => basic(talent.a["贯影箭伤害2"][0] * calc(attr.atk) / 100 + talent.a["贯影箭伤害2"][1] * calc(attr.mastery) / 100, "a2")
  }, {
    title: "重击贯影箭激化",
    dmg: ({ talent, attr, calc }, { basic }) => basic(talent.a["贯影箭伤害2"][0] * calc(attr.atk) / 100 + talent.a["贯影箭伤害2"][1] * calc(attr.mastery) / 100, "a2", "超激化")
  }, {
    title: "E技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "E技能激化",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e", "超激化")
  }, {
    title: "Q后普攻一段伤害",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.a["一段伤害"], "a2")
  }, {
    title: "Q后普攻一段激化",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.a["一段伤害"], "a2", "超激化")
  }, {
    title: "Q后普攻三段伤害",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.a["三段伤害"], "a2")
  }, {
    title: "Q后普攻三段激化",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.a["三段伤害"], "a2", "超激化")
  }
]

export const defDmgIdx = 1
export const mainAttr = "atk,cpct,cdmg,mastery"

export const buffs = [
  {
    title: "元素爆发-秘仪·瞑光贯影：暝弦矢(Q后普攻)造成的伤害提升[_a2Plus]",
    data: {
      _a2Plus: ({ talent, attr, calc }) => calc(attr.mastery) / 100 * talent.q["瞑弦矢伤害提升"],
      a2Plus: ({ params, talent, attr, calc }) => params.q ? calc(attr.mastery) / 100 * talent.q["瞑弦矢伤害提升"] : 0
    }
  }, {
    title: "天赋-砂王的赐礼：贯影箭造成的伤害值提升[_a2Plus]",
    data: {
      _a2Plus: ({ attr, calc }) => calc(attr.mastery) * 600 / 100,
      a2Plus: ({ params, attr, calc }) => params.q ? 0 : calc(attr.mastery) * 600 / 100
    }
  }, {
    title: "赛索斯1命：贯影箭的暴击率提升15%",
    cons: 1,
    data: {
      a2Cpct: ({ params }) => params.q ? 0 : 15
    }
  }, {
    title: "赛索斯2命：释放元素战技与元素爆发，雷伤加成提升[dmg]%",
    cons: 2,
    data: {
      dmg: 15 * 2
    }
  }, {
    title: "赛索斯4命：贯影箭与暝弦矢命中2名及以上的敌人元素精通提升[mastery]",
    cons: 4,
    data: {
      mastery: 80
    }
  }
]

export const createdBy = "其实雨很好"
