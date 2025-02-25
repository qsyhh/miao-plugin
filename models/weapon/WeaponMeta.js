/* eslint-disable import/no-unresolved */
/*
* 武器资料数据相关
* */
import lodash from "lodash"
import { Material } from "../index.js"

const mKeys = {
  "gs": [
    {
      key: "weapon",
      num: (weapon) => weapon.star == 4 ? "3/9/9/4" : "5/14/14/6"
    }, {
      key: "monster",
      num: (weapon) => weapon.star == 4 ? "10/15/18" : "23/27/41"
    }, {
      key: "normal",
      num: (weapon) => weapon.star == 4 ? "15/18/27" : "15/23/27"
    }
  ],
  "sr": [
    {
      key: "101",
      num: (weapon) => weapon.star == 4 ? "70.7w" : "88.3w"
    }, {
      key: "301",
      num: (weapon) => weapon.star == 4 ? "3/9/12" : "4/12/15"
    }, {
      key: "701",
      num: (weapon) => weapon.star == 4 ? "15/15/12" : "20/20/14"
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
      let num = cfg.num(weapon) || ""

      ret.push({
        ...mat.getData("label,star,icon,poseType"),
        num
      })
    })
    return type === "all" ? ret : ret[0]
  }
}

export default WeaponMeta
