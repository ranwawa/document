# lerna qa

- 1. \[已解决\]生成版本号时报错(2022-12-07)

## 1 :已解决:生成版本号时报错(2022-12-07)

### 问题描述

有时候会遇到.重新 install 之后还是不生效

```shell
? Are you sure you want to create these versions? Yes
lerna info execute Skipping releases
lerna ERR! Error: Command failed with exit code 1: npm install --package-lock-only --ignore-scripts
lerna ERR! npm ERR! Cannot read properties of undefined (reading 'extraneous')
```

看了下错误是在更新根目录的 lock 文件时挂了

```shell
33 verbose version Updating root package-lock.json
34 error Error: Command failed with exit code 1: npm install --package-lock-only --ignore-scripts
34 error npm ERR! code ETARGET
```

### 问题解决

删除 lock 文件,再重新安装一下即可.应该是合并分支时,导致 package 文件和 lock 文件不一致引起的

1222 更新: 今天在 mac 上行,windows 上遇到这个问题删除 modules,lock 文件重新安装还是不行.把 window 的 node 版本改到和 mac 一致就可以了

### 参考链接
