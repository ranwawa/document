source ./seperator.sh

# if语句
printSeperator if语句

if cd "$1"; then
  echo 目录跳转成功
else
  echo 目录跳转失败
fi;

if [ 3 -eq 3 ]; then
  echo 3和3相等
else
  echo 3和3不等
fi;

# && ||
printSeperator '&& ||'

if [ -n "$1" -a ! -e "$1" ]; then
  echo 可以创建文件$1
else
  echo 无法创建文件
fi;

# [[]]
printSeperator '[[]]'

name='abc edf'
if [ $name != abc ]; then
  echo 二者不等
else
  echo 二者相等
fi;

if [[ $name != abc ]]; then
  echo 二者不等
else
  echo 二者相等
fi;

# for
printSeperator for

words='a b c d e'
for word in $words
do
  echo $word
done
