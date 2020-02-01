## 1. [已解决]伪类选择器无法选中指定元素(190923)
**业务背景**

在flex布局中，想让第一个item左右都有margin，以达到让首行只显示两个item的目的，后续的每行显示3个

**遇到的问题**

不管是设置`first-child`还是`first-of-type`都无法选中第一个item

**源代码**
```
 <!-- 规范化服务 -->
      <section class="standard">
        <!-- 标题 -->
        <div class="section-title">
          <h2>规范化服务标准</h2>
        </div>
        <!-- 服务项 -->
        <div
          class="standard-item"
          style="background-image:url(./images/service/组1959@2x.png);"
        >
          <!-- 上面的小图片 -->
          <img
            class="standard-item-icon"
            src="./images/service/11.png"
          >
          <!-- 下面的描述文字 -->
          <p class="standard-item-txt">上门维修服务标准</p>
        </div>
        <div
          class="standard-item"
          style="background-image:url(./images/service/组1959@2x.png);"
        >
          <img
            class="standard-item-icon"
            src="./images/service/12.png"
          >
          <p class="standard-item-txt">收费标准</p>
        </div>
        <div
          class="standard-item"
          style="background-image:url(./images/service/组1959@2x.png);"
        >
          <img
            class="standard-item-icon"
            src="./images/service/13.png"
          >
          <p class="standard-item-txt">工具服务使用标准</p>
        </div>
        <div
          class="standard-item"
          style="background-image:url(./images/service/组1959@2x.png);"
        >
          <img
            class="standard-item-icon"
            src="./images/service/14.png"
          >
          <p class="standard-item-txt">技术培训考核标准</p>
        </div>
        <!-- 注意最后一个标签需要添加 no-margin类 -->
        <div
          class="standard-item no-margin"
          style="background-image:url(./images/service/组1959@2x.png);"
        >
          <img
            class="standard-item-icon"
            src="./images/service/15.png"
          >
          <p class="standard-item-txt">安全作业标准</p>
        </div>
      </section>
```
```
/* 规范化服务标准 */
.standard {
  display: flex;
  flex-wrap: wrap;
}
.standard .section-title {
  flex: 0 1 100%;
  width: 100%;
}
.standard-item {
  flex: 0 1;
}
.standard-item:nth-child(1) {
  margin: 0 .2rem;
  color: red !important;
}
```

**问题解决**
- 是需要两个条件同时满足才会选中
  - 下标符合
  - 元素(这里匹配的是元素而不是类名)符合
 
**问题分析**
- 父元素下面的第一个元素是`div`所以下标选1的时候一直是选择的它
- 如果把div换成span的话,nth-of-type(1)/first-of-type就可以选中
- 但是它的类名又不吻合，所以一直没效果

## 2. [已解决]父元素的overflow为什么可以清除浮动(190927)

**业务背景**

在写PC页面时,由于要兼容IE老版本,所以很多新的布局方式没法使用,有些地方要用到浮动来布局.但是写完浮动后,后面的元素就会自动沿着这个元素排列,为了解决这个问题,又要多添加一个标签来清除浮动.感觉操作起来就有点不科学了,毕竟HTML结构应该别和CSS样式扯上关系才对,为了样式修改结构,就像是用一个新的问题去解决另外一个老的问题一样

后来看到在父元素上添加overflow:hidden;可以解决这个问题,那是什么原理呢?

//jsfiddle.net/ranwawa/wg0xdzps/embed/result,html,css,js

**问题解决**
- 不仅仅是设置地hidden,除visibility之外的值都可以
- 这样可以把当前元素渲染成单独的一个BFC

