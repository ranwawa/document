<!--
 * @Author: ranwawa <ranwawa.ran@huolala.cn>
 * @Date: 2022-04-11 18:22:38
 * @Description:
-->

# 常见问题

## 1 :已解决:使用 ci 工具编译官方 demo 时报错(20220411)

### 问题描述

今天尝试使用 ci 来编译小程序代码.用官方 demo 进行测试,发现两个工作文件的语法出错.

1. from.js 中的 min 是 readonly,尝试把 upload 中的 setting 全部删除掉,然后出现另外一个错误
2. 一个是 import 一个包出现语法错误,试着把所有 setting 全部开启
3. 问题解决

### 问题解决

- 和编译有关.一些新的语法没有完全转义导致语法报错,把 ES6,ES7 开启就可以了

## 2 :已解决:在 node 中直接使用 import 语法(20220411)

### 问题描述

想要在小程序包上传完之后,计算一下包大小然后输出出来以便观察.找了一个 pretty-bytes 的插件.
该包不支持 CMD 规范,即通过 require 无法引入

可是通过 import 语句提示语法报错.node 版本是 16.14.记得是在哪个版本 node 原生支持了 import,可是为什么会报错呢,难道是要在哪儿进行配置?

查阅资料,在 package.json 中添加 type: module 即可,或者将文件后缀名改成.mjs.这样改了之后就不支持 require 了,所以 pass

还提到一个 esm 的模块, node -r esm xx.js.结果也是一样,无法同时支持 require 和 import.但它提示到可以使用动态 import

但使用动态 import 后,又提示不是一个方法,最后 await 一下动态 import 之后,就可以了.不需要做任何修改

### 问题解决

- 使用动态 import 语句即可

参考:

- https://www.geeksforgeeks.org/how-to-use-an-es6-import-in-node-js/

## 3 :已解决:小程序 ci 方案(20220414)

### 问题描述

CI 思路

1. gitlab-ci 上触发小程序上传
   - 体验版机器人和预览机器人要分开,以避免包覆盖
2. 获取到推送结果

- 拿到群 id
  - 上传二维码拿到 imageKey

3. 通过 curl 推送到飞书机器人

机器人 id,群 id,体验版二维码都写死在一个 lark 配置文件中

### 问题解决

```javascript
const ci = require('miniprogram-ci');
const wxAppID = require('./project.config.json').appid;
const packageVersion = require('./package.json').version;

const packageNameMap = {
  __APP__: '主包',
  __FULL__: '合计',
  others: '子包',
};
const projectOption = {
  appid: wxAppID,
  type: 'miniProgram',
  projectPath: './miniprogram',
  // key要设置成gitlab变量
  privateKeyPath: './private-key',
  ignores: ['node_modules/**/*'],
};

const project = new ci.Project(projectOption);

class Lark {
  fetchPack = null;
  fetchInstance = null;
  baseUrl = 'https://open.feishu.cn/open-apis/';
  token = '';

  constructor(appid, app_secret) {
    this.app_id = appid;
    this.app_secret = app_secret;
  }

  async init() {
    const fetch = await import('node-fetch');
    this.fetchPack = fetch;
    this.fetchInstance = fetch.default;
    await this.getTenantAccessToken();
  }

  async fetch(path, option = {}) {
    const { data, method = 'POST' } = option;
    const res = await this.fetchInstance(`${this.baseUrl}${path}`, {
      method,
      body: JSON.stringify(data),
      headers: {
        Authorization: this.token,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    return await res.json();
  }

  async getTenantAccessToken() {
    const res = await this.fetch('auth/v3/tenant_access_token/internal', {
      data: {
        app_id: this.app_id,
        // 同样这个密码要放到gitlab变量中
        app_secret: this.app_secret,
      },
    });
    const { tenant_access_token } = res;
    this.token = `Bearer ${tenant_access_token}`;
    return tenant_access_token;
  }

  async urlToFile(url) {
    const { File } = this.fetchPack;

    const res = await this.fetchInstance(url);
    const blob = await res.blob();

    const file = new File([blob], 'qr.jpg', { type: blob.type });
    return file;
  }

  async getImageKey(file) {
    const { FormData } = this.fetchPack;
    const formData = new FormData();
    formData.set('image_type', 'message');
    formData.set('image', file);

    const response = await this.fetchInstance(`${this.baseUrl}im/v1/images`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: this.token,
      },
    });
    const { data } = await response.json();
    return data.image_key;
  }

  async getChats(user_id) {
    const { data } = await this.fetch('/im/v1/chats?user_id_type=open_id', {
      method: 'GET',
    });

    const { items } = data;
    return items;
  }

  async createChat() {
    const res = await this.fetch('im/v1/chats?set_bot_manager=true');
    return res;
  }

  async inviteMember(chatId, memberIds = []) {
    const res = await this.fetch(
      `im/v1/chats/${chatId}/members?member_id_type=user_id`,
      {
        data: { id_list: memberIds },
      }
    );
    return res;
  }

  async sendPostMessageToChat(chatId, content) {
    const { data } = await this.fetch(
      'im/v1/messages?receive_id_type=chat_id',
      {
        data: {
          receive_id: chatId,
          msg_type: 'post',
          content: JSON.stringify(content),
        },
      }
    );
    return data;
  }
}

const uploadOption = {
  project,
  version: packageVersion,
  // desc最好是整个changelog
  desc: 'hello',
  setting: {
    es6: true,
    es7: true,
  },
  robot: 18,
};

async function upload() {
  try {
    const uploadResult = await ci.upload();

    const prettyBytes = await import('pretty-bytes');

    console.log('------打包成功------');
    const { subPackageInfo, pluginInfo, devPluginId } = uploadResult;
    subPackageInfo.forEach((element) => {
      const { name, size } = element;
      console.log(
        `${packageNameMap[name] || '子包' + name}: ${prettyBytes.default(size)}`
      );
    });
    console.log('------ ------');
  } catch (error) {
    console.error('------打包失败------ ');
    console.log(error);
    console.error('------ ------');
  }
}

async function begin() {
  const lark = new Lark(
    'cli_a281f54e1e399013',
    '5EbF7OgLenoaSaMLCcrjg1yyLPU0OvJR'
  );
  await lark.init();
  const imageFile = await lark.urlToFile(
    'https://tm-image.tianyancha.com/tm/27017dee5f3741e986a0a74325579882.jpg'
  );
  const imgKey = await lark.getImageKey(imageFile);
  console.log(111, imgKey);
  // const id = await lark.inviteMember('oc_9bb298b920cc559e51695f024515247a', ['a2468ccf'])
  const content = {
    zh_cn: {
      title: '------------',
      content: [
        [
          {
            tag: 'text',
            text: '微信小程序体验版发布成功',
          },
        ],
        [
          {
            tag: 'img',
            image_key: 'img_v2_e3b06a7e-dcca-42f7-8896-3e98ed1cad8g',
            width: 300,
            height: 300,
          },
        ],
      ],
    },
  };
  await lark.sendPostMessageToChat(
    'oc_9bb298b920cc559e51695f024515247a',
    content
  );
}

begin();

module.exports = {};
```

### 参考文档

- [微信 ci 官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html)
- [飞书自定义机器人官方文档](https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/bot-v3/use-custom-bots-in-a-group?lang=zh-CN#-e70e541)
