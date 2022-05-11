# Shell QA

## 1. 特殊参数`$!`是啥

### 问题描述

书中 4.5 有描述到`$!`是后台进程的进程 ID.啥是后台进程...

## 2. 描述一下这些 shell 语句为啥要报错(2022-05-10)

### 问题描述

之前在写 gitlab-ci 时,总是会出各种语法错误.原因在于对 shell 的语法不熟悉.这儿把就 shell 入门中的一些示例摘抄下来.自己再回答一下

### 问题解决

```shell
#!bin/bash<CR><LF>
```

```shell
name = ranwawa
```

```shell
$name=ranwawa
```

```shell
ls *.xxx
```

```shell
cat 第一章 shell脚本基础知识.md
```

````shell
if[ "$1" == 2 ]; then
echo true
fi;
```

```shell
if ["$1" == 2 ]; then
echo true
fi;
````

```shell
if [ "$1" == 2]; then
echo true
fi;
```

```shell
if [ "$1" == 2] then
echo true
fi;
```

```shell
if [ 1 <= 2 ]; then
  echo 1小于等于2
else
  echo 1大于2
fi;
```

```shell
name='abc edf'
if [ $name != abc ]; then
  echo $name不等于abc
else
  echo $name等于abc
fi;
```

```shell
{ date +%Y-%m-%n; echo 123; ls } > test.txt
```

### 参考链接
