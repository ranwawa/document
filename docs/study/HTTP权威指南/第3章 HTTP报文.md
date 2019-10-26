> 第一章从整体上介绍了HTTP的组成部分及大致的工作方式.接下来就是分别介绍各个组成部分,第二章介绍了其中的URL和资源.
而HTTP就是把这些资源变成报文在网上传输的.所以这章就详细的介绍了HTTP报文,包括他是什么,由哪些部分组成,以前各组成部分的详细介绍.
## 3.1 报文流
报文是数据块.在客户端和服务器之间流动的数据块.
### 3.1.1 流入流出
- 向服务器发送数据叫流入
- 向客服端发送数据叫流出
### 3.1.2 上游下游
数据会从发出方流向接收方
- 发送数据的一方是上游
- 接收数据的一方是下游
- 客户端和服务器都可以成为上游/下游

## 3.2 报文的组成部分
报文由3部分: 起始行 + 首部 + 主体
- 起始行是ASCii文本
  - 这就是为什么HEADER头里不能传递汉字的原因
- 主体可以是二进制也可以是文本
### 3.2.1 报文的语法
请求报文
```
<method> <request-url> <version>
<headers>

<entity-body>
```
响应报文
```
<version> <status> <reason-phase>
<headers>

<entity-body>
```
### 3.2.2 起始行
详细介绍了起始行的每个构成要素,基本上是常识了,这里只记2个重点
- 方法里面,除了POST和PUT,其他的都不带请求主体
- 版本号中的数字单独比较,所以1.11比1.2的版本大

### 3.2.3 首部
概要介绍首部的4个组成部分,这个可以参考图解HTTP第6章,这里不做笔记

- 首部延续行
  - 其中提到一个新概念,就是字符串太长需要换行时的处理方式,必须在前面多一个tab制表符
  - 这个有点类似于IDE限制编辑器宽度自动换行的效果

## 3.3 方法
所有方法在图解HTTP中有详细介绍和笔记,这里只记录一些新的概念和之前没搞懂的东西,其余的可参考图解HTTP第2章
### 3.3.1 安全方法
- 像GET/HEAD这类请求就是安全方法
  - 不会产生副作用
  - 请求是幂等的,即不管请求多少次,结果都是一样
- 使用不安全方法时,应该给出警告
  - 比如DELETE
  - 这个可以应用在REST接口的请求基类里面
### 3.3.2  TRACE
这个在图解HTTP里面没有看太明白,这里讲的清楚一些

TRACE请求行程最后一站的服务器,会把请求首部全部返回给客户端.这样客户端就可以分析,服务器收到的请求首部和自己发出的请求首部有哪些不同了.

通过这些东西的学习.觉得REST接口还是有很多好处的
- 可读性更强,方法即代表动作
- 代码更加规范,某种操作能用某种方法
- 有利于封装,根据规范约定的状态码进行响应处理
- 加速,相比POST带主体,很多方法是不需要主体的

### 3.3.9 扩展方法
WebDAV里面的方法就属于扩展方法,但是WebDAV到底是个啥呢.实际中有什么代表性的软件没呢?

## 3.4 状态码
书上介绍的非常详细.也没必要每一个都抄一遍,抄了也记不住.简单的可以参考图解HTTP第4章.完成的可以参考MDN文档
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

### 302,303,307的区别
- 302是HTTP/1.0之前的应用程序使用的
- 303是HTTP/1.1使用的
- 307这个还是没绕明白,应该有了303就没必要要307了嘛

### 3.5 首部
这里只记录各种首部的分类,这里的分类比图解HTTP要详细很多,这样有助于理清思路.具体的首部字段参考图解HTTP第6章
### 3.5.1 通用首部
- 信息性首部
  - Connection
  - Date
  - MIME-Version
  - Trailer
  - Transfer-Encoding
  - Update
  - Via
- 缓存首部
  - Cache-Control
  - Pragma
 ### 3.5.2 请求首部
 - 信息性首部
   - Client-IP
   - From
   - Host
   - Referer
   - UA-Color
   - UA-CPU
   - UA-Disp
   - UA-OS
   - UA-Pixels
   - User-Agent
 - Accept首部
   - Accept
   - Accept-Charset
   - Accept-Encoding
   - Accept-Language
   - TE
 - 条件请求首部
   - Except
   - If-Match
   - If-Modified-Since
   - If-None-Match
   - If-Range
   - If-Unmodified-Since
   - Range
 - 安全请求首部
   - Authorization
   - Cookie
   - Cookie2
 - 代理请求首部
   - Max-Forward
   - Proxy-Authorization
   - Proxy-Connection
  ### 3.5.3 响应首部
  - 信息性首部
    - Age
    - Public
    - Retry-After
    - Server
    - Title
    - Warning
  - 协商首部
    - Accept-Ranges
    - Vary
  - 安全响应首部
    - Proxy-Authenticate
    - Set-Cookie
    - Set-Cookie2
    - WWW-Authenticate
### 3.5.4 实体首部
 - 信息性首部 
   - Allow
   - Location
 - 内容首部
   - Content-Base
   - Content-Encoding
   - Content-Language
   - Content-Length
   - Content-Location
   - Content-MD5
   - Content-Range
   - Content-Type
 - 实体缓存首部
   - ETag
   - Expires
   - Last-Modified