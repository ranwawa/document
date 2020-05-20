### 1. [已解决]为什么replace用正则替换失效?
**业务背景**
- 想把`/pages/order/list?current=1&status=4`转换成`orderList`
- 结果path2却等于`orderList?current=1&status=4`
**示例代码**
```
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

**问题解决**
- 20200222
- 一直以为是正则的问题,结果是掉进坑里了,这个是替换函数嘛,return回去的并非替换后的字符串

```
url.replace(/\/pages\/(.*?)\/(.)(.*?)(?=\?)/, function(m, p1, p2, p3) {
          path2 = `${p1}${p2.toUpperCase ()}${p3}`;
        })
```

### 2.[已解决] Object(obj)是干啥的?(191224)

**业务背景**

在看`lodash`的`pick`源码时,发现一个用法,这是啥意思呢?
```javascript
object = Object(object)
```

**问题解决**
- Object和new Object的用法一样
- new Object的作用是,将指定值转换成包装对象
  - 如果是undefined/null则转成空数组
  - 如果是对象就原样返回
  - 如果是原始值,则转换成对应的包装对象
- 这样转换后,就可以保证在后面的语法中正常的使用属性提取运算
  - 避免空指针异常
- 参考网址
  - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object


### 3. SameValue和SameValueZero是啥及区别(200208)

**业务背景**

在lodash的一些函数中,总是会提到通过`SameValueZero`进行对比,可业务,比较值一般只用到`===`,所以要把这些基础术语也了解一下

**参考**
- http://ecma-international.org/ecma-262/6.0/#sec-returnifabrupt
- http://es6.ruanyifeng.com/#docs/spec

### 4. [已解决]各种进制的数字前面2个分别是啥(200213)

**业务背景**

昨天在看lodash的toNumber源码时,里面针对各种字符串形式的2,8,16进制数进行了兼容和转换.就想彻底搞清楚,每个进制前面分别是以哪两个字符开头的


**问题解决**
- 200213
- 二进制 0b
- 8进制 0o
- 16进制 0x
- 参考
  - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number 最后一个示例


### 5. [已解决]Array有哪些方法是具有副作用的(20200222)

**业务背景**

虽然每天都在接触array,但确实无法百分百的肯定,哪些方法是具有副作用的,今天就挨着看一下,整理出来

**问题解决**
- 20200222


|方法名|含义|参数|返回值|是否有副作用|
|:-:|:-:|:-:|:-:|:-:|
|Array.from()| 浅拷贝数组 | arrayLike, mapFn, thisArg | 新数组 |
|Array.isArray()| 判断是否为数组 | obj | Boolean |
|Array.of()| 创建新数组 | elementN | 新数组 |
|Array.prototype.concat()| 合并数组 | elementN | 新数组 |
|Array.prototype.copyWithin()| 将数组的一部分,复制到另一个位置 | target, start, end | 改变后的数组| 副作用 |
|Array.prototype.entries()| 获取迭代器 | | 新的 Array 迭代器对象 |
|Array.prototype.every()| 测试每一个元素 | callback(element, index, array), thisArg | Boolean |
|Array.prototype.fill()| 用固定值填充元素 | value, start, end |修改后的数组 | 副作用 |
|Array.prototype.filter()| 筛选指定元素 | callback(element, index, array), thisArg | 新数组或空数组 |
|Array.prototype.find()| 筛选第1个指定元素 | 同上 | 查找结果或undefined |
|Array.prototype.findIndex()| 筛选第1个指定元素的索引 | 同上 | 索引或-1 |
|Array.prototype.flat()| 扁平化数组 | depth | 新数组 |
|Array.prototype.flatMap()| 扁平化第1层数组 | callback(currentValue, index, array), thisArg | 新数组 |
|Array.prototype.forEach()| 遍历数组 | 同上 | undefined |
|Array.prototype.includes()| 是否包含某值 | valueToFind, fromIndex | Boolean |
|Array.prototype.indexOf()| 查找指定值的索引 | searchValue, fromIndex | 索引或-1 |
|Array.prototype.join()| 转换成字符串 | separator | String |
|Array.prototype.keys()| 所有索引 | | 新的 Array 迭代器对象 |
|Array.prototype.lastIndexOf()| 查找指定元素的最后一个索引 | searchElement, fromIndex| 索引或-1 |
|Array.prototype.map()| 遍历并返回数组 | callback(currentElement, index, array), thisArg| 新数组 |
|Array.prototype.pop()| 删除最后一个元素 | | 删除的元素或undefined | 副作用 |
|Array.prototype.push()| 添加元素到末尾 | elementN | 新的length | 副作用 |
|Array.prototype.reduce()| 遍历元素并汇总结果 | callback(accumulator, currentValue, index, array), initialValue | 函数累计器处理的结果 |
|Array.prototype.reduceRight()| 从右遍历并汇总结果 | 同上 | 同上 |
|Array.prototype.reverse()| 反转数组 | | 反转后的数组 | 副作用 |
|Array.prototype.shift()| 删除第1个元素 | | 新的Length或undefined | 副作用 |
|Array.prototype.slice()| 浅拷贝数组的一部分 | start, end | 新的数组 |
|Array.prototype.some()| 遍历至少一个元素,遇true时停止 | callback(element, index, array), thisArg | Boolean |
|Array.prototype.sort()| 排序 | compareFunction(firstEl, secondEl) | 排序后的数组 | 副作用 |
|Array.prototype.splice()| 删除或替换数组元素 | start, deleteCount, itemN | 被删除元素组成的数组 | 副作用 |
|Array.prototype.toLocaleString()| 转换成本地字符串 | locales, options | String |
|Array.prototype.toString()| 转换成字符串 | toString | String |
|Array.prototype.unshift()| 在开头添加元素 | elementN | 新的length | 副作用 |
|Array.prototype.values()| 获取所有元素值 | | 新的 Array 迭代对象 |

### 6. [已解决]Function.prototype.call.bind是什么神操作(20200508)

**业务背景**

今天在mdn上看slice这个函数的时候,有一段示例代码,晃眼看去,木有明白其原理

**示例代码**

```javascript
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);
function list() {
  return slice(arguments);
}
var list1 = list(1, 2, 3);
```

**问题解决**
- 20200508
- 实际就是忘记了bind的作用了,这个在项目中很少用到,所以容易忘记
  - 参考: https://ranwawa.github.io/document/#/study/JavaScript%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/%E7%AC%AC8%E7%AB%A0_%E5%87%BD%E6%95%B0?id=_874-bind
- slice就相当于是unboundSlice.call
- 也就等价于Array.prototype.slice.call
- 可是为什么要这样做呢?
  - 如果用slice的话就省掉了所有的属性提取运算,效率应该高一些吧
  - 实际上木有任何影响,两者的时间都一样

```javascript
var mySlice = Function.prototype.call.bind(Array.prototype.slice);
var list1 = function() {
  Array.prototype.slice.call(arguments);
}
var list2 = function() {
  mySlice(arguments)
}
var num = 123456789;
var list = [1, 2, 3];
console.time('list1');
while(--num) {
  list1(list);
}
console.timeEnd('list1');


