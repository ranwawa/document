## 1. [已解决]为什么单元测试的后缀名要是spec.js(191230)

**业务背景**

今天2019-12-30开始在生产环境中学着写单元测试,看到`vant-ui`和`element-ui`里面的单元测试文件,都是以这个结尾的.为啥呢?搜索了一圈都没有描述的

**问题解决**
- 20200108
- 就是行业潜规则,约定俗成了
- 就像jest会自动遍历所有*spec.js和*.test.js文件一样

## 2. [已解决]vue单元测试官方文档中提到的存根是啥玩意儿(20200107)

**业务背景**

正式开始写单元测试代码,通读了vue单元测试的官方源码,里面有一些内容表示闻所未闻,其中一个就是它.

**问题解决**
- 大概在网上搜索了一下,就是为了破除依赖,保证最小化的单元测试,而创建的一个简易对象
- 概念是这个概念,实际有啥用还有待使用中学习了

## 3. [已解决]如何获取一个组件的具体CSS样式值,以及如何测试prop是否验证失败(20200108)

**业务背景**

- 写了一个button组件,有一个props叫type,可以传入primary,info等值,传入primary后,会给组件添加一个类名叫uv-btn_primary,
它对应的CSS样式有一个color: blue;就想测试一下,传入这个值后,颜色是否是blue.但是在单元测试里面根本无法获取到元素对应的样式
- 另外,对type这个prop也添加了validate,只能够传入primary,info等指定值,就是想要测试一下,如果传入other,是否返回了一个异常,可实测下来,setProps方法始终也是返回的undefined

```javascript
describe('prop type测试', function () {
  const wrapper = mount(Button, {
    propsData: {
      type: 'primary',
    },
  });
  it('传递type时,类名要跟着变化', () => {
    expect(wrapper.classes()).toContain('uv-btn_primary');
  });
  // 这里会报错,因为color始终返回的是undefined
  it('传递type时,颜色要跟着变化', () => {
    expect(wrapper.element.style.color).toBe('#fff');
  });
  // 这晨也会报错,国为方法始终返回的是一个undefined而不是异常
  it('type传入other时,要报错', () => {
    expect(wrapper.setProps({ type: 'other'})).toThrowError();
  });
});
```


**问题解决**
- 20200112
- vue test官方文档有说明,无法测试css样式,只能测试内联样式
  - 参考: https://vue-test-utils.vuejs.org/zh/guides/#常用技巧
- 不需要测试props的validate方法
  - 这个是属于vue的功能,不在我们的单元测试范畴
  - 单元测试的范围一定只是测试自己的单个业务功能
