# Linux QA

## symlink到底是啥(2022-09-02)

### 问题描述

在npm本地调试时会用到link,前段时间听陈勇分享pnpm也有说到link.虽然一直都在用,但却对这个概念了解的并不透彻.

### 问题解决

symlink: 符号链接

- 软链接: 相当是快捷方式,可以链接文件和目录.删除源文件快捷方式会失效
- 硬链接: 相当于是指针复制,删除源文件不会影响硬链接

### 参考链接

- [freecodecamp教程](https://www.freecodecamp.org/news/symlink-tutorial-in-linux-how-to-create-and-remove-a-symbolic-link/)
