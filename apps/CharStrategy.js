/* eslint-disable import/no-unresolved */
import { App } from "#miao"
import CharStrategy from "./wiki/CharStrategy.js"

let app = App.init({
  id: "wiki",
  name: "角色攻略",
  priority: -100
})
app.reg({
  // #攻略
  CharStrategy: {
    rule: "^#喵喵角色攻略$",
    check: CharStrategy.check,
    fn: CharStrategy.strategy
  }
})

export default app
