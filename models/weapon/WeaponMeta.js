/*
* 武器资料数据相关
* */
import lodash from "lodash"
import { Material } from "../index.js"

const mKeys = {
  "gs": [
    {
      key: "weapon",
      num: {
        1: "1/3/1",
        2: "1/4/1",
        3: "2/6/6/3",
        4: "3/9/9/4",
        5: "5/14/14/6"
      }
    }, {
      key: "monster",
      num: {
        1: "5/6",
        2: "6/8",
        3: "10/12/18",
        4: "15/18/27",
        5: "23/27/41"
      }
    }, {
      key: "normal",
      num: {
        1: "3/5",
        2: "5/7",
        3: "6/10/12",
        4: "10/15/18",
        5: "15/23/27"
      }
    }
  ],
  "sr": [
    {
      key: "101",
      num: {
        3: "53.1w",
        4: "70.7w",
        5: "88.3w"
      }
    }, {
      key: "301",
      num: {
        3: "2/6/9",
        4: "3/9/12",
        5: "4/12/15"
      }
    }, {
      key: "701",
      num: {
        3: "12/10/8",
        4: "15/15/12",
        5: "20/20/14"
      }
    }
  ]
}

const WeaponMeta = {
  getMaterials(weapon, type = "all") {
    let ds = weapon.materials || {}
    let ret = []
    if (weapon.isSr) {
      let detail = weapon.detail
      let list = {}
      lodash.forEach(detail.attr, (cfg) => {
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
    lodash.forEach(mKeys[weapon.game], (cfg) => {
      let title = ds[cfg.key]
      let mat = Material.get(title, weapon.game)
      if (!mat) return true
      let num = cfg.num?.[weapon.star] || ""

      ret.push({
        ...mat.getData("label,star,icon,poseType"),
        num
      })
    })
    return type === "all" ? ret : ret[0]
  }
}

export default WeaponMeta
