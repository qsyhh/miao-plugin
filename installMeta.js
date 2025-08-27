import fs from "node:fs"
import { exec } from "child_process"

let installed = false

async function installMeta() {
  let metaPath = "./plugins/miao-plugin/resources/meta-"
  if (!fs.existsSync(`${metaPath}gs`) || !fs.existsSync(`${metaPath}sr`)) {
    for (let game of [ "gs", "sr" ]) {
      let command = `git clone -b meta-${game} https://cnb.cool/qsyhh_res/meta.git "${metaPath}${game}" --depth=1`
      let execPro = async function execPro(cmd, ds = {}) {
        return new Promise((resolve, reject) => {
          exec(cmd, ds, (error, stdout, stderr) => {
            resolve({ error, stdout, stderr })
          })
        })
      }
      let ret = await execPro(command)
      if (ret.error) {
        throw new Error(`meta-${game}资源包安装失败！\nError code:  ` + ret.error.code + "\n" + ret.error.stack + "\n 请稍后重试。")
      } else {
        logger.info(`meta-${game}资源包安装成功！`)
      }
    }
  }
  installed = true
  return true
}

async function installPromise() {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (installed) {
        clearInterval(intervalId)
        resolve(true)
      }
    }, 100)
  })
}

export { installMeta, installPromise }
