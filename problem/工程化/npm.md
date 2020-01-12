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
