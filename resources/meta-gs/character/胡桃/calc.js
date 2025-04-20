import { Format } from "#miao"

export const details = [
  {
    title: "E后血梅香伤害",
    params: { xmx: true },
    dmg: ({ talent }, dmg) => dmg(talent.e["血梅香伤害"], "e")
  }, {
    title: "重击伤害(半血开E)",
    params: { halfHp: true },
    dmg: ({ talent }, dmg) => dmg(talent.a["重击伤害"], "a2")
  }, {
    title: "重击蒸发(半血开E)",
    params: { halfHp: true },
    dmg: ({ talent }, dmg) => dmg(talent.a["重击伤害"], "a2", "蒸发")
  }, {
    title: "Q技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    title: "Q技能伤害(半血)",
    params: { halfHp: true },
    dmg: ({ talent }, dmg) => dmg(talent.q["低血量时技能伤害"], "q")
  }, {
    title: "Q技能蒸发(半血)",
    params: { halfHp: true },
    dmg: ({ talent }, dmg) => dmg(talent.q["低血量时技能伤害"], "q", "蒸发")
  }, {
    title: "Q技能治疗量",
    dmg: ({ talent, attr, calc }) => {
      return {
        avg: Format.comma(calc(attr.hp) * talent.q["技能治疗量"] / 100, 1),
        type: "text"
      }
    }
  }, {
    title: "Q技能治疗量(半血)",
    dmg: ({ talent, attr, calc }) => {
      return {
        avg: Format.comma(calc(attr.hp) * talent.q["低血量时技能治疗量"] / 100, 1),
        type: "text"
      }
    }
  }
]

export const defDmgIdx = 2
export const mainAttr = "hp,atk,cpct,cdmg,mastery"

export const buffs = [
  {
    title: "元素战技-蝶引来生：释放消耗[_hp]点生命值，获得[atkPlus]点攻击力加成",
    sort: 9,
    data: {
      _hp: ({ attr, calc }) => calc(attr.hp) * 30 / 100,
      atkPlus: ({ talent, attr, calc }) => Math.min(calc(attr.hp) * talent.e["攻击力提高"] / 100, attr.atk.base * 4)
    }
  }, {
    title: "天赋-血之灶火：半血获得33%火伤加成",
    data: {
      dmg: ({ params }) => params.halfHp ? 33 : 0
    }
  }, {
    title: "胡桃2命：血梅香造成的伤害提高[ePlus]",
    cons: 2,
    data: {
      ePlus: ({ attr, calc }) => calc(attr.hp) * 10 / 100
    }
  }, "vaporize"
]

export const createdBy = "其实雨很好"
