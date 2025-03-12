export const details = [
  {
    title: "普攻伤害(主目标)",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a["技能伤害"], "a")
  }, {
    title: "普攻伤害(完整)",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * (talent.a["技能伤害"] + talent.a["相邻目标伤害"] * 2), "a")
  }, {
    title: "终结技单体伤害(0次天赋追击)",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q["技能伤害"], "q")
  }, {
    title: "终结技单体伤害(3次天赋追击)",
    params: { zj: 3 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q["技能伤害"], "q")
  }, {
    title: "终结技附加伤害(0次天赋追击)",
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * talent.q["附加伤害"] * (cons > 1 ? 120 / 100 * 2 : 1), "")
  }, {
    title: "终结技附加伤害(3次天赋追击)",
    params: { zj: 3 },
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * talent.q["附加伤害"] * (cons > 1 ? 120 / 100 * 2 : 1), "")
  }, {
    title: "天赋追击伤害(0次天赋追击)",
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * talent.t["追加攻击伤害"], "t")
  }, {
    title: "天赋追击伤害(2次天赋追击)",
    params: { zj: 2 },
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * talent.t["追加攻击伤害"], "t")
  }, {
    check: ({ cons }) => cons > 0,
    title: "一命额外真实伤害(3次天赋追击)",
    params: { zj: 3 },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let qAvg = basic(calc(attr.hp) * talent.q["技能伤害"], "q").avg
      let fjAvg = basic(calc(attr.hp) * talent.q["附加伤害"] * (cons > 1 ? 120 / 100 * 2 : 1), "").avg
      return {
        avg: (qAvg + fjAvg) * 24 / 100
      }
    }
  }
]

export const defDmgIdx = 5
export const mainAttr = "hp,cpct,cdmg"

export const buffs = [
  {
    title: "战技-礼物都去哪儿了：我方全体目标全属性抗性穿透提高[kx]%",
    data: {
      kx: ({ talent }) => talent.e["抗性穿透提高"] * 100
    }
  }, {
    title: "终结技-猜猜这里住着谁：结界持续期间，敌方目标受到的伤害提高[enemydmg]%",
    data: {
      enemydmg: ({ talent }) => talent.q["受到的伤害提高"] * 100
    }
  }, {
    title: "行迹-城墙外的羊羔儿…：施放天赋的追加攻击后，造成的伤害提高72%，最多叠加3层",
    tree: 1,
    data: {
      dmg: ({ params }) => params.zj ? 72 * params.zj : 0
    }
  }, {
    title: "行迹-长翅膀的玻璃球！：生命上限提高[hpPlus](仅计算单人)",
    tree: 2,
    data: {
      hpPlus: ({ attr, calc }) => calc(attr.hp) * 9 / 100
    }
  }, {
    title: "缇宝2命：结界造成的附加伤害提高120%，并额外造成1次附加伤害",
    cons: 2
  }, {
    title: "缇宝4命：【神启】持续期间，我方全体造成伤害时无视目标[ignore]%的防御力",
    cons: 4,
    data: {
      ignore: 18
    }
  }, {
    title: "缇宝6命：天赋的追加攻击造成的伤害提高729%",
    cons: 6,
    data: {
      tDmg: 729
    }
  }
]

export const createdBy = "其实雨很好"
