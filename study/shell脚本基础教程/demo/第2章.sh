#!/opt/homebrew/bin/bash

seperator=--------------
function printSeperator() {
	echo
	echo ---------------$1
	echo
}

# 路径展开
printSeperator 路径展开

echo *.sh
echo *.??
echo ?[2]*.sh
echo ?[!2]*.sh
echo ../* # 不能跨目录
echo .git* # 不能匹配开始的点,所以要显示指定

# 大括号展开
printSeperator 大括号展开

echo 第{1,2,,3}章
echo 第{a..f}章
echo 第{1..5..2}章

# 波浪号展开

printSeperator 波浪号展开

echo ~

# 参数展开:=
printSeperator 参数展开:=

echo 1:${name:=rwwA}
echo 2:$name
name=
echo 3:${name:=rwwB}
echo 4:${name}


unset name
echo 5:${name=rwwC}
echo 6:$name
name=
echo 7:${name-rwwD}
echo 8:${name}

# 参数展开:-
printSeperator 参数展开:-

echo 1:${name:-rwwA}
echo 2:$name
name=
echo 3:${name:-rwwB}
echo 4:${name}


unset name
echo 5:${name-rwwC}
echo 6:$name
name=
echo 7:${name-rwwD}
echo 8:${name}


# 参数展开:?
printSeperator 参数展开:?

# echo 1:${name:?rwwA}
echo 2:$name
unset name
# echo 1:${name:?rwwB}
echo 2:$name

# 参数展开:+
printSeperator 参数展开:+

name=l
echo 1:${name:+rwwA}
echo 2:$name
unset name
echo 1:${name:+rwwB}
echo 2:$name

name=l
echo 1:${name+rwwC}
echo 2:$name
name=
echo 1:${name+rwwD}
echo 2:$name

# 参数展开:
printSeperator 参数展开:

name=ranwawa
echo ${name:1}
echo ${name: -1}
echo ${name:1:3}
echo ${name:1:-2}
echo ${#name}

# 参数展开#
printSeperator 参数展开#

name=test.tar.gz
echo ${name#*.}
echo ${name##*.}

# 参数展开z
printSeperator 参数展开%

name=test.tar.gz
echo ${name%.*}
echo ${name%%.*}

# 参数展开//
printSeperator 参数展开//

name=test.tar.gz
echo ${name/./_}
echo ${name//./_}
echo ${name/.*/.text}
echo ${name/#*./}
echo ${name/%.*/}

# 命令替换$()
printSeperator 命令替换\$\(\)

echo 当前时间:$(date +%Y-%m-%d)

# 算术表达式展开
printSeperator 算术表达式展开'$(())'

echo $((2 + 1))
((2+1))
echo $?

# 引用\,\',\"
printSeperator 算术表达式展开\\,\',\"

echo $HOME
echo \$HOME
echo '$HOME'
echo "$HOME"