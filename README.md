# 说明

此仓库为个人fork版本自用

此仓库将在原仓库有更新时测试后推送同步，可能更新不及时...推荐使用原版 [miao-plugin](https://github.com/yoimiya-kokomi/miao-plugin)

> 此仓库仍处于2.0.0-beta阶段，因不可控因素已公开内测
>
> 项目Q群：[517144547](https://qm.qq.com/q/qJFodHl2Bq)
>
> 后备群(无需审批): [2154023478](https://qm.qq.com/q/DTbD5v0tjy)
>
> ⚠️请尊重作者的努力，勿将本仓库内所有新增资源、功能传播或上传到除[原版 miao-plugin](https://github.com/yoimiya-kokomi/miao-plugin)的其他仓库或其他社区，如需使用请自行本地修改或pr推送到[原版 miao-plugin](https://github.com/yoimiya-kokomi/miao-plugin)

## ⚠️meta资源外置

最新版本中已移除meta资源，首次安装插件需下载meta资源(或启动Yunzai即可自动安装)，后续通过`#喵喵更新攻略资源`更新

注：首次安装需较长时间(Miao-Yunzai用户会出现开机卡在加载插件前的日志，此时为插件正在自动安装meta)，建议手动执行指令拉取

CNB源下载：

```bash
git clone -b meta-gs https://cnb.cool/qsyhh_res/meta.git "./plugins/miao-plugin/resources/meta-gs" --depth=1
git clone -b meta-sr https://cnb.cool/qsyhh_res/meta.git "./plugins/miao-plugin/resources/meta-sr" --depth=1
```

其他源需手动拉取，插件内置为cnb源，其他源获取方式同插件源...

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

<details><summary>功能更新</summary>

- [x] 支持星铁图鉴、星铁技能显示能量上限及削韧值

- [x] 星铁图鉴增加素材显示

- [x] meta资源外置，资源仓库[meta-gs](https://cnb.cool/qsyhh_res/meta/-/tree/meta-gs)、[meta-sr](https://cnb.cool/qsyhh_res/meta/-/tree/meta-sr)（后续通过`#喵喵更新攻略资源`更新）

- [x] 重构设置`#喵喵设置`模块，分类管理设置，支持修改文件后热更新，兼容通过[`Guoba-Plugin`](https://gitee.com/guoba-yunzai/guoba-plugin)使用web配置

- [x] 深渊支持 `#上期深渊`查询

</details>

<details><summary>功能新增</summary>

- [x] 新增`#喵喵背景设置`、`#喵喵背景帮助`命令，支持自定义面板、面板列表背景图

- [x] 新增`#复刻统计`、`#四星复刻统计`、`*四星光锥复刻统计`命令，用于查看角色/武器多久未复刻，UI源码来源[windoge-plugin](https://gitee.com/windoge/windoge-plugin)

- [x] 新增`#绫华复刻统计`、`#雾切复刻统计`、`*于夜声中复刻统计`命令，用于查看角色历史复刻卡池，支持使用别名查询

- [x] 新增`#绫华攻略`、`#火主攻略`、`*记忆主攻略`命令，用于查询角色攻略(默认关闭，攻略数据为手动更新[gs](https://gitee.com/qsyhh/resources/tree/gs/)|[sr](https://gitee.com/qsyhh/resources/tree/sr/)，更新不及时，可使用`#喵喵设置攻略关闭`关闭此功能，发送`#喵喵攻略帮助`查看帮助)

- [x] 新增`#雾切图鉴`，`*于夜色中图鉴`，用于查询武器图鉴（默认关闭，使用`#喵喵设置武器图鉴开启`开启）

</details>

<details><summary>其他更新</summary>

- [x] 面板列表区分本次更新/获取角色
  > ~~⚠️原神的米游社更新可能与其其他的面板服务无法互通，导致无法正确判断是否为`更新角色`~~

- [x] 星铁面板增加q版头像(头像来源官方大月卡头像) [@YuapXc](https://gitee.com/YuapXc)

- [x] 新增角色表情包版头像、自定义头像，默认关闭，可通过`#喵喵设置表情包头像开启`或`#喵喵设置自定义头像开启`命令开启。表情包头像可前往[qsyhh/image](https://gitee.com/qsyhh/image)下载并重命名为`face-b.png`，添加自定义头像时，须将文件名重命名名为`face-z.png`
  > ⚠️表情包版头像、自定义头像后缀均为`.png`

</details>

<details><summary>对接提瓦特小助手API(已获得授权使用)</summary>

- [x] 新增`#幽境危战使用率`查询

- [x] `#深渊使用率`适配

- [x] `#角色图鉴`中命座、武器及圣遗物统计适配

- [x] `#上传深渊`适配

- [ ] `#角色持有率`适配

- [ ] `#命座统计`适配

- [ ] `#深渊配队`适配

</details>


<details><summary>未来计划</summary>

- [ ] `#个人日历`查询

- [ ] meta更新热加载

- [ ] meta仓库脱离使用git拉取/更新

- [ ] 星铁`*虚构叙事`查询

- [ ] 星铁`*末日幻影`查询

- [ ] 极限面板可通过`#更新面板`更新，默认更新源为[100000000.json](https://profile.qsyhh.icu/100000000.json)，可自定义

</details>

## 安装指令

此fork已不支持从[原版 miao-plugin](https://github.com/yoimiya-kokomi/miao-plugin)换源后使用(！！meta将无法更新或正确拉取)，建议重新安装

### gitee(深测源)

暂不提供地址

### GitCode(内测源)

首先前往[token-classic](https://gitcode.com/setting/token-classic)获取个人令牌

方式1: 首次/重新安装插件：

```bash
git clone --depth=1 https://用户名:个人令牌@gitcode.com/qsyhh_code/miao-plugin.git ./plugins/miao-plugin/ --depth=1
pnpm install --filter=miao-plugin
git clone -b meta-gs https://gitcode.com/qsyhh_code/meta.git "./plugins/miao-plugin/resources/meta-gs" --depth=1
git clone -b meta-sr https://gitcode.com/qsyhh_code/meta.git "./plugins/miao-plugin/resources/meta-sr" --depth=1
```

### GitHub(稳定源)

方式1: 首次/重新安装插件：

```bash
git clone --depth=1 https://github.com/qsyhh/miao-plugin.git ./plugins/miao-plugin/ --depth=1
pnpm install --filter=miao-plugin
git clone -b meta-gs https://cnb.cool/qsyhh_res/meta.git "./plugins/miao-plugin/resources/meta-gs" --depth=1
git clone -b meta-sr https://cnb.cool/qsyhh_res/meta.git "./plugins/miao-plugin/resources/meta-sr" --depth=1
```

## Q&A

Q: 异相功能不能用？

A: 查看[此更新](https://gitee.com/qsyhh/Miao-Yunzai/compare/536c1389d4a72a91af833abe226c46c2fb7ccb47...ffc258932af00a31cb676640778683e68bb2b16b)修改对应文件

## 插件兼容适配

以下为已兼容此fork并可正常运行的插件列表，如遇以下插件报错请前往对应插件issue反馈

> 注：也可加入上述[说明](#说明)中的Q群提问，本人也将受理以下插件兼容性报错。
> 其他插件报错概不负责，请酌情安装此fork

| 插件名                                                 | 插件作者                                  | 插件描述                     |
|-----------------------------------------------------|---------------------------------------|--------------------------|
| [wiki](https://gitcode.com/qsyhh_code/miao-wiki)    | [qsyhh](https://gitcode.com/qsyhh)    | 依附喵喵插件，提供内测数据查看功能        |
| [ark-plugin](https://github.com/NotIvny/ark-plugin) | [NotIvny](https://github.com/NotIvny) | 适用于Yunzai-Bot的喵喵插件功能拓展插件 |

## Ciallo～(∠・ω< )⌒☆

如果你觉得我的fork做的很好，请留下一个免费的star吧，你的支持是我们前进的最大动力😘

有新的想法可以在issue中提出，集思广益，一定会让我们的fork变得越来越好
