import lodash from "lodash"
import { Data } from "#miao"
import { Character } from "#miao.models"

let HttpsProxyAgent = ""

export default {
  id: "enkahsr",
  name: "EnkaHSR",
  cfgKey: "enkaHSRApi",
  // 处理请求参数
  async request(api) {
    let params = {
      headers: { "User-Agent": this.getCfg("userAgent") }
    }
    let proxy = this.getCfg("proxyAgent")
    if (proxy) {
      if (HttpsProxyAgent === "") {
        const { HttpsProxyAgent: ProxyAgent } = await import("https-proxy-agent").catch((err) => {
          logger.error(err)
        })
        HttpsProxyAgent = ProxyAgent
      }
      if (HttpsProxyAgent) params.agent = new HttpsProxyAgent(proxy)
    }
    return { api, params }
  },

  // 处理服务返回
  async response(data, req) {
    if (!data.detailInfo) return req.err("error", 60)
    let ds = data.detailInfo
    let ac = ds.assistAvatarDetail
    let avatars = {}
    if (ac && !lodash.isEmpty(ac)) avatars[ac.AvatarID] = ac
    lodash.forEach(ds.avatarDetailList, (ds) => {
      avatars[ds.avatarId] = ds
    })

    if (lodash.isEmpty(avatars)) return req.err("empty", 5 * 60)
    ds.avatars = avatars
    return ds
  },

  async updatePlayer(player, data) {
    try {
      player.setBasicData(Data.getData(data, "name:nickname,face:headIcon,level:level,word:level,sign:signature"))
      await Promise.all(lodash.map(data.avatars, async(ds, id) => {
        let key = `miao:profile:sr:${player.uid}:md5:${ds.avatarId}`
        let md5 = await redis.get(key)
        if (!md5) {
          md5 = Data.generateMD5(Data.getData(player._original[ds.avatarId], "level,cons,weapon,talent,trees,artis"), "sr")
          redis.set(key, md5)
        }
        let ret = EnkaHSRData.setAvatar(player, ds)
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

const EnkaHSRData = {
  setAvatar(player, data) {
    let char = Character.get(data.avatarId)
    if (!char) return false

    let avatar = player.getAvatar(char.id, true)
    const setData = {
      level: data.level,
      promote: data.promotion,
      cons: data.rank || 0,
      weapon: Data.getData(data.equipment, "id:tid,promote:promotion,level,affix:rank"),
      ...EnkaHSRData.getTalent(data.skillTreeList, char),
      artis: EnkaHSRData.getArtis(data.relicList)
    }
    avatar.md5 = Data.generateMD5(setData, "sr")
    avatar.setAvatar(setData, "EnkaHSR")
    return avatar
  },
  getTalent(ds, char) {
    let talent = {}
    let trees = []
    lodash.forEach(ds, (d) => {
      let key = char.getTalentKey(d.pointId)
      if (key || d.Level > 1) {
        talent[key || d.pointId] = d.level
      } else {
        trees.push(d.pointId)
      }
    })
    return { talent, trees }
  },
  getArtis(artis) {
    let ret = {}
    lodash.forEach(artis, (ds) => {
      let tmp = {
        level: ds.level || 0,
        id: ds.tid,
        mainId: ds.mainAffixId,
        attrIds: []
      }
      lodash.forEach(ds.subAffixList, (s) => {
        if (!s.affixId) {
          return true
        }
        tmp.attrIds.push([ s.affixId, s.cnt, s.step || 0 ].join(","))
      })
      ret[ds.type] = tmp
    })
    return ret
  }
}
