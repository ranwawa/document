#!/opt/homebrew/bin/bash

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