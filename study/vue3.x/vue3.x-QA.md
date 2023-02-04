# vue3.x QA

## 1 为什么要使用组合式 api 以及 jsx(2022-05-27)

### 问题描述

这两天练习 vue3.x 的单元测试,在使用组合式 api 和选项 api 的时候遇到一些问题,如果不纪录时间长就忘记了.

把这些总是记录下来,就是只使用组合式 api 的原因

### 问题解决

- 和 react hooks 语法一致,便于快速迁移其他框架
- 选项 api 也是基于组合式 api 构建起来的,所以直接使用更底层的逻辑无论是从性能还是问题排查上都会更方便
- 在 setup 选项函数中无法访问 this,这种同时混合选项 api 和组合 api 的方式不仅麻烦,也容易使人产生混淆
- 其他诸如少打点儿字,ts 支持,ide 性能等看这个[官方文档](https://vuejs.org/api/sfc-script-setup.html)
- options 模式下很多语法糖,才开始真让人摸不着头脑,比如下面示例代码中的 a-config-provider 从哪儿引入的,Component 从哪儿来的

```vue
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'moment/dist/locale/zh-cn';
import moment from 'moment';
import { provide, ref } from 'vue';
import { IDENTIFIER } from '@/config';
import { useStore } from '@/store';
moment.locale('zh-cn');
const isRouteShow = ref(true); //当前路由是否显示
provide('isRouteShow', isRouteShow);
//引入天润js依赖
let script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://ws-bj.clink.cn/clink-client.js?id=' + IDENTIFIER;
document.body.appendChild(script);
const store = useStore();
console.log('页面逻辑');

store.dispatch('user/generateRoutes');
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </a-config-provider>
</template>
```

### 参考链接

- setup() itself does not have access to the component instance - this will have a value of undefined inside setup(). You can access Composition-API-exposed values from Options API, but not the other way around.
- First of all, both API styles are fully capable of covering common use cases. They are different interfaces powered by the exact same underlying system. In fact, the Options API is implemented on top of the Composition API! The fundamental concepts and knowledge about Vue are shared across the two styles.
