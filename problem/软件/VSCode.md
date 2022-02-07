1. [已解决]修改HTML标签时，结束标签不自动修改(190924)

2. [已解决]HTML突然无法格式化代码(190924)

3. [已解决]在代码编辑框中(editor)，通过快捷直接在window的资源管理器中打开当前文件(190927)

4. [已解决]在HTML中声明了CSS类，但是在CSS文件中无法智能提示(190927)

5. [已解决]在新窗口中打开新项目(190929)

6. [已解决]最大化新窗口(190929)

7. [已解决]找一个功能丰富的可视化的git管理插件(190929)

8. [已解决]不同的电脑上同步所有配置文件(191008)

9. [已解决]启动IDE时自动打开上次关闭时的项目(191010)

10. 在`.vue`文件中,点击方法/变量,跳转到定义它的地方

11. [已解决]在工作台编辑器处于激活状态时,快速切换上一个/下一个tab(191010)

12. [无解]用`prettier`格式化HTML文件时强制所有属性换行(191010)

13. [无解]像`WebStorm`那样使用`.log`快捷方法(191010)

14. 批量展开多行注释/或者多选注释在折叠时显示描述文字

15. [已解决]把字体换成`codesandbox.io`里面那种(191011)

16. [已解决]`.vue`文件顶部块级注释默认为HTML的注释`<!-- -->`(191014)

17. [已解决]HTML文件里面的CSS类快速定位到CSS文件里面的对应行(191014)

18. `LiverServer`无法代理到https连接

19. [已解决]如何自定义窗口title(191016)

20. [已解决]HTML自定义标签自动补全(191021)

21. [已解决]圈复杂度插件(191022)

22. vue文件无法格式化

23. [已解决]如何设置上一个/下一个光标定位的快捷键(210530)

24. vue文件中无法跳转webpack别名(20211210)

    [TOC]

    

25. js文件中引入文件时,.vue文件没有自动提示(20211210)

    ![image-20211210235105869](/Users/ranwawa/Documents/personal/document/problem/%E8%BD%AF%E4%BB%B6/img/image-20211210235105869.png)

## 1. [已解决]修改HTML标签时，结束标签不自动修改(190924)

**业务背景**

在`WebStorm`里面，把div标签修改成a标签，只需要修改开始标签，结束标签会自动修改。但是在`VSCode`里面不生效

**问题解决**

下载插件`Auto Rename Tag`

**原因分析**

`WebStorm`会自带很多功能，包括你用得上用不上的，所以很多东西自动会有，但是`VSCode`几乎所有插件都需要自己装，如果遇到类似问题，就先GOOGLE一下或者直接在插件市场找。

## 2. [已解决]HTML突然无法格式化代码(190924)

**业务背景**

使用的`Prettier`格式化代码，不知道什么情况下格式化就失效了

**问题解决**

`HTML`代码结构出错导致无法格式化，修改正确即可

**问题分析**
- 新建一个HTML文件是可以格式化的，说明问题出在对应的HTML文件上而不是VSCode
- 在出错的HTML文件的状态栏右下角，发现`Prettier`后面跟着的是一个叉叉，点开一看，是`HTML`结果出错导致的，会有提示具体是哪一行哪个标签，修改了之后就可以正常格式化

## 3. [已解决]在代码编辑框中(editor)，通过快捷直接在window的资源管理器中打开当前文件(190927)

**业务背景**

从webstorm迁移到vscode,很多操作习惯也要迁移过来，其中一项就是直接用快捷键在资源管理器中打开当前文件。可是在vscode里面，代码处理编辑状态时快捷键根本无法生效

**问题解决**
- `ctrl + k` `ctrl + s` 打开快捷键管理
- 找到这个快捷键
- 修改when的值为`editorFocus || !editorFocus`

**问题分析**
- 每个快捷键都有触发条件
- 如果要在任何地方都触发的话，直接清空when就行了

## 4. [已解决]在HTML中声明了CSS类，但是在CSS文件中无法智能提示(190927)
**业务背景**

还是从WebStorm迁移问题，之前在HTML文件中写好页面结构和类名，然后再去CSS/SCSS文件里面写样式，直接`.`一下，就会提示刚刚定义的类名。但是VSCode默认没有添加这个功能

