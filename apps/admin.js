/* eslint-disable import/no-unresolved */
import fs from "node:fs"
import lodash from "lodash"
import { exec, execSync } from "child_process"
import makemsg from "../../../lib/common/common.js"
import { Cfg, Common, Data, Version, App } from "#miao"
import { update as Update } from "../../other/update.js"

import fetch from "node-fetch"
import { miaoPath } from "#miao.path"

let keys = lodash.map(Cfg.getCfgSchemaMap(), (i) => i.key)
let profil_keys = lodash.map(Cfg.getCfgSchemaMap(true), (i) => i.key)
let app = App.init({
  id: "admin",
  name: "喵喵设置",
  desc: "喵喵设置"
})

let sysCfgReg = new RegExp(`^#喵喵(?:背景)?设置\\s*(${keys.join("|")})?\\s*(.*)$`)
let profileCfgReg = new RegExp(`^#喵喵背景设置\\s*(${profil_keys.join("|")})?\\s*(.*)$`)

app.reg({
  updateRes: {
    rule: /^#喵喵(强制)?(更新图像|图像更新)$/,
    fn: updateRes,
    desc: "【#管理】更新素材"
  },
  update: {
    rule: /^#喵喵(强制)?更新$/,
    fn: updateMiaoPlugin,
    desc: "【#管理】喵喵更新"
  },
  updatelog: {
    rule: /^#?喵喵更新日志$/,
    fn: Miaoupdatelog,
    desc: "【#管理】喵喵更新"
  },
  sysCfg: {
    rule: sysCfgReg,
    fn: sysCfg,
    desc: "【#管理】系统设置"
  },
  bgHelp: {
    rule: /^#?喵喵背景帮助$/,
    fn: bgHelp,
    desc: "【#管理】背景设置帮助"
  },
  miaoApiInfo: {
    rule: /^#喵喵api$/,
    fn: miaoApiInfo,
    desc: "【#管理】喵喵Api"
  }
})

export default app

const resPath = `${miaoPath}/resources/`
const plusPath = `${resPath}/miao-res-plus/`

const checkAuth = async function(e) {
  if (!e.isMaster) {
    e.reply("只有主人才能命令喵喵哦~ (*/ω＼*)")
    return false
  }
  return true
}

