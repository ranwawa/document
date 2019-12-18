## 21.1 概念
什么是修饰器
- 修饰器是一个函数
- 用来修改类的行为

注意事项
- 修饰器是编译时执行的函数

修饰器为什么无法修饰函数
- 因为函数声明和定义是会提升的
- 会导致修饰失败

## 21.2 类的修饰
语法
- 类上方`@`跟一个方法名
- 接收当前类为参数
```javascript
function testable(target) {
  target.test = true;
  target.prototype = false;
}

@testable
class A {}
var a = new A();
console.log(A.test, a.test); // =>
```

## 21.3 属性的修饰
语法
- 属性上`@`跟一个方法
- 方法接收三个参数(通过babel官网转码在chorme里面测试,只接收一个属性,里面包含很多信息)
  - 目标对象
  - 属性名
  - 对象描述符
- 返回对象描述符

多个修饰器
- 从上到下进入修饰器
- 从下往上执行修饰器

```javascript
function test(a) {
  console.log(a);
  return function(target, key, descriptor) {
    console.log(target);
    console.log(a);
    return descriptor;
  }
}

class A {
  @test(1)
  @test(2)
  say() {
    console.log('ranwawa');
  }
}
new A().say(); // =>
```

## 21.4 修饰器的应用场景
这几个知道用法就行,暂时深究貌似也只能搞个好像懂了,还是得在项目中运用两下才能搞透,所以详细的笔记就省略了
- 自动发布事件
- Mixin
- Trait

## 21.5 库
记个名字,方便后面查阅`core-decorators.js`

这两天在看`修言`的设计模式,其中在装饰器模式这一节里面就强烈推荐去看这个库的源代码,好吧.以后一定去看.暂时先看VUE和Lodash的源码