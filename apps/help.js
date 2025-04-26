import Help from "./help/Help.js"

export class help extends plugin {
  constructor() {
    super({
      name: "喵喵:喵喵帮助",
      dsc: "喵喵帮助",
      event: "message",
      priority: 50,
      rule: [
        {
          reg: "^(/|#)?(喵喵)?(命令|帮助|菜单|help|说明|功能|指令|使用说明)$",
          fnc: "help"
        },
        {
          reg: "^(/|#)?喵喵版本$",
          fnc: "version"
        }
      ]
    })
  }

  async help(e) {
    return await Help.render(e)
  }

  async version(e) {
    return await Help.version(e)
  }
}
