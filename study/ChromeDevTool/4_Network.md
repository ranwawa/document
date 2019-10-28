## 4.1 Network Issues Guide
### 4.1.1 Queued or stalled requests
Six requests are downloading simultameously. After that, a series of requets are queued or stalled.

On HTTP/1.0 or HTTP/1.1 connections, Chorme allows a maximum of six simultaneous TCP connections per host.

Fixes:
- Implement domain sharding(这个咋弄，没听说过)
- Use HTTP/2.0(一般不都是默认的么，没有自己指定过HTTP版本呀)
- Remove or defer unnecessary requests
### Slow Time To First Byte(TTFB)
A request spends a long time waiting to recieve the first byte from the server.

Cause
- The connection between the client and server is slow
- The server is slow to respond

Fixes:
- Hosting connection on a CDN
- optimizing database queries / implementing a cache / modifying server configuration
### 4.1.2 Slow content download
A request take a long time to download

Causes:
- Then connection between the client and server is slow
- A lot of content is being downloaded

Fixes:
- CDN
- optimizing requests
## 4.2 Reference
### 4.2.1 Record network requests
By default, DevTools records all the network requests in the Network panel, so long as the Devtools is open.

- Stop recording network requests
  - Press `ctrl + e` while the Network panel is in focus
  - Click the red button on the top left of the Network pane
