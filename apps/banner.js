/* eslint-disable import/no-unresolved */
import { App } from "#miao"
import Banner from "./gacha/Banner.js"

let app = App.init({
  id: "banner",
  name: "复刻统计"
})
app.reg({
  banner: {
    name: "复刻统计",
    fn: Banner.detail,
    rule: /^#(原神|星铁)?((四星|五星)?(角色|武器|光锥|up)?|.*)(复刻)?(统计|卡池|祈愿)$/
  }
})

export default app
