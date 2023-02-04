# npm QA

- 1. :已解决:发布 npm 包之前如何自动更新版本号
- 2. :已解决:初始化安装项目时,老是报这样一个错误 print "%s.%s.%s" % sys.version_info(200204)
- 3. :已解决:发包时提示未登陆(20200302)
- 4. Dependency devdependency peerdependency 之间到底有啥区别?(20210603)
- 5. yarn install --frozen-lockfile 这个参数起什么作用
- 6. npm 在服务器上执行 install 时报没有合适包的错误(20211214)
- 7. :已解决:npm audit 是干什么的(20220416)
- 8. mono repo 下安装依赖包的问题(20220416)
- 9. :已解决:创建一个 npm package.json 模板(2022-05-04)
- 10. :已解决:.npmrc 是干什么的(20220418)
- 11. :已解决:本地执行 npx @ranwawa/branchlint 为什么报错(20220419)
- 12. :已解决:在 gitlab-ci 上执行 npx @ranwawa/branchlint 失败(20220419)
- 10. :已解决:lerna 项目中 chalk 依赖版本异常(2022-05-19)
- 11. npm link 包后,无法自动安装 peerDependencies(2022-05-24)
- 12. :已解决:package.json 中 main,browser 以及 module 等字段的区别(2022-05-27)
- 13. :已解决:publish 到 npm 仓库报 E403(2022-08-02)
- 14. npm install --force 和--legacy-peer-deps 的区别(2022-08-30)
- 15. 安装依赖时如何忽略失败的安装继续安装其他依赖(2022-10-08)
- 16. :已解决: 查看当前包的所有版本(2022-10-08)
- 17. :已解决:package.json 中 zmn: ^9.0.1-ab.5,但实际 npm install 后是安装的 9.0.1(2022-10-26)
- 18. :已解决:axios 在一个项目中能成功运行,但另外一个项目中无法运行(2022-11-20)

## 1. :已解决:发布 npm 包之前如何自动更新版本号

### 业务背景

才开始自己维护 npm 包,前期需要经常的修改变动,每次变动 publish 到 npm 的时候,都必须要求我修改一下版本号,可是我变动真的太频繁了,每次变动都要手动去修改一下 package.json 里面的 version 字段,着实有点 low.应该会有自动更新版本号的方法

### 问题解决

- 在执行 prepush 钩子的时候
- 先执行 npm version patch
- 然后再执行 npm publish
- 参考网址:
  - https://docs.npmjs.com/cli/version.html

```javascript
// .huskyrc.js
const tasks = (arr) => arr.join(' && ');
module.exports = {
  hooks: {
    'pre-push': tasks(['npm version patch', 'npm publish']),
  },
};
```

## 2 :已解决:初始化安装项目时,老是报这样一个错误 print "%s.%s.%s" % sys.version_info(200204)

### 业务背景

在一个新的项目初始安装时,老是报这样一个错误,遇到好几次了,每次解决都比较快,所以就没专门纪录,这次又遇到了,干脆记一下吧,下次遇到看一眼就搞定,免得再花几分钟去搜索解决方法

```bash
gyp verb check python checking for Python executable "python" in the PATH
gyp verb `which` succeeded python C:\Users\Administrator\AppData\Local\Programs\Python\Python37\python.EXE
gyp ERR! configure error
gyp ERR! stack Error: Command failed: C:\Users\Administrator\AppData\Local\Programs\Python\Python37\python.EXE -c import sys; print "%s.%s.%s" % sys.version_info[:3];
gyp ERR! stack   File "<string>", line 1
gyp ERR! stack     import sys; print "%s.%s.%s" % sys.version_info[:3];
gyp ERR! stack                                ^
gyp ERR! stack SyntaxError: invalid syntax
gyp ERR! stack
gyp ERR! stack     at ChildProcess.exithandler (child_process.js:295:12)

```

### 解决方法

