## 1. vscode 里面无法格式化 tsx 里面的内容（20210214）

### 问题描述

使用 vue3 + tsx 开发项目，默认使用 vue 的 prettier 配置。总是报 tsx 里面的格式错误，但是在保存 tsx 文件时，prettier 也没有自动格式化

**尝试解决**

在 vscode 的 prettier 配置中增加了 tsx,tsx，没有生效

## 2. 自动格式化超宽 HTML 标签时，格式化之后的格式还是有问题（20210305）

### 业务背景

项目里都配置了 prettier 自动格式化，超宽了之后自动换行，但是在格式化 html 标签的时候遇到了问题

结束标签没有单独换行，并且结束标签的右尖括号换行了，每次都要手动去处理这个情况，长期搞也是有点烦呢

### 示例代码

格式化之前的代码

![image-20210305104417685](/Users/ranwawa/Library/Application Support/typora-user-images/image-20210305104417685.png)

格式化之后的代码

![image-20210305104452250](/Users/ranwawa/Library/Application Support/typora-user-images/image-20210305104452250.png)

## 3. prettier 官方文档中有提示到一个 JSON $schema 有什么用

从字面上是指整个 prettier 配置文件的结构,还可以验证配置文件

```
If you’d like a JSON schema to validate your configuration, one is available here: http://json.schemastore.org/prettierrc.
```

但是自己创建了一个 test.json 文件,粘贴下面这行代码并没有提示异常

```
{
  "$schema": "http://json.schemastore.org/prettierrc",
  "singleQuote": true,
  "trailingComma": "all",
  "endOfLine": "lf"
}
```

以为是要和 vscode 的某个插件配合起来使用,但是没找到相关的插件

如果把 test.json 直接改成.prettier,倒是会自动提示语法错误

所以这个$schema 的作用到底是啥,在什么地方可以使用?
