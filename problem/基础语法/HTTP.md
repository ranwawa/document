### 1. 服务端返回的数据是object,客户端接收到的却是字符串
**业务背景**

使用`uni-app`开发微信公众号,后端对接`java`接口.同样基于`uni.request`发起的请求,一个接口能够正常接收返回的对象,而另外一个接口不行

**相关尝试**
- header头里的content-type,dataType都有设置,无效(官网介绍默认也是json)
- postman和网页直接访问接口,正常访问对象

**问题解决**

由于服务返回的对象,属性名使用的是纯数值,所以`ajax`请求库自动把返回的对象转换成了字符串.`uni.request`是基于`fly.io`,这个可能是fly.io的默认行为吧???

### 2. 关于windows/chrome的dns缓存的crud

**业务背景**

最近在学习web性能,在`yslow`官网和web性能实践日志这本书上都有提到关于dns的优化.因为HTTP协议约定在一个网站session
里面,同一个host同时只开启最多2条连接,每个连接同时最多只发起6个请求

所以在资源较多的情况下,建议把资源放在不同的主机上,以便打开多条tcp连接

但是在建立tcp连接之前,需要进行dns解析,这个也是提费时的事情,所以建议的主机名在2到4个之间

但是浏览器,操作系统,ISP都会提供dns缓存,所以问题就来了

为了方便,简化到浏览器只看chrome,操作系统只看windows,他们把dns缓存放哪儿的?去哪儿看?每个缓存多长时间?删除缓存后,看看http
请求中的dns解析时间变化

**问题解决**

|平台|缓存时间|查看方法|删除方法|
|:-:|:-:|:-:|:-:|
|windows|-|ipconfig /displaydns|ipconfig /flushdns|
|chrome|-|浏览器输入 chrome://net-internals/#dns 点击删除按钮即可|  |

- 另外,在chrome浏览器里面输入`chrome://about`,还有很多有用的功能去发现
- 可是实测下来,在chrome里面只能删除,没办法查看纪录,不知道是没缓存上还是查看的地方有问题

- 参考:
  - https://blog.csdn.net/Wu000999/article/details/91601510
  - https://www.howtogeek.com/197804/how-to-clear-the-google-chrome-dns-cache-on-windows/
