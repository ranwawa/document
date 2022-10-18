# vscode 快捷键

- [1. editor 相关](#1-editor-相关)
- [2. 代码相关](#2-代码相关)
- [3. 信息栏相关](#3-信息栏相关)
- [4. 侧边栏相关](#4-侧边栏相关)
- [5. 项目相关](#5-项目相关)

## 1. editor 相关

### 1.1 tab 相关

#### 1.1.1 移动 tab

| 中文                     | 命令                            | 系统快捷键                       | 自定义快捷键 |
| :----------------------- | :------------------------------ | :------------------------------- | :----------- |
| 切换到右边的 editor      | workbench.action.nextEditor     | Ctrl + PageDown <br /> ⌥ + ⌘ + → |              |
| 切换到左边的 editor      | workbench.action.previousEditor | Ctrl + PageUp <br /> ⌥ + ⌘ + ←   |              |
| 将 editor 移动到右边分组 | View: Split Editor              | ⌘ + \                            |              |

#### 1.1.2 关闭 tab

| 中文                | 命令                                    | 系统快捷键                 | 自定义快捷键     |
| :------------------ | :-------------------------------------- | :------------------------- | :--------------- |
| 关闭其他 editor     | workbench.action.closeOtherEditors      | ⌥ + ⌘ + t                  | Alt + e, Alt + o |
| 关闭未编辑的 editor | workbench.action.closeUnmodifiedEditors | Ctrl + e, u                |                  |
| 关闭所有的 editor   | workbench.action.closeEditorsInGroup    | Ctrl + e, w                |                  |
| 关闭所有的 group    | workbench.action.closeAllGroups         | Ctrl + k, Ctrl + Shift + w |                  |

## 2. 代码相关

### 2.1 展开代码

| 中文           | 命令             | 系统快捷键                    |
| -------------- | ---------------- | ----------------------------- |
| 展开所有代码   | editor.unfoldAll | Ctrl+k, Ctrl+j                |
| 展开当前代码块 | editor.fold      | Ctrl+Shift+[ <br /> ⌥ + ⌘ + [ |
|                |                  |

### 2.2 折叠代码

| 中文           | 命令           | 系统快捷键                    |
| -------------- | -------------- | ----------------------------- |
| 折叠所有代码   | editor.foldAll | ctrl+k ctrl+0                 |
| 折叠当前代码块 | editor.unfold  | Ctrl+Shift+] <br /> ⌥ + ⌘ + ] |
|                |                |
|                |                |

### 2.3 代码导航

| 中文       | 命令                             | 系统快捷键                   |
| ---------- | -------------------------------- | ---------------------------- |
| 前一个光标 | workbench.action.navigateForward | Alt + Right <br /> ⌃ + ⇧ + - |
| 后一个光标 | workbench.action.navigateBack    | Alt + Left <br /> ⌃ + -      |
|            |                                  |

## 3. 信息栏相关

| 中文                  | 命令                                     | 系统快捷键 | 自定义快捷键 |
| --------------------- | ---------------------------------------- | ---------- | ------------ |
| 显示、隐藏 terminal   | workbench.action.terminal.toggleTerminal | Ctrl+\`    |              |
| 最大化、还原 terminal | workbench.action.toggleMaximizedPanel    |            | Alt+`, Alt+m |

## 4. 侧边栏相关

| 中文       | 命令                                           | 系统快捷键              | 自定义快捷键 |
| ---------- | ---------------------------------------------- | ----------------------- | ------------ |
| 切换侧边栏 | View: Toggle Side Bar Visibility               | Ctrl + b <br /> ⌘ + b   |              |
| 删除文件   | deleteFile                                     | delete <br/> ⌘ + delete |              |
| 折叠目录   | workbench.files.action.collapseExplorerFolders | Alt + e, Alt + h <br/>  |              |

## 5. 项目相关

| 中文             | 命令                             | 系统快捷键           | 自定义快捷键 |
| ---------------- | -------------------------------- | -------------------- | ------------ |
| 新窗口中打在项目 | View: Toggle Side Bar Visibility | Ctrl + b <br/> ⌃ + r |              |
| 打开最近项目     | workbench.action.openRecent      | Ctrl + r             |              |

## 6. git 相关

| 中文                           | 命令                                         | 系统快捷键       | 自定义快捷键 |
| ------------------------------ | -------------------------------------------- | ---------------- | ------------ |
| 打开 git 面板                  | View: Show Source Control                    | ⌃ + ⇧ + G        |              |
| 显示当前分支 commit 列表       | GitLens: Show Current Branch History         | ⌥ + ⌘ + G, ⇧ + H |              |
| 显示当前文件和下一个修订的差异 | GitLens: Open Changes with Next Revision     | ⌥ + ⌘ + G, .     |              |
| 显示当前文件和上一个修订的差异 | GitLens: Open Changes with Previous Revision | ⌥ + ⌘ + G, ,     |              |
|                                |                                              |                  |              |
|                                |                                              |                  |              |

## 7. 快捷查找相关

| 中文           | 命令                      | 系统快捷键 | 自定义快捷键 |
| -------------- | ------------------------- | ---------- | ------------ |
| 快捷命令输入框 | Show All Commands         | ⇧ + ⌘ + P  |              |
| 快捷标识符导航 | Go to Symbol in Editor... | ⇧ + ⌘ + O  |              |
|                |                           |            |              |
|                |                           |            |              |
|                |                           |            |              |
