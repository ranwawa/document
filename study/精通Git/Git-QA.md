# GitQA

- [1. mac 上的 XCode 命令行是啥(20220303)](#1-mac-上的-xcode-命令行是啥20220303)
- [2. [已解决]如何使用 git 上的个人编辑器(20220303)](#2-已解决如何使用-git-上的个人编辑器20220303)
- [3. [已解决]grep 的英文全称(20220303)](#3-已解决grep-的英文全称20220303)
- [4. [已解决]branch 和 ref 的区别(20220308)](#4-已解决branch-和-ref-的区别20220308)
- [5. [已解决]glob 模式(20200303)](#5-已解决glob-模式20200303)
- [6. git mergetool 的使用(20220303)](#6-git-mergetool-的使用20220303)
- [7. 提交对象和树对象的区别(20220305)](#7-提交对象和树对象的区别20220305)
- [8. GPG 是什么](#8-gpg-是什么)
- [9. [已解决]stdin 是什么(20220307)](#9-已解决stdin-是什么20220307)
- [10. [已解决]Unix 风格是什么(20220308)](#10-已解决unix-风格是什么20220308)
- [11. github 操作老是超时(20220411)](#11-github-操作老是超时20220411)
- [12. [已解决]bash 中输入的中文是编码后的(20220304)](#12-已解决bash-中输入的中文是编码后的20220304)
- [14.[已解决] .gitignore 里面设置了忽略文件但是不生效(191101)](#14已解决-gitignore-里面设置了忽略文件但是不生效191101)
- [15. [已解决]git push 完代码后,自动发布 npm 包(git 钩子使用)(191224)](#15-已解决git-push-完代码后自动发布-npm-包git-钩子使用191224)
- [16. [已解决]git clone 仓库时总是失败(20200208)](#16-已解决git-clone-仓库时总是失败20200208)
- [17. [已解决]仓库帐号密码相关逻辑(20200422)](#17-已解决仓库帐号密码相关逻辑20200422)
- [18. [已解决]如何设置分支文件夹(20201010)](#18-已解决如何设置分支文件夹20201010)
- [19. [已解决]本地无法查看远程分支(20210105)](#19-已解决本地无法查看远程分支20210105)
- [20. [已解决].gitattributes 文件的作用是啥(20220415)](#20-已解决gitattributes-文件的作用是啥20220415)
- [21. 无法向 github 推送东西(2022-05-26)](#21-无法向-github-推送东西2022-05-26)

## 1. mac 上的 XCode 命令行是啥(20220303)

现在不用 mac 了,暂时不看这个问题

## 2. [已解决]如何使用 git 上的个人编辑器(20220303)

### 问题描述

效果在需要用编辑器的时候,会打开对应的编辑器来进行编辑
比如运行命令`git config --edit --global`时会自动用 VSCode 打开配置文件

### 问题解决

设置的 2 种途径:

- 安装时可以选择一个默认编辑器
- 或者通过配置命令 git config --global core.editor xxx

## 3. [已解决]grep 的英文全称(20220303)

### 问题描述

知道这个是查找,但他的全称是啥呢,这样更容易记忆和理解其本质

### 问题解决

Global Regular Expression Parser

全局正则表达式解析器

## 4. [已解决]branch 和 ref 的区别(20220308)

### 问题描述

在 gitlab ci 中看到过,以为 ref 就是 branch.在这里又看到了,并且明确说明有区别

### 问题解决

- branch 分支实际是一个指向某个 SHA1 的指针
- ref 是一个引用
  - 包括 branch
  - tag
  - 以及远程分支

所以 branch 是 ref 的一种形式而已

参考:

- https://git-scm.com/book/en/v2/Git-Internals-Git-References

## 5. [已解决]glob 模式(20200303)

### 问题描述

在很多配置文件中的 include 或者 exclude 中会用到这个模式.这里的.gitignore 中又提及到了.不能总是对这个概念很模糊,必须要搞清楚才行

### 问题解决

| 符号                | 含义             |
| ------------------- | ---------------- |
| \*                  | 0 或多个字符     |
| ?                   | 1 个字符         |
| [...]               | 类似正则中的范围 |
| [!...]              | 取反             |
| [^...]              | 取反             |
| !(pattern\|patter)  | 取反             |
| ?(pattern\|patter)  | 0 或 1 个        |
| +(pattern\|patter)  | 1 或多个         |
| \*(pattern\|patter) | 0 或多个         |
| @(pattern\|patter)  | 1 个             |
| \*\*                | 0 或多层目录     |

参考： https://www.npmjs.com/package/glob

## 6. git mergetool 的使用(20220303)

### 问题描述

之前解决冲突都是在打开 webstorm 然后再依次点击进入解决冲突的页面

感觉这个可以用命令行直接进入那个页面，很是方便的样子

### 问题解决

```text
[merge]
	tool = webstorm
[mergetool "webstorm"]
  cmd = cmd \"/C c:\\Program" "Files\\JetBrains\\WebStorm" "2021.3.2\\bin\\webstorm64 merge $(cd $(dirname "$LOCAL") && pwd)/$(basename "$LOCAL") $(cd $(dirname "$REMOTE") && pwd)/$(basename "$REMOTE") $(cd $(dirname "$BASE") && pwd)/$(basename "$BASE") $(cd $(dirname "$MERGED") && pwd)/$(basename "$MERGED")\"
  trustExitCode = true
```

不过这里有个问题，目录中的空格无法识别，所以最终还是没有看到效果

## 7. 提交对象和树对象的区别(20220305)

### 问题描述

在 git log --pretty 的占位符中，有提到提交对象和树对象。没搞懂这两个有啥区别

### 问题解决

提交对象：就是当次提交的 commit 对象

## 8. GPG 是什么

### 问题描述

7.4 有提到用 GPG 对 commit 或 tag 进行更加安全的签名，可这个 GPG 是啥

## 9. [已解决]stdin 是什么(20220307)

### 问题描述

在很多配置文件有关文件的说明地方,经常会看到这个词,一直不知道是啥意思,今天在 7.14.1 又看到了你.必须搞定了

### 问题解决

- stdin: 标准输入,默认是键盘,也可以是参数,文件等. FD 是 0
- stdout: 标准输出,默认是 terminal,也可以是文件,/dev/null 等其他设备. FD 是 1
- stderr: 标准错误,默认是 terminal. FD 是 2

参考:

- https://stackoverflow.com/questions/3385201/confused-about-stdin-stdout-and-stderr
- http://c.biancheng.net/view/942.html

## 10. [已解决]Unix 风格是什么(20220308)

### 问题描述

git 第 10.1 有描述到,底层命令设计时遵循了 Unix 风格..这是啥

### 问题解决

unix 是操作系统,linux 也是操作系统.linux 是模仿 unix 写出来的,包含 unix 的全部功能

10.1 中提到的底层命令参考了 unix 风格.比如参数可以用`-`短横线开头
命令行的 3 种风格:

- Unix 风格: `-`短横线
- BSD 风格: 不加横线
- GNU 风格: `--`双横线

参考:

- http://c.biancheng.net/view/707.html
- https://blog.csdn.net/ruibin_cao/article/details/84660224

## 11. github 操作老是超时(20220411)

### 问题描述

被墙的原因.之前也老是遇到,一般选择忍一忍,或者多试几次.上次用了一个 github 官方的命令行,好像可以避免这个问题.但多用一个工具稍微有一点麻烦.

前面精通 Git 时,有看到一个配置代理的参数.今天就来根除这个问题

1. 连接 chrome 插件 monocloud 中的代理地址,总提示代理连接失败
   - 这可能和代理需要验证一些头部信息相关
   - 想用 fiddler 抓包看看传了哪些信息给代理,但是 fiddler 是走的系统代理,通过这个 chrome 插件的代理,并不会走系统代理,所以拿不到数据
   - 用 wireshark 抓得到,但是 TSL 层加过密了,看不到 HTTP 数据

```bash
> git config --global http.proxy ranwawa:123456@global-us.link.ac.cn:152
> git clone https://github.com/ranwawa/uni-vant

c:\Users\Administrator\Downloads\uni-vant --progress
fatal: unable to **access** 'https://github.com/ranwawa/uni-vant/': Proxy CONNECT aborted
```

2. 本机安装并打开 monocloud 代理,然后代理到 127.0.0.1:7078 端口,这次是报 SSL 被 github 给重设了
   - 应该是证书相关问题
   - 关掉浏览器的插件代理,使用系统代理也会出现这种问题
   - 但是浏览器会自动重试,重试后就成功了,成功之后也就 ok 了
   - 试着在 clone 后立即重试,确实可以了.这是为什么呢

```
> git config --global 127.0.0.1:7078
> git clone https://github.com/ranwawa/uni-vant

c:\Users\Administrator\Downloads\uni-vant --progress
fatal: unable to access 'https://github.com/ranwawa/uni-vant/': OpenSSL SSL_connect: Connection was reset in connection to github.com:443
```

### 问题解决

参考:

- file:///C:/Program%20Files/Git/mingw64/share/doc/git-doc/git-config.html

## 12. [已解决]bash 中输入的中文是编码后的(20220304)

### 问题描述

在 git bash 的设置中，将编码格式设置成 UTF-8/GBK 都无效

```bash
$ git status -s
 M "study/\347\262\276\351\200\232Git/QA.md"
?? "study/\347\262\276\351\200\232Git/\347\254\254\344\272\214\347\253\240 Git\345\237\272\347\241\200.md"
```

### 问题解决

git config --global core.quotePath false

这个值默认是 true,会将超过 0x80 的字符视为特殊字符进行转义

## 14.[已解决] .gitignore 里面设置了忽略文件但是不生效(191101)

### 业务背景

用`vue`开发项目,编译后的文件是不用上传到仓库里的,按理来说,只要在`.gitignore`文件里添加对应的目录即可.但很奇怪,有时候这种操作人生效,有时候又不生效,提交保存的时候,还是会看到 dist 里面的东西

git 代码

```bash
node_modules/
dist/
```

### 问题解决

- 先清空一下 git 缓存`git rm -r --cached dist`
- 然后再提交就可以了 - 参考链接: https://blog.csdn.net/qq_31325079/article/details/82701208

## 15. [已解决]git push 完代码后,自动发布 npm 包(git 钩子使用)(191224)

### 业务背景

最近把项目中公用的 sass 文件单独拿出来,做成了一个 npm 包引用,项目脚手架也整理成了一个单独的`vue-cli`插件,方便快速热启动一个新的项目.前期插件内容变更频繁.每次变更后都得推送到 github 还要再去 publish 到 npm,着实有点繁琐

### 问题解决

- 想自己写钩子,但那个 git/hooks 里面全是 shell 命令,有点头大
- 所以换成了 husky 插件
- 参考链接:
  - https://github.com/typicode/husky
  - https://www.git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90

## 16. [已解决]git clone 仓库时总是失败(20200208)

### 业务背景

看`lodash`源码,但是通过`WebStorm`clone 仓库时,失败了好几次

### 报错内容

```bash
RPC failed; curl 56 OpenSSL SSL_read: Connection was reset, errno 10054 the remote end hung up unexpectedly early EOF index-pack failed
```

### 问题解决

- 20210105
- 这个就是被墙的问题，唯有梯子才能搞定

## 17. [已解决]仓库帐号密码相关逻辑(20200422)

### 业务背景

特别是在新电脑上连接库的时候容易遇到这个问题,就老是无法下载,说木有权限...有时候 IDE 或者 git bash
会提示自动登陆,但又时候又不会提示自动登陆.以前都是懵懵懂懂临时解决后,能跑起来就 over 了...

当再一次重装电脑或者换新电脑后,又得去搜索一通.昨天新同事入职,又不用 webstorm,结果又查了好久才查出来,这次就干脆完整的整理一下

首先要区分一个概念

在安装 git bash 后,会通过命令行输入一个用户名和邮箱,这个并非仓库的邮箱和密码,而是在每次 commit 时会用到

```bash
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

所有的用户凭证操作都是通过`git credential`命令执行的

- 什么是 credential
  - 专门用来管理 git 的用户名和密码的
- 查询 credential 的流程
  - 如果`GIT_ASKPASS`设置了,就始终会弹框提示输入
  - 如果`core.askPass`设置了,使用
  - 如果`SSH_ASKPASS`设置了,使用
  - 否则在终端上提示
- 配置 credential 的 2 种方式
  - 直接在 git 配置文件里面修改
  - 通过 credential.helpers 配置
    - store 永久存储,cache 临时存储
    - 其他自定义配置
- credential 上下文
  - 简单来讲,就是通过域名来匹配对应的帐号密码
- credential 参数
  - 配置方式
    - credential.\* 会对所有上下文有效
    - credential.<url>.\* 只对某个上下文有效
  - 通用参数
    - credential.helper 指定存储方式
    - username 用户名
    - useHttpPath 匹配上下文时是否识别路径
- 参考文档: https://git-scm.com/docs/gitcredentials

### 问题

- 在什么情况不会自动弹出登陆框
- 本地怎么永久保存账号密码
- 如何查看/删除/切换本地保存的账号密码

### 问题解决

- 20200422

什么情况下不会自动弹出登陆框

- 如果没有保存用户密码,就会按照上面的查询 credential 流程来进行弹框提示

把帐号密码直接输入 url 里面

- https://ranqirong:123456@gitlab.xiujiadian.com/xxx
- 优点
  - 简单
- 缺点
  - 明文表示密码了
  - 每次都需要输入帐号密码
  - 帐号密码里面的非 asc2 字符需要 url 编码,比如帐号是2@qq.com要改成 1%40qq.com

本地怎么永久保存帐号密码

- 执行`git config credential.helper store`
- 然后执行 clone/pull/push 等任意一种操作
- 会提示输入帐号密码,输入后就会自动保存了
- 参考: https://git-scm.com/docs/git-credential-store

```bash
$ git config credential.helper store
$ git push http://example.com/repo.git
Username: <type your username>
Password: <type your password>
```

如何查看/删除/切换本地保存的帐号密码

- 帐号密码以及上下文信息是保存在.git-credentials 目录里面的
- 打开这个文件直接操作就行了
- 文件存放在哪儿?以下是查找顺序
  - ~/.git-credentials(windows 下面即 c/用户/用户名/)
  - $XDG_CONFIG_HOME/git/credentials
  - $HOME/.config/git/credentials

## 18. [已解决]如何设置分支文件夹(20201010)

### 业务背景

入职货拉拉后,看他们一个项目的分支是以 feature-主版本号/子版本号来命名的,一个仓库里面有 N 个分支,但是在同步到 webstorm
里后,看到的分支列表,居然自动用主版本号分了文件夹,看上去也比较清晰

效果如下图
![](.git_images/a0ac33c0.png)

### 问题解决

- 20201012
- 这个不需要手动设置
- 分目录是 webstorm 自己的行为

### 问题分析

- 只要分支上使用了斜杠`/`
- ide 会自动识别为目录
- 所以以后可以按人员进行目录划分,以便于 ide 进行处理

## 19. [已解决]本地无法查看远程分支(20210105)

### 业务背景

最近切换到`vscode`，昨天在使用过程中，不知道为啥，突然就看不到远程分支了．开始还以为是 vscode 的问题，切换到`webstorm`居然一样．

在网络上搜索了一下，说是要`fetch` ，然后操作无效

后来发现本地没有远程分支，就手动添加了`origin`，但是显示`push`的那个本地分支所对应的远程分支，其它远程分支还是无法拉下来

再尝试`fetch`命令时，发现总时会返回一个 redirecting to 的警告。或许问题就出在这里

问题解决

- 20210105
- 先 remove 掉远程分支
- 然后重新 add 远程分支
- 再 fetch 即可

不知道为什么会出现这种情况，反正多试几次就 ok 了

## 20. [已解决].gitattributes 文件的作用是啥(20220415)

### 问题描述

今天在看 umi 仓库时,发现根目录有一个.gitattributes 的文件.本着就近就深的原则,深入了解一下这产文件到底用来干什么的

### umi 的.gitattributes 内容

```bash
fixtures/* linguist-vendored
examples/* linguist-vendored
node_modules linguist-vendored
*.js linguist-vendored
```

### 问题解决

- 20220416

.gitattributes 就是针对指定文件,进行特殊处于的配置文件.
比如让.js 谁的的换行符是 LF,umi 中这个属性是忽略这 4 个目录下面的文件后缀名,以便让 github 正确识别项目类型,应该是 github 专用属性

### 参考文档

- [attributes 密文文档](https://git-scm.com/docs/gitattributes)
- [linguist-vendored 用法](https://www.cnblogs.com/caiji/p/9536182.html)

## 21. 无法向 github 推送东西(2022-05-26)

### 问题描述

昨天不知道操作了一下啥,突然就无法向 github 推送了

```bash
ssh: connect to host github.com port 22: Connection refused
```

问题排除:

- gitlab 可以正常推送
- 更换了 ssh key,照样无法推送
- 把 ssh 协议换成 http 协议照样报错
- 但是可以直接访问 github
- 还以为是图书馆防火墙的问题,换成自己的热点也不行

```bash
Failed to connect to github.com port 443 after 3 ms: Connection refused
```

### 问题解决

### 参考链接
