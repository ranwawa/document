## 22.6 Blob

### 22.6.1 Blob概述

什么是Blob
- (对大数据块的*不透明*引用)

Blob的由来
- (Binary large object)二进制大对象
- 来源于~~java~~SQL的一个概念
- ~~表示对二进制数据的引用~~

Blob的特性
- 不透明
  - 只能访问他的大小
  - 类型
  - 以及拆分片段
- 异步性
  - 因为可能涉及到磁盘或大量数据的操作
  - 所以操作Blob的接口都是异步的

获取Blob的5个方法
- 支持结构化复制
  - 可以通过poseMessage在不同的线程间传递
- file也是Blob
  - 可以通过file或拖动导入
- (从客户端数据库获取)
- ajax下载
- (通过BlobBuilder创建)
  - 可将文本,arrayBuffer对象,其他Blob等转换成Blob

操作Blob的6个方法
- Ajax的send()
- Worker的poseMessage()
- 全局的createObjectURL()
- FileReader的readAs相关方法
- (存入到客户端数据库)
- (文件系统或FileWriter的写入方法)

### 22.6.2 常见的Blob操作

Ajax下载
- 发起ajax请求时
- 将responseType设置为blob即可

File/拖动读取
- file本身就是Blob的子类
- 拖动相关的api木有用过,所以它怎么处理file还不太了解

转换BlobURL
- URL.createObjectURL(blob)
- BlobURL的作用
  - 指向Blob的一个引用
- BlobURL的应用场景
  - DOM节点使用
  - CSS样式里面使用
  - ajax下载
- BlobURL的注意事项
  - 跨域性: 只能在创建他的脚本那个域里面使用,通过work传递过去后就会失效
  - 时效性: 并非一直有效,保存在localStorage里面,以后访问会失效
- 为啥需要手动重置blobURL
  - URL.revokeObjectURL(BlobURL)可以让BlobURL失效
  - 如果不让它失效的话,就会一直占用内存空间

构造函数
- 就是通过BlobBuilder实例的getBlob方法来获取
- 但是这样直接操作的作用是啥还不太了解...或许可以和canvas结合起来,毕竟canvas可以直接导出dataview视图
- 而dataview视图可以合并到blobBuilder实例里面去

这个构造函数已经废弃,现在是用Blob构造函数,但是Blob构造函数上面木有append方法
```
var bb  = new BlobBuilder();
bb.append('this blob contains this text and 10 big-endian 32-bit signed ints.');
bb.append('\0'); // 求救字符串结束

var ab = new ArrayBuffer(4*10);
var dv = new DataView(ab);
for(var i = 0; i < 10; i++) {
  dv.setInt32(i*4, i);
}
bb.append(ab);

var blob = bb.getBlob('x-optional/mime-type-here');
```
```
var text = 'this blob contains this text and 10 big-endian 32-bit signed ints.';
var ab = new ArrayBuffer(4*10);
var dv = new DataView(ab);
for(var i = 0; i < 10; i++) {
  dv.setInt32(i*4, i);
}
var bb = new Blob([text, ab]);
console.log(bb, bb.stream(), bb.text(), bb.arrayBuffer());
```

FileReader
- FileReader的6个相关事件类型(和xmlhttprequest很像)
  - onload
  - onerror
  - onprogress
  - loadstart
  - loadend
  - abort
- FileReader的4个读取Blob的方法
  - readAsText()
  - readAsArrayBuffer() 这个应该可以用来放进canvas
  - readAsDataURL() 这个应该可以用来显示图片
  - readAsBinaryString() 这个应该可以用来上传
- readyState的3个值
  - 0 未读取
  - 1 正在读取
  - 2 读取完毕

```
var reader = new FileReader();
reader.readAsText(File/Blob);
reader.onload = function () {
  var text = reader.result;  // 这个result是前面readAs方法对应的结果
}
```

<script async src="//jsfiddle.net/ranwawa/tpzuberk/64/embed/"></script>

## 22.7 File
