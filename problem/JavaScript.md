1. 为什么replace用正则替换失效?

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
