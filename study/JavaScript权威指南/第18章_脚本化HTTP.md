## 18.1 概述

什么是ajax
- asynchronous javascript and xml
- 通过脚本控制http请求的方法统称为ajax

实现ajax的5种方式
- img元素
- iframe元素
- script元素
- XMLHttpRequest对象
- comet(EventSource)

## 18.2 XMLHttpRequest

什么是XMLHttpRequest
- 是一个对象
- 专门用来处理HTTP相关事务的对象
- 通过对象上的属性和方法来管理HTTP请求

XMLHttpRequest命名存在的问题
- XML: 除XML外还可以处理其他类型的文档,比如HTML,TEXT等
- Http: 除HTTP外,还可以处理HTTPS,甚至是FTP等
- Request: 除请求外,还可以处理响应等整个请求事务

XMLHttpRequest实例的注意事项
- 是浏览器API,而非HTTP的API
- 一个实例就是一条HTTP请求
- 在实例上重新发起请求,会中断之前(挂起)的请求

### 18.2.1 发起请求

发起请求的4个步骤
- 实例化XMLHttpRequest对象
- 创建HTTP链接
- 设置HTTP请求头
- 发送HTTP数据

和请求相关的属性及函数
- open(method, path, ?async, ?username, ?password)
  - method请求方法
  - path请求链接
  - async是否同步
  - username用户名
  - password密码
- setRequestHeader(name, value)
  - name类型
  - value值
- send(?body)
  - body请求主体

哪些请求方法是被禁用的
- connection
- trace
- (track)

哪些请求头是被禁止设置的
- ~~cookie~~(Cookie)
- ~~refer~~(Referer)
- (Content-length等)
  - 完整列表参考: https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name

为什么要禁用这些请求方法和请求头
- 出于安全考虑
- 至于哪个操作会引起哪些安全问题,这个以后如果有缘的话再来研究了

设置请求头的注意事项
- 多次调用setRequestHeader
- 后面的并不会替换前面的值
- 而是为这个头指定多个值

为啥get请求的参数要放到Url的问号后面
- 因为get方法是无副作用的幂等操作
- get方法只有请求头,无法携带请求主体
- 所以相应的参数只能放在url里面

### 18.2.2 处理响应

接受响应的3个步骤
- 添加事件处理函数
- 判断XMLHttpRequest状态
- 判断HTTP状态

和响应有关的属性及函数
- status/~~statusName~~(statusText)
- ~~content-type~~
- (response/responseText/responseXML)
- (getResponseHeader()/getAllResponseHeader())
- (readystatechange事件)
- (readyState状态码)

readyState状态码详解

|状态码|含义|触发事件|
|:-:|:-:|:-:|
|0|~~未启动~~open()未调用||
|1|~~已启动~~open()已调用||
|2|接收头||
|3|接收主体||
|4|已完成||

如何开启同步请求
- 在调用XMLHttpRequest的open方法时
- 第3个参数传入true,即可开启同步请求

同步请求的缺点
- 开启同步请求后,整个线程会被阻塞
- 相当于整个页面在请求回来之前都会卡死

同步请求的应用场景
- 在work里面可以使用同步请求

常见的响应类型及解码方式

|响应类型|取值属性|备注|
|:-:|:-:|:-:|
|text/plain|responseText||
|text/xml,text/html...|responseXml|会自动转换成DOM节点|
|(application/json)|responseText|可通过JSON.parse转码|
|(blob)|response|可通过Blob相关方法来操作|

### 18.2.3 编码主体

常见的请求类型及编码方式

|请求类型|编码格式|备注|
|:-:|:-:|:-:|
|(application/x-www-form-urlencoded)|表单编码|send('name=value&name2=value2')|
|application/json|JSON编码|send(JSON.stringify({}))|
|(ext/plain;charset=UTF-8)|(xml编码)|创建一个XML节点,和HTML节点还是有区别的,见书498|
|(Blob对象的type属性)|文件|直接发送一个Blob实例|
|(multipart/form-data)|多部份主体|FormData实例|

JSON编码和表单编码的异同
- 都会转换成字符串进行传输
- 表单编码会进行urlencoded编码并转换格式
- JSON编码直接调用JSON静态方法即可

### 18.3.4 跨域请求

CORS的几个注意点(cross-origin resource sharing)
- 出于安全原因,open的第4,5个参数即用户名密码不会被传输
- 默认情况下,不会发送token,cookie等头部(除非设置withCredentials属性为true)

为什么XMLHttpRequest会受到跨域限制,而form和iframe不会
- 跨域的目的是限制脚本访问其他域的内容
- XMLHttpRequest的响应内容是在response属性里面,可以直接操作
- 而form/iframe则是单独的限制,无法进行操作

### 18.2.5 HTTP事件

|事件类型|触发时机|备注|
|:-:|:-:|:-:|
|loadstart|send()方法调用时||
|progress|连接建立后每隔50ms|请求快速完成时可能不会触发|
|load|响应完成时|404等也会触发|
|abort|abort()方法调用时||
|timeout|超时未响应时||
|error|连接异常时||
|loadend|上述4个任意完成一个会触发||
|x.upload.onprogress||监听上传进度|

<script async src="//jsfiddle.net/ranwawa/oryp51Lw/33/embed/"></script>

## 18.3 JSONP

什么是JSONP
- 利用script标签发起ajax请求

为什么需要JSONP
- 浏览器有跨域限制
- 而script标签里面的scr链接不受该限制

JSON的工作方式
- script标签添加一个其他域的链接
- 服务端响应一段文本
  - 这个文本必须可以被js解析并执行
  - 即必须返回一个函数或者自执行的函数
- 浏览器接到到响应后,会自动运行响应的js代码

```
<script src="test.html?json=func" />

// 响应的内容
(var a = 1; b = 2; ...)
// 根据请求参数,执行浏览器上的具体函数
func(xxx)
```

## 18.4 comet

这个需要服务配合来测试.现在确实不想去写一个Node服务了..跳过吧暂时

简单测试了一下,创建一个EventSource实例,浏览器直接报错了,因为响应不是text/event-stream类型
