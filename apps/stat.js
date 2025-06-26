/** 胡桃数据库的统计 */
import { AbyssTeam } from "./stat/AbyssTeam.js"
import { AbyssSummary, AbyssChallenge } from "./stat/AbyssSummary.js"
import { RoleCombatSummary } from "./stat/RoleCombatSummary.js"
import { HardChallengeSummary } from "./stat/HardChallengeSummary.js"
import { ConsStat, AbyssPct } from "./stat/AbyssStat.js"

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
          reg: "^#星铁(本期|上期)?(深渊|混沌回忆|混沌|忘却之庭|忘却)[ |0-9]*(数据)?$",
          fnc: "abyssSummary"
        },
        {
          reg: "^#*(喵喵)*(幻想|幻境|剧诗|幻想真境剧诗)[ |0-9]*(数据)?$",
          fnc: "roleCombatSummary"
        },
        {
          reg: "^#*(喵喵)*(幽境|危战|幽境危战)[ |0-9]*(数据)?$",
          fnc: "HardChallengeSummary"
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

  async roleCombatSummary(e) {
    return await RoleCombatSummary(e)
  }

  async HardChallengeSummary(e) {
    return await HardChallengeSummary(e)
  }
}
