### 业务背景

上个月底,新同事问题了我一个问题,也是关于这个函数的,说是他在阿里面试时被问到的,要求完完整整的掌握这些原生函数的所有用法,他的问题是知道这个函数吗?这个函数有几个参数?第3个参数是干什么的?
而我当时只知道第3个参数和事件捕获,冒泡有关.却忘记了绑定一次性事件

最近看VUE源码的时候,在绑定事件时,是调用的系统原生的addEventListener函数.而这个函数之前在通读JavaScript源码的时候有点印象.但经过上次提问后,我还是木有深刻掌握该函数.在vue里面的once还有另外一个用法,都是通过这个参数来实现的

所以这次务必搞定它并且记录下来.顺道把整个Event相关的文章通读一下.

### 概述
绑定事件的3种方式
- html上直接写 <div onclick="handleClick">
- eventTarget.addEventListener('click', handleClick)
- eventTarget.onClick = handleClick

触发事件的2种方式
- 用户触发
- 编程触发

编程触发的2种方式
- eventTarget.click()
- eventTarget.dispatchEvent(eventType)

### addEventListener

参数
- 事件类型
- 事件处理函数,
- 其他选项
  - capture: 是否捕获
  - once: 执行一次
  - passive: 事件处理函数无法阻止默认事件

### Event对象

<script async src="//jsfiddle.net/ranwawa/q81nwypt/6/embed/"></script>

### Event.phase事件阶段

注意的是,如何注册的是捕获事件,事件目标上会触发两次type为2(本身)的事件

其他地方就是一次1(捕获)一次3(冒泡)

示例
- https://developer.mozilla.org/zh-CN/docs/Web/API/Event/eventPhase

