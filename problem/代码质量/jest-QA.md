# Jest QA

- 1. [已解决]为什么单元测试的后缀名要是 spec.js(191230)
- 2. [已解决]vue 单元测试官方文档中提到的存根是啥玩意儿(20200107)
- 3. [已解决]如何获取一个组件的具体 CSS 样式值,以及如何测试 prop 是否验证失败(20200108)
- 4. [已解决]运行单元测试时,如何只运行其中一个文件(20200116)
- 5. [已解决]在`vue`项目中运行`jest`,引入的一个`lodash`模块报错(20210402)
- 6. [已解决]测试文件中引入的文件中,如果使用了 webpack 别名会报错(20210720)
- 7. vue 测试中,模拟\$route 时报错(20210720)
- 8. 如何在一个老的 vue 项目中启用 jest(20210720)
- 9. 根据 Vue Test Utils 官网指引安装后,运行 jest 命令之后报异常(20210720)
- 10. 如何 mock 一个基于 axios 的实际的接口函数(20210720
- 11. [已解决]运行完 test:coverage 后,package.json 里面的 thresholds 自动更新的逻辑是怎么实现的(20211013)
- 12. [已解决] 如何使用`setSystemTime`模拟一个时间(20211028)
- 13. [已解决]忽略 test.js 文件(20211230)
- 14. [已解决]无法识别 css 文件(20211130)
- 15. 通过@vue/cli-plugin-unit-jest 运行测试,无法识别 jest.config.ts 文件.只能识别 jest.config.js 文件
- 17. [已解决]通过 vue-cli-service test:unit --watch 运行测试报异常(20211203)
- 18. [已解决]通过 vue-cli-service test:unit --watch 运行测试无法识别到 ts 文件(20211203)
- 19. [已解决]vue 测试中无法识别全局组件(20211212)
- 20. 在 jest 中如何模拟 location.href(20211212)
- 21. 收集指定文件的覆盖率
- 22. [已解决]jest 对象引用不存在(2022-05-17)
- 22. [已解决]ts 文件引入 lodash 时引入进来的是 undefined(2022-05-17)
- 23. spyOn 无法生效(2022-05-17)
- 23. [已解决]testEnvironment 详解(2022-05-27)

## 1. [已解决]为什么单元测试的后缀名要是 spec.js(191230)

### 业务背景

今天 2019-12-30 开始在生产环境中学着写单元测试,看到`vant-ui`和`element-ui`里面的单元测试文件,都是以这个结尾的.为啥呢?搜索了一圈都没有描述的

### 问题解决

- 20200108
- 就是行业潜规则,约定俗成了
- 就像 jest 会自动遍历所有*spec.js 和*.test.js 文件一样

## 2. [已解决]vue 单元测试官方文档中提到的存根是啥玩意儿(20200107)

### 业务背景

正式开始写单元测试代码,通读了 vue 单元测试的官方源码,里面有一些内容表示闻所未闻,其中一个就是它.

### 问题解决

- 大概在网上搜索了一下,就是为了破除依赖,保证最小化的单元测试,而创建的一个简易对象
- 概念是这个概念,实际有啥用还有待使用中学习了

## 3. [已解决]如何获取一个组件的具体 CSS 样式值,以及如何测试 prop 是否验证失败(20200108)

### 业务背景

- 写了一个 button 组件,有一个 props 叫 type,可以传入 primary,info 等值,传入 primary 后,会给组件添加一个类名叫 uv-btn_primary,
  它对应的 CSS 样式有一个 color: blue;就想测试一下,传入这个值后,颜色是否是 blue.但是在单元测试里面根本无法获取到元素对应的样式
- 另外,对 type 这个 prop 也添加了 validate,只能够传入 primary,info 等指定值,就是想要测试一下,如果传入 other,是否返回了一个异常,可实测下来,setProps 方法始终也是返回的 undefined

```javascript
describe('prop type测试', function () {
  const wrapper = mount(Button, {
    propsData: {
      type: 'primary',
    },
  });
  it('传递type时,类名要跟着变化', () => {
    expect(wrapper.classes()).toContain('uv-btn_primary');
  });
  // 这里会报错,因为color始终返回的是undefined
  it('传递type时,颜色要跟着变化', () => {
    expect(wrapper.element.style.color).toBe('#fff');
  });
  // 这晨也会报错,国为方法始终返回的是一个undefined而不是异常
  it('type传入other时,要报错', () => {
    expect(wrapper.setProps({ type: 'other' })).toThrowError();
  });
});
```

### 问题解决

- 20200112
- vue test 官方文档有说明,无法测试 css 样式,只能测试内联样式
  - 参考: https://vue-test-utils.vuejs.org/zh/guides/#常用技巧
- 不需要测试 props 的 validate 方法
  - 这个是属于 vue 的功能,不在我们的单元测试范畴
  - 单元测试的范围一定只是测试自己的单个业务功能

## 4. [已解决]运行单元测试时,如何只运行其中一个文件(20200116)

### 业务背景

在写组件库,每个组件都有几十个单元测试,写了多个组件之后,我只需要测当前写的这个组件,可以 jest 会把所有组件都测一下,这样时间上很浪费呀,有哪种快一点的方式,可以只运行自己关心的那些测试文件呢

### 问题解决

- 20200116
- 直接在 package.json 的 scrip 命令中添加文件参数即可
- 参考
  - https://jestjs.io/docs/en/cli

```json
{
  "test": "jest ./test/unit/specs/icon.spec.js"
}
```

## 5. [已解决]在`vue`项目中运行`jest`,引入的一个`lodash`模块报错(20210402)

### 业务背景

开始在生产项目中使用 jest 来测试 vue 项目,按照官方文档的操作安装,`npm run test`的时候就报错了

安装步骤

1. ```bash
   npm install --save-dev jest @vue/test-utils
   ```

2. ```json
   // package.json
   {
     "scripts": {
       "test": "jest"
     }
   }
   ```

3. ```bash
   npm install --save-dev vue-jest babel-jest
   ```

4. ```javascript
   // jest.config.js
   module.exports = {
     moduleFileExtensions: ['js', 'json', 'vue'],
     transform: {
       '.*\\.(vue)$': 'vue-jest',
       '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
     },
     moduleNameMapper: {
       '^@\\/(.*)$': '<rootDir>/src/$1',
     },
   };
   ```

测试代码

```javascript
import { initInvoiceType } from '../reset-data';
test('when the aggregation api  does not return invoice list, it should return 0', () => {
  expect(initInvoiceType()).toBe(0);
});
```

报错内容

```bash
 FAIL  src/pages/order/common/__test__/reset-data.spec.js
  ● Test suite failed to run

    Jest encountered an unexpected token

    This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.

    By default, if Jest sees a Babel config, it will use that to transform your files, ignoring "node_modules".

    Here's what you can do:
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/en/configuration.html

    Details:

    /Users/ranwawa/Documents/project/hll-mp-bigVehicle/node_modules/lodash-es/lodash.js:10
    export { default as add } from './add.js';
    ^^^^^^

    SyntaxError: Unexpected token 'export'

       5 |  */
       6 |
    >  7 | import { isArray } from 'lodash-es'
         | ^
       8 | import { getOrderRemarkTags } from '@/common/api/order-api'
       9 | import { getAndProcessCityInfo, getSelectedServiceCarry } from '@/common/pub.js'
      10 | import { clearArgsUndefined } from '@/common/utils'

      at Runtime.createScriptFromCode (node_modules/_jest-runtime@25.5.4@jest-runtime/build/index.js:1258:14)
      at Object.<anonymous> (src/pages/order/common/reset-data.js:7:1)
```

原因分析

感觉是 jest 默认忽略了 node_modules 的解析,所以我得去把 lodash 单独给打开才行

### 问题解决

- 20210402

```json
{
  "transformIgnorePatterns": ["node_modules/(?!lodash-es/)"]
}
```

- 参考: https://jestjs.io/zh-Hans/docs/tutorial-react-native#transformignorepatterns-customization

## 6. [已解决]测试文件中引入的文件中,如果使用了 webpack 别名会报错(20210720)

### 问题解决

- 20211130
- 需要在 jest 配置文件中的`moduleNameMapper`字段再次定义一下别名

### 参考

参考: [jest 官网](https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring

## 7. vue 测试中,模拟\$route 时报错(20210720)

## 8. 如何在一个老的 vue 项目中启用 jest(20210720)

## 9. 根据 Vue Test Utils 官网指引安装后,运行 jest 命令之后报异常(20210720)

官网地址

https://vue-test-utils.vuejs.org/zh/

报错内容

```bash
Test environment found at "/Users/ranwawa/Documents/project/llm-customer-service/node_modules/jest-environment-jsdom-fifteen/lib/index.js" does not export a "getVmContext" method, which is mandatory from Jest 27. This method is a replacement for "runScript".
Test environment found at "/Users/ranwawa/Documents/project/llm-customer-service/node_modules/jest-environment-jsdom-fifteen/lib/index.js" does not export a "getVmContext" method, which is mandatory from Jest 27. This method is a replacement for "runScript".
Test environment found at "/Users/ranwawa/Documents/project/llm-customer-service/node_modules/jest-environment-jsdom-fifteen/lib/index.js" does not export a "getVmContext" method, which is mandatory from Jest 27. This method is a replacement for "runScript".
Test environment found at "/Users/ranwawa/Documents/project/llm-customer-service/node_modules/jest-environment-jsdom-fifteen/lib/index.js" does not export a "getVmContext" method, which is mandatory from Jest 27. This method is a replacement for "runScript".
Test environment found at "/Users/ranwawa/Documents/project/llm-customer-service/node_modules/jest-environment-jsdom-fifteen/lib/index.js" does not export a "getVmContext" method, which is mandatory from Jest 27. This method is a replacement for "runScript".
Test environment found at "/Users/ranwawa/Documents/project/llm-customer-service/node_modules/jest-environment-jsdom-fifteen/lib/index.js" does not export a "getVmContext" method, which is mandatory from Jest 27. This method is a replacement for "runScript".
Test environment found at "/Users/ranwawa/Documents/project/llm-customer-service/node_modules/jest-environment-jsdom-fifteen/lib/index.js" does not export a "getVmContext" method, which is mandatory from Jest 27. This method is a replacement for "runScript".
 FAIL  customer-service/views/customer/home.test.js
  ● Test suite failed to run

    Jest worker encountered 4 child process exceptions, exceeding retry limit

      at ChildProcessWorker.initialize (node_modules/jest-runner/node_modules/jest-worker/build/workers/ChildProcessWorker.js:193:21)

Test environment found at "/Users/ranwawa/Documents/project/llm-customer-service/node_modules/jest-environment-jsdom-fifteen/lib/index.js" does not export a "getVmContext" method, which is mandatory from Jest 27. This method is a replacement for "runScript".
 FAIL  customer-service/views/common/error.test.js
  ● Test suite failed to run

    Jest worker encountered 4 child process exceptions, exceeding retry limit

      at ChildProcessWorker.initialize (node_modules/jest-runner/node_modules/jest-worker/build/workers/ChildProcessWorker.js:193:21)

Test Suites: 2 failed, 2 total
Tests:       0 total
Snapshots:   0 total
Time:        3.362 s
Ran all test suites.
```

### 问题解决

方案 1: 绕开

- 20210720

- 使用`@vue/cli-plugin-unit-jest`插件
- 参考网址: https://cli.vuejs.org/core-plugins/unit-jest.html#injected-commands

## 10. 如何 mock 一个基于 axios 的实际的接口函数(20210720

## 11. [已解决]运行完 test:coverage 后,package.json 里面的 thresholds 自动更新的逻辑是怎么实现的(20211013)

### 业务背景

刚刚在做 webApp 的开发,运行完 coverage 之后居然自动更新了.想知道是怎么做到的.

终端返回结果

```shell
new coverage thresholds:
{
  "lines": 79,
  "statements": 77.98,
  "functions": 71.68,
  "branches": 67.58
}

coverage thresholds ratcheted 🔧
✨  Done in 151.93s.
```

### 问题解决

- 20211205
- 使用插件 jest-ratchet: https://www.npmjs.com/package/jest-ratchet

## 12. [已解决] 如何使用`setSystemTime`模拟一个时间(20211028)

### 业务背景

请求订单列表接口,会默认带上最近 30 天的时间.每次运行测试的时候,这个时间都会发生变化.

有 3 种解决方案

1. 直接模拟 Date.now 函数,给一个固定的时间

```javascript
// 模拟时间 2021-08-08 00:00:00
const spyNow = jest.spyOn(Date, 'now');
spyNow.mockReturnValue(1628352000000);
```

2. 在断言的时候只断言类型,而非具体的时间

```
expect(spyGetLogs.mock.calls[1][0]).toEqual({
      start_time: expect.any(String),
      end_time: expect.any(String),
});
```

3. 官方有提到一个`setSystemTime`的函数

   但是在使用的时候总是报错.参考: https://stackoverflow.com/questions/29719631/how-do-i-set-a-mock-date-in-jest里面的第2个回答.

4. 使用插件`[MockDate](https://github.com/boblauer/MockDate)`

## 13. [已解决]忽略 test.js 文件(20211230)

### 业务背景

项目文件中本身就存在一些 test.js 的文件,导致 jest 会扫描执行这些文件,从而产生报错.因为没有 describe 和 test

### 问题解决

- 20211230
- 需要在 jest 配置文件中的 testPathIgnorePatterns 配置中忽略这些文件
- 参考: https://jestjs.io/docs/configuration#testpathignorepatterns-arraystring

## 14. [已解决]无法识别 css 文件(20211130)

### 业务背景

项目中一些插件直接引入了 css 文件,导致 jest 在引入 css 文件时无法识别里面的内容

### 问题解决

- 20211130
- 需要在 jest 配置文件中的`moduleNameMapper`中将这些 css,图片等资源指向一个模拟文件
- 参考: https://jestjs.io/docs/webpack#mocking-css-modules

## 15. 通过@vue/cli-plugin-unit-jest 运行测试,无法识别 jest.config.ts 文件.只能识别 jest.config.js 文件

## 17. [已解决]通过 vue-cli-service test:unit --watch 运行测试报异常(20211203)

### 问题描述

```bash
Error: EMFILE: too many open files, watch
    at FSEvent.FSWatcher._handle.onchange (node:internal/fs/watchers:204:21)
```

尝试解决

- 升级到最新的 jest -> 无效
- 删除 node_modules 重新安装 -> 无效(参考: https://github.com/facebook/jest/issues/512)
- 在 jest.config.js 中配置 transformIgnorePatterns: ['/node_modules/'] -> 无效

### 问题解决

- 20211203

- 安装 watchman -> 生效(参考: https://flaviocopes.com/react-native-emfile-too-many-open-files/)

```shell
brew install watchman
```

## 18. [已解决]通过 vue-cli-service test:unit --watch 运行测试无法识别到 ts 文件(20211203)

### 问题描述

后缀名改成.ts/.tsx 之后,就扫描不到了.

jest.config.js 配置文件如下

```javascript
const config = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.css$': 'identity-obj-proxy',
  },
  testMatch: [
    '<rootDir>/tests/**/*.(spec|test).(js|jsx|ts|tsx)',
    '<rootDir>/**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  testPathIgnorePatterns: ['<rootDir>/src/router/test.js', '/node_modules/'],
};

module.exports = config;
```

**尝试**

- 安装`@babel/preset-typescript`,并且在 babel 配置文件中新增依赖 -> 无效(参考: https://jestjs.io/docs/getting-started#using-typescript)

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "useBuiltIns": "entry",
        "corejs": 3
      }
    ],
    "@babel/preset-typescript"
  ],
```

- 安装`ts-jest`并且在 jest.config.js 中配置 transform -> 无效(参考: https://vue-test-utils.vuejs.org/guides/using-with-typescript.html)
  - 是因为和`@vue/cli-plugin-unit-jest/presets/no-babel`冲突导致的

### 问题解决

- 20211205

- 使用 vue 提供的默认 typescript 配置

```javascript
// jest.config.js
const config = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testPathIgnorePatterns: ['<rootDir>/src/router/test.js', '/node_modules/'],
};

module.exports = config;
```

## 19. [已解决]vue 测试中无法识别全局组件(20211212)

### 问题描述

渲染一个组件

该组件中使用了全局组件

#### 报错内容

```bash
[Vue warn]: Unknown custom element: <hll-popup> - did you register the component correctly? For recursive components, make sure to provide the "name" option.

      found in

      ---> <CancelOrderJudgeO>
             <Root>
    console.error node_modules/vue/dist/vue.runtime.common.dev.js:621
      [Vue warn]: Unknown custom element: <hll-popup> - did you register the component correctly? For recursive components, make sure to provide the "name" option.

      found in

      ---> <CancelOrderJudgeO>
             <Root>
```

### 问题分析

因为是单元测试,没有走 Vue.use 注册全局组件

所以应该是要走一下这个步骤

并且要全局注册,避免在每个文件中都来注入一次

### 问题解决

- 20211212
- 通过 setup 走一下 vue.use 即可

```javascript
// jest.config.js
setupFiles: ['./jest.setup.js'];

// jest.setup.js
import Vue from 'vue';
import HllUI from 'hll-m-ui';

Vue.use(HllUI);
```

### 参考链接

- https://github.com/vuejs/vue-test-utils/issues/1459

## 20. 在 jest 中如何模拟 location.href(20211212)

### 问题描述

渲染一个 vue 组件,组件中引用了一个 Mix,mix 中取了 location.query 来格式化所有入参

想要模拟这个 query

#### 方案 1

如果代码中要使用到 query,hash,host 等等,都必须手动定义一下.比较麻烦

```javascript
global.window = Object.create(window);
const url = 'http://dummy.com';
Object.defineProperty(window, 'location', {
  value: {
    href: url,
  },
});
```

#### 方案 2

在 ts 中会报错,因为 URL 构造函数返回的没有 location 上的一些函数,无法直接赋值

```javascript
delete window.location;
window.location = new URL('https://www.example.com');
```

#### 参考链接

- https://stackoverflow.com/questions/54021037/how-to-mock-window-location-href-with-jest-vuejs

## 21. 收集指定文件的覆盖率

​ "test-temp": "cp env/.env.test .env.test; TZ=utc craco test --coverage=true --collectCoverageFrom=src/interfaces/global/store/modules/auth/sagas/register.js register.test.js"

### 参考链接

- https://stackoverflow.com/questions/53342824/temporarily-get-jest-coverage-to-show-only-files-in-a-specific-folder

## 22. [已解决]jest 对象引用不存在(2022-05-17)

### 问题描述

@ranwawa/branchlint 项目中使用 jest 进行单元测试,这个项目是 ESM 项目,在运行 jest 时报错

```bash
FAIL  tests/index.test.js
  ● Test suite failed to run

    ReferenceError: jest is not defined

      4 |
      5 | const configSync = cosmiconfigSync(BRANCHLINT);
    > 6 | const spySearch = jest.spyOn(configSync, 'search');
```

### 问题解决

根据官方文档描述,需要手动引入或者使用 import.meta.jest

文件少直接加文件里,如果多的话就放 setupFiles 里面

```javascript
import { jest } from '@jest/globals';
import.meta.jest.useFakeTimers();
```

### 参考链接

- [官方文档](https://jestjs.io/docs/ecmascript-modules)

## 22. [已解决]ts 文件引入 lodash 时引入进来的是 undefined(2022-05-17)

### 问题描述

在@ranwawa/branchlint 项目使用 ts 来写单元测试,包括所有项目文件也是 ts.运行测试时却报下面的错误

import \_ from 'lodash',之前一直这样引用没问题呀

```javascript
    TypeError: Cannot read properties of undefined (reading 'isArray')
    > 75 |     if (_.isArray(pattern)) {
```

在 tsc 时也遇到类问题参照 typescript-qa 问题 9

想想这应该是 ts-jest 的配置问题,查一查

### 问题解决

- 把 import `_ from 'lodash'改成 import \* as _`,但这显示不科学
- 设置 jest 的属性 extensionsToTreatAsEsm,让 jest 自动兼容

### 参考链接

- [jest extensionsToTreatAsEsm 属性官方文档](https://jestjs.io/docs/next/configuration#extensionstotreatasesm-arraystring)
- [ts-loader 关于 支持 ESM 的文档](https://kulshekhar.github.io/ts-jest/docs/guides/esm-support)

## 23. spyOn 无法生效(2022-05-17)

### 问题描述

@ranwawa/branchlint 项目的单测中,想要模拟 cosmiconfigSync 方法

测试文件中是通过 default 形式导入,而 config.ts 中是通过具名导入

```javascript
describe.only('Config', () => {
  const spy = jest.spyOn(cosmiconfig, 'cosmiconfigSync');

  it('如果传了配置对象,则不去搜索默认配置', () => {
    const conf = new Config();
    conf.initConfig(DEFAULT_CONFIG);

    expect(spy).toBeCalledTimes(0);
  });
```

```typescript
// config.ts
import { cosmiconfigSync } from 'cosmiconfig';
```

在测试文件中加 log 发现 cosmiconfig.cosmiconfigSync 确实被拦截

然后把 config.ts 中的导入也改成 default 形式导入,然后再通过`.`来运行 cosmiconfigSync 方法就可以正常模拟

原因在于 spyOn 是拦截的 get 方法,而具名导致又不是通过 get 拿导致的,还是要 ESM 和 CMD 兼容性有关

### 问题解决

- 临时解决,修改下 config.ts 中的引入方式,但这样不科学

### 参考链接

## 23. [已解决]testEnvironment 详解(2022-05-27)

### 问题描述

之前在 partnerportal 项目中编写单元测试时,localStorage 需要自己来模拟.而 web 项目中却不需要,当时还以为是引入了一个啥公共的测试工具来自动模拟全局变量.可找了一圈没发现引入别的包.

前两天在看 VTL 时,有见到 jest 配置文件中这个变量可以设置为 jsdom,好像就是解决这个的.那就深入了解一下

### 问题解决

这个就是用来设置环境的的参数,可选值有 node/jsdom

还可以自定义环境.这样就可以一次性模拟微信小程序或者 app 上的所有函数和变量了

### 参考链接

- [jest 官方文件](https://jestjs.io/docs/configuration#testenvironment-string)
