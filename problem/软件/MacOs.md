### 1. 常用快捷键

|用途|快捷键|
|:-:|:-:|
|应用切换全屏|control + command + F|

### 2. [已解决]安装VUE成功后提示zsh: command not found: vue(20201110)

**业务背景**

通过`vue-cli`官方文档安装了vue,然后运行`vue`命令提示未找到模块,退出控制台重新进入还是照旧...之前在安装
nvm时也遇到同样的问题

**问题解决**
- 202011112
- 在根路径下面的`.zhsrc`文件最后加上如下代码即可
```
[[ -e ~/.profile ]] && emulate sh -c 'source ~/.profile'
```

**问题分析**
- mac存在多个终端命令行工具,包括bash和zsh
- zsh是后面更新的
- 好多软件会默认把环境变量存到bash的配置文件里面
- .zshrc是zsh命令行工具的配置文件
- .profile是bash命令行工具的配置文件
- 加上上面的代码,是让zsh也能识别bash的环境亦是

### 3. [已解决]安装nrm成功后提示Error: Cannot find module 'semver'(20201111)

问题同上

