/*
* 微信小程序：提瓦特小助手API 已获得授权使用
* */
import lodash from "lodash"
import fetch from "node-fetch"
import { Data } from "#miao"

const host = "https://api.lelaer.com/ys/"

let LelaerApi = {
  getKey(mode, key) {
    mode = mode.replace(/\.(.*)/g, "")
    return `miao:lelaer:${mode}:${key}`
  },

  log(msg) {
    logger.mark(`【Miao fork & Lelaer Api】：${msg}`)
  },

  async req(url, param = {}, dealFn = (data) => data, key = "default", EX = 3600) {
    if (param.method !== "POST") {
      key = LelaerApi.getKey(url, key)
      const cacheData = await Data.getCacheJSON(key)
      if (cacheData && cacheData.data) return cacheData
    }
    this.log(`${logger.yellow("开始请求数据")}，${url}...`)
    const startTime = new Date() * 1
    let data = {
      headers: param.headers || {},
      method: param.method || "GET"
    }
    if (param.method === "POST" && param.body && typeof param.body === "string") data.body = param.body
    else url += "?" + new URLSearchParams(param.body).toString()
    let response = await fetch(host + url, data)
    let retData = await response.json()
    const reqTime = new Date() * 1 - startTime
    this.log(`${logger.green(`请求结束，请求用时${reqTime}ms`)}`)
    if (retData && retData.code === 200 && param.method !== "POST") {
      if (dealFn) retData = await dealFn(retData)
      await Data.setCacheJSON(key, retData, EX)
    }
    return retData
  },

  // 角色持有及命座分布
  async getCons() {
    return await LelaerApi.req("/Statistics/Constellation")
  },

  // 获取深渊使用率排行
  async getAbyssRank(mode, star = "all") {
    return await LelaerApi.req(mode === "abyss" ? "getAbyssRank.php" : "getAbyssRank2.php", {
      body: {
        star,
        lang: "zh-Hans"
      }
    }, (data) => {
      return {
        title: data.title,
        version: `${data.version} (${data?.update.replace(/(.*)：/, "")})`,
        nowTime: (new Date()).toLocaleString("zh-Cn", { timeZone: "Asia/Shanghai" }),
        last_update: data.last_update,
        update: data.update,
        top_own: data.top_own,
        tips: [
          "数据来自微信小程序<strong>提瓦特小助手</strong>，为提瓦特小助手用户自主上传",
          `仅统计${mode === "abyss" ? "十二层满星" : "幽境危战（难度5/6）"}数据，您可以前往微信小程序<strong>提瓦特小助手</strong>上传挑战记录，来帮助我们统计的更加及时准确。（上传命令仅会上传您的角色列表及当期${mode === "abyss" ? "深渊" : "幽境危战"}挑战数据，不会上传其他额外信息）`,
          "由于是用户自主上传，数据可能有一定滞后，数据会在深渊开启后一段时间逐步稳定",
          data.tips
        ],
        data: data.has_list.map(item => {
          return Object.fromEntries(
            Object.entries(item).filter(([ key ]) => [ "name", "use_rate", "rank_class" ].includes(key))
          )
        })
      }
    }, star)
  },

  // 获取深渊使用率统计
  async getAbyssUse() {
    return await LelaerApi.req("/Statistics2/AvatarParticipation")
  },

  async getAbyssTeam() {
    return await LelaerApi.req("/Statistics/Team/Combination")
  },

  // 获取角色平均练度统计
  async getRole(role = "all", star = "all") {
    return await LelaerApi.req("getRoleAvg.php", {
      body: {
        role,
        star
      }
    }, (retData) => {
      if (!retData?.result?.length) return { data: {} }
      let data = retData.result
      if (retData.result.length === 1) data = retData.result[0]
      return {
        title: retData.title,
        version: retData.version,
        nowTime: (new Date()).toLocaleString("zh-Cn", { timeZone: "Asia/Shanghai" }),
        last_update: retData.last_update,
        data
      }
    }, `${star}:${role}`)
  },

  async uploadData(uid, data, avatarData) {
    let abyss_result = []
    let box_result = {}
    let pushFn = (data) => {
      let result = []
      lodash.forEach(data, id => {
        result.push(avatarData[id].name)
        box_result[avatarData[id].name] = avatarData[id].cons * 1
      })
      abyss_result.push(result)
    }
    try {
      lodash.forEach(data, ds => {
        pushFn(ds.up.avatars)
        pushFn(ds.down.avatars)
      })
      if (abyss_result.length !== 6) return false
      return await LelaerApi.req("postAbyssResult.php", {
        method: "POST",
        headers: {
          "User-Agent": "Yunzai-Bot/Miao-Plugin",
          "Content-Type": "text/json; charset=utf-8"
        },
        body: JSON.stringify({
          from: "Miao-Plugin/3.1",
          uid,
          abyss_result,
          box_result
        })
      })
    } catch (error) {
      logger.error("上传深渊数据请求失败：", error)
      return false
    }
  }
}

export default LelaerApi
