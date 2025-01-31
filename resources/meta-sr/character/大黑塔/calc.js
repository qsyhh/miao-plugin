export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害(主目标)",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "战技伤害(完整 3目标)",
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"] * 6, "e")
  }, {
    title: "强化战技伤害(首段 主目标 26层解读)",
    /**
     * q[终结技]：释放终结技后获得【灵感】，战技强化
     * tArtisBuffCount[解读层数]：天赋buff进入战斗初始给1层，每波次随机施加25层
     */
    params: { q: true, tArtisBuffCount: 26 },
    dmg: ({ talent, params }, dmg) => dmg(calcTalent(talent.e2["技能伤害"], talent.t["主目标每层倍率"], params.tArtisBuffCount), "e")
  }, {
    title: "强化战技伤害(尾段 主目标 26层解读)",
    params: { q: true, tArtisBuffCount: 26 },
    dmg: ({ talent, params }, dmg) => dmg(calcTalent(talent.e2["所有目标伤害"], talent.t["主目标每层倍率"], params.tArtisBuffCount), "e")
  }, {
    title: "强化战技伤害(完整 3目标 26层解读)",
    params: { q: true, tArtisBuffCount: 26 },
    dmg: ({ talent, params }, dmg) => {
      let { e2Dmg1, e2Dmg2, e2Dmg3, e2Dmg4 } = calcTalent(talent.e2, talent.t, params.tArtisBuffCount, true)
      return dmg(e2Dmg1 + e2Dmg2 + e2Dmg3 + e2Dmg4, "e")
    }
  }, {
    title: "强化战技伤害(完整 3目标 满层解读)",
    params: { q: true, tArtisBuffCount: 42 },
    dmg: ({ talent, params }, dmg) => {
      let { e2Dmg1, e2Dmg2, e2Dmg3, e2Dmg4 } = calcTalent(talent.e2, talent.t, params.tArtisBuffCount, true)
      return dmg(e2Dmg1 + e2Dmg2 + e2Dmg3 + e2Dmg4, "e")
    }
  }, {
    title: "终结技伤害(单目标)",
    dmg: ({ talent, cons }, dmg) => dmg(talent.q["技能伤害"] + (cons === 6 ? 1.4 : 0), "q")
  }, {
    check: ({ trees }) => trees["103"],
    title: "终结技伤害(单目标 26层谜底)",
    dmg: ({ talent, cons }, dmg) => dmg(talent.q["技能伤害"] + 0.26 + (cons === 6 ? 1.4 : 0), "q")
  }, {
    check: ({ trees }) => trees["103"],
    title: "终结技伤害(单目标 99层谜底)",
    dmg: ({ talent, cons }, dmg) => dmg(talent.q["技能伤害"] + 0.99 + (cons === 6 ? 1.4 : 0), "q")
  }
]

export const defDmgIdx = 6
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "终结技-早说了是魔法吧：终结技施放时，使攻击力提高[_atkPct]%",
    data: {
      _atkPct: ({ talent }) => talent.q["攻击力提高"] * 100,
      atkPct: ({ talent, params }) => params.q ? talent.q["攻击力提高"] * 100 : 0
    }
  }, {
    title: "天赋-拿来吧你：敌方目标进入战斗时，大黑塔对其施加1层【解读】。每个波次开始时，对一个随机敌方目标施加25层【解读】"
  }, {
    title: "天赋-拿来吧你：队伍中智识命途角色大于等于2名，每层额外对主目标/其他目标伤害提高[_e2Dmg1]/[_e2Dmg2]",
    data: {
      _e2Dmg1: ({ talent, calc, attr }) => talent.t["主目标每层倍率"] * 2 * calc(attr.atk),
      _e2Dmg2: ({ talent, calc, attr }) => talent.t["相邻目标每层倍率"] * 2 * calc(attr.atk)
    }
  }, {
    title: "秘技-看看好看的：使用秘技后，下一次战斗开始时大黑塔攻击力提高[atkPct]%",
    data: {
      atkPct: 60
    }
  }, {
    title: "行迹-冷漠的诚实：若主目标的解读层数达到42，使大黑塔造成的伤害提高50%",
    tree: 1,
    data: {
      dmg: ({ params }) => params.tArtisBuffCount === 42 ? 50 : 0
    }
  }, {
    title: "行迹-视界外来信：队伍中的智识命途角色大于等于2名，使我方全体暴击伤害提高[cdmg]%",
    tree: 2,
    data: {
      cdmg: 80
    }
  }, {
    title: "行迹-饥饿的地景：施放终结技时，每持有1层【谜底】，使本次终结技的伤害倍率提高1%",
    tree: 3
  }, {
    title: "大黑塔4魂：队伍中的智识命途角色的速度提高[speedPct]%",
    cons: 4,
    data: {
      speedPct: 12
    }
  }, {
    title: "大黑塔6魂：当场上敌方目标数量等于3时，终结技的伤害倍率提高140.0%，提高值为[_qPlus]",
    cons: 6,
    data: {
      _qPlus: ({ calc, attr }) => calc(attr.atk) * 1.4
    }
  }
]

/**
 * @param talentE2 - 强普数据数组
 * @param talentT - 天赋数据数组
 * @param tArtisBuffCount - 解读层数
 * @param all {true|false} - 是否传出所有
 * @returns {number|object}
 * - e2Dmg1 前两段主目标
 * - e2Dmg2 前两段相邻目标
 * - e2Dmg3 尾段主目标
 * - e2Dmg4 尾段相邻目标
 */
function calcTalent(talentE2, talentT, tArtisBuffCount, all = false) {
  if (!all) return talentE2 + talentT * tArtisBuffCount * 2
  return {
    e2Dmg1: (talentE2["技能伤害"] + talentT["主目标每层倍率"] * tArtisBuffCount * 2) * 2,
    e2Dmg2: (talentE2["技能伤害"] + talentT["相邻目标每层倍率"] * tArtisBuffCount * 2) * 4,
    e2Dmg3: (talentE2["所有目标伤害"] + talentT["主目标每层倍率"] * tArtisBuffCount * 2),
    e2Dmg4: (talentE2["所有目标伤害"] + talentT["相邻目标每层倍率"] * tArtisBuffCount * 2) * 2
  }
}

export const createdBy = "其实雨很好"
