# VITE QA

- 1 :已解决: 在 monorepo 中第一次运行 vite 时异常(2023-02-01)

## 1 :已解决: 在 monorepo 中第一次运行 vite 时异常(2023-02-01)

### 问题描述

正如官网所说,第一次运行 vite 时会分析所有依赖,将非 ESM 转换成 ESM.

但官网又说,会忽略掉 node_modules

运行命令

```shell
npm run test2-vite:mac -w packages/amis-demo
```

报错内容

```shell
[vite] dependency @babel/runtime declares non-existent entry file /Users/macbookpro/Documents/zmn/zmn/node_modules/@babel/runtime/index.js.
[vite] Optimizable dependencies detected:
@zmn/gray-ab, amis, antd, copy-to-clipboard, cross-env, dotenv-expand, js-sls-logger, lodash, process, react, react-dom, react-hot-loader, react-router-cache-route, react-router-dom, styled-components, zmn

[vite] Dep optimization failed with error:
Could not load path (imported by ../../node_modules/cross-env/src/command.js): ENOENT: no such file or directory, open 'path'
[Error: Could not load path (imported by ../../node_modules/cross-env/src/command.js): ENOENT: no such file or directory, open 'path'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'path',
  watchFiles: [
		...
```

### 问题解决

是由于在初始分析时分析了 cross-env,这个包里面又引用了 path,但是 path 又不存在导致的.

- vite.config.js.optimizeDeps.exclude 中忽略掉 cross-env
- 将 cross-env 从 dep 移到 devDep(估计是如果没有 html 文件,就会默认分析这些包)

....呃结果是 vite 版本引起的.是 1.0.0 的版本,升级版本就好了

### 参考链接
