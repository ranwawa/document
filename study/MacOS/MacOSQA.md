# MacOSQA

- [1. [已解决]安装 VUE 成功后提示 zsh: command not found: vue(20201110)](#1-已解决安装-vue-成功后提示-zsh-command-not-found-vue20201110)
- [2. [已解决]安装 nrm 成功后提示 Error: Cannot find module 'semver'(20201111)](#2-已解决安装-nrm-成功后提示-error-cannot-find-module-semver20201111)

## 1. [已解决]安装 VUE 成功后提示 zsh: command not found: vue(20201110)

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

## 2. [已解决]安装 nrm 成功后提示 Error: Cannot find module 'semver'(20201111)

问题同上

## 3. 如何更改Mac系统用户名及文件夹的名字(20220413)

### 问题描述

洁癖。在用户中只能修改登录时显示的用户名。系统用户名无法修改，导致在shell中还是看到不一样的名字

### 参考文档

- [知乎](https://zhuanlan.zhihu.com/p/361131804)

## 4. [已解决]如何更改bash的默认权限(20220414)

### 问题描述

通过terminal打开的终端,显示的身份始终是`$`.在很多时候遇到要权限的操作,每次都要输入密码,有点儿麻烦.能不能直接以root权限`#`登录呢?

1. 直接以root的身份登录Mac,就可以避免这个问题,可是我另外一个用户上已经玩几天了,删除另外一个用户吗?

那就看看能不能把root权限分配给另外一个用户,或者直接在bash里面自动输入密码

2. 可以给终端或者是Fig设置完全磁盘访问权限,可还是无法在/usr/bin下面创建目录或文件

3. 可以更改sudo的策略,这样就不用输入密码了,可还是无法在/usr/bin下面创建目录或文件

4. 怀疑是权限问题, 查看/usr/bin权限, 查看当前用户及所在组的权限, 结果发现只有root这个帐户可以在下面创建有写的权限

```bash
drwxr-xr-x  1012 root  wheel  32384  3 26 15:21 bin
```

### 问题解决

- 切换到root用户 `sudo -i`


### 参考文档

- [mac启用root帐户](https://support.apple.com/en-us/HT204012)
- [sudo禁用密码](https://apple.stackexchange.com/questions/257813/enable-sudo-without-a-password-on-macos)
- [用户和组相关操作](https://www.jianshu.com/p/7e795b3e7bfc)
- [权限介绍](https://baike.baidu.com/item/Linux%E7%9B%AE%E5%BD%95%E6%9D%83%E9%99%90/4089164?fr=aladdin)