export const details = [
  {
    title: "E下落攻击·踏云献瑞伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["下落攻击·踏云献瑞伤害"], "a3")
  }, {
    title: "E下落攻击·踏云献瑞蒸发",
    dmg: ({ talent }, dmg) => dmg(talent.e["下落攻击·踏云献瑞伤害"], "a3", "蒸发")
  }, {
    title: "E下落攻击·踏云献瑞融化",
    dmg: ({ talent }, dmg) => dmg(talent.e["下落攻击·踏云献瑞伤害"], "a3", "融化")
  }, {
    title: "Q猊兽·文仔砸击伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["猊兽·文仔砸击伤害"], "q")
  }, {
    title: "Q猊兽·文仔砸击蒸发",
    dmg: ({ talent }, dmg) => dmg(talent.q["猊兽·文仔砸击伤害"], "q", "蒸发")
  }, {
    title: "Q猊兽·文仔砸击融化",
    dmg: ({ talent }, dmg) => dmg(talent.q["猊兽·文仔砸击伤害"], "q", "融化")
  }, {
    title: "Q技能治疗量",
    dmg: ({ attr, calc }, { heal }) => heal(calc(attr.hp) * 30 / 100)
  }
]

export const defDmgIdx = 2
export const mainAttr = "atk,cpct,cdmg,mastery"

export const buffs = [
  {
    title: "天赋-舞起升平：元素战技的下落攻击·踏云献瑞命中敌人后，每0.2秒恢复[_hpPlus]生命值",
    data: {
      _hpPlus: ({ attr, calc }) => calc(attr.hp) * 1.5 / 100
    }
  }, {
    title: "天赋-祥烟瑞气：生命值低于50%时，获得[healInc]%受治疗加成。生命值高于或等于50%，元素战技的下落攻击·踏云献瑞造成的伤害提升[a3Dmg]%。",
    data: {
      healInc: 20,
      a3Dmg: 20
    }
  }, {
    title: "嘉明2命：受到治疗溢出，攻击力提升[atkPct]%",
    cons: 2,
    data: {
      atkPct: 20
    }
  }, {
    title: "嘉明6命：元素战技的下落攻击·踏云献瑞的暴击率提升[a3Cpct]%，暴击伤害提升[a3Cdmg]%",
    cons: 6,
    data: {
      a3Cpct: 20,
      a3Cdmg: 40
    }
  }
]

export const createdBy = "其实雨很好"
