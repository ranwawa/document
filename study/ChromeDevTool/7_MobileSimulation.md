## 7.1 Overview
- Some problems
  - The architecture of mobile CPUs is very different than the architecture of laptop or desktop CPUS.

### 7.1.1 Simulating a mobile viewport
- Simulate a moblie viewport
  - Click *Toggle Device Toolbar*
![](https://user-gold-cdn.xitu.io/2019/10/8/16da9b7eecb59d55?w=30&h=32&f=png&s=146)
- Responsive View Mode
  - Drag the handles to resize the viewport to whatever dimensions you need.
- Mobile device viewport mode
  - Select the device from the device list
- Rotate the viewport to landscape orientation
  - Click the button
![](https://user-gold-cdn.xitu.io/2019/10/8/16daa11ed0cb87e0?w=29&h=28&f=png&s=534)

- Set the divice type
  - 文档上介绍的入口没有了
  - 只有在增加自定义屏幕的时候会有这个选项
  - The table below describes the differences between the options.

|Option|Rendering Method|Cursor Icon|Events Fired|
|-|:-:|:-:|:-:|
|Mobile|Mobile|Circle|touch|
|Mobile(no touch)|Mobile|normal|click|
|Desktop|desktop|normal|click|
|Desktop|desktop|circle|touch|

- Add a custom mobile device
  - Click the divice list
  - Select edit
  - Click *Add custom device*
- Show Media Queries
  - Click *More Options*
  - Select *Show media queries*
  - 这个东西点了没效果,不知道是干什么用的
- Show Rulers
  - Click *More options*
  - Select *show rulers*
- Zoom the viewport
  - Use the Zoom list to zoom in or out
### 7.1.2 Throllting the performance
- Throttling the network and CPU
  - Click *Throttle list*
  - Select the option
- Mid-tier
  - fast 3G
  - 4 times slower than normal
- Low-end
  - slow 3G
  - 6 times slower than normal
- Throtte the CPU/network only
  - Go to panformance panel
  - Click the button
![](https://user-gold-cdn.xitu.io/2019/10/8/16daa207b4f22569?w=28&h=28&f=png&s=324)
  - Click CPU/Network check list
- Throttle the Network only
  - Go to Network panel
  - Click the Throttle list
  - or `ctrl + shift + p`
  - Type *network condition*
  - Click *Drawer show*
### 7.1.3 Simulating geolocation/Setting orientation
- Press `ctrl + shift + p`
- Type *Sensors*
- Click *Drawer show*
## 7.2 Emulate and test other Browsers
这个教程真心不错,不仅教你DevTools怎么用,还给开发建议.而且不仅仅是介绍自己的浏览器,还介绍了Firefox和Edge.不过调试工具就只用Chrome就行了,IE嘛算了,windows phone下架了都

- Firfox's Responsive Design View
  - 只用Chrome,跳过

- Edge's F12 Emulation
  - 不测windows phone,跳过

- Android Emulator
  - 在电脑上运行安卓虚拟机,还要装好几个软件,这个估计要单独花上两天时间来学习,

- Cloud-based emulators and simulators
  - 这里全部介绍的是一些国外的商业产品,还是自己找找国内对应的产品吧
 
- Emulator 和 Simulator 的区别
  - Simulator是模拟器,属于仿真器的低级阶段...
  - EmuLator是仿真器,能更好的模拟硬件设备的运行方式
  - 还有线上趁机测试.这三个完全不同的档次
 
## TODO
### 7.2 用一用安卓仿真器和在线真机测试