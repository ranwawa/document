## 10.1 Symbol基础
什么是Symbol
- Symbol是JavaScript里第7个基本类型
- 用于表示一个独一无二的值

为什么需要Symbol
- 就是产生一个惟一值嘛
- 其他编程语言都有比如UUID

语法
```
var s1 = Symbol(str);
```

两个注意事项:\
- 参数只是用来进行肉眼区分,对生成的惟一值没有影响
- 不能用于操作数进行运算
- 作为属性名不能用`.`点运算符

示例
```javascript
var s1 = Symbol();
var s2 = Symbol();
var s3 = Symbol('s')
s1 === s2; // =>

"your symbol is" + s3; // =>
s3.toString(); // =>
```
```javascript
var s = new Symbol();
var a = {};
a.s = 2;
a[s] = 1;
a['s'] = 3;
console.log(a.s, a[s]); // =>
```
 
## 10.2 Symbol的遍历
对象上的Symbol属性只能通过2个方法遍历得到
- Object.getOwnPropertySymbols(obj)
- Reflect.ownKeys(obj)
```javascript
var s = Symbol('2');
var o = {};
o[s] = 1;
o.s = 2;
Object.keys(o); // =>
Object.getOwnPropertyNames(o); // =>
Object.getOwnPropertySymbols(o); // =>
Reflect.ownKeys(o); // =>
```

## 10.3 Symbol的查找
声明了一个Symbol后,如何找到他呢,就要通过下面这2个方法了
- Symbol.for(str): 如果有,就取之前的,没有就创建
- Symbol.keyFor(Symbol): 同上,只不过取出来的只有str部分

注意和Symbol的区别
- 后者永远会生成新的惟一值
```javascript
var s1 = Symbol('s');
var s2 = Symbol('s');
var s3 = Symbol.for('s');
var s4 = Symbol.for('s');

console.log(s1 === s1, s1 === s2, s3 === s4); // =>
Symbol.keyFor(s1); // =>
Symbol.keyFor(s3); // =>
```

## 10.4 11个内置Symbol
这些内置Symbol的作用,就和toString方法一样
- 可以通过重写toString方法改变对象转字符串的默认行为
- 也可以通过重写内容的Symbol改变一些方法的默认行为

但是感觉这个的适用场景非常少,所以就不详细做笔记和阅读了.只做一个表格,方便以后查,具体的还是看书或者阮一峰的博客吧

|Symbol|对应改变的内置方法|
|:-:|:-:|
|Symbol.hasInstance|instanceof|
|Symbol.isConcatSpreadable|Array.prototype.contact|
|Symbol.species|构造函数返回值|
|Symbol.match|String.prototype.match|
|Symbol.replace|String.prototype.replace|
|Symbol.search|String.prototype.search|
|Symbol.split|String.prototype.split|
|Symbol.iterator|设置对象的默认遍历器方法|
|Symbol.toPrimitive|对象转原始类型时调用|
|Symbol.toStringTag|String.prototype.toString|
|Symbol.unscopables|with|













