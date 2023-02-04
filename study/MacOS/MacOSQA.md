# MacOS QA

- 1. :已解决:安装 VUE 成功后提示 zsh: command not found: vue(20201110)
- 2. :已解决:安装 nrm 成功后提示 Error: Cannot find module 'semver'(20201111)
- 3. 如何更改 Mac 系统用户名及文件夹的名字(20220413)
- 4. :已解决:如何更改 bash 的默认权限(20220414)
- 5. dev server 在 80 端口上启动时报权限问题(2022-06-10)
- 6. 休眠后扩展显示器的窗口跑主显示器去了(2022-06-21)
- 7. :已解决:mac vscode 中老自动生成.DS_Store 文件(2022-06-23)
- 8. :已解决:安装 nvm 后总是提示命令不存在(2022-07-22)
- 9. 80 端口被占用(2022-09-08)
- 10. :已解决:怎么强制退出右上角小图标中的进程(2022-10-18)
- 11. :已解决:怎么将命令添加到环境变量里面(2022-10-28)

## 1 :已解决:安装 VUE 成功后提示 zsh: command not found: vue(20201110)

### 业务背景

通过`vue-cli`官方文档安装了 vue,然后运行`vue`命令提示未找到模块,退出控制台重新进入还是照旧...之前在安装
nvm 时也遇到同样的问题

### 问题解决

- 202011112
- 在根路径下面的`.zhsrc`文件最后加上如下代码即可

```bash
[[ -e ~/.profile ]] && emulate sh -c 'source ~/.profile'
```

### 问题分析

- mac 存在多个终端命令行工具,包括 bash 和 zsh
- zsh 是后面更新的
- 好多软件会默认把环境变量存到 bash 的配置文件里面
- .zshrc 是 zsh 命令行工具的配置文件
- .profile 是 bash 命令行工具的配置文件
- 加上上面的代码,是让 zsh 也能识别 bash 的环境亦是

## 2 :已解决:安装 nrm 成功后提示 Error: Cannot find module 'semver'(20201111)

问题同上

## 3 如何更改 Mac 系统用户名及文件夹的名字(20220413)

### 问题描述

洁癖。在用户中只能修改登录时显示的用户名。系统用户名无法修改，导致在 shell 中还是看到不一样的名字

### 参考文档

