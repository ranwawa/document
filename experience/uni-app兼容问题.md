## 全局配置

### 1. navigationBarTextStyle,navigationBarBackgroundColor(20200229)

|平台|属性名|默认值|注意事项|
|:-:|:-:|:-:|:-:|
|uni-app|navigationBarTextStyle|#F7F7F7|默认值对APP与H5有效|
|weixin|navigationBarTextStyle|#000000||
|alipay|titleBarColor||会决定导航标题的颜色|
- 支付宝小程序无`navigationBarTextStyle`属性,即无法自定义title的颜色
- 是根据`navigationBarBackgroundColor`进行自适应的

在配置背景色的时候,如果是黑白以外的值,一定要注意支付宝小程序表现出来的样式是否和预期一样

### 2. navigationStyle,transparentTitle(20200229)

- 支付宝小程序无navigationStyle属性,即无法隐藏导航条
- 可以设置transparentTitle为always透明导航条,来达到同样的效果
  - 设置标题为空字符串,以隐藏标题
  - 设置点击穿透,以触发点击效果
    - 但标题那一行,还是无法穿透
    - 只是电量那一行可以穿透而已

在配置自定义导航条的时候,支付宝小程序上尽量别带手势事件的交互效果,仅做视觉效果即可

### 3. enablePullDownRefresh,allowsBounceVertical(20200229)

- 微信小程序设置enablePullDownRefresh后即可开启下拉刷新
- 支付宝小程序要额外设置allowsBounceVertical后才能开启下拉刷新
  - 支付宝小程序在开发工具中无效

开起下拉刷新时,一定要注意开启支付宝的这个属性

### 4. backgroundColor(20200229)

- 微信小程序下,该值是设置下拉刷新窗口的背景色
- 支付宝小程序,设置的是整个页面的背景色

最好是别设置该属性,或者在支付宝小程序下通过页面的根元素进行覆盖,支付宝的下拉刷新窗口背景色是通过backgroundImageColor设置的,但是测试未生效


### 5. titleImage(20200229)

- 导航标题图片,仅支付宝及H5,APP拥有效果

在展示logo或者自定义导航的时候比较有用,其他平台可以用文字做降级处理

## VUE实例

### 1. $slot(20200301)

- 支付宝小程序里面的this对象上,$slot属性为undefined
- 所以最好别用该属性

## 基础组件

### 1. input.placeholder(20200301)

- 支付宝小程序默认有一个padding-left: 4px;
- 所以在文字对齐,特别是input下面的提示文字或错误警告时需要注意
