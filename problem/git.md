## 1.[已解决].gitignore里面设置了忽略文件但是不生效(191101)

**业务背景**

用`vue`开发项目,编译后的文件是不用上传到仓库里的,按理来说,只要在`.gitignore`文件里添加对应的目录即可.但很奇怪,有时候这种操作人生效,有时候又不生效,提交保存的时候,还是会看到dist里面的东西

git代码
```
node_modules/
dist/
```

**问题解决**

- 先清空一下git缓存`git rm -r --cached dist`
- 然后再提交就可以了
- 参考链接: https://blog.csdn.net/qq_31325079/article/details/82701208
