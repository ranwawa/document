> 前面所有的都是理论,别人到底怎么才能访问到我们的网站呢?就需要把网站放到网上,就是通过Web主机托管放上去的

## 18.1 虚拟主机
- 什么Web主机托管
  - 专门负责内容资源的存储,协调以及管理

- 为什么会出现主机托管服务
  - 自己架设机房,购买硬件,专人维护并不是每个想上网的公司都承受的了的
  - 所以出现了专门做这个生意的人
  - 我来把这些东西搞好,租给你用
  - 有点像前两年炒的比较火的伪共享经济
  
- 为什么会出现虚拟主机托管服务
  - 还有很多人,就连单独租一个服务器都觉得成本很高
  - 那我就把一个服务器隔断后租给N个人用
  - 等你有钱了再来租大的
  - 这感觉和现实中的租隔断间,买小户型房子简直如出一辙啊,行业千奇百怪,但是基本的社会规律在哪个行业都会起到根本性的决定作用

- 早期虚拟主机存在的问题
  - 最开始HTTP没有考虑到虚拟主机的需求,所以通过规范很难实现虚拟主机这个功能
  - 书上还说,很多Web托管者向HTTP的设计者施压......真想知道那个年代他们之间互怂的厅闻趣事
  - 这和我们产品和开发之间的矛盾一模一样,产品就是HTTP设计者,开发就是各厂商.两个之间始终有矛盾.....

- 怎么解决HTTP不支持虚拟主机这个问题呢?
  - 说了很多过时的方法
  - 这里只纪录host首部的方法

- Host首部的解析规则
  - 请求URI是绝对URL就忽略host
  - 请求URI中没有主机部分,则需要host首部
  - 如果URI和host首部都没有,则返回400错误

## 18.2 让网站变得可靠
- 网站在哪些情况下会无法访问
  - 服务器死机
  - 网络卡

- 如何避免网站无法访问
  - 服务器集群
    - 怕网站死机无法访问
    - 那就搞多个网站,这个死了那个还可以用
  - CDN内容分发
    - 怕网络卡,那就很多节点上放些缓存资源
    - 总有不卡的路