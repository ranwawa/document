# React QA

## 1 学习并了解 FaCC(20211223)

### 问题描述

一般在 jsx 语法中,要么是放一个标签

要么

```react
 <StyledRadioGroup
              name="payment"
              value={radioGroupValue}
              onChange={this.onRadioButtonChanged}
            >
              {RadioButton => (
                <FormGroup>
                  {paymentMethodIds.map(paymentMethodId => {
                    const {
                      icon: Icon,
                      label,
                      name,
                      desc,
                    } = paymentMethodId === PaymentMethods.CASH.id
                      ? paymentMethodOptions.CASH
                      : paymentMethodOptions.ONLINE;

                    const active = paymentMethodId === selectedPaymentMethodId;
                    console.log(123, RadioButton);

                    return (
                      <FormItem
                        key={name}
                        style={{
                          flexDirection: 'column',
                          marginBottom: '0.5em',
                        }}
                      >
                        <Box>
                          <RadioButton
                            value={name}
                            data-cy={`payment-radio-${name}`}
                          >
                            <Con>
                              <Icon
                                color={active ? primary.main : nobel[700]}
                              />
                            </Con>
                            <RadioLabel checked={active}>{t(label)}</RadioLabel>
                          </RadioButton>
                        </Box>
                        <RadioDesc
                          {...(paymentMethodId === PaymentMethods.ONLINE.id && {
                            'data-for': 'checkout-tool-tip',
                            'data-tip': 'tooltip',
                            ref: ref => {
                              this.tooltipTargetHTMLElementRef = ref;
                            },
                          })}
                          checked={active}
                        >
                          {t(desc)}
                        </RadioDesc>
                      </FormItem>
                    );
                  })}
                </FormGroup>
              )}
            </StyledRadioGroup
```

## 2 为什么 constructor 构造函数中，必须要在 super 之后调用 this 对象(20220425)

### 问题描述

示例代码如下：

```jsx
export class LifeCycleClass extends React.Component {
  constructor() {
    console.log('mounting:constructor');
    console.log(this.state);
    super();
  }
  render() {}
}
```

编译时没有报错，但在运行时报错，报错内容如下

```bash
Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

猜测是 react 在源代码中，特别是 dev 环境的时候，硬编码检查了这个逻辑。
可 react 是怎么做知道我在 super 之前调用了 this，或者 constructor 中没有使用 super()的呢

### 问题解决

- 首先，从规范上来说，子类继承父类时必须在先调用 this 之前调用父类的构造函数

### 参考文档

- [阮一峰，类继承](https://es6.ruanyifeng.com/#docs/class-extends)

## 3 为什么生命周期钩子 getDerivedStateFromProps 和 getDerivedStateFromError 要设计成静态方法(20220425)

### 问题描述

文档上是这样说明的呢~并且 eslint 插件 react/no-typos 也有警告

### 问题解决

### 参考文档

## 4 为什么在严格模式下要执行 componentWillUnmount 钩子？(20220425)

### 问题描述

如题，关掉严格模式就不会执行。猜测是为了检测这个钩子里面是否有副作用代码，但使用了 setState 并没有出现任何警告

### 问题解决

### 参考文档

## 5 为什么 getDerivedStateFromError 会执行多次？(20220425)

### 问题描述

正常的流程

- 1. 子组件异常
- 2. getDerivedStateFromError -> 修改 state.hasError = true
- getDerivedStateFromProps
- shouldComponentUpdate
- render
- getSnapshotBeforeUpdate
- componentDidUpdate
- componentDidCatch

可是异常的流程，却是在第 2 部又重新修改了 state.hasError = false

这个异常流程是在哪触发的？

```bash
mounting:constructor
lifecycle.tsx:30 mounting/updating:getDerivedStateFromProps
lifecycle.tsx:50 mounting/updating:render false
lifecycle.tsx:63 mounting:componentDidMount
lifecycle.tsx:30 mounting/updating:getDerivedStateFromProps
lifecycle.tsx:36 updating: shouldComponentUpdate {"value":2} {"hasError":false}
lifecycle.tsx:50 mounting/updating:render false
lifecycle.tsx:15 Uncaught Error: 故意弄个异常
    at ChildComp (lifecycle.tsx:15:1)
    at renderWithHooks (react-dom.development.js:16141:1)
    at updateFunctionComponent (react-dom.development.js:20313:1)
    at beginWork (react-dom.development.js:22356:1)
    at HTMLUnknownElement.callCallback (react-dom.development.js:4157:1)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:4206:1)
    at invokeGuardedCallback (react-dom.development.js:4270:1)
    at beginWork$1 (react-dom.development.js:27243:1)
    at performUnitOfWork (react-dom.development.js:26392:1)
    at workLoopSync (react-dom.development.js:26303:1)
