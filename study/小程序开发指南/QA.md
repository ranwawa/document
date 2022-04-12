<!--
 * @Author: ranwawa <ranwawa.ran@huolala.cn>
 * @Date: 2022-04-11 18:22:38
 * @Description:
-->

# 常见问题

## 1. [已解决]使用 ci 工具编译官方 demo 时报错(20220411)

### 问题描述

今天尝试使用 ci 来编译小程序代码.用官方 demo 进行测试,发现两个工作文件的语法出错.

1. from.js 中的 min 是 readonly,尝试把 upload 中的 setting 全部删除掉,然后出现另外一个错误
2. 一个是 import 一个包出现语法错误,试着把所有 setting 全部开启
3. 问题解决

### 问题解决

- 和编译有关.一些新的语法没有完全转义导致语法报错,把 ES6,ES7 开启就可以了

## 2. [已解决]在 node 中直接使用 import 语法(20220411)

### 问题描述

想要在小程序包上传完之后,计算一下包大小然后输出出来以便观察.找了一个 pretty-bytes 的插件.
该包不支持 CMD 规范,即通过 require 无法引入

可是通过 import 语句提示语法报错.node 版本是 16.14.记得是在哪个版本 node 原生支持了 import,可是为什么会报错呢,难道是要在哪儿进行配置?

查阅资料,在 package.json 中添加 type: module 即可,或者将文件后缀名改成.mjs.这样改了之后就不支持 require 了,所以 pass

还提到一个 esm 的模块, node -r esm xx.js.结果也是一样,无法同时支持 require 和 import.但它提示到可以使用动态 import

但使用动态 import 后,又提示不是一个方法,最后 await 一下动态 import 之后,就可以了.不需要做任何修改

### 问题解决

- 使用动态 import 语句即可

参考:

- https://www.geeksforgeeks.org/how-to-use-an-es6-import-in-node-js/
