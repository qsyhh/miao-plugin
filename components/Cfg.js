import fs from "node:fs"
import YAML from "yaml"
import lodash from "lodash"
import chokidar from "chokidar"
import { cfgSchema } from "../config/system/cfg_system.js"
import { miaoPath } from "#miao.path"

const _path = `${miaoPath}/config/cfg`
const [ CfgSchemaMap, cfgTypeMap ] = [ {}, {} ]

/**
 * 格式化配置文件
 * @param {object} group - 配置组
 * @param {string} file - 文件名
 * @param {object} [ret={}] - 用户配置
 * @param {object} [oldRet={}] - 旧用户配置
 */
function changeCfg(group, file, ret = {}, oldRet = {}) {
  let yamlStr = ""
  yamlStr += `# ************ ${group.title} ************`
  const dataWithComments = addCommentsToData(group.cfg, file, ret, oldRet)
  lodash.forEach(dataWithComments, (doc) => {
    yamlStr += doc.toString().replace(/\n\n+/g, "\n")
  })
  fs.writeFileSync(`${_path}/${file}.yaml`, yamlStr.replace(/\n$/g, ""), "utf8")
}

/**
 * 生成带注释的配置项数组
 * @param {object} data - 配置项
 * @param {string} key - 文件名
 * @param {object} [ret={}] - 用户配置
 * @param {object} [oldRet={}] - 旧用户配置
 * @returns {Array<YAML.Document>} 带注释的YAML文档数组
 */
function addCommentsToData(data, key, ret = {}, oldRet = {}) {
  let documents = []
  lodash.forEach(data, (cfgItem, cfgKey) => {
    const itemClone = { ...cfgItem, cfgKey }
    CfgSchemaMap[itemClone.key] = itemClone
    cfgTypeMap[cfgKey] = [ key, cfgSchema[key].key ]
    let document = {}
    document[cfgKey] = ret?.[cfgKey] ?? oldRet?.[cfgKey] ?? cfgItem.def
    const doc = new YAML.Document()
    doc.contents = document
    doc.commentBefore = `\n ${cfgItem.title}${cfgItem.desc ? `\n ${cfgItem.desc}` : ""}`
    documents.push(doc)
  })
  return documents
}

/** 格式化配置值
 * @param {string|boolean|number} val - 配置值
 * @param {string|boolean|number} oldVal - 旧配置值
 * @param {object} cfgInfo - 配置项信息
 * @returns {string|boolean|number} 格式化后配置值
 */
function valDeal(val, oldVal, cfgInfo) {
  val = val ?? oldVal
  if (cfgInfo.input) {
    val = cfgInfo.input(val)
  } else if (cfgInfo.type === "str") {
    val = (val ?? cfgInfo.def) + ""
  } else {
    val = cfgInfo.type === "num" ? (val * 1 ?? cfgInfo.def) : typeof val === "boolean" ? val : !/关闭/.test(val)
  }
  return val
}

class Cfg {
  constructor() {
    /** 用户设置 */
    this.configPath = _path
    this.config = {}

    // 监听配置文件
    this.watcher = {}

    // 初始化配置
    this.initCfg()
  }

  /** 初始化配置 */
  initCfg() {
    if (!fs.existsSync(this.configPath)) fs.mkdirSync(this.configPath)
    lodash.forEach(cfgSchema, (group, key) => {
      changeCfg(group, key, this.getCfg(key))
      this.config[key] = this.getCfg(key)
      if (!this.watcher[key]) this.watch(`${this.configPath}/${key}.yaml`, key)
    })
  }

  /**
   * 获取默认配置
   * @returns {object} 默认配置
   */
  getCfgSchema() {
    return cfgSchema
  }

  /**
   * 获取默认配置列表
   * @returns {object} 配置列表
   */
  getCfgSchemaMap() {
    return CfgSchemaMap
  }

