## 14.1 计时器

- setTimeout()
- clearTimeout()
- setInterval
- clearIterval

**注意**
- setTimeout 时间为0时,指定的函数不会立即执行,会放在队列中,等前面等待状态的事件全部执行完后再执行


## 14.2 浏览器定位和民航

**URL和location的区别:**
- document.URL始终保持初始状态不会变
- document.location在片段变后会更新

location === document.location === window.location

### 14.2.1 解析URL
**常规属性:**
- href:完整的url
- hash:片段标识符
- search:查询字符串
- protocol:协议
- host:主机
- hostname:主机名
- port:端口
- pathname:路径

### 14.2.2 载入新的文档
**常规方法:**
- assgin:可以保存后退
- replace:没法后退
- reload:
- location = 'url'

**i注意:**
- 可以赋值相对url
- 可以赋值片段
- 可以赋值查询字符串

## 14.3 浏览历史

**history常用方法:**
- go:指定
- back:后退
- forward:前进

**子窗口中的注意情况:**
- 子窗口的浏览历史也会按时间顺序穿插在主窗口的历史中
- 也就是说,主窗口调用history.back可能只是让子窗体跳转了,主窗口自己却没有变化

## 14.4 浏览器和屏幕信息

### 14.4.1 Navigator对象
好吧,这个对象居然是为了纪念网景保存下来的,本可以使用clientInformation,却非得选navigator

**常用属性:**
- appName:非IE浏览器只返回Netspace,这是作死么
- appVersion:版本
- userAgent:用户代理
- platform:系统
- online:是否在线
- geolocation:地理位置
- javaEnabled:java小程序
- cookienable:保存永久cookie

### 14.4.2 Screen对象
**常用属性:**
- width/eight
- availWidth/availHeight
- colorDepth

## 14.5 对话框

- alert
- confirm
- prompt
- showModalDialog:模态对话框..搞个半天在chorme和ff里面已经不支持了
	- 第一个参数是url
	- 第二个参数是任意值,传递给模态框
	- 第3个参数是列表,控制对话框样式
	- window.returnValue 会接收模态框的返回值
	- window.close()关闭模态框

**注意**
- 前三者都是显示纯文本无法html渲染
- 并且会阻塞UI进程


## 14.6 错误处理

**3个参数:**
- 1:描述错误的一条消息
- 2:存放引发错误的所在文档的url
- 3:发生错误的行数

**返回值:**
- 返回false通知浏览器不用抛出异常了
- 火狐里要返回true才行

**应用:**
-有了try后它就只在开发测试时比较有用了

## 14.7 作为Window对象属性的文档元素

可以像访问window属性一样有ID的访问文档元素

**3点注意:**
- window已经有这个属性的不起作用
- js里面声明了变量的不起作用
- iframe窗体不会返回文档元素,而是返回子窗体的window对象

## 14.8 多窗口和窗体

- 对于客户端js来说,窗口,标签,窗体是浏览上下文
- 对于js来说,它们是window对象

### 14.8.1 打开和关闭窗口
用window.open来打开一个新的浏览器窗口,返回window对象
**open的4个参数:**
- 1 要显示的url,不写则是about:blank 
- 2 要打开的窗口的名字即winodw.name 
	- 如果存在,会直接在这个窗口中打开.
	- 如果没有这样一个窗口,则会打开一个新窗口,把把值赋给他
	- 如果不写,则默认打开新窗口,不命名
- 3 逗号分隔的列表,控制新窗口的样式
- 4 第2个参数存在时才会有用,用于指定在那个名字的窗口里面是replace还是open

**重要的属性:**
- window.opener:是谁打开我的

window.close关闭窗口

**注意:**
- close不能关闭窗体
- 关闭后window对象其实还存在 ,只是closed属性为true而已,document也变成Null

### 14.8.2 窗体之间的关系

- 表述自己
	- window
	- self
- 表述父级
	- parent
- 表述顶级
	- top
- 表述下级
	- 子窗体的window.contentWindow.frameElement
	- document.getElementbyId('子窗体')  ===  document.getElementbyId('子窗体').frameElement
	- window.frames[0]

**注意:**
	- 顶级窗口parent = self
	- 顶级窗口 parent = self = top = window
	- 顶级窗口的window.frameElement === null

### 14.8.3 交互窗口中的JavaScript

不同的窗口虽然可以互相影响,但必须调用他们各自的window对象

牢记一点:词法作用域

实事上我们所谓的window,self,top,parent都只是window全局对象的一个代理而已,并不是真正的window全局对象

因为每次在窗口中载入新的内容时,都会开启一个新的执行上下文,这个上下文包含一个新创建的全局对象,他们都指向全局对象的