- [知乎](https://zhuanlan.zhihu.com/p/361131804)

## 4 :已解决:如何更改 bash 的默认权限(20220414)

### 问题描述

通过 terminal 打开的终端,显示的身份始终是`$`.在很多时候遇到要权限的操作,每次都要输入密码,有点儿麻烦.能不能直接以 root 权限`#`登录呢?

1. 直接以 root 的身份登录 Mac,就可以避免这个问题,可是我另外一个用户上已经玩几天了,删除另外一个用户吗?

那就看看能不能把 root 权限分配给另外一个用户,或者直接在 bash 里面自动输入密码

2. 可以给终端或者是 Fig 设置完全磁盘访问权限,可还是无法在/usr/bin 下面创建目录或文件

3. 可以更改 sudo 的策略,这样就不用输入密码了,可还是无法在/usr/bin 下面创建目录或文件

4. 怀疑是权限问题, 查看/usr/bin 权限, 查看当前用户及所在组的权限, 结果发现只有 root 这个帐户可以在下面创建有写的权限

```bash
drwxr-xr-x  1012 root  wheel  32384  3 26 15:21 bin
```

### 问题解决

- 切换到 root 用户 `sudo -i`

### 参考文档

- [mac 启用 root 帐户](https://support.apple.com/en-us/HT204012)
- [sudo 禁用密码](https://apple.stackexchange.com/questions/257813/enable-sudo-without-a-password-on-macos)
- [用户和组相关操作](https://www.jianshu.com/p/7e795b3e7bfc)
- [权限介绍](https://baike.baidu.com/item/Linux%E7%9B%AE%E5%BD%95%E6%9D%83%E9%99%90/4089164?fr=aladdin)

## 5 dev server 在 80 端口上启动时报权限问题(2022-06-10)

### 问题描述

使用 vue3.x + vite 的项目.配置的是监听 80 端口(不能修改),npm run serve 时报下面的错误

```javascript
error when starting dev server:
Error: listen EACCES: permission denied 127.0.0.1:80
    at Server.setupListenHandle [as _listen2] (node:net:1313:21)
    at listenInCluster (node:net:1378:12)
    at doListen (node:net:1516:7)
    at processTicksAndRejections (node:internal/process/task_queues:84:21)
```

### 问题解决

1. package.json.script.server 修改成 sudo vite
   1. 每次都要输入密码
   2. windows 系统不存在这个问题,会增加 windows 开发人员的负担
2. 转发 80 端口流量到 8081 等大于 1024 的端口
   1. 相当于是修改了端口,也会影响到其他开发人员
3. MacOSX 这个给普通用户添加 80 端口权限
   1. 好像有用,但是在 m1 make 失败

### 参考链接

- [stackoverflow 讨论](https://stackoverflow.com/questions/16573668/best-practices-when-running-node-js-with-port-80-ubuntu-linode)
- [转发教程](https://www.jianshu.com/p/26ae3c5b7155)

## 6 休眠后扩展显示器的窗口跑主显示器去了(2022-06-21)

### 问题描述

常规情况下分 4 个窗口,扩展显示器 2 个窗口用来打开 IDE 和内部 IT 系统.主显示器用来打开调试界面和聊天界面

可是每次休眠电脑,重新打开电脑后,扩展显示器中的所有窗口都跑到主显示器的第 2 个窗口中

这应该有地方设置保留,但没搜索到

另一个关键词: 窗口排列位置

### 问题解决

### 参考链接

## 7 :已解决:mac vscode 中老自动生成.DS_Store 文件(2022-06-23)

### 问题描述

如题,最近几次在改代码时总会生成这个文件.又没啥规律,每次都要从 git 中清除掉

### 问题解决

这是因为自己在访达中操作过一些文件,系统自动生成的

直接在 gitignore 里面忽略掉就行了

### 参考链接

- [知乎讨论](https://www.zhihu.com/question/20345704)

## 8 :已解决:安装 nvm 后总是提示命令不存在(2022-07-22)

### 问题描述

明明通过 curl 成功安装了 nvm,运行 nvm 命令却提示命令不存在

### 问题解决

这是因为没有将 nvm 添加到环境变量中,所以要手动添加一下

```shell
source ~/.nvm/nvm.sh
```

可这样每次重启电脑后,又会失效,需要手动重新执行一次

### 参考链接

- [stackoverflow 讨论](https://stackoverflow.com/questions/16904658/node-version-manager-install-nvm-command-not-found/17707224#17707224)

## 9 80 端口被占用(2022-09-08)

### 问题描述

在运行前端服务时经常会遇到商品被占用的情况.又不知道是被哪个进程占用的端口

### 问题解决

```shell
lsof -i :80 # 查找占用80的进程
kill PID # 结束掉对应的进程
```

### 参考链接

- [superuser](https://superuser.com/questions/597398/no-idea-what-is-listening-on-port-80-in-os-x)
- [lsof 手册](https://ss64.com/osx/lsof.html)

## 10 :已解决:怎么强制退出右上角小图标中的进程(2022-10-18)

### 问题描述

最近老是因为 vpn 的问题导致电脑无法联网.需要关掉那个 tunelblick 软件,他在程序坞中没有显示,所以点左上角的强制退出看不到,直接点关闭又是卡死状态

每次都是用问题 9 中的方法干掉进程,但是这样很麻烦.有没有 windows 那种进程管理直接关掉呢

### 问题解决

`command + P` -> 活动监视器

### 参考链接

- [百度经验](https://jingyan.baidu.com/article/d169e18641c841026611d8e0.html)

## 11 :已解决:怎么将命令添加到环境变量里面(2022-10-28)

### 问题描述

如题.新装一个工具时,直接执行会遇到没有命令的情况,比如 sonarscanner

这就得手动将其添加到环境变量里面

### 问题解决

临时添加

```shell
export PATH=$PATH:~/Downloads/sonar-scanner-4.7.0.2747-macosx/bin/
```

永久添加

```shell
vim ~/.bash_profile

# 再把上面这个代码添加到文件里面,对其他shell工具一样
```

### 参考链接

- [web](https://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/)
