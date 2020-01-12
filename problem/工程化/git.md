### 1.[已解决].gitignore里面设置了忽略文件但是不生效(191101)

**业务背景**

用`vue`开发项目,编译后的文件是不用上传到仓库里的,按理来说,只要在`.gitignore`文件里添加对应的目录即可.但很奇怪,有时候这种操作人生效,有时候又不生效,提交保存的时候,还是会看到dist里面的东西

git代码
```
node_modules/
dist/
```

**问题解决**

- 先清空一下git缓存`git rm -r --cached dist`
- 然后再提交就可以了 - 参考链接: https://blog.csdn.net/qq_31325079/article/details/82701208

## 2.[已解决] git push完代码后,自动发布npm包(git钩子使用)(191224)

**业务背景**

最近把项目中公用的sass文件单独拿出来,做成了一个npm包引用,项目脚手架也整理成了一个单独的`vue-cli`插件,方便快速热启动一个新的项目.前期插件内容变更频繁.每次变更后都得推送到github还要再去publish到npm,着实有点繁琐

**问题解决**
- 想自己写钩子,但那个git/hooks里面全是shell命令,有点头大
- 所以换成了husky插件
- 参考链接:
  - https://github.com/typicode/husky
  - https://www.git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90
