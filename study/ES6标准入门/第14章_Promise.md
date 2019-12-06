## 14.1 概念
什么是Promise
- 是一个对象
- 用于处理异步操作的结果

Promise的3个状态
- Pending: 进行中
- Fulfilled: 已成功
- Rejected: 已失败

Promise的2个特点
- 对象的状态不受外界影响
- 状态发生改变后,就不会再变

## 14.2 基础用法
- 状态改变是在事件本轮循环结束时执行
- setTimeout是在下一次循环开始时执行
- 如果resolve的内容是一个Promise,则内部Promise的状态决定外层Promise的状态
  - reject始终执行catch
```
var p = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => console.log(2), 0);
  resolve(3);
})
p.then(r => console.log(r));
console.log(4); // =>
```
```
var p1 = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    reject('fail'); // 如果换成reject会改变打印结果
    console.log(3);
  }, 0)
});
var p2 = new Promise((resolve, reject) => {
  console.log(4);
  setTimeout(() => {
    console.log(5);
    resolve(p1); // 如果换成reject始终执行catch
    console.log(6);
  }, 0)
});
setTimeout(() => {
  console.log(7);
  p2
    .then(r => console.log(8))
    .catch(e => console.log(9)); // =>
}, 0);
```
## 14.3 Promise.prototype.then
then方法默认返回一个then
```
var p = new Promise((resolve) => resolve(1));
console.log(2);
p.then((r) => {
 console.log(r, 3);
}).then((r) => {
 console.log(r, 4);
}).then((r) => {
  console.log(r, 5);
  return Promise.resolve(6);
}).then((r) => {
  console.log(r, 7);
  return Promise.reject(8);
}).then((r) => {
  console.log(r, 9);
  return Promise.reject(10);
});
console.log(11); // =>
```

## 14.4 Promise.prototype.catch
指定发生错误时执行的函数
- catch方法和then一样,也默认返回一个then
```
var p = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
  reject(3);
})
console.log(4);
p.then((r) => {
  console.log(r, 5);
  return Promise.reject(6);
}).catch((e) => {
  console.log(e, 7);
  e = a;
}).catch((e) => {
  console.log(e, 8);
}).then((e) => {
  console.log(e, 9);
}).catch((e) => {
  console.log(e, 10);
});
console.log(11); // =>
```

## 14.5 Promise.resolve
就是一个静态方法
- 接受一个参数
  - 如果是Promise,原封不动的返回
  - 如果是thenable对象,执行对象上的then方法
  - 如果是其他的对象,则创建一个新的Promise,resolve这个对象
- 返回一个Promise实例
  - 状态为Resolved

## 14.6 Promise.reject
同上,返回一个Rejected的Promise
- 只是始终把参数当成一个值,传给后续的catch方法捕获

## 14.7 Promise.all
用于将多个Promise实例包装成一个实例
- 只要有一个失败就失败执行catch
- 3个全部成功才执行then
- 如果实例成员中自己实现了catch,则不会触发all的catch
```
var p1 = new Promise((resolve) => resolve(1))
  .then(r => 2)
  .then(r => 3);
var p2 = new Promise((resolve, reject) => reject(4))
  .then(r => 5)
  .then(r => 6)
  .catch(e => 8); // 不要这一行看看输出啥结果
Promise
  .all([p1, p2])
  .then(r => console.log(r))
  .catch(e => console.log(e)); // =>
```
## 14.8 Promise.race
同all一样,将多个Promise实例包装成一个实例
- 只要有一个成功,则执行then
- 其他表现和all一样
```
var p1 = new Promise((resolve) => resolve(1))
  .then(r => 2)
  .then(r => 3);
var p2 = new Promise((resolve, reject) => reject(4))
  .then(r => 5)
  .then(r => 6)
  .catch(e => 8); // 不要这一行看看输出啥结果
Promise
  .race([p1, p2])
  .then(r => console.log(r))
  .catch(e => console.log(e)); // =>
```