  /**
   * 获取配置文件内容转JSON
   * @param {string} file - 文件名
   * @param {boolean} [isparseDoc=false] - 是否保留YAML文档格式
   * @returns {object|YAML.Document} 配置内容
   * */
  getCfg(file, isparseDoc = false) {
    if (!file) return this.config
    try {
      if (!fs.existsSync(`${this.configPath}/${file}.yaml`)) return {}
      const yamlContent = fs.readFileSync(`${this.configPath}/${file}.yaml`, "utf8")
      return YAML[isparseDoc ? "parseDocument" : "parse"](yamlContent)
    } catch (error) {
      logger.error(`[miao-plugin] 配置文件读取失败 ${error}`)
      return {}
    }
  }

  /**
   * 获取配置项内容
   * @param {string} type - 配置项类型
   * @param {boolean} [isFull=false] - 是否获取配置项对应文件配置内容
   * @returns {object} 配置内容
   * */
  getCfgMap(type = "", isFull = false) {
    let ret = {}
    lodash.forEach(cfgTypeMap, (ds) => {
      let key = ds[0]
      if (!ret[key] && ds[1] === type) ret[key] = isFull ? this.getCfg(key) : true
    })
    return ret
  }

  /**
   * 获取配置项
   * @param {string} item - 配置项
   * @param {string|boolean|number} [def=""] - 默认值
   * @returns {string|boolean|number} 配置内容
   * */
  get(item, def = "") {
    let ret
    let type = cfgTypeMap?.[item]?.[0] ?? ""
    if (!lodash.isEmpty(this.config?.[type])) ret = lodash.get(this.config[type], item)
    return ret ?? def
  }

  /**
   * 写入配置文件
   * @param {string} item - 配置项
   * @param {string} type - 配置项类型
   * @param {string|boolean|number} val - 写入内容
   */
  writeCfg(item, type, val) {
    let cfgType = cfgTypeMap?.[item]?.[0] ?? ""
    if (!this.getCfgMap(type)[cfgType]) return false
    val = valDeal(val, cfgSchema[cfgType].cfg[item])

    const config = this.getCfg(cfgType, true)
    try {
      config.contents.set(item, val)
      fs.writeFileSync(`${this.configPath}/${cfgType}.yaml`, config.toString(), "utf8")
    } catch (error) {
      logger.error(`[miao-plugin] 配置文件写入失败 ${error}`)
      return false
    }
  }

  /**
   * 写入配置文件 - 适配锅巴
   * @param {string} data - 配置列表
   * @param {string} file - 配置文件名
   */
  writeCfgAll(data, file) {
    const config = this.getCfg(file, true)
    try {
      lodash.forEach(data, (val, item) => {
        val = valDeal(val, this.config[file][item], cfgSchema[file].cfg[item])
        config.contents.set(item, val)
      })
      fs.writeFileSync(`${this.configPath}/${file}.yaml`, config.toString(), "utf8")
    } catch (error) {
      logger.error(`[miao-plugin] 配置文件写入失败 ${error}`)
      return false
    }
  }

  /**
   * 获取渲染缩放样式
   * @param {number} [pct=1] - 基础缩放比例
   * @returns {string} 缩放样式
   */
  scale(pct = 1) {
    let scale = this.get("renderScale", 100)
    scale = Math.min(2, Math.max(0.5, scale / 100))
    pct = pct * scale
    return `style="transform:scale(${pct})"`
  }

  /**
   * 监听并格式化配置文件
   * @param {string} path - 文件路径
   * @param {string} file - 文件名
   */
  watch(path, file) {
    const watcher = chokidar.watch(path)

    watcher.on("change", () => {
      try {
        let ret = this.getCfg(file)
        if (JSON.stringify(this.config[file]) === JSON.stringify(ret)) return logger.info(`[miao-plugin][配置文件无变化][${file}]`)
        logger.mark(`[miao-plugin][修改配置文件][${file}]`)
        changeCfg(cfgSchema[file], file, ret, this.config[file])
        this.config[file] = this.getCfg(file)
      } catch (error) {
        logger.error(`[miao-plugin] 配置文件写入失败 ${error}`)
      }
    })
    this.watcher[file] = watcher
  }
}

export default new Cfg()
