## 16.1 概念 
什么是Generator
- 叫生成器
- ES6的一种异步解决方案
- 是一个状态机,内部封装了多个状态
- 是一个遍历器生成函数,可以依次访问内部状态

与普通函数区别
- 声明时function后面要跟一个`*`号
- 函数内部通过`yield`定义不同的状态
- 函数调用时
  - 函数本身并不执行
  - 返回的也不是函数运行结果
  - 而是返回的一个指针对象(见Iterator)

```javascript
function* f() {
  yield 1;
  yield 2;
  return 3;
}

var g = f();

console.log(g); // =>
g.next(); // =>
g.next(); // =>
g.next(); // =>
g.next(); // =>
```

### 16.1.1 yield表达式
指针对象next函数的工作原理
- 遇到yield就暂停执行,并将yield后面的值作为指针对象的value返回
- 再执行next,遇到下一条yield
- 如果没yield,则执行return,return后面的值作为指针对象的value值返回,并标记遍历结束
- 如果没有return,则undefined为指针对象的value值 ,并标记遍历结束
- 还要执行的话,就一直返回undefined和执行完毕

yield表达式的两个限制
- yield表达式只能放在Generator函数内
- yield表达式要和其他表达式一起使用时,必须放在括号里面

```javascript
function cb(a) {
  console.log(a);
}
function* f() {
  console.log(1);
  console.log(2 + (yield 2));
  console.log(3 + (yield));
  cb(yield 4); // 先暂停,再next的时候才会执行cb
  return 5;
}

var g = f();
console.log(g.next()); // =>
console.log(g.next()); // =>
console.log(g.next()); // =>
console.log(g.next()); // =>
```

### 16.1.2 与Iterator的关系
Generator函数本身就是一个遍历器生成函数,所以可以直接赋值给数据结构的Symbol.iterator属性
Generator函数执行后,返回一个遍历器对象,该对象本身也具有Symbol.iterator属性,指向自身

```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var func = gen();
func[Symbol.iterator]() === func; // =>

var obj = {};
obj[Symbol.iterator] = gen;
console.log(...obj); // =>
```

## 16.2 next方法的参数
yield语句总是返回undefined
通过给next里面传参数,可以指定上一条yield语句的返回值

```javascript
function* f(x) {
  var y = 2 * (yield (x + 1));
  var z = yield(y / 3);
  return (x + y + z);
}

var a = f(3);
console.log(a.next()); // =>
console.log(a.next()); // =>
console.log(a.next()); // =>

var b = f(3);
console.log(b.next(3)); // =>
console.log(b.next(3)); // =>
console.log(b.next(3)); // =>
```

## 16.3 for of循环
for of可以自动遍历Generator函数生成的遍历器对象,不用手动调用next方法
当next返回的指针对象done为ture时就会终止for of循环,且不包含done为true的对象

```javascript
function* f() {
  yield 1;
  yield 2;
  return 3;
}
for (let value of f()) {
  console.log(value);
}
```

## 16.4 Generator.prototype.throw
throw函数的特点
- 通过throw方法,可以在函数体外抛出错误,在Generator函数体内捕获
- Generator函数体内捕获异常后,会执行下一条yield表达式
- 如果Generator没有try catch语句,则由外部的try catch捕获

Generator函数体内抛出错误
- 会终止遍历,以后再访问next,永远返回value:undefined, done: true
- 会由外部try catch捕获

```javascript
function* gen() {
  try {
    yield 1;
  } catch(e) {
    console.log('内部' + e);
  }
}
var i = gen();
try {
i.next();
i.throw(2);
i.throw(3);
} catch (e) {
  console.log('外部' + e);
}
```
```javascript
function* gen() {
 yield 1; 
 try {
   yield 2;
 } catch(e) {
   console.log('内部' + e);
 }
 yield 5;
 throw new Error(6);
 yield 7;
 return 8;
}

var g = gen();
try {
  console.log(g.next());
  g.next(); // 如果不加这一句,则会由外部捕获
  g.throw(0);
  console.log(g.next());
  console.log(g.next());
  console.log(g.next());
} catch (e) {
   console.log('外部' + e);
  console.log(g.next());
  console.log(g.next());
}
```

## 16.5 Generator.prototype.return
可以返回指定的值,并立即终止Generator函数的执行
如果Generator函数体内有finally代码,则return会推迟到finally之后执行
```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
var g = gen();
g.next(); // =>
g.return(4); // =>
g.next(); // =>
```
```javascript
function* gen() {
  yield 1;
  try {
    yield 2;
  } finally {
    yield 3;
  }
  yield 4;
}
var g = gen();
g.next();
g.next(); // 如果没有这一句,输出结果会有很大差别
g.return(5);
g.next();
```

## 16.6 yield*
yield*是干什么的
- 是for of的简写形式
- 任何具有Iterator接口的数据结构都可以应用yield*

yield*的应用场景
- 在一个Generator函数内,调用另外一个Generator函数就必须使用yield*
- 否则内部Generator函数没有效果

```javascript
function* f1() {
  yield 1;
  yield 2;
}
function* f2() {
  yield 3;
  f1();
  yield 4;
  yield f1();
  yield 5;
  yield* f1();
}
var f = f2();
f.next(); // =>
f.next(); // =>
f.next(); // =>
f.next(); // =>
f.next(); // =>
```
```javascript
function* f() {
  yield 'hello';
  yield* 'hello';
}
var g = f();
g.next(); // =>
g.next(); // =>
g.next(); // =>
```

## 16.6 Generator函数
Generator函数返回一个遍历器对象,该对象继承Generator函数的prototype

Generator和构造函数的2个区别
- Generator始终返回遍历器函数
  - 而构造函数没有返回值时,会返回this
- Generator无法和new一起使用,会报错
  - 构造函数必须和new一起使用
  
```javascript
function* f() { 
}
f.prototype.name = 'ranwawa';
var g = f();
g.name; // =>
```

## 16.7 协程
什么是协程
- 是一种程序运行的方式
- 多个线程或函数可以并行执行
- 但是只有一个线程/函数处于运行状态
- 线程/函数之间可以交换控制权

Generator在协程中的应用
- 可以将多个任务写在Generator函数
- 任务之间使用yield交换控制权