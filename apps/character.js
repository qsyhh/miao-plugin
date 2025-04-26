import Wife from "./character/AvatarWife.js"
import Avatar from "./character/AvatarCard.js"
import { uploadCharacterImg } from "./character/ImgUpload.js"
import { Cfg, Common } from "#miao"
import { Character } from "#miao.models"
import { miaoPath, rootPath } from "#miao.path"

export class character extends plugin {
  constructor() {
    super({
      name: "喵喵:角色查询",
      dsc: "喵喵插件",
      event: "message",
      priority: 50,
      rule: [
        {
          reg: "^#喵喵角色卡片$",
          fnc: "Avatarrender"
        },
        {
          reg: /^#*(喵喵)?(上传|添加)(.+)(照片|写真|图片|图像)\s*$/,
          fnc: "uploadImg"
        },
        {
          reg: Wife.reg,
          fnc: "Wiferender"
        },
        {
          reg: "^#?(获取|给我|我要|求|发|发下|发个|发一下)?(背景)?原图(吧|呗)?$",
          fnc: "getOriginalPicture"
        }
      ]
    })
  }

  accept(e) {
    let msg = e.original_msg || e.msg
    if (!msg || !/^#/.exec(msg)) return false
    if (!Common.cfg("avatarCard")) return false
    let uidRet = /(18|[1-9])[0-9]{8}/g.exec(msg)
    if (uidRet) {
      e.uid = uidRet[0]
      msg = msg.replace(uidRet[0], "")
    }
    let name = msg.replace(/#|老婆|老公|卡片/g, "").trim()

    let char = Character.get(name.trim(), e.game)
    if (!char) return false
    e.msg = "#喵喵角色卡片"
    e.char = char
    return true
  }

  async Avatarrender(e) {
    if (!e.char) return false
    return await Avatar.renderAvatar(e, e.char?.name)
  }

  async uploadImg(e) {
    return await uploadCharacterImg(e)
  }

  async Wiferender(e) {
    let msg = e.msg || ""
    if (!msg && !e.isPoke) return false
    return await Wife.render(e)
  }

  /**
   * 获取角色卡片的原图
   * @param e
   */
  async getOriginalPicture(e) {
    let source
    if (e.reply_id) {
      source = { message_id: e.reply_id }
    } else {
      if (!e.hasReply && !e.source) return false
      // 引用的消息不是自己的消息
      if (e.source.user_id !== e.self_id) return false
      // 获取原消息
      if (e.group?.getChatHistory) {
        source = (await e.group.getChatHistory(e.source.seq, 1)).pop()
      } else if (e.friend?.getChatHistory) {
        source = (await e.friend.getChatHistory(e.source.time, 1)).pop()
      }
      // 引用的不是纯图片
      if (!(source?.message?.length === 1 && source?.message[0]?.type === "image")) return false
    }
    let originalPic = Cfg.get("originalPic") * 1
    if (source) {
      let imgPath = await redis.get(`miao:original-picture:${source.message_id}`)
      if (/背景原图/.test(e.msg)) imgPath = await redis.get(`miao:original-background:${source.message_id}`)
      if (imgPath) {
        try {
          if (imgPath[0] === "{") {
            imgPath = JSON.parse(imgPath)
          } else {
            imgPath = { img: imgPath, type: "" }
          }
        } catch (e) {}
        if (!e.isMaster) {
          if (imgPath.type === "character" && [ 2, 0 ].includes(originalPic)) return e.reply("已禁止获取角色原图...")
          if (imgPath.type === "profile" && [ 1, 0 ].includes(originalPic)) return e.reply("已禁止获取面板原图...")
        }
        if (imgPath && imgPath.img) {
          if (/背景原图/.test(e.msg)) {
            imgPath.img = imgPath?.img.replace("data:image/jpeg;base64,", "base64://").replace("../../../../..", `file://${rootPath}/`)
            return e.reply(segment.image(imgPath.img), false, { recallMsg: 60 })
          }
          return e.reply(segment.image(`file://${miaoPath}/resources/${decodeURIComponent(imgPath.img)}`), false, { recallMsg: 60 })
        }
      }
      // 对at错图像的增加嘲讽...
      e.reply(segment.image(`file://${miaoPath}/resources/common/face/what.jpg`))
      return false
    }
    e.reply("消息太过久远了，俺也忘了原图是啥了，下次早点来吧~")
    return false
  }
}
