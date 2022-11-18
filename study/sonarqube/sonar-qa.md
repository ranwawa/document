# sonar qa

## 1. 如何导致 eslint 报告(2022-10-28)

### 问题描述

sonar 无法直接集成 eslint,只能导入 eslint 生成的报告,之前搞过一次.现在又忘记了.所以记录一下

### 问题解决

1. 下载 scanner
2. 将 scanner 添加到环境变量
3. 创建一个 sonar 项目
4. 获取 sonar 项目的 token
5. 在项目根目录添加`sonar-project.properties`文件
6. 运行命令

### 参考链接

- [sonar 官网](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)
