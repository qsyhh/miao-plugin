import lodash from "lodash"
import { Character } from "#miao.models"
import { Data } from "#miao"

let MiaoData = {
  setAvatar(player, ds) {
    let char = Character.get(ds.id)
    let avatar = player.getAvatar(ds.id, true)
    if (!char) return false
    let detail = {}

    if (player.isSr) {
      avatar.setAvatar({
        ...ds,
        ...MiaoData.getTalentSR(char, ds.talent)
      }, "miao")
    } else {
      let artis = MiaoData.getArtis(ds.artis)
      let talentRet = MiaoData.getTalent(char, ds.talent)
      detail = {
        ...ds,
        artis,
        elem: talentRet.elem,
        talent: talentRet.talent
      }
      avatar.md5 = Data.generateMD5(detail)
      avatar.setAvatar(detail, "miao")
    }
    return avatar
  },

  getTalent(char, data = {}) {
    let { talentId = {}, talentElem = {} } = char.meta
    let elem = ""
    let idx = 0
    let ret = {}
    lodash.forEach(data, (level, id) => {
      let key
      if (talentId[id]) {
        key = talentId[id]
        elem = elem || talentElem[id]
        ret[key] = level
      } else {
        key = [ "a", "e", "q" ][idx]
        ret[key] = level
      }
      idx++
    })
    return {
      talent: ret,
      elem
    }
  },

  getTalentSR(char, data) {
    let talent = {}
    let trees = []
    lodash.forEach(data, (lv, id) => {
      let key = char.getTalentKey(id)
      if (key || lv > 1) {
        talent[key || id] = lv
      } else {
        trees.push(id)
      }
    })
    return { talent, trees }
  },

  getArtis(data) {
    let ret = {}
    lodash.forEach(data, (ds, key) => {
      ret[key] = {
        level: ds.level,
        name: ds.name,
        star: ds.star,
        mainId: ds.mainId,
        attrIds: ds.attrIds
      }
    })
    return ret
  }
}
export default MiaoData
