export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害(主目标)",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e["技能伤害"], "e")
  }, {
    title: "战技伤害(完整)",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * (talent.e["技能伤害"] + talent.e["相邻目标伤害"] * 2), "e")
  }, {
    title: "终结技/天赋回复",
    dmg: ({ talent, calc, attr }, { heal }) => heal(calc(attr.hp) * talent.q["生命值回复"])
  }, {
    title: "终结技伤害(主目标)",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q["技能伤害"], "q")
  }, {
    title: "终结技伤害(完整)",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * (talent.q["技能伤害"] + talent.q["相邻目标伤害"] * 2), "q")
  }, {
    title: "弑王成王伤害(主目标)",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e2["弑王成王技能伤害"], "e2")
  }, {
    title: "弑王成王伤害(完整)",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * (talent.e2["弑王成王技能伤害"] + talent.e2["弑王成王相邻目标伤害"] * 2), "e2")
  }, {
    title: "弑神登神伤害(主目标)",
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let td = talent.e2["弑神登神技能伤害"]
      if (cons === 1) td += 0.3
      return basic(calc(attr.hp) * td, "e2")
    }
  }, {
    title: "弑神登神伤害(完整)",
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let td = talent.e2["弑神登神技能伤害"] + talent.e2["弑神登神相邻目标伤害"] * 2
      if (cons === 1) td = (talent.e2["弑神登神技能伤害"] + 0.3) * 3
      return basic(calc(attr.hp) * td, "e2")
    }
  }
]

export const defDmgIdx = 9
export const mainAttr = "hp,cpct,cdmg"

export const buffs = [
  {
    title: "天赋-以血还血：【血仇】状态下生命上限提高[hpPlus]",
    data: {
      hpPlus: ({ attr, calc }) => calc(attr.hp) * 50 / 100
    }
  }, {
    check: ({ attr, calc }) => calc(attr.hp) >= 4100,
    title: "行迹-血祥罩衫：[_hp]生命上限使暴击率提高[cpct]%，受到治疗时的回复量提高[heal]",
    tree: 3,
    data: {
      _hp: ({ attr, calc }) => calc(attr.hp),
      cpct: ({ attr, calc }) => Math.min(Math.floor((calc(attr.hp) - 4000) / 100) * 1.2, 48),
      heal: ({ attr, calc }) => Math.min(Math.floor((calc(attr.hp) - 4000) / 100) * 0.75, 30)
    }
  }, {
    title: "万敌1魂：【弑神登神】对主目标造成的伤害倍率提高30%，且变成对敌方全体造成等同于主目标伤害倍率的虚数属性伤害。",
    cons: 1
  }, {
    title: "万敌2魂：【血仇】状态期间，万敌造成的伤害无视敌方目标[ignore]%的防御力。",
    cons: 2,
    data: {
      ignore: 15
    }
  }, {
    title: "万敌4魂：【血仇】状态期间暴击伤害提高[cdmg]%，且受到来自敌方目标的攻击后回复[_healHp]的生命值",
    cons: 4,
    data: {
      cdmg: 30,
      _healHp: ({ attr, calc }) => calc(attr.hp) * 10 / 100
    }
  }
]

export const createdBy = "其实雨很好"
