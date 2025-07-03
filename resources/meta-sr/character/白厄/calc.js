export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "强化普攻伤害(主目标)",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.a2["技能伤害"], "a")
  }, {
    title: "强化普攻伤害(完整 3目标)",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.a2["技能伤害"] + talent.a2["相邻目标伤害"] * 2, "a")
  }, {
    title: "战技伤害(主目标)",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "战技伤害(完整 3目标)",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"] + talent.e["相邻目标伤害"] * 2, "e")
  }, {
    title: "弑魂焚诏反击伤害(单目标)",
    params: { q: true },
    dmg: ({ talent, cons }, dmg) => {
      let cost = (cons >= 4 ? 5 : 1) + 1
      return dmg((talent.e1["技能伤害"] + talent.e1["随机伤害"] * 4) * (1 + 0.2 * cost), "e")
    }
  }, {
    title: "弑魂焚诏反击伤害(5目标)",
    params: { q: true },
    dmg: ({ talent, cons }, dmg) => {
      let cost = (cons >= 4 ? 5 : 1) + 5
      return dmg((talent.e1["技能伤害"] + talent.e1["随机伤害"] * 4) * (1 + 0.2 * cost), "e")
    }
  }, {
    title: "死星天裁伤害(1点毁伤)",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.e2["随机伤害"] * 4, "e")
  }, {
    title: "死星天裁伤害(4点毁伤)",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.e2["随机伤害"] * 16 + talent.e2["额外伤害"], "e")
  }, {
    title: "终结技伤害",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }
]

export const defDmgIdx = 6
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "天赋-此身为炬：白厄成为队友的技能目标时，暴击伤害提高[_cdmg]%",
    data: {
      _cdmg: ({ talent }) => talent.t["暴伤提高"] * 100,
      cdmg: ({ talent, params }) => params.q ? 0 : talent.t["暴伤提高"] * 100
    }
  }, {
    title: "天赋-命运•此躯即神：变身期间攻击力提高[_atkPct]%，生命上限提高[_hpPct]%",
    data: {
      _atkPct: ({ talent }) => talent.t2["攻击力提高"] * 100,
      atkPct: ({ talent, params }) => params.q ? talent.t2["攻击力提高"] * 100 : 0,
      _hpPct: ({ talent }) => talent.t2["生命上限提高"] * 100,
      hpPct: ({ talent, params }) => params.q ? talent.t2["生命上限提高"] * 100 : 0
    }
  }, {
    title: "行迹-身承炎炬万千：受到队友提供的治疗效果或护盾时，造成的伤害提高[dmg]%",
    tree: 2,
    data: {
      dmg: 45
    }
  }, {
    title: "行迹-照见英雄本色：进入战斗或变身结束时，攻击力提高[atkPct]%",
    tree: 3,
    data: {
      atkPct: 50
    }
  }, {
    title: "白厄1魂：施放终结技时，暴击伤害提高50%",
    cons: 1,
    data: {
      cdmg: ({ params }) => params.q ? 50 : 0
    }
  }, {
    title: "白厄2魂：卡厄斯兰那的物理属性提高20%",
    cons: 2,
    data: {
      kx: ({ params }) => params.q ? 20 : 0
    }
  }, {
    title: "白厄4魂：施放【灾厄•弑魂焚诏】时，额外获得4层【弑魂之炽】",
    cons: 4
  }
]

export const createdBy = "其实雨很好"
