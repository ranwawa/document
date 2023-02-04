## 1 :已解决:URLSearchParams 是干什么的?(20201008)

### 业务背景

昨天在学习 react-router,在涉及到路由传参这一部分,处理 querystring 参数时,视频课程和官方文档都有提到 URLSearchParams
这样一个构造函数.噫,怎么之前木有见过,那必须得了解一下啊

之前处理 query 参数的时候,要么是用 qs,要么是自己手动处理 location.search
部分.前一种是方便,但是要额外引入一个包,后一种虽然木有依赖,但写起来还是有点儿小麻烦的,既然原生有函数.那就学一学用起来呗

**问题解决(20201008)**

背景知识拓展之 web api

- 浏览器有非常多的 api,这些 api 是根据功能进行划分的
  - 比如有处理 svg 相关的 api 一大坨
  - 有处理 url 的 api,而 URLSearchParam 就是 url 所有 api 中的一个
  - 等等

URLSearchParams 是什么?

- 专门用来处理 url 中 location.search 部分的对象

URLSearchParams 有什么用?

- 简化对 querystring 的相关操作

### 示例代码

<script async src="//jsfiddle.net/ranwawa/d0gck7sj/15/embed/"></script>
