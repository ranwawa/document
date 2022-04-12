1. [已解决]`generate`的静态网站,部分页面刷新后报错,导致页面渲染出错
2. `vant`配置服务端渲染时`generate`报错

## 1. [已解决]`generate`的静态网站,部分页面刷新后报错,导致页面渲染出错

**报错内容**

```
1645d405f9402586a824.js:1 Error: [nuxt] Error while mounting app: HierarchyRequestError: Failed to execute 'appendChild' on 'Node': This node type does not support this method.
    at 1645d405f9402586a824.js:1
(anonymous) @ 1645d405f9402586a824.js:1
Promise.catch (async)
(anonymous) @ 1645d405f9402586a824.js:1
96 @ 1645d405f9402586a824.js:1
f @ 5d8c512bf8c4a905d44b.js:1
95 @ 1645d405f9402586a824.js:1
f @ 5d8c512bf8c4a905d44b.js:1
t @ 5d8c512bf8c4a905d44b.js:1
r @ 5d8c512bf8c4a905d44b.js:1
(anonymous) @ 1645d405f9402586a824.js:1
```

**复现步骤**

- 源代码太多,还不好粘贴
- 复现步骤也不好描述
- 以后遇到这种问题应该怎么抽离出来一个最小化的示例代码呢??
- 如果连示例代码都抽不出来
- 解决问题肯定困难

**问题分析**

- 只有几个页面在刷新后会报错
- 其他页面没问题
- 这几个页面和其他几个页面的区别在于
- 都在页面里面`import`了一个`clipboard`插件用于复制
- 会不会是服务端渲染不支持 dom 操作导致的呢?

**我的尝试**

- `nuxt.config.js`里面把打包模式修改成`spa`
- 导致了其他问题,所以排除
- 通过`plugins`的方式引入`clipboard`
- 引入的时候,指定只在客户端引入,即`mode: client`
- 成功解决

**问题原理**

- 肯定和服务端渲染有关系
- 但具体原因不知道

## 2. `vant`配置服务端渲染时`generate`报错

### 业务背景

用`vant`写了一个`wap`端官网，最开始是配置的单页应用模式，即在`nuxt.config.js`中设置`mode: 'spa'`,但是发现，这种配置打包的静态页面也是基于 js 加载的。根本没办法做 seo

所以把`mode`换成了`univeral`，即服务端渲染模式，但是这一搞就不停的报错，都是从 vant 里面报出来的

**报错内容**

```
E:\yeyx-official-site-wap\node_modules\vant\lib\style\base.css:1
(function (exports, require, module, __filename, __dirname) { @-webkit-keyframes van-slide-up-enter{0%{-webkit-transform:translate3d(0,100%,0);transform
:translate3d(0,100%,0)}}@keyframes van-slide-up-enter{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@-webkit-keyframes van
-slide-up-leave{to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes van-slide-up-leave{to{-webkit-transform:translate
3d(0,100%,0);transform:translate3d(0,100%,0)}}@-webkit-keyframes van-slide-down-enter{0%{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(
0,-100%,0)}}@keyframes van-slide-down-enter{0%{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@-webkit-keyframes van-slide-d
own-leave{to{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes van-slide-down-leave{to{-webkit-transform:translate3d
(0,-100%,0);transform:translate3d(0,-100%,0)}

SyntaxError: Invalid or unexpected token
    at new Script (vm.js:86:7)
    at createScript (vm.js:268:10)
    at Object.runInThisContext (vm.js:316:10)
    at Module._compile (internal/modules/cjs/loader.js:860:26)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:947:10)
    at Module.load (internal/modules/cjs/loader.js:790:32)
    at Function.Module._load (internal/modules/cjs/loader.js:703:12)
    at Module.require (internal/modules/cjs/loader.js:830:19)
    at require (internal/modules/cjs/helpers.js:68:18)
    at Object.<anonymous> (E:\yeyx-official-site-wap\node_modules\vant\lib\dialog\style\index.js:1:63)
    at Module._compile (internal/modules/cjs/loader.js:936:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:947:10)
    at Module.load (internal/modules/cjs/loader.js:790:32)
    at Function.Module._load (internal/modules/cjs/loader.js:703:12)
    at Module.require (internal/modules/cjs/loader.js:830:19)
    at require (internal/modules/cjs/helpers.js:68:18)
```

**我的尝试**

- 这个肯定还是和服务端渲染有关，查了下官方 issue，是因为自动导入组件无法支持 Nuxt 的服务端渲染。所以我把`nuxt.config.js`里面的 bable 中有关 vant 配置删掉，再把所有引用组件的地方把成了手动引入 参考：https://github.com/youzan/vant/issues/782
- 但是这样操作后还是报错。。。
