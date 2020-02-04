## 1.[已解决] 发布npm包之前如何自动更新版本号

**业务背景**

才开始自己维护npm包,前期需要经常的修改变动,每次变动publish到npm的时候,都必须要求我修改一下版本号,可是我变动真的太频繁了,每次变动都要手动去修改一下package.json里面的version字段,着实有点low.应该会有自动更新版本号的方法

**问题解决**
- 在执行prepush钩子的时候
- 先执行npm version patch
- 然后再执行npm publish
- 参考网址:
  - https://docs.npmjs.com/cli/version.html
  
```
// .huskyrc.js
const tasks = arr => arr.join(' && ');
module.exports = {
  'hooks': {
    'pre-push': tasks([
      'npm version patch',
      'npm publish',
    ]),
  },
};
```

## 2. [已解决]初始化安装项目时,老是报这样一个错误print "%s.%s.%s" % sys.version_info(200204)

**业务背景**
在一个新的项目初始安装时,老是报这样一个错误,遇到好几次了,每次解决都比较快,所以就没专门纪录,这次又遇到了,干脆记一下吧,下次遇到看一眼就搞定,免得再花几分钟去搜索解决方法

**报错内容**

```
gyp verb check python checking for Python executable "python" in the PATH
gyp verb `which` succeeded python C:\Users\Administrator\AppData\Local\Programs\Python\Python37\python.EXE
gyp ERR! configure error
gyp ERR! stack Error: Command failed: C:\Users\Administrator\AppData\Local\Programs\Python\Python37\python.EXE -c import sys; print "%s.%s.%s" % sys.version_info[:3];
gyp ERR! stack   File "<string>", line 1
gyp ERR! stack     import sys; print "%s.%s.%s" % sys.version_info[:3];
gyp ERR! stack                                ^
gyp ERR! stack SyntaxError: invalid syntax
gyp ERR! stack
gyp ERR! stack     at ChildProcess.exithandler (child_process.js:295:12)

```

**解决方法**
- 200204
- 这个一看就和python有关
- 往上拉错误日志,会看到最开始是找的python2.找了3次没找到
- 就直接运行的Python.而我装的Python是3.x版本的
- 重新安装一个2.x版本的即可
  - 注意在安装的过程中,选择自动添加环境变量
