/* eslint-disable import/no-unresolved */
import fs from "node:fs"
import lodash from "lodash"
import { Data } from "../index.js"
import { miaoPath } from "#miao.path"
import { cfgSchema } from "../../config/system/cfg_system.js"
import { cfgProfile } from "../../config/system/background_system.js"

let cfgData = {
  saveCfg(cfg, isBackground = false) {
    let ret = []
    lodash.forEach(isBackground ? cfgProfile : cfgSchema, (cfgGroup) => {
      ret.push(`/** ************ 【${cfgGroup.title}】 ************* */`)
      lodash.forEach(cfgGroup.cfg, (cfgItem, cfgKey) => {
        ret.push(`// ${cfgItem.desc || cfgItem.title}`)
        let val = Data.def(cfg[cfgKey], cfgItem.def)
        if (cfgItem.input) val = cfgItem.input(val)
        if (cfgItem.type === "str") {
          ret.push(`export const ${cfgKey} = "${val.toString()}"`, "")
        } else {
          ret.push(`export const ${cfgKey} = ${val.toString()}`, "")
        }
      })
    })
    fs.writeFileSync(`${miaoPath}/config/${isBackground ? "background" : "cfg"}.js`, ret.join("\n"), "utf8")
  },

  async getCfg(isBackground = false) {
    let ret = lodash.toPlainObject(await Data.importModule(`/config/${isBackground ? "background" : "cfg"}.js`, "miao"))
    lodash.forEach(isBackground ? cfgProfile : cfgSchema, (cfgGroup) => {
      lodash.forEach(cfgGroup.cfg, (cfgItem, cfgKey) => {
        ret[cfgKey] = Data.def(ret[cfgKey], cfgItem.def)
      })
    })
    return ret
  },

  getCfgSchemaMap(isBackground = false) {
    let ret = {}
    lodash.forEach(isBackground ? cfgProfile : cfgSchema, (cfgGroup) => {
      lodash.forEach(cfgGroup.cfg, (cfgItem, cfgKey) => {
        ret[cfgItem.key] = cfgItem
        cfgItem.cfgKey = cfgKey
      })
    })
    return ret
  },
  getCfgSchema(isBackground = false) {
    return isBackground ? cfgProfile : cfgSchema
  }
}

export default cfgData
