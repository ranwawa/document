## 编写目的
## 目录规范
### 目录结构
```
├─docs
├─resources
│  ├─component
│  ├─data
│  ├─js
│  └─style
├─src
│  └─203
│      │  about.html
│      │  detail.html
│      │  index.html
│      │  list.html
│      │  service.html
│      │
│      ├─images
│      │      detail_footer_1.png
│      │      index_banner_1.png
│      │
│      ├─js
│      │      common.js
│      │
│      ├─style
│      │      ├─images
│      │      common.css
│      │      pc.css
│      │      wap.css
│      │
│      └─temp
│              index_service_1.png
│              list_product_1.png
│
└─temp
```
#### docs
CMS规范文档目录
#### resources
公共资源目录,所有模板都要使用到的公共资源存放在这个目录里面

- component: 公共组件,通用的HTML组件存在在这个目录里面,比如顶部导航,订单评价等,开发时直接从这里复制粘贴过去即可
- data 
- js: 公共第3方插件
  - jquery.js
  - swiper.js
- style: 公共CSS文件
#### src
模板源文件,由前端人员维护.每套模板以数字命名,新的模板在当前模板上递增1.比如现在是203,新的模板就是204.模板里面的名称和结构不能变动.
- HTML文件: 如果要新增需要和产品以及贺总确认
  - about.html: 关于我们
  - detail.html: 产品详情页面
  - index.html: 首页
  - list.html: 产品列表页面
  - service.html: 服务保障页面
- images: HTML文件里引用的图片目录
  - 图片命名约定: 页面文件名+下划线+模块名+下划线+索引
以首页banner图为例
```
1.png // bad
indexBanner.png // bad

index_banner_1.png // good
```
- js: js目 目前只包含一个common.js,所有页面的js代码都放在这个里面.不能使用ES6新语法
- style: CSS目录 目前只包含1个目录和3个css文件.
  - images 存放CSS里面引入的静态资源,所有CSS里面引入的图片等只能放在这个目录里面
  - common.css 存放公共的样式
  - pc.css 存放pc端样式
  - wap.css 存放wap端样式
- temp: 临时静态资源,后端模板会替换的静态资源都放在这个目录下面,正式环境下,这里的资源会被删除.命名参照images.

