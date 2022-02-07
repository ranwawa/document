# @umijs/plugin-request

1. 构建时配置.umirc.js配置文件中request.dataField的配置是否只对useRequest生效

```
export default {
  request: {
    dataField: 'data',
  },
};
```

2. 运行时配置app.ts中request.credentias是干什么的.加上它之后,本身可以跨域的请求却不能跨域了

```
export const request: RequestConfig = {
  credentials: 'include',
};
```

3. useRequest的用法

### umi-request响应执行顺序

发现里面有很多钩子.

下面两个2选1

- 失败
  
- umi-request.errorHandler
  
- 成功

  1. umi-request.responseInterceptors -> 原始HTTP响应
  2. umi-request运行时配置errorConfig.adaptor -> 格式化之后的HTTP.body

  3.1 umi.request 

  ​		-> 上一步加工之后的ErrorInfoStructure

  3.2 umi.useRequest

  ​      -> .umirc.js.request.dataField过滤之后的数据

# @umijs/plugin-request

1. 学习自定义hook

# pont-engine

1. 如何自己创建一个有条件选项的命令行工具