- 200204
- 这个一看就和 python 有关
- 往上拉错误日志,会看到最开始是找的 python2.找了 3 次没找到
- 就直接运行的 Python.而我装的 Python 是 3.x 版本的
- 重新安装一个 2.x 版本的即可

  - 注意在安装的过程中,选择自动添加环境变量

- 20220722 更新: mac m1 上无法安装 python,把 node 版本降低到 v14.x 也可以解决这个问题
- 20220901 更新: 这个最终是 node-sass 导致的. node-sass 依赖 node-gyp,而 node-gyp 又依赖于 python.而 node-sass 的版本问题很混乱,和系统以及 node 版本是强关联,具体可以看 node-sass 官方 changelog.最根本的解决办法还是直接使用 dart-sass 替代 node-sass

## 3 :已解决:发包时提示未登陆(20200302)

### 业务背景

N 久未更新 npm 包了,前几天试着更新到最新版本的,却提示我未登陆..那就登陆吧 npm login,结果又提示我用户已经存在...但是又未发现退出登陆或者删除用户的选项

```bash
npm ERR! code E409
npm ERR! 409 Conflict - PUT https://registry.npm.taobao.org/-/user/org.couchdb.user:ranwawa - [conflict] User ranwawa already exists
```

### 问题解决

- 20200302
- 在报错的时候,有提示 cnpm 镜像
- 通过 npm config set registry 把路径重新设置为 npm 官方的
- 再重新登陆就好了

```bash
npm config set registry http://registry.npmjs.org
npm config set registry https://registry.npm.taobao.org
```

## 4 Dependency devdependency peerdependency 之间到底有啥区别?(20210603)

### 业务背景

今天在看香港同事写的 REACT 代码,里面好多没用过的插件.比如`prop-types`,在其 README 文件中发现有专门针对 package 依赖的说明.一直知道运行时依赖和开发依赖有区别,但具体是什么区别却说不清楚.甚至还多出来一个 Peerdependency...

天天打交道的东西,得抽个时间理一理了

### 示例文档

![image-20210603070419476](/Users/ranwawa/Library/Application Support/typora-user-images/image-20210603070419476.png)

## 5. yarn install --frozen-lockfile 这个参数起什么作用

### 业务背景

在 webApp gitlib-ci 的一个 job 里面有这样一段.没太明白具体的意思.

```yaml
test:
  stage: test
  tags:
    - global-ci-k8s
    - stg-cluster
  before_script:
    - yarn install --frozen-lockfil
```

## 6 npm 在服务器上执行 install 时报没有合适包的错误(20211214)

### 问题描述

本地 npm 正常

上传到服务器后就报类似错误

但每次依赖报都不一样

有时候也不报错

### 报错内容

```bash
 npm ERR! code ETARGET
 npm ERR! notarget No matching version found for jest-worker@^27.4.5.
 npm ERR! notarget In most cases you or one of your dependencies are requesting
 npm ERR! notarget a package version that doesn't exist.
 npm ERR! notarget
 npm ERR! notarget It was specified as a dependency of '@jest/reporters'
 npm ERR! notarget
```

## 7 :已解决:npm audit 是干什么的(20220416)

### 问题描述

经常在安装包的时候会出现这个提示,今天又遇到了,本着就近就深的原则.遇到问题就搞清楚他.先记下来,后面安排时间来查

```bash
1 critical severity vulnerability

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
```

```bash
$ npm audit
# npm audit report

minimist  <1.2.6
Severity: critical
Prototype Pollution in minimist - https://github.com/advisories/GHSA-xvch-5gv4-984h
fix available via `npm audit fix`
node_modules/minimist

1 critical severity vulnerability

To address all issues, run:
  npm audit fix
```

### 问题解决

20220418

是什么: 用来分析依赖包的安全漏洞

怎么工作的: 通过将依赖包信息发送到两个专门的网站进行分析

有什么用: 在 ci 节点中,可以对整个 prod 的依赖包扫描一下,以提前查出问题

