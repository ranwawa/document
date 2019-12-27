## 1. style-resoures-loader如何直接引入node_modules里面的文件

**业务背景**

自己把公用的sass抽离成了一个npm包,这样可以在每个项目里面方便的引入,可是在`vue.config.js`里面配置`style-resources-loader`的时候,只能通过相对路径引入,而无法直接引入`node_modules`下面的文件

下面的代码,去掉`node_modules/`,公共scss就无法正常引入

**示例代码**

```javascript
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    // 引入公共scss
    [
      'vue',
      'normal',
      'vue-modules',
      'normal-modules',
    ].forEach((type) => {
      const rule = config
        .module
        .rule('scss')
        .oneOf(type);
      rule
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: ['node_modules/rww-sass/_index.scss'],
        });
    });
    ...
```
