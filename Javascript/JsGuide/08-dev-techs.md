<!-- TOC -->

- [常用开发技巧](#常用开发技巧)
    - [数组](#数组)
        - [获取数组中的随机项](#获取数组中的随机项)
        - [类数组对象调用数组方法](#类数组对象调用数组方法)
        - [获取数组中的最大最小值](#获取数组中的最大最小值)
        - [数组合并](#数组合并)
        - [数组复制](#数组复制)
    - [DOM 相关](#dom-相关)
        - [window.open](#windowopen)
        - [event对象](#event对象)
        - [延迟脚本](#延迟脚本)
    - [Others](#others)
        - [简化if语句](#简化if语句)
        - [避免使用new操作符](#避免使用new操作符)
        - [遍历对象属性](#遍历对象属性)
        - [JS 静态成员变量（static member variable）](#js-静态成员变量static-member-variable)
        - [继承](#继承)
        - [call、apply和bind](#callapply和bind)
        - [URI编码](#uri编码)
        - [Source Code](#source-code)

<!-- /TOC -->
## 常用开发技巧

### 数组
#### 获取数组中的随机项

```javascript
var temp = array[Math.floor(Math.random() * array.length)];
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

### DOM 相关
#### window.open

	chrome60开始取消了对顶部框架导航（top-frame navigation）的支持，直接使用window.open会报错：
	```Not allowed to navigate top frame to data URL ```

	[需要将数据放到iframe中](https://stackoverflow.com/questions/45493234/jspdf-not-allowed-to-navigate-top-frame-to-data-url)

	```javascript
	 var canvasConvertResult = canvas.toDataURL('image/png');
	 var iframe = "<iframe width='100%' height='100%' src='" + canvasConvertResult + "'></iframe>"
    var x = window.open();
    x.document.open();
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

#### 继承
[继承](https://johnresig.com/blog/simple-javascript-inheritance/)

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

#### Source Code
```js
/**
 * 对象、数组深拷贝
 * @param {Object} obj
 * @returns {Object}
 */
function deepCopy (obj) {
    let objClone = obj.constructor === Array ? [] : {}
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                objClone[key] = deepCopy(obj[key])
            } else {
                objClone[key] = obj[key]
            }
        }
    }
    return objClone
}

/**
 * 模拟 call
 * @param {*} context
 * @returns {*}
 */
Function.prototype.call2 = function (context) {
    var context = context || window
    context.fn = this

    var args = []
    // 执行后 args为 ["arguments[1]", "arguments[2]", "arguments[3]"]
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']')
    }
    var result = eval('context.fn(' + args + ')') // args 会自动调用 Array.toString()
    delete context.fn
    return result
}

/**
 * 模拟 apply
 * @param {*} context 
 * @param {Array} arr
 * @returns {*}
 */
Function.prototype.apply2 = function (context, arr) {
    var context = context || window
    context.fn = this

    var result = null
    if (!arr) {
        result = context.fn()
    } else {
        var args = []
        for (var i = 1, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']')
        }
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn
    return result
}

/**
 * 模拟 bind
 * @param {*} context
 * @returns {Function}
 */
Function.prototype.bind2 = function (context) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var self = this
    // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1)

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments)
        /**
         * 当作为构造函数时，this 指向实例， 结果为 true;
         * 当作为普通函数时，this 指向 window, 结果为 false
         */
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }

    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    fBound.prototype = Object.create(self.prototype)
    fBound.prototype.constructor = fBound
    return fBound
}

/**
 * 模拟 new
 * @returns {*}
 */

function createObjIns () {
    var Constructor = [].shift.call(arguments)
    // 设置 obj.__proto__ = Constructor.prototype, 相当于复制 Constructor 原型上的属性
    var obj = Object.create(Constructor.prototype)
    // 设置内部属性，跟寄生组合式继承很像
    var ret = Constructor.apply(obj, arguments)
    // 我们还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么。
    return typeof ret === 'object' ? ret : obj;
}

/**
 * Generator 实现状态机
 */
const clock = function* () {
    while (true) {
        yield true
        yield false
    }
}

/**
 * 函数防抖
 * @param {Function} fn 待执行函数
 * @param {Number} delay 延迟时间
 */
function debounce (fn, delay) {
    var timeout 
    return function () {
        var self = this
        var args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function () {
            fn.apply(self, args)
        }, delay)
    }
}

/**
 * 函数节流
 * @param {Function} fn 待执行函数
 * @param {Number} delay 间隔时间
 */
function throttle (fn, delay) {
    var timeout
    var args // 取第一次还是最后一次的 args？？？写在这里表示是最后一次，形成一个闭包，凉羽大神用的也是最后一次
    return function () {
        var self = this
        args = arguments // 闭包变量，每次执行都更新值
        if (!timeout) {
            timeout = setTimeout(function () {
                fn.apply(self, args)
                timeout = null
            }, delay);
        }        
    }
}

/**
 * 类型检测
 */
function types (obj) {
    var classType = {}

    'Boolean Number String Function Array Date RegExp Object Error'.split(' ').map(item => {
        classType[`[object ${item}]`] = item.toLowerCase()
    })

    if (obj == null) {
        return obj + ''
    }

    return typeof obj === 'object' || typeof obj === 'function'
        ? classType[Object.prototype.toString().call(obj)] || 'object' // 引用类型
        : typeof obj // 基本类型
}
```