ChildComp @ lifecycle.tsx:15
renderWithHooks @ react-dom.development.js:16141
updateFunctionComponent @ react-dom.development.js:20313
beginWork @ react-dom.development.js:22356
callCallback @ react-dom.development.js:4157
invokeGuardedCallbackDev @ react-dom.development.js:4206
invokeGuardedCallback @ react-dom.development.js:4270
beginWork$1 @ react-dom.development.js:27243
performUnitOfWork @ react-dom.development.js:26392
workLoopSync @ react-dom.development.js:26303
renderRootSync @ react-dom.development.js:26271
performConcurrentWorkOnRoot @ react-dom.development.js:25577
workLoop @ scheduler.development.js:266
flushWork @ scheduler.development.js:239
performWorkUntilDeadline @ scheduler.development.js:533
lifecycle.tsx:75 erroring: getDerivedStateFromError
lifecycle.tsx:30 mounting/updating:getDerivedStateFromProps
lifecycle.tsx:36 updating: shouldComponentUpdate {"value":2} {"hasError":true}
lifecycle.tsx:50 mounting/updating:render true
lifecycle.tsx:30 mounting/updating:getDerivedStateFromProps
lifecycle.tsx:36 updating: shouldComponentUpdate {"value":2} {"hasError":false}
lifecycle.tsx:50 mounting/updating:render false
lifecycle.tsx:15 Uncaught Error: 故意弄个异常
    at ChildComp (lifecycle.tsx:15:1)
    at renderWithHooks (react-dom.development.js:16141:1)
    at updateFunctionComponent (react-dom.development.js:20313:1)
    at beginWork (react-dom.development.js:22356:1)
    at HTMLUnknownElement.callCallback (react-dom.development.js:4157:1)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:4206:1)
    at invokeGuardedCallback (react-dom.development.js:4270:1)
    at beginWork$1 (react-dom.development.js:27243:1)
    at performUnitOfWork (react-dom.development.js:26392:1)
    at workLoopSync (react-dom.development.js:26303:1)
ChildComp @ lifecycle.tsx:15
renderWithHooks @ react-dom.development.js:16141
updateFunctionComponent @ react-dom.development.js:20313
beginWork @ react-dom.development.js:22356
callCallback @ react-dom.development.js:4157
invokeGuardedCallbackDev @ react-dom.development.js:4206
invokeGuardedCallback @ react-dom.development.js:4270
beginWork$1 @ react-dom.development.js:27243
performUnitOfWork @ react-dom.development.js:26392
workLoopSync @ react-dom.development.js:26303
renderRootSync @ react-dom.development.js:26271
recoverFromConcurrentError @ react-dom.development.js:25689
performConcurrentWorkOnRoot @ react-dom.development.js:25589
workLoop @ scheduler.development.js:266
flushWork @ scheduler.development.js:239
performWorkUntilDeadline @ scheduler.development.js:533
lifecycle.tsx:75 erroring: getDerivedStateFromError
lifecycle.tsx:30 mounting/updating:getDerivedStateFromProps
lifecycle.tsx:36 updating: shouldComponentUpdate {"value":2} {"hasError":true}
lifecycle.tsx:50 mounting/updating:render true
lifecycle.tsx:45 updating: getSnapshotBeforeUpdate
lifecycle.tsx:69 updating: componentDidUpdate
react_devtools_backend.js:3973 The above error occurred in the <ChildComp> component:

    at ChildComp (http://localhost:3000/static/js/bundle.js:286:13)
    at LifeCycleClass (http://localhost:3000/static/js/bundle.js:303:5)
    at div
    at App (http://localhost:3000/static/js/bundle.js:88:90)

React will try to recreate this component tree from scratch using the error boundary you provided, LifeCycleClass.
overrideMethod @ react_devtools_backend.js:3973
logCapturedError @ react-dom.development.js:18525
callback @ react-dom.development.js:18593
callCallback @ react-dom.development.js:13092
commitUpdateQueue @ react-dom.development.js:13113
commitLayoutEffectOnFiber @ react-dom.development.js:23177
commitLayoutMountEffects_complete @ react-dom.development.js:24461
commitLayoutEffects_begin @ react-dom.development.js:24447
commitLayoutEffects @ react-dom.development.js:24385
commitRootImpl @ react-dom.development.js:26651
commitRoot @ react-dom.development.js:26517
finishConcurrentRender @ react-dom.development.js:25731
performConcurrentWorkOnRoot @ react-dom.development.js:25648
workLoop @ scheduler.development.js:266
flushWork @ scheduler.development.js:239
performWorkUntilDeadline @ scheduler.development.js:533
lifecycle.tsx:79 erroring: componentDidCatch
```

### 问题解决

### 参考文档

## 6 input 组件老是报受控非受控的异常(20220427)

### 问题描述

在 jest 单测时老是报这个...为什么会有这个异常

```tsx
  console.error
    Warning: A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components
        at input
        at div
        at Input (C:\Learning\search-qq\src\components\Input.tsx:25:3)
```

### 问题解决

### 参考文档
