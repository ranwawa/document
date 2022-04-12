1. [已解决]如何自动生成目录结构(191101)

## 1. [已解决]如何自动生成目录结构(191101)

### 业务背景

在编写技术文档时,经常会遇到罗列目录结构的时候,截图吧不优雅,手动输入吧又太麻烦.之前在看`webpack`文档时发现他们的目录结构很好看,所以想到肯定会有办法自动生成.so...

如下

```
├─docs
├─resources
│  ├─component
│  ├─data
│  ├─js
│  └─style
├─src
│  └─203
│      │  about.html
│      │  detail.html
```

### 问题解决

- `xindows + r`呼出运行窗口
- 输入`cmd`打开命令行工具
- 定位到指定目录
- 输入`tree /f`
  - 带/f 会输出文件
  - 不带/f 只输出目录
- 参考链接: https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/tree
