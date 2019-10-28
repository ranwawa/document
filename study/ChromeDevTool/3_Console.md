## 3.1 Reference
### 3.1.1 Open the Console
- Open the Console panel
  - ctrl + shift + j
  - Command Menu -> typing console -> Panel Show Console
- Open the Console Tab in the Drawer
  - Esc
  - Command Menu -> typing console -> Drawer Show Console
- Open Console Settings
  - Click button 
![](https://user-gold-cdn.xitu.io/2019/9/22/16d55f2b8cea4417?w=28&h=28&f=png&s=324)
- Open Console Sidebar
  - Click Button
![](https://user-gold-cdn.xitu.io/2019/9/22/16d55f37ad7aa0d8?w=30&h=26&f=png&s=173)
### 3.1.2 View Messages
- Group similar
- Log XMLRequests
  - log all `XMLRequest` and `Fetch` requests
- Preserve log
  - Persist message across page loads
- Hide network
  - Hide network messages
- Selected context only
  - Only show messages from the current context(top, iframe, worker, extension)
- Eager evaluation
  - eagerly evaluate text in the prompt
- Autocomplete from the history
### 3.1.3 Filter Messages
- Filter out browser messages
  - sidebar -> user messages
- Filter by log level
  - Custom levels
  - sidebar
- Filter by URL
  - filter text box -> url:xxx/-url:xxx
- Filter out messages from diffirent contexts
- Filter out messages that don't match a regular expression pattern
  - filter text box -> /xxx/
### 3.1.4 Run JavaScript
- Re-run expressions from history
  - up/down arrow key
- Watching an expression's value in real-time with Live Expressions
  - click create live expression
![](https://user-gold-cdn.xitu.io/2019/9/22/16d56170cf806dd3?w=33&h=23&f=png&s=529)
  - typing variable in live expression text box
  - enter
### 3.1.5 Clear Console
- click 
![](https://user-gold-cdn.xitu.io/2019/9/22/16d5626d82db2a51?w=26&h=26&f=png&s=394)
- ctrl + l
- clear()
## 3.2 API Reference
- console.assert(expression, object)
  - writes an error when expression evaluates to false
- console.clear()
  - Clears the console
  - If preserve log is enable, console.clear() is disabled
- console.count([label])/console.countRest([label])
  - Writes the number of times that count() has been invoked at the same line and with the same label.
- console.dir(obj)/console.dirxml(node)
  - 没太明白这两个有啥用
- console.error/console.warning/console.log
- console.group(label)/console.group(label)/console.groupCollapsed(label)
  - Visually groups messages together until groupEnd is called.
- console.table
  - logs an array of objects as a table
- console.time(label)/console.timeEnd(label)
  - Start a new timer, call console.stop(label) to stop the timer and print the elapse timee.
- console.trace()
  - prints a stack trace
## 3.3 Utilities API Reference
These functions only work when you call them from the Chrome DevTools Console
### $_
returns the value of the most recently evaluted expresstion.
### $0-$1
- work as a historical reference to the last five DOM elements inspected within the Element panel
- work as a historical reference to the last five JavaScript heap Objects selected in the profiles panel.
### $(selector, [startNode])
- returns the reference to the first DOM element with the specified CSS selector.
- This function is an alias for the document.querySelector function.
```
$('#div')
```
### $$(selector, [startNode])
- returns an array of elements that matched the given CSS selector.
```
$$('div')
```
### $x(path, [startNode])
- returns an array of element that matched the give xPath expression
- xPath感觉现在没怎么用啊,所以这个不管他了
### clear()
- clear the console of it's history
### copy(object)
- copy a string representation of the specified object to the clipboard
```
copy($0)
```
### debug(function)/undebug(function)
- When the specified function is called, the debugger is invoked and the breaks inside the function on the Source panel allowing step through the code and debug it.
```
var a = function () {
  var b = 1;
var c = 2;
return b + c;
}

debug(a)
```
### dir(object)/dirxml(object)
- 和console.dir的功能一模一样,但没搞懂有啥用处
### inspect(object/function)
- opens and selects the specified element in the element panel for DOM elements
- opens and selects the specified object in the Sources panel for JavaScrip heap Objects
```
inspect($_)
insecpt(a)
```
### getEventListeners(object)
- returns the event listeners registered on the specified object.
```
getEventListers($0)
```
### keys(object)/values(object)
- returns an array containing names/values of the properties belonging to the specified object.

### monitor(function)/unmonitor(function)
- when the function specified is called, a message is logged to the console that indicates the function name along with the arguments that are passed to the function when it was called
```
var a = function () {
  var b = 1;
var c = 2;
return b + c;
}

monitor(a)
```

### monitorEvents(object[, events])
- When one of the specified events occurs on the specified object, the events object is logged to the console
  - a single event `['resize' ]`
  - an array of events `['resize', 'scroll']`
  - one of the generic events types `['mouse', 'key', 'touch', 'control']`
### profile([name])/profileEnd([name])
- starts a JavaScrip cpu profiling session with an optional name.
- 没看懂这个有什么用啊,结束后没出来报表分析一类的东西
### table(data [, columns])
- Log object data with table formatting by passing a data object in with optional column headings.
- 第二个参数没效果呢怎么
