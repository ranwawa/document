- [1. mac上的XCode命令行是啥(20220303)](#1-mac上的xcode命令行是啥20220303)
- [[已解决]2. 如何使用git上的个人编辑器(20220303)](#已解决2-如何使用git上的个人编辑器20220303)
- [[已解决]3. grep的英文全称(20220303)](#已解决3-grep的英文全称20220303)
- [4. branch和ref的区别](#4-branch和ref的区别)
- [[已解决]5. glob模式(20200303)](#已解决5-glob模式20200303)
- [[已解决]6.bash中输入的中文是编码后的(20220304)](#已解决6bash中输入的中文是编码后的20220304)
- [6. git mergetool的使用(20220303)](#6-git-mergetool的使用20220303)
- [7. 提交对象和树对象的区别(20220305)](#7-提交对象和树对象的区别20220305)
- [8. GPG是什么](#8-gpg是什么)
- [9. stdin是什么](#9-stdin是什么)
- [10. Unix风格是什么](#10-unix风格是什么)

### 1. mac上的XCode命令行是啥(20220303)

现在不用mac了,暂时不看这个问题

### [已解决]2. 如何使用git上的个人编辑器(20220303)

#### 问题描述

效果在需要用编辑器的时候,会打开对应的编辑器来进行编辑
比如运行命令`git config --edit --global`时会自动用VSCode打开配置文件

#### 问题解决

设置的2种途径:

- 安装时可以选择一个默认编辑器
- 或者通过配置命令git config --global core.editor xxx

### [已解决]3. grep的英文全称(20220303)

#### 问题描述

知道这个是查找,但他的全称是啥呢,这样更容易记忆和理解其本质

#### 问题解决

Global Regular Expression Parser

全局正则表达式解析器

### 4. branch和ref的区别

#### 问题描述

在gitlab ci中看到过,以为ref就是branch.在这里又看到了,并且明确说明有区别

### [已解决]5. glob模式(20200303)

#### 问题描述

在很多配置文件中的include或者exclude中会用到这个模式.这里的.gitignore中又提及到了.不能总是对这个概念很模糊,必须要搞清楚才行

#### 问题解决

| 符号 | 含义 |
|---|---|
| * | 0或多个字符 |
| ? | 1个字符 |
| [...] | 类似正则中的范围 |
| [!...]  | 取反 |
| [^...]  | 取反 |
| !(pattern|patter) | 取反 |
| ?(pattern|patter) | 0或1个 |
| +(pattern|patter) | 1或多个 |
| *(pattern|patter) | 0或多个 |
| @(pattern|patter) | 1个 |
| ** | 0或多层目录 |

参考： https://www.npmjs.com/package/glob

### [已解决]6.bash中输入的中文是编码后的(20220304)

#### 问题描述

在git bash的设置中，将编码格式设置成UTF-8/GBK都无效

```bash
$ git status -s
 M "study/\347\262\276\351\200\232Git/QA.md"
?? "study/\347\262\276\351\200\232Git/\347\254\254\344\272\214\347\253\240 Git\345\237\272\347\241\200.md"
```

#### 问题解决

git config --global core.quotePath false

这个值默认是true,会将超过0x80的字符视为特殊字符进行转义

### 6. git mergetool的使用(20220303)

#### 问题描述

之前解决冲突都是在打开webstorm然后再依次点击进入解决冲突的页面

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

在git log --pretty的占位符中，有提到提交对象和树对象。没搞懂这两个有啥区别

#### 问题解决

提交对象：就是当次提交的commit对象

### 8. GPG是什么

#### 问题描述

7.4有提到用GPG对commit或tag进行更加安全的签名，可这个GPG是啥

### 9. stdin是什么

#### 问题描述

在很多配置文件有关文件的说明地方,经常会看到这个词,一直不知道是啥意思,今天在7.14.1又看到了你.必须搞定了

### 10. Unix风格是什么

#### 问题描述

git第10.1有描述到,底层命令设计时遵循了Unix风格..这是啥