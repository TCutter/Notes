<!-- TOC -->

- [Dom and Bom](#dom-and-bom)
    - [BOM](#bom)
        - [window 对象](#window-对象)
            - [全局作用域](#全局作用域)
            - [框架](#框架)
            - [窗口大小与位置](#窗口大小与位置)
            - [导航和打开窗口](#导航和打开窗口)
            - [setTimeout 和 setInterval](#settimeout-和-setinterval)
            - [系统对话框](#系统对话框)
        - [location 对象](#location-对象)
            - [查询字符串](#查询字符串)
            - [位置操作](#位置操作)
        - [navigator 对象](#navigator-对象)
        - [history 对象](#history-对象)
    - [DOM](#dom)
        - [节点类型](#节点类型)
            - [Node 类型（基类型）](#node-类型基类型)
            - [Element 类型](#element-类型)
            - [Text 类型](#text-类型)
            - [Document 类型](#document-类型)
        - [动态脚本/样式](#动态脚本样式)
        - [其他方法](#其他方法)
            - [classList](#classlist)
            - [焦点管理](#焦点管理)
            - [自定义属性](#自定义属性)
            - [插入文档](#插入文档)
            - [scrollIntoView](#scrollintoview)
            - [元素大小及样式](#元素大小及样式)

<!-- /TOC -->

# Dom and Bom

## BOM  
浏览器对象模型
    
### window 对象

#### 全局作用域
在全局作用域定义的对象会自动成为 window 对象的属性

区别：是否可以用 delete 删除

```js
var color = "red";
window.name = "t_cutter";

console.log(color); //"red"
console.log(window.name); //"t_cutter"
console.log(name); //"t_cutterr"

delete color; // return false
delete window.name; // return true

console.log(color); //"red"
console.log(window.name); //"undefined"
console.log(name); //"throw an error"
```

#### 框架

如果网页中包含框架，那么每个框架都有一个 window 对象,并且保存在 frames 集合中。在 frames 中，可以通过数值索引（从0开始）或者框架名称来访问相应的 window 对象。每个 window 对象都有一个 name 属性，包含框架的名称。

```html
<html>
<head>
    <title>Frames</title>
</head>
<body>
    <frameset>
        <frame src="1.html" name="top" frameborder="0">
            <frameset rows="160,*">
                <frame src="2.html" name="other">
                <frame src="3.html" name="another">
            </frameset>
    </frameset>
</body>

</html>
```

1. 可通过 top.frames[1] 或 top.frames["other"]引用框架，top对象始终指向最外层框架
2. self 对象始终指向 window 对象，可以与 window 对象互换使用
3. parent 对象始终指向当前框架的直接上层框架。
    代码位于 "another" 框架中时， parent 对象指的就是 "another" 框架中的 window 对象

#### 窗口大小与位置

1. window.innerHeight:表示可见区域高度（包括滚动条）
2. window.outerHeight:浏览器窗口大小
3. document.documentElement.clientHeight:可见区域高度（不包括滚动条）
4. document.documentElement.offsetHeight:与 document.documentElement.clientHeight 一样
5. document.documentElement.scrollHeight:获得网页正文全文高和宽，包含边线宽度。
6. document.body.clientHeight（clientWidth）:首先clientWidth获得的值等于document.documentElement.offsetWidth剪去body边线宽度，而clientHeight获得的是整个 body (网页正文全文)的高度减去边线宽度。
7. document.body.offsetHeight（offsetWidth）:获得的值等于document.body.clientHeight（clientWidth）加上body的边线（border）宽度，即这两个值取到到的包含边线宽度。
8. document.body.scrollHeight:获得网页正文全文高和宽，包含边线宽度
9. document.body.scrollTop:浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离。
10. window.screenTop: 窗口相对于屏幕上边的位置
11. window.screen.height：屏幕分辨率的高度。
12. window.screen.availHeight：屏幕可用工作区高度。

#### 导航和打开窗口

**window.open(url[,name][,feature])**

1. name:
    - _self:在当前窗口打开；
    - _blank:打开一个新窗口；
    - "frame":在一个名为 frame 的窗口中打开该 url；如果没有这个窗口，那么新建一个窗口，并将其命名为 "frame"

2. feature:
    - width,height:新窗口的宽高
    - left,top:新窗口的位置


**弹出窗口屏蔽程序**

目前大多数浏览器都会内置弹出窗口屏蔽程序(返回 null)，或者通过插件屏蔽新弹出窗口(抛出 error)

solution:

```js
var blocked = false;
try{
    var win = window.open("www.baiduc.com");
    if(win == null){
        blocked = true;
    }
}catch(ex){
    blocked = true;
}

if(blocked = true){
    alert("The window is blocked!");
}
```

#### setTimeout 和 setInterval
JS是一个单线程语言,代码运行是其有一个执行队列，setTimeout 和 setInterval 只是在指定的时间后将任务添加到任务队列中，不能保证任务在指定的时间执行

#### 系统对话框

1. alert()
2. confirm("Are you OK?") : 根据点击的 OK 或 Cancel 按钮，分别返回 true 和 false
3. prompt("Who are you?"):会弹出一个文本输入域。点击 OK 按钮返回文本输入域中的内容；点击 Cancel 返回 null


### location 对象
包含并处理网页的 URL

#### 查询字符串

以 bing 上某网站为例
|属性|例子|说明|
|-|-|-|
|href|"https://cn.bing.com/search?q=ddd&qs=n&form=QBLH&sp=-1&pq=ddd&sc=8-3&sk=&cvid=181222#content"|完整的URL路径（同 location.toString()）
|hash|"#content"|若 url 中不包含 # 则返回空字符串
|host|"cn.bing.com"|服务器名和端口号
|hostname|"cn.bing.com"|服务器名，不包括端口号
|port|""|端口号
|protocol|"https:"|协议名
|pathname|"/search"|目录和(或)文件名
|search|"?q=ddd&qs=n&form=QBLH&sp=-1&pq=ddd&sc=8-3&sk=&cvid=181222"|查询字符串

#### 位置操作

1. location.href = "www.baidu.com": 当前页面位置跳转
2. location.replace("www.baidu.com"): 效果与 1 类似，但是使用这种方法跳转后会禁用浏览器的 **后退** 按钮
3. location.reload(param): 页面重载。如果 param 为 true，那么将强制从服务器重载（而非缓存） 

### navigator 对象
保存浏览器信息

|属性|说明|
|--|--|
|userAgent|用户代理字符串|
|plugins|浏览器安装的插件信息的数组|

### history 对象

```js
history.go(1);  //前进一页
history.go(-1);  //后退一页
history.back(); //后退一页
history.forward(); //前进一页
```


## DOM  
文档对象模型

### 节点类型
Dom 可以将 Html 和 XML网页描述成一个有多层次节点的树状结构。总共有 *12* 种类型的节点，这些类型都继承至一个基类型。每个节点都有自己的数据、特性和方法，节点之间也存在某种联系

#### Node 类型（基类型）
所有的节点都继承该类型，因此所有节点都共享相同的基本属性和方法

```js
// 每个节点都有一个 nodeType 属性，用来表示节点类型
// IE中未定义 Node, 因此可以直接使用数字判断
var type = 0;
swicth(someNode.nodeType){
    case Node.ELEMENT_NODE: type = 1;break;
    case Node.ATTRIBUTE_NODE: type = 2;break;
    case Node.TEXT_NODE: type = 3;break;
    case Node.CDATA_SECTION_NODE: type = 4;break;
    case Node.ENTITY_REFERENCE_NODE: type = 5;break;
    case Node.ENTITY_NODE: type = 6;break;
    case Node.PROCESSING_INSTRUCTION_NODE: type = 7;break;
    case Node.COMMENT_NODE: type = 8;break;
    case Node.DOCUMENT_NODE: type = 9;break;
    case Node.DOCUMENT_TYPE_NODE: type = 10;break;
    case Node.DOCUMENT_FRAGMENT_NODE: type = 11;break;
    case Node.NOTATION_NODE: type = 12;break;
}
```

1. 节点关系
    - 每个节点都有一个 childNodes 的属性，保存着一个 NodeList 的类数组对象（非 Array 实例）;
    - 每个节点都有一个 parentNode 的属性指向父节点，childNodes 中的所有节点都共享一个父节点
    - childNodes 中的每个节点都互为同胞节点，可以通过 `previousSibling` 和 `nextSibling` 访问.第一个节点的 previousSibling 和 最后一个节点都 nextSibling 都为 null
    - 父节点的 firstChild 和 lastChild 属性分别等于 childNodes 的第一个和最后一个节点

        ![节点关系](/Style/images/javascript/06.PNG)

    - 新增方法：专门用来操作 Element 类型的节点
        - childElementCount:子元素的个数；
        - firstElementChild/lastElementChild:第一个/最后一个子元素
        - previousElementSibling/nextElementSibling:前一个/后一个同辈元素

2. 操作方法

```js
/* 向 someNode 的 childNodes 列表末尾追加节点。
*  如果 newNode 已经在节点中，则移动该节点 
*/
someNode.appendChild(newNode);  

/* locationNode 为空时效果与 appendChild 相同 
*  不为空时将 newNode 插到 locationNode 的前面 
*/
someNode.insertBefore(newNode,locationNode);  

/* 移除节点并替换
*/
someNode.replaceChild(newNode,locationNode);  

/* 移除节点
*/
someNode.removeChild(newNode);  

/* 拷贝节点，参数表示深拷贝还是浅拷贝，true 表示深拷贝
*/
someNode.cloneNode(true);  
```

#### Element 类型
- nodeType 为 1
- nodeValue 为 null 
- nodeName（或 tagName） 为元素标签名
- parentNode 是一个 Element 或 Document

1. HTML 元素
所有 HTML 元素 都由 HTMLElement 类型表示，HTMLElement 继承自 Element 类型并添加了一些方法。这些属性分别对应于 HTML 元素都存在的标准特性:
    - id
    - title
    - lang 
    - dir : 语言的方向
    - className

2. 特性操作

```js
let div = document.getElementsByTagName('div')[0];

// getAttribute: 获取特性（建议直接用属性值代替）
div.className; // div.getAttribute('class');

// setAttribute: 设置特性
div.setAttribute('id',"my-div");

// removeAttribute: 删除特性
div.removeAttribute('title');
```

3. attribute 属性
Element 类型特有

4. 创建元素
```js
let span = document.createElement('span');
```

#### Text 类型
- nodeType 为 3
- nodeValue 为 节点包含的文本内容
- nodeName 为 "#text"
- parentNode 是一个 Element
- 没有子节点

1. 创建文本节点

```js
let textnode = document.createTextNode("hello world!");
```

2. 规范化文本节点

```js
// 在同一个元素中创建两个文本节点
let div = document.querySelector('div');

let textnode1 = document.createTextNode("hello");
div.appendChild(textNode1);

let textnode2 = document.createTextNode("hello");
div.appendChild(textnode2);

div.normalize();    // 合并文本节点
```

#### Document 类型
- nodeType 为 9
- nodeValue 为 nul
- nodeName 为 "#document"
- parentNode null

1. 文档信息

```js
document.title; // 文档标题
document.URL; // 完整的 URL 
document.domain; // 域名 
```

2. 查找元素

```js
document.getElementByid('my-div');
document.getElementsByTagName('div');
document.getElementsByName('my-name');  // 返回所有 name 属性为 "my-name" 的元素

let div = document.querySelector('div');  // 返回第一个 div 节点
let nodeList = div.querySelectorALL('span');    // 返回 div 节点的后代元素中所有 span 元素

document.getElementsByClassName('my-class'); 
```

### 动态脚本/样式
```js
// 动态脚本
function loadScript(src){
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.body.appendChild(script);
};

// 动态样式
function loadStyle(src){
    let style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.src = src;
    document.head.appendChild('style');
};
```

### 其他方法
#### classList
node.classList 返回一个类名数组
- add(value):添加
- contains(value):查询
- remove(value):删除
- toggle(value)

#### 焦点管理

```js
document.activeElement; // 引用当前获得了焦点的元素
document.hasFocus(); // 判断当前文档是否获取了焦点
```

#### 自定义属性

```html
<div data-myname="123" id='mydiv'></div>

<script>
    console.log(document.getElementById('mydiv').nammyname);  // '123'
</script>
```

#### 插入文档

```html
<div>
    <h1>This is a h1 title</h1>
</div>

<!-- document.getElementsByTagName('h1')[0].innerHTML = '123'; -->
<div>
    <h1>123</h1>
</div>

<!-- document.getElementsByTagName('h1')[0].outerHTML = '123'; -->
<div>
    123
</div>
```

#### scrollIntoView
```js
let div = document.getElementsByTagName('div')[0];

div.scrollIntoView(true); // 同 div.scrollIntoView();  元素顶部与浏览器视口顶部对齐
div.scrollIntoView(false); // div.scrollIntoView();  尽可能的全部显示文档到视口中
```

#### 元素大小及样式