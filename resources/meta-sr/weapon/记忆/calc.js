export default function(staticIdx, keyIdx) {
  return {
    "将光阴织成黄金": [
      staticIdx(1, "speedPct"),
      keyIdx("3层【织锦】使暴击伤害提高[cdmg]%，使造成的普攻伤害提高[aDmg]%", { cdmg: 2, aDmg: 2 })
    ],
    "胜利只在朝夕间": [
      staticIdx(1, "cdmg"),
      keyIdx("装备者的忆灵对我方目标施放技能时，使我方全体目标造成的伤害提高[dmg]%", "dmg", 2)
    ],
    "天才们的问候": [
      staticIdx(1, "atkPct"),
      keyIdx("装备者施放终结技后，使装备者与忆灵造成的普攻伤害额外提高[aDmg]%", "aDmg", 2)
    ],
    "多流汗，少流泪": [
      staticIdx(1, "cpct"),
      keyIdx("装备者的忆灵在场上时，装备者与忆灵造成的伤害提高[dmg]%", "dmg", 2)
    ],
    "记忆永不落幕": [
      staticIdx(1, "speedPct"),
      keyIdx("装备者施放战技后，使我方全体造成的伤害提高[dmg]%", "dmg", 2)
    ]
  }
}
