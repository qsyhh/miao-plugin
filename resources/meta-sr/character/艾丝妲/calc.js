export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害",
    dmg: ({ talent, cons }, dmg) => dmg(talent.e["技能伤害"] * (cons > 0 ? 6 : 5), "e")
  }, {
    title: "普攻灼烧持续伤害",
    tree: 3,
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"] * 0.5, "dot", "skillDot")
  }
]

export const defDmgIdx = 1
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "终结技-星空祝言：全队速度提高[speedPct]%",
    data: {
      speedPct: ({ talent }) => talent.q["速度提高"]
    }
  }, {
    title: "天赋-天象学：蓄能5层，攻击力提高[atkPct]%",
    data: {
      atkPct: ({ talent }) => talent.t["攻击力提高"] * 5 * 100
    }
  }, {
    title: "行迹-点燃：我方全体火属性伤害提高18%",
    tree: 3,
    data: {
      dmg: 18
    }
  }
]

export const createdBy = "其实雨很好"
