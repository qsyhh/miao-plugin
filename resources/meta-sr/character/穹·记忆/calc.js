export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技迷迷回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal((calc(attr.hp) * talent.t["生命上限·百分比"] + talent.t["生命上限·固定值"]) * talent.e["回复"])
  }, {
    title: "终结技伤害",
    dmg: ({ talent, cons }, dmg) => {
      let qDmg = dmg(talent.q["技能伤害"], "q")
      if (cons === 6) return { dmg: qDmg.dmg, avg: qDmg.dmg }
      return qDmg
    }
  }, {
    title: "忆灵技伤害(随机单体)",
    dmg: ({ talent }, dmg) => dmg(talent.me["随机伤害"], "me")
  }, {
    title: "忆灵技伤害(最后)",
    dmg: ({ talent }, dmg) => dmg(talent.me["最后伤害"], "me")
  }, {
    title: "忆灵技伤害(完整)",
    dmg: ({ talent }, dmg) => dmg(talent.me["随机伤害"] * 4 + talent.me["最后伤害"], "me")
  }
]

export const defDmgIdx = 2
export const defParams = { Memosprite: true }
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "迷迷状态：基础生命值: [_hpBase]，基础速度: [_speedBase]",
    tree: 1,
    data: {
      _hpBase: ({ talent, attr, calc }) => calc(attr.hp) * talent.t["生命上限·百分比"] + talent.t["生命上限·固定值"],
      _speedBase: 130
    }
  }, {
    title: "忆灵天赋-伙伴！一起！：使我方全体的暴击伤害提高[cdmg]%",
    tree: 1,
    data: {
      cdmg: ({ talent, attr, calc }) => calc(attr.cdmg) * talent.mt["暴击伤害"] + talent.mt["额外暴击伤害"] * 100
    }
  }, {
    title: "记忆主6魂：终结技的暴击率固定为100%",
    cons: 6
  }
]

export const createdBy = "其实雨很好"
