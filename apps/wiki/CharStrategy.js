import fs from "node:fs"
import { promisify } from "util"
import { pipeline } from "stream"
import fetch from "node-fetch"
import { Data } from "#miao"
import { miaoPath, rootPath } from "#miao.path"

const _path = `${rootPath}/temp/miao/strategy/`

const CharStrategy = {
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
    let strategyName = await redis.get(`miao-plugin:wiki:strategy:${e.self_id || "5555"}:${game}`)
    let length = 0
    msglist.push({ nickname: "QQ用户" })
    for (let ds of data.strategy) {
      if (!ds.author || (strategyName && !strategyName.split(",").includes(ds.author))) continue
      let img = await CharStrategy.downImgs(ds, { name, game, type })
      if (!img) continue
      msglist.push({
        nickname: "QQ用户",
        message: [
          `版主：${ds.author}\n`,
          segment.image(`file://${img}`),
          `\n${ds.articleUrl ?? `https://www.miyoushe.com/${char.isGs ? "ys" : "sr"}/article/${ds.article}`}`
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
        if (!res.ok) {
          logger.error(`[喵喵:角色攻略] 请求${ds.author}-${name}攻略失败\n${res.statusText}`)
          return false
        }
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
  isNumber(arr) {
    return arr.every((num) => Number.isInteger(Number(num) || num))
  }
}

export default CharStrategy
