### 简述
什么是prettier
- 专门用来统一代码风格的插件

为什么要使用prettier
- 统一的风格格式化所有代码
- 支持所有前端语言和IDE

官网
- https://prettier.io/

### 集成prettier
集成成功后,会在保存代码时,自动进行格式化.

WebStorm中集成
- 安装node
- 全局安装插件
  - npm install prettier -g
- webpack配置
  - settings -> Language & Frameworks -> Prettier
  - 勾选Run on save for files
  - 配置格式化的文件`{**/*,*}.{css, graphql, js, json, jsx, less, sass, scss, ts, tsx, vue, yaml}`
- 参考
  - https://prettier.io/docs/en/webstorm.html

VSCode中集成
- 参考
  - https://github.com/prettier/prettier-vscode

webpack中集成
- 安装插件
  - npm install --save-dev prettier prettier-webpack-plugin
- webpack配置
```javascript
var PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
  // ... config settings here ...
  plugins: [
    new PrettierPlugin()
  ],
};
```
- 参考
  - https://github.com/hawkins/prettier-webpack-plugin

### 配置文件
prettierrc.js
```javascript
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  trailingComma: "es5",
  bracketSpacing: true,
  jsxBracketSameLine:false,
  arrowParens: "avoid",
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: true,
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  vueIndentScriptAndStyle: false,
  endOfLine: "lf",
};
```
