### 1 `vue-router`路由时`params`传递的参数无法获取到值的原理

**业务背景**

- 从一个页面跳转到另外一个页面
- 需要携带很多参数过去

**问题描述**

- 通过`query`传参,`url`后面会跟很长一串,不好看
- 通过`params`传参,在跳转过去的页面无法接收相应的值

**示例代码**

- `a.vue`
```
created() {
    this.$router.push({
        path: '/b',
        params: {
            item: 1
```
- `b.vue`
```
created() {
    console.log(this.$route.params.item) // => undifined
```

**问题解决**
- 使用`params`传值的时候,要把`path`修改成`name`

**原因分析**

### 3. 二维数组,里面数组的某一个元素更新后,高效的响应数据到页面上

**业务背景**

在商城首页一般都有个分类滑动的效果,是一个2维数组的swiper,要做图片占位效果.在某张图片下载完成后,高效的同步数据,而不是刷新整个列表

**效果图**

![](https://user-gold-cdn.xitu.io/2019/10/9/16daf980c5f26909?w=360&h=235&f=gif&s=83758)

### 4. data/computed/props后面的属性能否获取前面的属性值,为什么?

**业务背景**

我居然忘记业务背景了,就纯说技术上的需求吧...能否在data/computed对象里面,属性值互相访问

**演示代码**

https://codesandbox.io/s/computedhedatadeshuxinghuxiangfangwen-nq0r4

**问题解决**
- props/computed里面的属性可以互相访问
- data不行
- 原理需要研究一下源码之后才知道


### TODO
-  `vue-router`路由时`params`传递的参数无法获取到值的原理
