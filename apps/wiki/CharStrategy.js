/* eslint-disable import/no-unresolved */
import fs from "node:fs"
import lodash from "lodash"
import fetch from "node-fetch"
import { promisify } from "util"
import { pipeline } from "stream"
import { Cfg, Data } from "#miao"
import { Character } from "#miao.models"
import { miaoPath, rootPath } from "#miao.path"

const strategyReg = /^(?:#|喵喵)?(?:星铁)?(.*)(攻略|功略)$/
const _path = `${rootPath}/temp/miao/strategy/`
const checkAuth = async function(e) {
  if (!e.isMaster) {
    e.reply("只有主人才能命令喵喵哦~ (*/ω＼*)")
    return false
  }
  return true
}

const CharStrategy = {
  check(e) {
    let msg = e.original_msg || e.msg
    if (!e.msg) return false
    e.game = /星铁/.test(e.msg) ? "sr" : e.game ?? "gs"

    let ret = strategyReg.exec(msg)
    if (!ret || !ret[1]) return false

    // let mode = "strategy"
    if (!Cfg.get("charStrategyt")) return false

    let char = Character.get(ret[1], e.game)
    if (!char) return false

    e.msg = "#喵喵角色攻略"
    e.char = char
    return true
  },

  async strategy(e) {
    let char = e.char
    if (!fs.existsSync(`${miaoPath}/resources/meta-${char.game}/info/json`)) {
      logger.error(`[喵喵角色攻略-${char.game}] 尚未安装${char.isGs ? "原神" : "星铁"}攻略资源包，发送 ${char.isGs ? "#" : "*"}喵喵安装攻略资源 以安装`)
      e.msg = e.original_msg
      return false
    }
    let { game, name, elemName, weapon } = char.getData("game,name,elemName,weapon")
    name = char.isTraveler ? "旅行者" : char.isTrailblazer ? "开拓者" : name
    let type = game == "gs" ? elemName : weapon
    let data = Data.readJSON(`resources/meta-${game}/info/json/${type}/${name}.json`, "miao")
    if (!data.strategy && !data.strategy.length) {
      e.msg = e.original_msg
      return false
    }
    let msglist = []
    let strategyName = await redis.get(`miao-plugin:wiki:strategy${game}`)
    let length = 0
    msglist.push({ nickname: "QQ用户" })
    for (let ds of data.strategy) {
      if (!ds.author || (strategyName && !strategyName.split(",").includes(ds.author))) continue
      let img = await CharStrategy.downImgs(ds, { name, game, type })
      if (!img) continue
      msglist.push({
        nickname: "QQ用户",
        message: [
          `版主：${ds.author}`,
          segment.image(`file://${img}`),
          ds.isOther ? ds.articleUrl : `https://www.miyoushe.com/${char.isGs ? "ys" : "sr"}/article/${ds.article}`
        ]
      })
      length++
    }
    if (!length) {
      e.msg = e.original_msg
      return false
    } else if (length === 1) {
      try {
        return e.reply(msglist[1].message)
      } catch (e) {
        return e.reply(msglist[1].message[1])
      }
    } else {
      let msg
      msglist[0].message = [ `${name}攻略，共${length}张` ]
      if (e.group?.makeForwardMsg) {
        msg = await e.group.makeForwardMsg(msglist)
      } else if (e.friend?.makeForwardMsg) {
        msg = await e.friend.makeForwardMsg(msglist)
      } else {
        msg = await Bot.makeForwardMsg(msglist)
      }
      return e.reply(msg)
    }
  },
  async downImgs(ds = {}, char = {}) {
    let name = char.name
    if (/旅行者|开拓者/.test(name)) name = `${name}_${char.type}`
    if (!fs.existsSync(_path + `${char.game}/${name}`)) Data.createDir(`temp/miao/strategy/${char.game}/${name}`, "root")
    let imgPath = `${_path}${char.game}/${name}/${ds.author}_${ds.article}.png`
    if (!fs.existsSync(imgPath)) {
      logger.mark(`[喵喵:角色攻略] 下载${ds.author}-${name}攻略图`)
      try {
        const res = await fetch(ds.url)
        const streamPipeline = promisify(pipeline)
        await streamPipeline(res.body, fs.createWriteStream(imgPath))
        logger.mark(`[喵喵:角色攻略] 下载${ds.author}-${name}攻略成功`)
      } catch (err) {
        logger.error(`[喵喵:角色攻略] 下载${ds.author}-${name}攻略失败\n${err}`)
        return false
      }
    }
    return imgPath
  },
  async helpStrategy(e) {
    e.game = /星铁/.test(e.msg) ? "sr" : e.game ?? "gs"
    e.isGs = e.game === "gs"
    if (!fs.existsSync(`${miaoPath}/resources/meta-${e.game}/info/json`)) return e.reply(`尚未安装${e.isGs ? "原神" : "星铁"}攻略资源包，发送 ${e.isGs ? "#" : "*"}喵喵安装攻略资源 以安装`)

    let data = Data.readJSON(`resources/meta-${e.game}/info/json/author.json`, "miao")
    let strategyName = await redis.get(`miao-plugin:wiki:strategy${e.game}`)
    let msgs = []
    lodash.forEach(data.strategy, (name, idx) => msgs.push(`${idx + 1}——${name}`))
    return e.reply([
      `当前攻略组：${strategyName || "全部"}`,
      `【${e.isGs ? "#" : "*"}喵喵设置攻略1,2,4】或【${e.isGs ? "#" : "*"}喵喵设置攻略全部】以设置：`,
      ...msgs,
      "每个数字用逗号隔开"
    ])
  },
  async setStrategy(e) {
    if (!await checkAuth(e)) return true
    let msg = e.original_msg || e.msg
    if (!e.msg) return false
    e.game = /星铁/.test(e.msg) ? "sr" : e.game ?? "gs"
    e.isGs = e.game === "gs"
    if (!fs.existsSync(`${miaoPath}/resources/meta-${e.game}/info/json`)) return e.reply(`尚未安装${e.isGs ? "原神" : "星铁"}攻略资源包，发送 ${e.isGs ? "#" : "*"}喵喵安装攻略资源 以安装`)

    let data = Data.readJSON(`resources/meta-${e.game}/info/json/author.json`, "miao")
    let ret = msg.replace(/#(星铁)?喵喵设置(攻略|功略)/, "")
    if (/开启|关闭/.test(ret)) return false
    if (!ret) {
      e.msg = `${e.isGs ? "#" : "*"}喵喵攻略帮助`
      return CharStrategy.helpStrategy(e)
    }
    if (ret == "全部") {
      await redis.del(`miao-plugin:wiki:strategy${e.game}`)
      return e.reply("设置成功\n当前攻略组：全部")
    }
    let numbers = Array.from(new Set(ret.split(/,|，/)))
    if (!CharStrategy.isNumber(ret.split(/,|，/))) return e.reply("请输入正确的序号")
    let names = []
    lodash.forEach(numbers, (idx) => {
      if (data.strategy[idx - 1]) names.push(data.strategy[idx - 1])
    })
    if (names.length) {
      redis.set(`miao-plugin:wiki:strategy${e.game}`, names.join(","))
      return e.reply(`设置成功\n当前攻略组：${names.join(",")}`)
    }
    return e.reply("请输入正确的序号")
  },
  isNumber(arr) {
    return arr.every((num) => Number.isInteger(Number(num) || num))
  }
}

export default CharStrategy
