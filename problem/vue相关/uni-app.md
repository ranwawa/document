## 1. :已解决:编译时报错: Error: Cannot find module '@dcloudio/webpack-uni-mp-loader/lib/style.js

### 业务背景

一个开发好的项目,换一台电脑,从 git 上拉下来,install 之后运行,经常会报各种各样的错误

### 问题解决

- 删除掉`package.json.lock`文件
- 然后重新安装

**原因分析**

- 因为`uni-app`版本号是用的\*号,每次安装时都会下载最新的
- 如果之前下载安装过,其他插件都会生成一个固定版本
- 当`uni-app`更新后,其他插件没有更新,就会导致各种错误
- 所以删除掉`lock`文件,全部重新下载.都会是最新的

## 2. :已解决:编译时报错: Error: EBUSY: resource busy or locked, unlink 'E:\h5\zmn-mp\dist\build\mp-alipay\debug.log'

### 业务背景

- 使用`uni-app`开发支付宝小程序
- 在支付宝小程序开发者工具中进行调试

**报错内容**

```
E:\h5\zmn-mp>npm run build:mp-alipay

> c@0.1.0 build:mp-alipay E:\h5\zmn-mp
> cross-env NODE_ENV=production UNI_PLATFORM=mp-alipay vue-cli-service uni-build

当前项目编译模式：非自定义组件模式。编译模式差异见：https://ask.dcloud.net.cn/article/35843

 ERROR  Error: EBUSY: resource busy or locked, unlink 'E:\h5\zmn-mp\dist\build\mp-alipay\debug.log'
Error: EBUSY: resource busy or locked, unlink 'E:\h5\zmn-mp\dist\build\mp-alipay\debug.log'
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! c@0.1.0 build:mp-alipay: `cross-env NODE_ENV=production UNI_PLATFORM=mp-alipay vue-cli-service uni-build`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the c@0.1.0 build:mp-alipay script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\LJ\AppData\Roaming\npm-cache\_logs\2019-07-03T06_48_35_867Z-debug.log
```

**复现步骤**

- build:mp-alipay 打包小程序文件
- 支付宝小程序开发者工具打开编译目录
- 会自动在根目录下生成一个 debug.log
- 再次 build:mp-alipay 就会报错

**问题分析**

- 小程序开发者工具正在使用`debug.log`文件
- 而`build:mp-alipay`的时候会清空整个 dist 目录
- 删除一个正在使用的文件肯定会报错

**临时解决**

- 重新`build`之前
- 先退出支付宝小程序开发者工具
- 等`build`完之后,再打开开发者工具
- 2019-08-25 更新,关闭模拟器面板,然后再编译,编译完之后再打开调试面板也可以

### 问题解决

- 之前不知道是什么原因
- 自己在`webpack`里面添加了`webpackclean`插件(而 uni-app 本身没本配置这个插件)
- 所以每次构建时都会自动清空目录
- 删除这个插件就好了

## 3. :已解决:h5 项目页面白屏,提示网络连接超时

### 业务背景

- 用`uni-app`开发微信公众号
- 偶尔会在线上正式环境遇到这种情况
- 点击刷新之后就好了

**复现步骤**

- 目前还没找到百分百复现的方法
- 以后有空了再专门来测试一下

**问题分析**

- 官网介绍要在`manifest.json`设置 h5.async.timeout 超时时间
- 设置后问题依旧
- 并且不可能是手机网络问题,因为其他网页才能打开

### 问题解决

- 最后发现是因为链接请求出错导致的
- 页面请求的某个 Js 文件在服务器上已经不存在了
- 只是这提示有点...
- 为什么刷新之后又会好呢?这就和公众号的浏览器缓存有关了,在公众号开发中详细记录

## 4. 平台差异代码,持续更新

### 业务背景

在 h5,小程序中,同样的代码,可能效果不一样,所以在开发的时候要避免使用这种兼容性差的语法.只能边踩坑边记录

- 组件`props`不要传递`Function`方法,因为在小程序里面不支持
  - 使用`$emit`事件机制替代

```
<view @click="click"> // => bad

<view @click="$emit('click')"> // => good
props: {
    click: {
        type: Function,
        default: () => (() => {}},
    }
}
```

- `vuex`不能通过`new Vue({ store })`挂载,小程序不支持这种方式
  - 通过`Vue.prototype.$store = store;`挂载`vuex`

