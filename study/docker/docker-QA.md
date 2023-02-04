# docker QA

## 1 在 mac 上运行命令时提示 "no matching manifest for linux/arm64/v8 in the manifest list entries"(2022-05-17)

### 问题描述

通过 docker pull sonarqube 命令安装镜像,就直接报这个错

```bash
Using default tag: latest
latest: Pulling from library/sonarqube
no matching manifest for linux/arm64/v8 in the manifest list entries
```

也不知道啥原因,先临时解决一下.pull 加个参数: docker pull --platform linux/x86_64 sonarqube

### 问题解决

### 参考链接

- [stackoverflow 讨论](https://stackoverflow.com/questions/65456814/docker-apple-silicon-m1-preview-mysql-no-matching-manifest-for-linux-arm64-v8)