![](https://user-gold-cdn.xitu.io/2019/9/24/16d632b6f36a2b58?w=36&h=36&f=png&s=570)
  - 之前有时候查看请求信息时，遇到有轮询的时候，总是容易把我要关注的请求给盖过，有这个了就可以先暂停纪录，等我看完了再放开
- Clear requests
  - Click the gray button on the top left of the Network panel
![](https://user-gold-cdn.xitu.io/2019/9/24/16d632d1b10f5428?w=26&h=26&f=png&s=318)

- Save requests across page loads
  - Check the `Preserve log` checkbox on the top center of the Network panel\
  - 以前不知道的时候，每次刷新页面请求信息都没了，又要重新发起请求来看数据，现在用上它之后，刷新页面后就不用再重新去造数据发起请求了

- Capture Screenshorts during page load
  - 自己写英文写不来，文档上的说明和现在的版本不一致，点击右上角的设置按钮，选中里面的`Capture screentshorts`复选框
  - Reload the page
  - Interact with the screenshorts
    - Hover over a screentshort to view the point at which that screenshort was captured. A yellow line appears on the Overview pane
    - Click a screenshort's thumbnail to filter out any requests that occured after the screentshot was captured
    - Double a thumbnail to room in on it

- Replay XHR request
  - Right-click the request in the request table and select `repaly XHR`
  - 以前在某些场景下，为了重新发起ajax请求，不得不刷新页面。有了这个方法就可以直接操作了，特别是要在构造数据的情况下，最为方便
 
### 4.2.2 Change loading behavior
- Emulate a first-time visitor by disable the browser cache
  - Check the `Disable Cache` checkobx
  - 以前在需要阻止浏览器缓存请求网页时，会右键点击刷新按钮然后清空数据并硬性加载网页，这样会导致连我保存的密码信息都会清空，有了这个方法就不用再你以前那样低级操作了

- Disable the browser cache from the Netword Conditions drawer
  - If you want to disable cache while working in other DevTools panels
  - `ctrl + shift + p`
  - type *network conditions*

- Manually clear the browser cache / cookies
  - Right-click anywhere in the requests table and select `Clear Browser Cache` / `Clear browser cookies`
 
- Emulate the offline / slow network connections
  - Check an option from the Network throttling menu
  - Or select your desired connection speed from the Network conditions drawer
 
- Override the user agent
  - Open the Network conditions Drawer
  - uncheck the select automatically
  - Choose a user agent option from the menu, or enter a custom one in the text box.
  - 以前还不知道可以直接在浏览器本身有这个功能，每次都要跑到POST MAN里面去伪造，知道这个之后，就会省很多事了
### 4.2.3 Filter requests
- Filter requests by properties
  - Use Filter box text to filter requests by properties, such as the domain or size of the request.
  - You can use mutiple properties simultaneously by seperating each property with a space.
  - Below is a complete list of supported properties,这里只记录属性名，具体的使用方法要用到的时候再查文档，感觉这个用的会比较少,并且很多属性在输入属性名打冒号号会自动提示[传送门](https://developers.google.cn/web/tools/chrome-devtools/network/reference#filter)
    - domain
    - has-response-header,这个就可以用到了，今天早上看图解HTTP第2章里面的cookie相关内容时，在自己做的某个后台系统里面找某个页面哪些响应头包含了set-cookie的时候，是一个链接一个链接点开人肉看的。如果用这个方法，一下就筛选出来了。。。。
    - is
    - larger-than
    - method
    - mime-type
    - mixed-content
    - scheme
    - set-cookie-domain
    - set-cookie-name
    - set-cookie-value
    - status-code
- Filter requests by type
  - To enable multiple type filters simultaneously, hold ctrl and then click.这是个新玩意儿，以前都不知道
- Filter requests by time
  - Click and drag left or right on the Overview pane to only view requests that active during that time frame.
- Hide data URLs
  - Check the *Hide data URLs* checkbox to hide these requests
### 4.2.3 Sort requests
By default, the requets in the Requests table are sorted by initiation time, but you can sort the table using other criteria.

- Sort by column
  - Click the top of any column in Requests table to sort requets by that column.

- Sort by activity phase
  - Right click the header of the Requests table
  - Hover over the *water fall*
  - Select one of the following options
    - Start Time: the first request was initiated
    - Response Time: the first started downloading
    - End Time: the first finished
    - Total Duration: the connection setup/request/response
    - Latency: the shortest TTF
### 4.2.4 Analyze requests
- View a log requests
  - Clicking or hovering over requests reveals more information about them
    - Name
    - Status
    - Type: the MIME type of the resource
    - Initiator.
    - Size
    - Time
    - Waterfall
- Add or remove columns
  - Right click the header of the requests table and select an option to show or hide it.
- Add custom columns
  - 这个貌似用途不大,一般稀奇古怪的报文信息都不会看的吧
- View the timing of requests in relation to one another
  - Requests that are farther to the left started earlier than thoese that are farther to the right
- Analyze the frames of a websoket connection
  - 现在没有websoket链接,所以先不做笔记了
- View a preview of a response body
  - Click the URL of the request
  - Click preview tab
- View a response body
- View HTTP headers
  - By default, the headers tab shows header names alphabetically. To view the HTTP header names in the order they were recieved
    - Click `view source`, next to the Request Headers or Response Headers section
    - 我去,以前不知道,为了看原始请求报文信息,还专门下一个filder去代理请求,绕了TM好大一圈啊
- View query string parameters
- View query string parameters resource
- View Url-encoded query string parameters
- View cookies
  - Click the cookies tab
- View the timing breakdown of a request
  - Click the timing tab or hover over the request's entry in the waterfall column of the requests table
  - Timing breakdown phases explaind
    - Queueing. The browser queues requests when:
      - There are higher priorty requests
      - There are already six TCP connections for this origin
      - The browser is already allocating space in the disk cache
    - Stalled.The request colud be stalled for the any reasons describe in Queueing.
    - DNS Lookup
    - Proxy nigotiation.这个代理协商不知道是干什么的.估计把HTTP权威指南看完了就应该知道了
    - Request Sent.
    - ServiceWorker Praparation.这玩意儿也不知道是干什么的.好像和离线应用有关
    - Request to ServiceWorker
    - Waiting TTFB
    - Content Download
    - Receving Push.不知道是啥
    - Reading Push.
- View initiators and dependencies
  - 这个很有用啊,现在可以清清楚楚的知道所有的请求分别是因为什么原因发起的了
  - Hold *shift* and hover over the request in the Reuqests table
    - initiator's color is green
    - dependencies's color is red
- View Load Events
  - *DomContentLoaded* event is colored blue
  - *Load* event is colored red
  - 这两个事件分别意味着啥?就是内容下载完,页面渲染完?对实际开发有啥指导意义呢?
- View the total number/download of requests
  - Is listed in the Summary pane at the bottom of the Network panel
- View the stack trace that caused the request
  - Hover over the initiator column to show the strack trace that leading up to the request
- View uncompressed source size of the request
  - Click *Use Large Request Row* and then look at the bottom value of the Size Column
### 4.2.5  Export requests data
- Save all requests to a HAR file
  - Right click and select *Save as HAR with content*
- Copy one or more requests to the clipboard
  - Right-click and select copy...
  - 之前在浏览器中发现请求有问题需要去其他地方(postman)模拟的时候,就一个一个复制粘贴,特别是请求参数特别多的时候要搞好久,现在有了cURL复制,一键就导入进去了.爽歪歪啊!!!!!
### 4.2.6 Change the layout of the Network panel
- Hide the filters pane
![](https://user-gold-cdn.xitu.io/2019/9/29/16d7c3608250eb37?w=28&h=24&f=png&s=434)
- Use large request rows
![](https://user-gold-cdn.xitu.io/2019/9/29/16d7c3ac8db06004?w=28&h=20&f=png&s=101)
- Hide the overview pane
![](https://user-gold-cdn.xitu.io/2019/9/29/16d7c39666b1ed47?w=34&h=22&f=png&s=116)

## TODO
### 4.1.1 请求分片是啥，如何做？
### 4.1.2 如何自己指定HTTP版本？
### 4.2.5 cURL和HAR是啥子玩意儿?








