/* eslint-disable import/no-unresolved */
import { Version } from "#miao"
import Index from "./tools/index.js"

if (!global.segment) { global.segment = (await import("oicq")).segment }

if (!segment.button) segment.button = () => ""

export * from "./apps/index.js"

logger.info("---------^_^---------")
logger.info(`喵喵插件${Version.version}初始化~`)

setTimeout(Index.init, 1000)
