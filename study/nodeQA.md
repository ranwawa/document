# node QA

## 1. ESMt 和 commonjs 的冲突(2022-05-04)

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

### 参考链接