async function sysCfg(e) {
  if (!await checkAuth(e)) return true
  let isBackground = false
  if (/^#喵喵背景设置/.exec(e.msg)) isBackground = true

  let cfgReg = isBackground ? profileCfgReg : sysCfgReg
  let regRet = cfgReg.exec(e.msg)
  let cfgSchemaMap = Cfg.getCfgSchemaMap(isBackground)

  if (!regRet) return true

  if (regRet[1]) {
    // 设置模式
    let val = regRet[2] || ""

    let cfgSchema = cfgSchemaMap[regRet[1]]
    val = valDeal(val, cfgSchema)
    Cfg.set(cfgSchema.cfgKey, val, isBackground)
  } else if ((isBackground && /^全部/.exec(regRet[2]))) {
    let type = "str"
    if (/^全部模糊/.exec(regRet[2])) type = "num"
    lodash.forEach(Object.keys(cfgSchemaMap), (cm) => {
      if (/^def/.test(cfgSchemaMap[cm].cfgKey)) return
      let val = regRet[2].replace(/^全部(模糊)?/, "") || ""
      if (val == "默认") val = cfgSchemaMap[cm].def
      if (cfgSchemaMap[cm].type == type) {
        val = valDeal(val, cfgSchemaMap[cm])
        Cfg.set(cfgSchemaMap[cm].cfgKey, val, isBackground)
      }
    })
  }

  let schema = Cfg.getCfgSchema(isBackground)
  let cfg = Cfg.getCfg(isBackground)
  let imgPlus = fs.existsSync(plusPath)

  // 渲染图像
  return await Common.render("admin/index", {
    schema,
    cfg,
    imgPlus,
    isBackground,
    isMiao: Version.isMiao
  }, { e, scale: 1.4 })
}

async function updateRes(e) {
  if (!await checkAuth(e)) return true

  let isForce = e.msg.includes("强制")
  let command = ""
  if (fs.existsSync(`${resPath}/miao-res-plus/`)) {
    e.reply("开始尝试更新，请耐心等待~")
    command = "git pull"
    if (isForce) command = "git  checkout . && git  pull"

    exec(command, { cwd: `${resPath}/miao-res-plus/` }, async function(error, stdout, stderr) {
      if (/(Already up[ -]to[ -]date|已经是最新的)/.test(stdout)) return e.reply("目前所有图片都已经是最新了~")

      let numRet = /(\d*) files changed,/.exec(stdout)
      if (numRet && numRet[1]) return e.reply(`报告主人，更新成功，此次更新了${numRet[1]}个图片~`)
      if (error) {
        e.reply("更新失败！\nError code: " + error.code + "\n" + error.stack + "\n 请稍后重试。")
      } else {
        e.reply("图片加量包更新成功~")
      }
    })
  } else {
    command = `git clone https://gitee.com/yoimiya-kokomi/miao-res-plus.git "${resPath}/miao-res-plus/" --depth=1`
    e.reply("开始尝试安装图片加量包，可能会需要一段时间，请耐心等待~")
    exec(command, function(error, stdout, stderr) {
      if (error) {
        e.reply("角色图片加量包安装失败！\nError code: " + error.code + "\n" + error.stack + "\n 请稍后重试。")
      } else {
        e.reply("角色图片加量包安装成功！您后续也可以通过 #喵喵更新图像 命令来更新图像")
      }
    })
  }
  return true
}

async function updateMiaoPlugin(e) {
  e.msg = `#${e.msg.includes("强制") ? "强制" : ""}更新miao-plugin`
  const up = new Update(e)
  up.e = e
  return up.update()
}

async function bgHelp(e) {
  return e.reply(
    "【#喵喵背景设置帮助】\n" +
    "#喵喵背景设置模式[0-4] --- 设置默认背景模式\n" +
    "#喵喵背景设置默认图[123.png] --- 设置本地默认背景图\n" +
    "#喵喵背景设置列表xxx --- 设置面板列表背景图\n" +
    "#喵喵背景设置面板xxx --- 设置xx面板背景图\n" +
    "#喵喵背景设置列表模糊[0-50] --- 设置面板列表背景图模糊度\n" +
    "#喵喵背景设置面板模糊[0-50] --- 设置面板背景图模糊度\n" +
    "-------------------\n" +
    "#喵喵背景设置全部(xxx|默认) --- 一键设置面板、面板列表背景图\n" +
    "#喵喵背景设置全部模糊([0-50]|默认) --- 一键设置面板、面板列表模糊度\n" +
    "-------------------\n" +
    "#喵喵背景设置默认为1或2时可在插件目录/resources/profile/background下放入背景图，并使用#喵喵背景设置默认图+文件全名(为2时则不需要设置)\n" +
    `插件绝对路径：${e.isMaster && e.isPrivate ? miaoPath : e.isMaster ? "请私聊查看" : "null"}\n` +
    "插件相对路径：../../../../../plugins/miao-plugin/", true
  )
}

async function Miaoupdatelog(e, plugin = "miao-plugin") {
  let cm = "git log  -20 --oneline --pretty=format:\"%h||[%cd]  %s\" --date=format:\"%F %T\""
  if (plugin) cm = `cd ./plugins/${plugin}/ && ${cm}`

  let logAll
  try {
    logAll = await execSync(cm, { encoding: "utf-8", windowsHide: true })
  } catch (error) {
    logger.error(error.toString())
    this.reply(error.toString())
  }
  if (!logAll) return false
  logAll = logAll.split("\n")
  let log = []
  for (let str of logAll) {
    str = str.split("||")
    if (str[0] == this.oldCommitId) break
    if (str[1].includes("Merge branch")) continue
    log.push(str[1])
  }
  let line = log.length
  log = log.join("\n\n")
  if (log.length <= 0) return ""
  let end = "更多详细信息，请前往gitee查看\nhttps://gitee.com/qsyhh/miao-plugin"
  log = await makemsg.makeForwardMsg(this.e, [ log, end ], `${plugin}更新日志，共${line}条`)
  e.reply(log)
}

async function miaoApiInfo(e) {
  if (!await checkAuth(e)) {
    return true
  }
  let { diyCfg } = await Data.importCfg("profile")
  let { qq, token } = (diyCfg?.miaoApi || {})
  if (!qq || !token) return e.reply("未正确填写miaoApi token，请检查miao-plugin/config/profile.js文件")
  if (token.length !== 32) return e.reply("miaoApi token格式错误")

  let req = await fetch(`http://miao.games/api/info?qq=${qq}&token=${token}`)
  let data = await req.json()
  if (data.status !== 0) return e.reply("token检查错误，请求失败")
  e.reply(data.msg)
}

function valDeal(val, cfgSchema) {
  if (cfgSchema.input) {
    val = cfgSchema.input(val)
  } else if (cfgSchema.type === "str") {
    val = (val || cfgSchema.def) + ""
  } else {
    val = cfgSchema.type === "num" ? (val * 1 || cfgSchema.def) : !/关闭/.test(val)
  }
  return val
}
