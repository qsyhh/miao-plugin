/* eslint-disable import/no-unresolved */
import lodash from "lodash"
import { Common, Format } from "#miao"

const CharTalent = {
  async render(e, mode, char) {
    let lvs = []
    for (let i = 1; i <= 15; i++) {
      lvs.push("Lv" + i)
    }
    let detail = JSON.parse(JSON.stringify(char.getDetail()))
    if (char.game === "sr") {
      lodash.forEach([ "cons", "talent", "treeData" ], (key) => {
        lodash.forEach(detail[key], (ds, idx) => {
          if (ds.desc) {
            if (key === "talent" && ds.desc.split) {
              let desc = CharTalent.getDesc(ds.desc, ds.tables, ("a,a2,me,me2,mt,mt1,mt2").split(",").includes(idx) ? 5 : 8)
              ds.desc = desc.desc
              ds.tables = desc.tables
            } else if (ds.desc.split) {
              ds.desc = ds.desc.split("<br>")
            }
          }
        })
      })
    }
    return await Common.render("wiki/character-talent", {
      saveId: `${mode}-${char.id}`,
      ...char.getData(),
      game: char.game,
      detail,
      imgs: char.getImgs(),
      mode,
      lvs,
      line: CharTalent.getLineData(char)
    }, { e, scale: 1.1 })
  },
  getLineData(char) {
    let ret = []
    const attrMap = {
      gs: {
        atkPct: "大攻击",
        hpPct: "大生命",
        defPct: "大防御",
        cpct: "暴击",
        cdmg: "爆伤",
        recharge: "充能",
        mastery: "精通",
        heal: "治疗",
        dmg: char.elemName + "伤",
        phy: "物伤"
      },
      sr: {
        atk: "大攻击",
        def: "大防御",
        hp: "大生命",
        speed: "速度",
        cpct: "暴击率",
        cdmg: "暴击伤害",
        recharge: "充能效率",
        heal: "治疗加成",
        stance: "击破特攻",
        effPct: "效果命中",
        effDef: "效果抵抗"
      }
    }
    if (char.isSr) {
      lodash.forEach({ hp: "基础生命", atk: "基础攻击", def: "基础防御", speed: "速度" }, (label, key) => {
        ret.push({
          num: Format.comma(char.getDetail().baseAttr[key], 1),
          label
        })
      })
      let obj = {}
      let growret = []
      for (let key of Object.keys(char.getDetail().tree)) {
        let i = char.getDetail().tree[key]
        obj[i.key] = obj[i.key] ? obj[i.key] + i.value : i.value
      }
      for (let i in obj) {
        growret.push({
          label: attrMap.sr[i] || `${char.elem}伤`,
          num: Format.comma(obj[i], 1)
        })
      }

      return {
        ret,
        growret
      }
    }
    lodash.forEach({ hp: "基础生命", atk: "基础攻击", def: "基础防御" }, (label, key) => {
      ret.push({
        num: Format.comma(char.baseAttr[key], 1),
        label
      })
    })
    let ga = char.growAttr
    ret.push({
      num: ga.key === "mastery" ? Format.comma(ga.value, 1) : ga.value,
      label: `成长·${attrMap.gs[ga.key]}`
    })
    return ret
  },
  // 获取精炼描述
  getDesc(desc, tables, lv = 5) {
    let reg = /\$(\d)\[(i|f1|f2)](%?)/g

    let ret

    let idxFormat = {}
    while ((ret = reg.exec(desc)) !== null) {
      let [ , idx, format, pct ] = ret
      let value = tables?.[idx]?.values[lv - 1]
      if (value) {
        if (pct === "%") {
          idxFormat[idx] = "percent"
          value = Format.percent(value, format === "f2" ? 2 : 1)
        } else {
          idxFormat[idx] = "comma"
          value = Format.comma(value)
        }
        value = value + ` (lv${lv})`
        desc = desc.replaceAll(ret[0], value)
      }
    }
    let tableRet = []
    lodash.forEach(tables, (ds, idx) => {
      let values = []
      lodash.forEach(ds.values, (v) => {
        values.push(ds.isSame ? v : Format[idxFormat[idx] || "comma"](v))
      })
      tableRet.push({
        name: ds.name,
        isSame: ds.isSame,
        values
      })
    })
    return {
      desc: desc.split("<br>"),
      tables: tableRet
    }
  }
}

export default CharTalent
