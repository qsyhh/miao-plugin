# 说明

此仓库为个人fork版本自用

此仓库将在原仓库有更新时测试后推送同步，可能更新不及时...推荐使用原版 [miao-plugin](https://gitee.com/yoimiya-kokomi/miao-plugin)

> 项目Q群：[517144547](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=2pln8DfZOIwge418mZ2lGK272ulJeABB&authKey=omB8vXIFk0NsTSkShPUrCuoXQsDwmH3DVx0CPakj%2FV4PjZD%2F3WCQrhM9PH08BGj1&noverify=0&group_code=517144547)
> ⚠️请尊重作者的努力，勿将本仓库内所有新增资源、功能传播或上传到除[原版 miao-plugin](https://github.com/yoimiya-kokomi/miao-plugin)的其他仓库或其他社区，如需使用请自行本地修改或pr推送到[原版 miao-plugin](https://github.com/yoimiya-kokomi/miao-plugin)

## 较原版的新增/修改

- [x] 支持星铁图鉴、星铁技能显示能量上限及削韧值

- [x] 星铁面板增加q版头像(头像来源官方大月卡头像) [@YuapXc](https://gitee.com/YuapXc)

- [x] 新增`#喵喵背景设置`、`#喵喵背景帮助`命令，支持自定义面板、面板列表背景图

- [x] 星铁图鉴增加素材显示

- [x] 新增`#复刻统计`、`#四星复刻统计`、`*四星光锥复刻统计`命令，用于查看角色/武器多久未复刻，UI源码来源[windoge-plugin](https://gitee.com/windoge/windoge-plugin)

- [x] 新增`#绫华复刻统计`、`#雾切复刻统计`、`*于夜声中复刻统计`命令，用于查看角色历史复刻卡池，支持使用别名查询

- [x] ~~更换`#喵喵更新图像`源为[miao-res-plus](https://gitee.com/qsyhh/miao-res-plus) [@DenFengLai](https://gitee.com/DenFengLai)~~

- [x] 新增`#绫华攻略`、`#火主攻略`、`*记忆主攻略`命令，用于查询角色攻略(默认关闭，攻略数据为手动更新[gs](https://gitee.com/qsyhh/resources/tree/gs/)|[sr](https://gitee.com/qsyhh/resources/tree/sr/)，更新不及时，可使用`#喵喵设置攻略关闭`关闭此功能，发送`#喵喵攻略帮助`查看帮助)

- [x] 新增`#雾切图鉴`，`*于夜色中图鉴`，用于查询武器图鉴（默认关闭，使用`#喵喵设置武器图鉴开启`开启）

- [x] 新增角色表情包版头像、自定义头像，默认关闭，可通过`#喵喵设置表情包头像开启`或`#喵喵设置自定义头像开启`命令开启。表情包头像可前往[qsyhh/image](https://gitee.com/qsyhh/image)下载并重命名为`face-b.png`，添加自定义头像时，须将文件名重命名名为`face-z.png`
  > ⚠️表情包版头像、自定义头像后缀均为`.png`

- [x] 面板列表区分本次更新/获取角色
  > ~~⚠️原神的米游社更新可能与其其他的面板服务无法互通，导致无法正确判断是否为`更新角色`~~

- [x] meta资源外置，资源仓库[meta-gs](https://cnb.cool/qsyhh_res/meta/-/tree/meta-gs)、[meta-gs](https://cnb.cool/qsyhh_res/meta/-/tree/meta-sr)

- [ ] 极限面板可通过`#更新面板`更新，默认更新源为[100000000.json](https://profile.qsyhh.icu/100000000.json)，可自定义

## 安装指令

首先前往[token-classic](https://gitcode.com/setting/token-classic)获取个人令牌

方式1: 首次/重新安装插件：

```bash
git clone --depth=1 https://用户名:个人令牌@gitcode.com/qsyhh_code/miao-plugin.git ./plugins/miao-plugin/ --depth=1
pnpm install --filter=miao-plugin
git clone -b meta-gs https://cnb.cool/qsyhh_res/meta.git "./plugins/miao-plugin/resources/meta-gs" --depth=1
git clone -b meta-sr https://cnb.cool/qsyhh_res/meta.git "./plugins/miao-plugin/resources/meta-sr" --depth=1
```

方式2: 🔐 换源

注: 该方式将会【强制覆盖】本地所有文件，否则无法使用指令更新插件，但面板图、配置文件等文件会保留。自修改过多请勿使用本fork版，自修改报错一律不受理

```bash
cd plugins/miao-plugin
git remote set-url origin https://用户名:个人令牌@gitcode.com/qsyhh_code/miao-plugin.git
// 原fork用户这里可直接执行git pull，无需后续操作
git fetch origin master
git reset --hard origin/master
```
### ⚠️meta资源外置

最新版本中已移除meta资源，首次安装插件需下载meta资源(或启动Yunzai即可自动安装)，以进行角色数据热更新

> 推荐手动安装，以防其他插件不兼容导致监听事件错误

CNB源下载(暂无其他源)：

```bash
git clone -b meta-gs https://cnb.cool/qsyhh_res/meta.git "./plugins/miao-plugin/resources/meta-gs" --depth=1
git clone -b meta-sr https://cnb.cool/qsyhh_res/meta.git "./plugins/miao-plugin/resources/meta-sr" --depth=1
```

<details><summary>如何兼容？ 点击此处展开/收起</summary>

示例js：Yunzai/plugins/example-plugin/apps/example.js

```bash
监听事件错误：login.js
Error: ENOENT: no such file or directory, scandir 'Yunzai\plugins\miao-plugin\resources\meta-gs\character'
    at Object.readdirSync (node:fs:1502:26)
    at Object.init (file:///C:/Yunzai/example-plugin/apps/example.js:13:20)

```
```JavaScript
import { installPromise } from "../../../miao-plugin/installMeta.js"

await installPromise() // 报错行上行写入
```

</details>

以下为原版仓库说明

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

注：目前gitee源因为不可阻挡的原因无法使用，需要切换到github源请在 Yunzai-Bot 根目录夹打开终端执行以下指令

```
git -C plugins/miao-plugin remote set-url origin https://github.com/yoimiya-kokomi/miao-plugin
```

如果网络较差可使用代理加速服务

```
git -C plugins/miao-plugin remote set-url origin https://ghfast.top/https://github.com/yoimiya-kokomi/miao-plugin
```

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

