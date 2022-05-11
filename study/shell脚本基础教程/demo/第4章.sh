source ./seperator.sh

# here document
printSeperator 'here document'

name=rww
cat << EOF
这就是多行广西内容的内容
行2
支持参数展开$name
EOF

name=rww
cat << 'EOF'
这就是多行广西内容的内容
彬参数展开
不支持参数展开$name
EOF

# here string
printSeperator 'here string'

tr b B <<< abc

# 管道
printSeperator 管道

ls |
grep 第 |
wc -l

# 命令分组
printSeperator 命令分组

{
	date +%Y-%d
	echo 花括号
	ls
}

(date +%Y-%d; echo 小括号; ls)