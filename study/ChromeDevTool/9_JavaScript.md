## 9.1 Get Started
In short, breakpoints can help you find and fix bugs faster than the *console.log()* method
  - 也就是说,以后在代码调试的时候,尽量别用console.log了,把习惯改过来
## 9.2 Pause Your Code With Breakpoints
- When to use each type of breakpoint type

|Breakpoint Type|Use this when you want to pause|
|-|-|
|Line-of-code|On an exact region of code|
|Conditional Line-of-code|On an exact of code, but only when some other condition is true|
|DOM|On the code that changes or removes a specific DOM node, or its children|
|XHR|When an XHR URL contains a string pattern|
|Event Listener|On the code that runs after an event, such as *click* is fired|
|Exception|On the line of code that is throwing a caught or uncaught exception|
|Function|Whenever a specific function is called|

- Line-of-code/Conditional Line-of-code breakpoints
  - Open the *source* panel
  - Open the file containing the line of code you want to break on
  - Go the line of code
  - Right click the line number column
    - Select *Add Breakpoint* -> blue icon 
    - Select *Add Conditional breakpoint* ->orange icon
- Manage Line-of-code breakpoints
  - Click the breakpoints pane
  - Right-click anywhere in the breakpoints pane
- DOM change breakpoints
  - Open *Elements* tab
  - Go the element that you want to set breakpoint on
  - Right-click the element
  - Hover over the *break on* and then select one of the options
    - Subtree modifications
    - Attributes modifications
    - Node removal
- XHR/Fetch breakpoints
  - Open the *Sources* panel
  - Click the *XHR breakpoints* pane
  - Click *Add breakpoint*
  - Enter the string which you want to break on
  - Press *Enter* to confirm
- Event listener breakpoints
  - Click the *Event listener breakpoints* pane
  - Check one of these categories, or expand the category and check a specific event.
- Exception breakpoints
  - Click *pause on exception*
  - Check the *pause on caught exceptions* checkbox if you also want to pause on caught exceptions
- Function breakpoints
  - Call *debug(functionName)*
  - You can insert *debug()* into your code or call it from DevTools Console
## 9.3 Find Unused JavaScript
find is easy, refactor is busy.
参考css相关笔记:https://juejin.im/post/5d76f8456fb9a06ad4516d73

> 好吧,距离上面这一段话不知道过去多少天了,今天是191029,今天继续笔记的时候,发现对查找未使用的代码详细的步骤已经不是太清楚了,还是再重复记录一次吧.一是强化记忆,二是练一练英文能力.

- What does the Coverage Tab do?
  - The Coverage Tab in Chrome Devtools can help you find unused JavaScript and CSS code
  
- Why does need to find unused code?
  - The extra code slows down your page load.

- How to find unused code  
  - Open the Coverage Tab?
    - `ctrl + shift + p`, Open the Command Menu
    - Type *coverage*
    - Select the *Show Coverage* command
  - Record code coverage
    - Click the button between *Instrument Coverage* and *Start Instrument Coverage and reload page*
    - Click *Stop Instrumenting record and show results* when you want to stop recording code coverage
  - Analyze code coverage
    - URL
    - Type
    - Total Bytes
    - Unused Bytes
    - unnamed column
      - The red section of the bar is unused bytes
      - The green section of the bar is used bytes
## 9.4 Map Preprocessed Code To Source Code
## 9.5 JS Debugging Reference
## 9.6 Snippets
## 9.7 Sources Panel Overview
## 9.8 Guides

