export const details = [{
  title: 'E后普攻首段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
}, {
  check: ({ cons }) => cons >= 2,
  title: '2命血偿勒令回收伤害',
  dmg: ({ attr }, { basic }) => basic(attr.atk * 900 / 100, '')
}, {
  title: 'Q伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: 'Q蒸发伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
}, {
  title: '仆万班钟·普攻首段',
  params: { team1: true, BondOfLife: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
}, {
  title: '仆万班钟·Q伤害',
  params: { team1: true, BondOfLife: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '仆夜万班·普攻首段蒸发',
  params: { team2: true, BondOfLife: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
}, {
  title: '仆夜万班·Q蒸发',
  params: { team2: true, BondOfLife: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
}]

export const defDmgIdx = 0
export const mainAttr = 'atk,cpct,cdmg,mastery,dmg'
export const defParams = ({ weapon }) => weapon.name === '赤月之形' ? { BondOfLife: 155 } : { BondOfLife: 130 }// 生命之契在此调整,请勿超过200

export const buffs = [{
  title: '阿蕾奇诺天赋：[buffCount]%最大生命值的生命之契,普通攻击伤害提升[aPlus]',
  data: {
    buffCount: ({ params }) => Math.min(params.BondOfLife, 200),
    aPlus: ({ talent, attr, params, cons }) => attr.atk * Math.min(params.BondOfLife, 200) / 100 * (cons >= 1 ? (talent.a['红死之宴提升'] + 100) : talent.a['红死之宴提升']) / 100
  }
}, {
  title: '阿蕾奇诺天赋：在战斗状态下获得[dmg]%伤害加成',
  data: {
    dmg: 40
  }
}, {
  title: '阿蕾奇诺6命：Q造成的伤害提高[qPlus],且释放后普通攻击与元素爆发的暴击率提高[aCpct]%,暴击伤害提高[aCdmg]%',
  cons: 6,
  data: {
    qPlus: ({ attr, params }) => attr.atk * Math.min(params.BondOfLife, 200) / 100 * 700 / 100,
    aCpct: 10,
    aCdmg: 70,
    qCpct: 10,
    qCdmg: 70
  }
}, {
  check: ({ params }) => params.team1 === true || params.team2 === true,
  title: '火共鸣：增加攻击[atkPct]%',
  data: {
    atkPct: 25
  }
}, {
  check: ({ params }) => params.team1 === true || params.team2 === true,
  title: '风鹰班：增加[atkPlus]点攻击力',
  data: {
    atkPlus: 1202.35
  }
}, {
  check: ({ params, artis }) => (params.team1 === true || params.team2 === true) && artis.昔日宗室之仪 !== 4,
  title: '班尼特-昔日宗室之仪：增加攻击[atkPct]%',
  data: {
    atkPct: 20
  }
}, {
  check: ({ cons, params }) => cons <= 1 && (params.team1 === true || params.team2 === true),
  title: '精1苍古0命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%',
  data: {
    aDmg: 16,
    a2Dmg: 16,
    a3Dmg: 16,
    dmg: 40,
    atkPct: 20,
    kx: 40
  }
}, {
  check: ({ cons, params }) => cons < 6 && cons > 1 && (params.team1 === true || params.team2 === true),
  title: '精1苍古2命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
  data: {
    aDmg: 16,
    a2Dmg: 16,
    a3Dmg: 16,
    dmg: 48,
    atkPct: 20,
    kx: 40,
    mastery: 200
  }
}, {
  check: ({ cons, params }) => cons >= 6 && (params.team1 === true || params.team2 === true),
  title: '精5苍古6命万叶：获得[dmg]%增伤(苍古普攻32增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
  data: {
    aDmg: 32,
    a2Dmg: 32,
    a3Dmg: 32,
    dmg: 48,
    atkPct: 40,
    kx: 40,
    mastery: 200
  }
}, {
  check: ({ params }) => params.team1 === true,
  title: '钟离：降低敌人[kx]%全抗',
  data: {
    kx: 20
  }
}, {
  check: ({ params }) => params.team2 === true,
  title: '夜兰：获得[dmg]%增伤',
  data: {
    dmg: 35
  }
}, 'vaporize']

export const createdBy = 'liangshi'
