# vue-router QA

## 1 :已解决:router-view 的 v-slot 用法(2022-06-09)

### 问题描述

第一眼在 vue 单文件中看到下面这个代码有点莫名其妙,Component 这个变量是哪儿来的?script 标签中没有对应的引入

```html
<template>
  <a-config-provider :locale="zhCN">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </a-config-provider>
</template>
```

### 问题解决

实际就是 router-view 这个组件暴露出来的一个插槽属性,把组件里面的属性暴露出来给父组件使用

当然接下来还要去看看 router-view 的源码.这块具体怎么实现的

### 参考链接

- [vue 作用域插槽文档](https://vuejs.org/guide/components/slots.html#scoped-slots)
- [vue-router 文档](https://router.vuejs.org/zh/api/#router-view-%E7%9A%84-v-slot)
