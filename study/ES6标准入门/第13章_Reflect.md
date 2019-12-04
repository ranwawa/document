## 13.1 概述
Reflect是干什么的
- 是一个全局对象
- 将Object上属于语言内部的方法搬过来
- 把一些命令式的语法也搬过来
- 可以屏蔽掉Proxy的影响,直接返回原始对象
```
var a = {};
var proxy = new Proxy(a, {
  get(target, key) {
    console.log('---');
    target[key] = 2;
    return 5;
  }
})
proxy.age = 3;
console.log(a.age); // =>
console.log(proxy.age) // =>
console.log(Reflect.get(a, 'age')); // =>
console.log(Reflect.get(proxy, 'age')); // =>
```
## 13.2 13个静态方法
同前面两章一样,只记目录,脑子里面留个大概印象,详细的搁以后有项目需求时再来研究

|静态方法|对应的原始方法|
|:-:|:-:|
|Reflect.get(obj, key, receiver)|obj[key]|
|Reflect.set(obj, key, value, receiver)|obj[key] = value|
|Reflect.has(obj, key)|key in obj|
|Reflect.deleteProperty(obj, key)|delete obj[key]|
|Reflect.construct(obj, args)|new obj(args)|
|Reflect.getPrototypeOf(obj)|Object.getPrototypeOf()|
|Reflect.setPrototypeOf(obj, proto)|Object.setPrototypeOf(obj, proto)|
|Reflect.apply(func, this, args)|Function.prototype.apply.call(func, this, args)|
|Reflect.defineProperty(obj, key, attributes)|Object.defineProperty|
|Reflect.getOwnPropertyDescriptor(obj, key)|Object.getOwnPropertyDescriptor|
|Reflect.isExtensible(obj)|Object.isExtensible|
|Reflect.preventExtensions(obj)|Object.preventExtensions|
|Reflect.ownKeys(obj)|Object.getOwnPropertyNames,Object.getOwnPropertySymbols|

实现一个观察者模式
```
// 添加观察者
var queuedObservers = new Set();
var observe = func => queuedObservers.add(func);

function set(target, key, value) {
  var res = Reflect.set(target, key, value);
  queuedObservers.forEach(ele => ele());
  return res;
}
// 注册事件
var observeable = obj => new Proxy(obj, { set });

var a = {};

function print() {
  console.log('触发事件');
}
observe(print);
var proxy = observeable(a);

proxy.age = 3;
```