```
import store from './store/index';

new Vue({
    store,  // => bad
})
Vue.prototype.$store = store; // => good
```

- 引用的组件上不要使用类名,小程序不支持类穿透到组件根节点
  - 如果要修改组件样式,换成/deep/写法

```
<uni-list class="custom"> // => bad

<uni-list>
/deep/ .uni-list // => good
```

## 5 :已解决:集成`友盟+`统计支付宝小程序找不到`@alipay/af-appx`包的错误(191028)

### 业务背景

- 公司要求,使用`友盟+`统计支付宝小程序流量
- 友盟提供了一个 sdk 叫`umtrack-alipay`
- 这个 sdk 依赖于`@alipay/af-appx`这个包,但是这个包没有随`umtrack-alipay`一起安装,并且在网络上也找不到`@alipay/af-appx`这个包
- 经测试发现,`@alipay/af-appx`是内置在支付宝开发者工具里面的

**存在的问题**

- 在 APP.vue 里面引用`umtrack-alipay`就会报错`@alipay/af-appx`找不到
- 但是同样的代码,在原生支付宝开发者工具里面引用是不会报这个错的

### 问题解决

- 要在打包后的 main.js 里面引入`umtrack-alipay`
- 但是不知道怎么配置 webpack 自动生成,现在是人工粘贴,编译一次粘贴一次.......
- 191028 最新更新,友盟官方包已经更新解决了这个问题

## 6 :已解决:小程序里面开通 js 的 sourcemap 源代码调试功能(191024)

### 业务背景

开发多端应用,在 H5 下面,js 报错点击堆栈行号信息,可以跳转到报错的源代码.但是在小程序里面,代码是压缩后的,根本看不懂.所以想在小程序里面也开启 sourcemap 功能

![](https://user-gold-cdn.xitu.io/2019/10/24/16dfe71fccf9cf50?w=908&h=215&f=png&s=25033)

### 问题解决

- `vue.config`

```
configureWebpack: {
  devtool: 'inline-source-map',
},
```

**原理**

- 之前是 sourcemap,在公众号可以.但是为什么在小程序里面不行呢
- 这两个值有啥区别呢.以后研究 webpack 的时候再来搞吧

## 7 微信小程序在子组件里对孙组件使用/deep/选择器失效(191204)

### 业务背景

在写业务逻辑的时候,经常会在组件里面嵌套另外一个组件,有时候需要调整子组件样式的时候,通过会用到/deep/进行修改.但是在微信小程序里面出现,修改失效的情况.

示例代码
index.vue

```
<rww-list></rww-list>
<style>
/* 下面的代码在微信小程序下,会把每个孙组件都设置成为红色 */
/deep/ .list-item:last-child {
  color: red;
}
</style>
```

list.vue

```
<rww-list-item></rww-list-item>
<rww-list-item></rww-list-item>
<rww-list-item></rww-list-item>
<style>
/* 下面的代码在微信小程序下会失效 */
/deep/ .list-item {
  color: red;
}

</style>
```

item.vue

```
<view class="list-item">
</view>
```

**临时解决**

- 在最顶层的组件里面,通过/deep/可以修改孙组件样式
- 伪类选择器,要直接应用在/deep/选择器上
- 为什么会出现这种的原理待摸索,估计和微信小程序的组件渲染原理有关

## 8 h5 页面发布到服务器子目录下导致静态图片加载失效(20200302)

### 问题描述

- 本地使用/static/logo.png 可以正常加载图片,包括 tab 和文件内都可以
- 发布到服务器上之后链接就失效了

  - 因为整个项目是放在服务器/wxuser/目录下面的
  - 所以要手动改成/wxuser/static/logo.png
  - 但这样一来,本地调试时,图片又会加载失败了

- 看了下 vue-cli 文档,说是配置 vue.config.js 里面的 publicPath,但是未生效

  - 原因是此设置仅针对 index.html 里面的打包出来的 css/js 生效

- 看了下 uni-vue 文档,说是配置 manifest.json 里面的 ht.publicPath,但还是未生效
  - 其原理和 vue.config.js 里面的 publicPath 一样

### 问题解决

- 20200302
- 在 manifest.json 里 h5.router 下面还有一个 base 选项
  - 这个选项是控制页面里面静态资源连接前缀的,包括 page.json 里面的 tabList 里面的图片也是
- 该选项和 h5.publicPath 都设置成/wxuser/即可
