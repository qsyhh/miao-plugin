import lodash from "lodash"
import MysPanelData from "./MysPanelData.js"
import { Data } from "#miao"

export default {
  id: "mysPanel",
  name: "米游社",
  cfgKey: "mysPanelApi",
  // 处理请求参数
  async request(api) {
    let params = {
      headers: { "User-Agent": this.getCfg("userAgent") }
    }
    return { api, params }
  },

  // 处理服务返回
  async response(data, req) {
    if (!data.list || data.list.length === 0) return req.err("empty", 5 * 60)
    return data
  },

  async updatePlayer(player, data) {
    await Promise.all(lodash.map(data.list, async(ds) => {
      let key = `miao:profile:gs:${player.uid}:md5:${ds.base.id}`
      let md5 = await redis.get(key)
      if (!md5) {
        md5 = Data.generateMD5(Data.getData(player._original[ds.base.id], "id,level,fetter,cons,weapon,costume,artis,elem,talent"))
        redis.set(key, md5)
      }
      let ret = MysPanelData.setAvatar(player, ds)
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
