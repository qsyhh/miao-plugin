/* eslint-disable no-empty-pattern */
export const details = [
  {
    title: "短E后普攻一段伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["一段伤害"], "a")
  }, {
    title: "短E后普攻五段伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["五段伤害"], "a")
  }, {
    title: "短E后重击伤害",
    dmg: ({ talent }, dmg) => dmg(talent.e["重击伤害"], "a2")
  }, {
    title: "Q斩击伤害(<50点蛇之狡谋)",
    dmg: ({ talent }, dmg) => dmg(talent.q["斩击伤害"], "q")
  }, {
    title: "Q斩击最终段伤害(<50点蛇之狡谋)",
    dmg: ({ talent }, dmg) => dmg(talent.q["斩击最终段伤害"], "q")
  }, {
    title: "Q斩击伤害(100点蛇之狡谋)",
    params: { szjmBuff: true },
    dmg: ({ talent }, dmg) => dmg(talent.q["斩击伤害"], "q")
  }, {
    title: "Q斩击最终段伤害(100点蛇之狡谋)",
    params: { szjmBuff: true },
    dmg: ({ talent }, dmg) => dmg(talent.q["斩击最终段伤害"], "q")
  }, {
    check: ({ cons }) => cons > 0,
    title: "1命单枚晶刃伤害",
    dmg: ({}, dmg) => dmg(500, "a2")
  }, {
    check: ({ cons }) => cons === 6,
    title: "q后单层极恶技·斩协同攻击伤害 ",
    dmg: ({}, dmg) => dmg(750, "q")
  }, {
    check: ({ cons }) => cons === 6,
    title: "e后普攻消耗极恶技·斩协同攻击伤害 ",
    dmg: ({}, dmg) => dmg(180 * 3, "a2")
  }
]

export const defDmgIdx = 5
export const mainAttr = "atk,cpct,cdmg,dmg"

export const buffs = [
  {
    check: ({ params }) => params.szjmBuff,
    title: "元素爆发-极恶技·灭：[_num]点蛇之狡谋，使元素爆发造成的伤害提升[qPlus]",
    data: {
      _num: ({ cons }) => cons > 1 ? 22 : 12,
      qPlus: ({ talent, attr, calc, cons }) => calc(attr.atk) * talent.q["蛇之狡谋加成"] / 100 * (cons > 1 ? 22 : 12)
    }
  }, {
    title: "元素爆发-极恶技·尽：3枚虚境裂隙，使普攻造成的伤害提高[aDmg]%",
    data: {
      aDmg: ({ talent }) => talent.q["汲取0/1/2/3枚虚境裂隙伤害提升2"][3]
    }
  },
  // {
  //   title: "天赋-诸武相授：至少有一名冰元素角色时，队伍中自己的角色的元素战技等级提高1级"
  // },
  {
    title: "天赋-万流归寂：3层死河渡断效果使丝柯克在七相一闪模式下时的普攻造成原本[aMulti]%的伤害，施放的元素爆发极恶技·灭造成原本[qMulti]%的伤害",
    data: {
      aMulti: 170,
      qMulti: 160
    }
  }, {
    title: "丝柯克2命：施放七相一闪模式下的特殊元素爆发极恶技·尽后，攻击力提升[atkPct]%",
    cons: 2,
    data: {
      atkPct: 30
    }
  }, {
    title: "丝柯克4命：3层死河渡断效果还会使丝柯克的攻击力提升[atkPct]%",
    cons: 4,
    data: {
      atkPct: 40
    }
  }
]

export const createdBy = "其实雨很好"
