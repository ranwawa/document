### 1. (已解决)无法识别webpack别名了(20210402)

**业务背景**

最近在一个老项目里面使用js-doc,通过一个单独的文件引入类型.

Recently, I added  js-doc comments in an old project, and defined some types in a seperatefile for reference by other files

```javascript
// src/js-doc.js
/**
 * Order Info
 * @typedef {Object} Order
 * @property {number} id
 * @property {string} phone
 */
export {}
```

```javascript
// src/pages/order/index.js
/** @type {import('../../store/js-doc').Order} */
```

但是这种相对路径写起来很麻烦,后来突然一次发现可以用webpack别名

But this kind of relative path is very troublesome o write, and then suddenly i found out at webpack aliases can be used

```javascript
/** @type {import('@/store/js-doc').Order} */
```

但是今天突然这个别名就不生效了,相对路径还是可以正常工作

**错误截图**

![image-20210402184841954](/Users/ranwawa/Library/Application Support/typora-user-images/image-20210402184841954.png)

**问题解决**

- 20210402

- 呃.突然看到,不仅仅是js-doc的问题,连正常的js import使用别名也报错了

- 然后就切到其他分支,果然正确.

- 一对比,发现是tsconfig.json配置差异,在tsconfig中配置上别名即可

  ```
  "paths": {
     "@/*": ["src/*"]
   }
  ```

  