# node QA

## 1. [已解决]ESM 和 commonjs 的冲突(2022-05-04)

### 问题描述

使用`zx`开发 branchlint,zx 只支持 import 语法.

```javascript
// index.js
import { $ } from 'zx';
import { Linter } from './linter';
```

然后运行命令`node ./index.js`,会报错,说是 node 不支持 esm

然后参照小程序 QA 第 2 点解决,改后缀名.mjs 或改 package.json.type 或 node 传参

结果在 node ./index.js 或 npx branchlint 时又不能识别`./linter`这种不带后缀格式的

node 可以参照 branchlint.package.json 进行修改,但 npx 没办法

### 问题解决

- 20220517
- 只能在源代码中把.js 后缀给加上了
- lint-staged 源码也是这样处理的

### 参考链接

- [stackoverflow 讨论](https://stackoverflow.com/questions/64242186/node-cant-find-modules-without-js-extension)

## 2. [已解决]require chalk 时提示不支持(2022-05-19)

### 问题描述

由于在 branchlint 项目中使用 ESM 模式,出现很多兼容性问题,为了彻底搞清楚他们之间的区别,所以在 treelint 中使用 CMD 模式

果不其然,又报错了

```bash
const chalk = require('chalk');
              ^

Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/macbookpro/Documents/Projects/configurations/packages/treelint/node_modules/chalk/source/index.js from /Users/macbookpro/Documents/Projects/configurations/packages/treelint/src/index.js not supported.
```

### 问题解决

因为 chalk5.x 使用了 ESM 模式,而 CMD 不支持 ESM 模式,所以报错.

把 chalk 降级到 4.x 就可以了

### 参考链接

- [stackoverflow 讨论](https://stackoverflow.com/questions/70309135/chalk-error-err-require-esm-require-of-es-module)
- [chalk 官方解释](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)
