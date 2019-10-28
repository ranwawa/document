## 2.1 Get Started with Viewing and Changing CSS
**View an element's CSS**

Right-click -> Inspect -> is higlighted in `DOM Tree`

**Add a CSS declaration to an element**

`Styles` tab -> click `element.style` -> enter

**Add a CSS class to an element**

`Styles` tab -> `.cls` -> type class name -> enter

**Add a psudostate to a class**

`Style` tab -> click `:hov` -> toggle psudo box

**Change the dimensions of an element**

`Style` tab -> `Box Model` diagram -> double click -> type size -> enter

## 2.2 CSS Reference
### 2.2.1 Select an element
- right-click the element and select `Inspect`
- `ctrl + shift + c` -> left-click the element
- run a query in `Console` pane -> right-click the result -> reveal in elements panel

### 2.2.2 view CSS

**styles pane**
- styles pane shows all of the rules that apply to an element, including declarations that have been overridden.
- click the link next to a CSS rule to open the external stylesheet

**computed pane**
- only the CSS that's actually being applied to an element.
- check the `show all` checkbox to see all inherited values

**box model**
- to change a value, double click it.

**search an elements's CSS**
- use the `filter text box` on the styles and computed tab

**toggle a pseudo-class**
- styles tab -> :hov -> check the pseudo-class

**view a page in print mode**

毛线，不需要看打印模式

**view used and unused CSS**
- `shift + ctrl + p` -> typing coverage -> show coverage -> click `start instrumenting coverage and reload page`
- click a css file
- green represents used CSS
- red represents unused CSS

### 2.2.3 change css
**Add an inline declaration**
- select an element
- in the style place, click between the brackets of the `element.style` section
- enter a property name and property value

**Add a declaration to a style rule**
- select an element
- in the style pane, click between the brackets of the style rule to which you want to add the declaration.
- enter a property name an valid value

**Change a declaration name or value**

Double click a declaration's name or value to change it

**Change declaration value with keyboard shortcuts**
- `alt + up` => 0.1
- `up` => 1
- `shift + up` => 10
- `ctrl + up` => 100

**Add a class to an element**
- Select an element in the DOM tree
- Click `.cls` in the style pane
- Enter the name of the class in the *new class name* text box
- Press Enter

**toggle a class**
- Select the element in DOM Tree
- Click '.cls' in the style pane
- Toggle the checkbox next to the class that below the `add new class` text box

**Add a style rule** / 
**Choose which stylesheet to add a rule to** / 
**Add a rule to a specific location**
感觉这个东西没什么用啊，直接添加一条新的规则

**Reveal the More Actions toolbar**
- In the styles tab, hover over a style rule
- *More Action* is revealed in the bottom-right of the style rule's section

**Sample a color off the page with the Eyedropper**
- Open `Color Picer` from `More Action toolbar`
- the EyeDropper is on by default
- Hover over the target color in the viewport

## 2.3 Find Unused CSS
### 2.3.1 Open the coverage tab
- Open the Commend Menu `shift + ctrl + p`
- Type `coverage`,  and then select a command
### 2.3.2 Analyze code coverage
- The *Unused Bytes* column is the number of bytes that weren't used
- The last column is a visualization of the *Total bytes* and *Unused bytes* columns.The red section of the bar is unused bytes. The green section of the bar is used bytes.

## 2.4 Inspect Animations
动画这个暂时不做笔记了。毕竟自己动画水的一批，等把css揭密看了来，然后看CSS揭秘动画相关章节，就得先把CSS权威指南动画相关章节看完。看样子这个笔记要放到很久以后的时间才做的了了，估计至少2个月。