**问题解决**
- 找了好久,基本都是在HTML中引用CSS里面定义好的类名的插件.而我是需要反过来操作
- 安装插件 HTML to CSS autocompletion  [参考传送门](https://github.com/microsoft/vscode/issues/28442)

## 5. [已解决]在新窗口中打开新项目(190929)

**业务背景**

每天工作的时候,经常会同时开几个项目,在VSCode里面如果已经打开一个项目,再打开新的项目(open folder),会直接替换掉当前的项目...我得现时编辑两个项目呢,你把我之前的给关掉了我怎么办???

所以每次打开新项目不得不新开一个窗口,再打开项目目录,平白无故的多出一步操作,忍受好多天了.

**问题解决**
- 'ctrl + ,'打开设置面板
- 搜索*new window*
- 把*Window: Open Filders In New Window*的选项设置为*on*即可

## 6. [已解决]最大化新窗口(190929)

**业务背景**

感觉VSCode好多默认习惯都和Webstorm不一样啊.要不是因为Webstorm很多快捷键莫名其妙的失效并且无法更改,要不是因为webstorm在SATA硬盘下首次加载速度很慢.我才不会换到VSCode来呢

每次打开一个新的项目/窗口的时候,VSCode的窗口都不能铺满整个屏幕,还非得我去双击一下.多此一举啊简直是,是可忍,郭不可忍

**问题解决**
- 设置面板搜索*new window*
- 把*Window: New Window Dimensions*设置为*maximized*即可

## 7. [已解决]找一个功能丰富的可视化的git管理插件(190929)
**业务背景**

还是迁移问题,在Webstorm那边,git功能之强大,查看文件历史改动,文件对比,整个分支状态用小图标标出来,一目了然,总之用着很爽.

但是VSCode这边自带的git管理,除了一个未提交数量的角标提示有点意思之外,其他的都很简单,太简单了.我都无法一眼看出哪些分支是最新的,哪些分支需要pull,哪些分支需要push,commit信息的时候,也只有一textbox框.不能自定义commit模板.....

**问题解决**

下载一个`git lens`插件,研究了一个小时,感觉还需要磨合....

## 8. [已解决]不同的电脑上同步所有配置文件(191008)
**业务背景**

这没什么好说的,在不同的电脑上同步配置文件,包括快捷键,代码片段,常用配置,主题,自动下载扩展插件.

**问题解决**
- Settings Sync插件
- 安装后直接`ctrl + shift + p`,输入upload,执行 Sync: update
- 根据提示登陆github选择或者创建一个git就自动同步了
- 然后把git id记录下来4c7967a8b24a5ef0e1e02f2266c9e734..
- 换台电脑用这个gitid同步就行了

## 9. [已解决]启动IDE时自动打开上次关闭时的项目(191010)
**业务背景**

每次打开VSCode都是打开的一个空白界面,还得单独打开项目文件夹.有点烦.基本上一段时间内主要都是在编写一个项目,所以希望每次开机打开VSCode的时候,自动打开上次关闭的项目,省掉这多余的一步

**问题解决**
- `ctrl + ,` 打开设置面板
- 搜索*restore windows*
- 把选项设置成*folders*即可

![](https://user-gold-cdn.xitu.io/2019/10/10/16db3b119fbf706f?w=1091&h=681&f=gif&s=228242)

### 10. 在`.vue`文件中,点击方法/变量,跳转到定义它的地方

1. 安装vetur插件
2. 启用插件的Experimental: Template Interpolation Service功能
3. 声明vue文件时使用export default Vue.extend({语法

## 11. 启动IDE时自动打开上次关闭时的项目
**业务背景**

在`webstorm`里面,点击某个变量或方法的时候,可以直接跳转到声明他的地方,这样在写代码的过程中就非常方便.但是VSCode里面不行,虽然有一个`F12`是这个作用,但是在vue文件下无法生效


![](https://user-gold-cdn.xitu.io/2019/10/10/16db46171c70148c?w=576&h=122&f=png&s=13317)

11. [已解决]在工作台编辑器处于激活状态时,快速切换上一个/下一个tab(191010)
**业务背景**

在`webstorm`或浏览器里面,可以快捷键快速切换到下一个/上一个tab,但是在VSCode里面虽然有快捷键,但是感觉有时候有用,有时候又没用...原来VSCode里面是以最近激活的tab为标准,而不是视觉上的前后顺序为标准

**问题解决**
- `ctrl + k` `ctrl + s` 打开快捷键设置面板
- 搜索*Open Next Editor*和*OPEN previous editor*
- 然后设置自己喜欢的快捷键就行了
- 参考 https://stackoverflow.com/questions/38957302/is-there-a-quick-change-tabs-function-in-visual-studio-code

## 12. [无解]用`prettier`格式化HTML文件时强制所有属性换行(191010)
**业务背景**

考虑到以后要在所有项目,所有语言,所有项目成员里面统一排版风格,所以选择了`prettier`插件来格式化代码.

之前在做项目时,HTML属性,对象成员,数组成员,从来都是强制换行,一个属性占一行的,但是换到VSCode里面,只有属性超过了单行限制宽度(默认是80个字符)后才会换行,用起来就有点不习惯

试了一下` "html.format.wrapAttributes": "force-expand-multiline"`也不生效,因为这个选项是针对默认格式化器的,而我的格式化器是`prettier`

**问题解决**
- 除非把格式化器换成默认的`html`而不选择`prettier` 参考: https://github.com/prettier/prettier-vscode/issues/751
- 而我选择了忍...为了用这个插件,改变一下自己的习惯,其实没什么坏处.正好可以调教一下自己的强迫症习惯
- 超过宽度不换行也不是什么坏事嘛,我改

## 13. [无解]像`WebStorm`那样使用`.log`快捷方法(191010)
**业务背景**

一图胜千言,,这VSCode用的我胸口堵的慌啊,再这样搞下去,估计我会受不了,又切回webstorm了

前面不管输入多少东西,只要跟一个`.log`再`tab`一下,就自动包裹好了,多爽
![](https://user-gold-cdn.xitu.io/2019/10/10/16db4a1cfac2218e?w=478&h=179&f=gif&s=54155)

**问题解决**
- 想完全一样的操作是没办法了
- 只能用VSCode自带的snippet `lo
- 相当于还是要调整自己的使用习惯...

## 14. 批量展开多行注释/或者多选注释在折叠时显示描述文字
**业务背景**

VSCode在折叠代码时,会把所有多选注释也给完全折叠起来.如果想浏览代码查看方法就必须展开所有代码.如果一页里面代码量比较多,查看起来就比较麻烦

但是找了一圈,在VSCode里面,只能折叠所有多选注释,不能单独展开所有多行注释


![](https://user-gold-cdn.xitu.io/2019/10/11/16db9aaac03fc1dd?w=456&h=444&f=gif&s=172532)

## 15. [已解决]把字体换成`codesandbox.io`里面那种(191011)
**业务背景**

昨天在写codesandbox里面写示例代码时,发现它那个字体看着真的很舒服,比VSCode设置的默认字体看上去舒服多了,圆润,整齐.看着心里非常舒坦,这样应该会让写代码更加有意思吧.所以花了接近一个小时找到了相应的字体

- 这是它的字体设置
```
    font-family: dm, Menlo, Monaco, "Courier New", monospace;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0px;
```

**问题解决**
- https://fonts.google.com/?query=dm 下载字体
- 安装到电脑上
- VSCode设置页面搜索*font*
- font family修改成: DM Sans, 微软雅黑
- font size修改成15
- line height修改成20
- 搞定

## 16. [已解决]`.vue`文件顶部块级注释默认为HTML的注释`<!-- -->`(191014)
**业务背景** 

在新建一个页面的时候,通常会加上文件注释.而这个注释一般都是用代码片段来实现的.可是在`vue`文件里面,居然还是使用的js注释.这就有点不科学了
![](https://user-gold-cdn.xitu.io/2019/10/14/16dc80586accc3e2?w=294&h=235&f=gif&s=39102)
**片段代码**
```
"jsdoc-file": {
		"scope": "vue,javascript,typescript,html",
		"prefix": "jsdoc-file",
		"body": [
			"$BLOCK_COMMENT_START*",
			" * @author ranwawa",
			" * @date $CURRENT_YEAR-$CURRENT_MONTH -$CURRENT_DATE",
			" * @desc $1 ($TM_FILENAME)",
			" *$BLOCK_COMMENT_END"
		],
		"description": "jsdoc文件首部注释"
	}
```
**问题解决**
- 遇到这种问题首先想到的是文件后缀名和文件类型关联
- 在设置里面搜索一下*file*发现有一个*associations*
- 但不知道怎么配置,所以在VSCode官网搜索了一下,有详细介绍所有默认配置 参考:https://code.visualstudio.com/docs/getstarted/settings
- 最终配置代码如下`settings.json`
```
// Configure file associations to languages (e.g. `"*.extension": "html"`). These have precedence over the default associations of the languages installed.
    "files.associations": {
        "*.vue": "html",
    },
```
## 17. [已解决]HTML文件里面的CSS类快速定位到CSS文件里面的对应行(191014)
**业务背景**

前天修改了一个别人的静态页面,里面引用了几个本地的CSS文件,要修改CSS代码的时候,每次都是在HTML里面复制类名,然后去CSS文件里面*ctrl + f*查找修改.有点麻烦.应该是可以直接`ctrl + 点击`HTML里面的类名,跳转到对应的CSS类名上才对

**问题解决**
- 这个肯定是在插件市场里面搜索CSS相关的插件
- 试了几个,最后终于试到了`css peek`这个插件可以满足要求

## 18. `LiverServer`无法代理到https
**业务背景**

- ajax请求是使用的相对路径,$.get('/api/getInfo')
- 通过`LiveServer`启动本地服务器时的域名是127.0.0.1
- ajax请求的链接就是`http://127.0.0.1:5500/getInfo`,明显回不来数据
- 实际的接口地址是`https://ranwawa.com/api/getInfo`.
- 现在的需求就是把/api/开头的请求全部代理到后端接口上


**LiveServer配置代码**

https自签名证书参考: https://juejin.im/post/5b8e103b6fb9a01a0058c789


```
    "liveServer.settings.port": 443,
    "liveServer.settings.https": {
        "enable": true, //set it true to enable the feature.
        "cert": "E:\\https\\certificate.pem", //full path
        "key": "E:\\https\\privatekey.pem", //full path
        "passphrase": "12345"
    },
    "liveServer.settings.proxy": {
        "enable": true, //set it true to enable the feature.
        "baseUri": "https://test-ranwawa.com/api/", //from where you want to proxy. 
        "proxyUri": "https://ranwawa.com/api/" //the actual url.
    },
```

还需要在本地host添加一条映射  127.0.0.1 test-ranwawa.com

**出现的问题**
- 在浏览器里面访问test-ranwawa.com
- ajax请求会提示404,就是说根本没有转发https请求(貌似LiveServer不支持https转发https://github.com/ritwickdey/vscode-live-server/issues/108)
- 如果不做本地host映射,直接访问127.0.0.1,又会报证书域名(127.0.0.1)不在可信任范围的错误

## 19. [已解决]如何自定义窗口title(191016)
**业务背景**
- 项目文件都是英文命名的
- 有时候项目开多了,在不同的窗口间切换,看英文要想知道是哪个项目总归是脑子要绕一下
- 像下面这种,红色部分的是不是看着直接的多

![](https://user-gold-cdn.xitu.io/2019/10/16/16dd43c9f6a8ae4c?w=731&h=656&f=png&s=170037)
**问题解决**
- 开始看到有一个window.title的配置.搞不定
- 下一个插件就好了..插件的名字就叫`title`

20. [已解决]HTML自定义标签自动补全(191021)
**业务背景**

开发小程序或者自定义VUE组件的时候,在HTML文件里面输入完`navigator`然后按`tab`键没有自动补全...这肯定是不科学并且很麻烦的嘛

![](https://user-gold-cdn.xitu.io/2019/10/21/16dedee0661e188c?w=469&h=235&f=gif&s=103868)
**问题解决**
- 打开设置面板
- 定位到*Extensions* -> *Emmet* -> *Trigger Expansion on Tab* -> 选中即可

## 21. [已解决]圈复杂度插件(191022)
**业务背景**

一直想通过各种辅助手段提高代码质量,很久之前就听说过圈复杂度,但一直不知道怎么计算和运用,这不,前几天在掘金上有人在VSCode里面自动显示方法的复杂度,所以想找一个这样的插件

![](https://user-gold-cdn.xitu.io/2019/10/22/16df232932eb97e8?w=567&h=100&f=png&s=20289)
**问题解决**
- 下载插件CodeMetrics
- 重启IDE即可
## 22. vue文件无法格式化
**业务背景**

由于之前要在`.vue`文件顶部添加HTML文件注释,所以把`.vue`关联到`.html`文件类型上,导致格式无法自动格式化文件了,VUE里面的sass代码也会跟着报错...在配置文件下注释掉这段代码就好了,但是又怎么解决第16号问题呢

![](https://user-gold-cdn.xitu.io/2019/10/22/16df234ef5c7e6cf?w=230&h=74&f=png&s=6469)

> 算了算了.用了一个月VSCode,还是换回WebStorm,每个星期都要花几个小时来设置,有点麻烦.还是开箱即用的WebStorm方便.以后有时间再回来慢慢搞VSCode 2019-10-22



### 23. vue打开checkJs之后，计算属性里面无法识别计算属性（20210301）

**业务背景**

一个计算属性，在computed,methods,以及模板语法里面使用

在computed里面会报错，methods以及模板语法里面是正常的

但是，computed里面还能够推导出这个计算属性的返回值

关掉tsconfig里面的checkJs就好了，一开启就会挂。但是关掉之后，就失去了rs的类型推导啦

**测试代码**

```

<template>
  <view>{{ computedA }}</view>
</template>
<script>
export default {
  computed: {
    computedA() {
      return 1
    },
    computedB() {
      return this.computedA + 1
    },
  },
  methods: {
    test() {
      return this.computedA + this.computedB
    },
  },
}
</script>

```

**报错截图**

![image-20210301173343247](/Users/ranwawa/Library/Application Support/typora-user-images/image-20210301173343247.png)

**报错内容**

```
Property 'computedA' does not exist on type 'CombinedVueInstance<Vue, unknown, unknown, unknown, Readonly<Record<never, any>>>'.Vetur(2339)
```





24. （已解决）vue项目，无法识别prototype注入的属性（20210301）

**业务背景**

在`main.js`里面通过Vue.prototype.$track注入了一个函数

在页面里面通过`this.$track`调用这个方法

vuetr会报错

**报错截图**

![image-20210301150150432](/Users/ranwawa/Library/Application Support/typora-user-images/image-20210301150150432.png)

**报错内容**

```
Property '$track' does not exist on type 'CombinedVueInstance<Vue, { moreRequireList: LabelItem[]; currentMoreRequireList: number[]; remark: string; txtCalc: {}; historyList: any[]; picListUploaded: string[]; loaded: boolean; }, { getOrderRemarkTagsList(): Promise<...>; ... 7 more ...; updatePageData: ActionMethod; }, { ...; }, Readonly<...>>'.Vetur(2339)
```

**问题解决**

- 20210301
- 新增一个类型声明文件

```
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $track: (string, any) => void
  }
}
```

- 参考链接：https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins

### 23. [已解决]如何设置上一个/下一个光标定位的快捷键(210530)

**业务背景**

快捷键总是喜欢自定义.前不久把整个vscode的配置给回退到5个月之前的版本,导致很多配置丢失 ,其中就包括这个 .

今天在看`PONT`源码的时候,发现跳来跳去太不方便了,但是在快捷键里也找不到是哪两个快捷键来控制...找了好久没找到...还是记一个吧,免得下次又忘记了

**问题解决**

- 20210530
- `cmd + k, cmd +s`调起快捷键面板
- 搜索`go back` -> `shift + cmd + j`
- `go Forward` -> `shift + cmd + k`





### 24. vue文件中无法跳转webpack别名(20211210)

配置tsconfig.json

```
{
	"compilerOptions": {
		"allowJs": true,
		"baseUrl": "./",
		"paths": {
			"@/*": ["src/*"]
		}
	},
}
```

### 25. [已解决]vue开启了tsconfig以及Vue.extend还是无法在template里面验证属性(20121214)

#### 问题描述

tsconfig.json中配置了checkJs和allowJs

导致vue的语法也改为了export default Vue.extend({

但是在template里面的变量还是显示的any

![image-20211214113902369](/Users/ranwawa/Documents/personal/document/problem/%E8%BD%AF%E4%BB%B6/img/image-20211214113902369.png)

#### 报错内容

```bash
Property 'checked' does not exist on type 'unknown'.
```



#### 问题解决

需要把所有的计算属性设置返回值才行

#### 参考链接

https://vuejs.github.io/vetur/guide/FAQ.html#template-interpolation-auto-completion-does-not-work



### 26. vue项目中,无法识别@开头的vue组件和图片(20121214)

![image-20211214171641691](/Users/ranwawa/Documents/personal/document/problem/%E8%BD%AF%E4%BB%B6/img/image-20211214171641691.png)

1. tsconfig配置

```
"paths": {
      "@/*": [
        "src/*"
      ]
    },
```

2. vue文件要加上后缀
3. 给图片声明一个d.ts文件

#### 参考链接

- https://vuejs.github.io/vetur/guide/FAQ.html#vetur-can-t-recognize-components-imported-using-webpack-s-alias

- https://stackoverflow.com/questions/54120615/vue-typescript-image-imports-not-found
