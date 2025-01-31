/* eslint-disable import/no-unresolved */
import { Format } from "#miao"

export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技标记后普攻伤害",
    params: { e: true },
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "战技伤害",
    params: { e: true },
    dmg: ({ talent }, dmg) => dmg(talent.e["技能伤害"], "e")
  }, {
    title: "终结技提高单体速度",
    dmg: ({ talent }) => {
      return {
        avg: Format.percent(talent.q["速度提升"]),
        type: "text"
      }
    }
  }, {
    title: "终结技提高单体攻击力",
    dmg: ({ talent }) => {
      return {
        avg: Format.percent(talent.q["速度提升"]),
        type: "text"
      }
    }
  }, {
    title: "天赋提高AEQ伤害",
    dmg: ({ talent, cons }) => {
      let extraTd = cons < 6 ? 0 : 0.1
      return {
        avg: Format.percent(talent.t["伤害提高"] + extraTd),
        type: "text"
      }
    }
  }
]

export const defDmgIdx = 1
export const mainAttr = "atk,cpct,cdmg,dmg"

export const buffs = [
  {
    title: "终结技-十王敕令，遍土遵行：使我方角色速度提高[_speedPlus]攻击力提高[_atkPct]%",
    data: {
      _speedPlus: ({ talent, attr }) => attr.speed * talent.q["速度提高"] * 100,
      _atkPct: ({ talent }) => talent.q["攻击力提高"] * 100,
      speedPlus: ({ talent, attr, params }) => params.q ? attr.speed * talent.q["速度提高"] * 100 : 0,
      atkPct: ({ talent, params }) => params.q ? talent.q["攻击力提高"] * 100 : 0
    }
  }, {
    title: "天赋-罚恶：对战技标记的敌人造成的普攻、战技、终结技伤害提高[_dmg]%",
    data: {
      _dmg: ({ talent }) => talent.t["伤害提高"] * 100,
      dmg: ({ talent, params }) => params.e ? talent.t["伤害提高"] * 100 : 0
    }
  }, {
    title: "寒鸦2魂：释放战技后，速度提高[speedPct]%",
    cons: 2,
    data: {
      speedPct: 20
    }
  }, {
    title: "寒鸦6魂：天赋的伤害提高效果额外提高10%",
    cons: 6,
    data: {
      dmg: ({ params }) => params.e ? 10 : 0
    }
  }
]

export const createdBy = "其实雨很好"
