export const details = [
  {
    title: "E技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "E冻霜芭菲伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["冻霜芭菲伤害"], "e")
  }, {
    title: "流涌之刃伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["流涌之刃伤害"], "e")
  }, {
    title: "Q技能伤害",
    dmg: ({ talent }, dmg) => dmg(talent.q["技能伤害"], "q")
  }, {
    title: "Q治疗量",
    dmg: ({ talent, attr, calc }, { heal }) => heal(talent.q["治疗量2"][0] / 100 * calc(attr.atk) + talent.q["治疗量2"][1])
  }, {
    title: "天赋每跳治疗",
    params: { kfsl: true },
    dmg: ({ attr, calc }, { heal }) => heal(138.24 / 100 * calc(attr.atk))
  }, {
    check: ({ cons }) => cons > 5,
    title: "6命特级冻霜芭菲伤害",
    // eslint-disable-next-line no-empty-pattern
    dmg: ({}, dmg) => dmg(500, "e")
  }
]

export const defDmgIdx = 1
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "天赋-灵感浸入调味：队伍中存在4名水元素或冰元素元素角色时，敌方的冰元素抗性降低[kx]%",
    data: {
      kx: 55
    }
  }, {
    title: "爱可菲1命：队伍中所有角色的元素类型均为水/冰元素时，暴击伤害提升[cdmg]%",
    cons: 1,
    data: {
      cdmg: 60
    }
  }, {
    title: "爱可菲4命：康复食疗效果的治疗量提升100%",
    cons: 4,
    data: {
      heal: ({ params }) => params.kfsl ? 100 : 0
    }
  }
]

export const createdBy = "其实雨很好"
