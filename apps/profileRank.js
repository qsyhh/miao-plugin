import { groupRank, resetRank, refreshRank, manageRank } from "./profile/ProfileRank.js"

export class profileRank extends plugin {
  constructor() {
    super({
      name: "喵喵:角色排行",
      dsc: "角色排行",
      event: "message",
      priority: 50,
      rule: [
        {
          reg: /^#(星铁|原神)?(群|群内)?(排名|排行)?(最强|最高|最高分|最牛|第一|极限)+.+/,
          fnc: "groupProfile"
        },
        {
          reg: "^#(星铁|原神)?(重置|重设)(.*)(排名|排行)$",
          fnc: "resetRank"
        },
        {
          reg: "^#(星铁|原神)?(刷新|更新|重新加载)(群内|群|全部)*(排名|排行)$",
          fnc: "refreshRank"
        },
        {
          reg: "^#(开启|打开|启用|关闭|禁用)(群内|群|全部)*(排名|排行)$",
          fnc: "manageRank"
        },
        {
          reg: "^#(星铁|原神)?(群|群内)?.+(排名|排行)(榜)?$",
          fnc: "rankList"
        }
      ]
    })
  }

  /** 群内最强 */
  async groupProfile(e) {
    return await groupRank(e)
  }

  /** 重置排名 */
  async resetRank(e) {
    return await resetRank(e)
  }

  /** 刷新排名 */
  async refreshRank(e) {
    return await refreshRank(e)
  }

  /** 打开关闭 */
  async manageRank(e) {
    return await manageRank(e)
  }

  /** 面板排名榜 */
  async rankList(e) {
    return await groupRank(e)
  }
}
