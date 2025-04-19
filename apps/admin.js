/* eslint-disable import/no-unresolved */
import fs from "node:fs"
import lodash from "lodash"
import { exec, execSync } from "child_process"
import makemsg from "../../../lib/common/common.js"
import { Cfg, Common, Data, Version, App } from "#miao"

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
  updateStrategy: {
    rule: /^#(星铁)?喵喵(安装|(强制)?更新)攻略资源$/,
    fn: updateStrategy,
    desc: "【#管理】更新攻略资源"
  },
  update: {
    rule: /^#(喵喵(强制)?更新|(强制)?更新(miao(-plugin)?))$/,
    fn: updateMiaoPlugin,
    desc: "【#管理】喵喵更新"
  },
  updatelog: {
    rule: /^#?(喵喵更新日志|更新日志miao(-plugin)?)$/,
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
    command = `git clone https://gitee.com/qsyhh/miao-res-plus.git "${resPath}/miao-res-plus/" --depth=1`
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

async function updateStrategy(e) {
  if (!await checkAuth(e)) return true
  let games = /安装/.test(e.msg) ? [ "gs" ] : [ "gs", "sr" ]
  if (/星铁/.test(e.msg)) games = [ "sr" ]

  for (let game of games) {
    let command = ""
    let path = `./plugins/miao-plugin/resources/meta-${game}/info/json/`
    if (fs.existsSync(path)) {
      e.reply(`[喵喵角色攻略-${game}] ${/安装/.test(e.msg) ? "攻略资源已安装，" : ""}开始尝试更新攻略资源包，请稍后~`)
      command = "git pull"
      if (e.msg.includes("强制")) command = "git  checkout . && git  pull"

      let ret = await execPro(command, { cwd: path })
      if (/(Already up[ -]to[ -]date|已经是最新的)/.test(ret.stdout)) {
        e.reply(`[喵喵角色攻略-${game}] 已经是最新了~`)
        continue
      }

      let numRet = /(\d*) files changed,/.exec(ret.stdout)
      if (numRet && numRet[1]) {
        e.reply(`[喵喵角色攻略-${game}] 报告主人，更新成功，此次改动了${numRet[1]}个文件~`)
        continue
      }
      if (ret.error) {
        e.reply(`[喵喵角色攻略-${game}] 更新失败！\nError code: ` + ret.error.code + "\n" + ret.error.stack + "\n 请稍后重试。")
      } else {
        e.reply(`[喵喵角色攻略-${game}] 攻略资源更新成功~`)
      }
    } else if (/安装/.test(e.msg)) {
      command = `git clone -b ${game} https://gitee.com/qsyhh/resources.git "${path}" --depth=1`
      e.reply(`[喵喵角色攻略-${game}] 开始尝试安装攻略资源包，请稍后~`)
      let ret = await execPro(command)
      if (ret.error) {
        e.reply(`[喵喵角色攻略-${game}] 攻略资源包安装失败！\nError code:  ` + ret.error.code + "\n" + ret.error.stack + "\n 请稍后重试。")
      } else {
        e.reply(`[喵喵角色攻略-${game}] 攻略资源包安装成功！您后续也可以通过 #喵喵更新攻略资源 命令来更新全部攻略`)
      }
    } else {
      logger.error(`[喵喵角色攻略-${game}] 尚未安装${game == "gs" ? "原神" : "星铁"}攻略资源包，发送 ${game == "gs" ? "#" : "*"}喵喵安装攻略资源 以安装`)
    }
  }
  return true
}

let timer

async function updateMiaoPlugin(e) {
  if (!await checkAuth(e)) return true
  let isForce = e.msg.includes("强制")
  let command = "git  pull"
  if (isForce) {
    command = "git  checkout . && git  pull"
    e.reply("正在执行强制更新操作，请稍等")
  } else {
    e.reply("正在执行更新操作，请稍等")
  }
  e.oldCommitId = await getcommitId()
  exec(command, { cwd: miaoPath }, async function(error, stdout, stderr) {
    if (/(Already up[ -]to[ -]date|已经是最新的)/.test(stdout)) return e.reply("目前已经是最新版喵喵了~")
    if (error) return e.reply("喵喵更新失败！\nError code: " + error.code + "\n" + error.stack + "\n 请稍后重试。")

    await Miaoupdatelog(e)
    e.reply("喵喵更新成功，正在尝试重新启动Yunzai以应用更新...")
    timer && clearTimeout(timer)
    Data.setCacheJSON("miao:restart-msg", {
      uin: e?.self_id || e.bot.uin,
      qq: e.user_id,
      isGroup: !!e.isGroup,
      isMiao: true,
      id: e.group_id || e.user_id,
      time: new Date().getTime()
    }, 90)
    let npm = await checkPnpm()
    timer = setTimeout(function() {
      let command = `${npm} start`
      if (process.argv[1].includes("pm2")) {
        command = `${npm} run restart`
      }
      exec(command, { windowsHide: true }, function(error, stdout, stderr) {
        if (error) {
          logger.error(`重启失败\n${error.stack}`)
          return e.reply("自动重启失败，请手动重启以应用新版喵喵。\nError code: " + error.code + "\n" + error.stack + "\n")
        } else if (stdout) {
          logger.mark(`重启成功，运行已转为后台，查看日志请用命令：${npm} run log`)
          logger.mark(`停止后台运行命令：${npm} stop`)
          process.exit()
        }
      })
    }, 1000)
  })
  return true
}

async function checkPnpm() {
  let npm = "npm"
  let ret = await execPro("pnpm -v")
  if (ret.stdout) npm = "pnpm"
  return npm
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

async function Miaoupdatelog(e) {
  let cm = "cd ./plugins/miao-plugin/ && git log  -20 --oneline --pretty=format:\"%h||[%cd]  %s\" --date=format:\"%F %T\""

  let logAll
  try {
    logAll = execSync(cm, { encoding: "utf-8", windowsHide: true })
  } catch (error) {
    logger.error(error.toString())
    e.reply(error.toString())
  }
  if (!logAll) return false
  logAll = logAll.split("\n")
  let log = []
  for (let str of logAll) {
    str = str.split("||")
    if (str[0] == e.oldCommitId) break
    if (str[1].includes("Merge branch")) continue
    log.push(str[1])
  }
  let line = log.length
  log = log.join("\n\n")
  if (log.length <= 0) return ""
  let end = "更多详细信息，请前往gitee查看\nhttps://gitee.com/yoimiya-kokomi/miao-plugin"
  log = await makemsg.makeForwardMsg(e, [ log, end ], `miao-plugin更新日志，共${line}条`)
  return await e.reply(log)
}

async function getcommitId() {
  const commitId = execSync("cd plugins/miao-plugin && git rev-parse --short HEAD", { encoding: "utf-8" })
  return lodash.trim(commitId)
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
async function execPro(cmd, ds = {}) {
  return new Promise((resolve, reject) => {
    exec(cmd, ds, (error, stdout, stderr) => {
      resolve({ error, stdout, stderr })
    })
  })
}
