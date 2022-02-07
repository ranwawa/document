[TOC]

### 1. [已解决]为什么单元测试的后缀名要是spec.js(191230)

**业务背景**

今天2019-12-30开始在生产环境中学着写单元测试,看到`vant-ui`和`element-ui`里面的单元测试文件,都是以这个结尾的.为啥呢?搜索了一圈都没有描述的

**问题解决**

- 20200108
- 就是行业潜规则,约定俗成了
- 就像jest会自动遍历所有*spec.js和*.test.js文件一样

### 2. [已解决]vue单元测试官方文档中提到的存根是啥玩意儿(20200107)

**业务背景**

正式开始写单元测试代码,通读了vue单元测试的官方源码,里面有一些内容表示闻所未闻,其中一个就是它.

**问题解决**
- 大概在网上搜索了一下,就是为了破除依赖,保证最小化的单元测试,而创建的一个简易对象
- 概念是这个概念,实际有啥用还有待使用中学习了

### 3. [已解决]如何获取一个组件的具体CSS样式值,以及如何测试prop是否验证失败(20200108)

**业务背景**

- 写了一个button组件,有一个props叫type,可以传入primary,info等值,传入primary后,会给组件添加一个类名叫uv-btn_primary,
它对应的CSS样式有一个color: blue;就想测试一下,传入这个值后,颜色是否是blue.但是在单元测试里面根本无法获取到元素对应的样式
- 另外,对type这个prop也添加了validate,只能够传入primary,info等指定值,就是想要测试一下,如果传入other,是否返回了一个异常,可实测下来,setProps方法始终也是返回的undefined

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
    expect(wrapper.setProps({ type: 'other'})).toThrowError();
  });
});
```


**问题解决**
- 20200112
- vue test官方文档有说明,无法测试css样式,只能测试内联样式
  - 参考: https://vue-test-utils.vuejs.org/zh/guides/#常用技巧
- 不需要测试props的validate方法
  - 这个是属于vue的功能,不在我们的单元测试范畴
  - 单元测试的范围一定只是测试自己的单个业务功能

### 4. [已解决]运行单元测试时,如何只运行其中一个文件(20200116)

**业务背景**

在写组件库,每个组件都有几十个单元测试,写了多个组件之后,我只需要测当前写的这个组件,可以jest会把所有组件都测一下,这样时间上很浪费呀,有哪种快一点的方式,可以只运行自己关心的那些测试文件呢

**问题解决**
- 20200116
- 直接在package.json的scrip命令中添加文件参数即可
- 参考
  - https://jestjs.io/docs/en/cli 
```json
{
"test": "jest ./test/unit/specs/icon.spec.js"
}
```

### 5. [已解决]在`vue`项目中运行`jest`,引入的一个`lodash`模块报错(20210402)

**业务背景**

开始在生产项目中使用jest来测试vue项目,按照官方文档的操作安装,`npm run test`的时候就报错了

**安装步骤**

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
   }
   ```

**测试代码**

```javascript
import { initInvoiceType } from '../reset-data'
test('when the aggregation api  does not return invoice list, it should return 0', () => {
  expect(initInvoiceType()).toBe(0)
})
```

**报错内容**

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

**原因分析**

感觉是jest默认忽略了node_modules的解析,所以我得去把lodash单独给打开才行

**问题解决**

- 20210402

- ```
  {
    "transformIgnorePatterns": [
      "node_modules/(?!lodash-es/)"
    ]
  }
  ```

- 参考: https://jestjs.io/zh-Hans/docs/tutorial-react-native#transformignorepatterns-customization

### 6. [已解决]测试文件中引入的文件中,如果使用了webpack别名会报错(20210720)

**问题解决**

- 20211130

- 需要在jest配置文件中的`moduleNameMapper`字段再次定义一下别名
- 参考: https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring

### 7. vue测试中,模拟$route时报错(20210720)

### 8. 如何在一个老的vue项目中启用jest(20210720)

### 9. 根据Vue Test Utils官网指引安装后,运行jest命令之后报异常(20210720)

**官网地址**

https://vue-test-utils.vuejs.org/zh/

**报错内容**

```
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

**问题解决**

方案1: 绕开

- 20210720

- 使用`@vue/cli-plugin-unit-jest`插件 
- 参考网址: https://cli.vuejs.org/core-plugins/unit-jest.html#injected-commands



### 10. 如何mock一个基于axios的实际的接口函数(20210720

### 11. [已解决]运行完test:coverrage后,pakeage.json里面的thresholds自动更新的逻辑是怎么实现的(20211013)

**业务背景**

刚刚在做webApp的开发,运行完coverage之后居然自动更新了.想知道是怎么做到的.

**终端返回结果**

```
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

**问题解决**

