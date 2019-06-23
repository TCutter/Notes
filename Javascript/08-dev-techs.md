<!-- TOC -->

- [常用开发技巧](#常用开发技巧)
  - [数组](#数组)
    - [获取数组中的随机项](#获取数组中的随机项)
    - [乱序](#乱序)
    - [类数组对象调用数组方法](#类数组对象调用数组方法)
    - [获取数组中的最大最小值](#获取数组中的最大最小值)
    - [数组合并](#数组合并)
    - [数组复制](#数组复制)
    - [`for in`、`Object.keys()`、`Object.getOwnPropertyNames()` 、`for of ` 的区别](#for-inobjectkeysobjectgetownpropertynames-for-of--的区别)
  - [DOM 相关](#dom-相关)
    - [window.open](#windowopen)
    - [event对象](#event对象)
    - [延迟脚本](#延迟脚本)
    - [异步脚本](#异步脚本)
  - [Others](#others)
    - [简化if语句](#简化if语句)
    - [避免使用new操作符](#避免使用new操作符)
    - [遍历对象属性](#遍历对象属性)
    - [JS 静态成员变量（static member variable）](#js-静态成员变量static-member-variable)
    - [call、apply和bind](#callapply和bind)
    - [URI编码](#uri编码)
    - [Inline SVG vs Icon Fonts](#inline-svg-vs-icon-fonts)

<!-- /TOC -->
## 常用开发技巧

### 数组
#### 获取数组中的随机项

```javascript
var temp = array[Math.floor(Math.random() * array.length)];
```
#### 乱序
```js
array.sort(function() {
    return Math.random() - 0.5
})
```

#### 类数组对象调用数组方法

```javascript
/*类数组对象:如函数的参数arguments,DOM的NodeList和HTMLCollection*/
Array.prototype.forEach.call(arguments,function(value){}); //遍历

var args = Array.prototype.slice.call(arguments); //类数组对象转换成数组
//ES6 用法 var args = Array.from(arguments);
```

#### 获取数组中的最大最小值

```javascript
var maxNum=Math.max.apply(null,array);
var minNum=Math.min.apply(null,array);

//ES6
var maxNum=Math.max(...array);
var minNum=Math.min(...array);
```

#### 数组合并

```javascript
//对于小数组：
var arr1 = [1,2,3];
var arr2 = [4,5,6];
var arr3 =arr1.concat(arr2);	// [1,2,3,4,5,6]

//对于大型数组，使用concat合并效率低下
Array.prototype.push.apply(arr1,arr2);
//ES6用法 arr1.push(...arr2); 或者 [...arr1,...arr2]

console.log(arr1);  //[1,2,3,4,5,6]
console.log(arr2); //[4,5,6]
```

#### 数组复制

```js
// 以下都是浅拷贝

const a1 = [1, 2];
const a2 = a1.slice(); 
/*或者 ：const a2 = a1.slice();
ES6用法： const a2 = [...a1];
*/

a2[0] = 2;
a1 // [1, 2]
```

#### `for in`、`Object.keys()`、`Object.getOwnPropertyNames()` 、`for of ` 的区别
- `for in`:
所有能够通过对象访问的、可枚举的属性，既包括存在于实例中的属性，也包括存在于原型中的属性。使用 `class` 和 `function` 创建的对象结果不同，`class` 中的方法无法遍历，`function 的 prototype` 方法可以遍历

- `for of `:
主要用于数组

- `Object.keys()`:
获取对象自身所有的可枚举的属性值，但不包括原型中的属性

- `Object.getOwnPropertyNames()`:
返回对象的所有自身属性的属性名（包括不可枚举的属性）组成的数组，但不会获取原型链上的属性

### DOM 相关
#### window.open

chrome60开始取消了对顶部框架导航（top-frame navigation）的支持，直接使用window.open会报错：
`Not allowed to navigate top frame to data URL`

[需要将数据放到iframe中](https://stackoverflow.com/questions/45493234/jspdf-not-allowed-to-navigate-top-frame-to-data-url)

```javascript
var canvasConvertResult = canvas.toDataURL('image/png');
var iframe = "<iframe width='100%' height='100%' src='" + canvasConvertResult + "'></iframe>"var x = window.open();x.document.open();
x.document.write(iframe);
x.document.close();
```

#### event对象

a. 移动端event

[touches,targetTouches和changedTouches的区别](https://www.cnblogs.com/mengff/p/6005516.html)

- touches: 当前屏幕上所有触摸点的列表

- targetTouches: 当前对象上所有触摸点列表

- changedTouches: 涉及当前(引发)事件的触摸点的列表

b. event坐标

[关于几个属性坐标的理解](https://www.cnblogs.com/frontendnotes/articles/6536006.html)

- event.clientX、event.clientY：鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标），可视区域不包括工具栏和滚动条;

- event.pageX、event.pageY：类似于event.clientX、event.clientY，但它们使用的是文档坐标而非窗口坐标;

- event.offsetX、event.offsetY:鼠标相对于事件源元素（触发事件的对象srcElement）的X,Y坐标;

- event.screenX、event.screenY:鼠标相对于用户显示器屏幕左上角的X,Y坐标

- event.x、event.y:相当于 event.clientX、event.clientY

![event坐标图鉴](/Style/images/javascript/event_position2.PNG)

#### 延迟脚本
```javascript
<script type='test/javascript' defer='defer' src='example.js'></script>
```
脚本立即下载，但是会被延迟到整个页面都解析完毕后再运行。

#### 异步脚本
```javascript
<script type='test/javascript' async src='example.js'></script>
```
使用另一个进程下载脚本，下载时不会阻塞渲染。
下载完成后暂停HTML解析，马上执行脚本

### Others
#### 简化if语句

```javascript
if(condition){
	fn();
}
改成
condition && fn();
```

#### 避免使用new操作符

```javascript
var a = new Object();
var b = new  Array();
var c = new  String("123");

//改成
var a = {};
var b = [];
var c = "123";
```

#### 遍历对象属性

```javascript
var a={
	name:"gx",
	age:24
};
Object.prototype.height = 180;
//用for...in遍历需要用hasOwnProperty判断是否是原型属性

Object.keys(a); //["name", "age"]
```

#### JS 静态成员变量（static member variable）

定义：只有一份，但是被类的所有实例共享的变量。非静态方法需要通过类的实例访问，而静态方法可以直接通过类名访问。
通过prototype添加的属性和方法不是静态的

````javascript
function People(){
	var sex = "man"; //private variable
	this.age = "24"; //public variable

	this.getAge = function(){ //public method
		return this.age;
	}
}

//The method will be available to all instances but only load in one memory
People.prototype.getHeight = function(){
	alert("getHeight");
}

//Static variable shared by all instances
People.language = "Chineses";
````
[如何在Javascript中创建静态变量](https://stackoverflow.com/questions/1535631/static-variables-in-javascript)

#### call、apply和bind

[call、apply和bind](https://www.cnblogs.com/pssp/p/5215621.html);

```js
var join = Function.prototype.call.bind(Array.prototype.join);
join("abc","|");	// "a|b|c"

//equals to
Array.prototype.join.call("abc","|");

Array.prototype.join.apply("abc",["|"]);
```

[借用方法](https://www.zcfy.cc/article/borrowing-methods-in-javascript-by-david-shariff-794.html)

#### URI编码

- encodeURI() 和 decodeURI()

	不会对属于 URI 的特殊字符进行编码，如冒号、正斜杠、问号和井字号。常用于整个 URI 的编码

- encodeURIComponent() 和 decodeURIComponent()

	对所有非标准字符编码。主要用于对 URI 中的某一段进行编码

#### Inline SVG vs Icon Fonts
[Inline SVG vs Icon Fonts](https://css-tricks.com/icon-fonts-vs-svg/)
