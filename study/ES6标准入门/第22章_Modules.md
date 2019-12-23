## 22.1 export
export具体是啥意思
- export规定的对外接口,必须与模块内部的变量建立一一对应的联系

为啥export/import必须出现在顶层代码
- ES6模块化的设计思想是静态化,在编译时就能确定模块间的依赖
- 所以出现在条件语句等块级代码内就会报错
  - 因为这些代码都是运行时才会执行到的,和前一条就产生冲突了
  
export语法
- export 变量名
- export 变量名 as 别名
- export default 默认名

```javascript
export function f() { }
export default f;
export {
  f as func,
}

// bad
export f; // => 为啥会报错?因为f相当于是变量指向的一个值,这里是直接输出一个值的效果,外部引入时就无法一一对应
if (typeof f === 'function') {
  export const a = 5;
}
```

## 22.2 import
为啥import会有提升效果
- import是在编译时执行的
- 其他代码是运行时执行,当然就跑前面去啦

import的注意事项
- 无法使用表达式和变量等只能在运行时才能得到结果的语法结构
- import会执行所加载的模块
- import同一个模块多次,只会执行一次(即import是单例模式)
- 对import的变量赋值会报错

```javascript
import a from 'modules';

// bad
if (a === 1) {
  import b from 'modules';
}
a = 2;
```

import的语法
- import {接口} from 模块
- import * 导入所有接口 from 模块
- import {接口 as 别名} from 模块
- import 默认接口 from 模块

export+import的复合写法
- 从一个模块导入,然后直接导出
  - 可用于模块的继承
  - 以及集中管理多个分散的模块
- export {接口} from 模块

## 22.3 import函数
为什么会出现import函数
- 因为是编译时运行,无法像commonjs那样动态加载模块

import函数的语法
- 语法和import关键字一样
- 只是可以应用于块级作用域中

import函数的2个注意事项
- 返回的是一个Promise对象
- 与所加载的模块没有静态联系,即无法共用同一个变量

## 22.4 浏览器应用
如何在浏览器中使用import
- 引入js时,加上`type=module`

```html
<script type="module" src="a.js">
import b from 'b.js'
</script>
```
## 22.5 循环加载

### es6循环加载

a.js
```javascript
import b from 'b.js'
console.log('a.js');
console.log(b); 
export default 1;
```

b.js
```javascript
import a from 'a.js';
console.log('b.js');
console.log(a);
export default 2;
```

运行模块a,输出啥? // =>


### commonjs循环加载

## 22.6 node应用