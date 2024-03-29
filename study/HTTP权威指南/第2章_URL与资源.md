# 2 URL 与资源

- [2.1 访问网上的资源](#21-访问网上的资源)
- [2.2 URL 语法](#22-url-语法)
  - [2.2.1 方案](#221-方案)
  - [2.2.2 主机和端口](#222-主机和端口)
  - [2.2.3 用户名密码](#223-用户名密码)
  - [2.2.4 路径](#224-路径)
  - [2.2.5 参数](#225-参数)
  - [2.2.6 查询字符串](#226-查询字符串)
  - [2.2.7 片段](#227-片段)
- [2.3 URL 快捷方式](#23-url-快捷方式)
  - [2.3.1 相对 URL](#231-相对-url)
  - [2.3.2 自动扩展 URL](#232-自动扩展-url)
- [2.4 URL 字符](#24-url-字符)
  - [2.4.1 URL 字符集](#241-url-字符集)
  - [2.4.2 编码机制](#242-编码机制)
  - [2.4.3 字符限制](#243-字符限制)
- [TODO](#todo)
  - [2. [已解决]2.5 参数有啥实际用途?和查询字符串的区别?](#已解决225-参数有啥实际用途和查询字符串的区别)
  - [2. [已解决]4.1 URL 特殊字段在什么情况下会被转义，以及怎么转义(20220406)](#已解决241-url-特殊字段在什么情况下会被转义以及怎么转义20220406)
  - [2.4.2 16 进制编码的原理(20220406)](#242-16-进制编码的原理20220406)

## 2.1 访问网上的资源

URL 就是资源的位置.类似于一个房子的详细地址.有了它,才能找到资源.

## 2.2 URL 语法

一个 URL 由 9 部分组成,但最常用的只有 3 部分.即协议,主机和路径.

### 2.2.1 方案

- 解析 URL 的协议
- 指定应用程序用这种协议来解析 URL
- 由字母开始,不区分大小写
- 分界符是第 1 个`:`
- 默认值是`http`

### 2.2.2 主机和端口

- 主机指明资源在哪台电脑上
- 可以是域名/IP 地址
- 端口指定从哪个地方可以获取这个资源
- 主机和端口之间用`:`隔开
- 端口默认值是 80

### 2.2.3 用户名密码

- 分界符是`@`
- 用户名和密码之间用`:`隔开
- 用户名默认是 anonymous
- 默认密码不同的浏览器不一样

### 2.2.4 路径

- 指明资源在服务器的什么位置
- 分界符是`/`

### 2.2.5 参数

- 跟在路径段后面的键值对
- 提供更多的输入参数
- 分界符是`;`

### 2.2.6 查询字符串

- 跟在路径后面的键值对
- 用来缩小查询范围
- 分界符是`?`

### 2.2.7 片段

- 跟在查询字符串后面的字符串
- 用来表示资源的某一部分
- 分界符是`#`

## 2.3 URL 快捷方式

### 2.3.1 相对 URL

除了完整的输入 URL 外,还可以偷个懒,就是用简写的方式.

浏览器会根据基础 URL 自动拼接绝对 URL.如果没有显示提供基础 URL`<base>`,则会取所属资源的 URL 作为基础 URL

浏览器会根据书上 P36 的算法拼接绝对 URL

> 以前一直以为,只有`./`或者`/`开头的才叫相对 URL,实际上,只要是差了某个 URL 组成部分的 URL 都可以是相对 URL.所以`/news/detail?id=1`可以简写成`?id=1`

### 2.3.2 自动扩展 URL

这个其实就是说的浏览器录自动完成和历史纪录保存功能

## 2.4 URL 字符

**为什么要限制 URL 字符**

- URL 要便于人阅读
  - 空格这些虽然能传输但是肉眼看不到
  - 所以要删除
- URL 要完整包含所有字符
  - 除了安全字母外,还要夹带其他数据才能满足需要
  - 所以需要用到转义
- URL 传输时不能丢失信息
  - 像 SMTP 协议,传输时会丢失信息
  - 所以 URL 只能选最安全的那些字母组成

### 2.4.1 URL 字符集

- 采用 US-ASCii 字符集
  - 因为报文是由 7 位的 2 进制编码,超过 7 位会被丢弃如中文
  - 所以只能选择 ASCii 来,因为他也是 7 位二进制编码
- 其他字符都需要通过转义放进 URL 里面

### 2.4.2 编码机制

- 由`%` + 表示字符的 ASCii 码的十六进数组成

```
~ => %7E
% => %25
```

### 2.4.3 字符限制

有哪些字符需要编码转义呢,就是下面这些,具体的可参考书 P39

- 是保留字,本身用于 URL 指定用途的
- 可能和其他协议产生冲突的
- ASCii 不可打印的区间的
- 十六进制值不在 US-ASCii 范围内的即 >0x7F 的

## TODO

### 2. [已解决]2.5 参数有啥实际用途?和查询字符串的区别?

主要可以用来给每一个路径分配参数。而查询字符串是针对整个 RUL 的

```bash
http://baidu.com/home;param=a/lerning;param=b
```

### 2. [已解决]4.1 URL 特殊字段在什么情况下会被转义，以及怎么转义(20220406)

#### 问题描述

在书上有看到转义是将 ascii 的 16 进制数后两个加上%号组成，想要验证一下,比如`~` -> `%7E`

但在 chrome 浏览器以及 curl 中试了`baidu.com/test~`发现都被没有被转义

#### 问题解决

在书的 2.4.4 有说明

其实规范上并没有强制规定是要 ascii。只是提供了一种编码机制，你可以用也可以不用。

如果不用的话，在某些程序之间传输数据可能会存在问题。

### 2.4.2 16 进制编码的原理(20220406)

#### 问题描述

URL 编码是将特殊字符的十六进制后两位拼上`%`而来，可是特殊字符是怎么转到 16 进制的呢。

在第 12.2.1 中有看到 BASE64 编码，同时也想顺便把这个了解一下。
