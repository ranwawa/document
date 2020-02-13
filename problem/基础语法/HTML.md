## 1. [已解决]`a`标称`href`值为`javascript:void(0)`的原理(20200212)

**业务背景**

最近又在写静态页面,链接要暂时做个占位,要可以点击,但也别跳转.一直都知道有两种方案
- ####
- javascript:void(0)

之前查过`####`的原理,现在忘记了,javascript这个好像和html里面可以执行javascript代码相关,但也无法详细说出来,干脆趁这个机会就整理一下

**问题解决**
- 20200212
- javascipt:void(0)
  - html嵌入javascript代码有4种方式,其中一种就是通过链接javascript协议.所以这里的javascript:是一个协议
  - void是一个运算符,用于返回undefined.所以这里的void(0)可以换成其他任何表达式比如void(1)或`;`
  - 参考
    - https://ranwawa.github.io/document/#/study/JavaScript%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/%E7%AC%AC13%E7%AB%A0_%E5%AE%A2%E6%88%B7%E7%AB%AFJavaScript?id=_132-%e5%9c%a8html%e9%87%8c%e5%b5%8c%e5%85%a5javascript
    - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void
- ####
  - #后面的是页面标记
  - 浏览器会自动滚动到该标记
  - 如果是一个无意义的标记的话,就不会进行滚动,所以这个###可以换成其他任何值比如#xxxxx,前提是target属性必须是_self
  - 参考
    - https://html.spec.whatwg.org/multipage/browsing-the-web.html#scroll-to-fragid


## 2. [已解决]字体大小导致IDE中的换行会导致最终生成的页面超出固定宽度(20200212)

**业务背景**

在编写固定宽度的HTML代码时,一个父元素宽1200px,3个子元素分别是400px,明明刚刚好,但在网页上却要换行,其原因就是父元素字体大小,而换行符在html里面被解析成了空白,空白在固定字体大小下就有了一定宽度,最终导致换行

现在的解决方案是把父元素的字号设置成0,由于字号是要继承的,所以再挨个把子元素的字号设置回去,但是总这样搞太麻烦了,肯定有更简单的方法

**示例代码**

```html
  <style type="text/css">
    .outer {
      width: 1200px;
    }
    .inner {
      display: inline-block;
      width: 400px;
      outline: 1px solid red;
    }
  </style>
<div class="outer">
  <div class="inner">1</div>
  <div class="inner">2</div>
  <div class="inner">3</div>
</div>
```

**问题解决**
- 20200212
- 子元素全部float起来就行了
- 或者代码输出的时候,通过压缩工具,删除所有的换行符,但这个在静态页面调试的时候需要引入压缩工具有点麻烦了,以后有需要了再研究吧