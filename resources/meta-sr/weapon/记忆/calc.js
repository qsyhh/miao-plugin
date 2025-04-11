export default function(staticIdx, keyIdx) {
  return {
    "溯忆": (tables) => {
      return {
        check: ({ params }) => params.Memosprite,
        title: "忆灵在场时，4层【缅怀】使造成的伤害提高[dmg]%",
        data: {
          dmg: tables[1] * 4
        }
      }
    },
    "将光阴织成黄金": [
      staticIdx(1, "speedPct"),
      (tables) => {
        return {
          title: "6层【织锦】使装备者和装备者的忆灵暴击伤害提高[cdmg]%，使造成的普攻伤害提高[aDmg]%",
          data: {
            cdmg: tables[2] * 6,
            aDmg: tables[3] * 6,
            meDmg: tables[3] * 6
          }
        }
      }
    ],
    "胜利只在朝夕间": [
      staticIdx(1, "cdmg"),
      (tables) => {
        return {
          check: ({ params }) => params.Memosprite,
          title: "装备者的忆灵对我方目标施放技能时，使我方全体目标造成的伤害提高[dmg]%",
          data: {
            dmg: tables[2]
          }
        }
      }
    ],
    "天才们的问候": [
      staticIdx(1, "atkPct"),
      keyIdx("装备者施放终结技后，使装备者与忆灵造成的普攻伤害额外提高[aDmg]%", { aDmg: 2, meDmg: 2 })
    ],
    "多流汗，少流泪": [
      staticIdx(1, "cpct"),
      (tables) => {
        return {
          check: ({ params }) => params.Memosprite,
          title: "装备者的忆灵在场上时，装备者与忆灵造成的伤害提高[dmg]%",
          data: {
            dmg: tables[2]
          }
        }
      }
    ],
    "记忆永不落幕": [
      staticIdx(1, "speedPct"),
      keyIdx("装备者施放战技后，使我方全体造成的伤害提高[dmg]%", "dmg", 2)
    ],
    "让告别，更美一些": [
      staticIdx(1, "hpPct"),
      keyIdx("使装备者和装备者的忆灵造成的伤害时，无视目标[ignore]%的防御力", "ignore", 2)
    ]
  }
}
