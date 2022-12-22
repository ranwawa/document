# TypeScript QA

- 1. [已解决]如何定义一个类型文件(20200716)
- 2. 如何为一个已经存在的 react function components 添加一个类型声明文件(20210627)
- 3. 联合类型未生效(20210725)
- 4. [已解决]umi 中使用 useLocation().query,ts 在 query 上报 unknown 的错误(20210908)
- 5. [已解决]vue2.x 项目中引入 jest,在\*.test.ts 测试文件中引入\*.vue 报错(20211205)
- 6. [已解决]!.语法(2022-06-12)
- 6. jest 单元测试中 spyon 始终报类型错误(2022-05-16)
- 7. [已解决]引入其他包的时候,不能用.ts 结尾(2022-05-16)
- 8. [已解决]tsc 无法重写 import 中的路径(2022-05-17)
- 9. [已解决]tsc 编译时,引入 lodash 报错(2022-05-17)
- 10. [已解决]cmd 模式下多个文件引入同一个包会报错(2022-05-19)
- 11. [已解决]无法识别 require 引入的包类型(2022-06-15)
- 12. [已解决]引入 qs 报错(2022-11-02)

## 1. [已解决]如何定义一个类型文件(20200716)

### 业务背景

在`vue`里面用`typescript `已经快两个月了,感觉自己现在已经无法回到弱类型的语言了.强类型虽然写的时候麻烦一点,要各种接口类型,但是可以避免很多潜在的错误,
特别是当某个类型发生变化后,所有引用地方如果忘记修改,就会自动报错.在 js 里面就等着 bug 吧

以前经常遇到这种情况,重构了一个函数,引用的地方没有全部改到,就把本来正常的功能改成了不正常了.有了 ts 在这方面就可以避免.

另外,声明了各种类型文件后,就相当于是强制做了很多代码注释,使用的时候,很容易能够看懂代码需要哪些参数,这些参数是干什么的,这个函数有什么用

但是我现在基本是在业务代码文件里面声明的接口.放公共文件里面后其他地方都用不了了,这肯定不科学嘛.很多其他库都有自己专门的类型声明文件,那我的项目肯定也有一个专门的类型声明文件.

比如我在 goods/detail.vue 里面声明了 IGoodsImage 这样一个接口,结果在首页 index/index.vue 里面却用不了

### 问题解决

- 原本以为解决了,但实际上没有解决(20201010)

之前的解决文案是在项目根目录下面写一个 global.d.ts.里面写上 namespace,namespace 下面再写上 interface
.之前的认为是,以 global.d.ts 命名的声明文件,会自动全项目有效,而某个目录下面的 index.d.ts 会在当前目录下有效.并且这个方法
在 vue 项目中一直正常跑着.....可今天,把这个声明文件,复制到 react 项目中,就无法生效了..ide 无法识别,就连 tsc 命令也无法知晓.
so...到底还是没有掌握 d.ts 的操作方法

```typescript
declare namespace uc {
  interface IUniCloud {
    /**
     * 获取数据库实例
     * @param spaceId 同一账号下的，服务空间ID,仅腾讯云支持
     */
    database: (spaceId?: string) => ucDatabase.IDatabase;
  }
}
declare module 'countdown';
```

原因在于,react 项目的 tsconfig 配置文件里面有一个 include 选项,这个选项只指定了 src 目录.而我是把 global.d.ts
放在根目录下面的.所以无法识别.解决方法有 3

- 在 include 里面加上 global.d.ts
- 去掉 include 选项
- 把 global.d.ts 移动到 src 目录下

话说回来.还是木有根本熟悉整个 d.ts 的编写流程.这两天要把官方原版的相关文档过一下.项目里面的 d.ts 就跟着按照官方文档的格式重做一下

## 2. 如何为一个已经存在的 react function components 添加一个类型声明文件(20210627)

### 业务背景

最近在用 umi + ts 重写 partnerportal,里面引用了 lalamove 的 react 组件,但这个组件是用 js 编写的.所以在使用的时候老是报类型错误

