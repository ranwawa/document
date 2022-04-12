### 1. 【已解决】height + line-height 无法垂直居中（20210105）

### 业务背景

上一版确认订单页面将元素的`height`和`line-height`设置成一样的，开发者工具一切正常，在真机上居然无法垂直居中了，由于赶着上线，所以当时用了`flex`布局临时应付了一下

**测试代码**

```vue
<template>
  <view>
    <template>
      <view>
        display: block;
        <view v-for="item in 10" :key="item">
          <view
            :style="{
              height: 9 + 7 + item + 'px',
              margin: '5px',
              'font-size': 9 + item + 'px',
              'line-height': 9 + 7 + item + 'px',
              outline: '1px solid red',
            }"
          >
            {{ 9 + item }}
          </view>
        </view>
      </view>
    </template>
  </view>
</template>
```

**测试结果**

|                    | 安卓微信和 mpaas | IOS 微信和 mpaas | 开发者工具 | Chorme |
| ------------------ | ---------------- | ---------------- | ---------- | ------ |
| Block-mpaas        | x                | o                | o          | -      |
| Inline-block-mpaas | x                | o                | o          | -      |
| Inline-block-微信  | x                | o                | -          | o      |
| block-微信         | x                | o                | -          | o      |

只在安卓下面，且是部分字号有不垂直居中的情况。

**问题排查**

知乎上这个回答好像可以解释这个问题，是因为字体原因导致的。

Height + line-height 是控制文字的 content-area，而文字在 content-area 内部已经向上偏了

为什么会向上偏呢

- 因为安卓上，中文在安卓系统中的 fonts.xml 里面没有中文字的字体
- 所以安卓始终是以英文的方式渲染中文字体
- 就导致偏差的出现了

### 问题解决

- 202210105
- 行高的方式
  - html 元素上设置`lang="zh-cmn-Hans"` 加上 `font-family`设置成中文
- 其他方式（就不采用字体的逻辑就可以避开那个坑）
  - flex
  - Table cell
  - 大字体 + 缩小
  - 单独给行高设置高一丢丢

参考

- https://www.zhihu.com/question/39516424
- 另外一个文章的思路也很好，作者直接看百度是怎么处理的。秒懂。

### 2. 10 号字体使用 flex 无法居中的问题（20210105）

### 业务背景

同上，在一个`badage`里面有 10 号的字体，即使换成了 flex 居然还是往上偏

无论是否设置 line-height 都没影响

- 估计再过段时间 回来看，写上面这句话就说明不懂 css。。。现在不去深究了

**测试代码**

```vue
<template>
  <view>
    <template>
      <view>
        display: block;
        <view v-for="item in 10" :key="item">
          <view
            :style="{
              display: 'flex',
              'align-items': 'center',
              height: 9 + 7 + item + 'px',
              'line-height': 9 + 7 + item + 'px',
              margin: '5px',
              'font-size': 9 + item + 'px',
              outline: '1px solid red',
            }"
          >
            h:{{ 9 + 7 + item }} f:{{ 9 + item }}
          </view>
        </view>
      </view>
    </template>
  </view>
</template>
```

**测试结果**

|      | 安卓 mpaas | 安卓微信 | 开发者工具 | Chorme | ios 微信及 mpaas |
| ---- | ---------- | -------- | ---------- | ------ | ---------------- |
| Flex | 10-14px    | 10x      | o          | o      | o                |

14 号及以下的向上偏移了一个像素，其他可能也偏移，因为大效果不太明显

**问题分析**
