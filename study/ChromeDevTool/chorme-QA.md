# chrome QA

## 1. [已解决]开了vpn后之http请求http会跨域 (2022-06-22)

### 问题描述

内部管理系统dev/test环境,采用的是http协议.偶现http中转http报跨域错误...

### 问题解决

这是chrome102引入的新功能,用来防止恶意访问私有网络,和vpn没有关系

原因是跳转的内网地址可能被运维临时设置成了内部198开头的ip地址,从而触发了这个限制

关掉浏览器的限制,运维指向公网,或者目标网站打开私有网络访问权限(类似于cros配置)

### 参考链接

- [chrome官方文档](https://developer.chrome.com/blog/private-network-access-preflight/)

## 2. 如何复现chrome本地的307跳转(2022-06-22)

### 问题描述

本地开发环境是http协议.如果本地访问过https,下次再访问http会自动跳转到https,包括ajax请求也是一样.

根据官方文档介绍,如果https响应中包含strict-transport-security: max-age=15724800; includeSubDomains则后续http请求都会自动307到https

访问https://test2-bff-ocs.xiujiadian.com/robot/#/可以得到这个响应.但是后续的http都没有被转发

### 问题解决

阻止HSTS的方法

- 去掉https响应中的Strict-Transport-Security首部,或者把时间改为0
- about://net-internals#hsts中清空当前域名

### 参考链接

- [chrome官方介绍hsts](https://www.chromium.org/hsts/)
- [知乎翻译hsts](https://zhuanlan.zhihu.com/p/130946490)