## 8 mono repo 下安装依赖包的问题(20220416)

### 问题描述

### 背景知识

npm i 会安装哪些文件到 node_modules 目录下:

- 当前目录 packages 的 dependencies
- 当前目录 packages 的 peerDependencies
- 当前目录 packages 的 devDependencies
- 所有依赖包及其子依赖包的 dependencies
- 所有依赖包及其子依赖包的 peerDependencies
- 如果是 monorepo

  - 即使 packages 中没有任何东西,也会安 packages 下面的所有包

## 9 :已解决:创建一个 npm package.json 模板(2022-05-04)

### 问题描述

创建 npm 包有点儿频繁,而 package.json 里面的字段那么多,很多是重复的.干脆就弄个模板吧,自动初始化通用字段,免得一个个复制,还容易搞错

npm init -y 的时候会自动取一些默认配置,但内容还是太少了一点儿,只有下面几个

```bash
npm config set init-author-email "274544338@qq.com"
npm config set init-author-name "ranwawa"
npm config set init-author-url "https://github.com/ranwawa"
npm config set init-license "ISC"
npm config set init-module "~/.npm-init.js"
npm config set init-author-url "https://github.com/ranwawa"
npm config set init-version "0.0.0"
```

## 10 :已解决:.npmrc 是干什么的(20220418)

### 问题描述

最近看到好几个 github 项目里面都有.npmrc 这个配置文件,到底是干什么用的.要搞清楚

### 问题解决

是什么: npm 的配置文件,类似 git 配置文件一样,分为命令行,全局变量,全局文件...项目配置文件,即这个.npmrc

怎么用: npm config 里面的选项都可以进行设置

有什么用: 目前知道除了初始化时那些默认选项可以用,其他的变量查 config 文档即可

## 11 :已解决:本地执行 npx @ranwawa/branchlint 为什么报错(20220419)

### 问题描述

昨天写了一个包,用来验证分支格式,但发布到 npm 后,用 npx 运行却报错

```bash
npm ERR! could not determine executable to run
```

### 问题解决

在用户根目录下面创建一个.npm-init.js 文件,导出一个配对对象,对象里的值会覆盖默认值

```bash
touch ~/.npm-init.js

module.exports = {
  "version": "0.0.1",
  "description": "",
  "keywords": [],
  "main": "",
  "scripts": {},
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ranwawa/configurations.git"
  },
 "bugs": {
    "url": "https://github.com/ranwawa/configurations/issues"
  },
  "homepage": "https://github.com/ranwawa/configurations#readme",
  "author": "ranwawa <274544338@qq.com> (https://github.com/ranwawa)",
  "license": "ISC",
}
```

### 参考链接

