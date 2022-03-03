# 第二章 Git基础

## 创建仓库的2种方式

- git init
- git clone

## 工作目录下文件的2种Git状态

- 已经跟踪的tracked
- 未跟踪untracked

## 各种Git区域对应的Git命令

|  Git区域 | Git命令 | 命令含义 |
|---|---|---|
| 工作区/暂存区 | git status | 查看文件状态 |
| 工作区 | git diff | 对比修改文件和暂存/仓库文件的差异 |
| 工作区 | git add | 将工作区的文件添加到暂存区 |
| 工作区 | git checkout -- file | 撤消对文件的修改 |
| 工作区 | git commit -a -m "" | 将工作区的文件添加到仓库 |
| 暂存区 | git diff --cached | 对比暂存文件和仓库文件的差异 |
| 暂存区 | git reset HEAD file | 将暂存区文件移动到工作目录 |
| 暂存区 | git commit | 将暂存区文件添加到仓库 |
| 暂存区 | git commit --amend | 将暂存区文件添加到最近一次commit中,并修改commit信息t |
| 暂存区/仓库 | git remove --cached file | 移除对文件的跟踪 |
| 仓库 | git log | 查看提交历史 |
| 仓库 | git commit --amend | 修改最近一次commit信息 |
| 所有区域 | git remove file | 移除对文件的跟踪并删除文件 |
| 所有区域 | git mv file1 file2 | 修改文件名 |

## git log

### 过滤相关的参数

| 参数 | 含义 |
|---|---|
| -n  | 前几条数据 |
| --since, --after | 从什么时候起 |
| --until, before | 到什么时候为止 |
| --author | 作者(创建文件的那个人) |
| --committer | 提交的人 |
| --grep | 查找提交commit msg信息 |
| -S | 查找变更代码内容 |
| --no-merges | 非合并提交 |

### 输出内容相关的参数

| 命令 | 含义 |
|---|---|
| --pretty=oneline | 一行中显示commit信息 |
| --stat | 文件名+简要改动 |
| --shortstat | 几个文件+简要改动 |
| --name-only | 只显示文件名 |
| --name-status | 文件名+状态 |
| --abbrev-commit | 简短的SHA1 |
| --relative-date | 显示相对日期 |
| --graph | 图形显示 |

## git remote

| 命令 | 含义 |
|---|---|
| git clone | 克隆远程仓库 |
| git remote | 查看所有远程仓库别名 |
| git remote -v | 查看所有远程仓库别名及url |
| git remote show shortname | 显示远程仓库详情 |
| git remote fetch shortname | 摘取所有新的变更 |
| git remote push shortname | 推送新的变更 |
| git remote rename oldName newName | 修改远程仓库别名 |
| git remote rm shortname | 删除本地的远程仓库 |

## git tag

| 命令 | 含义 |
|---|---|
| git tag | 查看所有标签 |
| git show name | 查看标签详情 |
| git tag -a name -m msg | 创建注释标签 |
| git tag name | 创建轻量标签 |
| git tag -a name SHA1 | 根据指定纪录创建标签 |
| git push remoteName tagName | 将指定标签推向远程 |
| git push remoteName --tags | 将所有未同步的标签推向远程 |
| git checkout -b branchName tagName | 在标签上创建分支 |

## Git别名

这是一个很神奇的工具

有点类似于快捷键,可以定制很多snippet

不过这个要把git玩熟了之后再用比较合适

```bash
git config --global alias.co checkout
git config --global alias.unstage 'reset HEAD'
```
