注意:
- 在浏览器的无痕模式下进行测试

### toString & typeOf

优先使用typeOf

```javascript 1.5
var toString = Object.prototype.toString;
var obj = {};
var i = 1;
console.time('toString'); // => 86ms
while(++i < 12345678){
  toString.call(obj);
}
console.timeEnd('toString');

i = 1;
console.time('typeof');
while(++i < 12345678){
  typeof obj;
}
console.timeEnd('typeof'); // => 31ms
```

### push & arr[i]

<!-- TODO 第10行去掉后,速度会快很多,是为啥 -->
优先使用push

```
var arr = [];
var i = -1;
console.time('push'); // => 217ms
while(++i < 12345678){
  arr.push(i);
}
console.timeEnd('push');

i = -1;
arr = []; 
console.time('arr[i]');
while(++i < 12345678){
  arr[i] = i;
}
console.timeEnd('arr[i]'); // => 255ms
```

### while & for

优先使用while

```
var i = -1;
console.time('while'); // => 32ms
while(++i < 12345678){

}
console.timeEnd('while');

i = -1;
console.time('for');
for(;i < 12345678; i++){
  arr[i] = i;
}
console.timeEnd('for'); // => 151ms
```

### forEach & for in

优先使用forEach

```javascript
var arr = 'a'.repeat(1234567).split('');

console.time('forEach');
Object.keys(arr).forEach(function(key) {
});
console.timeEnd('forEach'); // => 226ms

console.time('for in');
var key;
for (key in arr) {
}
console.timeEnd('for in'); // => 242ms
```

### forEach & for of

优先使用for Of

```javascript
var arr = 'a'.repeat(1234567).split('');

console.time('forEach');
Object.values(arr).forEach(function(val) {
});
console.timeEnd('forEach'); // => 27ms

console.time('for of');
var val;
for (val of arr) {
}
console.timeEnd('for of'); // => 19ms
```

### isNaN & !==

优先使用!==,毕竟少一次提取运算

```javascript 1.5
var isNaN = Number.isNaN;
var times = 1234567890;
var nan = 1 / 0;

console.time('isNaN');
while (--times) {
  isNaN(nan);
}
console.timeEnd('isNaN'); // 9668

times = 1234567890;
console.time('eq');
while (--times) {
  nan !== nan;
}
console.timeEnd('eq'); // 9661
```

### >>0 & >>0 & parseInt

优先使用+,缺点是无法识别的会转换成NaN

其次是>>>

再次是>>,这两个的好处是,无法识别的会转换成0

最后才是parseInt

```
var times = 123456789;
var a = '1.2';
var b = 0;

console.time('>>');
while (--times) {
  b = a >> 0;
}
console.timeEnd('>>'); // 265

times = 123456789;
console.time('parseInt');
while (--times) {
  b = parseInt(a, 10);
}
console.timeEnd('parseInt'); // 8905

times = 123456789;
console.time('+');
while (--times) {
  b = (+a);
}
console.timeEnd('+'); // 242
```

