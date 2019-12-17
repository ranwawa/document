> 这一章要着重记一下面向对象型的继承class和传统的基于原型继承的区别,因为最近才比较清楚的掌握基于原型的继承,现在又要回到面向对象的继承.必须充分记录他们之间的差异点,才有助于理清思路

## 19.1 简介

class的本质是什么?
- 是构造函数的语法糖
- 其实质还是基于原型实现的继承

为什么会有class
- 以面向对象的方式进行编码
- 和主流面向对象语言保持一致

```javascript
// 基于es5的原型继承
// 构造函数/父类
function Func() {
  this.a = 1; // 实例属性
  var b = 2; // 私有属性
}
Func.c = 3; // 静态属性
Func.prototype = {
  d: 4, // 继承属性
  say() {}, // 继承方法
}

var f = new Func();
f.__proto === Func.prototype;
f.constructor === Func === Func.prototype.constructor;
console.log(f.a, f.b, f.c, f.d); // =>
console.log(Func.a, Func.b, Func.c, Func.d); // =>
```
```javascript
// 构造函数父类
class Func {
  a = 1; // 实例属性
  #b = 2; // 私有属性
  static c = 3; // 静态属性
  say() {} // 继承方法
}
Func.prototype.d = 3; // 继承属性
var f = new Func();
f.__proto === Func.prototype;
f.constructor === Func === Func.prototype.constructor;
console.log(f.a, f.b, f.c, f.d); // =>
console.log(Func.a, Func.b, Func.c, Func.d); // =>
```

构造函数和类的相同点
- 本身都是函数
- 都是通过new进行实例化

构造函数和类的区别
- 类只能通过new进行调用,直接调用会报错
  - 构造函数可以直接调用 
- 类内部定义的继承方法,是不可枚举的
  - 构造函数原型上的继承方法是可以枚举的
- 类的声明不会提升
  - 而函数声明会提升
  
```javascript
function F() { }
class C {}
F(); // =>
C(); // =>
```
```javascript
function F() { }
F.prototype.say = function() { };
class C {
  say() {}
}
Object.keys(C); // =>
Object.keys(C.prototype); // =>
Object.keys(F.prototype); // =>
```
```javascript
var f = new F(); // =>
var c = new C(); // =>
function F() { }
class C {}
```

## 19.2 属性,方法
- 私有的
- 静态的
- 继承的
- 实例的

## 19.3 this的指向
类的方法内部如果包含this
- 默认指向类的实例

如果通过函数调用
- 则this为undefined

```javascript
class Logger {
  constructor(name = 'ranwawa') {
    this.name = 'ranwawa';
  }
  log() {
    console.log(this.name);
  }
}

var logger = new Logger();
logger.log(); // =>
var { log } = logger;
log(); // =>
```
让this始终指向实例的3种方法
- 使用箭头函数
- 使用bind方法
- 使用Proxy拦截

## 19.4 new.target属性
name属性
- 和函数的name属性一样,显示类名

new是啥
- 构造函数生成实例里面可以调用的一个命令

new.target是啥
- 返回new命令所使用的构造函数

new.target的作用是什么
- 如果函数是new以外的方式调用的,则new.target为undefined
- 子类继承父类时,new.target返回子类
```javascript
function Person() {
  console.log(new.target);
}

Person(); // =>
new Person(); // =>

// 模拟抽象类
class Shape {
  constructor() {
    if(new.target === Shape) {
      throw new Error('抽象类禁止实例化');
    }
  }
}
```

## 19.5 继承

### 19.5.1 extends
```javascript
// 实现继承
class Father{}
class Son extends Father {}

// 判断继承关系
Object.getPrototypeOf(Son) === Father; // =>
```

### 19.5.2 super
super是干什么的
- 可以做为函数调用,是指父类的构造函数
  - 必须且只能在子类的构造函数的首行调用super
  - 返回的是子类的实例,即super内部的this指向子类
  - super里面的this是指向子类的实例
- 可以做为对象调用
  - 在普通方法中,指向父类的原型对象
  - 在静态方法中,指向父类  
  - 通过super调用父类方法时,super会绑定子类的this
```javascript
class A {
  a = 1;
  c = 3;
  constructor() {
    console.log(this.a, this.b, this.c, new.target);
  }
  
}
class B extends A {
  a = 2;
  b = 2;
  constructor() {
    super();
    console.log(this.a, this.b, this.c, new.target);
  }
}
class C extends A {
  constructor(){} // =>
}

var a = new A();
var b = new B();

```

```javascript
class A {
  name = 'ranwawa';
  
  static say() {
    console.log('hello');
  }
}

class B extends A{
  say() {
    // return super; // =>
    console.log(super.name, super.say);
  }
  static say () {
    console.log(super.name, super.say);
  }
}

var b = new B();
B.say(); // =>
b.say(); // =>
```

```javascript
class A {
  constructor() {
    this.name = 'ranwawa';
  }
  say() {
    console.log(this.name);
  }
}
class B extends A{
  constructor() {
    super();
    this.name = 'wangqingwa';
  }
  say() {
    super.say();
  }
}
var b = new B();
b.say(); // =>
```

### 19.5.3 类的原型
```javascript
class A {}
class B extends A {}
var b = new B();
function constructor() {
  console.log(123);
}
B.__proto__ === A; // =>
B.prototype.constructor === B; // =>
B.prototype.__proto__ === A.rototype; // =>
b.constructor === B; // =>
b.__proto__ === B.prototype; // =>
```