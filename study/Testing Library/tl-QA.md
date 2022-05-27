# tl QA

## 1. [已解决]输入文字和删除文字的几种方式(2022-05-26)

### 问题描述

刚刚测试用 antd-vue 写的 input 框遇到一个问题,当 input 有错误消息时,再输入一个文字,则清空错误消息...单元测试一直没通过.

排查问题时发现好多种方式可以输入文字,便记录一下,方便后期查看

### 问题解决

输入文字

```javascript
const element = screen.getByLabelText('用户名');

fireEvent.update(element, 1); // 用于v-modal
fireEvent.input(element, { target: { value: 1 } });
fireEvent.change(element, { target: { value: 1 } });

user.paste(1);
user.type(element, 1);
user.click(element);
user.keyboard(1); // 必须要先聚焦再输入文字
```

删除文字

```javascript
fireEvent.update(element, ''); // 用于v-modal
fireEvent.input(element, { target: { value: '' } });
fireEvent.change(element, { target: { value: '' } });

user.cut();
user.clear(element);
user.keyboard('[Backspace]');
```

### 参考链接

- [官方 fireEvent 文档](https://testing-library.com/docs/dom-testing-library/api-events)
- [user event 文档](https://testing-library.com/docs/user-event/keyboard)

## 2. [已解决]keyboard 输入文字时,第一个文字总被忽略掉(2022-05-27)

### 问题描述

第一次用 VTL 编写单元测试,突然发现官方有个 bug,就是在 keyboard 输入文字时,第一个字母总是出不来

比如下面的代码,最终输入进去的只有 bcde

```javascript
it('如果输入的密码错误,则会提示错误,重新输入则会清空错误信息', async () => {
    const { user } = setup();

    user.click(screen.getByLabelText('密码'));
    await user.keyboard('abcde');
    user.click(screen.getByText('确 定'));
```

可 google 的时候居然没有类似的问题

### 问题解决

任何 UI 上的变动,都是异步行为.第一次点击 -> 输入第一个字母,等待渲染 -> 聚集到密码框上 -> 输入第 2 个字母,等待渲染

所以在 click 事件前加上 await 就行了.

所以这个也提醒下自己,当以后发现 google 一个问题发现完全没有相关的条目时,肯定就是自己最简单的都搞错了导致.

### 参考链接
