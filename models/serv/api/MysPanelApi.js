import lodash from "lodash"
import MysPanelData from "./MysPanelData.js"
import { Format, Data } from "#miao"

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
      let md5 = await redis.get(`miao:profile:${player.uid}:md5:${ds.base.id}`)
      if (!md5) {
        md5 = Format.generateMD5(Data.getData(player._avatars[ds.base.id], "id,elem,level,fetter,costume,cons,talent,weapon,artis"))
        redis.set(`miao:profile:md5:${ds.base.id}`, md5)
      }
      let ret = MysPanelData.setAvatar(player, ds)
      if (ret) {
        player._update.push(ret.id)
        if (ret.md5 !== md5) {
          player._hasUpdate.push(ret.id)
          redis.set(`miao:profile:md5:${ds.base.id}`, ret.md5)
        }
      }
    }))
  },

  // 获取冷却时间
  cdTime(data) {
    return data.ttl || 60
  }
}