- [npm 配置项](https://docs.npmjs.com/cli/v8/using-npm/config#init-author-email)
- [.npm-init.js](https://docs.npmjs.com/creating-a-package-json-file#customizing-the-packagejson-questionnaire)
  参考 eslint,需要在 package 下配置一个 bin 的字段,来指向这个可执行文件.因为 npm 在运行命令时,是运行的 node_modules/.bin 下的命令,而这些命令又是从 bin 这个字段中解析过来的

## 12 :已解决:在 gitlab-ci 上执行 npx @ranwawa/branchlint 失败(20220419)

### 问题描述

本地执行成功之后,想通过 gitlab-ci 来执行.可以报这个错,

```bash
$ npm i
$ npx --no-install @ranwawa/branchlint
node:internal/errors:465
    ErrorCaptureStackTrace(err);
    ^
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/builds/learnin4/configs/node_modules/.bin/src/linter.js' imported from /builds/learnin4/configs/node_modules/.bin/branchlint.mjs
```

检查了下,本地的.bin 目录下没有.js 和.mjs 结尾的 branchlint 文件,只有下面三种形式,eslint 也一样

```bash
branchlint
branchlint.cmd
branchlint.ps1
```

然后替换了一下命令,试试 npx --no-install commitlint --from $COMMON_ANCESTOR 却又能成功执行.

在本地切换了 node 版本和 gitlabci 一致到 v17.9.0.先 npm i 然后再执行却没有报错

删除 package-lock 上传再试,在 ci 中还是报同样的错

仔细看看报错,才发现是 linter 这个引入包没有找到,那就和相对路径有关系.参照 eslint 把入口文件放到 bin/index.js 下面即可,结果相对路径还是去找到根目录下的 node_modules 还是有问题

干脆就不引入文件了,直接把引入的文件放到这个 bin/index.js 里面来.代码少这样做可以,可是代码多的时候,还是要解决根本问题才行呀

### 问题解决

将 branchlint 入口文件放到 bin/index.js,并且移出里面相对路径的引用.根因还是没找到

## 10 :已解决:lerna 项目中 chalk 依赖版本异常(2022-05-19)

### 问题描述

branchlint 包依赖 zx,zx 依赖 5.0.1 版本的 chalk
treelint 包直接依赖 4.1.2 版本的 chalk
无论是在项目根目录下还是 treelint 下执行 npm i
treelint 的 node_modules 都是安装的 5.0.1 版本的 chalk 包
这是为啥

1. 因为 branchlint 在 treelint 前面
2. 先安装 branchlint 依赖
3. branchlint 依赖 zx,zx 依赖 5.0.1
4. 将 5.0.1 安装到 node_modules 根目录
5. 安装 treelint 依赖
6. 正常来说应该要把 4.1.2 安装到 treelint 的 node_modules 里面
7. 可能是 bug 或啥,对 workspaces 支持有问题,导致在 treelint 的 node_modules 下面安装了 5.0.1

上面的推断错了.实际 node_modules 根目录是 4.1.2,只是为什么 treelint 下的又成了 5.0.1 了呢.只能理解成是 npm 的 bug 了

### 问题解决

那就使用别名安装 chalk4.x

```bash
npm install chalk4@npm:chalk@4.1.2
```

### 参考链接

- [npm 官方依赖解析原理](http://npm.github.io/npm-like-im-5/npm3/dependency-resolution.html)
- [npm 别名的用法](https://docs.npmjs.com/cli/v8/commands/npm-install#workspace)

## 11 npm link 包后,无法自动安装 peerDependencies(2022-05-24)

### 问题描述

开发 eslint 公共配置文件.每次修改后要上传到 npm 仓库.再重新下载.相当麻烦.

所以就用 npm link 进行链接

虽然在 plugin-eslint 中修改后,在其他项目可以立即看到效果.但 plugin-eslint 的依赖全部没有安装.导致无法运行

### 问题解决

### 参考链接

- [npm link 官方文档](https://docs.npmjs.com/cli/v8/commands/npm-link#save)
- [node 中的解决办法](https://www.chevtek.io/you-can-finally-npm-link-packages-that-contain-peer-dependencies/)

## 12 :已解决:package.json 中 main,browser 以及 module 等字段的区别(2022-05-27)

### 问题描述

也是前两天在看 VTL 时,里面有提到这几个字段.看上去是不同模块加载方案的实现.看了下 VTL 的源码,它确实也生成了一个 cjs 和 mjs 两个不同的入口文件.那就彻底搞清楚他们是怎么用的吧

### 问题解决

| 字段名   | 作用                                            | 默认值   |
| -------- | ----------------------------------------------- | -------- |
| main     | 指向 cmd 模块或 esm 模块                        | index.js |
| browser  | 指向 esm 模块,如果在 node 环境中引入,会提示报错 |
| module   | deprecated 同上                                 |
| umd:main | deprecated 同上                                 |

文件入口想着字段

| 字段名  | 作用                                   | 默认值         |
| ------- | -------------------------------------- | -------------- |
| files   | 打包时上传哪些文件,可用于优化包大小    | \*             |
| bin     | 可执行文件的名字及路径                 | cli 命令用得着 |
| exports | 可同时定义多个入口文件,优先级大于 main |                |

### 参考链接

- [VTL 文档](https://testing-library.com/docs/dom-testing-library/install/)
- [npm 文档](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#main)
- [node 文件](https://nodejs.org/api/packages.html#packages_conditional_exports)

## 13 :已解决:publish 到 npm 仓库报 E403(2022-08-02)

### 问题描述

```shell
code E403
npm ERR! 403 403 Forbidden - PUT https://registry.npmjs.org/@zmn%2feslint-plugin - Forbidden
npm ERR! 403 In most cases, you or one of your dependencies are requesting
npm ERR! 403 a package version that is forbidden by your security policy, or
npm ERR! 403 on a server you do not have access to.
```

### 问题解决

- 作用域已经被别人注册了....
- 换个名字或者用私有包

### 参考链接

- [csdn 文章](https://blog.csdn.net/example440982/article/details/122100666)

## 14 npm install --force 和--legacy-peer-deps 的区别(2022-08-30)

### 问题描述

最近在使用 npmv7+安装@zmn/eslint-plugin 的时候,总是会报 peerDep 依赖冲突的问题.自己可以将一些不必要的依赖删除掉然后重新安装,但是提供给其他人使用,则会显得比较麻烦

```shell
npm ERR! Could not resolve dependency:
npm ERR! peer @typescript-eslint/eslint-plugin@"^5.31.0" from @zmn/eslint-plugin@0.0.6
npm ERR! node_modules/@zmn/eslint-plugin
npm ERR!   dev @zmn/eslint-plugin@"*" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
```

### 问题解决

- --legacy-peer-deps 参照老的逻辑,不自动安装 peerDep 依赖
- --force 使用一套优先级算法安装,如果算法没算出来就跳过安装

这两种方案都不好.还是要自己解决依赖冲突的问题

### 参考链接

- [官方文档](https://github.com/npm/rfcs/blob/main/implemented/0031-handling-peer-conflicts.md)

## 15 安装依赖时如何忽略失败的安装继续安装其他依赖(2022-10-08)

### 问题描述

package.json 中依赖了私有仓库的包,在公网安装时私有包会报 405 的错误.如何忽略这个错误,继续安装其他外网的依赖呢

比如,内网镜像无法摘取最新的 amis

```shell
npm ERR! code E504
npm ERR! 504 Gateway Time-out - GET https://maven.xiujiadian.com/repository/npm_public/amis/-/amis-2.4.0.tgz
```

### 问题解决

1. 先切到官方镜像源`npm`,把这个包缓存起来.再切回私有镜像源`zmn`安装

```shell
nrm use npm
npm cache amis@latest
npm use zmn
npm i
```

### 参考链接

## 16 :已解决: 查看当前包的所有版本(2022-10-08)

### 问题描述

私有仓库安装amis-core@2.3.0时报 404 错误.应该是私有仓库没有同步元仓库数据导致的,所以想查看下这个包在私有仓库可下载的版本

### 问题解决

npm view amis-core versions

### 参考链接

- [stackoverflow](https://stackoverflow.com/questions/41415945/how-to-list-all-versions-of-an-npm-module)

## 17 :已解决:package.json 中 zmn: ^9.0.1-ab.5,但实际 npm install 后是安装的 9.0.1(2022-10-26)

### 问题描述

如题.

安装成功之后查看 node_modules 里面.实际版本不是想要的 ab.5.并且 node_modules/zmn/package.json 中多了很多下划线开头的字段

### 问题解决

应该和 npm i 的逻辑有关

猜测 npm i 会自动更新`semver range operator`值,就像 npm update 一样.不同的写法,实际更新的不一样

解决 1:

那就精确安装版本.不使用范围操作符

```shell
npm install --save-exact --save-prod --legacy-peer-deps zmn@9.0.1-ab. 5
```

解决 2:

还和 npm 版本有关.本地切换到 node 16 后就不存在这个问题了,但是 node 14 就有这个问题

升级服务器上 node 版本也是可以的

### 参考链接

- [npm update](https://docs.npmjs.com/cli/v8/commands/npm-update)
- [npm version range](https://docs.npmjs.com/about-semantic-versioning)

## 18 :已解决:axios 在一个项目中能成功运行,但另外一个项目中无法运行(2022-11-20)

### 问题描述

使用 ts 开发了一个 sdk,其中引用了 axios,在本地运行正常,但是发布到 npm 后其他项目引用则报了异常

源码

```ts
import axios from 'axios';

axios({});
```

ts 转义成 commonjs 模块,转义后的代码

```js
const axios_1 = require(axios);

axios_1.default({});
```

```shell
axios_1.default is not a function
```

### 问题解决

这是由于 axios package.json 中的配置导致

```json
  "main": "./index.js",
  "exports": {
    ".": {
      "browser": {
        "require": "./dist/node/axios.cjs",
        "default": "./index.js"
      },
      "default": {
        "require": "./dist/node/axios.cjs",
        "default": "./index.js"
      }
    }
  },
```

本地运行时始终是引用的 main 字段对应的入口文件,而发布后其他项目引用的始终是 exports.default.require 字段对应的入口文件

这应该是 node 的 bug,因为规范上说的只要有 exports 就会以 export 为准,但本地开发的时候却并没有这样做

想个办法让开发环境和生产环境引入同一个输出的文件即可

```js
import axios from 'axios/index';
axios({});
```

ts 编译后的代码

```js
const axios_1 = require('axios/index');
axios_1.default({});
```

要查看实际引用的哪个文件,可以在 require 的地方加个 log,webpack 编译之后的路径就是真实的引用路径

```js
var index_1 = __webpack_require__(
  /*! axios/index */ '../gray-ab/node_modules/axios/index.js'
);
console.log('===========');
```

### 参考链接

[node exports 文档](https://nodejs.org/api/packages.html#subpath-exports)

## 19 :已解决:package.json 中的 engines 配置无效(2022-11-27)

### 问题描述

前端时间由于升级了 webpack 打包配置,其中 css-mini 这个插件升级后依赖的最低版本是 14.x node,导致 jenkins 打包时失败,因为在 jenkins 上的 node 版本是 12.x

所以就想在自己的项目里面也限制一下 node 包版本,从而设置了 package.json

```json
{
  "name": "zmn",
  "engines": {
    "node": ">= 14.15.0"
  }
}
```

但这样无论是在当前项目,还是其他项目引用这个包
无论是 16 还是 12 的 node 版本,都没有报版本过低的错
无论是安装还是运行都没有报错,可以正常进行

### 问题解决

原来设置这个不够,还需要在`.npmrc`或者 npm 配置中设置强制使用引擎版本的配置才行

```shell
# .npmrc
engine-strict=true
```

或者

```shell
npm config set engine-strict true
```

### 参考链接

- [npm engins 官方文档](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#engines)
- [stackoverflow 问答](https://stackoverflow.com/questions/29349684/how-can-i-specify-the-required-node-js-version-in-package-json)

## 20 :已解决:解决某个包无法下载的情况(2022-12-17)

### 问题描述

要么是网络问题,在 node_sass 上经常遇到
要么是私有库配置问题,在私有镜像时经常遇到,私有镜像不自动去拉最新的 npm 包

### 问题解决

如果无法下载的是作用域包,则可以在配置文件中配置镜像处理

```shell
@eslint:registry=https://registry.npmjs.org/
@zmn:registry=https://maven.xiujiadian.com/repository/npm_public/
```

如果是一个非作用域包,则可以通过 config 配置镜像

```shell
npm install zmn-ratel-sdk --registry=https://maven.xiujiadian.com/repository/npm_public/
```

### 参考链接
