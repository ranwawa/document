- [1. mac 上的 XCode 命令行是啥(20220303)](#1-mac-上的-xcode-命令行是啥20220303)
- [[已解决]2. 如何使用 git 上的个人编辑器(20220303)](#已解决2-如何使用-git-上的个人编辑器20220303)
- [[已解决]3. grep 的英文全称(20220303)](#已解决3-grep-的英文全称20220303)
- [[已解决]4. branch 和 ref 的区别(20220308)](#已解决4-branch-和-ref-的区别20220308)
- [[已解决]5. glob 模式(20200303)](#已解决5-glob-模式20200303)
- [[已解决]6.bash 中输入的中文是编码后的(20220304)](#已解决6bash-中输入的中文是编码后的20220304)
- [6. git mergetool 的使用(20220303)](#6-git-mergetool-的使用20220303)
- [7. 提交对象和树对象的区别(20220305)](#7-提交对象和树对象的区别20220305)
- [8. GPG 是什么](#8-gpg-是什么)
- [[已解决]9. stdin 是什么(20220307)](#已解决9-stdin-是什么20220307)
- [[已解决]10. Unix 风格是什么(20220308)](#已解决10-unix-风格是什么20220308)
- [11. github 操作老是超时(20220411)](#11-github-操作老是超时20220411)

### 1. mac 上的 XCode 命令行是啥(20220303)

现在不用 mac 了,暂时不看这个问题

### [已解决]2. 如何使用 git 上的个人编辑器(20220303)

#### 问题描述

效果在需要用编辑器的时候,会打开对应的编辑器来进行编辑
比如运行命令`git config --edit --global`时会自动用 VSCode 打开配置文件

#### 问题解决

设置的 2 种途径:

- 安装时可以选择一个默认编辑器
- 或者通过配置命令 git config --global core.editor xxx

### [已解决]3. grep 的英文全称(20220303)

#### 问题描述

知道这个是查找,但他的全称是啥呢,这样更容易记忆和理解其本质

#### 问题解决

Global Regular Expression Parser

全局正则表达式解析器

### [已解决]4. branch 和 ref 的区别(20220308)

#### 问题描述

在 gitlab ci 中看到过,以为 ref 就是 branch.在这里又看到了,并且明确说明有区别

#### 问题解决

- branch 分支实际是一个指向某个 SHA1 的指针
- ref 是一个引用
  - 包括 branch
  - tag
  - 以及远程分支

所以 branch 是 ref 的一种形式而已

参考:

- https://git-scm.com/book/en/v2/Git-Internals-Git-References

### [已解决]5. glob 模式(20200303)

#### 问题描述

在很多配置文件中的 include 或者 exclude 中会用到这个模式.这里的.gitignore 中又提及到了.不能总是对这个概念很模糊,必须要搞清楚才行

#### 问题解决

| 符号       | 含义             |
| ---------- | ---------------- | --------- |
| \*         | 0 或多个字符     |
| ?          | 1 个字符         |
| [...]      | 类似正则中的范围 |
| [!...]     | 取反             |
| [^...]     | 取反             |
| !(pattern  | patter)          | 取反      |
| ?(pattern  | patter)          | 0 或 1 个 |
| +(pattern  | patter)          | 1 或多个  |
| \*(pattern | patter)          | 0 或多个  |
| @(pattern  | patter)          | 1 个      |
| \*\*       | 0 或多层目录     |

参考： https://www.npmjs.com/package/glob

### [已解决]6.bash 中输入的中文是编码后的(20220304)

#### 问题描述

在 git bash 的设置中，将编码格式设置成 UTF-8/GBK 都无效

```bash
$ git status -s
 M "study/\347\262\276\351\200\232Git/QA.md"
?? "study/\347\262\276\351\200\232Git/\347\254\254\344\272\214\347\253\240 Git\345\237\272\347\241\200.md"
```

#### 问题解决

git config --global core.quotePath false

这个值默认是 true,会将超过 0x80 的字符视为特殊字符进行转义

### 6. git mergetool 的使用(20220303)

#### 问题描述

之前解决冲突都是在打开 webstorm 然后再依次点击进入解决冲突的页面

感觉这个可以用命令行直接进入那个页面，很是方便的样子

#### 问题解决

```text
[merge]
	tool = webstorm
[mergetool "webstorm"]
  cmd = cmd \"/C c:\\Program" "Files\\JetBrains\\WebStorm" "2021.3.2\\bin\\webstorm64 merge $(cd $(dirname "$LOCAL") && pwd)/$(basename "$LOCAL") $(cd $(dirname "$REMOTE") && pwd)/$(basename "$REMOTE") $(cd $(dirname "$BASE") && pwd)/$(basename "$BASE") $(cd $(dirname "$MERGED") && pwd)/$(basename "$MERGED")\"
  trustExitCode = true
```

不过这里有个问题，目录中的空格无法识别，所以最终还是没有看到效果

### 7. 提交对象和树对象的区别(20220305)

#### 问题描述

在 git log --pretty 的占位符中，有提到提交对象和树对象。没搞懂这两个有啥区别

#### 问题解决

提交对象：就是当次提交的 commit 对象

### 8. GPG 是什么

#### 问题描述

7.4 有提到用 GPG 对 commit 或 tag 进行更加安全的签名，可这个 GPG 是啥

### [已解决]9. stdin 是什么(20220307)

#### 问题描述

在很多配置文件有关文件的说明地方,经常会看到这个词,一直不知道是啥意思,今天在 7.14.1 又看到了你.必须搞定了

#### 问题解决

- stdin: 标准输入,默认是键盘,也可以是参数,文件等. FD 是 0
- stdout: 标准输出,默认是 terminal,也可以是文件,/dev/null 等其他设备. FD 是 1
- stderr: 标准错误,默认是 terminal. FD 是 2

参考:

- https://stackoverflow.com/questions/3385201/confused-about-stdin-stdout-and-stderr
- http://c.biancheng.net/view/942.html

### [已解决]10. Unix 风格是什么(20220308)

#### 问题描述

git 第 10.1 有描述到,底层命令设计时遵循了 Unix 风格..这是啥

#### 问题解决

unix 是操作系统,linux 也是操作系统.linux 是模仿 unix 写出来的,包含 unix 的全部功能

10.1 中提到的底层命令参考了 unix 风格.比如参数可以用`-`短横线开头
命令行的 3 种风格:

- Unix 风格: `-`短横线
- BSD 风格: 不加横线
- GNU 风格: `--`双横线

参考:

- http://c.biancheng.net/view/707.html
- https://blog.csdn.net/ruibin_cao/article/details/84660224

### 11. github 操作老是超时(20220411)

#### 问题描述

被墙的原因.之前也老是遇到,一般选择忍一忍,或者多试几次.上次用了一个 github 官方的命令行,好像可以避免这个问题.但多用一个工具稍微有一点麻烦.

前面精通 Git 时,有看到一个配置代理的参数.今天就来根除这个问题

1. 连接 chrome 插件 monocloud 中的代理地址,总提示代理连接失败
   - 这可能和代理需要验证一些头部信息相关
   - 想用 fiddler 抓包看看传了哪些信息给代理,但是 fiddler 是走的系统代理,通过这个 chrome 插件的代理,并不会走系统代理,所以拿不到数据
   - 用 wireshark 抓得到,但是 TSL 层加过密了,看不到 HTTP 数据

```bash
> git config --global http.proxy ranwawa:123456@global-us.link.ac.cn:152
> git clone https://github.com/ranwawa/uni-vant

c:\Users\Administrator\Downloads\uni-vant --progress
fatal: unable to **access** 'https://github.com/ranwawa/uni-vant/': Proxy CONNECT aborted
```

2. 本机安装并打开 monocloud 代理,然后代理到 127.0.0.1:7078 端口,这次是报 SSL 被 github 给重设了
   - 应该是证书相关问题
   - 关掉浏览器的插件代理,使用系统代理也会出现这种问题
   - 但是浏览器会自动重试,重试后就成功了,成功之后也就 ok 了
   - 试着在 clone 后立即重试,确实可以了.这是为什么呢

```
> git config --global 127.0.0.1:7078
> git clone https://github.com/ranwawa/uni-vant

c:\Users\Administrator\Downloads\uni-vant --progress
fatal: unable to access 'https://github.com/ranwawa/uni-vant/': OpenSSL SSL_connect: Connection was reset in connection to github.com:443
```

#### 问题解决

参考:

- file:///C:/Program%20Files/Git/mingw64/share/doc/git-doc/git-config.html
