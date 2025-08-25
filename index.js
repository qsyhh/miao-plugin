import fs from "node:fs"
import Index from "./tools/index.js"
// import { installPromise } from "./init.js"
import { Version } from "#miao"

if (!global.segment) { global.segment = (await import("oicq")).segment }

if (!segment.button) segment.button = () => ""

logger.info("---------^_^---------")
logger.info(`喵喵插件${Version.version}初始化~`)

let apps = {}

// if (await installPromise()) {
const files = fs.readdirSync("./plugins/miao-plugin/apps").filter(file => file.endsWith(".js"))

let ret = []

files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

for (let i in files) {
  let name = files[i].replace(".js", "")

  if (ret[i].status != "fulfilled") {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
// }

export { apps }

setTimeout(Index.init, 1000)
