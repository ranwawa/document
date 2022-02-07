### 1. [已解决] typescript中安装jest-dom之后,没有语法提示(20210728)

**业务背景**

第一次用`@testing-library/react`进行UI测试,官方文档有介绍用`@test-library/jest-dom`来扩展一些`jest`的matchers.

根据官方提示安装步骤如下:

1. 安装依赖包: yarn add --dev @testing-library/jest-dom
2. 新增初始化文件: \__jest__/jest-dom**`.ts`** -> import '@testing-library/jest-dom';
3. 更新jest配置文件: jest.config.js ->  setupFilesAfterEnv: ['<rootDir>/\__jest__/jest-dom.ts']

**问题解决**

- 20210728
- 把问题描述了一遍历,发现可以使用
- 之前不可以使用,是因为自己用了一个错误的matcher在搞搞搞



### 2. 无法渲染从导出umi.js中的<Redirect />组件. (20210727)

**业务背景**

用umi.js开发的网站,<Redirect>就从umi中导出

单元测试的时候会报类型异常的错误.

换成从react-router-dom导出,就可以解决这个问题.

这是为啥

**报错内容**

```bash
   console.error
    Warning: React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
    
    Check the render method of `LoginBox`.
        at fn (/Users/ranwawa/Documents/project/llm-partnerportal-web/src/pages/login/index.tsx:99:41)
        at construct (/Users/ranwawa/Documents/project/llm-partnerportal-web/node_modules/react-router-dom/node_modules/react-router/cjs/react-router.js:99:30)

      196 |
      197 |   if (token.PRODUCTION && token.SANDBOX) {
    > 198 |     return <Redirect to={redirect} />;
          |            ^
      199 |   }
      200 |
      201 |   return (

      at printWarning (node_modules/react/cjs/react.development.js:220:30)
      at error (node_modules/react/cjs/react.development.js:196:5)
      at Object.createElementWithValidation [as createElement] (node_modules/react/cjs/react.development.js:2215:7)
      at Component (src/pages/login/index.tsx:198:12)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:14985:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:17811:13)
      at beginWork (no=ode_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:212:11)
        at HTMLUnknownElementImpl.dispatchEvent (/Users/ranwawa/Documents/project/llm-partnerportal-web/node_modules/jest-environment-jsdom-fourteen/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:87:17)
        at HTMLUnknownElement.dispatchEvent (/Users/ranwawa/Documents/project/llm-partnerportal-web/node_modules/jest-environment-jsdom-fourteen/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:144:23)
        at Object.apply (/Users/ranwawa/Documents/project/llm-partnerportal-web/node_modules/react-dom/cjs/react-dom.development.js:3994:16)
        at invokeGuardedCallback (/Users/ranwawa/Documents/project/llm-partnerportal-web/node_modules/react-dom/cjs/react-dom.development.js:4056:31)
        at beginWork$1 (/Users/ranwawa/Documents/project/llm-partnerportal-web/node_modules/react-dom/cjs/react-dom.development.js:23964:7)
        at performUnitOfWork (/Users/ranwawa/Documents/project/llm-partnerportal-web/node_modules/react-dom/cjs/react-dom.development.js:22779:12) Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
```

**示例代码**

> index.ui.test.tsx

```typescript
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'umi';

...

it('如果只有1个token,则渲染页面', () => {
      token.PRODUCTION = '';
      token.SANDBOX = 'token-sandbox';
      const history = createMemoryHistory();

      const { container } = render(
        <Router history={history}>
          <ContextRegion.Provider value={contextRegionValue}>
            <LoginBox></LoginBox>
          </ContextRegion.Provider>
        </Router>,
      );

      expect(pretty(container.innerHTML)).toMatchSnapshot();
    });
```

> index.tsx

```typescript
import { Redirect } from 'umi';

...

if (token.PRODUCTION && token.SANDBOX) {
    return <Redirect to={redirect} />;
  }
```

### 3. 组件中包含useLocation时报错,Invalid hook call. Hooks can only be called inside of the body of a function componen(20210804)

**业务背景**

开始涉及到集成测试了,即一个组件里面关联到很多依赖,比如context, location,history等等.如果不模拟useLocation,则会有这个异常

**异常**

```
 Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
    1. You might have mismatching versions of React and the renderer (such as React DOM)
    2. You might be breaking the Rules of Hooks
    3. You might have more than one copy of React in the same app
    See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.

      145 |
      146 | const Header: FC = () => {
    > 147 |   const location = useLocation();
          |                    ^
      148 |   const history = useHistory();
      149 |   const { envAppCurrent, setEnvApp } = useContext(ContextEnv);
      150 |   const [userInfo, setUserInfo] = useState(Object());
```

**测试代码**

```typescript
beforeEach(() => {
  const value = {
    envAppCurrent: ENV_APP.PRODUCTION,
    isProd: true,
    setEnvApp: (e: ENV_APP) => {
      value.envAppCurrent = e;
    },
  };

  const history = createMemoryHistory();

  asFragment = render(
    <Router history={history}>
      <ContextEnv.Provider value={value}>
        <Header />
      </ContextEnv.Provider>
    </Router>,
  ).asFragment;
});
```

