## 11.1 为什么需要客户端识别

- HTTP是匿名无状态的请求/响应协议,无法实现个性化的访问.比如
  - 个性化的问候
  - 个性化的推荐
  - 存储用户信息
  - 记录会话等

- 有哪些方式可以识别用户
  - 承载用户信息的HTTP首部
  - 客户端IP地址追踪
  - 用户登陆
  - 胖URL
  - cookie
  
## 11.2 和用户信息有关的HTTP首部
- 哪些首部和用户信息有关
  - From: email
  - User-Agent: 用户代理信息
  - Referer: 访问来源
  - Authorization: 用户名密码
  - Client-IP: 客户端IP
  - X-forwarded-For: 客户端IP
  - Cookie: 服务器产生的ID
  
## 11.3 IP地址
- 怎么获取IP地址
  - HTTP本身获取不到IP地址
  - 可以通过服务器的接口拿到TCP的连接上的IP地址

- 为什么不使用IP地址  
  - IP是描述的电脑,而不是人
  - 动态分配IP导致每次联网时,同一台电脑的IP都会变
  - 通过代理的连接获取不到客户端IP
  - 一个防火墙/路由器后面的N台电脑使用的是同一个IP
  
## 11.4 HTTP首部用户登陆
- HTTP首部登陆的流程
  - 客户端请求
  - 服务器响应401 WWW-Authenticate
  - 客户端把帐号密码放进Authentication重新请求
 - 用户器验证响应
 
- HTTP首部登陆的问题
  - 帐号密码是base64加密,相当于明文传输
  - 不同的页面需要不停的登陆
  
## 11.5 胖URL
- 什么是胖URL
  - 由服务器生成的添加了用户信息的URL地址
  
- 胖URL的工作方式
  - 客户端请求
  - 服务器识别客户端身份,然后将其追加到URL后面
  - 客户端重定向链接到胖URL上
  - 服务端处理请求时就可以通过URL里面的身份信息来判断了
  
- 胖URL存在的问题
  - 让URL变得不可读了
  - 因为包含个人信息,无法复制粘贴
  - 每个人的链接都不一样,共享缓存就没用了
  - 加重服务器负担
    - 每次都要计算URL内容
    - 这个在cookie和token里面还不是一样的有这个问题
  - 会话是非持久的
    - 因为URL是指定的
    - 不小心换了URL或下次访问时记不住这一串
    - 就获取不到相应的信息了
  
## 11.5 cookie
- cookie有哪些类型
  - 会话cookie
    - 网页关掉失效
  - 持久cookie
    - 一直存在硬盘上

- cookie的工作流程
  - 客户端发起请求
  - 服务器响应set-cookie首部
  - 客户端自动保存set-cookie里面的值
  - 客户端再次请求时,会自动带上set-cookie里面的值
 domain属性的作用
 - 限定只有指定网址才会发送cookie

- path属性的作用
  - 限制指定网址和路径的才会发送cookie
  
- 如何通知缓存服务器不缓存set-cookie首部
  - 设置cache-control: no-cache="set-cookie"
  
- 代理怎么处理set-cookie的缓存
  - 有些会直接删除set-cookie后再缓存
  - 有些只会缓存带set-cookie的图片,其他的不缓存
 
- cookie的安全性问题
  - 如果cookie泄漏,别人就可以盗用你的身份了
    - 可能导致XSS和CSRF攻击,参考 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies
  - 可能泄漏用户隐私
    - 第三方站点(如google广告等)通过持久cookie结合referer和ip,可以完美追踪用户习惯

> 外国人确实比较较真,欧盟为这个出了法律规范,美国还搞了风险评估报告.确实社会的发展阶段不一样,我们还在小康路上拼死拼活,根本都不知道网络行为隐私是啥子玩意儿
