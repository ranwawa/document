#!/opt/homebrew/bin/bash
source ./seperator.sh

# echo $0 $1 $2 $3
# echo '$*: '$*
# echo '$@: '$@
# echo '"$*": '"$*"
# echo '"$@": '"$@"

seperator='\n----------------\n'

# 数组
arr=(a b c)
echo ${arr}
echo ${arr[1]}
echo ${#arr[@]}
echo ${!arr[@]}

echo $seperator

newArr1=("${arr[@]}")
newArr2=("${arr[*]}")
echo ${newArr1[1]}
echo ${newArr2[1]}

echo $seperator

arr=(begin "${arr[@]}" after)
arr+=(end)
echo ${arr[@]}

echo $seperator

# v4以上才支持map
declare -A map=([name]=ranwawa [age]=28)
echo ${map[@]}
echo ${!map[@]}
echo ${#map[@]}

# 函数
printSeperator 函数

function scope ()
{
	v=内部
	echo 2:$v
	echo 函数名称:${FUNCNAME[@]}
	return 1
}

v=外部
echo 1:$v
scope
echo 退出状态码:$?
echo 3:$v


printf '\n\n\n'
function lcoalscope ()
{
	local l=内部
	echo 2:$l
}

l=外部
echo 1:$l
lcoalscope
echo 退出状态码:$?
echo 3:$l

# printf
printSeperator 'printf'

name=ranwawa
declare -i age=28
printf 'name:%s age:%d \n\n' $name $age
printf 'name:%s age:[%1d] \n\n' $name $age

#wait
printSeperator 'wait'

./task1.sh
./task2.sh
echo -e 'finish1\n\n'

./task1.sh &
./task2.sh &
echo -e finish2\n\n