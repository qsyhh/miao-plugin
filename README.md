# 说明

此仓库为个人fork版本自用

此仓库将在原仓库有更新时测试后推送同步，可能更新不及时...推荐使用原版 [miao-plugin](https://gitee.com/yoimiya-kokomi/miao-plugin)

> 或搭配wiki([gitee](https://gitee.com/qsyhh/wiki)|[github](https://github.com/mhy-wiki/wiki))使用，项目Q群：[517144547](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=2pln8DfZOIwge418mZ2lGK272ulJeABB&authKey=omB8vXIFk0NsTSkShPUrCuoXQsDwmH3DVx0CPakj%2FV4PjZD%2F3WCQrhM9PH08BGj1&noverify=0&group_code=517144547)

## 较原版的新增

- [x] 支持星铁图鉴、星铁技能显示能量上限及削韧值

- [x] 星铁面板增加q版头像(头像来源官方大月卡头像)

- [x] 新增`#喵喵背景设置`、`#喵喵背景帮助`命令，支持自定义面板、面板列表背景图

- [ ] 星铁图鉴增加素材显示

- [x] 新增`#复刻统计`、`#四星复刻统计`、`*四星光锥复刻统计`命令，用于查看角色/武器多久未复刻，UI源码来源[windoge-plugin](https://gitee.com/windoge/windoge-plugin)

- [x] 新增`#绫华复刻统计`、`#雾切复刻统计`、`*于夜声中复刻统计`命令，用于查看角色历史复刻卡池，支持使用别名查询

## 安装指令

方式1: 首次/重新安装插件：

```
// 使用gitee
git clone --depth=1 https://gitee.com/qsyhh/miao-plugin.git ./plugins/miao-plugin/
pnpm install -P

// 使用github
git clone --depth=1 https://github.com/qsyhh/miao-plugin.git ./plugins/miao-plugin/
pnpm install -P
```

>  [!NOTE]
> 如果你的网络环境较差，无法连接到 Github，可以使用 [GitHub Proxy](https://mirror.ghproxy.com/) 提供的文件代理加速下载服务
> ```
> git clone --depth=1 https://mirror.ghproxy.com/https://github.com/qsyhh/miao-plugin.git ./plugins/miao-plugin/
> pnpm install -P
> ```

方式2: 🔐 换源

注: 该方式将会【强制覆盖】本地所有文件，否则无法使用指令更新插件，但面板图、配置文件等文件会保留。自修改过多请勿使用本fork版，自修改报错一律不受理

```
// 使用gitee
cd plugins/miao-plugin
git remote set-url origin https://gitee.com/qsyhh/miao-plugin.git
git reset --hard HEAD

// 使用github
cd plugins/miao-plugin
git remote set-url origin https://github.com/qsyhh/miao-plugin.git
git reset --hard HEAD
```

>  [!NOTE]
> 如果你的网络环境较差，无法连接到 Github，可以使用 [GitHub Proxy](https://mirror.ghproxy.com/) 提供的文件代理加速下载服务
> ```
> cd plugins/miao-plugin
> git remote set-url https://mirror.ghproxy.com/https://github.com/qsyhh/miao-plugin.git
> git reset --hard HEAD
> ```

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
* QQ群（暂时停止新加入，请见谅）
    * Yunzai-Bot 官方QQ群：213938015
    * 喵喵Miao-Plugin QQ群：607710456
* [爱发电](https://afdian.net/@kokomi) :欢迎老板打赏，喵~

