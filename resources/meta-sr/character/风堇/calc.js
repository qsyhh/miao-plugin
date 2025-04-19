/* eslint-disable import/no-unresolved */
import { Format } from "#miao"

export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a["技能伤害"], "a")
  }, {
    title: "战技生命回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.hp) * talent.e["回复·百分比"] + talent.e["回复·固定值"])
  }, {
    title: "战技伊卡回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.hp) * talent.e["伊卡回复·百分比"] + talent.e["伊卡回复·固定值"])
  }, {
    title: "终结技生命回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.hp) * talent.q["回复·百分比"] + talent.q["回复·固定值"])
  }, {
    title: "终结技伊卡回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.hp) * talent.q["伊卡回复·百分比"] + talent.q["伊卡回复·固定值"])
  }, {
    title: "终结技后生命上限提高",
    dmg: ({ talent, attr, cons }) => {
      let cost = talent.q["生命上限提高·百分比"] + (cons > 0 ? 0.5 : 0)
      let addMaxHp = attr.hp.base * cost + talent.q["生命上限提高·固定值"]
      return {
        avg: Format.comma(addMaxHp, 1),
        type: "text"
      }
    }
  }, {
    title: "忆灵技伤害(3w累计治疗)",
    dmg: ({ talent }, { basic }) => basic(30000 * talent.me["技能伤害"], "me")
  }, {
    title: "忆灵天赋生命回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.hp) * talent.mt["回复·百分比"] + talent.mt["回复·固定值"])
  }, {
    title: "忆灵天赋额外回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.hp) * talent.mt["额外回复·百分比"] + talent.mt["额外回复·固定值"])
  }
]

export const defDmgIdx = 6
export const mainAttr = "hp,cdmg,heal"

export const buffs = [
  {
    title: "伊卡状态：基础生命值: [_hpBase]，基础速度: 0",
    data: {
      _hpBase: ({ trees, attr, calc }) => calc(attr.staticAttr.hp) * (trees["103"] ? 1.2 : 1)
    }
  }, {
    title: "终结技-飞入晨昏的我们：处于【雨过天晴】状态时，我方全体目标生命上限提高[hpPlus]",
    data: {
      hpPlus: ({ talent, attr, cons }) => attr.hp.base * (talent.q["生命上限提高·百分比"] + (cons > 0 ? 0.5 : 0)) + talent.q["生命上限提高·固定值"]
    }
  }, {
    title: "行迹-阴云莞尔：暴击率提高[cpct]%，治疗量提高[heal]%",
    tree: 1,
    data: {
      cpct: 100,
      heal: 25
    }
  }, {
    title: "行迹-暴风停歇：当前速度[_speed]，速度大于200时，风堇与伊卡的生命上限提高[hpPct]%，治疗量提高[heal]%，四魂爆伤提高[cdmg]%",
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
    title: "风堇6魂：我方全体目标的全属性抗性穿透提高[kx]%",
    cons: 6,
    data: {
      kx: 24
    }
  }
]

export const createdBy = "其实雨很好"
