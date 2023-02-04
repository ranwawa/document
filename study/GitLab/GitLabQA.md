# GitLabQA

- [1. :已解决:如何在 gitlib-ci.yml 中把本次提交改变的文件赋值给一个变量(20210927)](#1-已解决如何在-gitlib-ciyml-中把本次提交改变的文件赋值给一个变量20210927)
- [2. :已解决:windows 上安装 gitlab-ci runner 的步骤(20220412)](#2-已解决windows-上安装-gitlab-ci-runner-的步骤20220412)
- [3. :已解决:Mac 上安装 gitlab-runner 后无法启动（20220414）](#3-已解决mac上安装gitlab-runner后无法启动20220414)

关键节点通知:

- Created/merged/commented 的时候自动给群里发消息

CI:

- Test
  - 安装 husky
  - 添加 pre-1commit 钩子,执行 umi-test --bail --findRelatedTests 但是针对这个文件的测试报告怎么生成???
- Eslint
  - 安装 husky
  - 添加 pre-commit 钩子,执行 npx lint-staged
  - Lint-staged.config.json 中配置 eslint 命令
- Prettier
  - 安装 husky
  - 添加 pre-commit 钩子,执行 npx lint-staged
  - Lint-staged.config.json 中配置 prettier 命令

Hook:

- commit msg
  - husky 钩子工具
  - @commitlint/cli 检查工具
  - @commitlint/config-conventional 风格配置
- Branch name

## 1 :已解决:如何在 gitlib-ci.yml 中把本次提交改变的文件赋值给一个变量(20210927)

### 业务背景

prettier 在 ci 的过程中做增量检测.需要以下几个步骤

0. 声明一个 gitlab 变量 xxx
1. 执行 git 命令拿到当前改变的文件名
2. 将 git 命令的结果赋值给$xxx
3. 运行 yarn prettier --check $xxx

尝试了好几种方式,都无法赋值成功.

### 示例代码

```yaml
image: node:latest

stages:
  - test

test:
  stage: test
  tags:
    - global-ci
  variables:
    COMMIT_FILES: git diff-tree --no-commit-id --name-only -r $CI_COMMIT_SHA
  script:
    - echo $COMMIT_FILES
    # -> git diff-tree --no-commit-id --name-only -r 01e80f41c21ab51d26b98988fbdb9fffae2f69bf
    - $COMMIT_FILES = $(git diff-tree --no-commit-id --name-only -r $CI_COMMIT_SHA)
    - echo $COMMIT_FILES
    # fatal: ambiguous argument '=': unknown revision or path not in the working tree.
    - yarn prettier --check git diff-tree --no-commit-id --name-only -r $CI_COMMIT_SHA
```

### 参考文档

- https://forum.gitlab.com/t/ci-cd-pipeline-get-list-of-changed-files/26846/18
- https://stackoverflow.com/questions/53965694/how-to-set-variable-within-script-section-of-gitlab-ci-yml-file

### 问题解决

- 20210928
- 在变量赋值时,变量前面不要使用`$`号即可
- 更简单的方法,不需要使用变量,直接在--check 后面跟代码

```yaml
script:
  - COMMIT_FILES = $(git diff-tree --no-commit-id --name-only -r $CI_COMMIT_SHA)
  - yarn prettier --ignore-unknown --check $(git diff --diff-filter=d --no-commit-id --name-only -r $CI_COMMIT_BEFORE_SHA HEAD)
```

## 2 :已解决:windows 上安装 gitlab-ci runner 的步骤(20220412)

### 问题描述

今天要在 gitlab.com 上测试小程序自动上传生成二维码.结果官方需要验证信用卡才给用共享 runner.那只能在自己 windows 上装一个跑跑

记录下步骤,避免以后又忘记了

### 问题解决

1. 安装 docker
2. docker 启用 node 镜像
3. 安装 runner
4. 注册 runner
5. 在 gitlab.com 上执行 pipeline

### 参考链接

- [第 3 方教程,有 windows 截图](https://techdirectarchive.com/2021/09/28/how-to-install-register-and-start-gitlab-runner-on-windows/)
- [官方 windows 安装包](https://docs.gitlab.com/runner/install/index.html)
- [官方注册教程](https://docs.gitlab.com/runner/register/#windows)

## 3. :已解决:Mac 上安装 gitlab-runner 后无法启动（20220414）

### 问题描述

开始是按照 windows 的流程进行安装，下载 docker,gitlab-runner,然后直接 install 和 register,注册成功后在 gitlab setting CI/CD runners 中看到这个 runner 一直是灰色的停用状态

### 问题解决

- 应该要参照官方文档，安装 rubby 后才行
- 如果注册时选择了 tag，则要在见面编辑中关掉 tag 限制，否则也会因为即使是绿的，也会无法运行 job

### 参考链接

- [mac 注册官方文档](https://docs.gitlab.com/runner/configuration/macos_setup.html)
- [绿色无法运行 job](https://stackoverflow.com/questions/53370840/this-job-is-stuck-because-the-project-doesnt-have-any-runners-online-assigned/53371027#53371027)

## 4 :已解决:什么是 SSH(20220413)

### 问题描述

在使用 GIT 的时候,一直有一个 SSH 的克隆链接.却从来没有去了解过他是什么,怎么用的.根据前端时间定下的就近就深原则.工作中常见的事项要深入了解.那就好好看看

### 问题解决

- SSH 是安全的终端协议以及根据这个协议实现的一系列工具
- SSH 的工作方式: SSH 命令会连接到一个远程服务器,并且将远程的公钥保存到 known_hosts 文件中
- SSH 可应用在: 数据传输,远程命令执行等方面

### 参考链接

- [SSH 完整介绍](https://www.techtarget.com/searchsecurity/definition/Secure-Shell)

## 5 gitlab ci 中无法运行代码质量分析(2022-05-09)

### 问题描述

打算在 gitlab 中启用 sonarqube,看了文档简单配置后可在 ci 中自动启动代码质量分析,而 sonarqube 只是质量分析中的一个插件而已

所以首先要启动 code_quality

根据官方配置如下:

```yaml
image: node:latest

include:
  - template: Code-Quality.gitlab-ci.yml

stages:
  - 'test'

code_quality:
  artifacts:
    paths: [gl-code-quality-report.json]
```

报错内容如下:

```bash
error during connect: Post "http://docker:2375/v1.24/images/create?fromImage=registry.gitlab.com%2Fgitlab-org%2Fci-cd%2Fcodequality&tag=0.85.26": dial tcp: lookup docker on 192.168.65.5:53: no such host
Uploading artifacts for failed job
00:00
Uploading artifacts...
WARNING: gl-code-quality-report.json: no matching files
ERROR: No files to upload
Cleaning up project directory and file based variables
00:01
ERROR: Job failed: exit code 1
```

猜测还是域名被墙导致的无法建立链接,可自己怎么配置 docker 镜像呢

按照文档中的提示重新注册了一个专门针对质量扫描的 runner,结果又遇到 docker 镜像的问题,这个暂时处理不了.先搁置一下吧

```shell
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
```

### 问题解决

### 参考链接

- [code quality 官方配置文档](https://docs.gitlab.com/ee/user/project/merge_requests/code_quality.html#code-quality-widget)
