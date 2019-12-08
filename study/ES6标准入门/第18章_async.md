## 18.1 概念
什么是async函数
- 操作异步的方法
- 是Generator的一个语法糖

async函数相对于Generator函数的4个优点
- async自带执行器
  - Generator需要co等执行器,或者手动执行next方法
- 更加语义化
  - async替代* await替代yield
- 适用性更广
  - generator需要的co执行器,只能跟Thunk函数或Promise对象
  - await后面可以跟任何东西
- 返回值是promise
  - generator返回是一个遍历器对象
  
## 18.2 语法
async函数返回一个promise对象,返回值作为resolve的参数
```javascript
var request = function () {
  console.log(1);
  return new Promise((resolve) => {
    console.log(2);
    setTimeout(() => {
      console.log(3);
      resolve(4);
    }, 1000);
    console.log(5);
  })
};

async function f() {
  console.log(6);
  var a = await request();
  console.log(7);
  return 8;
}

f().then(e => console.log(e));
```

### 18.2.1 await命令
await命令后面一般是一个Promise对象
- 如果不是,则会被转成一个立即resolve的Promise类似于Promise.resolve();

只要一个await语句后面的Promise变为reject,那么整个async函数都将中断执行

```javascript
async function f() {
  return await 123;
}
f().then(e => console.log(e)); // =>
```
```javascript
async function f() {
  await Promise.resolve(1);
  console.log(2);
  await Promise.reject(3); // 如果注释掉这句,会发生什么呢
  console.log(4);
  return 5;
}
f()
  .then(r => console.log(r))
  .catch(e => console.log(e));
```

### 18.2.2 错误处理
await后面的异步操作出错,则会被async函数的catch语句捕获
- 不仅仅是await后面的
- 整个async函数里面的异常都会被catch捕获
```javascript
async function f() {
  // throw new Error(1);
  await new Promise((resolve, reject) => {
    throw new Error(2);
  })
}
f()
  .then(r => console.log(r))
  .catch(e => console.log('catch', e));
```

## 18.3 注意事项
await命令最好是放在try catch块中
- 以防止某个await reject或异常后,后面的await无法执行

多个await如果不存在继发关系,最好是并发执行
- 通过Promise.all实现

```javascript
async function f() {
  // bad
  let a = await request();
  let b = await request();
  
  // good
  let [a, b] = await Promise.all([request(), request()]);
}
```

await命令只能放在async函数里面