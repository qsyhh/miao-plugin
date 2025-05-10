import lodash from "lodash"
import EnkaData from "./EnkaData.js"
import { Format, Data } from "#miao"

export default {
  id: "hutao",
  name: "Hutao-Enka",
  cfgKey: "hutaoApi",
  // 处理请求参数
  async request(api) {
    let params = {
      headers: { "User-Agent": this.getCfg("userAgent") }
    }
    return { api, params }
  },

  // 处理服务返回
  async response(data, req) {
    if (!data.playerInfo) {
      if (data.error) {
        logger.error(`Enka ReqErr: ${data.error}`)
      }
      return req.err("error", 60)
    }
    let details = data.avatarInfoList
    if (!details || details.length === 0 || !details[0].propMap) return req.err("empty", 5 * 60)
    return data
  },

  async updatePlayer(player, data) {
    player.setBasicData(Data.getData(data, "name:nickname,face:profilePicture.avatarID,card:nameCardID,level,word:worldLevel,sign:signature"))
    await Promise.all(lodash.map(data.avatarInfoList, async(ds) => {
      let md5 = await redis.get(`miao:profile:${player.uid}:md5:${ds.avatarId}`)
      if (!md5) {
        md5 = Format.generateMD5(Data.getData(player._original[ds.avatarId], "id,level,promote,cons,fetter,costume,elem,weapon,talent,artis"))
        redis.set(`miao:profile:${player.uid}:md5:${ds.avatarId}`, md5)
      }
      let ret = EnkaData.setAvatar(player, ds, "hutao")
      if (ret) {
        player._update.push(ret.id)
        if (ret.md5 !== md5) {
          player._hasUpdate.push(ret.id)
          redis.set(`miao:profile:md5:${ds.avatarId}`, ret.md5)
        }
      }
    }))
  },

  // 获取冷却时间
  cdTime(data) {
    return data.ttl || 60
  }
}
