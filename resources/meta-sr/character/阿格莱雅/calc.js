/* eslint-disable import/no-unresolved */
import { Format } from "#miao"

export const details = [
  {
    title: "普攻伤害",
    dmg: ({ talent }, dmg) => dmg(talent.a["技能伤害"], "a")
  }, {
    title: "强化普攻伤害(主目标)",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.a2["技能伤害"], "a")
  }, {
    title: "强化普攻衣匠伤害(主目标)",
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.a2["技能伤害·衣匠"], "me")
  }, {
    title: "强化普攻伤害(加衣匠完整)",
    params: { q: true },
    dmg: ({ talent }, dmg) => {
      let aDmg = dmg(talent.a2["技能伤害"] + talent.a2["相邻目标伤害"] * 2, "a")
      let meDmg = dmg(talent.a2["技能伤害·衣匠"] + talent.a2["相邻目标伤害·衣匠"] * 2, "me")
      return {
        dmg: aDmg.dmg + meDmg.dmg,
        avg: aDmg.avg + meDmg.avg
      }
    }
  }, {
    title: "战技衣匠回复",
    dmg: ({ talent, attr, calc }, { heal }) => heal((calc(attr.hp) * talent.t["生命·百分比"] / 100 + talent.t["生命·固定值"]) * talent.e["生命恢复"])
  }, {
    title: "终结技6层速度提高",
    dmg: ({ talent, cons, attr, calc }) => {
      let { speed } = calcSpeed({ talent, cons, attr, calc })
      return {
        avg: Format.comma(speed - calc(attr.speed), 1),
        type: "text"
      }
    }
  }, {
    title: "天赋附加伤害",
    dmg: ({ talent }, dmg) => dmg(talent.t["附加伤害"], "t")
  }, {
    title: "忆灵技伤害(主目标)",
    dmg: ({ talent }, dmg) => dmg(talent.me["目标伤害"], "me")
  }, {
    title: "忆灵技伤害(完整)",
    dmg: ({ talent }, dmg) => dmg(talent.me["目标伤害"] + talent.me["相邻目标伤害"] * 2, "me")
  }, {
    title: "忆灵天赋6层衣匠速度提高",
    dmg: ({ talent, cons }) => {
      let buffCount = cons > 3 ? 7 : 6
      return {
        avg: Format.comma(talent.mt["速度提高"] * buffCount, 1),
        type: "text"
      }
    }
  }
]

export const defDmgIdx = 3
export const defParams = { Memosprite: true }
export const mainAttr = "atk,cpct,cdmg"

export const buffs = [
  {
    title: "衣匠状态：基础生命值: [_hpBase]，基础速度: [_speedBase]",
    tree: 1,
    data: {
      _hpBase: ({ talent, attr, calc }) => calc(attr.hp) * talent.t["生命·百分比"] / 100 + talent.t["生命·固定值"],
      _speedBase: ({ attr, calc }) => calc(attr.speed) * 35 / 100
    }
  },
  {
    title: "行迹-短视之惩：6层忆灵天赋下释放终结技，攻击力提高[_atkPlus]",
    tree: 1,
    data: {
      _atkPlus: ({ talent, cons, attr, calc }) => {
        let { speed, mSpeed } = calcSpeed({ talent, cons, attr, calc })
        return speed * 720 / 100 + mSpeed * 360 / 100
      },
      atkPlus: ({ talent, cons, attr, calc, params }) => {
        if (!params.q) return 0
        let { speed, mSpeed } = calcSpeed({ talent, cons, attr, calc })
        return speed * 720 / 100 + mSpeed * 360 / 100
      }
    }
  }, {
    title: "阿格莱雅1魂：处于【间隙织线】状态下的敌人受到的伤害提高15%",
    cons: 1,
    data: {
      enemydmg: ({ params }) => params.q ? 15 : 0
    }
  }, {
    title: "阿格莱雅2魂：当阿格莱雅或衣匠行动时，3层使阿格莱雅与衣匠造成的伤害无视目标[ignore]%的防御力",
    cons: 2,
    data: {
      ignore: 14 * 3
    }
  }, {
    title: "阿格莱雅4魂：忆灵天赋的速度提高效果层数上限提高1层",
    cons: 4
  }, {
    title: "阿格莱雅6魂：当阿格莱雅处于【至高之姿】状态时，自身与衣匠的雷属性抗性穿透提高20%",
    cons: 6,
    data: {
      kx: ({ params }) => params.q ? 20 : 0
    }
  }, {
    title: "阿格莱雅6魂：阿格莱雅速度高于[_speed]点，其造成的连携攻击伤害提高[_aDmg]%；衣匠速度高于[_mSpeed]点，其造成的连携攻击伤害提高[_meDmg]%",
    cons: 6,
    data: {
      _speed: ({ talent, cons, attr, calc }) => {
        let { speed } = calcSpeed({ talent, cons, attr, calc })
        return speed > 320 ? 320 : speed > 240 ? 240 : speed > 160 ? 160 : 0
      },
      _mSpeed: ({ talent, cons, attr, calc }) => {
        let { mSpeed } = calcSpeed({ talent, cons, attr, calc })
        return mSpeed > 320 ? 320 : mSpeed > 240 ? 240 : mSpeed > 160 ? 160 : 0
      },
      _aDmg: ({ talent, cons, attr, calc }) => {
        let { speed } = calcSpeed({ talent, cons, attr, calc })
        return speed > 320 ? 60 : speed > 240 ? 30 : speed > 160 ? 10 : 0
      },
      aDmg: ({ talent, cons, attr, calc, params }) => {
        if (!params.q) return 0
        let { speed } = calcSpeed({ talent, cons, attr, calc })
        return speed > 320 ? 60 : speed > 240 ? 30 : speed > 160 ? 10 : 0
      },
      _meDmg: ({ talent, cons, attr, calc }) => {
        let { mSpeed } = calcSpeed({ talent, cons, attr, calc })
        return mSpeed > 320 ? 60 : mSpeed > 240 ? 30 : mSpeed > 160 ? 10 : 0
      },
      meDmg: ({ talent, cons, attr, calc, params }) => {
        if (!params.q) return 0
        let { mSpeed } = calcSpeed({ talent, cons, attr, calc })
        return mSpeed > 320 ? 60 : mSpeed > 240 ? 30 : mSpeed > 160 ? 10 : 0
      }
    }
  }
]

/**
 * @param ds - 数据集
 * @returns {number | object}
 * - speed 阿格莱雅速度
 * - mSpeed 衣匠速度
 */
function calcSpeed(ds) {
  let { talent, cons, attr, calc } = ds
  let buffCount = cons > 3 ? 7 : 6
  return {
    speed: calc(attr.speed) * (1 + talent.q["速度提高"] * buffCount),
    mSpeed: calc(attr.speed) * 35 / 100 + talent.mt["速度提高"] * buffCount
  }
}

export const createdBy = "其实雨很好"