var num = 123456789;
console.time('list2');
while(--num) {
  list2(list);
}
console.timeEnd('list2');
```



### 7. [已解决]performance到底怎么用的(20200510)

**业务背景**

最近看vue源码,里面有几个地方都涉及到了performance,一个是用于性能分析,还有一个是在数据双向绑定的时候,取时间也是取的performance.now()而不是Date.now()

在MDN上查了一下,就只是介绍这是什么,有哪些属性和方法,但具体怎么用还是糊涂的,需要一个简易的教程上手先

**问题解决**
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
  domContentLoadedEventStart: '立即执行脚本已经被解析完毕,即触发DOMContentLoaded事件时',
  domContentLoadedEventEnd: '立即执行脚本已经执行完毕',
  domComplete: '文档解析完成',
  loadEventStart: 'load事件触发时,若未触发取0',
  loadEventEnd: 'load事件结束时,若未触发或未结束取0',
};
const { timing } = performance;
console.log(timing);
const sortTiming = [];
for (let key in timing) {
  typeof timing[key] === 'number' && sortTiming.push({
    time: timing[key],
    name: `${key}-${TIMING_NAME[key]}`
  });
}
function bubbleSort(arr) {
  arr = arr.slice(0);
  let { length } = arr;
  for (let i = 0; i < length; i++) {
    let lastItem = arr[i];
    for (let j = i + 1; j < length; j++) {
      debugger;
      if (i === j) { continue; }
      const curItem = arr[j];
      if (curItem.time < lastItem.time) {
        arr[j] = lastItem;
        arr[i] = lastItem = curItem;
      }
    }
  }
  return arr;
}
bubbleSort(sortTiming).forEach(ele => console.log(ele.time, ele.name));
```


### 8. performance的时间差函数,以及正常值 ,以及异常的解决办法(20200511)

**业务背景**

完整了看了一下performance的文档,结合网上的一些教程,虽然文档是看明白了,但是要想办法应用到生产中,所以必须实现一个函数,把关键节点的时间长度计算出来.

比如连接时间,下载时间,dom渲染时间等等,这个得结合网页加载那几个考量指标来计算,比如什么白屏时间,渲染时间,用户等待操作时间这些,要好好理出来

然后再找出各个时间的理想值

最后,如果每个时间上出现了异常,则要有对应的可行的解决方法

沉淀方法后,就拿到各个网站上去测试验证,再完善...这个工作应该立马着手做

**问题解决**
- 时间分类
```javascript
function getPerfStats() {
  var timing = performance.timing;
  return {
    dns: timing.domainLookupEnd - timing.domainLookupStart,
    connect: timing.connectEnd - timing.connectStart, 
    ttfb: timing.responseStart - timing.connectEnd,
    basePage: timing.responseEnd - timing.responseStart,  // 下载时间
    frontEnd: timing.loadEventStart - timing.responseEnd, // 页面渲染时间
  }
}
```
- 统计工具
  - pageSpeed insight https://developers.google.com/speed/pagespeed/insights/
