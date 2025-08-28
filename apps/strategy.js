import fs from "node:fs"
import lodash from "lodash"
import CharStrategy from "./wiki/CharStrategy.js"
import { Data, Cfg } from "#miao"
import { Character } from "#miao.models"
import { miaoPath } from "#miao.path"

const checkAuth = async function(e) {
  if (!e.isMaster) {
    e.reply("只有主人才能命令喵喵哦~ (*/ω＼*)")
    return false
  }
  return true
}

export class strategy extends plugin {
  constructor() {
    super({
      name: "喵喵:角色攻略",
      dsc: "角色攻略",
      event: "message",
      priority: -100,
      rule: [
        {
          reg: "^(?:#|喵喵)?(?:星铁)?.+(攻略|功略)$",
          fnc: "strategy"
        },
        {
          reg: "^#(星铁)?喵喵(攻略|功略)帮助$",
          fnc: "helpStrategy"
        },
        {
          reg: "^#(星铁)?喵喵设置(攻略|功略)",
          fnc: "setStrategy"
        }
      ]
    })
  }

  strategy(e) {
    // let mode = "strategy"
    if (!Cfg.get("charStrategyt")) return false

    e.game = /星铁/.test(e.msg) ? "sr" : e.game ?? "gs"
    let char = Character.get(e.msg.replace(/(#|喵喵)|星铁|(攻略|功略)/g, ""), e.game)
    if (!char) return false

    e.msg = "#喵喵角色攻略"
    e.char = char
    return CharStrategy.strategy(e)
  }

  async helpStrategy(e) {
    e.game = /星铁/.test(e.msg) ? "sr" : e.game ?? "gs"
    e.isGs = e.game === "gs"
    if (!fs.existsSync(`${miaoPath}/resources/meta-${e.game}/info/json`)) return e.reply(`尚未安装${e.isGs ? "原神" : "星铁"}攻略资源包，发送 ${e.isGs ? "#" : "*"}喵喵安装攻略资源 以安装`)

    let data = Data.readJSON(`resources/meta-${e.game}/info/json/author.json`, "miao")
    let strategyName = await redis.get(`miao-plugin:wiki:strategy:${e.self_id || "55555"}:${e.game}`)
    let msgs = []
    lodash.forEach(data.strategy, (name, idx) => msgs.push(`${idx + 1}——${name}\n`))
    return e.reply([
      `当前攻略组：${strategyName || "全部"}\n`,
      `发送【${e.isGs ? "#" : "*"}喵喵设置攻略1,2,4】或【${e.isGs ? "#" : "*"}喵喵设置攻略全部】以设置：\n`,
      ...msgs,
      "每个数字用逗号隔开"
    ])
  }

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
      return this.helpStrategy(e)
    }
    if (ret == "全部") {
      await redis.del(`miao-plugin:wiki:strategy:${e.self_id || "55555"}:${e.game}`)
      return e.reply("设置成功\n当前攻略组：全部")
    }
    let numbers = Array.from(new Set(ret.split(/,|，/)))
    if (!CharStrategy.isNumber(ret.split(/,|，/))) return e.reply("请输入正确的序号")
    let names = []
    lodash.forEach(numbers, (idx) => {
      if (data.strategy[idx - 1]) names.push(data.strategy[idx - 1])
    })
    if (names.length) {
      redis.set(`miao-plugin:wiki:strategy:${e.self_id || "55555"}:${e.game}`, names.join(","))
      return e.reply(`设置成功\n当前攻略组：${names.join(",")}`)
    }
    return e.reply("请输入正确的序号")
  }
}
