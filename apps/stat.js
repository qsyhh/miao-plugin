import lodash from "lodash"
/** 胡桃数据库的统计 */
import { AbyssTeam } from "./stat/AbyssTeam.js"
import { AbyssSummary, AbyssChallenge } from "./stat/AbyssSummary.js"
import { RoleCombatSummary } from "./stat/RoleCombatSummary.js"
import { HardChallengeSummary } from "./stat/HardChallengeSummary.js"
import { ConsStat, AbyssPct } from "./stat/AbyssStat.js"
import { Cfg, Common, Data } from "#miao"
import { MysApi, Player } from "#miao.models"

export class stat extends plugin {
  constructor() {
    super({
      name: "喵喵:深渊统计",
      dsc: "深渊统计",
      event: "message",
      priority: 50,
      rule: [
        {
          reg: "^#(喵喵)?角色(持有|持有率|命座|命之座|.命)(分布|统计|持有|持有率)?$",
          fnc: "consStat"
        },
        {
          reg: "^#(喵喵)?深渊(第?.{1,2}层)?(角色)?(出场|使用)(率|统计)*$",
          fnc: "abyssPct"
        },
        {
          reg: "^#深渊(组队|配队|配对)$",
          fnc: "abyssTeam"
        },
        {
          reg: "^#*(喵喵|上传|本期)*(深渊|深境|深境螺旋)[ |0-9]*(数据)?$",
          fnc: "abyssSummary"
        },
        {
          reg: "^#*星铁(本期|上期)?(深渊|混沌回忆|混沌|忘却之庭|忘却)[ |0-9]*(数据)?$",
          fnc: "abyssSummary"
        },
        {
          reg: "^#*(喵喵)*(月谕|越狱|幻想|幻境|剧诗|幻想真境剧诗)(圣牌|卡片|卡牌|塔罗牌|card|tarot)(收藏|收集)?[ |0-9]*(数据)?$",
          fnc: "roleCard"
        },
        {
          reg: "^#*(喵喵)*(本期|上期)?(幻想|幻境|剧诗|幻想真境剧诗)[ |0-9]*(数据)?$",
          fnc: "roleCombatSummary"
        },
        {
          reg: "^#*(喵喵)*(本期|上期)?(幽境|危战|幽境危战)(单人|单挑|组队|多人|合作|最佳)?[ |0-9]*(数据)?$",
          fnc: "hardChallengeSummary"
        },
        {
          reg: "^#*星铁(本期|上期)?(异相|仲裁|异相仲裁)[ |0-9]*(数据)?$",
          fnc: "challengePeak"
        }
      ]
    })
  }

  async consStat(e) {
    return await ConsStat(e)
  }

  async abyssPct(e) {
    return await AbyssPct(e)
  }

  async abyssTeam(e) {
    return await AbyssTeam(e)
  }

  async abyssSummary(e) {
    if (e.isSr) return await AbyssChallenge(e)
    return await AbyssSummary(e)
  }

  async roleCard(e) {
    let rawMsg = e.original_msg || e.msg || ""
    let isMatch = /^#(喵喵)(月谕|越狱|幻想|幻境|剧诗|幻想真境剧诗)(圣牌|卡片|卡牌|塔罗牌|card|tarot)(收藏|收集)?$/.test(rawMsg)
    if (!Cfg.get("roleCard", false) && !isMatch) return false

    // 需要自身 ck 查询
    let mys = await MysApi.init(e, "cookie")
    if (!mys || !mys.uid) {
      if (isMatch) e.reply(`请绑定ck后再使用${e.original_msg || e.msg}`)
      return false
    }
    let uid = mys.uid
    let resRole
    let lvs
    try {
      resRole = await mys.getRoleCombat(true)
      lvs = Data.getVal(resRole, "tarot_card_state")
      // 检查是否查询到了幻想真境剧诗信息
      if (!lvs) return e.reply("暂未获得「月谕圣牌」收藏数据...")
      delete resRole._res
    } catch (err) {
      // logger.error(err);
    }
    return await Common.render("stat/role-card", {
      tarot_card_state: lvs,
      uid
    }, { e, scale: 1.2 })
  }

  async roleCombatSummary(e) {
    return await RoleCombatSummary(e)
  }

  async hardChallengeSummary(e) {
    return await HardChallengeSummary(e)
  }

  async challengePeak(e) {
    if (!Cfg.get("challengePeak", false)) return false

    // 需要自身 ck 查询
    let mys = await MysApi.init(e, "cookie")
    if (!mys || !mys.uid) return e.reply(`请绑定ck后再使用${e.original_msg || e.msg}`)

    let type = /上期/.test(e.original_msg || e.msg || "") ? 2 : 1
    let uid = mys.uid
    let player = Player.create(e)
    let resDetail, resRole
    try {
      resRole = await mys.getChallengePeak(type)
      let lvs = Data.getVal(resRole, "challenge_peak_records.0.has_challenge_record")
      // 检查是否查询到了异相仲裁信息
      if (!lvs) return e.reply(`暂未获得${type === 2 ? "上期" : "本期"}异相仲裁数据...`)
      resDetail = await mys.getCharacter()
    } catch (err) {
      logger.error(err)
    }
    // 更新player信息
    player.setMysCharData(resDetail)

    let icon_type = [ "ChallengePeakRankIconTypeNone", "ChallengePeakRankIconTypeBronze", "ChallengePeakRankIconTypeGold", "ChallengePeakRankIconTypeSilver", "ChallengePeakRankIconTypeUltra" ].indexOf(resRole.challenge_peak_best_record_brief.challenge_peak_rank_icon_type)
    let avatarIds = []
    lodash.forEach(resRole.challenge_peak_records[0]?.mob_records, (records, idx) => {
      lodash.forEach(records?.avatars, avatars => {
        if (!avatarIds.includes(avatars.id)) avatarIds.push(avatars.id)
      })
    })
    lodash.forEach(resRole.challenge_peak_records[0]?.boss_record?.avatars, avatars => {
      if (!avatarIds.includes(avatars.id)) avatarIds.push(avatars.id)
    })

    await player.refreshTalent(avatarIds)
    let avatarData = player.getAvatarData(avatarIds)
    if (Object.keys(avatarData).length !== avatarIds.length) return e.reply("角色信息获取失败")
    return await Common.render("stat/challenge-peak", {
      ...resRole,
      challenge_peak_records: resRole.challenge_peak_records[0],
      save_id: uid,
      uid,
      type,
      isUltra: icon_type === 4,
      rank_icon: icon_type > 0 ? icon_type : 0,
      avatars: avatarData,
      Array: (num) => num ? Array(num) : [],
      timeCalc: (t) => `${t.year}.${t.month}.${t.day}`
    }, { e, scale: 1.4 })
  }
}
