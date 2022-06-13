# eslint QA

- [1. [已解决]通过 plugin 方式引入配置文件报错(2022-05-24)](#1-已解决通过-plugin-方式引入配置文件报错2022-05-24)
- [2. monorepo + vue + typescript + vscode无法识别.tsx文件(2022-05-29)](#2-monorepo--vue--typescript--vscode无法识别tsx文件2022-05-29)
- [3. [已解决]monorepo中子包中如何引入自己的tsconfig文件(2022-05-29)](#3-已解决monorepo中子包中如何引入自己的tsconfig文件2022-05-29)
- [4. [已解决]引入vue文件报import/unresolved(2022-05-30)](#4-已解决引入vue文件报importunresolved2022-05-30)

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

## 2. monorepo + vue + typescript + vscode无法识别.tsx文件(2022-05-29)

### 问题描述

remote devtool项目

在packages/dashboard中创建一个vue3 ts项目,并且eslintrc中引入@ranwawa/eslint-plugin/vue3x这个配置文件

当前目录下的.ts文件可以正常验证,但是.tsx文件无法正常验证,即eslint根本就不会去验证他

尝试:

1. dashboard中的.vue文件也无法验证
   1. 但在最外层的.tsconfig中加上了include:['**/*.vue']之后即可验证了
2. vite编译时会进行验证
3. 去掉vue-parser后就可以验证.tsx文件了

推测:

- eslint配置文件正常加载了
- tsconfig配置文件正常加载了
- 那就是vue-parser的配置没对

### 问题解决

### 参考链接

## 3. [已解决]monorepo中子包中如何引入自己的tsconfig文件(2022-05-29)

### 问题描述

```javascript
// remote-devtool/packages/dashboard/.eslintrc.js
module.exports = {
  extends: ['plugin:@ranwawa/eslint-plugin/vue3x'],
};
```

实际转换后的.eslintrc.js

```javascript
module.exports = {
  parserOptions: {
    // 这个是指向根目录的tsconfig配置文件
    project: ['./tsconfig.json']
  }
};
```

但是vue项目中使用了ts别名,所以根目录里面配置引用会报错

```javascript
// remote-devtool/packages/dashboard/tsconfig.json
"paths": {
      "@/*": [
        "src/*"
      ]
},
```

如果多个子包都有这种别名的话,那tsconfig文件就只能引入.eslintrc同级的tsconfig配置文件了.这样如何做到

### 问题解决

```javascript
module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
```

packages/dashboard/.eslintrc文件里面加一个root: true,这样就不会继续向上搜索,就用当前这个eslint配置文件

tsconfigRootDir这个字段,用于定位tsconfig配置文件.相当于path.resolve(__dirname, tsconfig.json)

### 参考链接

- [typescript-eslint官方文档](https://typescript-eslint.io/docs/linting/monorepo)
- [typescript-eslint仓库也是monorepo](https://github.com/typescript-eslint/typescript-eslint)

## 4. [已解决]引入vue文件报import/unresolved(2022-05-30)

### 问题描述

在remote-devtool这个项目中,引入一个vue组件就提示下面这个错误.

```vue
<!-- remote-devtool/packages/dashboard/src/App.vue -->
<script setup lang="ts">
import UserName from '@/components/HelloWorld.vue';
</script>
```

```shell
# 报错内容
Unable to resolve path to module '@/components/HelloWorld.vue'.eslint import/no-unresolved
```

创建一个新的vue项目也是同样报错,所以是vue和eslint-plugin-import的兼容问题,import无法识别vue的webpack别名

### 问题解决

安装`eslint-import-resolver-alias`插件,并配置.eslintrc

得注意在monorepo中得用path.resolve定位到当前子包里面

```javascript
settings: {
    'import/resolver': {
      alias: {
        map: [['@', path.resolve(__dirname, './src')]],
      },
    },
  },
```

### 参考链接

- [stackoverflow讨论](https://stackoverflow.com/questions/56190878/eslint-airbnb-base-import-no-unresolved)
- [import resolver官方原理](https://github.com/import-js/eslint-plugin-import/blob/v2.26.0/README.md#resolvers)

## 5. [已解决]vue项目中引入tsx文件报import/extensions(2022-05-31)

### 问题描述

```vue
<!-- /Users/macbookpro/Documents/remote-devtools/packages/dashboard/src/App.vue -->
<script setup lang="ts">
import UserName from '@/components/UserName';
</script>
```

```shell
Missing file extension for "@/components/UserName"eslintimport/extensions
Unable to resolve path to module '@/components/UserName'.eslintimport/no-unresolved
```

ts文件也会报同样的错,但是配置eslint后就可以解决,但是tsx却无法解决

```javascript
settings: {
    'import/resolver': {
      node: { extensions: ['.mjs', '.js', '.json', '.tsx', '.ts'] },
    },
  },
```

### 问题解决

和问题的有关

之所以另外一个ts文件在import.resolver.node中增加了.ts有效,是因为他是相对路径引用,走的是node解析器

而总是中的UserName是另外引用,是走的import.resolver.alias解析器,所以要配置这个解析器的extensions

```javascript
settings: {
    'import/resolver': {
      alias: {
        map: [['@', path.resolve(__dirname, './src')]],
        extensions: ['.tsx', '.vue', '.ts'],
      },
      node: { extensions: ['.mjs', '.js', '.json', '.tsx', '.ts', '.vue'] },
    },
  },
```

### 参考链接