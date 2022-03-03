# 第4章 Git内幕

## 1. git是什么

- 是一个可以按照内寻址的文件系统
- 是一个 简单的键值数据存储

## 2. git目录结构及含义

- description: 仅限于GitWeb程序使用
- config: 项目的配置文件
- info/
  - ignore: 全局的忽略文件
- hooks/
  - pre-commit
  - prepare-commit-msg
  - commit-msg
  - post-commit
	- pre-rebase
  - post-rewrite
	- post-checkout
	- post-merge
	- pre-push
	- pre-receive
	- update
	- post-receive
- HEAD: 当前指针指向的引用 (symbolic-ref HEAD refs/heads/master)
- index: 暂存区信息
- objects/: 所有的Git对象
  - 树对象: 可以理解为目录
  - blob对象: 可以理解为文件
	- 提交对象
	- 标签对象
- refs/: 所有指针引用
  - heads: 所有分支对SHA1的映射(update-ref refs/heads/master 123456)
  - tags: 所有标签对SHA1的映射
  - remotes/origin/master: 远程分支指向的SHA1

## 3. 引用规格

.git/config文件

#### 默认的远程分支关联关系

会摘取远程所有的分支到本地远程origin下面

```bash
[remote "origin"]
  url = xxx
	fetch = +refs/heads/*:refs/remotes/origin/*
```

- `+`在不能快进的情况下也要更新引用
- `:`左边的是远程的引用样式
- `:`右边的是本地要写入的位置

#### 只拉取部分分支

```bash
[remote "origin"]
  url = xxx
	fetch = +refs/heads/master:refs/remotes/origin/master
	fetch = +refs/heads/dev:refs/remotes/origin/dev
	fetch = +refs/heads/ranwawa/*:refs/remotes/origin/ranwawa/*
```

#### 推送到其他分支

```bash
[remote "origin"]
  url = xxx
	fetch = +refs/heads/master:refs/remotes/origin/master
	push = refs/heads/master:refs/remotes/origin/new-master
```

## 4. 数据恢复

数据恢复的2种方式

日志文件还在的情况下 
- git reflog
- git log -g

日志文件不在的情况下
- git fsck --full