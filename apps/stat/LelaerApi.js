/*
* 微信小程序：提瓦特小助手API 已获得授权使用
* */

import fetch from "node-fetch"
import { Data } from "#miao"

const host = "https://game.257800180.xyz/api"

let LelaerApi = {
  async req(url, param = {}, EX = 3600) {
    let cacheData = await Data.getCacheJSON(`miao:lelaer:${url}`)
    if (cacheData && cacheData.data && param.method !== "POST") return cacheData
    let response = await fetch(host + url, {
      ...param,
      method: param.method || "GET"
    })
    let retData = await response.json()
    if (retData && retData.data && param.method !== "POST") {
      let d = new Date()
      retData.lastUpdate = `${d.toLocaleDateString()} ${d.toTimeString().substr(0, 5)}`
      await Data.setCacheJSON(`miao:lelaer:${url}`, retData, EX)
    }
    return retData
  },

  // 角色持有及命座分布
  async getCons() {
    return await LelaerApi.req("/Statistics/Constellation")
  },

  // 获取深渊使用率排行
  async getAbyssRank() {
    return await LelaerApi.req("/Statistics/AvatarParticipation")
  },

  // 获取深渊使用率统计
  async getAbyssUse() {
    return await LelaerApi.req("/Statistics2/AvatarParticipation")
  },

  async getAbyssTeam() {
    return await LelaerApi.req("/Statistics/Team/Combination")
  },

  async getUsage() {
    return await LelaerApi.req("/Statistics/Avatar/AvatarCollocation")
  },

  async uploadData(data = {}) {
    let body = JSON.stringify(data)
    return await LelaerApi.req("/Record/UploadData", {
      method: "POST",
      headers: {
        "User-Agent": "Yunzai-Bot/Miao-Plugin",
        "Content-Type": "text/json; charset=utf-8"
      },
      body
    })
  }
}

export default LelaerApi
