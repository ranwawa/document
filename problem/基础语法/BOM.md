### 1. [已解决]URLSearchParams是干什么的?(20201008)
**业务背景**

昨天在学习react-router,在涉及到路由传参这一部分,处理querystring参数时,视频课程和官方文档都有提到URLSearchParams
这样一个构造函数.噫,怎么之前木有见过,那必须得了解一下啊

之前处理query参数的时候,要么是用qs,要么是自己手动处理location.search
部分.前一种是方便,但是要额外引入一个包,后一种虽然木有依赖,但写起来还是有点儿小麻烦的,既然原生有函数.那就学一学用起来呗

**问题解决(20201008)**

背景知识拓展之web api
- 浏览器有非常多的api,这些api是根据功能进行划分的
  - 比如有处理svg相关的api一大坨
  - 有处理url的api,而URLSearchParam就是url所有api中的一个
  - 等等

URLSearchParams是什么?
- 专门用来处理url中location.search部分的对象

URLSearchParams有什么用?
- 简化对querystring的相关操作

**示例代码**
<script async src="//jsfiddle.net/ranwawa/d0gck7sj/15/embed/"></script>