**问题分析**
- 和浏览器渲染原理有关,每个BFC是单独的渲染模块,里面的元素的样式只会在当前块内有效,不会影响到外部
- 具体的参考MDN文档  [传送门](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

## 3. [已解决]为什么把img元素设置为块级元素就能清除它与相邻元素的间距(190929)
**业务背景**

在做图文排版的时候,图片总是会和文字,以及图片之间有间隙.原因就是因为图片和文字之间有空白,空白加上字号就有间隙了.所以一般都会把父元素的字号设置为0.这样就可以清除影响了

但有时候发现,宽度百分百的图片,上下有间隙,通过设置图片为block也可以解决

**原因分析**

- 图片默认是行内元素
- 默认是下边和行框的基线对齐
- 而行框的基线要比图片的下边高,所以看上去会有空隙
- 设置父元素字号为0,就把基线拉到底边了
- 设置为块级元素,图片就不参与行对齐了,直接换行,如果没有margin就会挨着

## 4. 为什么元素向右浮动后，前面的兄弟元素没有向右靠

//jsfiddle.net/ranwawa/amtckfo6/embed/result,html,js,css

## 5. rem方案解决移动端适配，为什么设置根接点基础大小为1px无效
**业务背景**

之前解决移动端适配要么是`uni-app`的`upx`;要么是通过`sass`使用`vw`；要么是采用`rem`方案动态调整根节点大小。

在使用`rem`的过程中，无脑照搬别人的解决方案，不依赖于`webpack`的时候，每次在写的时候都要计算一下px到rem的转换值，感觉有点小麻烦。所以就想把基准值调整到1px，就不用再去计算了。试了一下，居然不起作用

**示例代码**

```
(function(){
  var baseWidth = 375;  // 默认屏幕宽度
  var baseFontSize = 1; // 默认根字体大小
  /* 设置根字体大小 */
  var setHtmlFontSize = function () {
      var size= document.documentElement.clientWidth / baseWidth * 1;
      document.documentElement.style.fontSize = size + 'px';
  }

  /* 屏幕尺寸变化时设置根字体大小 */
   window.addEventListener('resize', function(e) {
       var width = document.width
       setHtmlFontSize();
   })
   /* 初始化根字体大小 */
   setHtmlFontSize();
})();
```

**问题解决**

还是只能把根字体大小设置成100，在编写CSS的时候，除100就行了。

**原因分析**

因为`Chrome`限制了最小字号是12px，所以设置1px是无法生效的，当然在移动端上，不同的浏览器也是有不同的限制，所以肯定也无法生效

## 6. [已解决]绝对定位的父元素宽高固定，子元素高度不固定，如何让子元素在父元素中垂直居中，兼容IE老浏览器的写法

**业务背景**

在做PC端网站的时候，要实现垂直居中还真有点儿小麻烦，主要是不能用新的CSS特性，单行的用line-height可以解决，多行的还是试了很多方式才试出来。

//jsfiddle.net/ranwawa/njgxds3b/embed/result,html,js,css
只罗列了兼容老浏览器的写法，新特性没写

**问题解决**
- 通过设置单元格为table-cell
- 然后固定其高就可以了
  - 有点坑的是，table-cell不能设置百分数

更多的可以参考：https://www.jianshu.com/p/0ee2b49dd9d6

![](https://user-gold-cdn.xitu.io/2019/9/26/16d6b7731cb6d974?w=699&h=428&f=png&s=26233)

## 7. [已解决]transform skew取不同的值,到底是朝哪个方向偏?(191111)
**业务背景**

在练习CSS揭秘平行四边形的时候遇到这样一个问题,给skew设置一个值,根本无法预测到它会变成什么样子.所以必须的单独来把它搞透.如果无法预测它会怎么样,就说明没有掌握嘛.总不能每次输入一个值都要去试一试
//jsfiddle.net/ranwawa/Ls5afh83/embed/result,html,js,css

**问题解决**
- 首先要确定的是变换中心点,是50%,50%
- skewX以中心x线为准
  - 正值上面向右,负值下面向右
- skewY以中心y线为准
  - 正值右侧向上,负值左侧向上
  
**原理分析**
- 这个还是和矩阵变换有关
- 其原理是把每一个点进行变化,但怎么变就要用数学公式来算了.确实目前,还是先不深究矩阵了