- 20211205
- 使用插件jest-ratchet: https://www.npmjs.com/package/jest-ratchet

### 12. [已解决] 如何使用`setSystemTime`模拟一个时间(20211028)

**业务背景**

请求订单列表接口,会默认带上最近30天的时间.每次运行测试的时候,这个时间都会发生变化.

有3种解决方案

1. 直接模拟Date.now函数,给一个固定的时间

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



### 13. [已解决]忽略test.js文件(20211230)

**业务背景**

项目文件中本身就存在一些test.js的文件,导致jest会扫描执行这些文件,从而产生报错.因为没有describe和test

**问题解决**

- 20211230
- 需要在jest配置文件中的testPathIgnorePatterns配置中忽略这些文件
- 参考: https://jestjs.io/docs/configuration#testpathignorepatterns-arraystring



### 14. [已解决]无法识别css文件(20211130)

**业务背景**

项目中一些插件直接引入了css文件,导致jest在引入css文件时无法识别里面的内容

**问题解决**

- 20211130
- 需要在jest配置文件中的`moduleNameMapper`中将这些css,图片等资源指向一个模拟文件
- 参考: https://jestjs.io/docs/webpack#mocking-css-modules



15. 通过@vue/cli-plugin-unit-jest运行测试,无法识别jest.config.ts文件.只能识别jest.config.js文件





### 17. [已解决]通过vue-cli-service test:unit --watch运行测试报异常(20211203)

**异常内容**

```bash
Error: EMFILE: too many open files, watch
    at FSEvent.FSWatcher._handle.onchange (node:internal/fs/watchers:204:21)
```

**尝试解决**

- 升级到最新的jest -> 无效

- 删除node_modules重新安装 -> 无效(参考: https://github.com/facebook/jest/issues/512)
- 在jest.config.js中配置transformIgnorePatterns: ['/node_modules/'] -> 无效

**问题解决**

- 20211203

- 安装watchman -> 生效(参考: https://flaviocopes.com/react-native-emfile-too-many-open-files/)

```
brew install watchman
```

### 18. [已解决]通过vue-cli-service test:unit --watch运行测试无法识别到ts文件(20211203)

**问题描述**

后缀名改成.ts/.tsx之后,就扫描不到了.



jest.config.js配置文件如下

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
}

module.exports = config

```

**尝试**

- 安装`@babel/preset-typescript`,并且在babel配置文件中新增依赖 -> 无效(参考: https://jestjs.io/docs/getting-started#using-typescript)

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

- 安装`ts-jest`并且在jest.config.js中配置transform -> 无效(参考: https://vue-test-utils.vuejs.org/guides/using-with-typescript.html)
  - 是因为和`@vue/cli-plugin-unit-jest/presets/no-babel`冲突导致的

**问题解决**

- 20211205

- 使用vue提供的默认typescript配置

```javascript
// jest.config.js
const config = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testPathIgnorePatterns: ['<rootDir>/src/router/test.js', '/node_modules/'],
}

module.exports = config
```

### 19. [已解决]vue测试中无法识别全局组件(20211212)

#### 问题描述

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

#### 问题分析

因为是单元测试,没有走Vue.use注册全局组件

所以应该是要走一下这个步骤

并且要全局注册,避免在每个文件中都来注入一次

#### 问题解决

- 20211212
- 通过setup走一下vue.use即可

```javascript
// jest.config.js
setupFiles: ['./jest.setup.js']

// jest.setup.js
import Vue from 'vue'
import HllUI from 'hll-m-ui'

Vue.use(HllUI)

```



#### 参考链接

- https://github.com/vuejs/vue-test-utils/issues/1459



### 20. 在jest中如何模拟location.href(20211212)

#### 问题描述

渲染一个vue组件,组件中引用了一个Mix,mix中取了location.query来格式化所有入参

想要模拟这个query

#### 方案1

如果代码中要使用到query,hash,host等等,都必须手动定义一下.比较麻烦

```javascript
global.window = Object.create(window);
const url = "http://dummy.com";
Object.defineProperty(window, 'location', {
  value: {
    href: url
  }
});
```

#### 方案2

在ts中会报错,因为URL构造函数返回的没有location上的一些函数,无法直接赋值

```javascript
delete window.location
window.location = new URL('https://www.example.com')
```

#### 参考链接

- https://stackoverflow.com/questions/54021037/how-to-mock-window-location-href-with-jest-vuejs



收集指定文件的覆盖率

​    "test-temp": "cp env/.env.test .env.test; TZ=utc craco test --coverage=true --collectCoverageFrom=src/interfaces/global/store/modules/auth/sagas/register.js register.test.js"

参考: https://stackoverflow.com/questions/53342824/temporarily-get-jest-coverage-to-show-only-files-in-a-specific-folder

