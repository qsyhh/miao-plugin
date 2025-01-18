export const details = [
  {
    title: "E技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e,nightsoul")
  }, {
    title: "E焚曜之环伤害",
    params: { fy: true },
    dmg: ({ talent }, dmg) => dmg(talent.e["焚曜之环伤害"], "e,nightsoul")
  }, {
    title: "满战意E后驰轮车普攻一段伤害",
    params: { zy: 200, cl: true },
    dmg: ({ talent, calc, attr, cons }, dmg) => {
      let aDmg = dmg(talent.e["驰轮车普通攻击一段伤害"], "a,nightsoul")
      let aPlus = talent.q["驰轮车普通攻击伤害提升"] * calc(attr.atk) * 2 + (cons > 1 ? calc(attr.atk) * 0.6 : 0)
      return {
        dmg: aDmg.dmg + aPlus,
        avg: aDmg.avg + aPlus
      }
    }
  }, {
    title: "满战意E后驰轮车普攻一轮伤害",
    params: { zy: 200, cl: true },
    dmg: ({ talent, calc, attr, cons }, dmg) => {
      let aDmg1 = dmg(talent.e["驰轮车普通攻击一段伤害"], "a,nightsoul")
      let aDmg2 = dmg(talent.e["驰轮车普通攻击二段伤害"], "a,nightsoul")
      let aDmg3 = dmg(talent.e["驰轮车普通攻击三段伤害"], "a,nightsoul")
      let aDmg4 = dmg(talent.e["驰轮车普通攻击四段伤害"], "a,nightsoul")
      let aDmg5 = dmg(talent.e["驰轮车普通攻击五段伤害"], "a,nightsoul")
      let aPlus = talent.q["驰轮车普通攻击伤害提升"] * calc(attr.atk) * 2 + (cons > 1 ? calc(attr.atk) * 0.6 : 0)
      return {
        dmg: aDmg1.dmg + aDmg2.dmg + aDmg3.dmg + aDmg4.dmg + aDmg5.dmg + aPlus * 5,
        avg: aDmg1.avg + aDmg2.avg + aDmg3.avg + aDmg4.avg + aDmg5.avg + aPlus * 5
      }
    }
  }, {
    title: "满战意E后驰轮车普攻一轮蒸发",
    params: { zy: 200, cl: true },
    dmg: ({ talent, calc, attr, cons }, dmg) => {
      let aDmg1 = dmg(talent.e["驰轮车普通攻击一段伤害"], "a,nightsoul", "vaporize")
      let aDmg2 = dmg(talent.e["驰轮车普通攻击二段伤害"], "a,nightsoul", "vaporize")
      let aDmg3 = dmg(talent.e["驰轮车普通攻击三段伤害"], "a,nightsoul", "vaporize")
      let aDmg4 = dmg(talent.e["驰轮车普通攻击四段伤害"], "a,nightsoul", "vaporize")
      let aDmg5 = dmg(talent.e["驰轮车普通攻击五段伤害"], "a,nightsoul", "vaporize")
      let aPlus = talent.q["驰轮车普通攻击伤害提升"] * calc(attr.atk) * 2 + (cons > 1 ? calc(attr.atk) * 0.6 : 0)
      return {
        dmg: aDmg1.dmg + aDmg2.dmg + aDmg3.dmg + aDmg4.dmg + aDmg5.dmg + aPlus * 5,
        avg: aDmg1.avg + aDmg2.avg + aDmg3.avg + aDmg4.avg + aDmg5.avg + aPlus * 5
      }
    }
  }, {
    title: "0战意E后驰轮车重击终结伤害",
    params: { zy: 0, cl: true },
    dmg: ({ talent }, dmg) => dmg(talent.e["驰轮车重击终结伤害"], "a2,nightsoul")
  }, {
    title: "满战意E后驰轮车重击终结伤害",
    params: { cl: true },
    dmg: ({ talent, calc, attr, cons }, dmg) => {
      let a2Dmg = dmg(talent.e["驰轮车重击终结伤害"], "a2,nightsoul")
      let a2Plus = talent.q["驰轮车重击伤害提升"] * calc(attr.atk) * 2 + (cons > 1 ? calc(attr.atk) * 0.9 : 0)
      return {
        dmg: a2Dmg.dmg + a2Plus,
        avg: a2Dmg.avg + a2Plus
      }
    }
  }, {
    title: "满战意E后驰轮车重击终结蒸发",
    params: { cl: true },
    dmg: ({ talent, calc, attr, cons }, dmg) => {
      let a2Dmg = dmg(talent.e["驰轮车重击终结伤害"], "a2,nightsoul", "vaporize")
      let a2Plus = talent.q["驰轮车重击伤害提升"] * calc(attr.atk) * 2 + (cons > 1 ? calc(attr.atk) * 0.9 : 0)
      return {
        dmg: a2Dmg.dmg + a2Plus,
        avg: a2Dmg.avg + a2Plus
      }
    }
  }, {
    title: "E后驰轮车下落攻击伤害",
    params: { cl: true },
    dmg: ({ talent }, dmg) => dmg(talent.e["驰轮车坠地冲击伤害"], "a3,nightsoul")
  }, {
    title: "100战意Q技能伤害",
    params: { zy: 100 },
    dmg: ({ talent, calc, attr, cons }, dmg) => {
      let qDmg = dmg(talent.q["技能伤害"], "q,nightsoul")
      let qPlus = talent.q["坠日斩伤害提升"] * calc(attr.atk) * 1 + (cons > 1 ? calc(attr.atk) * 1.2 : 0)
      return {
        dmg: qDmg.dmg + qPlus,
        avg: qDmg.avg + qPlus
      }
    }
  }, {
    title: "满战意Q技能伤害",
    params: { zy: 200 },
    dmg: ({ talent, calc, attr, cons }, dmg) => {
      let qDmg = dmg(talent.q["技能伤害"], "q,nightsoul")
      let qPlus = talent.q["坠日斩伤害提升"] * calc(attr.atk) * 2 + (cons > 1 ? calc(attr.atk) * 1.2 : 0)
      return {
        dmg: qDmg.dmg + qPlus,
        avg: qDmg.avg + qPlus
      }
    }
  }, {
    check: ({ cons }) => cons === 6,
    title: "六命焚曜之环攻击驰轮车冲撞伤害",
    params: { fy: true },
    dmg: ({ calc, attr }) => {
      return {
        avg: calc(attr.atk) * 2
      }
    }
  }, {
    check: ({ cons }) => cons === 6,
    title: "六命驰轮车召唤物持续伤害",
    params: { cl: true },
    dmg: ({ calc, attr }) => {
      return {
        avg: calc(attr.atk) * 5
      }
    }
  }
]

