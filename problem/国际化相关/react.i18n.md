### 1. [已解决] `<Trans>`组件中,在翻译json文件中的索引是如何识别的?(20210725)

**业务背景**

今天在家里搞一个需求,其中一个地方需要使用到这个组件,因为嵌套了一个a标签.依样画葫芦把需求给实现了.但这个索引的规则确实没搞懂,官网也没有这一块的介绍

以官网的一段代码为例,为什么第一个索引是1,最后一个索引是5,2,3,4分别对应谁?

**示例代码**

> ComponentTest.js

```javascript
import React from 'react';
import { Trans } from 'react-i18next'

function MyComponent({ person, messages }) {
  const { name } = person;
  const count = messages.length;

  return (
    <Trans i18nKey="userMessagesUnread" count={count}>
      Hello <strong title={t('nameTitle')}>{{name}}</strong>, you have {{count}} unread message. <Link to="/msgs">Go to messages</Link>.
    </Trans>
  );
}
```

> translation.en.json

```json
"userMessagesUnread": "Hello <1>{{name}}</1>, you have {{count}} unread message. <5>Go to message</5>.",
"userMessagesUnread_plural": "Hello <1>{{name}}</1>, you have {{count}} unread messages.  <5>Go to messages</5>.",
```

**尝试**

开始自己去乱试着改索引...真是浪费时间,改了几分钟没搞清楚链接.最后发现官网上原来是有介绍的.并且还有几种方式

**问题解决**

- 20210725
- 参考链接: https://react.i18next.com/latest/trans-component#how-to-get-the-correct-translation-string

