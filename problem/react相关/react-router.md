### 1. `MemoryRouter`组件是干什么用的? (20210725)

**业务背景**

在参考webApp别人写的单元测试时,发现了这个.无奈自己没怎么用过react-router,所以遇到一个纪录一个吧

**示例代码**

```typescript
import { MemoryRouter } from 'react-router-dom';

const mountWithRouter = (
  Comp: ComponentClass,
  props: any,
  initialEntries: string[]
) =>
  mount(
    <MemoryRouter initialEntries={initialEntries}>
      <Comp {...props} />
    </MemoryRouter>
  ).find(Comp);
```

**问题解决**

- 20210725
- 和Router一样,只是用于非浏览器环境,通过内存变量来读取history/location信息,比如在测试或react-native的时候
- 官网有详细介绍