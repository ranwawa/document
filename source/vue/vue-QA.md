# vue-QA

- [1. 源码中的`istanbul`有什么用(20200309)](#1-源码中的istanbul有什么用20200309)
- [2. :已解决:scoped 原理(2022-05-09)](#2-已解决scoped-原理2022-05-09)
- [3. vue3.x + volar + ts + vsocde 在 template 无法进行智能提示(2022-05-23)](#3-vue3x--volar--ts--vsocde-在-template-无法进行智能提示2022-05-23)

## 1 源码中的`istanbul`有什么用(20200309)

### 业务背景

在看 vue 源码时,会看到很多注释,都是以`istanbul`有关,而加这些注释的代码,几乎都是非生产环境下的判断代码,那它到底是干什么 的呢?

简单搜索了一下,这个是和单元测试覆盖率有关的东西,貌似可以把一些非必要的代码,排除在覆盖率测试以外.就像 vue 中那些非生产环境代码,就不用记录在测试范围内了

而且 jest 里面是内置了`istanbul`的,但现在自己只是简单写了一些单元测试,对测试这一套还非常生疏,具体怎么用,还得以后正式在生产中写单元/集成测试后再来学习了

### 参考链接: https://istanbul.js.org/

### 问题解决

## 2 :已解决:scoped 原理(2022-05-09)

### 问题描述

上个月准备面试题目的时候遇到过,只知道是通过给 html 标签以及样式上分别添加一个 hash 值来达到目的,但究竟具体怎么实现的没看过,那就看看 vue-loader 的源码来了解了解

### 问题解决

- 先将单文件转换成针对每个块的多个 import 语句
  - 能知道是否有 scoped 忏悔
- 再将 import 语句转换成 webpack inline 模式的引入语句
  - 生成 scopeId
- 然后再通过底层函数(loader)进行特殊处理
  - 将 scopeId 传给对应 loader 进行处理

### 参考链接

- [编写 loader 官方文档](https://webpack.js.org/contribute/writing-a-loader/#simple)
- [vue-loader 原理官方文档](https://github.com/vuejs/vue-loader#how-it-works)
- [转换单文件中块的底层函数](https://github.com/vuejs/component-compiler-utils)

## 3 vue3.x + volar + ts + vsocde 在 template 无法进行智能提示(2022-05-23)

### 问题描述

示例代码如下

```vue
<template>
  <div>
    <form>
      <label for="name"></label>
      <input type="text" name="name" :value="name2" id="name" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
```

最开始 volar 会在 template 标签上报下面这个错误

```bash
TypeScript intellisense is disabled on template. To enable,
configure `"jsx": "preserve"` in the `"compilerOptions"` property of
tsconfig or jsconfig. To disable this prompt instead,
configure `"experimentalDisableTemplateSupport": true` in `"vueCompilerOptions"`
property.volar
```

可在 tsconfig 中加上了这一句,虽然错误提示消息了,但照样没有智能提示,name2 那个地方应该要报错,但显示的是 any 类型

### 问题解决

### 参考链接
