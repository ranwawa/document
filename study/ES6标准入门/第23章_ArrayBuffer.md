什么是二进制数组
- 以数组的方法统一处理二进制数据
- 所以叫二进制数组
- 包含
  - ArrayBuffer
  - TypedArray
  - DataView

为什么会出现二进制数组
- 因为WebGL项目的需求
  - JS引擎与显卡之间会有大量数据交互
  - 传统的文本方式交换数据,JS引擎和显示都要分别进行转换,效率非常非常低
  - 所以需要一种以二进制类型交换数据的方式

## 23.1 ArrayBuffer

啥是ArrayBuffer
- 用于存储二制制数据的
- 一段内存

2种ArrayBuffer的限制
- 无法直接读写
- 只能通过视图进行读写
  - TypedArray
  - DataView

语法
- `new ArrayBuffer(length)`
  - length 分配的内存字节长度
  - 每个字节的默认值都是0

如何操作内存
- 创建内存区域
- 创建视图对象
- 操作

1个原型属性
- byteLength: 获取内存区域字节长度

1个原型方法
- slice: 将内存区域的一部分,复制生成一个新的ArrayBuffer

1个静态方法
- isView: 判断参数是否为ArrayBuffer的视图实例

```javascript
const buffer = new ArrayBuffer(32); // 分配32字节的内存空间
const dv = new DataView(buffer); // 创建视图
console.log(dv.getInt8(0)); // 操作内存 => 0
console.log(dv.getUint8(0)); // => 0

console.log(buffer.byteLength); // => 32

const newBuffer = buffer.slice(0, 3);
console.log(newBuffer.byteLength); // => 3

console.log(ArrayBuffer.isView(buffer)); // => false
console.log(ArrayBuffer.isView(dv)); // => true
```

## 23.2 TypeArray

### 23.2.1 概述
啥是视图
- ArrayBuffer是内存空间,可以存放多种类型的数据
- 同一段内存中,不同的数据有不同的解读方式
- 解读方式就叫视图

2种视图形式
- TypedArray
- DataView

9种TypeArray类型
- Int8Array
  - 有符号的8位整数
- Uint8Array
  - 无符号的8位整数,后面类推
- Int16Array
- Uint16Array
- Int32Array
- Uint32Array
- Float32Array
- Float64Array
- Uint8ClampedArray
  - 无符号8位整数
  - 和Uint8Array的区别在于溢出算法的区别

视图生成的数组和原生数组的4个区别
- TypedArray数组的所有成员数据类型一致
  - 原始数组可以有多种类型
- TypedArray数组的成员是连续的,不会有空位
  - new Array(3)就会生成空位的数组
  - delete后也会生成空位的数组
- TypedArray默认值是0
  - 原始数组默认是空
- TypedArray本身不存储数据,只是操作数据.数据是存储在底层的ArrayBuffer里面

### 23.2.2 构造函数

语法
- `TypedArray(buffer, biteOffset = 0, length?)`

TypedArray
- 可以替换成上面9种类型中的任意一种

buffer
- 视图对应的底层buffer对象
- 可以是ArrayBuffer实例
- 可以直接是数字
- 也可以是typedArray
- 还可以是类数组

biteOffset
- 视图开始的字节号,默认到0

length
- 视图包含的数据个数,默认到末尾

注意
- 同一个ArrayBuffer上可以建立多个视图
- 内存发生生变化后,同一个内存上的视图都会自动发生变化

```
const buffer = new ArrayBuffer(20); // => 20
const int8 = new Int8Array(buffer); // => 20
const int32 = new Int32Array(buffer); // => 20
const float64 = new Float64Array(128); // => 1024
const int16 = new Int16Array(float64); // => 256
const int16_2 = new Int16Array(128); // => 256
const uInt8 = new Uint8Array([1, 2, 3]); // => 3
const float32 = new Uint32Array([1, 2, 3]); // => 12

console.log(buffer.byteLength);
console.log(int8.byteLength);
console.log(int32.byteLength);
console.log(float64.byteLength);
console.log(int16.byteLength);
console.log(int16_2.byteLength);
console.log(uInt8.byteLength);
console.log(float32.byteLength);
```

### 23.2.3 字节序

啥是字节序
- 数值在内存中的表示方式

啥是小端字节序
- 重要的字节排在后面的内存地址
- 不重要的字节排在前面的内存地址
- 实际还是没搞懂

### 23.2.4 字符串与ArrayBuffer的转换

逻辑
- 首先将字符串转换成charCode
- 再将charCode转换成Int16Array
- 最后将charCode放进Int16Array实例里面

原理
- JS内部是采用的UTF-16编码的

```javascript
function str2ab(str = '') {
  if(!str) { return; };
  const ab = new ArrayBuffer(str.length * 2); // 1个汉字是2个字节
  const int16 = new Uint16Array(ab);
  const { length } = str;
  for (let i = 0; i < length; i+=1) {
    int16[i] = str.charCodeAt(i);
  }
  return int16;
}

function ab2str(ab) {
  return String.fromCharCode.apply(null, new Uint16Array(ab));
}

console.log(str2ab('1')); // => 49
console.log(str2ab('a')); // => 97
```

### 23.2.5 相关属性方法

1个静态属性
- BYTES_PER_ELEMENT: 当前数据类型占据的字节数

4个原型属性
- buffer: 返回整段区域对应的buffer
- byteLength: 返回占据的内存长度,单位是字节
- byteOffset: 当前TypedArray从底层ArrayBuffer的哪个字节开始
- length: 当前TypedArray包含多少个元素

3个原型函数
- set(): 将一段内存完全复制到另一段内存
- subarray(): 将TypedArray的一部分复制成新的视图
- slice(): 返回指定位置的一个新的视图

2个静态方法
- of(): 将参数转换为TypedArray实例
- from(): 将一个可遍历的数据结构转换成TypedArray实例

```javascript
// 以下4种方法等价
new Uint8Array([1, 2, 3]);
Uint8Array.of(1, 2, 3);
Uint8Array.from([1, 2, 3]);
const int8 = new Uint8Array(3);
int8[0] = 1;
int8[1] = 2;
int8[2] = 3;
```

## 23.3 DataView

为啥需要DataView
- TypedArray只有9种,还是使用限制的
  - http响应的多种数据格式就可以直接用DataView
  - TypedArray默认采用的是小端字节序,而DataView可以自己指定字节序

## 23.4 5种应用

### 23.4.1 ajax

如果知道响应的是哪种类型,就可以直接用指定类型接收

如果不太清楚返回的是哪种类型,可以用blob接收响应,然后再转换成ArrayBuffer

### 23.4.2 canvas

canvas导出的数据类型就是Uint8CalmedArray

### 23.4.3 fetch

### 23.4.4 websocket

### 23.4.5 file

## todo
### 23.2.3 深入搞懂字节序
