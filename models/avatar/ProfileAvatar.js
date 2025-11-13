import lodash from "lodash"
import CharImg from "../character/CharImg.js"
import Serv from "../serv/Serv.js"
import AvatarUtil from "./AvatarUtil.js"
import { Cfg } from "#miao"

const ProfileAvatar = {

  /**
   * 更新面板数据
   * @param player
   * @param force
   * @param fromMys
   * @returns {Promise<boolean|number>}
   */
  async refreshProfile(player, force = 2, fromMys = false) {
    if (!AvatarUtil.needRefresh(player._profile, force, { 0: 24, 1: 2, 2: 0 })) return false

    let { uid, e } = player
    if (![ 9, 10 ].includes(uid.toString().length) || !e) return false

    let ret = await Serv.req(e, player, fromMys)
    if (ret) {
      player._profile = new Date() * 1
      player.save()
      return player._update.length
    }
  },

  isProfile(avatar) {
    // 检查数据源
    if (!avatar._source || ![ "enka", "EnkaHSR", "change", "miao", "mgg", "hanxuan", "lyln", "homo", "avocado.wiki", "mysPanel", "mysPanelHSR" ].includes(avatar._source)) return false
    // 检查武器及天赋
    if (!avatar.weapon || lodash.isUndefined(avatar.weapon.promote) || !avatar.talent) return false
    // 检查圣遗物词条是否完备
    if (!avatar.artis || !avatar.artis.hasAttr) return false
    // 检查旅行者
    if (avatar.isGs && [ "空", "荧" ].includes(avatar.name)) return !!avatar.elem

    return true
  },

  getCostumeSplash(profile, game = "gs") {
    let { char, name } = profile
    if (!Cfg.get("costumeSplash", true)) return char.getImgs(profile._costume).splash

    let costume = profile._costume
    costume = profile.char.checkCostume(costume) ? "2" : ""
    if (!Cfg.get("costumeSplash", true)) return this.char.getImgs(profile._costume).splash

    let nPath = `meta-${game}/character/${name}`
    let isSuper = false
    let talent = profile.talent ? lodash.map(profile.talent, (ds) => ds.original).join("") : ""
    let isGs = game === "gs"
    if (isGs && (
      profile.cons === 6 ||
      [ "ACE", "MAX" ].includes(profile.artis?.markClass) ||
      talent === "101010"
    )) isSuper = true

    let treeSet = [ "101", "102", "103", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "301", "302", "501" ]
    let treeSuper = false
    if (!isGs && profile.trees) {
      treeSuper = true
      lodash.forEach(profile.trees, (tree, idx) => {
        if (!tree.includes(treeSet[idx])) treeSuper = false
      })
    }
    if (!isGs && (
      profile.cons === 6 ||
      [ "ACE", "MAX" ].includes(profile.artis?.markClass) ||
      (talent === "6101010" && treeSuper)
    )) isSuper = true
    // 特殊处理开拓者的情况
    if (char.isTrailblazer) {
      if (/^穹·/.test(name)) name = "穹"
      if (/^星·/.test(name)) name = "星"
    }
    // 特殊处理三月七的情况
    if (/^三月七/.test(name) && Cfg.get("withPic")) name = "三月七"
    if (isSuper) {
      return CharImg.getRandomImg(
        [ `profile/super-character/${name}`, `profile/normal-character/${name}` ],
        [ `${nPath}/imgs/splash0.webp`, `${nPath}/imgs/splash${costume}.webp`, `/${nPath}/imgs/splash.webp` ]
      )
    } else {
      return CharImg.getRandomImg(
        [ `profile/normal-character/${name}` ],
        [ `${nPath}/imgs/splash${costume}.webp`, `/${nPath}/imgs/splash.webp` ]
      )
    }
  },

  getServ(uid, game = "gs") {
    return Serv.getServ(uid, game)
  }
}

export default ProfileAvatar
