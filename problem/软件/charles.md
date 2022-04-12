[TOC]

### 1. 初始化配置(20201112)

### 业务背景

之前一直使用 fiddler,但是换到苹果来之后就只能使用 charles 了,就重学一下.在 b 站上找了个视频,这么简单的操作居然分成了 30
个小视频来讲,实在忍受不了那个进度,就直接看文档了,确实这个工具相对于 Fiddler 来说要简单好多,当然,相应的功能也少了很多

**mac 安装**

- 20201112
- 安装: charlesproxy.com 下载并安装
- 拦截: 安装完成后提示授权,点允许,即在打开软件时可以自动拦截所有请求(这个会让 charles 在启动时自动将代理信息注入到系统的代理设置里面)
- 拦截 HTTPS: 菜单项 Proxy -> SSL Proxying Settings -> 启动 SSL Proxying -> Include
  里面新增一个*号(使用*号可以自动解析所有的 https 请求,否则得每个 url 去设置一次)
- 设置根证书: 菜单项 Help -> SSL Proxying -> Install Charles Root Certificate -> Charles
  Proxy-> 双击 -> 点击信任 -> 使用此证书时 -> 始终信息(这个可以避免在代理 https 时会报警告的问题)

**安卓使用**

- 修改网络 -> 高级设置 -> 自动代理 -> https://chls.pro/x.x.x.x.pac
  (这个可以避免切换网络后,每次都要手动的填写代理信息,这样在可以代理的时候走代理,不能连接代理服务器的时候就直接发起请求)

ios 使用

- Mac charls - help - ssl proxing - instll charls root certificate on a mobile device or a remote broswer
- ios - 设置 - 无线局域网 - 当前 iwfi - 配置代理 - 参照上一步配置
- 在 ios 中打开上一步提到的链接 - 下载完成 - 提示在设置中查看
- ios - 设置 - 已下载描述文件 - 安装
- ios - 设置 - 能用 - 关于本机 - 证书信任设置 - 启用刚刚这个证书

### 2. 在公司网络,手机连接 WIFI 是一个子网,而电脑连接 wifi 又是另外一个子网的时候,如何进行代理`

### 业务背景

连接同一个 wifi,电脑显示的 ip 地址是 172.30.86.8 手机显示的 ip 地址是 172.30.80.43 两个网无法互通,就无法使用代理.

### 3. [已解决]如何代理 0.0.0.0/127.0.0.1 上的本机服务(20211214)

#### 问题描述

本机启的服务,都是这样的 IP 地址

但是 charles 受限于系统限制,无法直接拦截代理本机 IP

#### 报错内容

```bash
Charles Error Report
Failed to connect to remote host
Charles failed to connect to the remote host. Check that your Internet connection is ok and that the remote host is accessible. Maybe your network uses a proxy server to access the Internet? You can configure Charles to use an external proxy server in the External Proxy Settings.

The actual exception reported was:

java.net.ConnectException: Connection refused (Connection refused)
Charles Proxy, https://www.charlesproxy.com/
```

#### 问题解决

- 使用官方提供的中转域名http://localhost.charlesproxy.com:port
- 或者使用本机 IP 地址

#### 参考链接

- https://www.charlesproxy.com/documentation/faqs/
