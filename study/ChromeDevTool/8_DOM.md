## 8.1 View DOM nodes
- inspect a node
  - 方法有好几种,但我只爱这一种
  - `ctrl + shift + c`
  - Click an element which you want to inspect
- Navigate the DOM tree with a keyboard
  - Press the left arrow key. That element will be collapsed if the element has sub nodes or it's parent element will be selected.
  - Press the right arrow key. That element will be expanded if it has sub nodes when it was collapsed. otherwise it's first child node or the next element will be selected 
- Scroll in to view
  - Inspect an element
  - Right-click the element
  - Select *Scroll into view*
- Search for Nodes
  - Focus on the *Elements* panel
  - Press `ctrl + F`. The Search bar opens at the bottom of the DOM Tree
  - Type *charactors,CSS/XPath selector*. 

## 8.2 Edit the DOM
- Inspect an element
- Double-click one of the eares below
  - content
  - attribute name
  - attribute value
  - type
- Type new characters

- Reorder DOM Nodes
  - Inspect an element
  - Drag and Move

- Force State
  - Inspect an element
  - Right-click
  - Select Force State

- Hide/Show a node
  - Inspect an element
  - Press the `H` key

- Delete/Undo a node
  - Inspect an element
  - Press the `del` key
  - Press `ctrl + z`
## 8.3 Access nodes in the console
- Reference the currently-selected node with $0
  - Inspect an element
  - Press the `Esc` key to open the console drawer
  - Type `$0` and press the `enter` key

- Store as global varible
  - Inspect an element
  - Right-click the element in the DOM Tree and select *Store as global varible*
  - Type `temp1` in the console and press the `enter` key

- Copy JS Path
  - Inspect an element
  - Right-click the element and select `copy->copy js path`
  - Press `ctrl + v` to paste the expression into the console and press the `enter` key
## 8.4 Break on DOM Changes
这个在Javascript章节有更详细的介绍,就不在这儿再纪录一次了