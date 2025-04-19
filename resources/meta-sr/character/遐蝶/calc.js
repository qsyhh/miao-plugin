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
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.me2["技能伤害"], "me", false, { dynamicDmg: 30 })
  }, {
    title: "强化忆灵技伤害(二次释放)",
    params: { cons1: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.me2["二次释放伤害"], "me", false, { dynamicDmg: 60 })
  }, {
    title: "强化忆灵技伤害(三次释放)",
    params: { cons1: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.me2["三次释放伤害"], "me", false, { dynamicDmg: 90 })
  }, {
    title: "强化忆灵技伤害(完整)",
    params: { cons1: true },
    dmg: ({ talent, cons, attr, calc }, { basic }) => {
      let cost = cons > 1 ? 4 : 2
      let meDmg1 = basic(calc(attr.hp) * talent.me2["技能伤害"], "me", false, { dynamicDmg: 30 })
      let meDmg2 = basic(calc(attr.hp) * talent.me2["二次释放伤害"], "me", false, { dynamicDmg: 60 })
      let meDmg3 = basic(calc(attr.hp) * talent.me2["三次释放伤害"], "me", false, { dynamicDmg: 90 })
      for (let i = 1; i < cost; i++) {
        let dmg = basic(calc(attr.hp) * talent.me2["三次释放伤害"], "me", false, { dynamicDmg: 90 + 30 * i })
        meDmg3.dmg += dmg.dmg
        meDmg3.avg += dmg.avg
      }
      let meDmg4 = basic(calc(attr.hp) * talent.me2["灼掠幽墟的晦翼伤害"] * (cons === 6 ? 9 : 6), "mt", false, { dynamicDmg: 60 + 30 * cost })
      return {
        dmg: meDmg1.dmg + meDmg2.dmg + meDmg3.dmg + meDmg4.dmg,
        avg: meDmg1.avg + meDmg2.avg + meDmg3.avg + meDmg4.avg
      }
    }
  }, {
    title: "忆灵天赋伤害(单次弹射)",
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
    title: "行迹-西风的驻足：每次释放忆灵技【燎尽黯泽的焰息】，伤害提高30%，最高叠加6层",
    tree: 3
  }, {
    title: "遐蝶1魂：敌方目标当前生命值小于等于自身生命上限50%时，对其造成的伤害为原伤害的140%",
    cons: 1,
    data: {
      multi: ({ params }) => params.cons1 ? 40 : 0
    }
  }, {
    title: "遐蝶2魂：2层【炽意】可抵扣2次死龙忆灵技【燎尽黯泽的焰息】的生命值消耗",
    cons: 2
  }, {
    title: "遐蝶4魂：回复量提高[heal]%",
    cons: 4,
    data: {
      heal: 20
    }
  }, {
    title: "遐蝶6魂：量子属性抗性穿透提高[kx]%，触发天赋【灼掠幽墟的晦翼】的弹射次数额外增加3次",
    cons: 6,
    data: {
      kx: 20
    }
  }
]

export const createdBy = "其实雨很好"
