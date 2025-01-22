/* eslint-disable import/no-unresolved */
import fs from "node:fs"
import fetch from "node-fetch"
import { promisify } from "util"
import { pipeline } from "stream"
import { Cfg, Data } from "#miao"
import { Character } from "#miao.models"
import { miaoPath, rootPath } from "#miao.path"

const strategyReg = /^(?:#|喵喵)?(?:星铁)?(.*)(攻略|功略)$/
const _path = `${rootPath}/temp/miao/strategy/`

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
      logger.error(`暂未下载攻略资源包，请发送【${char.isGs ? "#" : "*"}喵喵更新攻略资源】更新资源`)
      e.msg = e.original_msg
      return false
    }
    let { name, elemName } = char.getData("name,elemName")
    if (char.isTraveler) name = "旅行者"
    if (char.isTrailblazer) name = "开拓者"
    let data = Data.readJSON(`resources/meta-${char.game}/info/json/${elemName}/${name}.json`, "miao")
    if (data.strategy && data.strategy.length != 0) {
      let msglist = []
      let list = data.strategy
      msglist.push({
        message: [ `${name}攻略，共${list.length}张` ]
      })
      for (let ds of list) {
        let img = await CharStrategy.downImgs(name, ds, elemName)
        if (!img) return false
        msglist.push({
          message: [
            `版主：${ds.author}`,
            // `帖子：https://www.miyoushe.com/ys/article/${ds.article}`,
            segment.image(`file://${img}`)
          ]
        })
      }
      let msg
      if (e.group?.makeForwardMsg) {
        msg = await e.group.makeForwardMsg(msglist)
      } else if (e.friend?.makeForwardMsg) {
        msg = await e.friend.makeForwardMsg(msglist)
      } else {
        msg = await Bot.makeForwardMsg(msglist)
      }
      e.reply(msg)
    }
    return true
  },
  async downImgs(name, ds = {}, elemName) {
    if (/旅行者|开拓者/.test(name)) name = `${name}_${elemName}`
    if (!fs.existsSync(_path + name)) Data.createDir(`temp/miao/strategy/${name}`, "root")
    let imgPath = `${_path}${name}/${ds.author}_${ds.article}.png`
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
  }
}

export default CharStrategy
