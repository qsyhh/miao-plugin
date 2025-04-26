import Wife from "./character/AvatarWife.js"

export class poke extends plugin {
  constructor() {
    super({
      name: "喵喵:戳一戳",
      dsc: "戳一戳",
      event: "notice.*.poke",
      priority: 50,
      rule: [ { fnc: "poke" } ]
    })
  }

  async poke(e) {
    e = this.e || e
    const self_id = e.self_id || e.bot?.uin || Bot.uin
    if (e.notice_type === "group") {
      if (e.target_id !== self_id && !e.isPoke) return false
      // group状态下，戳一戳的发起人是operator
      if (e.user_id === self_id) e.user_id = e.operator_id
    }
    e.isPoke = true
    // 随便指定一个不太常见的msg以触发msg的正则
    e.msg = "#poke#"
    return await Wife.render(e)
  }
}
