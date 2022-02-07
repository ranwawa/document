### 创建自定义命令的3个步骤

- 注册命令
  - active钩子里执行
  - const command =  vscode.commands.registerCommand(commandName, commandHandler)
- 订阅命令
  - active钩子里执行
  - context.subscriptions.push(command)
- 暴露给用户侧
  - package.json里面配置
  - contribues -> commands -> {command: commandName, title: commandName}
  
  