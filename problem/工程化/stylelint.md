## 1 :已解决:安装完依赖后执行命令报语法错误(20211209)

根据官网一步一步安装 scss 插件,居然无法格式化

出现问题后,就去网络上搜索..但是几乎没有这种问题

后来点进代码一看,发现是没有 postcss

以后类似问题,自己先看一下报错代码追一下 stack.

搞不定再去搜索,这样会快一些

**报错代码**

```bash
TypeError: Class extends value undefined is not a constructor or null
    at Object.<anonymous> (/Users/ranwawa/Documents/project/hll-uappweb-uapp/node_modules/postcss-scss/lib/nested-declaration.js:3:33)
    at Module._compile (/Users/ranwawa/Documents/project/hll-uappweb-uapp/node_modules/v8-compile-cache/v8-compile-cache.js:192:30)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:1005:19)
    at require (/Users/ranwawa/Documents/project/hll-uappweb-uapp/node_modules/v8-compile-cache/v8-compile-cache.js:159:20)
    at Object.<anonymous> (/Users/ranwawa/Documents/project/hll-uappweb-uapp/node_modules/postcss-scss/lib/scss-parser.js:4:25)
    at Module._compile (/Users/ranwawa/Documents/project/hll-uappweb-uapp/node_modules/v8-compile-cache/v8-compile-cache.js:192:30)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
```

### 问题解决

- 20211209
- 点进报错里面看一下,是因为没有安装 postcss 导致的,安装即可

## 2 :已解决:无法格式化.vue 文件(20211209)

验证 css 和 scss 没问题了,但是无法验证 vue

**报错内容**

```bash
src/app.vue
 16:10  ✖  Unknown word  CssSyntaxError
```

### 问题解决

- 20211209
- 其实就是无法识别 Html 格式的文件,需要单独的一个语法编译器
- 修改配置文件添加 overrides,并安装 post-html 依赖

```
"overrides": [
    {
      "files": ["*.vue", "**/*.vue"],
      "customSyntax": "postcss-html",
    },
  ],
```

## 3 vue 文件自动修复无效(20211209)

vue 可以正常检查了.

加了--fix 参数,错误消息

但是 vue 文件实际没有变化

**日志**

```
ranwawa:hll-uappweb-uapp ranwawa$ npx stylelint src/app.vue

src/app.vue
 144:1  ✖  Expected "#app" to have no more than 0 ID selectors  selector-max-id
 146:3  ✖  Expected font-family to come before height           order/properties-alphabetical-order
 152:3  ✖  Expected box-sizing to come before position          order/properties-alphabetical-order
 154:3  ✖  Expected transition to come before width             order/properties-alphabetical-order

ranwawa:hll-uappweb-uapp ranwawa$ npx stylelint src/app.vue --fix

src/app.vue
 144:1  ✖  Expected "#app" to have no more than 0 ID selectors  selector-max-id

ranwawa:hll-uappweb-uapp ranwawa$
```
