/*
* 角色资料数据相关
* */
import lodash from "lodash"
import { Material } from "../index.js"
import { Format } from "#miao"

// 角色排序
export const charPosIdx = {
  1: "宵宫,雷神,胡桃,甘雨,优菈,一斗,公子,绫人,魈,可莉,迪卢克,凝光,刻晴,辛焱,烟绯,雷泽",
  2: "夜兰,八重,九条,行秋,香菱,安柏,凯亚,丽莎,北斗,菲谢尔,重云,罗莎莉亚,埃洛伊",
  3: "申鹤,莫娜,早柚,云堇,久岐忍,五郎,砂糖,万叶,温迪",
  4: "班尼特,心海,琴,芭芭拉,七七,迪奥娜,托马,空,荧,阿贝多,钟离"
}

export const baseAttrName = {
  hp: "基础生命",
  atk: "基础攻击",
  def: "基础防御",
  speed: "基础速度"
}
export const growAttrName = {
  atkPct: "大攻击",
  atk: "大攻击",
  hpPct: "大生命",
  hp: "大生命",
  defPct: "大防御",
  def: "大防御",
  speed: "速度",
  cpct: "暴击",
  cdmg: "爆伤",
  recharge: "充能",
  mastery: "精通",
  heal: "治疗",
  phy: "物伤",
  stance: "击破特攻",
  effPct: "效果命中",
  effDef: "效果抵抗",
  elation: "欢愉度"
}

const mKeys = {
  "gs": [
    {
      key: "gem",
      num: "1/9/9/6"
    }, {
      key: "boss",
      num: "46",
      check: (char) => !char.isTraveler
    }, {
      key: "normal",
      num: "18/30/36"
    }, {
      key: "specialty",
      num: "168"
    }, {
      key: "talent"
    }, {
      key: "weekly",
      star: 5
    }
  ],
  "sr": [
    {
      key: "101",
      num: "388.8w",
      check: () => "322.64w"
    }, {
      key: "201",
      num: "65",
      check: () => "28"
    }, {
      key: "701",
      num: "56/71/73",
      check: (char) => char.weaponType == "记忆" ? "40/52/55" : "40/55/54"
    }, {
      key: "501",
      num: "8",
      check: () => "5"
    }, {
      key: "401",
      num: "12"
    }, {
      key: "301",
      num: "18/69/139",
      check: (char) => char.weaponType == "记忆" ? "9/53/105" : "12/54/105"
    }
  ]
}

// let item = (type, lv, num) => {
//   return { type, lv, num }
// }
// let gem = (lv = 1, num = 1) => item("gem", lv, num)
// let sp = (num) => item("specialty", 1, num)
// let normal = (lv, num) => item("normal", lv, num)
// let boss = (num) => item("boss", 1, num)
// let money = (num) => item("money", 1, num)
// const lvKeys = [
//   {
//     lv: "1"
//   }, {
//     lv: "20"
//   }, {
//     lv: "20+",
//     items: [ gem(1, 1), sp(3), normal(1, 3), money(2) ]
//   }, {
//     lv: "40",
//     total: [ gem(1, 1), sp(3), normal(1, 3), money(2) ]
//   }, {
//     lv: "40+",
//     items: [ gem(2, 3), boss(2), sp(10), normal(1, 15), money(4) ]
//   }, {
//     lv: "50",
//     total: [ gem(1, 1), gem(2, 3), boss(2), sp(13), normal(1, 18), money(6) ]
//   }, {
//     lv: "50+",
//     items: [ gem(2, 6), boss(4), sp(20), normal(2, 12), money(6) ]
//   }, {
//     lv: "60",
//     total: [ gem(1, 1), gem(2, 9), boss(6), sp(33), normal(1, 18), normal(2, 12), money(12) ]
//   }, {
//     lv: "60+",
//     items: [ gem(3, 3), boss(8), sp(30), normal(2, 18), money(8) ]
//   }, {
//     lv: "70",
//     total: [ gem(1, 1), gem(2, 9), gem(3, 3), boss(14), sp(63), normal(1, 18), normal(2, 30), money(20) ]
//   }, {
//     lv: "70+",
//     items: [ gem(3, 6), boss(12), sp(45), normal(3, 12), money(10) ]
//   }, {
//     lv: "80",
//     total: [ gem(1, 1), gem(2, 9), gem(3, 9), boss(26), sp(108), normal(1, 18), normal(2, 30), normal(3, 12), money(30) ]
//   }, {
//     lv: "80+",
//     items: [ gem(4, 6), boss(20), sp(60), normal(3, 24), money(12) ]
//   }, {
//     lv: "90",
//     total: [ gem(1, 1), gem(2, 9), gem(3, 9), gem(4, 6), boss(46), sp(168), normal(1, 18), normal(2, 30), normal(3, 36), money(42) ]
//   }
// ]