比如这个 StyledSelect 组件回调函数,想让它拥有类型,就像 antd 的组件一样

![image-20210626135411357](/Users/ranwawa/Library/Application Support/typora-user-images/image-20210626135411357.png)

![image-20210626135625146](/Users/ranwawa/Library/Application Support/typora-user-images/image-20210626135625146.png)

## 3. 联合类型未生效(20210725)

### 业务背景

在使用 umi-request 的请求拦截器的时候,给 headers 设置一个能用的请求头,居然报异常.但是联合类型,明明就有包含 Record<string, string>,为啥就识别不了呢

自己在 ts 上简化模拟一个,同样报错

### 示例代码

```typescript
declare var Headers: {
  prototype: Headers;
  new (init?: HeadersInit): Headers;
};

type HeadersInit2 = Headers | string[][] | Record<string, string>;

function test(options: HeadersInit2) {
  options.xx = '123';
}
```

但是换成下面这两种写法就 OK 了

```typescript
declare var Headers: {
  prototype: Headers;
  new (init?: HeadersInit): Headers;
};

type HeadersInit2 = Headers & string[][] & Record<string, string>;

function test(options: HeadersInit2) {
  options.xx = '123';
}
```

```
type HeadersInit2 = string | number | boolean;

function test (options: HeadersInit2) {
  options = true;
}
```

## 4. [已解决]umi 中使用 useLocation().query,ts 在 query 上报 unknown 的错误(20210908)

### 业务背景

很早之前就遇到这个问题了,当时为了不影响项目进度,就用了一个@ts-ignore 来忽略这个问题.今天清@ts-ignore 时又遇到了.问题好像出在 react-router 上

### 示例代码

```typescript
import { useLocation } from 'umi';
const location = useLocation();
const query = initState(location.query);
```

**报错信息**

![image-20210908171248699](/Users/ranwawa/Documents/personal/document/problem/%E5%9F%BA%E7%A1%80%E8%AF%AD%E6%B3%95/img/image-20210908171248699.png)

**问题排查**

排查到的类型声明文件如下:

> @types/react-router

```typescript
export function useLocation<S = H.LocationState>(): H.Location<S>;
// H.LocationState就是@types/history中的History.LocationState
// H.Location就是@types/history中的Location
```

> @types/history

```typescript
export namespace History {
  ......
  export type LocationState = unknown;
  export type LocationKey = string
  export type Pathname = string;
  export type Search = string
  export type Hash = string
  ......
}

export interface Location<S = LocationState> {
  pathname: Pathname; // Pathname就是上面的History.Pathname
  search: Search; // 上面的History.Search
  state: S;
  hash: Hash;
  key?: LocationKey | undefined; // 这个LocationKey,就是本文件中的History.LocationKey
}
```

综上,最终 useLocation 返回的是

```typescript
interface {
  pathname: string;
  search: string;
  state: unknown;
  hash: string;
  key?: string | undefined; // 这个LocationKey,就是本文件中的History.LocationKey
}
```

### 问题解决

- 20210908

- umi 是直接导出的 react-router-dom 的 useLocation 定义
- 不存在是很正常的,而 react-router-dom 里面本身就没有 query
- 这是 umi 的一个 bug 而已.要么就用@ts-ignore,要么就换个方法
- 参考: https://github.com/umijs/umi/issues/5278

## 5. [已解决]vue2.x 项目中引入 jest,在\*.test.ts 测试文件中引入\*.vue 报错(20211205)

### 报错内容

```bash
    TypeScript diagnostics (customize using `[jest-config].globals.ts-jest.diagnostics` option):
    src/components/driver-index/components/__tests__/cancel-order-buttons-three.spec.ts:3:37 - error TS2307: Cannot find module '../cancel-order-buttons-three' or its corresponding type declarations.

    3 import CancelOrderButtonsThree from '../cancel-order-buttons-three'
```

### 原因分析

没有类型声明文件,就无法引用

### 问题解决

- 20211205

1. 得自己针对所有 vue 文件声明一个类型声明文件

