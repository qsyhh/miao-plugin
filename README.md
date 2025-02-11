# 说明

由于此fork作者心胸狭隘，此fork后续可能停更，建议各位尽早更换原仓库[miao-plugin](https://gitee.com/yoimiya-kokomi/miao-plugin)，防止后续无人维护无人更新。

本人只是一个略懂点代码的小辣椒，刚开始做fork也仅仅是因为想自己更快的更新一点我自己可以更新的东西，到后面越来越多的朋友、其他网友提出了一些功能需求，我也发现这恰恰我也需要，便尽力满足了，直到最近发生了各种各样的事情(我仓库解决的issue或一些更新会在我本人毫不知情的情况下被pr到原库或更新到其他仓库)。刚开始我也没有在意，fork的意义本就如此，为原库做出贡献，所以以何种方式去贡献/更新我都不会在意，我也选择遵循MIT协议，但最近这种情况愈发泛滥以至于通过他人的疑问传到了我的耳朵里，我不禁又在想，我fork的意义在哪里，为了给其他库更新？给不会写的小白提供代码copy到他自己目录里？对不起我可能不是什么大度的人，我fork的目的说的好听点可能是想更多的给原库做出贡献，说难听点可能就是想博取更多关注甚至star，如果只是为了fork套fork，便就这样吧，被圈子嘲笑就嘲笑吧，我也自认自己不是什么很厉害的人物，我也有选择不更新不上传git摆烂的权利，我不是在做慈善，也不会为了你的贡献/更新去努力维护。不认识我也管不着你如何做，私库我也不会干涉你的更新，对我没什么影响我也无所谓，但我觉得你至少应该打个招呼或者加个贡献者也好，最基本的礼貌貌似也就这样了(况且还可能是熟人)。经过几天的思考我已无力更新，朋友们，再会，马喽...退了

---

# Miao-Plugin 说明

`miao-plugin`是一个`Yunzai-Bot`的升级插件，提供包括角色面板、角色查询等角色相关功能。

具体功能可在安装插件后 通过 `#喵喵帮助` 进行查看。如需进行设置则可通过 `#喵喵设置` 命令进行管理。

---

## 安装与更新

### 使用Git安装（推荐）

请将 miao-plugin 放置在 Yunzai-Bot 的 plugins 目录下，重启 Yunzai-Bot 后即可使用。

请使用 git 进行安装，以方便后续升级。在 Yunzai-Bot 根目录夹打开终端，运行下述指令之一

```
// 使用gitee
git clone --depth=1 https://gitee.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin/
pnpm install -P

// 使用github
git clone --depth=1 https://github.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin/
pnpm install -P
```

进行安装。安装完毕后，管理员只需发送 `#喵喵更新` 即可自动更新 miao-plugin。

### 手工下载安装（不推荐）

手工下载安装包，解压后将`miao-plugin-master`更名为`miao-plugin`，然后放置在Yunzai的plugins目录内

虽然此方式能够使用，但无法使用`#喵喵更新`进行更新，不利于后续升级，故不推荐使用

---

## Yunzai版本与支持

`miao-plugin` 支持V3 / V2 版本的Yunzai-Bot

* [Miao-Yunzai](https://github.com/yoimiya-kokomi/Miao-Yunzai) : 喵版Yunzai [Gitee](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)
  / [Github](https://github.com/yoimiya-kokomi/Miao-Yunzai) ，本体不含签到功能，功能迭代较多，与miao-plugin打通，只建议新部署/迁移
* [Yunzai-V3](https://github.com/yoimiya-kokomi/Yunzai-Bot) ：Yunzai V3 - 喵喵维护版，icqq版本，与原版Yunza功能基本一致，会保持卡池更新，功能相对稳定，可从原版Yunzai换源直接升级
* [Yunzai-V3](https://gitee.com/Le-niao/Yunzai-Bot) ：Yunzai V3 - 乐神原版，oicq版本，可能会遇到登录问题

---

## 功能说明

### #雷神面板

使用指令 `#面板帮助` 即可了解如何使用此功能。

#### #更新面板

`#更新面板` 依赖于面板查询API，面板服务由 http://enka.network/ 提供。

> 查询功能经Enka官方授权([issue#63](https://github.com/yoimiya-kokomi/miao-plugin/issues/63#issuecomment-1199348789))，感谢Enka提供的面板查询服务
>
> 如果可以的话，也请在Patreon上支持Enka，或提供闲置的原神账户，具体可在[Enka官网](http://enka.network/) Discord联系
>
> [issue#63](https://github.com/yoimiya-kokomi/miao-plugin/issues/63#issuecomment-1199734496)

> 可尝试使用`MiniGG-Api`面板服务 [@MiniGrayGay](https://github.com/MiniGrayGay)<br>
> 发送 `#喵喵设置面板服务332` 修改国服&B服的面板查询由 `MiniGG-Api` 处理

#### #雷神伤害

喵喵面板附带的伤害计算功能由喵喵本地计算。如计算有偏差 #雷神伤害 查看伤害加成信息，如确认伤害计算有误可提供伤害录屏截图及uid进行反馈

#### #雷神圣遗物

圣遗物评分为喵喵版评分规则

---

**在有一定阅读理解能力基础下，建议阅读 [CHANGELOG.md](CHANGELOG.md) 以了解更多内容。**

其余文档咕咕咕中

---

# 免责声明

1. `miao-plugin`自身的UI与代码均开放，无需征得特殊同意，可任意使用。能备注来源最好，但不强求
2. 以上声明但仅代表`miao-plugin`自身的范畴，请尊重Yunzai本体及其他插件作者的努力，勿将Yunzai及其他插件用于以盈利为目的的场景
3. miao-plugin的图片与其他素材均来自于网络，仅供交流学习使用，如有侵权请联系，会立即删除

# 资源

* [Miao-Yunzai](https://github.com/yoimiya-kokomi/Miao-Yunzai) : 喵版Yunzai [Gitee](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)
  / [Github](https://github.com/yoimiya-kokomi/Miao-Yunzai)
* [Yunzai-V3](https://github.com/yoimiya-kokomi/Yunzai-Bot) ：Yunzai V3 - 喵喵维护版（使用 icqq）
* [Yunzai-V3](https://gitee.com/Le-niao/Yunzai-Bot) ：Yunzai V3 - 乐神原版（使用 oicq）
* [miao-plugin](https://github.com/yoimiya-kokomi/miao-plugin) : 喵喵插件 [Gitee](https://gitee.com/yoimiya-kokomi/miao-plugin)
  / [Github](https://github.com/yoimiya-kokomi/miao-plugin)

# 其他&感谢

* [Enka.Network](https://enka.network/): 感谢Enka提供的面板服务
* [Snap.Hutao](https://hut.ao/) : 感谢 DGP Studio 开发的 [胡桃 API](https://github.com/DGP-Studio/Snap.Hutao.Server)

