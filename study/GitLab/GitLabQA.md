# GitLabQA

- [[已解决]1.如何在 gitlib-ci.yml 中把本次提交改变的文件赋值给一个变量(20210927)](#已解决1如何在-gitlib-ciyml-中把本次提交改变的文件赋值给一个变量20210927)
  - [业务背景](#业务背景)
  - [示例代码](#示例代码)
  - [参考文档](#参考文档)
  - [问题解决](#问题解决)
- [[已解决]2. windows 上安装 gitlab-ci runner 的步骤(20220412)](#已解决2-windows-上安装-gitlab-ci-runner-的步骤20220412)
  - [问题描述](#问题描述)
  - [问题解决](#问题解决-1)
  - [参考链接](#参考链接)

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

## [已解决]1.如何在 gitlib-ci.yml 中把本次提交改变的文件赋值给一个变量(20210927)

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

## [已解决]2. windows 上安装 gitlab-ci runner 的步骤(20220412)

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

- 第 3 方教程,有 windows 截图: https://techdirectarchive.com/2021/09/28/how-to-install-register-and-start-gitlab-runner-on-windows/
- 官方 windows 安装包: https://docs.gitlab.com/runner/install/index.html
- 官方注册教程: https://docs.gitlab.com/runner/register/#windows