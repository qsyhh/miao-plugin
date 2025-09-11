import lodash from "lodash"
import EnkaData from "./EnkaData.js"
import { Data } from "#miao"

let HttpsProxyAgent = ""

export default {
  id: "enka",
  name: "enkaApi",
  cfgKey: "enkaApi",
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
    player.setBasicData(Data.getData(data.playerInfo, "name:nickname,face:profilePicture.avatarID,card:nameCardID,level,word:worldLevel,sign:signature"))
    await Promise.all(lodash.map(data.avatarInfoList, async(ds) => {
      let key = `miao:profile:gs:${player.uid}:md5:${ds.avatarId}`
      let md5 = await redis.get(key)
      if (!md5) {
        md5 = Data.generateMD5(Data.getData(player._original[ds.avatarId], "id,level,fetter,cons,weapon,costume,artis,elem,talent"))
        redis.set(key, md5)
      }
      let ret = EnkaData.setAvatar(player, ds)
      if (ret) {
        player._update.push(ret.id)
        if (ret.md5 !== md5) {
          player._hasUpdate.push(ret.id)
          redis.set(key, ret.md5)
        }
      }
    }))
  },

  // 获取冷却时间
  cdTime(data) {
    return data.ttl || 60
  }
}
