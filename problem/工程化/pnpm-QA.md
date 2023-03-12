# PNPM QA

## 1 无法使用 pnpm 执行 monorepo 中的命令(2023-02-04)

### 问题描述

命令确定是有,能够用 npm 执行,但是无法使用 pnpm 执行

```shell
bash-5.1$ pnpm run docs:dev -w packages/docs/
 ERR_PNPM_NO_SCRIPT  Missing script: docs:dev
bash-5.1$ npm run docs:dev -w ./packages/docs
```

### 问题解决

### 参考链接
