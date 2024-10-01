/* eslint-disable import/no-unresolved */
import fs from "node:fs"
import lodash from "lodash"
import { Version } from "#miao"
import { miaoPath } from "#miao.path"
import cfgData from "./cfg/CfgData.js"

const _cfgPath = `${miaoPath}/components/`
let cfg = {}
let miaoCfg = {}

try {
  cfg = await cfgData.getCfg()
  cfgData.saveCfg(cfg)
  lodash.forEach(cfgData.getCfgSchemaMap(), (cm) => {
    if (cm.miao) miaoCfg[cm.cfgKey] = true
  })
} catch (e) {}

let profile_cfg = {}

try {
  profile_cfg = await cfgData.getCfg(true)
  cfgData.saveCfg(profile_cfg, true)
} catch (e) {}

let Cfg = {
  get(rote, def = "") {
    if (Version.isMiao && miaoCfg[rote]) return true
    let ret = lodash.get(cfg, rote)
    return lodash.isUndefined(cfg) ? def : ret
  },
  getProfile(rote, def = "") {
    let ret = lodash.get(profile_cfg, rote)
    return lodash.isUndefined(profile_cfg) ? def : ret
  },
  set(rote, val, isBackground = false) {
    if (isBackground) {
      profile_cfg[rote] = val
    } else cfg[rote] = val
    cfgData.saveCfg(isBackground ? profile_cfg : cfg, isBackground)
  },
  del(rote) {
    lodash.set(cfg, rote, undefined)
    fs.writeFileSync(_cfgPath + "cfg.json", JSON.stringify(cfg, null, "\t"))
  },
  getCfg(isProfile = false) {
    return isProfile ? profile_cfg : cfg
  },
  getCfgSchema(isBackground = false) {
    return cfgData.getCfgSchema(isBackground)
  },
  getCfgSchemaMap(isBackground = false) {
    return cfgData.getCfgSchemaMap(isBackground)
  },
  scale(pct = 1) {
    let scale = Cfg.get("renderScale", 100)
    scale = Math.min(2, Math.max(0.5, scale / 100))
    pct = pct * scale
    return `style=transform:scale(${pct})`
  }
}

export default Cfg
