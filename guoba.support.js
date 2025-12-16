import lodash from "lodash"
import { cfgSchema } from "./config/system/cfg_system.js"
import { Cfg } from "#miao"
import { miaoPath } from "#miao.path"

const schemas = []

lodash.forEach(cfgSchema, (group, key) => {
  schemas.push({
    component: "SOFT_GROUP_BEGIN",
    label: group.title
  })
  lodash.forEach(group.cfg, (cfgItem, cfgKey) => {
    let component = {}
    if (!cfgItem.type) {
      if (typeof cfgItem.def === "boolean") component.component = "Switch"
    } else if (cfgItem.type === "num") {
      component.component = "InputNumber"
      if (cfgItem.componentProps) component.componentProps = cfgItem.componentProps
    } else if (cfgItem.type === "str") {
      if (cfgItem.componentProps?.options) {
        component.component = "Select"
        component.componentProps = cfgItem.componentProps
      } else {
        component.component = "Input"
        if (cfgItem.componentProps) component.componentProps = cfgItem.componentProps
      }
    }
    schemas.push({
      field: `${key}.${cfgKey}`,
      label: cfgItem.title,
      bottomHelpMessage: cfgItem.desc,
      ...component
    })
  })
})

export function supportGuoba() {
  return {
    pluginInfo: {
      name: "miao-plugin",
      title: "Miao-Plugin",
      author: "@Yoimiya-Kokomi",
      authorLink: "https://gitee.com/yoimiya-kokomi",
      link: "https://gitee.com/yoimiya-kokomi/miao-plugin",
      isV3: true,
      isV2: false,
      description: "Miao-Plugin for Yunzai-Bot",
      iconPath: `${miaoPath}/resources/meta-gs/character/珊瑚宫心海/imgs/face-q.webp`
    },
    configInfo: {
      schemas,
      getConfigData() {
        return Cfg.getCfg()
      },
      setConfigData(data, { Result }) {
        let oldCfg = Cfg.getCfg()
        let cfg = {}
        for (let key in data) {
          let split = key.split(".")
          if (lodash.isEqual(oldCfg[split[0]][split[1]], data[key])) continue
          if (!cfg[split[0]]) cfg[split[0]] = {}
          cfg[split[0]][split[1]] = data[key]
        }
        for (let key in cfg) Cfg.writeCfgAll(cfg[key], key)
        return Result.ok({}, "保存成功 Ciallo～(∠・ω＜ )⌒☆ ")
      }
    }
  }
}