```typescript
// src/typings/vue-shim.d.ts

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
```

2. 然后让 ts 来加载这个类型声明文件

- 方法 1: 加入新的 type 目录

```json
// tsconfig.json
{
  "compilerOptions": {
    // 一定要保留"./node_modules/@types",否则只会识别./src/typings,导致无法@types类型
    "typeRoots": ["./node_modules/@types", "./src/typings"]
  }
}
```

- 方法 2: 指定项目目录,这样就会自动扫描该目录下所有的 d.ts.和问题 1 一样

```json
{
  "include": ["src"]
}
```

3. 在引入的地方加上.vue 后缀名

```typescript
import CancelOrderButtonsThree from '../cancel-order-buttons-three.vue';
```

## 6. [已解决]!.语法(2022-06-12)

### 问题描述

老是见到`!.`语法,忘记啥意思.记录下

### 问题解决

其实只能算是后置的`!`语法,表示类型断言...肯定前面这个变量不是 null/undefined

### 参考链接

- [typescript 官方文档](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)

## 6. jest 单元测试中 spyon 始终报类型错误(2022-05-16)

### 问题描述

就比较奇怪,为啥会显示类型错误呢

```typescript
// /Users/macbookpro/Documents/Projects/configurations/packages/branchlint/src/index.test.ts

import { cosmiconfigSync } from 'cosmiconfig';

jest.spyOn(cosmiconfigSync, 'search');
```

```bash
No overload matches this call.
  Overload 1 of 4, '(object: (moduleName: string, options?: OptionsSync) => { search: (searchFrom?: string) => { config: any; filepath: string; isEmpty?: boolean; }; readonly load: (filepath: string) => { config: any; filepath: string; isEmpty?: boolean; }; readonly clearLoadCache: () => void; readonly clearSearchCache: () => void; readonly clearCaches: () => void; }, method: never): SpyInstance<...>', gave the following error.
    Argument of type 'string' is not assignable to parameter of type 'never'.
```

### 问题解决

cosmiconfigSync 是一个函数,应该是拦截他的运行结果上的 search 方法,而不是直接拦截这个函数

```typescript
import { cosmiconfigSync } from 'cosmiconfig';
const configSync = cosmiconfigSync();
jest.spyOn(configSync, 'search');
```

最终怎么变成 never 的还要再研究研究

### 参考链接

```typescript
declare function cosmiconfigSync(
  moduleName: string,
  options?: OptionsSync
): {
  readonly search: (searchFrom?: string) => CosmiconfigResult;
  readonly load: (filepath: string) => CosmiconfigResult;
  readonly clearLoadCache: () => void;
  readonly clearSearchCache: () => void;
  readonly clearCaches: () => void;
};

function spyOn<T extends {}, M extends FunctionPropertyNames<Required<T>>>(
  object: T,
  method: M
): Required<T>[M] extends (...args: any[]) => any
  ? SpyInstance<ReturnType<Required<T>[M]>, ArgsType<Required<T>[M]>>
  : never;

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T] &
  string;
```

## 7. [已解决]引入其他包的时候,不能用.ts 结尾(2022-05-16)

### 问题描述

无论是 tsc 直接编译,还是 jest 运行测试用例都会报这个错

```bash
 FAIL  tests/index.test.ts
  ● Test suite failed to run

    src/linter.ts:1:39 - error TS2691: An import path cannot end with a '.ts' extension. Consider importing './config' instead.

    1 import type { IProcessedConfig } from './config.ts';
                                            ~~~~~~~~~~~~~
```

临时解决

- 去掉.ts
- 加上@ts-ignore 注释这个错误

始终还是要 tsc 原生支持最好,但官方说了无法支持

### 问题解决

原因是 tsc 编译之后,import 中的路径并不会被重写.这就导致编译后的 js 文件还在引用 ts 文件而产生报错

所以还是要去掉后缀

下面是编译后的文件,但同目录里面只有 config.js 和 linter.js,所以 runtime 运行时肯定会报错

