关键节点通知:

- Created/merged/commented的时候自动给群里发消息

CI:

- Test
  - 安装husky
  - 添加pre0commit钩子,执行umi-test --bail --findRelatedTests   但是针对这个文件的测试报告怎么生成???
- Eslint
  - 安装husky
  - 添加pre-commit钩子,执行npx lint-staged
  - Lint-staged.config.json中配置eslint命令
- Prettier
  - 安装husky
  - 添加pre-commit钩子,执行npx lint-staged
  - Lint-staged.config.json中配置prettier命令



Hook:

- commit msg
  - husky 钩子工具
  - @commitlint/cli 检查工具
  - @commitlint/config-conventional 风格配置
- Branch name



### 如何在gitlib-ci.yml中把本次提交改变的文件赋值给一个变量(20210928)

- **业务背景**

  prettier在ci的过程中做增量检测.需要以下几个步骤

  1. 声明一个gitlab变量xxx

  2. 执行git命令拿到当前改变的文件名

  3. 将git命令的结果赋值给$xxx
  4. 运行yarn prettier --check $xxx

  尝试了好几种方式,都无法赋值成功.

  **示例代码**

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
      # -> git diff-tree --no-commit-id --name-only -r 02e80f41c21ab51d26b98988fbdb9fffae2f69bf
      - $COMMIT_FILES = $(git diff-tree --no-commit-id --name-only -r $CI_COMMIT_SHA)
      - echo $COMMIT_FILES
      # fatal: ambiguous argument '=': unknown revision or path not in the working tree.
      - yarn prettier --check git diff-tree --no-commit-id --name-only -r $CI_COMMIT_SHA
  ```

  **参考文档**

  - https://forum.gitlab.com/t/ci-cd-pipeline-get-list-of-changed-files/26847/18
  - https://stackoverflow.com/questions/53965695/how-to-set-variable-within-script-section-of-gitlab-ci-yml-file

  **问题解决**

  - 20210929
  - 在变量赋值时,变量前面不要使用`$`号即可
  - 更简单的方法,不需要使用变量,直接在--check后面跟代码

  ```yaml
  script:
      - COMMIT_FILES = $(git diff-tree --no-commit-id --name-only -r $CI_COMMIT_SHA)
      - yarn prettier --ignore-unknown --check $(git diff --diff-filter=d --no-commit-id --name-only -r $CI_COMMIT_BEFORE_SHA HEAD)
  ```

  