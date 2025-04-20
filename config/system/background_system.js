import fs from "node:fs"
import { miaoPath } from "#miao.path"

export const cfgProfile = {
  profile: {
    title: "面板背景相关设置",
    cfg: {
      def_background: {
        title: "默认背景模式",
        key: "模式",
        def: "4",
        type: "str",
        input: (n) => /^[0-4]$/.test(n) ? n : "1",
        desc: "默认背景模式选择：0:不使用，1:单图默认/自定义，2:文件夹随机，3:图片api/图链请求失败后使用本地默认图，4:图片api/图链请求失败后使用本地随机图"
      },
      def_image: {
        title: "本地默认背景图",
        key: "默认图",
        def: "default/main-01.jpg",
        type: "str",
        input: (n) => fs.existsSync(`${miaoPath}/resources/profile/background/${n}`) ? n : "default/main-01.jpg",
        desc: "本地默认背景图文件名，默认为default/main-01.jpg，本地不存在设置的图片时将返回默认文件名"
      },
      filter_list: {
        title: "面板列表背景图模糊度",
        key: "列表模糊",
        type: "num",
        def: 7,
        input: (n) => Math.min(50, Math.max(0, (n * 1 || 7))),
        desc: "#面板列表背景图模糊度，可选值0~50"
      },
      background_list: {
        title: "面板列表背景图",
        key: "列表",
        type: "str",
        def: "https://api.suyanw.cn/api/comic2",
        desc: "#面板列表背景图，使用#喵喵背景帮助查看帮助"
      },
      filter_profile: {
        title: "面板背景图模糊度",
        key: "面板模糊",
        type: "num",
        def: 7,
        input: (n) => Math.min(50, Math.max(0, (n * 1 || 7))),
        desc: "#xx面板背景图模糊度，可选值0~50"
      },
      background_profile: {
        title: "面板背景图",
        key: "面板",
        type: "str",
        def: "https://api.suyanw.cn/api/comic2",
        desc: "#xx面板背景图，使用#喵喵背景帮助查看帮助"
      }
    }
  }
}