```javascript
import { Config } from './config.ts';
// @ts-ignore
import { Linter } from './linter.ts';
function getBranchName() {
```

### 参考链接

- [官方 issues](https://github.com/microsoft/TypeScript/issues/27481)

## 8. [已解决]tsc 无法重写 import 中的路径(2022-05-17)

### 问题描述

如问题 7 中描述的.因为 ts 不能加上.ts 后缀,所以去掉了

但是去掉之后,又因为 tsc 不能重写引用路径,所以编译后的 import 语句中没有后缀

这导致 node 直接运行文件会出错,因为在 ESM 模式下,node 不会去推断后缀名,如 node-QA 问题 1 所述

进而导致 npx 运行命令时也同样会找不到引用的问题

### 问题解决

只能把.ts 后缀改成.js 后缀,虽然看起来怪怪的,但是 tsc 还是能够解析的出来

### 参考链接

- [官方 issues](https://github.com/microsoft/TypeScript/issues/16577)

## 9. [已解决]tsc 编译时,引入 lodash 报错(2022-05-17)

### 问题描述

```bash
1 import _ from 'lodash';
         ~

  ../../node_modules/@types/lodash/index.d.ts:26:1
    26 export = _;
       ~~~~~~~~~~~
    This module is declared with using 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag.
```

这是因为 lodash 的 d.ts 文件使用了 ts 独有的模块兼容语法`export=`

这样在 cmd 中就可以直接 require('lodash')了,但反而导致在 esm 中又不能直接使用 default 引入

### 问题解决

- import \* as \_ from 'lodash'; 这种要修改源代码,显示不科学
- 配置 allowSyntheticDefaultImports 为 true,让 ts 自己去兼容

### 参考链接

- [import=语法官方文档](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require)

## 10. [已解决]cmd 模式下多个文件引入同一个包会报错(2022-05-19)

### 问题描述

treelint 项目使用 CMD 模块加载方案.在 index 和 lint 文件中同时引入 path 依赖包.结果两边都报错了

```bash
Cannot redeclare block-scoped variable 'path'.ts(2451)
index.ts(4, 7): 'path' was also declared here.
```

### 问题解决

ts 默认将所有文件放在全局作用域下.除非文件中有顶级的 import 或 export

这就是出错的原因.那就只能手动在每个文件中加这样一条语句了

只是这样看起来怪怪的,在 CMD 模式下又使用了一个 ESM 的语句

简书那个回答说是修改 tsconfig.json.lib 属性的无效.因为 lib 的目的只是为了注入一些全局变量

### 参考链接

- [简书讨论](https://www.jianshu.com/p/78268bd9af0a)
- [github 官方 issue](https://github.com/microsoft/TypeScript/issues/47229)

## 11. [已解决]无法识别 require 引入的包类型(2022-06-15)

### 问题描述

configurations/treelint 项目使用的是 commonjs 模块方案.通过 require 引入 path,无类型提示,但换成 import 之后就有类型提示了

### 问题解决

在 ts 中,即使是 commonjs 规范.也不要使用 require 和 module.exports

得使用 ts 的兼容语法 import = / export =

### 参考链接

- [typescript 官方文档](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require)

## 12. [已解决]引入 qs 报错(2022-11-02)

### 问题描述

之前引入没报错,今天新一起个项目没配置 tsconfig 的情况下报错了

```js
import qs from 'qs';
```

```shell
Module '"/Users/macbookpro/Documents/zmn/zmn/node_modules/@types/qs/index"' can only be default-imported using the 'esModuleInterop' flag

This module is declared with 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.
```

### 问题解决

1. export = xx 只能用 import qs = require(qs)引入

2. 或者在 tsconfig 中配置进行兼容

```json
"compilerOptions": {
    "esModuleInterop": true
  }
```

### 参考链接

- [ts 文档](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require)

## 13. [string, ...number]这种类型怎么声明(2022-11-30)

### 问题描述

数组的第一个元素类型固定,后面统一为一个类型.好像之前在文档上看到过,但是找不到了

### 问题解决

### 参考链接
