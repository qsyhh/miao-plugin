/* eslint-disable import/no-unresolved */
import path from "path"
import fs from "node:fs"
import lodash from "lodash"
import fetch from "node-fetch"
import { miaoPath } from "#miao.path"
import { Cfg, Format } from "../index.js"

const Background = {
  async getBackground(cfg) {
    const def_background = Number(Cfg.getProfile("def_background"))
    if (def_background == 0) return
    let background = { url: "", text: "" }
    let tip = false
    if (def_background > 2) {
      let url = Cfg.getProfile(`background_${cfg}`)
      if (url?.startsWith("http")) {
        const startTime = new Date() * 1
        let res = await fetch(url)
        if (res.ok) {
          res = await res.arrayBuffer()
          const reqTime = new Date() * 1 - startTime
          logger.mark(`[喵喵:背景][${cfg}] 喵喵背景图请求成功 ${Format.comma(res.byteLength / 1024, 2)}kb ${logger.green(`${reqTime}ms`)}`)
          background.url = `data:image/jpeg;base64,${Buffer.from(res).toString("base64")}`
        } else if (!fs.existsSync(url)) tip = true
      }
    }
    if (!background.url) background.url = Background.getDefBackground(def_background, cfg, tip)
    background.text = `<style>.background{position:absolute;background-image:url(${background.url});background-size:cover;width:100%;height:100%;filter:blur(${Cfg.getProfile(`filter_${cfg}`)}px);}</style><div class="background"></div>`
    return background
  },
  getDefBackground(def_background, cfg, tip = false) {
    if (tip) logger.mark(`[喵喵:背景][${cfg}] ${logger.red("喵喵背景图请求失败 将使用本地背景图")}`)
    let image = Cfg.getProfile("def_image")
    if (def_background % 2 === 0) {
      let _path = miaoPath + "/resources/profile/background"
      let imgs = fs.readdirSync(_path).filter(i => !(fs.statSync(path.join(_path, i)).isDirectory()) && /.(png|jpg|webp)$/.test(path.extname(i)))
      if (imgs.length !== 0) image = lodash.sample(imgs)
    }
    logger.info(`[喵喵:背景][${cfg}]使用本地背景图 ${logger.green(`${image}`)}`)
    return `../../../../../plugins/miao-plugin/resources/profile/background/${image}`
  }
}

export default Background
