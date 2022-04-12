### [已解决] 1. 如何定义一个类型文件(20200716)

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

### 3. 联合类型未生效(20210725)

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

### 4. [已解决]umi 中使用 useLocation().query,ts 在 query 上报 unknown 的错误(20210908)

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

### 5. [已解决]vue2.x 项目中引入 jest,在\*.test.ts 测试文件中引入\*.vue 报错(20211205)

**报错内容**

```bash
    TypeScript diagnostics (customize using `[jest-config].globals.ts-jest.diagnostics` option):
    src/components/driver-index/components/__tests__/cancel-order-buttons-three.spec.ts:3:37 - error TS2307: Cannot find module '../cancel-order-buttons-three' or its corresponding type declarations.

    3 import CancelOrderButtonsThree from '../cancel-order-buttons-three'
```

**原因分析**

没有类型声明文件,就无法引用

### 问题解决

- 20211205

1. 得自己针对所有 vue 文件声明一个类型声明文件

```
// src/typings/vue-shim.d.ts

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

2. 然后让 ts 来加载这个类型声明文件

- 方法 1: 加入新的 type 目录

```
// tsconfig.json
{
  "compilerOptions": {
     // 一定要保留"./node_modules/@types",否则只会识别./src/typings,导致无法@types类型
		"typeRoots": ["./node_modules/@types", "./src/typings", ]
  }
}
```

- 方法 2: 指定项目目录,这样就会自动扫描该目录下所有的 d.ts.和问题 1 一样

```
{
	"include": ["src"]
}
```

3. 在引入的地方加上.vue 后缀名

```
import CancelOrderButtonsThree from '../cancel-order-buttons-three.vue'
```
