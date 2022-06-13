# JavaScript QA

- [1. [已解决]为什么 replace 用正则替换失效?](#1-已解决为什么-replace-用正则替换失效)
- [2. [已解决]Object(obj)是干啥的?(191224)](#2-已解决objectobj是干啥的191224)
- [3. [已解决]SameValue 和 SameValueZero 是啥及区别(200208)](#3-已解决samevalue-和-samevaluezero-是啥及区别200208)
- [4. [已解决]各种进制的数字前面 2 个分别是啥(200213)](#4-已解决各种进制的数字前面-2-个分别是啥200213)
- [业务背景](#业务背景)
- [5. [已解决]Array 有哪些方法是具有副作用的(20200222)](#5-已解决array-有哪些方法是具有副作用的20200222)
- [6. [已解决]Function.prototype.call.bind 是什么神操作(20200508)](#6-已解决functionprototypecallbind-是什么神操作20200508)
- [7. [已解决]performance 到底怎么用的(20200510)](#7-已解决performance-到底怎么用的20200510)
- [8. performance 的时间差函数,以及正常值 ,以及异常的解决办法(20200511)](#8-performance-的时间差函数以及正常值-以及异常的解决办法20200511)
- [9.[已解决] AMD,CMD,UMD 以及 require.js,common.js,sea.js 之间到底有什么关系及区别?(20200717)](#9已解决-amdcmdumd-以及-requirejscommonjsseajs-之间到底有什么关系及区别20200717)
- [10. [已解决]for 循环各语句执行顺序(2022-04-30)](#10-已解决for-循环各语句执行顺序2022-04-30)

## 1. [已解决]为什么 replace 用正则替换失效?

### 业务背景

- 想把`/pages/order/list?current=1&status=4`转换成`orderList`
- 结果 path2 却等于`orderList?current=1&status=4`

### 示例代码

```javascript
currentTrackEvent(url) {
      // 获取路由中间的那个片段
      let [, path] = url.match(/\/pages\/(.*?)\//);
      // 如果是订单,则取后面两个片段,并转成驼峰命名
      if(path.includes('order')) {
        var path2 = url.replace(/\/pages\/(.*?)\/(.)(.*?)(?=\?)/, function(m, p1, p2, p3) {
          return `${p1}${p2.toUpperCase ()}${p3}`;
        })
      }
      console.log(path2);
}
```

### 问题解决

- 20200222
- 一直以为是正则的问题,结果是掉进坑里了,这个是替换函数嘛,return 回去的并非替换后的字符串

```javascript
url.replace(/\/pages\/(.*?)\/(.)(.*?)(?=\?)/, function (m, p1, p2, p3) {
  path2 = `${p1}${p2.toUpperCase()}${p3}`;
});
```

## 2. [已解决]Object(obj)是干啥的?(191224)

### 业务背景

在看`lodash`的`pick`源码时,发现一个用法,这是啥意思呢?

```javascript
object = Object(object);
```

### 问题解决

- Object 和 new Object 的用法一样
- new Object 的作用是,将指定值转换成包装对象
  - 如果是 undefined/null 则转成空数组
  - 如果是对象就原样返回
  - 如果是原始值,则转换成对应的包装对象
- 这样转换后,就可以保证在后面的语法中正常的使用属性提取运算
  - 避免空指针异常

### 参考网址

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object

## 3. [已解决]SameValue 和 SameValueZero 是啥及区别(200208)

### 业务背景

在 lodash 的一些函数中,总是会提到通过`SameValueZero`进行对比,可业务,比较值一般只用到`===`,所以要把这些基础术语也了解一下

### 问题解决

20220420

SameValue 是 Object.is,和===的区别在于, Object.is(NaN, NaN)为 true, Object.is(0, -0)为 false

SameValueZero 是 includes,Set,Map 的内置比较方法,和 SameValue 的区别在于(new Set().add(0)).has(-0)为 true

### 参考网址

- http://ecma-international.org/ecma-262/6.0/#sec-returnifabrupt
- http://es6.ruanyifeng.com/#docs/spec
- [MDN 文档介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)

## 4. [已解决]各种进制的数字前面 2 个分别是啥(200213)

## 业务背景

昨天在看 lodash 的 toNumber 源码时,里面针对各种字符串形式的 2,8,16 进制数进行了兼容和转换.就想彻底搞清楚,每个进制前面分别是以哪两个字符开头的

### 问题解决

- 200213
- 二进制 0b
- 8 进制 0o
- 16 进制 0x
- 参考
  - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number 最后一个示例

## 5. [已解决]Array 有哪些方法是具有副作用的(20200222)

### 业务背景

虽然每天都在接触 array,但确实无法百分百的肯定,哪些方法是具有副作用的,今天就挨着看一下,整理出来

### 问题解决

- 20200222

|              方法名              |              含义               |                              参数                               |          返回值          | 是否有副作用 |
| :------------------------------: | :-----------------------------: | :-------------------------------------------------------------: | :----------------------: | :----------: |
|           Array.from()           |           浅拷贝数组            |                    arrayLike, mapFn, thisArg                    |          新数组          |
|         Array.isArray()          |         判断是否为数组          |                               obj                               |         Boolean          |
|            Array.of()            |           创建新数组            |                            elementN                             |          新数组          |
|     Array.prototype.concat()     |            合并数组             |                            elementN                             |          新数组          |
|   Array.prototype.copyWithin()   | 将数组的一部分,复制到另一个位置 |                       target, start, end                        |       改变后的数组       |    副作用    |
|    Array.prototype.entries()     |           获取迭代器            |                                                                 |  新的 Array 迭代器对象   |
|     Array.prototype.every()      |         测试每一个元素          |            callback(element, index, array), thisArg             |         Boolean          |
|      Array.prototype.fill()      |        用固定值填充元素         |                        value, start, end                        |       修改后的数组       |    副作用    |
|     Array.prototype.filter()     |          筛选指定元素           |            callback(element, index, array), thisArg             |      新数组或空数组      |
|      Array.prototype.find()      |       筛选第 1 个指定元素       |                              同上                               |   查找结果或 undefined   |
|   Array.prototype.findIndex()    |    筛选第 1 个指定元素的索引    |                              同上                               |         索引或-1         |
|      Array.prototype.flat()      |           扁平化数组            |                              depth                              |          新数组          |
|    Array.prototype.flatMap()     |        扁平化第 1 层数组        |          callback(currentValue, index, array), thisArg          |          新数组          |
|    Array.prototype.forEach()     |            遍历数组             |                              同上                               |        undefined         |
|    Array.prototype.includes()    |          是否包含某值           |                     valueToFind, fromIndex                      |         Boolean          |
|    Array.prototype.indexOf()     |        查找指定值的索引         |                     searchValue, fromIndex                      |         索引或-1         |
|      Array.prototype.join()      |          转换成字符串           |                            separator                            |          String          |
|      Array.prototype.keys()      |            所有索引             |                                                                 |  新的 Array 迭代器对象   |
|  Array.prototype.lastIndexOf()   |   查找指定元素的最后一个索引    |                    searchElement, fromIndex                     |         索引或-1         |
|      Array.prototype.map()       |         遍历并返回数组          |         callback(currentElement, index, array), thisArg         |          新数组          |
|      Array.prototype.pop()       |        删除最后一个元素         |                                                                 |  删除的元素或 undefined  |    副作用    |
|      Array.prototype.push()      |         添加元素到末尾          |                            elementN                             |       新的 length        |    副作用    |
|     Array.prototype.reduce()     |       遍历元素并汇总结果        | callback(accumulator, currentValue, index, array), initialValue |   函数累计器处理的结果   |
|  Array.prototype.reduceRight()   |       从右遍历并汇总结果        |                              同上                               |           同上           |
|    Array.prototype.reverse()     |            反转数组             |                                                                 |       反转后的数组       |    副作用    |
|     Array.prototype.shift()      |         删除第 1 个元素         |                                                                 | 新的 Length 或 undefined |    副作用    |
|     Array.prototype.slice()      |       浅拷贝数组的一部分        |                           start, end                            |         新的数组         |
|      Array.prototype.some()      | 遍历至少一个元素,遇 true 时停止 |            callback(element, index, array), thisArg             |         Boolean          |
|      Array.prototype.sort()      |              排序               |               compareFunction(firstEl, secondEl)                |       排序后的数组       |    副作用    |
|     Array.prototype.splice()     |       删除或替换数组元素        |                    start, deleteCount, itemN                    |   被删除元素组成的数组   |    副作用    |
| Array.prototype.toLocaleString() |        转换成本地字符串         |                        locales, options                         |          String          |
|    Array.prototype.toString()    |          转换成字符串           |                            toString                             |          String          |
|    Array.prototype.unshift()     |         在开头添加元素          |                            elementN                             |       新的 length        |    副作用    |
|     Array.prototype.values()     |         获取所有元素值          |                                                                 |   新的 Array 迭代对象    |

20220420
其实还是没记住,应该用个助记法.[cf 泡泡热死锁死俺]
copyWithin, fill, pop, push, reverse, shift, sort, splice, unshift

## 6. [已解决]Function.prototype.call.bind 是什么神操作(20200508)

### 业务背景

今天在 mdn 上看 slice 这个函数的时候,有一段示例代码,晃眼看去,木有明白其原理

### 示例代码

```javascript
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);
function list() {
  return slice(arguments);
}
var list1 = list(1, 2, 3);
```

### 问题解决

- 20200508
- 实际就是忘记了 bind 的作用了,这个在项目中很少用到,所以容易忘记
  - 参考: https://ranwawa.github.io/document/#/study/JavaScript%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/%E7%AC%AC8%E7%AB%A0_%E5%87%BD%E6%95%B0?id=_874-bind
- slice 就相当于是 unboundSlice.call
- 也就等价于 Array.prototype.slice.call
- 可是为什么要这样做呢?
  - 如果用 slice 的话就省掉了所有的属性提取运算,效率应该高一些吧
  - 实际上木有任何影响,两者的时间都一样

```javascript
var mySlice = Function.prototype.call.bind(Array.prototype.slice);
var list1 = function () {
  Array.prototype.slice.call(arguments);
};
var list2 = function () {
  mySlice(arguments);
};
var num = 123456789;
var list = [1, 2, 3];
console.time('list1');
while (--num) {
  list1(list);
}
console.timeEnd('list1');

var num = 123456789;
console.time('list2');
while (--num) {
  list2(list);
}
console.timeEnd('list2');
```

## 7. [已解决]performance 到底怎么用的(20200510)

### 业务背景

最近看 vue 源码,里面有几个地方都涉及到了 performance,一个是用于性能分析,还有一个是在数据双向绑定的时候,取时间也是取的 performance.now()而不是 Date.now()

在 MDN 上查了一下,就只是介绍这是什么,有哪些属性和方法,但具体怎么用还是糊涂的,需要一个简易的教程上手先

### 问题解决

- 20200511
- 主要就是纪录各个节点的时间
- 通过分析这些时间,来进行相应的优化
- 接下来要实现一个公共方法,来自动算出每节点的时间,以及推荐时间,超出了推荐时间外,就应该给出相应的解决思路

```javascript
const TIMING_NAME = {
  navigationStart: '先取unloadEventEnd,若取fetchStart',
  unloadEventStart: '上个文档卸载开始,若无则0',
  unloadEventEnd: '上个文档卸载结束,若无取0',
  redirectStart: '重定向开始,若无或不同源取0',
  redirectEnd: '重定向结束,若无或不同源取0',
  fetchStart: '准备发起请求,检查应用缓存前',
  domainLookupStart: '域名解析前,若是持久连接或有缓存则取fetchStart',
  domainLookupEnd: '域名解析后,若是持久连接或有缓存则取fetchStart',
  connectStart: '连接开始,若是持久连接,则取fetchStart',
  connectEnd: '握手认证成功,若是持久连接,则取fetchStart',
  secureConnectionStart: '开始https握手,叵是http则取0',
  requestStart: '请求开始',
  responseStart: '开始收到第1个响应,若连接失败且重连,则取requestStart',
  responseEnd: '收到最后1个响应',
  domLoading: '开始解析DOM,readyState=loading时',
  domInteractive: 'DOM结构解析结束,开始加载内嵌资源时,readyState=interactive',
  domContentLoadedEventStart:
    '立即执行脚本已经被解析完毕,即触发DOMContentLoaded事件时',
  domContentLoadedEventEnd: '立即执行脚本已经执行完毕',
  domComplete: '文档解析完成',
  loadEventStart: 'load事件触发时,若未触发取0',
  loadEventEnd: 'load事件结束时,若未触发或未结束取0',
};
const { timing } = performance;
console.log(timing);
const sortTiming = [];
for (let key in timing) {
  typeof timing[key] === 'number' &&
    sortTiming.push({
      time: timing[key],
      name: `${key}-${TIMING_NAME[key]}`,
    });
}
function bubbleSort(arr) {
  arr = arr.slice(0);
  let { length } = arr;
  for (let i = 0; i < length; i++) {
    let lastItem = arr[i];
    for (let j = i + 1; j < length; j++) {
      debugger;
      if (i === j) {
        continue;
      }
      const curItem = arr[j];
      if (curItem.time < lastItem.time) {
        arr[j] = lastItem;
        arr[i] = lastItem = curItem;
      }
    }
  }
  return arr;
}
bubbleSort(sortTiming).forEach((ele) => console.log(ele.time, ele.name));
```

## 8. performance 的时间差函数,以及正常值 ,以及异常的解决办法(20200511)

### 业务背景

完整了看了一下 performance 的文档,结合网上的一些教程,虽然文档是看明白了,但是要想办法应用到生产中,所以必须实现一个函数,把关键节点的时间长度计算出来.

比如连接时间,下载时间,dom 渲染时间等等,这个得结合网页加载那几个考量指标来计算,比如什么白屏时间,渲染时间,用户等待操作时间这些,要好好理出来

然后再找出各个时间的理想值

最后,如果每个时间上出现了异常,则要有对应的可行的解决方法

沉淀方法后,就拿到各个网站上去测试验证,再完善...这个工作应该立马着手做

### 问题解决

- 时间分类

```javascript
function getPerfStats() {
  var timing = performance.timing;
  return {
    dns: timing.domainLookupEnd - timing.domainLookupStart,
    connect: timing.connectEnd - timing.connectStart,
    ttfb: timing.responseStart - timing.connectEnd,
    basePage: timing.responseEnd - timing.responseStart, // 下载时间
    frontEnd: timing.loadEventStart - timing.responseEnd, // 页面渲染时间
  };
}
```

- 统计工具

  - pageSpeed insight https://developers.google.com/speed/pagespeed/insights/

## 9.[已解决] AMD,CMD,UMD 以及 require.js,common.js,sea.js 之间到底有什么关系及区别?(20200717)

### 业务背景

开始学`vue`的时候,在官方文档就有看到各种版本的介绍,当时明显完全是一脸懵逼的状态.后来看了 vue
源码之后才稍等明白了一些细微的差别,但是关于模块化这一坨还完全是混乱的

在今年面试某家公司时,也被问到这个问题,只是大概说出来了有几种模块化方案,分别用在哪个场景.但是具体每个模块的区别在哪里就完全不知道了

这两天在看 typescript 的文档时,又遇到了它.在声明文件中,提到了全局模块,导入模块,UMD
模块.还是搞不清楚他们之间的区别,比如把一个模块放你面前,怎么看出来他是 AMD,CMD 还是 common.js

### 问题解决

- 问题解决
  - 20200717

|   简写   |              全称              |      含义       |            适用场景            |     实现      |                   语法                    |     |     |
| :------: | :----------------------------: | :-------------: | :----------------------------: | :-----------: | :---------------------------------------: | :-: | :-: |
| commonjs |                                |                 |         node,同步加载          |               |                                           |     |     |
|   AMD    | Asynchronous Module Definition |  异步模块加载   |        浏览器,异步加载         |   requireJs   |     define(id? dependencies, factory)     |
|   CMD    |    Common Module Definition    |  通用模块加载   |        浏览器,异步加载         |    sea.js     | define(factory), var a require(./factory) |
|   UMD    |  Universal Module Definition   |  通用模块加载   |    全端,各种模块的兼容写法     |               |   if (typeof define === 'function')...    |
|   EMD    |     ECMA Module Definition     | ES 标准模块加载 | 全端,浏览器是异步,服务端不知道 | export import |

- 参考示例
  - https://www.cnblogs.com/adhehe/p/10182989.html

## 10. [已解决]for 循环各语句执行顺序及作用域(2022-04-30)

### 问题描述

前几天刷牛客网题时遇到这么一个场景.不太确定执行顺序了.再强化强化

### 问题解决

```bash
for ([initialization]; [condition]; [final-expression])
   statement
```

执行顺序:

1. initialization
2. condition
3. statement
4. final-expression

作用域: 块级作用域

### 参考链接

- [MDN for 语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for)

## 11. [已解决]Function 构造函数的用法(2022-04-30)

### 问题描述

之前一直是使用的函数声明或者函数赋值语句.从来没用过 Function 构造函数,碰到题目了还是解不开呀

查了下 MDN 和 eval 语句的用法差不多,只是作用域有所区别

可把示例代码拷贝到浏览器执行却报了个错,这个和内容安全策略有关.不允许执行外部输入的 js 代码.

```bash
Uncaught EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src chrome://resources chrome://test chrome://webui-test 'self'".
```

### 问题解决

就是可以将字符串转换成函数.也可以传递一些外部参数.

应用场景可以是在客户端动态执行服务器下发的一些代码.增加一些灵活性.可以试试小程序中能不能用

### 参考链接

- [Function 类 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)
- [Function 构造函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function)
- [Content Security Policy](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/Content_Security_Policy)

## 12. [已解决]for...in 和 for...of 的区别(2022-04-30)

### 问题描述

忘了为啥会有这个问题,记 todo 里面好久了一直没解决,应该就是记不住到底谁是迭代 key 谁是迭代 value 吧

### 问题解决

|          | 迭代对象 | undefined                      |
| -------- | -------- | ------------------------------ |
| for...in | key      | 正常执行                       |
| for...of | value    | 异常 undefined is not iterable |

for...of 是 es6 的新语法,迭代的实现了生成器的接口的对象,所以才会报错

## 13. [已解决]ASCII 具体是怎么对比大小的?(2022-04-30)

### 问题描述

也是在准备面试题目的时候又遇到了 sort 这个函数.如果不传回调函数,就默认对比元素的 ascii 码

可刚刚又重新看了下 MDN,不是比的 ASCII,而是 UTF-16 代码单元序列值

但还是有必要掌握一下

### 问题解决

一个字节中显示,最高位是空位.一共 128 个字符即 2 的 7 次方

大致的比较规则也是有迹可循, 控制字符<数字<大写<小写

### 参考链接

- [MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/ASCII#%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86)
- [百科介绍](https://baike.baidu.com/item/ASCII/309296?fr=aladdin)

## 14. Content Security Policy 详情(2022-04-30)

### 问题描述

就在问题 12 中发现的,主要是和 web 安全相关.虽然现在不着重于 web 安全,但这个 CSP 是用在 HTML 还是 HTTP 中还是浏览器插件中,得搞清楚.以及具体有哪些值还是要搞清楚的,和安全相关的东西暂不用去深究

## 9. requestAnimationFrame 的用法(20220422)

### 问题描述

前几天在牛客上答题时遇到这个函数,从题目上来看是一个异步函数.从字面来看和动画有关.但具体是什么,有什么应用场景,兼容性怎么样还需要深入了解

后来看了看文档,也没看出个所以然来.必须得手动实现一下才行

### 问题解决

### 参考链接

## 15. UTF-16 代码单元序列详情(2022-04-30)

### 问题描述

在 13 中引出来的问题,其实之前也知道 js 是 unicode 字符编码,也知道 utf-8 和 utf-16.但都是模糊的.这下遇到之后就务必要把你搞清楚

### 问题解决

### 参考链接

## 16. [已解决]??语法(2022-06-12)

### 问题描述

见过几次.老是忘记.也不清楚他是js还是ts的语法.专门来了解下.

### 问题解决

js中的语法,和||给默认值差不多,只是当左侧是null和undefined时才选择右侧的值

### 参考链接

- [mdn官方文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)