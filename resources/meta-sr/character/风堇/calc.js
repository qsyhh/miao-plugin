import { Format } from "#miao"

export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a["技能伤害"], "a")
  }, {
    title: "战技生命回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.hp) * talent.e["治疗·百分比生命"] + talent.e["治疗·固定值"])
  }, {
    title: "战技伊卡回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.hp) * talent.e["小伊卡治疗·百分比生命"] + talent.e["小伊卡治疗·固定值"])
  }, {
    title: "终结技生命回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal((calc(attr.staticAttr.hp) + (calc(attr.speed) > 200 ? attr.hp.base * 0.2 : 0)) * talent.q["治疗·百分比生命"] + talent.q["治疗·固定值"])
  }, {
    title: "终结技伊卡回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal((calc(attr.staticAttr.hp) + (calc(attr.speed) > 200 ? attr.hp.base * 0.2 : 0)) * talent.q["小伊卡治疗·百分比生命"] + talent.q["小伊卡治疗·固定值"])
  }, {
    title: "终结技后生命上限提高",
    dmg: ({ talent, attr, cons }) => {
      let cost = talent.q["生命提高·百分比生命"] + (cons > 0 ? 0.5 : 0)
      let addMaxHp = attr.hp.base * cost + talent.q["生命提高·固定值"]
      return {
        avg: Format.comma(addMaxHp, 1),
        type: "text"
      }
    }
  }, {
    title: "忆灵技伤害(eqeee累计治疗)",
    dmg: ({ talent, cons, attr, calc }, { heal, basic }) => {
      let staticHp = calc(attr.staticAttr.hp)
      if (calc(attr.speed) > 200) staticHp += attr.staticAttr.hp.base * 0.2
      const cost = cons < 6 ? 0.5 : 0.88
      const cons1 = cons > 0 ? heal(calc(attr.hp) * 0.08).avg : 0
      const healCalc = (hp, key) => heal(hp * talent[key]["治疗·百分比生命"] + talent[key]["治疗·固定值"]).avg * 4 + heal(hp * talent[key]["小伊卡治疗·百分比生命"] + talent[key]["小伊卡治疗·固定值"]).avg
      let healPlus = (healCalc(staticHp, "e") + healCalc(staticHp, "q")) * cost;
      (function eachCalc(i = 1) { healPlus = (healPlus + cons1 + healCalc(calc(attr.hp), "e")) * (i < 3 ? cost : 1); if (i < 3) eachCalc(i + 1) })()
      return basic(healPlus * talent.me["技能伤害"], "me")
    }
  }, {
    title: "忆灵天赋生命回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.hp) * talent.mt["治疗·百分比生命"] + talent.mt["治疗·固定值"])
  }, {
    title: "忆灵天赋额外回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.hp) * talent.mt["额外治疗·百分比生命"] + talent.mt["额外治疗·固定值"])
  }
]

export const defDmgIdx = 6
export const defParams = { Memosprite: true }
export const mainAttr = "hp,cdmg,heal"

export const buffs = [
  {
    title: "伊卡状态：基础生命值: [_hpBase]，基础速度: 0",
    data: {
      _hpBase: ({ trees, attr, calc }) => calc(attr.staticAttr.hp) * (trees["103"] ? 0.7 : 0.5)
    }
  }, {
    title: "终结技-飞入晨昏的我们：处于【雨过天晴】状态时，我方全体目标生命上限提高[hpPlus]",
    data: {
      hpPlus: ({ talent, attr, cons }) => attr.hp.base * (talent.q["生命提高·百分比生命"] + (cons > 0 ? 0.5 : 0)) + talent.q["生命提高·固定值"]
    }
  }, {
    title: "天赋-疗愈世间的晨曦：风堇或小伊卡提供治疗时，小伊卡造成的伤害提高[meDmg]%",
    data: {
      meDmg: ({ talent }) => talent.t["伤害提高"] * 100 * 3
    }
  }, {
    title: "行迹-阴云莞尔：暴击率提高[cpct]%，治疗量提高[heal]%",
    tree: 1,
    data: {
      cpct: 100,
      heal: 25
    }
  }, {
    title: ({ cons }) => `行迹-暴风停歇：当前速度[_speed]，速度大于200时，风堇与伊卡的生命上限提高[hpPct]%，治疗量提高[heal]%${cons > 3 ? "，四魂爆伤提高[cdmg]%" : ""}`,
    sort: 9,
    tree: 3,
    data: {
      _speed: ({ attr, calc }) => calc(attr.speed),
      hpPct: ({ attr, calc }) => calc(attr.speed) > 200 ? 20 : 0,
      heal: ({ attr, calc }) => calc(attr.speed) > 200 ? Math.min(calc(attr.speed) - 200, 200) : 0,
      cdmg: ({ cons, attr, calc }) => cons > 3 && calc(attr.speed) > 200 ? Math.min((calc(attr.speed) - 200) * 2, 400) : 0
    }
  }, {
    title: "风堇1魂：【雨过天晴】的生命上限提高效果额外提高50%",
    cons: 1
  }, {
    title: "风堇2魂：我方目标生命值降低时，速度提高[speedPct]%",
    cons: 2,
    data: {
      speedPct: 30
    }
  }, {
    title: "风堇4魂：行迹【暴风停歇】的增益效果获得增强，每超过1点速度，风堇和伊卡的暴击伤害额外提高2%",
    cons: 4
  }, {
    title: "风堇6魂：小伊卡施放忆灵技清空累计治疗数值改为12%，我方全体目标的全属性抗性穿透提高[kx]%",
    cons: 6,
    data: {
      kx: 20
    }
  }
]

export const createdBy = "其实雨很好"
