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