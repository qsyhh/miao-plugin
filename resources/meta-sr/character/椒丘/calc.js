/* eslint-disable no-empty-pattern */
export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害(主目标)",
    dmg: ({ talent }, dmg) => dmg(talent.e["目标伤害"], "e")
  }, {
    title: "战技伤害(完整)",
    dmg: ({ talent }, dmg) => dmg(talent.e["目标伤害"] + talent.e["相邻目标伤害"] * 2, "e")
  }, {
    title: "终结技伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    title: "天赋持续伤害",
    dmg: ({ talent, cons }, dmg) => {
      let cost = cons > 1 ? 3 : 0
      return dmg(talent.t["持续伤害"] + cost, "dot", "skillDot")
    }
  }
]

export const defDmgIdx = 4
export const mainAttr = "atk,cpct,cdmg,dmg,effPct"

export const buffs = [
  {
    title: "天赋-四示八权，纤滋精味：满层【烬煨】使敌人受到的伤害提高[enemydmg]%",
    data: {
      enemydmg: ({ talent, cons }) => (talent.t["1层伤害提高"] + talent.t["叠加伤害提高"] * (cons === 6 ? 8 : 4)) * 100
    }
  }, {
    title: "终结技-鼎阵妙法，奇正相生：处于结界中时，敌方目标受到的终结技伤害提高[qDmg]%",
    data: {
      qDmg: 10
    }
  }, {
    title: "行迹-举炊：基于效果命中，提高[atkPct]%攻击力",
    tree: 2,
    data: {
      atkPct: ({ attr }) => attr.effPct > 80 ? Math.min(Math.floor((attr.effPct - 80) / 15) * 60, 240) : 0
    }
  }, {
    title: "椒丘1魂：对处于【烬煨】状态的敌方目标造成的伤害提高[dmg]%",
    cons: 1,
    data: {
      dmg: 40
    }
  }, {
    title: "椒丘6魂：9层【烬煨】会使目标的全属性抗性降低[kx]",
    cons: 6,
    data: {
      kx: 27
    }
  }
]

export const createdBy = "其实雨很好"
