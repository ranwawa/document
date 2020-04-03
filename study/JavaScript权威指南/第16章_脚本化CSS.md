## 18.1 脚本化内联样式style

**语法**
- Node.style
- 类似于Node.getAttribute('style')

**元素的style属性**
- 是一个cssDeclarationClass对象
- 可通过属性设置对应内联样式的值

```javascript
var ele = document.getElementById('test');
console.log(ele.style); // => [object CSSStyleDeclaration]
console.log(ele.style.backgroundColor); // => ''
ele.style.backgroundColor = '#fff';
console.log(ele.style.backgroundColor); // => color: #fff;
```

**命名约定**
- 中划线转驼峰,background-color -> backgroundColor
- 保留字前加css,class -> cssClass

**注意事项**
- 查询时,仅返回js已经设置过,或者内联样式本身就写过的值
- 可通过cssText属性设置/获取整个style内联样式的值
  - 当然也可以通过setAttribute来实现,但这属于脚本化HTML范畴了

## 18.2 计算属性

**什么是计算属性**
- 元素显示时实际使用的值的集合
- 也是一个cssDeclarationClass对象

**语法**
- getComputedStyle(element, pseudo)
  - element是一个node节点对象
  - pseudo是伪元素
    - null/''
    - :before
    - :after
    - :first-line
    - :first-letter

**计算属性与style的区别**
- style的cssDeclaration是可以设置的,静态的
- computed的cssDeclaration只读的动态的

**计算属性的特点**
- 只读的
- 值都是转换后的绝对值
- 实时的
- 只解析最基本的属性,而非简写属性例如border-bottom
- 木有实现cssText属性

**IE8兼容**
- IE8木有这个方法
- 可以在Node节点上调用currentStyle属性来获取相应的值
  - 值的单位未转换(例如百分比)

## 18.3 脚本化css类class

**语法**
- Node.className返回空格分开的字符串
  - 类似于Node.getAttribute('class')
- Node.classList返回DOMTokenList对象
  - 该对象也是实时的
  - 4个重要的方法contains,add,remove,toggle

<script async src="//jsfiddle.net/ranwawa/u6jex951/embed/"></script>

## 18.4 样式表的增删改查

**查询样式表**
- 获取style/link节点的Node对象
- 或者直接调用document.styleSheets属性
  - 返回只读类数组
  - 包含CSSStyleSheet对象

**禁用样式**
- document.styleSheets[index].disabled = true;

**查询/新增/删除样式**
- document.styleSheets[index].cssRules
  - 返回样式表里的所有规则
  - 两个常用属性
    - selectText返回可写的CSSStyleDeclaration对象
    - cssText可获取原始数据
  - 2个常用的方法
    - insertRule()/deleteRule()

- IE8中的兼容问题
  - cssRules -> rules
  - insertRule -> addRule
  - deleteRule -> removeRule

 **创建样式表**
 - 创建一个style节点
 - 设置innerHTML即可

 - IE8兼容
   - document.createStyleSheet()
   - document.createStyleSheet().cssText = xxx;
