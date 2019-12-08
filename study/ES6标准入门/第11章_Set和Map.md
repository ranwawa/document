## 11.1 Set
什么是Set
- 类似于数组,但成员的值是惟一的

实例化Set的2个参数
- 数组
- 类数组

1个属性
- Set.prototype.size: 元素个数

4个和元素相关的方法
- add(val): 添加一个元素
- delete(val): 删除一个元素
- has(val): 判断一个元素是否存在
- clear(): 清空所有元素

```
Array.from(new Set([1, 1, 2, 3])); // =>
```
4个和遍历相关的方法
- keys()
- values()
- entries()
- forEach

```
var set = new Set(['a', 'b', 'c', 'd']);
for(var o of set.entries()) {
  console.log(o); // =>
}

Set.prototype[Symbol.iterator] === Set.prototype.values; // =>
```
```
var a = new Set([1, 2, 3]);
var b = new Set([2, 3, 4]);

new Set(...a, ...b); // =>
new Set(a.filter(ele => b.has(ele))); // =>
new Set(a.filter(ele => !b.has(ele))); // =>
```

## 11.2 WeakSet
2个注意事项
- 所有成员只能是对象
- 对象的引用是弱引用
  - GC会直接回收所有WeakSet引用的对象
```
var ws = new WeakSet();
ws.add(1); // =>
```

只有3个方法
- add
- delete
- has

> 这个东西的应用场景是啥呢???

## 11.3 Map
什么是Map
- 是一种更完善的Hash结构
  - 键名支持对象
```
var map = new Map();
map
  .set(1, 'a')
  .set(2, 'b')
  .set(['a'], 'c')
  .set(['a'], 'd');
  
map.get(1); // =>
map.get('2'); // =>
map.get(['a']); // =>
```  
1个属性
- size: 元素个数

5个和元素相关的方法
- set(key, value): 添加元素
- get(key): 查询元素
- has(key): 元素是否存在 
- delete(key): 删除元素
- clear(): 清空所有元素

4个和遍历相关的方法
- keys()
- values()
- entries()
- forEach
```
var map = new Map();
map[Symbol.iterator] === map.entries();
map
  .set(1, 'a')
  .set(2, 'b');

[...map]; // =>
```

## 11.4 WeakMap

其语法和作用同WeakSet差不多,就不做笔记了