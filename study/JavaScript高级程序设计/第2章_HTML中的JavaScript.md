script标签的6个常用属性
  - async
  - defer
  - crossorigin
  - integrity
  - src
  - type

defer的3个特点
  - 立即下载,DOM解析完成后开始执行
  - 若有多个defer,下载完后按出现的顺序开始执行
  - 会在DOMContentLoaded事件前执行

defer的2个最佳实践
  - 最好只放1个defer标签
  - 将defer标签放在最后面

async和defer的3个区别
  - 立即下载,下载完后立即执行
  - 若有多个async,谁先下载完谁先执行
  - 在load事件前执行,有可能是DOMContentLoaded之后
  
crossorigin的作用
  - 正常情况下,跨域js资源异常时,只会抛出一个简单的错误
  - 加上crossorigin并且服务端有相应设置,则会抛出详细错误
  
integrity的原理
  - 将文件base64后加密得出一个加密串
  - 浏览器下载完文件后,会进行同样的加密
  - 若两个不一致,则不执行代码

下面的代码为什么会报错?
```html
<body>
	<script>
		console.log('</script>')
	</script>
</body>
```
  - 因为浏览器是字符串解析
  - 第一个`</script>`会被解析成结束标签