const CharMeta = {
  getAttrList(data) {
    let attr = []
    let growret = []
    lodash.forEach(data.baseAttr, (v, k) => {
      if (baseAttrName[k]) {
        attr.push({
          title: baseAttrName[k],
          value: Format.comma(v, 1)
        })
      }
    })
    if (data.isGs) {
      attr.push({
        title: "成长·" + (data.growAttr.key === "dmg" ? `${data.elemName}伤` : growAttrName[data.growAttr.key]),
        value: data.growAttr.value.toString().length > 10 ? Format.comma(data.growAttr.value, 1) : data.growAttr.value
      })
    } else {
      let obj = {}
      for (let key of Object.keys(data.meta?._detail?.tree)) {
        let i = data.meta?._detail?.tree[key]
        obj[i.key] = obj[i.key] ? obj[i.key] + i.value : i.value
      }
      for (let i in obj) {
        growret.push({
          title: growAttrName[i] || `${data.elemName}伤`,
          value: Format.comma(obj[i], 1)
        })
      }
    }
    return {
      attr,
      growret
    }
  },
  getMaterials(char, type = "all") {
    let ds = char.materials || {}
    let ret = []
    if (char.isSr) {
      let detail = char.detail
      let list = {}
      lodash.forEach({ ...detail.treeData, ...detail.attr }, (cfg) => {
        lodash.forEach(cfg.cost, (cost, idx) => {
          list[idx] += cost[idx]
        })
      })
      let datas = {}
      lodash.forEach(list, (idx, key) => {
        let mat = Material.get(key, "sr")
        if (!mat) return true
        datas[mat.name] = mat.star
        if (ds[mat.poseType] && datas[ds[mat.poseType]] > mat.star) return true
        ds[mat.poseType] = mat.name
      })
    }
    lodash.forEach(mKeys[char.game], (cfg) => {
      let title = ds[cfg.key]
      let mat = Material.get(title, char.game)
      if (!mat) return true
      if (cfg.check) {
        if (char.isGs) {
          if (!cfg.check(char)) return true
        } else {
          if ((char.isTrailblazer || char.star === 4) && cfg.check(char)) cfg.num = cfg.check(char)
        }
      }
      if (type !== "all" && mat.type !== type) return true

      ret.push({
        ...mat.getData("label,star,icon,poseType"),
        num: cfg.num || mat.source || ""
      })
    })
    return type === "all" ? ret : ret[0]
  },

  getDesc(desc) {
    desc = desc.replace(/。$/, "")
    desc = desc.replace("</br>", "，")
    desc = desc.replace(/[。,]/g, "，")
    desc = desc.replace("——", "，——")
    let len = desc.length
    if (len < 25) return desc

    if (/-/.test(desc)) {
      let idx = desc.indexOf("—")
      return [ desc.substr(0, idx), desc.substr(idx, desc.length) ].join("</br>")
    }
    desc = desc.split("，")
    return CharMeta.getDescLine(desc)
  },
  getDescLine(inputs) {
    let lens = []
    let len = 0
    let descs = []
    const maxChars = 26
    for (let desc of inputs) {
      if (len + desc.length < maxChars * 2) {
        lens.push(desc.length)
        descs.push(desc)
        len += desc.length
      } else {
        break
      }
    }
    if (len <= maxChars - 6) return descs.join("，")

    let ret = [ [], [] ]
    let idx = 0
    for (let desc of descs) {
      if (ret[idx].join(" ").length + desc.length > maxChars) idx++
      ret[idx] = ret[idx] || []
      ret[idx].push(desc)
      if (descs.length === 2) idx++
    }
    return ret[0].join("，") + "</br>" + ret[1].join("，")
  }
}

export default CharMeta
