> 发现这个Proxy和Symbol的内置常量差不多,都是针对原生的一些方法进行拦截编程,修改原生方法的默认行为,可我实在发现不了适用场景,就和上一章的Set和Map一样,感觉只是学了一堆新的概念,但派不上用场.可是VUE3却用PROXY来实现了数据的双向监听绑定.同样的东西,在别人手里就能发挥这么大的作用,在我的手里却毫无用武之地,这种差距要怎样才能弥补呢?

## 12.1 概述
什么是proxy
- proxy是在目标对象上架设一个拦截层
- 对该对象的操作,都会先经过这个拦截层

语法
```
var proxy = new Proxy(target, handler);
```

示例
```
var obj = { age: 32 };
var proxy = new Proxy(obj, {
  get(target, property) {
    return 18;
  }
})
console.log(obj.age, proxy.age); // =>
```

## 12.2 13个可拦截的操作
和symbol的内置常量方法一样,记个索引,知道是拦截谁,具体的代码不一一复现了,有需求时再回来搞

|拦截方法|拦截目标|返回值
|:-:|:-:|:-:|
|get(target, key, receiver)|属性读取|想返回啥就返回啥|
|set(target, key, value, receiver)|属性设置|Boolean|
|has(target, key)|key in proxy|Boolean|
|deleteProperty(target, key)|delete proxy[key]|Boolean|
|ownKeys(target)|Object.getOwnPropertyNames(proxy)<br>Object.getOwnPropertySymbols(proxy)<br>Object.keys(proxy)|Array|
|getOwnPropertyDescriptor(target, key)|Object.getOwnPropertyDescribtor|属性的描述符对象|
|defineProperty(target, key, desc)|Object.defineProperty|Boolean|
|preventExtensions(target)|Object.preventExtensions|Boolean|
|getPrototypeOf(target)|Object.getPrototypeOf|Boolean|
|isExtensible(target)|Object.isExtensible|Boolean|
|setPrototypeOf(target, proto)|Object.setPrototypeOf|Boolean|
|apply(target, object, args)|proxy(), proxy.call(),proxy.apply()||
|construct(target, args)|new proxy||

## 12.3 Proxy.revocable
有什么用
- 也是创建一个代理
- 多了一个可撤回的功能
- 撤回后之前那个代理就无法访问了

```
var target = handler = {};
var { proxy, revoke } = Proxy.revocable(target, handler);
proxy.age = 18;
console.log(proxy.age, target.age); // =>
revoke()
console.log(target.age, proxy.age); // =>
```
## 12.4 this问题
Proxy拦截的时候,拦截对象的this是指向proxy而不是源对象
```
var target = {
  age() {
    return this === proxy;
  }
}
var proxy = new Proxy(target, {});
console.log(target.age()); // =>
console.log(proxy.age()); // =>
```
