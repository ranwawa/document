### 1.[已解决] 发布 npm 包之前如何自动更新版本号

### 业务背景

才开始自己维护 npm 包,前期需要经常的修改变动,每次变动 publish 到 npm 的时候,都必须要求我修改一下版本号,可是我变动真的太频繁了,每次变动都要手动去修改一下 package.json 里面的 version 字段,着实有点 low.应该会有自动更新版本号的方法

### 问题解决

- 在执行 prepush 钩子的时候
- 先执行 npm version patch
- 然后再执行 npm publish
- 参考网址:
  - https://docs.npmjs.com/cli/version.html

```
// .huskyrc.js
const tasks = arr => arr.join(' && ');
module.exports = {
  'hooks': {
    'pre-push': tasks([
      'npm version patch',
      'npm publish',
    ]),
  },
};
```

### 2. [已解决]初始化安装项目时,老是报这样一个错误 print "%s.%s.%s" % sys.version_info(200204)

### 业务背景

在一个新的项目初始安装时,老是报这样一个错误,遇到好几次了,每次解决都比较快,所以就没专门纪录,这次又遇到了,干脆记一下吧,下次遇到看一眼就搞定,免得再花几分钟去搜索解决方法

**报错内容**

```
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

**解决方法**

- 200204
- 这个一看就和 python 有关
- 往上拉错误日志,会看到最开始是找的 python2.找了 3 次没找到
- 就直接运行的 Python.而我装的 Python 是 3.x 版本的
- 重新安装一个 2.x 版本的即可
  - 注意在安装的过程中,选择自动添加环境变量

### 3. [已解决]发包时提示未登陆(20200302)

### 业务背景

N 久未更新 npm 包了,前几天试着更新到最新版本的,却提示我未登陆..那就登陆吧 npm login,结果又提示我用户已经存在...但是又未发现退出登陆或者删除用户的选项

```
npm ERR! code E409
npm ERR! 409 Conflict - PUT https://registry.npm.taobao.org/-/user/org.couchdb.user:ranwawa - [conflict] User ranwawa already exists
```

### 问题解决

- 20200302
- 在报错的时候,有提示 cnpm 镜像
- 通过 npm config set registry 把路径重新设置为 npm 官方的
- 再重新登陆就好了

```
npm config set registry http://registry.npmjs.org
npm config set registry https://registry.npm.taobao.org
```

## 4. Dependency devdependency peerdependency 之间到底有啥区别?(20210603)

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

## 6. npm 在服务器上执行 install 时报没有合适包的错误(20211214)

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

## 7. [已解决]npm audit 是干什么的(20220416)

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

## 8. mono repo 下安装依赖包的问题(20220416)

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

## 9. [已解决].npmrc 是干什么的(20220418)

### 问题描述

最近看到好几个 github 项目里面都有.npmrc 这个配置文件,到底是干什么用的.要搞清楚

### 问题解决

是什么: npm 的配置文件,类似 git 配置文件一样,分为命令行,全局变量,全局文件...项目配置文件,即这个.npmrc

怎么用: npm config 里面的选项都可以进行设置

有什么用: 目前知道除了初始化时那些默认选项可以用,其他的变量查 config 文档即可

## 10. [已解决]本地执行 npx @ranwawa/branchlint 为什么报错(20220419)

### 问题描述

昨天写了一个包,用来验证分支格式,但发布到 npm 后,用 npx 运行却报错

```bash
npm ERR! could not determine executable to run
```

### 问题解决

参考 eslint,需要在 package 下配置一个 bin 的字段,来指向这个可执行文件.因为 npm 在运行命令时,是运行的 node_modules/.bin 下的命令,而这些命令又是从 bin 这个字段中解析过来的

## 11. [已解决]在 gitlab-ci 上执行 npx @ranwawa/branchlint 失败(20220419)

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
