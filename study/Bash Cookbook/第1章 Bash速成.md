# 第1章 Bash速成

## 1. Bash和CLI基础知识入门

### 1.1 bash提示符的组成部分

```bash
ranwawa@ThundeRobot:~$
```

- 用户名: ranwawa
- 主机名： ThundeRobot
- 分隔符：:
- 当前目录：~
- 用户权限：$普通用户 #root用户

### 1.2 和bash相关的文件

- .bashrc或~/.bash_profile: bash配置文件
- ~/.bash_history: bash的历史访问记录

bash配置文件的内容

- 命令别名
- 快捷方式
- 环境变量
- 其他用户增强功能

### 1.3 bash脚本包含的内容

- 解释器的路径
- 脚本正文

解释器路径的组成部分

```bash
#!/bin/bash
```

- shebang: #!
  - #: sharp简写成she
  - !: bang
- 解释器路径: /bin/bash

### 1.4 bash脚本执行的条件

- 必须由用户,其他程序系统或别的脚本来执行
- 需要其自身拥有可执行权限

## 2. 基本变量的创建和使用

### 2.1 声明变量的注意事项

```bash
NAME="ranwawa"
```

- 不能用$开头
- `=`两边不能有空格
- 环境变量通常用大写,局部变量小写
- 无必要字符串别使用引号
- 要用引号时尽量单引号
- 只在需要使用参数展开,命令替换和算术表达式时使用双引号

### 2.2 引用变量的3种方式

```bash
echo "name: $NAME"
echo "name: ${NAME}"
echo "name:"$NAME
```

## 3. 分支语句

### 3.1 if,else,else if语法

```bash
AGE=17
if [ $AGE -lt 18 ]; then
echo "less than 18"
elif [ $AGE -eq 18]; then
echo "equal 18"
else
echo "great than 18"
fi
```

if语句的注意事项

- 中括号两边必须有空格
- 写成单行时每条语句后面都要带分号

### 3.2 case,switch语句

```bash
case $VAR in
  1)
	  echo 1
		;;
	2)
	  echo "2"
		;;
	*)
	  echo "not match"
		;;
esac
```

case语句的注意事项:

- `;;`: 用来结束语句
- `*)`: 用来兜底

### 3.3 6个数值比较运算符

- -lt: less than
- -le: less equal
- -gt: great than
- -ge: great equal
- -eq: equal
- -ne: not equal

### 3.4 4个字符串比较运算符

- ==
- !=
- -n: 字符串长度不为空
- -z: 字符串长度为空

### 3.5 2个逻辑运算符

- ||
- &&

## 4. 循环语句

### 4.1 for循环

```bash
for P in ${PATH[@]}; do echo $P; done;
```

### 4.2 do循环

```bash
NUM=1
while [ $NUM -lt 9 ]; do echo $NUM; ((NUM++)); done;
```

## 5. 函数和包含源文件

### 5.1 函数

```bash
function echo_parameters() {
  echo "$1"
  echo "$2"
  echo "$3"
  echo "$4"
}

echo_parameters a 1 b 2
```

### 5.2 包含源文件

```bash
echo "function echo_parameters() { echo \"$1\"; }" > source.sh
source source.sh
echo_parameters a b c
```

### 6. 返回码和输出

### 6.1 返回码

```bash
ls
echo $?
ls not_exists
echo $?
```

### 6.2 返回输出

```bash
function only_ls() { ls; }
echo $(only_ls)

function func_return() { ls; return $?; }
echo $(func_return)

function func_echo() { ls; echo $?;  }
echo $(func_echo)
```

## 7. 管道和输入/输出重定向

### 7.1 管道

管道: 命令或脚本可以将其输出传入其他文件或命令中

```bash
echo abc > test.txt
echo bcd >> test.txt
echo dce >> test.txt

cat test.txt | grep b
```

### 7.2 输入/输出重定向

与输入输出相关的文件描述符

| 文件描述符  | 文件名  | 类型 | 硬件 |
|---|---|---|---|
|  0 | stdin  | 标准输入文件 | 键盘 |
| 1 | stdout | 标准输出文件 | 显示器 |
| 2 | stderr | 标准错误输出文件 | 显示器 |

#### 输出重定向

标准输出重定向

- command > file: 覆盖
- command >> file: 追加


标准错误输出重定向

- command 2> file
- command 2>> file

正确/错误同时重定向
- command > file 2>&1
- command >> file 2>&1
- command > file 2> file2
- command >> file 2>> file2

#### 输入重定向

- command < file: 将文件作为输入
- command <<END: 将键盘作为输入