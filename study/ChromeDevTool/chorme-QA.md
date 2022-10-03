# chrome QA

- [1. [已解决]开了 vpn 后之 http 请求 http 会跨域 (2022-06-22)](#1-已解决开了-vpn-后之-http-请求-http-会跨域-2022-06-22)
- [2. [已解决]如何复现 chrome 本地的 307 跳转(2022-06-22)](#2-已解决如何复现-chrome-本地的-307-跳转2022-06-22)
- [3. [已解决]快速禁用 chrome 的跨域限制(2022-09-16)](#3-已解决快速禁用-chrome-的跨域限制2022-09-16)

## 1. [已解决]开了 vpn 后之 http 请求 http 会跨域 (2022-06-22)

### 问题描述

内部管理系统 dev/test 环境,采用的是 http 协议.偶现 http 中转 http 报跨域错误...

### 问题解决

这是 chrome102 引入的新功能,用来防止恶意访问私有网络,和 vpn 没有关系

原因是跳转的内网地址可能被运维临时设置成了内部 198 开头的 ip 地址,从而触发了这个限制

关掉浏览器的限制,运维指向公网,或者目标网站打开私有网络访问权限(类似于 cros 配置)

### 参考链接

- [chrome 官方文档](https://developer.chrome.com/blog/private-network-access-preflight/)

## 2. [已解决]如何复现 chrome 本地的 307 跳转(2022-06-22)

### 问题描述

本地开发环境是 http 协议.如果本地访问过 https,下次再访问 http 会自动跳转到 https,包括 ajax 请求也是一样.

根据官方文档介绍,如果 https 响应中包含 strict-transport-security: max-age=15724800; includeSubDomains 则后续 http 请求都会自动 307 到 https

访问<https://test2-bff-ocs.xiujiadian.com/robot/#/可以得到这个响应.但是后续的http>都没有被转发

### 问题解决

阻止 HSTS 的方法

- 去掉 https 响应中的 Strict-Transport-Security 首部,或者把时间改为 0
- about://net-internals#hsts 中清空当前域名: 20220928 补充,这个查询时要带上二级域名.不能只查主域名否则会查不到

### 参考链接

- [chrome 官方介绍 hsts](https://www.chromium.org/hsts/)
- [知乎翻译 hsts](https://zhuanlan.zhihu.com/p/130946490)

## 3. [已解决]快速禁用 chrome 的跨域限制(2022-09-16)

### 问题描述

如题,有时候懒得配置本地转发,后端也不支持跨域,直接干掉浏览器的跨域功能是最快的

### 问题解决

mac

1. 打开 terminal
2. 执行下面命令

```shell
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

### 参考链接

- [stackoverflow](https://stackoverflow.com/questions/57552185/how-to-disable-cors-in-chrome-mac/69543668#69543668)
