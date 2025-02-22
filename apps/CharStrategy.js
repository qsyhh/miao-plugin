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
  },

  // #攻略帮助
  helpStrategy: {
    rule: /^#(星铁)?喵喵(攻略|功略)帮助$/,
    fn: CharStrategy.helpStrategy
  },

  // #攻略设置
  setStrategy: {
    rule: /^#(星铁)?喵喵设置(攻略|功略)/,
    fn: CharStrategy.setStrategy
  }
})

export default app
