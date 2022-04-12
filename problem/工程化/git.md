- [1.[已解决] .gitignore 里面设置了忽略文件但是不生效(191101)](#1已解决-gitignore里面设置了忽略文件但是不生效191101)
- [2.[已解决] git push 完代码后,自动发布 npm 包(git 钩子使用)(191224)](#2已解决-git-push完代码后自动发布npm包git钩子使用191224)
- [3. [已解决]git clone 仓库时总是失败(20200208)](#3-已解决git-clone-仓库时总是失败20200208)
- [4. [已解决]仓库帐号密码相关逻辑(20200422)](#4-已解决仓库帐号密码相关逻辑20200422)
- [5. [已解决]如何设置分支文件夹(20201010)](#5-已解决如何设置分支文件夹20201010)
- [6. 【已解决】本地无法查看远程分支(20210105)](#6-已解决本地无法查看远程分支20210105)

### 1.[已解决] .gitignore 里面设置了忽略文件但是不生效(191101)

**业务背景**

用`vue`开发项目,编译后的文件是不用上传到仓库里的,按理来说,只要在`.gitignore`文件里添加对应的目录即可.但很奇怪,有时候这种操作人生效,有时候又不生效,提交保存的时候,还是会看到 dist 里面的东西

git 代码

```
node_modules/
dist/
```

**问题解决**

- 先清空一下 git 缓存`git rm -r --cached dist`
- 然后再提交就可以了 - 参考链接: https://blog.csdn.net/qq_31325079/article/details/82701208

### 2.[已解决] git push 完代码后,自动发布 npm 包(git 钩子使用)(191224)

**业务背景**

最近把项目中公用的 sass 文件单独拿出来,做成了一个 npm 包引用,项目脚手架也整理成了一个单独的`vue-cli`插件,方便快速热启动一个新的项目.前期插件内容变更频繁.每次变更后都得推送到 github 还要再去 publish 到 npm,着实有点繁琐

**问题解决**

- 想自己写钩子,但那个 git/hooks 里面全是 shell 命令,有点头大
- 所以换成了 husky 插件
- 参考链接:
  - https://github.com/typicode/husky
  - https://www.git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90

### 3. [已解决]git clone 仓库时总是失败(20200208)

**业务背景**

看`lodash`源码,但是通过`WebStorm`clone 仓库时,失败了好几次

**报错内容**

```
RPC failed; curl 56 OpenSSL SSL_read: Connection was reset, errno 10054 the remote end hung up unexpectedly early EOF index-pack failed
```

**问题解决**

- 20210105
- 这个就是被墙的问题，唯有梯子才能搞定

### 4. [已解决]仓库帐号密码相关逻辑(20200422)

**业务背景**

特别是在新电脑上连接库的时候容易遇到这个问题,就老是无法下载,说木有权限...有时候 IDE 或者 git bash
会提示自动登陆,但又时候又不会提示自动登陆.以前都是懵懵懂懂临时解决后,能跑起来就 over 了...

当再一次重装电脑或者换新电脑后,又得去搜索一通.昨天新同事入职,又不用 webstorm,结果又查了好久才查出来,这次就干脆完整的整理一下

首先要区分一个概念

在安装 git bash 后,会通过命令行输入一个用户名和邮箱,这个并非仓库的邮箱和密码,而是在每次 commit 时会用到

```
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

**问题**

- 在什么情况不会自动弹出登陆框
- 本地怎么永久保存账号密码
- 如何查看/删除/切换本地保存的账号密码

**问题解决**

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

```
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

### 5. [已解决]如何设置分支文件夹(20201010)

**业务背景**

入职货拉拉后,看他们一个项目的分支是以 feature-主版本号/子版本号来命名的,一个仓库里面有 N 个分支,但是在同步到 webstorm
里后,看到的分支列表,居然自动用主版本号分了文件夹,看上去也比较清晰

效果如下图
![](.git_images/a0ac33c0.png)

**问题解决**

- 20201012
- 这个不需要手动设置
- 分目录是 webstorm 自己的行为

**问题分析**

- 只要分支上使用了斜杠`/`
- ide 会自动识别为目录
- 所以以后可以按人员进行目录划分,以便于 ide 进行处理

### 6. 【已解决】本地无法查看远程分支(20210105)

**业务背景**

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