## 公共资源
### 公共第3方插件
#### jquery
使用什么版本
#### swiper
- 使用版本:
- 使用方法:
- 参考链接: https://www.swiper.com.cn
#### fontsize
使用方法
### 公共组件
所有模板的都可以使用的组件,结构固定,直接复制粘贴就可以使用.新的模板里面引入后只需要修改css样式即可.
#### comm_header.html首部
```html
<!doctype html>
<html lang="zh">
<head>
    <!-- 网站标题 -->
    <title th:text="${site.siteName + ' ' + site.metaTitle}">title</title>
    <!-- 编码格式 -->
    <meta charset="UTF-8"/>
    <!-- 移动端禁止缩放 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <!-- 网站logo -->
    <link rel="icon" th:href="@{${imagePath} + ${common_icon.imgSrc}}"/>
    <!-- IE渲染引擎 -->
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <!-- 搜索引擎SEO相关 -->
    <meta name="keywords" th:content="${site.metaKeywords}"/>
    <meta name="description" th:content="${site.metaDescription}"/>
    <!-- 第3方插件公共样式 -->
    <link rel="stylesheet" th:href="@{${staticRoot} + 'resources/style/swiper.min.css'}"/>
    <!-- pc端样式 -->
    <link rel="stylesheet" href="./style/pc.css" th:href="@{${staticPath} + 'style/pc.css'}" media="(min-width:768px)"/>
    <!-- wap端样式 -->
    <link rel="stylesheet" href="./style/wap.css" th:href="@{${staticPath} + 'style/wap.css'}" media="(max-width:768px)"/>
</head>
```
#### comm_nav.html顶部导航
```html
!-- 顶部导航 -->
<div class="g-header">
    <div class="c-header-center-box">
        <!-- 左侧logo -->
        <a href="/">
            <img src="style/images/m-logo.jpg" th:alt="${common_logo.title}" class="nav-logo"/>
        </a>
        <!-- 中间菜单导航 -->
        <div class="m-nav j-wap-nav">
            <ul>
                <li class="active">
                    <a href="index.html">首页</a>
                </li>
                <li>
                    <a href="service.html">服务保障</a>
                </li>
                                    <li>
                    <a href="list.html">关于我们</a>
                </li>
                <li>
                     <a href="list.html">联系我们</a>
                </li>
            </ul>
        </div>

        <!-- 右边联系客服框 -->
        <div class="nav-tel-box">
            <div class="left-box">
                <img src="style/images/m-kefu.png" />
            </div>
            <div class="left-box">
                <div class="s-title">客服热线</div>  
                <div class="s-tel">
                    <a th:href="@{'tel:' + ${telephone}}" th:text="${telephone}">4005345444</a>
                </div> 
             </div>
        </div>

        <!-- wap端导航按钮 -->
        <div class="nav-wap-right j-wap-nav-right">
            <div class="iconfont icondaohang"></div>
            <div class="next-text">导航</div> 
        </div>
    </div>
</div>
```
```javascript
 // wap导航按钮点击事件
$('.j-wap-nav-right').bind('click',function(){
     $('.j-wap-nav').slideToggle(300);
});
```
#### comm_swiper.html轮播
```
<!-- 轮播图片 -->
<div class="swiper-container j-swiper-banner">
    <div class="swiper-wrapper">
        <!--绑定数据遍历-->
        <a class="swiper-slide m-swiper-banner-list" href="#">
            <div  class="swiper-bg-img"  style="background-image: url(style/images/i-banner3.png)"></div>
        </a>
        <a class="swiper-slide m-swiper-banner-list" href="#">
            <div  class="swiper-bg-img"  style="background-image: url(style/images/i-banner3.png)"></div>
        </a>
    </div>
    <!-- 左右切换按钮 -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <!-- 下面点点 -->
    <div class="swiper-pagination"></div>
</div>
```
```javascript
 //首页轮播图
var swiper = new Swiper('.j-swiper-banner', {
    speed: 2000,
    loop: true,
    preventClicks : false,//默认true
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
    }
  });
```
#### comm_order.html订单评价
```
!-- 用户评价 -->
<section>
    <div class="c-max-evaluation">
        <div class="c-page m-limits-box">
            <div class="m-limits-title">
                用户评价
            </div>
            <div class="m-limits-line"></div>
        </div>
        <div class="c-max-user-swiper j-max-user-swiper">
            <div class="c-min-user-swiper swiper-container j-swiper-user-banner">
                <ul class="swiper-wrapper">
                    <!-- 用户评论框内容   绑定数据遍历  -->
                    <li class="swiper-slide"> 
                        <div class="m-user-evaluation-list">
                            <img class="fontimg" src="style/images/i-user.png" />
                            <div class="min-text-box">
                                <div class="prev-tel">178****1314 
                                    <span>
                                        <img src="style/images/i-stars.png" />
                                        <img src="style/images/i-stars.png" />
                                        <img src="style/images/i-stars.png" />
                                        <img src="style/images/i-stars.png" />
                                        <img src="style/images/i-stars.png" />
                                    </span> 
                                </div>
                                <div class="time">2019-08-09</div>
                                <div class="text-content">
                                    之前说有可能换完内存会有无信号出现变成砖机但是我相信师傅师
                                        的很细心修好后一直没出现无信号问题手机运转非常流畅感谢师傅
                                        评好评好评。
                                </div>
                                <div class="user-img-box">
                                    <img src="style/images/i-002.png" />
                                    <img src="style/images/i-002.png" />
                                    <img src="style/images/i-002.png" />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="swiper-slide"> 
                            <div class="m-user-evaluation-list">
                                <img class="fontimg" src="style/images/i-user.png" />
                                <div class="min-text-box">
                                    <div class="prev-tel">178****1314 
                                        <span>
                                            <img src="style/images/i-stars.png" />
                                            <img src="style/images/i-stars.png" />
                                            <img src="style/images/i-stars.png" />
                                            <img src="style/images/i-stars.png" />
                                            <img src="style/images/i-stars.png" />
                                        </span> 
                                    </div>
                                    <div class="time">2019-08-09</div>
                                    <div class="text-content">
                                        之前说有可能换完内存会有无信号出现变成砖机但是我相信师傅师
                                            的很细心修好后一直没出现无信号问题手机运转非常流畅感谢师傅
                                            评好评好评。
                                    </div>
                                    <div class="user-img-box">
                                        <img src="style/images/i-002.png" />
                                        <img src="style/images/i-002.png" />
                                        <img src="style/images/i-002.png" />
                                    </div>
                                </div>
                            </div>
                    </li>
                    <li class="swiper-slide"> 
                        <div class="m-user-evaluation-list">
                            <img class="fontimg" src="style/images/i-user.png" />
                            <div class="min-text-box">
                                <div class="prev-tel">178****1314 
                                    <span>
                                        <img src="style/images/i-stars.png" />
                                        <img src="style/images/i-stars.png" />
                                        <img src="style/images/i-stars.png" />
                                        <img src="style/images/i-stars.png" />
                                        <img src="style/images/i-stars.png" />
                                    </span> 
                                </div>
                                <div class="time">2019-08-09</div>
                                <div class="text-content">
                                    之前说有可能换完内存会有无信号出现变成砖机但是我相信师傅师
                                        的很细心修好后一直没出现无信号问题手机运转非常流畅感谢师傅
                                        评好评好评。
                                </div>
                                <div class="user-img-box">
                                    <img src="style/images/i-002.png" />
                                    <img src="style/images/i-002.png" />
                                    <img src="style/images/i-002.png" />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="swiper-slide"> 
                        <div class="m-user-evaluation-list">
                            <img class="fontimg" src="style/images/i-user.png" />
                            <div class="min-text-box">
                                <div class="prev-tel">178****1314 
                                    <span>
                                        <img src="style/images/i-stars.png" />
                                        <img src="style/images/i-stars.png" />
                                        <img src="style/images/i-stars.png" />
                                        <img src="style/images/i-stars.png" />
                                        <img src="style/images/i-stars.png" />
                                    </span> 
                                </div>
                                <div class="time">2019-08-09</div>
                                <div class="text-content">
                                    之前说有可能换完内存会有无信号出现变成砖机但是我相信师傅师
                                        的很细心修好后一直没出现无信号问题手机运转非常流畅感谢师傅
                                        评好评好评。
                                </div>
                                <div class="user-img-box">
                                    <img src="style/images/i-002.png" />
                                    <img src="style/images/i-002.png" />
                                    <img src="style/images/i-002.png" />
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 左右切换按钮 -->
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <!-- 下面点点 -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="tag-text">注：客户评价数据来源于上海水英电器维修有限公司评价数据</div>
        <div class="btn-evaluate">我要评价</div>
   </div>
</section>
```
```javascript
//订单上下滚动
function setOrderScroll() {
  var box = document.getElementById("order-box");
  var con1 = document.getElementById("order-list");
  var con2 = document.getElementById("copy-order-list");
  this.speed = 50;
  if (con1.offsetHeight >= box.offsetHeight) {
    con2.innerHTML = con1.innerHTML;
    var timer1 = setInterval(scrol, this.speed);
    function scrol() {
      /*判断滚动内容是否已经滚完，滚完了则滚动的值重新设置到0，否则就每个30默秒向上滚动1px */
      if (box.scrollTop >= con1.scrollHeight) {
        box.scrollTop = 0;
      } else {
        box.scrollTop++;
      }
      /*判断滚动的距离刚好为一条公告的高度时停掉定时器，隔1s之后重新启动计时器即可实现公告滚动停留效果 */
      var h =document.body.clientWidth>=800?50:42;
      if (box.scrollTop % h == 0) {
        clearInterval(timer1);
        setTimeout(function(){
          timer1 = setInterval(scrol, 30);
        }, 2000);
      }
    }
  }
}
if(document.getElementById("order-box")){
  setOrderScroll();
}
```
#### 合作伙伴
```html
<!-- 合作伙伴 -->
<section class="m-partner-box">
    <div class="c-page m-limits-box">
        <div class="m-limits-title">
                合作伙伴
        </div>
        <div class="m-limits-line"></div>
        <ul class="g-grid m-partner-list-box">
            <li class="g-box">
                <a  href="#">
                   <img src="style/images/i-004.png" />
                </a>
            </li>
            <li class="g-box">
                <a  href="#">
                    <img src="style/images/i-004.png" />
                </a>
            </li>
            <li class="g-box">
                <a  href="#">
                    <img src="style/images/i-004.png" />
                </a>
            </li>
            <li class="g-box">
                <a  href="#">
                    <img src="style/images/i-004.png" />
                </a>
            </li>
            <li class="g-box">
                <a  href="#">
                    <img src="style/images/i-004.png" />
                </a>
            </li>
            <li class="g-box">
                <a  href="#">
                    <img src="style/images/i-004.png" />
                </a>
            </li>
            <li class="g-box">
                <a  href="#">
                    <img src="style/images/i-004.png" />
                </a>
            </li>
        </ul>
        <div class="tag-text">注：排名不分先后，以上仅为部分合作伙伴</div>
    </div>
</section>
```
#### 页脚
```html
<!-- 页脚 -->
<footer class="footer">
    <div class="footer-time">
        <div class="footer-time-left">
            <img th:src="@{${staticPath} + 'images/common/24h.png'}" />
            <span>咨询时间：7X24小时</span>
        </div>
        <a href="tel:" class="footer-time-right">
            <img th:src="@{${staticPath} + 'images/common/24h2.png'}"/>
            <span>
                24小时客服热线<br/>
                <a class="service-tel">客服电话</a>
            </span>
        </a>
    </div>
    <div class="footer-code">
        <a href="http://beian.miit.gov.cn" target="_blank" th:text="${'备案号：' + site.icp}">ICP</a><br/>
        Copyright 2014-2019 <span th:text="${site.company}">公司名称</span>
    </div>
</footer>
```
## CSS
1、pc端样式统一用px单位，页面、文字大小以为UI设计图尺寸为标准，

2、wap端样式统一用rem单位，默认最大宽度750，默认字体大小100的根元素值，根据移动设备进行同比例缩放。
3、一律小写、尽量用英文、命名短且语义化要好、名字长的单词可以选择使用烤串命名法，中间加横线来为选择器命名，如：
## HTML
### 注释
由于页面写好后,需要后端人员再转换成后端的模板.所以针对每行代码的用途都要详细备注说明.
```

```
### CSS类命名

TODO
- 有哪几个第3方插件
- 有哪些公共的HTML组件