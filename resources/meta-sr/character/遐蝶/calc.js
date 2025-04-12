export const details = [
  {
    title: "战技伤害(主目标)",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e["技能伤害"], "e")
  }, {
    title: "战技伤害(完整)",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * (talent.e["技能伤害"] + talent.e["相邻目标伤害"] * 2), "e")
  }, {
    title: "强化战技伤害",
    params: { cons1: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e2["遐蝶伤害"], "e")
  }, {
    title: "强化战技伤害(加死龙)",
    params: { cons1: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * (talent.e2["遐蝶伤害"] + talent.e2["死龙伤害"]), "e")
  }, {
    title: "忆灵技伤害",
    params: { cons1: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.me["技能伤害"], "me")
  }, {
    title: "强化忆灵技伤害(首次释放)",
    params: { cons1: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.me2["技能伤害"], "me")
  }, {
    title: "强化忆灵技伤害(二次释放)",
    params: { cons1: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.me2["二次释放伤害"], "me")
  }, {
    title: "强化忆灵技伤害(三次释放)",
    params: { cons1: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.me2["三次释放伤害"], "me")
  }, {
    title: "强化忆灵技伤害(完整)",
    params: { cons1: true },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let meDmg1 = basic(calc(attr.hp) * (talent.me2["技能伤害"] + talent.me2["二次释放伤害"] + talent.me2["三次释放伤害"] * 2), "me")
      let meDmg2 = basic(calc(attr.hp) * talent.me2["灼掠幽墟的晦翼伤害"] * 6, "mt")
      return {
        dmg: meDmg1.dmg + meDmg2.dmg,
        avg: meDmg1.avg + meDmg2.avg
      }
    }
  }, {
    title: "忆灵天赋伤害",
    params: { cons1: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.mt2["技能伤害"], "mt")
  }, {
    title: "忆灵天赋回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal((calc(attr.hp) * talent.mt2["回复·百分比"] + talent.mt2["回复·固定值"]))
  }
]

export const defDmgIdx = 8
export const defParams = { Memosprite: true }
export const mainAttr = "hp,cpct,cdmg"

export const buffs = [
  {
    title: "死龙状态：基础生命值: [_hpBase]，基础速度: 165",
    tree: 1,
    data: {
      _hpBase: 80 * 4 * 100
    }
  }, {
    title: "终结技-亡喉怒哮，苏生之颂铃：使敌方全体全属性抗性降低[kx]%",
    data: {
      kx: ({ talent }) => talent.q["抗性降低"] * 100
    }
  }, {
    title: "天赋-掌心淌过的荒芜：3层使遐蝶与死龙造成的伤害提高[dmg]%",
    data: {
      dmg: ({ talent }) => talent.t["伤害提高"] * 100 * 3
    }
  }, {
    title: "忆灵天赋-震彻寂壤的怒啸：我方全体造成的伤害提高[dmg]%",
    data: {
      dmg: 10
    }
  }, {
    title: "行迹-倒置的火炬：速度提高[speedPct]%",
    tree: 2,
    data: {
      speedPct: 40
    }
  }, {
    title: "行迹-西风的驻足：忆灵天赋伤害提高[mtDmg]%",
    tree: 2,
    data: {
      mtDmg: 30
    }
  }, {
    title: "遐蝶1魂：敌方目标当前生命值小于等于自身生命上限50%时，对其造成的伤害为原伤害的140%",
    cons: 1,
    data: {
      dmg: ({ params }) => params.cons1 ? 40 : 0
    }
  }, {
    title: "遐蝶4魂：回复量提高[heal]%",
    cons: 4,
    data: {
      heal: 20
    }
  }, {
    title: "遐蝶6魂：量子属性抗性穿透提高[kx]%",
    cons: 6,
    data: {
      kx: 20
    }
  }
]

export const createdBy = "其实雨很好"
