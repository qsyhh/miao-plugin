import lodash from "lodash"
import MiaoData from "./MiaoData.js"
import { Data } from "#miao"

export default {
  key: "miao",
  name: "喵喵Api",
  cfgKey: "miaoApi",
  async request(api) {
    api = this.getCfg("api") || api
    return { api }
  },
  async response(data, req, game = "gs") {
    if (data.status !== 0) return req.err(data.msg || "error", 60)
    if (game === "sr") return data.data
    if (data.version === 2) {
      data = data.data || {}
      if (!data.avatars || data.avatars.length === 0) return req.err("empty", 5 * 60)
      data.version = 2
      return data
    } else {
      return req.err("empty", 5 * 60)
    }
  },

  async updatePlayer(player, data) {
    player.setBasicData(data)
    await Promise.all(lodash.map(data.avatars, async(avatar) => {
      let key = `miao:profile:gs:${player.uid}:md5:${avatar.id}`
      let md5 = ""
      if (!player.isSr) {
        md5 = await redis.get(key)
        if (!md5) {
          md5 = Data.generateMD5(Data.getData(player._original[avatar.id], "id,level,fetter,cons,weapon,costume,artis,elem,talent"))
          redis.set(key, md5)
        }
      }
      let ret = MiaoData.setAvatar(player, avatar)
      if (ret) {
        player._update.push(ret.id)
        if (ret.md5 !== md5 || player.isSr) {
          player._hasUpdate.push(ret.id)
          if (!player.isSr) redis.set(key, ret.md5)
        }
      }
    }))
  },

  // 获取冷却时间
  cdTime(data = {}) {
    if (data.cacheExpireAt) {
      let exp = Math.max(0, Math.round(data.cacheExpireAt - (new Date() / 1000)))
      return Math.max(60, exp)
    }
    return 60
  }
}
