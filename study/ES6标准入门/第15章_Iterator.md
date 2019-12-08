## 15.1 概念
什么是Iterator
- 是一个接口
- 为不同的数据结构提供统一的访问机制
- 实现了Iterator接口的数据结构,都可以进行遍历操作

Iterator的3个作用
- 为各种数据接口提供统一的访问机制
- 使数据结构的成员能够按某种顺序排列
- 可以应用for of循环

Iterator的工作原理
- 会创建一个指针对象
- 调用时,会执行指针对象上的next方法
  - 返回一个值
  - 同时自动将指针移到下一个实例上
- 一直调用就一直执行,直到数据结构的结束位置

## 15.2 默认的Iterator接口
如何部署Iterator接口
- 在数据结构的Symbol.iterator属性上添加即可

```javascript
var obj = {};
obj[Symbol.iterator] = () => {
  return {
    next() {
      return {
        value: 1,
        done: (Math.random() * 10) < 5,
      }
    }
  }
}
for (let value of obj) {
  console.log(value); // =>
} 
```
```javascript
function Obj(val) {
  this.value = val;
  this.next = null;
}
Obj.prototype[Symbol.iterator] = function() {
  var iterator = { next };
  var that = this;
  function next() {
    var res = {};
    if(that) {
      res = {
        value: that.value,
        done: false,
      };
      that = that.next;
    } else {
      res = {
        value: undefined,
        done: true,
      };
    }
    return res;
  }
  return iterator;
}
var a = new Obj(1);
var b = new Obj(2);
var c = new Obj(3);

a.next = b;
b.next = c;
for(var v of a) {
  console.log(v); // =>
}
```

7个原生具有Iterator接口的数据结构
- Array
- Map
- Set
- String
- 类数组
- arguments参数
- NodeList

调用遍历器的next方法,会返回对应的值
- 直到done为false的时候停止
```javascript
var arr = [1, 2];
var iter = arr[Symbol.iterator]();
iter.next(); // =>
iter.next(); // =>
iter.next(); // =>
```
类数组可以直接使用数组的Iterator接口
- 只是数组的Ierator接口只遍历数字属性
```javascript
var obj = {
  1: 'a',
  2: 'b',
  length: 2,
  name: 'ranwawa',
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
}
for(let value of obj) {
  console.log(value); // =>
}
```

## 15.3 字符串的Iterator接口
字符串是类数组,所以也默认具有Iterator接口
```javascript
// var str = 'hi'; // 包装对象无法添加新的属性
var str = new String('hi');
console.log([...str]); // =>
str[Symbol.iterator] = function() {
  return {
    _flag: true,
    next() {
      if(this._flag) {
        this._flag = false; // this是方法调用模式,指向当前字符串
        return {
          value: 'over',
          done: false,
        }
      } else {
        return {done: true}
      }
    }
  };
};
console.log([...str]); // =>
console.log(str); // =>
```

## 15.4 Iterator的应用场景
实际了Iterator接口的数据结构,可应用于以下场景
- while循环
- 解构赋值
  - 这就是为啥Map和Set可以解构赋值的原理
- 扩展运算符
- yield*
- 任何接受数组作为参数的场景
  - for ... of
  - Array.from()
  - Map()
  - Set()
  - Promise.all()
  
## 15.5 for of循环
for of循环的原理
- 实际是自动执行数据结构上的Iterator接口

for of和for in的3个区别
- 遍历地方的差异
  - for in 循环键名
  - for of 循环键值
- for of调用遍历器接口
  - 在数组上只返回数字索引
- 普通对象上的场景差异
  - for in 可以直接遍历
  - for of 需要添加遍历器接口后才可以遍历
  
 ```javascript
var arr = [1, 2, 3, 4]; 
arr.name = 'ranwawa';
for (let key in arr) {
  console.log(key); // =>
}

for (let val of arr) {
  console.log(val); // =>
}
 ``` 
  
