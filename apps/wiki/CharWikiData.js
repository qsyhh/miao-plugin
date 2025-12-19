import lodash from "lodash"
import LelaerApi from "../stat/LelaerApi.js"
import { ArtifactSet, Weapon } from "#miao.models"

let CharWikiData = {
  /**
   * 角色命座持有
   * @param ud 数据
   */
  getHolding(ud) {
    let holding = {}
    lodash.forEach(("0,1,2,3,4,5,6").split(","), (ds) => { holding[ds] = ud[`c${ds}`] + "%" })
    return holding
  },

  /**
   * 角色武器、圣遗物使用
   * @param name 角色名
   */
  async getRole(name) {
    let ud = (await LelaerApi.getRole(name))?.data || {}
    if (!ud.role) return {}

    return {
      num: ud.avg_class,
      holding: CharWikiData.getHolding(ud),
      usage: {
        weapons: CharWikiData.getWeaponsData(ud.weapon),
        artis: CharWikiData.getArtisData(ud.artifacts_set)
      }
    }
  },

  /**
   * 武器使用
   * @param data
   */
  getWeaponsData(data = []) {
    let weapons = []

    lodash.forEach(data, (ds) => {
      let weapon = Weapon.get(ds.name) || {}
      weapons.push({
        ...weapon.getData("name,abbr,img,star"),
        value: ds.rate + "%"
      })
    })
    return weapons
  },

  /**
   * 圣遗物使用
   * @param data
   */
  getArtisData(data = []) {
    let artis = []

    lodash.forEach(data, (ds) => {
      let imgs = []
      let abbrs = []
      let ss = ds.name.split("+")
      lodash.forEach(ss, (t) => {
        if (t === "暂无套装") {
          imgs.push("common/item/artifact-icon.webp")
          abbrs.push("其他")
        } else {
          t = /([\s\S]*?)(2|4)/.exec(t)
          let artiSet = ArtifactSet.get(t[1])
          if (artiSet) {
            imgs.push(artiSet.img)
            abbrs.push(artiSet.abbr + (ss.length === 1 ? t[2] : ""))
          }
        }
      })

      artis.push({
        imgs,
        title: abbrs.join("+"),
        value: ds.rate + "%"
      })
    })
    return artis
  }
}

export default CharWikiData
