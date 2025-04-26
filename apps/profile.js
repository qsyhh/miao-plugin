import lodash from "lodash"
import ProfileStat from "./profile/ProfileStat.js"
import { getTargetUid } from "./profile/ProfileCommon.js"
import ProfileList from "./profile/ProfileList.js"
import ProfileDetail from "./profile/ProfileDetail.js"
import { Cfg, Common } from "#miao"
import { Artifact, MysApi, Character, Player } from "#miao.models"
import { miaoPath } from "#miao.path"

export class profile extends plugin {
  constructor() {
    super({
      name: "喵喵:角色面板",
      dsc: "角色面板",
      event: "message",
      priority: 50,
      rule: [
        {
          reg: /^#(星铁|原神)?(面板角色|角色面板|面板)(列表)?\s*(\d{9,10})?$/,
          fnc: "profileList"
        },
        {
          reg: /^#*([^#]+)\s*(详细|详情|面板|面版|圣遗物|遗器|武器[1-7]?|伤害([1-9]+\d*)?)\s*(\d{9,10})*(.*[换变改].*)?$/,
          fnc: "profileDetail"
        },
        {
          reg: /^#.+换.+$/,
          fnc: "profileDetail"
        },
        {
          reg: /^#(星铁|原神)?(圣遗物|遗器)列表\s*(\d{9,10})?$/,
          fnc: "profileArtisList"
        },
        {
          reg: "^#(星铁|原神)?(面板|喵喵)?练度统计$",
          fnc: "profileStat"
        },
        {
          reg: /^#*(我的)*(风|岩|雷|草|水|火|冰)*(武器|角色|练度|五|四|5|4|星)+(汇总|统计|列表)(force|五|四|5|4|星)*[ |0-9]*$/,
          fnc: "YzprofileStat"
        },
        {
          reg: /^#202\d{3}(幻想|真境|剧诗|幻想真境剧诗)练度统计$/,
          fnc: "profileRoleStat"
        },
        {
          reg: /^#202\d{3}(幻想|真境|剧诗|幻想真境剧诗)(角色|练度)(汇总|统计|列表)[ |0-9]*$/,
          fnc: "YzprofileRoleStat"
        },
        {
          reg: "^#*(我的)?(今日|今天|明日|明天|周.*)?([五四54]星)?(技能|天赋)+(汇总|统计|列表)?[ |0-9]*$",
          fnc: "talentStat"
        },
        {
          reg: "^#喵喵(角色|查询)[ |0-9]*$",
          fnc: "avatarList"
        },
        {
          reg: /^(#(五|四|5|4|星)*(角色|查询|查询角色|角色查询|人物)[ |0-9]*$)|(^(#*uid|#*UID)\+*(18|[1-9])[0-9]{8}$)|(^#[+|＋]*(18|[1-9])[0-9]{8})/,
          fnc: "YzavatarList"
        },
        {
          reg: "^#(星铁|原神)?(强制)?(刷新|更新)(所有|角色)*(天赋|技能|行迹)$",
          fnc: "refreshTalent"
        },
        {
          reg: "^#(角色|换|更换)?面[板版]帮助$",
          fnc: "profileHelp"
        },
        {
          reg: /^#(敌人|怪物)等级\s*\d{1,3}\s*$/,
          fnc: "enemyLv"
        },
        {
          reg: /^#(星铁|原神)?(米游社|mys)?(全部面[板版]更新|更新全部面[板版]|获取游戏角色详情|更新面[板版]|面[板版]更新)\s*(\d{9,10})?$/,
          fnc: "profileRefresh"
        },
        {
          reg: /^#(星铁|原神)?(删除全部面板|删除面板|删除面板数据)\s*(\d{9,10})?$/,
          fnc: "profileDel"
        },
        {
          reg: /^#(星铁|原神)?(加载|重新加载|重载)面板\s*(\d{9,10})?$/,
          fnc: "profileReload"
        }
      ]
    })
  }

  /** 面板角色列表 */
  async profileList(e) {
    return await ProfileList.render(e)
  }

  /**
   * 角色面板
   * 角色面板计算
   * */
  async profileDetail(e) {
    return await ProfileDetail.detail(e)
  }

  /** 圣遗物列表 */
  async profileArtisList(e) {
    let game = /星铁|遗器/.test(e.msg) ? "sr" : "gs"
    e.isSr = game === "sr"

    let uid = await getTargetUid(e)
    if (!uid) return true

    let artis = []
    let player = Player.create(uid, game)
    player.forEachAvatar((avatar) => {
      let profile = avatar.getProfile()
      if (!profile) return true
      let name = profile.name
      let char = Character.get(name, game)
      if (!profile.hasData || !profile.hasArtis()) return true
      let profileArtis = profile.getArtisMark()
      lodash.forEach(profileArtis.artis, (arti, idx) => {
        arti.charWeight = profileArtis.charWeight
        arti.avatar = name
        arti.side = char.side
        artis.push(arti)
      })
    })

    if (artis.length === 0) {
      let artisName = game === "gs" ? "圣遗物" : "遗器"
      await e.reply(`请先通过【${e.isSr ? "*" : "#"}更新面板】获取角色面板数据后再查看${artisName}列表...`)
      await this.profileHelp(e)
      return true
    }
    artis = lodash.sortBy(artis, "_mark")
    artis = artis.reverse()
    let number = Cfg.get("artisNumber", 28)
    artis = artis.slice(0, `${number}`)
    let artisKeyTitle = Artifact.getArtisKeyTitle(game)

    // 渲染图像
    return await Common.render("character/artis-list", {
      save_id: uid,
      uid,
      artis,
      artisKeyTitle
    }, { e, scale: 1.4 })
  }

  /** 面板练度统计 */
  async profileStat(e) {
    return await ProfileStat.stat(e)
  }

  /** 面板练度统计 */
  async YzprofileStat(e) {
    if (!Cfg.get("profileStat", false)) return false
    return await ProfileStat.stat(e)
  }

  /** 幻想真境剧诗入门角色统计 */
  async profileRoleStat(e) {
    return await ProfileStat.roleStat(e)
  }

  /** 幻想真境剧诗入门角色统计 */
  async YzprofileRoleStat(e) {
    if (!Cfg.get("profileStat", false)) return false
    return await ProfileStat.roleStat(e)
  }

  /** 天赋统计 */
  async talentStat(e) {
    return await ProfileStat.stat(e)
  }

  /** 角色查询 */
  async avatarList(e) {
    return await ProfileStat.avatarList(e)
  }

  /** 角色查询 */
  async YzavatarList(e) {
    if (!Cfg.get("avatarList", false)) return false
    return await ProfileStat.avatarList(e)
  }

  /** 强制刷新天赋 */
  async refreshTalent(e) {
    return await ProfileStat.refreshTalent(e)
  }

  /** 面板帮助 */
  async profileHelp(e) {
    return await e.reply(segment.image(`file://${miaoPath}/resources/character/imgs/help.jpg`))
  }

  /** #敌人等级 */
  async enemyLv(e) {
    let selfUser = await MysApi.initUser(e)
    if (!selfUser || !e.msg) return true

    let ret = /(敌人|怪物)等级\s*(\d{1,3})\s*$/.exec(e.msg)
    if (ret && ret[2]) {
      let lv = ret[2] * 1
      await selfUser.setCfg("char.enemyLv", lv)
      lv = await selfUser.getCfg("char.enemyLv", 103)
      return await e.reply(`敌人等级已经设置为${lv}`)
    }
    return true
  }

  /** 面板更新 */
  async profileRefresh(e) {
    return await ProfileList.refresh(e)
  }

  /** 删除面板 */
  async profileDel(e) {
    return await ProfileList.del(e)
  }

  /** 重新加载面板 */
  async profileReload(e) {
    return await ProfileList.reload(e)
  }
}
