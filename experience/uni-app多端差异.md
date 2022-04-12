## 1. 支付宝小程序请求首部字段,在 andorid 下不支持数值型的值(191030)

**运行环境**

- @dcloudio/uni-mp-alipay 0.0.827
- 支付宝开发者工具 0.70.14
- 支付宝 app 10.1.72
- 华为 P10 安卓 9

### 业务背景

手上的业务是基于地理位置的电商应用,所以在每条请求的请求首部都添加了一个 cityId 字段,用于记录地理位置信息.例如

```
header: {
    cityId: 500010
}
```

**兼容问题**

在安卓手机的支付宝里打开小程序,发起请求时,这个`cityId`首部就丢失了.但是在下面的环境正常运行

- 支付宝小程序开发者工具
- 真机支付宝 APP(苹果)
- 真机微信公众号

查看了支付宝小程序官方的文档,明确说明了,请求首部的 key 和 value 只支持字符串类型.参考链接 https://docs.alipay.com/mini/api/owycmh

## 2. 小程序环境 input 不支持 change 事件(191030)

**运行环境**

- @dcloudio/uni-mp-alipay 0.0.827
- 支付宝开发者工具 0.70.14
- 支付宝 app 10.1.72
- 华为 P10 安卓 9

### 业务背景

在做数据统计埋点时,需要统计某些输入框的输入完成事件,所以给需要统计的`input`框添加了`@change`事件,进行事件埋点统计上报.

```
<input type="text" @change="test">
```

**兼容问题**

这个方法在微信公众号里面是 ok 的,但是在支付宝小程序下就没有触发事件.查了一下文档,微信/支付宝/uni-app 在文档里说的 很明确的,只支持一个`@confirm`事件,而没有浏览器原生的 change 事件

## 3.支付宝小程序开发者工具 requestTask 不包含请求相关属性(191108)

**运行环境**

- 支付宝开发者工具 0.70.14

### 业务背景

为了提高性能和避免重复执行公共的响应拦截方法,在同一个页面会同时发起多个请求,如果其中某一个请求失败后,主动中断其他请求.比如在订单列表页面,需要请求订单分类,订单列表,退款原因三个接口,如果因为身份验证失败,导致其中一个请求失败,就中断另外两个请求,避免多次跳转到登陆页面的逻辑.

```
const requestTaskList = [];
const requestTask = uni.request({
  ...,
  fail() => {
    requestTaskList.forEach((ele) => {
      ele.abort();
    })
  }
});
requestTaskList.push(requestTask);
```

**兼容问题**

在公众号(网页)环境下,`requestTaskList`是含有一个`_xhr`属性,包含了链接 ID 等信息,但是在支付宝开发者工具里面却没有这些属性

## 3. input 输入框默认样式不一致(191122)

**运行环境**

- 微信开发者工具 1.02.1910120
- 支付宝开发者工具 0.70.14

### 业务背景

写了一个正常的 input 标签,在微信小程序里面出现了点样式问题,所以想看看在支付宝小程序下面表现怎么样,编译过去后发现,两边的 input 长得完全不一样,支付宝小程序的字要大好多

各开发者工具都给了 input 默认样式,但是相差极大,真机暂时没测

**兼容问题**

- 如果给 input 设置`display: flex;`,微信小程序下会限制 input 框的最大宽度,导致 placeholder 和输入的文本被截断
- 下面的代码是直接从开发者工具拷贝出来的

```
 // 支付宝效果
display:inline-block
background-color:rgb(255, 255, 255)
padding:2px 5px
color:rgb(0, 0, 0)
font-size:17px
height:25px
box-sizing:content-box

// 微信效果
cursor: auto;
display: block;
height: 1.4rem;
text-overflow: clip;
overflow: hidden;
white-space: nowrap;
font-family: UICTFontTextStyleBody;
min-height: 1.4rem;
```

## 4. 微信小程序下组件渲染会多出一个根节点(191122)

**运行环境**

- 同上

### 业务背景

写了一个图标组件,和一行文字并排放在一个 view 下面,给 view flex 布局,然后使用主轴是居中对齐,发现没有对齐.仔细一看,是组件根节点有一个默认高度导致的

即下例中的定位中和 123 在微信小程序中没有垂直居中对齐

### 示例代码

zmn_icon.vue

```
<template>
  <text style="font-size: 8px;">123</text>
</template>
```

index.vue

```
<view style="font-size: 22px; display: flex; align-items: center;">
  定位中
  <zmn-icon />
<view>
```

**兼容问题**

- 微信小程序下会渲染组件名以及一个#开始占位的节点,并且会有影响布局
- 支付宝小程序下正常
