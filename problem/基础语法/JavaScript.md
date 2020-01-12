## 1. 为什么replace用正则替换失效?
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

## 2.[已解决] Object(obj)是干啥的?(191224)

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
