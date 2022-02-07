# 疑问

1. shopify中的整个操作流程是怎么样的

2. shopify中的pre和prd是两个分开的应用吗

3. shopify中用户是如何支付货运费的

   -> 企业直接在webApp充值,然后下单时扣余额

4. shopify上现在有真实用户了吗,网址是多少

   -> 暂时未对外开放,业务团队有挨个联系用户,部分用户表示认可使用

5. woocommerce上有比较活跃的同城卖家吗,并且是我们潜在的顾客

   -> shopify全球用户250万,除去美国25%还有180万,需要计算活跃用户

   -> wooc也需要计算出类似行业的活跃用户数据

6. wooc上连运费都会涉及到税,这是个啥意思????

7. Wp developer handle book中有推荐到4个模板,和wp-react-start不一样,选哪个?

   推荐的模板是老式的代码了,最近一次更新都是4年前.所以还是得用react这一套

8. checkout页面下单时,怎么把这个订单划分给当前企业?

   -> 以用户付款为准 ,用户付款后直接下单

   -> 1. 要搞清楚怎么实时知道用户付款了 todo

9. wordpress中的multisite是什么情况,如果一个企业是multsite对我们的插件是否会有什么影响 ?

10. 我们每一个功能,是否也要对应上用户的权限,比如只有admin才能手动下单,admin才能看到apiKey

    -> 这个工作应该是要做的

    -> 第1步是要把我们的功能给划分出来  todo

    -> 第2步是看怎么对接企业的权限系统,如果每个企业的权限系统分类是一样的还好处理,但是权限系统能够自定义的话就会复杂一点

    所以要搞清楚wordpress的权限系统到底是怎么样的 todo

11. 需要确定要调用哪些API

    -> 依赖于我们有哪些功能

    -> 这些功能需要哪些api,hooks配合,两者都存在的时候,则优先取api  todo

# 编码注意事项

## 不能做的

**不能**硬编码文件引用地址,只能用内部函数或常量

## 必须做的

所有变量方法类名都**必须**使用前缀

对用户的输入输出**必须**做安全检验

# 相关资料

wordpress开发指南: https://developer.wordpress.org/plugins/intro/

woocommerce开发指南: https://docs.woocommerce.com/document/create-a-plugin/

# 如何开启一个woocommerce店铺

## 1. 安装wordpress

### 购买域名和虚拟主机

- bluehost上购买域名(Domain Registration)
- bluehost上购买1年香港虚拟主机(Single Domain linux Hosting)
- bluehost域名帐号密码
  - cp.cn.bluehost.com
  - ⁣274544338@qq.com 
  - ⁣bluehost516826A!

### 将域名指向虚拟主机

- 登录bluehost管理后台
- 将域名面板中的`Name Servers`设置成虚拟主机中`Name Server Details`中的域名
- 虚拟主机域名帐号密码
  - http://116.206.106.26/cpanel
  - ranwarhb
  - bluehost51A!@

### 一键安装wordpress

- 登录虚拟主机cpanel控制台
- 进入softaculous面板
- 一键安装wordpress
- wordpress域名帐号密码
  - ⁣https://ranwawa.site/wp-admin/⁣ 
  - ⁣admin-ranwawa ⁣
  - &1%9S55r3g

## 2. 安装woocommerce

### 安装woocommerce

### 激活woocommerce

安装向导和checklist: https://docs.woocommerce.com/document/woocommerce-setup-wizard/

导入测试数据: https://docs.woocommerce.com/document/importing-woocommerce-sample-data/

![image-20210919131639369](/Users/ranwawa/Documents/personal/document/img/image-20210919131639369.png)

![image-20210919131809041](/Users/ranwawa/Documents/personal/document/img/image-20210919131809041.png)

![image-20210919131948740](/Users/ranwawa/Documents/personal/document/img/image-20210919131948740.png)

![image-20210919132132841](/Users/ranwawa/Documents/personal/document/img/image-20210919132132841.png)

![image-20210919132258420](/Users/ranwawa/Documents/personal/document/img/image-20210919132258420.png)

![image-20210919132906156](/Users/ranwawa/Documents/personal/document/img/image-20210919132906156.png)

![image-20210919142017886](/Users/ranwawa/Documents/personal/document/img/image-20210919142017886.png)

![image-20210919142034815](/Users/ranwawa/Documents/personal/document/img/image-20210919142034815.png)

![image-20210919142130816](/Users/ranwawa/Documents/personal/document/img/image-20210919142130816.png)

![image-20210919142417987](/Users/ranwawa/Documents/personal/document/img/image-20210919142417987.png)

![image-20210919142529585](/Users/ranwawa/Documents/personal/document/img/image-20210919142529585.png)

![image-20210919142630099](/Users/ranwawa/Documents/personal/document/img/image-20210919142630099.png)

![image-20210919142909826](/Users/ranwawa/Documents/personal/document/img/image-20210919142909826.png)

![image-20210919143338099](/Users/ranwawa/Documents/personal/document/img/image-20210919143338099.png)