## 1. ReferenceError: React is not defined(20210726)

### 业务背景

在 react 项目中引入 enzyme 测试组件.根据安装完成.运行时就报这个错

**相关代码**

> index.test.tsx

```tsx
describe('界面显示', () => {
  expect(render(<LoginBox />)).toMatchSnapshot();
});
```

**报错内容**

● 登录页面 › 界面显示 › encountered a declaration exception

```bash
ReferenceError: React is not defined

  191 |
  192 |   if (!countryCurrent.areaCode) {
> 193 |     return <Loading />;
      |     ^
  194 |   }
```

**相关尝试**

网上说的是在 index.test.tsx 中引入 React,但未解决

```javascript
// 下面2种方式都无法解决
import * as React from 'react';
import React from 'react';
```

然后组件,以及组件依赖的子组件上都引入 React 可以解决这个问题

但是所有组件页面都加上这样的代码显然不科学呀,应该有一个全局配置啥的
