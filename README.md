# 说明

此仓库为个人fork版本自用

此仓库将在原仓库有更新时测试后推送同步，可能更新不及时...推荐使用原版 [miao-plugin](https://gitee.com/yoimiya-kokomi/miao-plugin)

> 项目Q群：[517144547](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=2pln8DfZOIwge418mZ2lGK272ulJeABB&authKey=omB8vXIFk0NsTSkShPUrCuoXQsDwmH3DVx0CPakj%2FV4PjZD%2F3WCQrhM9PH08BGj1&noverify=0&group_code=517144547)
> ⚠️请尊重作者的努力，勿将本仓库内所有新增资源、功能传播或上传到除[原版 miao-plugin](https://github.com/yoimiya-kokomi/miao-plugin)的其他仓库或其他社区，如需使用请自行本地修改或pr推送到[原版 miao-plugin](https://github.com/yoimiya-kokomi/miao-plugin)

## ⚠️meta资源外置

最新版本中已移除meta资源，首次安装插件需下载meta资源(或启动Yunzai即可自动安装)

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

- [x] meta资源外置，资源仓库[meta-gs](https://cnb.cool/qsyhh_res/meta/-/tree/meta-gs)、[meta-sr](https://cnb.cool/qsyhh_res/meta/-/tree/meta-sr)

- [ ] 极限面板可通过`#更新面板`更新，默认更新源为[100000000.json](https://profile.qsyhh.icu/100000000.json)，可自定义

## 安装指令

### gitee(深测源)

暂不提供地址

### GitCode(内测源)

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

### GitHub(稳定源)

方式1: 首次/重新安装插件：

```bash
git clone --depth=1 https://github.com/qsyhh/miao-plugin.git ./plugins/miao-plugin/ --depth=1
pnpm install --filter=miao-plugin
git clone -b meta-gs https://cnb.cool/qsyhh_res/meta.git "./plugins/miao-plugin/resources/meta-gs" --depth=1
git clone -b meta-sr https://cnb.cool/qsyhh_res/meta.git "./plugins/miao-plugin/resources/meta-sr" --depth=1
```

方式2: 🔐 换源

注: 该方式将会【强制覆盖】本地所有文件，否则无法使用指令更新插件，但面板图、配置文件等文件会保留。自修改过多请勿使用本fork版，自修改报错一律不受理

```bash
cd plugins/miao-plugin
git remote set-url origin https://github.com/qsyhh/miao-plugin.git
// 原fork用户这里可直接执行git pull，无需后续操作
git fetch origin master
git reset --hard origin/master
```
