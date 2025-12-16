import path from "path"
import fs from "node:fs"
import { miaoPath } from "#miao.path"

const _path = `${miaoPath}/resources/profile/background`

export const cfgSchema = {
  apps: {
    title: "Yunzai功能（开启使用喵喵版功能）",
    key: "",
    cfg: {
      avatarList: {
        title: "#角色 #UID",
        key: "角色列表",
        def: true,
        desc: "是否允许查看角色列表"
      },
      avatarCard: {
        title: "#刻晴 #老婆",
        key: "角色卡片",
        def: false,
        desc: "是否允许查看角色卡片"
      },
      uploadAbyssData: {
        title: "#深渊",
        key: "深渊",
        def: true,
        desc: "是否允许查看/上传深渊数据"
      },
      roleCombat: {
        title: "#幻想",
        key: "幻想",
        def: true,
        desc: "是否允许查看幻想深境剧诗挑战数据"
      },
      roleCard: {
        title: "#月谕圣牌",
        key: "圣牌收藏",
        def: true,
        desc: "是否允许查看圣牌收藏"
      },
      hardChallenge: {
        title: "#幽境",
        key: "幽境危战",
        def: true,
        desc: "是否允许查看幽境危战挑战数据"
      },
      challengePeak: {
        title: "*异相",
        key: "异相仲裁",
        def: true,
        desc: "是否允许查看异相仲裁挑战数据"
      },
      profileStat: {
        title: "#练度统计",
        key: "练度统计",
        def: true,
        desc: "是否允许查看练度统计信息"
      },
      help: {
        title: "#帮助 #菜单",
        key: "帮助",
        def: true,
        desc: "是否设置喵喵帮助为默认帮助"
      },
      gachaStat: {
        title: "#抽卡分析 #抽卡统计",
        key: "抽卡",
        def: true,
        desc: "是否允许使用抽卡分析与统计功能"
      },
      avatarPoke: {
        title: "戳一戳展示角色卡片",
        key: "戳一戳",
        def: false,
        desc: "是否允许戳一戳展示角色卡片"
      }
    }
  },
  profile: {
    title: "角色面板相关设置",
    key: "面板",
    cfg: {
      avatarProfile: {
        title: "面板查询",
        key: "面板查询",
        def: true,
        desc: "是否允许使用角色面板查询功能"
      },
      mysRefresh: {
        title: "默认使用米游社更新面板",
        key: "米游社更新",
        def: false,
        desc: "是否默认使用米游社数据更新面板，关闭则优先使用面板服务更新"
      },
      profileChange: {
        title: "面板替换",
        key: "面板替换",
        def: true,
        desc: "是否允许使用面板替换功能"
      },
      groupRank: {
        title: "群面板排名",
        key: "排名",
        def: false,
        desc: "群内的面板伤害及圣遗物排名与查看功能，默认关闭。请根据群友心理素质自行决定是否开启"
      },
      groupRankLimit: {
        title: "排名限制",
        key: "限制",
        def: 1,
        type: "num",
        componentProps: { min: 1, max: 5 },
        desc: "参与排名的限制条件：1:无限制 2:有CK 3:有16个角色或有CK 4:有御三家(安柏&凯亚&丽莎)或有CK 5:有16个角色+御三家或有CK。 若改变设置请根据情况决定是否需要【#重置排名】"
      },
      rankNumber: {
        title: "排行人数",
        key: "排行人数",
        type: "num",
        def: 15,
        componentProps: { min: 5, max: 30 },
        input: (n) => Math.min(30, Math.max(5, (n * 1 || 15))),
        desc: "可选值5~30，建议15。设置高排名人数会提高图片的长度，图片较大可能会影响渲染与发送速度"
      },
      profileServer: {
        title: "面板服务",
        key: "面板服务",
        def: "0",
        type: "str",
        componentProps: {
          options: [ "0", "1", "2", "3", "4", "5" ].map(i => ({ label: i, value: i }))
        },
        input: (n) => /[0-5]{1,3}/.test(n) ? n : "0",
        desc: "面板服务选择：0:自动，1:喵Api(需具备Token)，2:Enka-API，3:MiniGG-Api，4:X-Enka，5:Lyln-Enka代理。如设置三位数字则为分服务器设置，按顺序分别为 国服/B服/外服，例如112代表国服B服Miao,国外Enka"
      },
      srProfileServer: {
        title: "星铁面板服务",
        key: "星铁面板服务",
        def: "0",
        type: "str",
        componentProps: {
          options: [ "0", "1", "2", "3", "4" ].map(i => ({ label: i, value: i }))
        },
        input: (n) => /[0-4]{1,3}/.test(n) ? n : "0",
        desc: "星铁面板服务选择：0:自动，1:喵Api(需具备Token)， 2:Mihomo，3:Avocado(鳄梨)，4:EnkaHSR。如设置三位数字则为分服务器设置，按顺序分别为 国服/B服/外服，例如114代表国服B服Miao,国外Enka"
      },
      costumeSplash: {
        title: "使用自定义面板插图",
        key: "面板图",
        def: true,
        desc: "开启彩蛋图（三皇冠/ACE/满命）及自定义面板图，关闭使用官方立绘"
      },
      teamCalc: {
        title: "组队加成伤害",
        key: "组队",
        def: false,
        desc: "伤害计算包含组队Buff。目前为测试阶段，数据可能不准确，请慎重开启。数据为固定Buff而非真实面板数据，最终计算数值可能有偏差。开启后请重启喵喵"
      },
      artisNumber: {
        title: "圣遗物列表数量",
        key: "圣遗物数量",
        type: "num",
        def: 28,
        componentProps: { min: 4, max: 100 },
        input: (n) => Math.min(100, Math.max(4, (n * 1 || 28))),
        desc: "可选值4~100，建议28，最终圣遗物数量取决于面板内圣遗物数量。设置高圣遗物数量会提高图片的长度，图片较大可能会影响渲染与发送速度"
      }
    }
  },
  wiki: {
    title: "角色资料与信息查询",
    key: "查询",
    cfg: {
      charWiki: {
        title: "角色图鉴-图鉴",
        key: "图鉴",
        def: true,
        showDesc: false,
        desc: "#刻晴图鉴 的图鉴信息"
      },
      charWikiTalent: {
        title: "角色图鉴-天赋",
        key: "天赋",
        def: true,
        showDesc: false,
        desc: "#刻晴天赋/#刻晴命座 的天赋信息"
      },
      weapomWiki: {
        title: "武器图鉴-图鉴",
        key: "武器图鉴",
        def: false,
        showDesc: false,
        desc: "#雾切图鉴/*于夜色中图鉴 的图鉴信息"
      },
      charStrategyt: {
        title: "角色图鉴-攻略",
        key: "攻略",
        def: false,
        showDesc: false,
        desc: "#绫华攻略 的攻略信息"
      },
      roleCharInfoSource: {
        title: "角色图鉴-幻想真境剧诗角色数据库",
        key: "幻想数据库",
        type: "num",
        def: 1,
        componentProps: { min: 1, max: 2 },
        input: (n) => Math.min(2, Math.max(1, (n * 1 || 1))),
        desc: "#202407幻想角色列表 所采用的数据库源。1:HomDGCat数据库，2:BWiki数据库"
      },
      notReleasedData: {
        title: "未实装角色数据",
        key: "未实装",
        def: false,
        showDesc: true,
        desc: "开启时才能查看未实装角色信息。数据仅供参考，请以游戏正式实装内容为准"
      },
      charPic: {
        title: "角色图片",
        key: "图片",
        def: true
      },
      withPic: {
        title: "角色共用面板图",
        key: "共用面板图",
        def: true,
        showDesc: true,
        desc: "星铁同一角色不同命途是否共用同一个面板图文件夹，当前仅支持三月七及三月七·巡猎，默认开启"
      },
      qFace: {
        title: "Q版角色头像",
        key: "卡通头像",
        def: true,
        desc: "是否启用Q版角色头像"
      },
      bFace: {
        title: "表情包版角色头像",
        key: "表情包头像",
        def: false,
        desc: "是否启用表情包版角色头像，开启后优先使用表情包头像"
      },
      zFace: {
        title: "自定义角色头像",
        key: "自定义头像",
        def: false,
        desc: "启用后会优先使用character/角色名/imgs文件夹下的face-b.png作为角色头像"
      },
      charPicSe: {
        title: "小清新角色图",
        key: "小清新",
        def: false,
        desc: "启用后会启用角色图及增量包中的小清新图像，勇士啊，你准备好了吗"
      }
    }
  },
  background: {
    title: "面板背景相关设置",
    key: "背景",
    cfg: {
      def_background: {
        title: "默认背景模式",
        key: "模式",
        def: 4,
        type: "num",
        componentProps: { min: 0, max: 4 },
        input: (n) => Math.min(4, Math.max(0, (n * 1 || 4))),
        desc: "默认背景模式选择：0:不使用，1:单图默认/自定义，2:文件夹随机，3:图片api/图链请求失败后使用本地默认图，4:图片api/图链请求失败后使用本地随机图"
      },
      def_image: {
        title: "本地默认背景图",
        key: "默认图",
        def: "default/main-01.jpg",
        type: "str",
        componentProps: {
          options: [
            { label: "default/main-01.jpg", value: "default/main-01.jpg" },
            ...(fs.readdirSync(_path)
              .filter(i => !(fs.statSync(path.join(_path, i)).isDirectory()) && /.(png|jpg|webp)$/.test(path.extname(i)))
              .map(i => ({ label: i, value: i }))
            )
          ]
        },
        input: (n) => fs.existsSync(`${miaoPath}/resources/profile/background/${n}`) ? n : "default/main-01.jpg",
        desc: "本地默认背景图文件名，默认为default/main-01.jpg，本地不存在设置的图片时将返回默认文件名"
      },
      filter_list: {
        title: "面板列表背景图模糊度",
        key: "列表模糊",
        def: 7,
        type: "num",
        componentProps: { min: 0, max: 50 },
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
  },
  sys: {
    title: "系统设置",
    key: "",
    cfg: {
      renderScale: {
        title: "渲染精度",
        key: "渲染",
        type: "num",
        def: 100,
        componentProps: { min: 50, max: 200 },
        input: (n) => Math.min(200, Math.max(50, (n * 1 || 100))),
        desc: "可选值50~200，建议100。设置高精度会提高图片的精细度，但因图片较大可能会影响渲染与发送速度"
      },
      originalPic: {
        title: "原图",
        key: "原图",
        def: 3,
        type: "num",
        componentProps: { min: 0, max: 4 },
        input: (n) => Math.min(4, Math.max(n * 1 || 0, 0)),
        desc: "允许获取原图，0:不允许, 1:仅允许角色图, 2:仅允许面板图, 3:开启, 4:仅不允许获取面板图列表"
      },
      commaGroup: {
        title: "数字逗号分组",
        key: "逗号",
        def: 3,
        type: "num",
        componentProps: { min: 3, max: 4 },
        desc: "根据语言习惯设置数字分组，如千位组设为3，万位组设为4"
      }
    }
  }
}
