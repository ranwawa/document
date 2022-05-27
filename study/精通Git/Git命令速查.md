# Git 命令速查

- [1. 分支相关命令](#1-分支相关命令)
  - [1.1 git branch](#11-git-branch)
  - [1.2 git checkout](#12-git-checkout)
  - [1.3 git merge](#13-git-merge)
  - [1.4 git merge-base](#14-git-merge-base)
  - [1.5 git clean](#15-git-clean)
  - [1.6 git restore](#16-git-restore)
  - [1.7 git log](#17-git-log)
  - [5.5 git reflog](#55-git-reflog)
- [2. 远程仓库相关命令](#2-远程仓库相关命令)
  - [2.1 git fetch](#21-git-fetch)
  - [2.1 git push](#21-git-push)
- [3. 补丁相关命令](#3-补丁相关命令)
  - [3.1 git rebase](#31-git-rebase)
  - [3.2 git revert](#32-git-revert)
  - [3.2 git stash](#32-git-stash)
- [4. 创建项目相关命令](#4-创建项目相关命令)
  - [4.1 git init](#41-git-init)
  - [4.2 git clone](#42-git-clone)
  - [4.3 git bundle](#43-git-bundle)
- [5. 快照相关命令](#5-快照相关命令)
  - [5.1 git diff](#51-git-diff)
  - [5.2 git reset](#52-git-reset)
  - [5.2 git shortlog](#52-git-shortlog)
- [6. 底层命令相关](#6-底层命令相关)
  - [6.1 git rev-parse](#61-git-rev-parse)
  - [6.2 git branch-filter](#62-git-branch-filter)
  - [6.3 git ls-files](#63-git-ls-files)
  - [6.4 git rerere](#64-git-rerere)
- [7. 检查与比较](#7-检查与比较)
  - [7.1 git show](#71-git-show)
- [8. 快照相关命令](#8-快照相关命令)
  - [8.0 git status](#80-git-status)
  - [3.1 git add](#31-git-add)
  - [3.2 git commit](#32-git-commit)
- [9. 调试相关命令](#9-调试相关命令)
  - [9.1 git grep](#91-git-grep)
  - [9.2 git blame](#92-git-blame)
  - [9.3 git bisect](#93-git-bisect)

## 1. 分支相关命令

### 1.1 git branch

| 命令                                          | 含义                                   |
| --------------------------------------------- | -------------------------------------- |
| git branch                                    | 查询所有本地分支                       |
| git branch --list -a                          | 查询所有分支(本地+远程)                |
| git branch -d name                            | 删除指定分支                           |
| git branch -d --force name                    | 强制删除分支                           |
| git branch -v                                 | 查询所有本地分支及其最新提交           |
| git branch -vv                                | 查询所有本地分支及其最新提交和跟踪分支 |
| git branch --set-upstream-to 本地的远程分支名 | 设置跟踪分支                           |
| git branch --show-current                     | 查询当前分支名                         |
| git branch --contains SHA                     | 查找包含 SHA 的分支                    |
| git branch --no-contains SHA                  | 查找不包含 SHA 的分支                  |
| git branch --merged SHA                       | 查找合并过 SHA 的分支                  |
| git branch --no-merged SHA                    | 查找没有合并过 SHA 的分支              |
|                                               |                                        |
| git branch -m 旧分支名 新分支名               | 修改分支名                             |
|                                               |                                        |
|                                               |                                        |
|                                               |                                        |

### 1.2 git checkout

#### 1.2.1 常规操作

| 命令                            | 含义                                 |
| ------------------------------- | ------------------------------------ |
| git checkout 分支名 源分支名    | 切换分支                             |
| git checkout 文件名             | 撤消对工作目录中文件的更改           |
| git checkout SHA1 文件名        | 将仓库中 SHA1 处的文件检出到暂存区中 |
| git checkout -b 分支名 源分支名 | 创建并切换分支                       |
| git checkout --orphan 分支名    | 创建一个没有父节点的分支             |
|                                 |                                      |
|                                 |                                      |
|                                 |                                      |
|                                 |                                      |
|                                 |                                      |
|                                 |                                      |
|                                 |                                      |

#### 1.2.2 merge 相关

| 命令                          | 含义                     |
| ----------------------------- | ------------------------ |
| git checkout --conflict=diff3 | 显示 base 状态的冲突模板 |
| git checkout --ours 文件名    | 采纳当前分支的变更       |
| git checkout --theirs 文件名  | 采纳他人分支的变更       |

### 1.3 git merge

| 命令                                    | 含义                                               |
| --------------------------------------- | -------------------------------------------------- |
| git merge 目标分支 当前分支             | 将目标分支合并到当前分支                           |
| git merge --squash 目标分支 当前分支    | 将目标分支合并到当前分支(将多个提交合并成一个提交) |
| git merge --no-commit 目标分支 当前分支 | 将目标分支合并到当前分支(暂时不进行提交)           |
| git merge --abort                       | 中断合并                                           |
| git merge --Xours                       | 冲突时选择我们这边的                               |
| git merge --Xtheirs                     | 冲突时选择他们那边的                               |

### 1.4 git merge-base

| 命令                         | 含义                        |
| ---------------------------- | --------------------------- |
| get merge-base 分支 1 分支 2 | 找出 2 个分支的首个共同祖先 |

### 1.5 git clean

| 命令            | 含义                            |
| --------------- | ------------------------------- |
| git clean -n    | 输出即将删除的文件              |
| git clean -f -d | 强制删除文件                    |
| git clean -i    | 交互式删除文件                  |
| git clean -x    | 删除包含 gitignore 中忽略的文件 |

### 1.6 git restore

| 命令                        | 含义                           |
| --------------------------- | ------------------------------ |
| get restore --staged 文件名 | 将暂存区中的文件移到工作目录中 |

### 1.7 git log

#### 1.7.1 快照相关

| 命令                                | 含义                                         |
| ----------------------------------- | -------------------------------------------- |
| git log                             | 显示所有日志                                 |
| git log package.json                | 包含指定路径的所有日志                       |
| git log --oneline                   | 一行中显示                                   |
| git log --abbrev-commit             | 显示简单的 SHA1                              |
| git log -g branch_name              | 以 log 的形式显示分支上的 reflog 信息        |
| git log master..feature             | feature 上有但是 master 上没有的提交         |
| git log origin/master..HEAD         | 当前未推送的提交                             |
| git log ^master feature             | feature 上有但 master 上没有的提交           |
| git log feature --not master        | feature 上有但是 master 上没有的提交         |
| git log feature hotfix --not master | feature 和 hotfix 上有但 master 上没有的提交 |
| git log master...feature            | master 和 feature 上都不存在的提交(差集)     |
| git log --left-right                | 以箭头的方式显示提交属于哪一边的分支         |
| git log                             |                                              |

#### 1.7.2 格式化相关

| 命令                            | 含义                 |
| ------------------------------- | -------------------- |
| git log --oneline               | 一行的形式显示日志   |
| git log --graph                 | 以图形方式显示日志   |
| git log --pretty=format:'%h %s' | 自定义输出样式       |
| git log --merge                 | 显示接触到冲突的提交 |
|                                 |                      |
|                                 |                      |

#### 1.7.3 查找相关

| 命令              | 含义                     |
| ----------------- | ------------------------ |
| git log -S string | 查询出现指定字符串的提交 |
|                   |                          |

##### pretty 中的占位符

| 占位符 | 含义                    |
| ------ | ----------------------- |
| %H     | 提交对象 SHA1           |
| %h     | 提交对象的短 SHA1       |
| %T     | 树对象的 SHA1           |
| %t     | 树对象的短 SHA1         |
| %P     | 父对象的 SHA1           |
| %p     | 父对象的短 SHA1         |
| %an    | 作者的名字              |
| %ae    | 作者的邮箱              |
| %ad    | 创建日期                |
| %ar    | 创建日期，相对日期      |
| %cn    | commit 人的名字         |
| %ce    | commit 人的邮件         |
| %cd    | commit 的日期           |
| %cr    | commit 的日期，相对日期 |
| %s     | commit 信息             |

### 5.5 git reflog

| 命令       | 含义                   |
| ---------- | ---------------------- |
| git reflog | 查看所有 HEAD 变动纪录 |
|            |                        |

## 2. 远程仓库相关命令

### 2.1 git fetch

| 命令                 | 含义             |
| -------------------- | ---------------- |
| git fetch 远程仓库名 | 摘取所有新的更新 |
|                      |                  |
|                      |                  |
|                      |                  |
|                      |                  |

### 2.1 git push

| 命令                                    | 含义                         |
| --------------------------------------- | ---------------------------- |
| git push 远程仓库名 远程分支名          | 推送到远程指定仓库的分支     |
| git push 远程仓库名 --delete 远程分支名 | 删除远程分支                 |
| git push 远程创建名 HEAD                | 将当前分支推送到远程同名分支 |
|                                         |                              |

## 3. 补丁相关命令

### 3.1 git rebase

| 命令                                   | 含义                                                         |
| -------------------------------------- | ------------------------------------------------------------ |
| git rebase 分支名                      | 将当前分支变基到指定分支                                     |
| git rebase --onto master server client | 将 server 和 client 共同祖先之后的`提交`变基到 master 分支上 |
| git rebase -i HEAD~3                   | 交互式变基到倒数第 4 个提交                                  |
| git rebase --continue                  | 前往下一个交互式变基                                         |
| git rebase --abort                     | 中断变基                                                     |

### 3.2 git revert

| 命令                       | 含义                                  |
| -------------------------- | ------------------------------------- |
| git revert HEAD            | 撤消当前 SHA1                         |
| git revert -m 1 merge_sha1 | 撤消合并分支,取我们的代码作为返回内容 |
| git revert -m 2 merge_sha1 | 撤消合并分支,取他们的代码作为返回内容 |

#### 交互式变基中命令的含义

| 命令   | 含义                                |
| ------ | ----------------------------------- |
| pick   | 保持当前分支不变                    |
| reward | 修改提交信息                        |
| edit   | 停下来等 amending，可以追加内容进去 |
| squash | 把之前的提交压缩成一个提交          |
| drop   | 删除这个提交                        |

### 3.2 git stash

| 命令                          | 含义                              |
| ----------------------------- | --------------------------------- |
| git stash                     | 储藏当前工作区，暂存区            |
| git stash --keep-index        | 储藏当前工作区                    |
| git stash --include-untracked | 储藏当前工作区,暂存区，未跟踪文件 |
| git stash apply name          | 储藏当前工作区，暂存区            |
| git stash list                | 查询当前所有储藏信息              |
| git stash apply               | 应用最新一个储藏                  |
| git stash apply stash@{2}     | 应用第 2 个储藏                   |
| git stash apply --index       | 应用储藏并保留暂存区              |
| git stash branch branch_name  | 从储藏创建分支                    |
|                               |                                   |
|                               |                                   |
|                               |                                   |
|                               |                                   |

## 4. 创建项目相关命令

### 4.1 git init

| 命令            | 含义             |
| --------------- | ---------------- |
| git init        | 初始化项目       |
| git init --bare | 初始化一个裸仓库 |

### 4.2 git clone

| 命令                               | 含义         |
| ---------------------------------- | ------------ |
| git clone 仓库地址 仓库别名        | 克隆一个仓库 |
| git clone 仓库地址 仓库别名 --bare | 克隆一个裸仓 |

#### 仓库地址的几种形式

- 远程地址
- 本地路径
- 打包的压缩文件

### 4.3 git bundle

| 命令                                         | 含义                 |
| -------------------------------------------- | -------------------- |
| git bundle create 包名 SHA1 分支名           | 打一个压缩包         |
| git bundle create 包名 master ^origin/master | 将部分提交打成一个包 |
| git bundle verify 包名                       | 验证包是否有效       |
| git bundle list-heads 包名                   | 包可以导入哪些分支   |

## 5. 快照相关命令

### 5.1 git diff

| 命令                       | 含义                               |
| -------------------------- | ---------------------------------- |
| git diff 主分支...主题分支 | 共同祖先之后，主题分支上引入的变化 |
| git diff --name-only       | 仅显示文件名                       |
| git diff --filter=Ad       | 只要 A,排除 D                      |

### 5.2 git reset

| 命令                   | 含义                                                         |
| ---------------------- | ------------------------------------------------------------ |
| git reset --soft SHA1  | 将 HEAD 移动到 SHA1 上,保留暂存区和工作目录和未跟踪文件      |
| git reset --mixed SHA1 | 将 HEAD 移动到 SHA1 上,暂存区内容移到工作目录,保留未跟踪文件 |
| git reset --hard SHA1  | 将 HEAD 移动到 SHA1 上,清空暂存区和工作目录,保留未跟踪文件   |

### 5.3 git restore

| 命令                   | 含义                         |
| ---------------------- | ---------------------------- |
| git restore --staged . | 将所有暂存区文件移动到工作区 |

### 5.4 git shortlog

| 命令                           | 含义                        |
| ------------------------------ | --------------------------- |
| git shortlog                   | 只显示 commit 信息          |
| git shortlog --no-merges       | 不显示合并的提交信息        |
| git shortlog 分支 --not 分支 2 | 显示分支 2 上没有的提交信息 |
|                                |                             |
|                                |                             |
|                                |                             |
|                                |                             |
|                                |                             |
|                                |                             |
|                                |                             |
|                                |                             |

## 6. 底层命令相关

### 6.1 git rev-parse

| 命令                             | 含义                               |
| -------------------------------- | ---------------------------------- |
| git rev-parse branch_name        | 查看分支顶部指向的 SHA1            |
| git rev-parse --short HEAD~1     | 查看第 2 个 commit 的 SHA 简短形式 |
| git rev-parse --abbrev-ref HEAD~ | 查看当前分支名                     |

### 6.2 git filter-branch

| 命令                                                                          | 含义                                                                                    |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| git filter-branch --tree-filter 'rm -f 文件名' HEAD                           | 删除当前分支到 HEAD 所有提交中的某个文件                                                |
| git filter-branch --tree-filter -all 'rm -f 文件名' HEAD                      | 删除所有分支到 HEAD 所有提交中的某个文件                                                |
| git filter-branch --index-filter 'git rm --ignore-umatch --cached -r .vscode' | 删除当前分支所有提交中的.vscode 目录,`p368`和前面的删除区别在于只删索引,而非文件,速度快 |

### 6.3 git ls-files

| 命令            | 含义                                                  |
| --------------- | ----------------------------------------------------- |
| git ls-files -u | 显示合并中共同祖先 1,当前分支 2,他人分支 3 的 SHA1 值 |

### 6.4 git rerere

先要启用配置,自动记录已经处理过的冲突下次会自动处理

```bash
git config --global rerere.enable=true
```

| 命令       | 含义                   |
| ---------- | ---------------------- |
| git rerere | 显示保存的解决冲突纪录 |

### 6.5 git gc

启用垃圾回收,将所有对象文件放到包中

| 命令   | 含义 |
| ------ | ---- |
| git gc |      |

### 6.6 git count-objects

统计包信息

| 命令                 | 含义         |
| -------------------- | ------------ |
| git count-objects -v | 查看包的大小 |

### 6.7 git rev-list

查询两个节点之间的所有 SHA

| 命令                         | 含义                            |
| ---------------------------- | ------------------------------- |
| git rev-list SHA1..SHA2      | 查询 SH1 到 SHA2 之间的所有 SHA |
| git rev-list --all           | 查询所有 SHA                    |
| git rev-list --all --objects | 查询所有 SHA 及对象名           |

### 6.8 git cat-file

查询两个节点之间的所有 SHA

| 命令                    | 含义                        |
| ----------------------- | --------------------------- |
| git cat-file commit SHA | 查询对应 SHA 的原始提交信息 |

### 6.9 git verify-pack

查询包信息

| 命令                                                | 含义       |
| --------------------------------------------------- | ---------- |
| git verify-pack -v .git/objects/pack/pack-29xxx.idx | 查询包信息 |
### 6.5 git rm

| 命令       | 含义               |
| ---------- | ------------------ |
| git rm -rf | 删除所有对象及文件 |

### 6.6 git config

| 命令                              | 含义             |
| --------------------------------- | ---------------- |
| git config --list                 | 查看所有配置     |
| git config --global --list        | 查看 global 配置 |
| git config --global http.proxy '' | 重置代理参数     |

## 7. 检查与比较

### 7.1 git show

#### 7.1.1 查看当个快照

| 命令                       | 含义                                  |
| -------------------------- | ------------------------------------- |
| git show SHA1              | 查看某个快照                          |
| git show branch_name       | 查看某个分支的快照                    |
| git show HEAD{n}           | 查看 HEAD 在之前第几次的快照          |
| git show master{yesterday} | 查看 master 分支昨天的快照            |
| git show 短 SHA1^          | 父提交                                |
| git show 短 SHA1^2         | 第 2 个父提交，只在合并 commit 上生效 |
| git show 短 SHA1~          | 父提交                                |
| git show 短 SHA1~2         | 父提交的父提交                        |
| git show SHA1 --stat       | 只显示文件及其变更行数                |
| git show SHA1 --shortstat  | 只显变更文件数和行数                  |
|                            |                                       |
|                            |                                       |
|                            |                                       |

#### 7.1.2 格式化相关

| 命令 | 含义                   |
| ---- | ---------------------- |
| git  | 查看所有 HEAD 变动纪录 |
|      |                        |

#### 7.1.3 merge 相关

| 命令                               | 含义                           |
| ---------------------------------- | ------------------------------ |
| git show :1:文件名 > 文件名.common | 输出共同祖先版本到 common 文件 |
| git show :2:文件名 > 文件名.ours   | 输出当前版本到 ours 文件       |
| git show :3:文件名 > 文件名.theirs | 输出他人版本到 theirs 文件     |

## 8. 快照相关命令

### 8.0 git status

| 命令          | 含义                   |
| ------------- | ---------------------- |
| git status    | 显示当前状态           |
| git status -s | 以简洁形式显示当前状态 |
| git status -b | 显示分支信息           |

### 3.1 git add

#### 3.1.1 交互式暂存

| 命令       | 含义       |
| ---------- | ---------- |
| git add -i | 交互式暂存 |

### 3.2 git commit

| 命令                 | 含义                                                     |
| -------------------- | -------------------------------------------------------- |
| git commit --amend   | 将暂存区的文件添加到最近一次提交并修改最近一次提交的 msg |
| git commit -am 'xxx' | 不用 add,直接提交修改过的文件,新增的除外                 |

#### 暂存补丁命令的含义

| 命令 | 含义                           |
| ---- | ------------------------------ |
| y    | 保存这个块                     |
| n    | 不保存这个块                   |
| a    | 保存这个块及之后的所有块       |
| d    | 不保存这个块及之后的所有块     |
| g    | 前往某个块                     |
| /    | 用正则来查找某个块             |
| j    | 跳过这个块,前往下个未确认的块  |
| J    | 跳过这个块，前往下个块         |
| k    | 跳过这个块，前往上个未确认的块 |
| K    | 跳过这个块，前往上个块         |
| s    | 把当前块拆小一点儿             |
| e    | 手动编辑当前块                 |
| ?    | 帮助命令                       |

## 9. 调试相关命令

### 9.1 git grep

| 命令                               | 含义                                   |
| ---------------------------------- | -------------------------------------- |
| git grep -n string                 | 查找字符串并显示行号                   |
| git grep --count string            | 查找字符串并显示在每个文件中出现的次数 |
| git grep --break string            | 查找字符串，文件之间以换行符分开       |
| git grep --heading string          | 查找字符,根据文件分类显示              |
| git grep -e string --and -e string | 联合查询                               |
|                                    |                                        |
|                                    |                                        |
|                                    |                                        |

### 9.2 git blame

| 命令                    | 含义                                |
| ----------------------- | ----------------------------------- |
| git blame 文件名        | 文件每一行是谁在什么时候修改的      |
| git -L 1,2 blame 文件名 | 文件每的 1,2 行是谁在什么时候修改的 |
| git -C blame 文件名     | 文件的每一行代码的原始来源          |

### 9.3 git bisect

| 命令                 | 含义               |
| -------------------- | ------------------ |
| git bisect start     | 开始二分查找       |
| git bisect bad       | 当前提交有问题     |
| git bisect good SHA1 | 好的提交           |
| git bisect good      | 当前提交 ok        |
| git bisect reest     | 重置到排查前的状态 |