export const defDmgIdx = 3
export const defParams = { Nightsoul: true }
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "元素爆发-燔天之时：死生之炉状态下，每层战意使坠日斩伤害提升[_qPlus]，「古名解放」普通攻击伤害提升[_aPlus]，「古名解放」重攻击伤害提升[_a2Plus]",
    sort: 9,
    data: {
      _qPlus: ({ talent, calc, attr }) => talent.q["坠日斩伤害提升"] * calc(attr.atk) / 100,
      _aPlus: ({ talent, calc, attr }) => talent.q["驰轮车普通攻击伤害提升"] * calc(attr.atk) / 100,
      _a2Plus: ({ talent, calc, attr }) => talent.q["驰轮车重击伤害提升"] * calc(attr.atk) / 100
    }
  }, {
    title: "天赋-炎花献礼：队伍中的附近的角色触发「夜魂迸发」时，玛薇卡的攻击力提升[atkPct]%",
    data: {
      atkPct: 30
    }
  }, {
    check: ({ params }) => params.zy > 0,
    title: "天赋-「基扬戈兹」：施放元素爆发燔天之时后，[_zy]层战意，使角色造成的伤害提升[dmg]%",
    data: {
      _zy: ({ params }) => params.zy,
      dmg: ({ params }) => 0.2 * params.zy
    }
  }, {
    title: "玛薇卡1命：获取战意后，玛薇卡的攻击力提升[atkPct]%",
    cons: 1,
    data: {
      atkPct: 40
    }
  }, {
    check: ({ params }) => params.fy,
    title: "玛薇卡2命：焚曜之环状态下，附近的敌人的防御力降低[enemyDef]%",
    cons: 2,
    data: {
      enemyDef: 20
    }
  }, {
    title: "玛薇卡2命：驰轮车状态下，玛薇卡的普通攻击、重击、元素爆发燔天之时中的坠日斩造成的伤害提升，提升值相当于玛薇卡攻击力的60%/90%/120%。",
    cons: 2
  }, {
    title: "玛薇卡4命：额外获得[dmg]%伤害加成",
    cons: 4,
    data: {
      dmg: 10
    }
  }, {
    check: ({ params }) => params.cl,
    title: "玛薇卡6命：驾驶驰轮车时使附近的敌人的防御力降低[enemyDef]%",
    cons: 6,
    data: {
      enemyDef: 20
    }
  }
]

export const createdBy = "其实雨很好"
