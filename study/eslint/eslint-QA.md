# eslint QA

## 1. [已解决]通过 plugin 方式引入配置文件报错(2022-05-24)

### 问题描述

之前提供公共的 eslint 配置文件是通过 extend 继承一个在 npm 包上的配置文件. base/vue/react/node.这样分别要发布 4 个 npm 包,如果涉及到修改内容,4 个都得修改,比较麻烦

后来看到 vue 的 eslint 插件直接提供了配置文件可以进行继承,就仿照了这种方式. plugin:vue/recommend

我的 plugin 目录结构是下面这样的

```bash
configs
  base.js
	vue.js
	react.js
	node.js
index.js
```

index.js 代码如下

```javascript
const base = require('./configs/base');
const vue = require('./configs/vue');
const react = require('./configs/react');
const node = require('./configs/node');

module.exports = {
  configs: {
    base,
    vue,
    react,
    node,
  },
};
```

base.js 代码如下

```javascript
module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'eslint-config-airbnb',
    'airbnb-typescript/base',
    'plugin:eslint-plugin-prettier/recommended',
    'plugin:eslint-plugin-sonarjs/recommended',
  ],
  plugins: ['eslint-plugin-sonarjs', 'eslint-plugin-prettier'],
  rules: {
```

vue.js 代码如下

```javascript
module.exports = {
  extends: [
    'plugin:eslint-plugin-vue/vue3-recommended',
    'plugin:eslint-plugin-vue/recommended', // Vue.js 2.x.
    require.resolve('./base'),
  ],
  plugins: ['eslint-plugin-vue'],
};
```

可是在运行 npm run serve 时却报错,说是 eslint-plugin-prettier 找不到.查看了 node_modules 里面确实存在呀.就很神奇了

```bash
ERROR in Failed to load plugin 'eslint-plugin-prettier' declared in '.eslintrc » plugin:@ranwawa/vue » /Users/macbookpro/Documents/Projects/test-FE-react/node_modules/@ranwawa/eslint-plugin/configs/base.js': Cannot find module 'eslint-plugin-prettier'
Require stack:
- /Users/macbookpro/Documents/Projects/test-FE-react/__placeholder__.js
Referenced from: /Users/macbookpro/Documents/Projects/test-FE-react/node_modules/@ranwawa/eslint-plugin/configs/base.js
```

啊哦.刚刚再看了一下,确实没有 eslint-plugin-prettier.只有一个 eslint-config-prettier

可是不科学嘛,这些插件全是放在 peerDependencies 里面的,应该会自动安装到同级目录里呀.为 npm i 的时候没有自动安装

### 问题解决

好吧,这是 vue 的锅.vue 的 eslint 插件自动在 package.json 里面创建了一个 eslint 字段,来进行配置,所以 eslint 加载的时候根本就没加载配置文件中的信息.干掉就好了

话说回来,eslint 官方介绍的 package.json 中的优先级最低呀.为啥 vue 优先取了它

### 参考链接

- [eslint 官方文档配置文件优先级说明](https://eslint.org/docs/user-guide/configuring/configuration-files#configuration-file-formats)
