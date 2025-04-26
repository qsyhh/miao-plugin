import { uploadCharacterImg, delProfileImg, profileImgList } from "./character/ImgUpload.js"

export class profileImg extends plugin {
  constructor() {
    super({
      name: "喵喵:角色面板",
      dsc: "角色面板",
      event: "message",
      priority: 50,
      rule: [
        {
          reg: /^#?\s*(?:上传|添加)(.+)(?:面板图)\s*$/,
          fnc: "uploadImg"
        },
        {
          reg: /^#?\s*(?:移除|清除|删除)(.+)(?:面板图)(\d){1,}\s*$/,
          fnc: "delProfile"
        },
        {
          reg: /^#?\s*(.+)(?:面板图列表)\s*$/,
          fnc: "profileImgList"
        }
      ]
    })
  }

  /** 上传面板图 */
  async uploadImg(e) {
    return await uploadCharacterImg(e)
  }

  /** 删除面板图 */
  async delProfile(e) {
    return await delProfileImg(e)
  }

  /** 面板图列表 */
  async profileImgList(e) {
    return await profileImgList(e)
  }
}
