# babel QA

## 1. 如何让@babel/preset-env 支持可选链(2022-12-01)

### 问题描述

代码中使用到了`?.`这种语法,但是 babel 不识别.

可以装`babel-plugin-proposal-optional-chaining`这个插件

但插件文档里有说`@babel/preset-env`ES2020 已经默认支持可选链语法

可为什么我的项目里面已经用上了@babel/preset-env,但为什么没生效呢,去哪儿设置这个 ES2020 呢?

### 问题解决

### 参考链接

- [babel-plugin-proposal-optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
