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
|:-:|:-:|:-:|:-:|:-:|:-:|
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
