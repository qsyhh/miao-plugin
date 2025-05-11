import lodash from "lodash"
import { Data } from "#miao"
import { Character } from "#miao.models"

/**
 * 鳄梨
 */
export default {
  id: "avocado",
  name: "avocado.wiki",
  cfgKey: "avocadoApi",
  // 处理请求参数
  async request(api) {
    let params = {
      headers: { "User-Agent": this.getCfg("userAgent") }
    }
    return { api, params }
  },

  // 处理服务返回
  async response(data, req) {
    if (!data.playerDetailInfo) return req.err("error", 60)
    let ds = data.playerDetailInfo
    let ac = ds.assistAvatar
    let avatars = {}
    if (ac && !lodash.isEmpty(ac)) avatars[ac.avatarId] = ac
    lodash.forEach(ds.displayAvatars, (ds) => {
      avatars[ds.avatarId] = ds
    })

    if (lodash.isEmpty(avatars)) return req.err("empty", 5 * 60)
    ds.avatars = avatars
    return ds
  },

  async updatePlayer(player, data) {
    try {
      player.setBasicData(Data.getData(data, "name:nickname,face:headIconID,level:level,word:level,sign:signature"))
      await Promise.all(lodash.map(data.avatars, async(ds, id) => {
        let key = `miao:profile:sr:${player.uid}:md5:${ds.avatarId}`
        let md5 = await redis.get(key)
        if (!md5) {
          md5 = Data.generateMD5(Data.getData(player._original[ds.avatarId], "level,cons,weapon,talent,trees,artis"), "sr")
          redis.set(key, md5)
        }
        let ret = AvocadoData.setAvatar(player, ds)
        if (ret) {
          player._update.push(ds.avatarId)
          if (ret.md5 !== md5) {
            player._hasUpdate.push(ds.avatarId)
            redis.set(key, ret.md5)
          }
        }
      }))
    } catch (e) {
      logger.error(e)
    }
  },

  // 获取冷却时间
  cdTime(data) {
    return data.ttl || 60
  }
}

const AvocadoData = {
  setAvatar(player, data) {
    let char = Character.get(data.avatarId)
    if (!char) return false

    let avatar = player.getAvatar(char.id, true)
    const setData = {
      level: data.level,
      promote: data.promotion,
      cons: data.rank || 0,
      weapon: Data.getData(data.equipment, "id:id,promote:promotion,level,affix:rank"),
      ...AvocadoData.getTalent(data.behaviorList, char),
      artis: AvocadoData.getArtis(data.relics)
    }
    avatar.md5 = Data.generateMD5(setData, "sr")
    avatar.setAvatar(setData, "avocado.wiki")
    return avatar
  },
  getTalent(ds, char) {
    let talent = {}
    let trees = []
    lodash.forEach(ds, (d) => {
      let key = char.getTalentKey(d.id)
      if (key || d.level > 1) {
        talent[key || d.id] = d.level
      } else {
        trees.push(d.id)
      }
    })
    return { talent, trees }
  },
  getArtis(artis) {
    let ret = {}
    lodash.forEach(artis, (ds) => {
      let tmp = {
        level: ds.level || 0,
        id: ds.id,
        mainId: ds.main_affix_id,
        attrIds: []
      }
      lodash.forEach(ds.sub_affix_id, (s) => {
        if (!s.id) return true
        tmp.attrIds.push([ s.id, s.cnt, s.step || 0 ].join(","))
      })
      ret[ds.type] = tmp
    })
    return ret
  }
}
