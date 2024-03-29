## 请求模型验证

### 业务背景

之前在调用接口之前,总是会对请求参数进行验证,特别是用户输入表单,久而久之,越来越觉得这样操作非常麻烦,提交接口前,一大串验证逻辑,写得时候觉得非常无聊,回归代码时看着心头也烦.最近写一个新项目,在封装 ajax 的拦截层时,就想着把这个东西给统一处理一下

**调整思路**

之前用过 C#的 MVC 和 mongoose,这两个东西都把模型单独分开来写,并且在模型的字段上面定义各种约束特性,在数据操作时会自动进行验证.我就在想,我也可以搞个模型文件,分别对应每个请求的请求参数,语法就参照 mongoose 或者其他的 validate 插件,在发起请求前,统一自动验证一下,这样就把验证逻辑和业务代码解耦了,纯配置方式操作,自动执行,感觉效率和安全性上都会提高.试了一天,搞了个简易版本,先纪录一下,以后再慢慢优化

大致流程如下:

- 封装 ajax request 基类
- 封装所有请求接口,在接口对象上设置模型引用
- 添加对应的模型文件
- 在正式发送 ajax 请求之前拦截请求
- 根据模型文件对实际请求参数进行校验

**具体代码**
request.js 请求基类

```javascript
export default function (options) {
  const { model, data, url } = options;
  // 拦截请求,检验数据
  const result = interceptRequest(model, data);
  if (result) {
    // 验证成功再进行请求
    ajax(url, data);
  } else {
    // 验证失败
    alert(result);
  }
}
```

api.js 接口文件

```javascript
export default {
  login(data) {
    return request({
      data,
      model: loginModel,
      url: 'api/login',
    });
  },
};
```

models.js 模型文件

```javascript
export default {
  userName: {
    type: String,
    default: '',
    required: [true, '请输入用户名'],
    validate: [/.{2,18}/, '用户名不合法'],
  },
};
```

interceptRequest.js 拦截器

```javascript
export default function (model, data) {
  // 要进行规则验证比如required,validate,min,max等,到时参照mongoose的搬过来
  // 要进行类型验证
  // 还要赋默认值,如果有默认值,却没传时
}
```

## 响应模型验证

### 业务背景

也是业务中的痛点,在接收到后端的返回参数时,经常会返回一大堆无用数据,每次都要手动的清洗一下数据,非常麻烦并且和业务代码夹在一起,看着头疼.另外就是,本身很多字段约定的是固定的类型,后端却经常会返回 null 或者返回一个错误的类型.
这个东西也没办法指望所有后端都百分百的统一按照约定来.所以干脆在响应拦截里面,也加上一层过滤,通过模型的方式把数据洗一下

**调整思路**

- 首先一个原则是,并非强制验证,如果没有添加模型文件,直接原样返回
  - 这是在几本技术书上看到的一个思路,用中国话来讲,就是严于律已,宽以待人
  - 请求出去的,每个请求必须进行模型验证,返回回来的嘛,有就最好,没有就算了
- 还是在接口文档上设置响应模型
- 在请求基类的拦截方法里面进行处理
- 如果返回的值格式有语,要报错
- 如果差返回值,则要根据类型赋默认值

**具体代码**

这一套的逻辑还比较混乱,如果返回格式未约定好,要做统一的处理还是非常麻烦的.so...再继续摸索两天,回来完善这部分
