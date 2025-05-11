import lodash from "lodash"
import MysPanelHSRData from "./MysPanelHSRData.js"
import { Data } from "#miao"

export default {
  id: "mysPanelHSR",
  name: "米游社星铁",
  cfgKey: "mysPanelHSRApi",
  // 处理请求参数
  async request(api) {
    let params = {
      headers: { "User-Agent": this.getCfg("userAgent") }
    }
    return { api, params }
  },

  // 处理服务返回
  async response(data, req) {
    if (!data.avatar_list || data.avatar_list.length === 0) return req.err("empty", 5 * 60)
    return data
  },

  async updatePlayer(player, data) {
    await Promise.all(lodash.map(data.avatar_list, async(ds) => {
      let key = `miao:profile:sr:${player.uid}:md5:${ds.id}`
      let md5 = await redis.get(key)
      if (!md5) {
        md5 = Data.generateMD5(Data.getData(player._original[ds.id], "level,cons,weapon,talent,trees,artis"), "sr")
        redis.set(key, md5)
      }
      let ret = MysPanelHSRData.setAvatar(player, ds)
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
