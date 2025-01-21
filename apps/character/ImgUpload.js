/* eslint-disable import/no-unresolved */
import fs from "node:fs"
import lodash from "lodash"
import fetch from "node-fetch"
import { promisify } from "util"
import { pipeline } from "stream"
import { Cfg, Data } from "#miao"
import { miaoPath } from "#miao.path"
import { Character } from "#miao.models"

const resPath = miaoPath + "/resources/"
let regex = /^#?\s*(?:喵喵)?(?:上传|添加)(.+)(?:照片|写真|图片|图像)\s*$/
let profileRegex = /^#?\s*(?:喵喵)?(?:上传|添加)(.+)(?:面板图)\s*$/
let isProfile = false

export async function uploadCharacterImg(e) {
  let promise = await isAllowedToUploadCharacterImage(e)
  if (!promise) return false

  let imageMessages = []
  let msg = e.msg
  let regRet = regex.exec(msg)
  if (msg.includes("面板")) {
    isProfile = true
    regRet = profileRegex.exec(msg)
  } else {
    isProfile = false
  }

  // 通过解析正则获取消息中的角色名
  if (!regRet || !regRet[1]) return false

  let name
  if (regRet[1] != "星" && regRet[1] != "穹") {
    let char = Character.get(regRet[1])
    if (!char || !char.name) return false
    name = char.name
    if (/^穹·/.test(name)) return e.reply(`请使用【#上传星${isProfile ? "面板图" : "图片"}】或【#上传穹${isProfile ? "面板图" : "图片"}】添加星铁主角图片`)
  } else {
    name = regRet[1]
  }
  for (let val of e.message) {
    if (val.type === "image") imageMessages.push(val)
  }
  if (imageMessages.length === 0) {
    let source
    if (e.getReply) {
      source = await e.getReply()
    } else if (e.source) {
      if (e.group?.getChatHistory) {
        // 支持at图片添加，以及支持后发送
        source = (await e.group.getChatHistory(e.source?.seq, 1)).pop()
      } else if (e.friend?.getChatHistory) {
        source = (await e.friend.getChatHistory((e.source?.time + 1), 1)).pop()
      }
    }
    if (source) {
      for (let val of source.message) {
        if (val.type === "image") {
          imageMessages.push(val)
        } else if (val.type === "xml" || val.type === "forward") { // 支持合并转发消息内置的图片批量上传，喵喵 喵喵喵？ 喵喵喵喵
          let resid
          try {
            resid = val.data.match(/m_resid="(\d|\w|\/|\+)*"/)[0].replace(/m_resid=|"/g, "")
          } catch (err) {
            logger.mark("Miao合并上传：转换id获取")
            resid = val.id
          }
          if (!resid) break
          let message = await e.bot.getForwardMsg(resid)
          for (const item of message) {
            for (const i of item.message) {
              if (i.type === "image") {
                imageMessages.push(i)
              }
            }
          }
        }
      }
    }
  }
  if (imageMessages.length <= 0) return e.reply("消息中未找到图片，请将要发送的图片与消息一同发送或引用要添加的图像..")
  return await saveImages(e, name, imageMessages)
}

async function saveImages(e, name, imageMessages) {
  let imgMaxSize = e?.groupConfig?.imgMaxSize || 5
  let pathSuffix = `character-img/${name}/upload`
  if (isProfile) pathSuffix = `profile/normal-character/${name}`
  let path = resPath + pathSuffix

  if (!fs.existsSync(path)) Data.createDir("resources/" + pathSuffix, "miao")
  let senderName = lodash.truncate(e.sender.card, { length: 8 })
  let imgCount = 0
  let urlMap = {}
  for (let val of imageMessages) {
    if (!val.url || urlMap[val.url]) continue
    urlMap[val.url] = true
    const response = await fetch(val.url)
    if (!response.ok) return e.reply("图片下载失败。")
    if (response.headers.get("size") > 1024 * 1024 * imgMaxSize) return e.reply([ segment.at(e.user_id, senderName), "添加失败：图片太大了。" ])
    let fileType = "png"
    if (val.file) {
      fileType = val.file.substring(val.file.lastIndexOf(".") + 1)
    }
    if (response.headers.get("content-type") === "image/gif") {
      fileType = "gif"
    }

    if (isProfile) {
      // 面板图默认webp
      fileType = "webp"
    } else if (!"jpg,jpeg,png,webp".split(",").includes(fileType)) {
      // 角色图像默认jpg
      fileType = "jpg"
    }
    // 使用 Date.now() 作为文件名
    let imgPath = `${path}/${Date.now()}.${fileType}`
    const streamPipeline = promisify(pipeline)
    await streamPipeline(response.body, fs.createWriteStream(imgPath))

    // 使用 Date.now() 重命名文件
    let newImgPath = `${path}/${Date.now()}.${fileType}`
    if (fs.existsSync(newImgPath)) {
      fs.unlink(newImgPath, (err) => {
        logger.error("unlink", err)
      })
    }
    fs.rename(imgPath, newImgPath, () => {})
    imgCount++
    logger.mark(`添加成功: ${newImgPath}`)
  }

  return e.reply(`\n成功添加${imgCount}张${name}${isProfile ? "面板图" : "图片"}。`, true)
}

async function isAllowedToUploadCharacterImage(e) {
  let sendMsg = /上传|添加/.test(e.msg) ? "添加" : "删除"
  if (!e.message) return false
  if (!e.msg) return false
  // master直接返回true
  if (e.isMaster) return true
  if (e.isPrivate) {
    await e.reply(`只有主人才能${sendMsg}...`)
    return false
  }
  let groupId = e.group_id
  if (!groupId) return false
  const addLimit = e.groupConfig?.imgAddLimit || 2
  const isAdmin = [ "owner", "admin" ].includes(e.sender.role)
  if (addLimit === 2) {
    await e.reply(`只有主人才能${sendMsg}...`)
    return false
  }
  if (addLimit === 1 && !isAdmin) {
    await e.reply(`只有管理员才能${sendMsg}...`)
    return false
  }
  return true
}

// 仅支持面板图删除
export async function delProfileImg(e) {
  let promise = await isAllowedToUploadCharacterImage(e)
  if (!promise) return false
  let char = Character.get(e.msg.replace(/#|面板图|列表|上传|删除|\d+/g, "").trim())
  if (!char || !char.name) return false
  let name = char.name
  let pathSuffix = `profile/normal-character/${name}`
  let path = resPath + pathSuffix
  let num = e.msg.match(/\d+/)
  if (!num) return e.reply(`删除哪张捏？请输入数字序列号,可输入【#${name}面板图列表】查看序列号`)
  try {
    let imgs = fs.readdirSync(`${path}`).filter((file) => {
      return /\.(png|webp)$/.test(file)
    })
    fs.unlinkSync(`${path}/${imgs[num - 1]}`)
    return e.reply("删除成功")
  } catch (err) {
    return e.reply("删除失败，请检查序列号是否正确")
  }
}

export async function profileImgList(e) {
  let msglist = []
  let name = e.msg.replace(/#|面板图列表/g, "")
  if ([ 1, 0, 4 ].includes(Cfg.get("originalPic") * 1)) return e.reply("已禁止获取面板图列表")
  if (name != "星" && name != "穹") {
    let char = Character.get(name)
    if (!char || !char.name) return false
    name = char.name
    if (/^穹·/.test(name)) return e.reply("请使用【#星面板图列表】或【#穹面板图列表】查看星铁主角面板图列表")
  }

  let pathSuffix = `profile/normal-character/${name}`
  let path = resPath + pathSuffix
  if (!fs.existsSync(path)) return e.reply(`暂无${name}的角色面板图`)
  try {
    let imgs = fs.readdirSync(`${path}`).filter((file) => {
      return /\.(png|webp)$/.test(file)
    })
    msglist.push({
      message: [ `当前查看的是${name}面板图,共${imgs.length}张，可输入【#删除${name}面板图(序列号)】进行删除` ]
    })
    for (let i = 0; i < imgs.length; i++) {
      // 合并转发最多99？ 但是我感觉不会有这么多先不做处理
      logger.mark(`${path}${imgs[i]}`)
      msglist.push({
        message: [
          `${i + 1}.`,
          segment.image(`file://${path}/${imgs[i]}`)
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
    let msgRsg = await e.reply(msg)
    if (!msgRsg) return e.reply("风控了，可私聊查看", true)
    return true
  } catch (err) {
    logger.error(err)
    return e.reply(`暂无${name}的角色面板图~`)
  }
}
