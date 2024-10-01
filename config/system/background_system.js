export const cfgProfile = {
  profile: {
    title: "面板背景相关设置",
    cfg: {
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
        def: "def",
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
        def: "def",
        desc: "#xx面板背景图，使用#喵喵背景帮助查看帮助"
      }
    }
  }
}
