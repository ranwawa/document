## 学习背景
- 上班一年多来
- 各种项目也做了十多个了
- 还原度也还Ok
- 但是当领导要求效果得对标淘宝58一类的
- 心里就没底气啦
- 好吧,从头走一下,把基础再打牢实一点

# 第1章 CSS和文档
## 1.1 Web样式简介
- 1994年,Web开始流行,发布第1个CSS草案
- 1996年,CSS1完成
- 1998年,CSS2定案
- 至今,CSS3开始按照不同的模板规范进行演进

感觉好亲切,都是在我出生后发生的事情,不像物理天文哲学这些,一讲起历史来,都要从几百年前某一个科学家开始,balabalabala.......
## 1.2 元素
### 1.2.1 置换元素和非置换元素
#### 置换元素
  - 元素内容不由文档内容直接表示
  - 如`img`,内容由外部图片表示
 
#### 非置换元素
  - 元素内容在元素自身生成的框中显示.
  - HTML中几乎所有元素都是非转换元素

### 1.2.2 元素的显示方式
#### 块级元素
  - 生成一个`填满` `父元素内容区域`的`框`,旁边不能有其他元素,前后都`断行`

#### 行内元素
  - 在一行文本内生成元素框,不打断所在行

#### 注意
- 块级元素不能出现在行内元素之间
- 曾经在一个pc官网的顶部导航上,把li放在a标签里,导致了浏览器的兼容问题

## 1.3 把CSS应用到HTML上 
### 1.3.1 link标签
- 外部样式表 external stylesheet
- 通过link标签链接的样式表不是HTML文档的一部分.
- 必须放在`head`元素中
```
<link rel="stylesheet" type="text/css" href="sheet1.css" media="all">
```

#### 属性
- rel
  - 和HTML文档的关系
  - relation简称
- type
  - 数据类型
  - 只能写`text/css`
- href
  - 样式表链接地址
  - 可以是相对地址,也可以是绝对地址
- media
  - 媒体描述符
  - media descriptor

#### 候选样式表
- 即rel="alternate stylesheet"
- 不过连`WebKit`内核都不支持,所以就不做笔记了
- 知道有这么个东西即可

### 1.3.2 style元素
- 文档样式表document stylesheet
- 始终以`<style type="text/css">`开头
```
<style type="text/css">
...
</style>
```
### 1.3.3 @import指令
- 放在`style`元素中
- 必须放在其他css规则前
- 可以是相对路径,也可以是绝对路径
```
<style type="text/css">
@import url(sheet2.css) all;
</style>
```
### 1.3.4 HTTP链接
- 即通过服务器端进行设置
- 不过`WebKit`内核不支持,就不记笔记了

### 1.3.5 行内样式
- 除`body`内的元素外,都可以使用
- 但是不建议直接使用`style`属性
```
<p style="color: red;">
```
## 1.4 样式表中的内容
### 1.4.1 不能出现HTML标记
- HTML注释除外
### 1.4.2 规则的结构
- 一个规则 = 选择符 + 声明块
- 一个声明块 = 声明 + 声明 ......
- 一个声明 = 属性 + 值

### 1.4.3 厂商前缀
- 最开始是用来测试新特性
- 后来被滥用又导致了新的兼容性问题
- 2016年开始,浏览器慢慢删除了前缀属性的支持
- 所以可以不用去了解详情了

### 1.4.4 处理空白
- 连续的空白会合并成一个
- 空格,换行符等都会当成空白

### 1.4.5 CSS注释
- `/* */`

## 1.5 媒体查询
### 1.5.1 使用场景
- link元素的media属性
- style元素的media属性
- @import声明的媒体查询符部分
- @media声明的媒体描述符部分

汗,在看这书之前,我都只知道第4种使用方法,如果知道前面2种方法,之前有一个项目会节约相当大一部分时间
### 1.5.3 媒体类型
#### all
- 用于所有媒体
#### print
- 打印时用
#### screen
- 屏幕媒体(显示器)
#### projection
- 幻灯片的形式展示文档?

多个媒体类型使用逗号分隔
```
<link rel="stylesheet" type="text/css" href="sheet.css" media="screen,print">
@import url(sheet.css) screen,print;
@media screent,pring {}
 ```

### 1.5.4 媒体描述符
- 一个媒体描述符 = 一个媒体类型 + 一个或多个媒体特性
- 如果没有媒体类型,就应用到所有媒体上
```
@media all and (min-resolution: 96dpi) {...}
@media (min-resolution: 96dpi)
```
#### 媒体特性间的逻辑关键字
**and**
- 多个同时满足

**not**
- 对整个媒体查询取反
- 只能在媒体查询的开头使用

**逗号 ,**
- 相当于or

**only**
- 在不支持媒体查询的浏览器中隐藏样式表
- 只能用在媒体查询的开头
```
(color) and (orientation: landscape) and (min-device-width: 800px) // 三个条件都得满足
not (color) and (orientation: landscape) // 后面两个的结果进行取反
screen and (max-color:2), screent and (monochrome) // 两种情况满足其一即可
```
### 1.5.5 特性描述符和值的类型
- 啊哦,一共35种
- 在我的开发过程中,只用到过`min-width`和`max-width`,惭愧

### 1.5.6 特性查询
- 当支持某种`CSS`属性时才应用后面的样式
- 是渐进增强样式的完美方式
```
@supports(display: grid) {
    section {
        display: grid;
    }
}
```
## Todo
- 1.2.1 所有置换元素有哪些
- 1.5.3 幻灯片展示这是啥意思
