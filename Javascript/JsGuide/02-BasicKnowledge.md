<!-- TOC -->

- [二、基础知识](#二基础知识)
    - [2.1  Javascript类型](#21--javascript类型)
        - [2.1.1  数据类型](#211--数据类型)
        - [2.1.2 引用类型](#212-引用类型)
        - [2.1.3 操作符](#213-操作符)
        - [2.1.4 变量类型和内存](#214-变量类型和内存)
    - [2.2  函数](#22--函数)
        - [2.2.1 基础](#221-基础)
        - [2.2.2 闭包](#222-闭包)
        - [2.2.3 立即执行函数](#223-立即执行函数)
        - [2.2.4 单例模式](#224-单例模式)

<!-- /TOC -->

## 二、基础知识

### 2.1  Javascript类型
JS有5种基础数据类型：Number、Boolean、String、Null、Undefined，和1种引用（复杂）数据类型：Object

#### 2.1.1  数据类型
1. number
	- 数据格式：

	十进制：
	```js
	var num = 99;
	```

	八进制：以0开头，后面的数字是（0~7）
	```js
	var num1 = 070; //等于十进制的56
	var num2 = 090;	//后面的数字超出7时将忽略前面的 0 , 自动转成十进制，90
	```

	十六进制： 以0x开头，后面是（0~9及A~F），字母A~F可以大小写。
	```js
	var num = 0xA;  //十进制的10
	```

	- 数值范围 : 
	超过数值范围的数被自动保存为Infinity值，如果是正数则为Infinity；负数则为-Infinity。
	方法 isFinity() 用来判断是否是有穷数

	- NaN : 
	任何数除以0都会返回NaN
	```javascript
	/*isNaN()会尝试将参数转换成数值，若不能转换成数值，则返回true*/
	console.log(NaN == NaN); //false;
	console.log(isNaN(NaN)); //true;
	console.log(isNaN('blue123')); //true;
	```

	- 数值转换：有3个函数可以把非数值转换为数值：Number()、parseInt()和parseFloat()。转型函数Number()可以用于任何数据类型，后面两个是专门用于把字符串转换为数值。
		- parseInt()
		```javascript
		parseInt(0.7);	//0
		parseInt(-1.7); //-1
		parseInt(1.7); //1
		parseInt('blue123'); //NaN
		parseInt('123blue'); //123		
		parseInt('blue'); //NaN
		```	
		我们还可以为parseInt()提供第二个参数，指定需要转换的进制。
		```js
		console.log(parseInt('0xAF',16));  // 175
		console.log(parseInt('AF',16));  // 175
		console.log(parseInt('AF'));  // NaN
		console.log(parseInt('070',8));  // 将八进制数070转成10进制 56
		console.log(parseInt('70',8));  // 56
		```
		- Number()

			- 如果是Boolean值，true和false将分别转换为1和0
			- 如果是数字值，只是简单的传入和返回
			- 如果是null值，返回0
			- 如果是undefined，返回NaN
			- 如果是字符串，遵循下列规则：
				- 如果是字符串中只包含数字（包括前面带正负号），则将其转换为十进制数值（前导的零会被忽略）
				- 如果字符串中包含有效的浮点格式，如1.1，则将其转换为对应的浮点数值
				- 如果字符串中包含有效的十六进制，如0xf，则将其转换为相同大小的十进制数值
				- 如果字符串是空的，返回0
				- 如果字符串中包含上述格式以外的字符，返回NaN
			- 如果是对象，则调用对象的valueOf()方法，然后依照前面的规则转换返回的值。如果转换的结果是NaN，则调用对象的toString()方法，然后再次依照前面的规则转换返回字符串值	

		```js
		console.log(Number('tg'));   // NaN
		console.log(Number(''));   // 0
 		console.log(Number('0011'));  // 11
		console.log(Number(true));   //1
		```

2. boolean

| 数据类型        | true           | false  |
| :-------: |:-----:| :-----:|
| String      | 任何非空字符串 |''和'   ' |
| Number | 任何非零数字值（包括Infinity和-Infinity）| 0和NaN|
| Undefined | \ | undefined|
| Object | 任何对象 | null|

3. string
- 字符字面量

|字面量 | 含义 |
| :-------------:|:-------------:|
| \r | 回车：回到当前行的最左边 |
| \n | 换行 |
|  \\' | 单引号 |
| \\" | 双引号|
|\\\\|斜杠|

- 字符串转换：toString()
除null和undefined外，数值、布尔、对象和字符串都有 *toString()* 方法

4. null
```js
//可以讲null理解为一个空对象的指针
var c = null;
console.log(typeof(c));	//'object'
console.log(null == undefined);  // true
console.log(null === undefined);  // false
```
5. undefined
```js
var name1;
console.log(name1 == 'undefined');	//true
console.log(typeof(name1));	//'undefined'
console.log(typeof(name2));	//'undefined'
```

6. Object
在ECMAScript中Object是所有对象的基础，所有对象都有以下属性和方法：
	- constructor：保存着用于创建当前对象的函数;
	- hasOwnProperty(propertyName)：用于检查给定的属性在当前对象实例中是否存在（而不是在实例的原型中），参数必须是字符串形式；
	- isPrototypeOf(object)：用于检查传入的对象是否是另一个对象的原型；
	- propertyIsEnumerable(propertyName)：用于检查给定的属性是否能够使用for-in语句来枚举，参数必须是字符串形式;
	- toString()：返回对象的字符串表;
	- valueOf()：返回对象的字符串、数值或布尔值表示，通常和toString()返回的值相同

```js
/*
对象转换成数值时会首先默认调用 valueOf() 方法;
对象的valueOf() 默认会返回对象本身；
*/
var obj ={
	name:'gx'
};
obj.valueOf();	//返回对象本身；
obj.toString();	//"[object Object]"
```

#### 2.1.2 引用类型
1. array

	- 定义：``` var colors = [];```
	- 检测数组： 

		```js
		console.log(colors instanceof Array);	// true	
		console.log(Array.isArray(colors));	// true	ES5方法
		```
	- 方法：

		```js
		var colors = ["red","green","blue"]

		colors.join("||");	//	返回：red||green||blue
		```
		- 插入

		```js
		colors.push("white"); //返回数组长度 4 , colors = ["red","green","blue","white"]
		colors.pop(); // 返回 “white”,  colors = ["red","green","blue"]
		colors.unshift("white"); // 返回数组长度 3 , colors = ["white""red","green","blue"]
		colors.shift();	// 返回 “white”, colors =  ["red","green","blue"]
		```
		
		- 排序

		```js
		colors.reverse(); // 返回 ["blue", "green", "red"]，colors = ["blue", "green", "red"]
		
		var num =  [2,4,1,3,5];
		num.sort(function(a,b){return a-b;});	//返回  [1, 2, 3, 4, 5] ， num = [1, 2, 3, 4, 5]
		```
		
		- 操作
		```js
		//concat
		var colors2 = colors.concat("yellow",["orange","black"]);
		console.log(colors);	// ["blue", "green", "red"]
		console.log(colors2);	// ["blue", "green", "red", "yellow", "orange", "black"]

		//slice
		var colors3 = colors2.slice(1);
		var colors4 = colors2.slice(1,2);
		console.log(colors2);	// ["blue", "green", "red", "yellow", "orange", "black"]
		console.log(colors3);	//["green", "red", "yellow", "orange", "black"].包含结尾
		console.log(colors4);	// ["green"].不包含结尾

		//splice
		var colors5 = colors2.splice(1,2);	//参数：要删除的第一项的位置和删除的项数
		console.log(colors2); //["blue", "yellow", "orange", "black"]
		console.log(colors5); //["green", "red"]

		var colors6 = colors2.splice(0,1,"green",["red","purple"]);	// 参数：起始位置，要删除的项数，要插入的项
		console.log(colors2); //["green", ["red","purple"], "yellow", "orange", "black"]
		console.log(colors6); //["blue"]
		```

		- 位置
		
		```js
		colors2.indexOf("yellow");	//2
		colors2.lastIndexOf("yellow");	//2
		```

		- 遍历

		```js
		/*
		every : 每一项返回 true 结果才返回 true;
		some : 只要有一项返回 true 结果就返回 true;
		filter : 对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组;
		forEach : 对数组中的每一项运行给定函数，没有返回值;
		map : 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组;
		*/

		var nums = [2,1,4,2,5,6,3,3,5];
		var result1 = nums.filter(function(num){
			return (num>2);
		});

		var result2 = nums.map(function(num){
			return (num>2);
		});
		console.log(result1);	// [4, 5, 6, 3, 3, 5]
		console.log(result2);	//  [false, false, true, false, true, true, true, true, true]
		```
		
2. Date

起始时间 ： 1970年1月1日

API:

|方法|含义|
|---|---|
|getTime()|返回毫秒数，与 valueof() 返回的值相同|
|getFullYear()|取得4位数年份(2018而非18)|
|getYear()|返回年份(118)|
|getMonth()|返回日期中的月份，0表示1月|
|getDate()|返回日期中的天数，1 - 31|
|getDay()|返回日期中的星期几，0表示星期天，6表示星期六|
|getHours()|返回日期中的小时数，0 - 23|
|getMinutes()|返回日期中的分钟数， 0 - 59|
|getSeconds()|返回日期中的秒数， 0 - 59|
|getMillseonds()|返回日期中的毫秒数|

3. Object

```javascript
function a(){
	this.name = 'TCutter'
};

var b = new a();
console.log(b.constructor === a); //true
```
4. 正则表达式

	[三十分钟入门正则表达式](http://deerchao.net/tutorials/regex/regex.htm)

5. 基本包装类型

	- Boolean

	- Number

	- String

6. Math 对象


#### 2.1.3 操作符
1. typeof操作符
有6种可能的值

```javascript
var a;
var b = null;
var c= function(){
	 console.log('123');
 };
var d = true;
var e = '123';

 console.log(typeof(a)); //'undefined'
 console.log(typeof(b)); //'object'
 console.log(typeof(c)); //'function'
  console.log(typeof(d)); //'boolean'
  console.log(typeof(e)); //'string'
 console.log(typeof NaN); //'number'
```
2. 自加和自减
```js
var num1 = 2;
var age = ++num1 + 2;
console.log(age);	//5
console.log(num1);	//3

var num2 = 2;
age = (num2++) + 2;
console.log(age);	//4  先和其他值进行操作后，再自增或自减
console.log(num2);	//3
```

3. 位操作符

基础：在ECMAScript中的所有数据是以64位格式存储，位操作符先将64位的值转化成32位的整数，然后执行操作，最后再将结果转换回64位。

对于有符号的整数，32位中的第32位（称为’符号位‘）表示树数值的符号：0位正，1为负。正数以纯二进制格式存储，前31位中的每一位都表示2次幂（第一位叫做位0表示2ˇ0，以此类推）；

负数使用二进制补码，计算一个负数的二进制码需要一下步骤：
    
- 求这个数绝对值的二进制码；
- 求二进制的反码；
- 得到的二进制反码加 1。

将一个二进制负数转成十进制：
- 首先减1；
- 然后取反即可；

a. 按位非（NOT）

用 ～ 表示，结果就是返回数值的反码。其本质是将操作数的负值减 1
```js
var num1 = 3; //0000 0000 0000 0000 0000 0000 0000 0011
var num2 = ~num1; //1111 1111 1111 1111 1111 1111 1111 1100
```

b. 按位与（AND）

用 & 表示

|第一个数值 | 第二个数值 | 结果 |
| :-------------: |:-------------:| :-----:|
| 1 | 1 | 1 |
| 1 |0| 0|
|0 | 1 | 0|
|0 | 0 | 0|

c. 按位或（OR）

用 | 表示

|第一个数值 | 第二个数值 | 结果 |
| :-------------: |:-------------:| :-----:|
|1 | 1 | 1|
|1 |0| 1|
|0 | 1 | 1|
|0 | 0 | 0|

d. 按位异或（XOR）

用 ^ 表示：两个数值在对应位上只有一个1 时才返回

|第一个数值 | 第二个数值 | 结果|
| :-------------: |:-------------:| :-----:|
|1 | 1 | 0|
|1 |0| 1|
|0 | 1 | 1|
|0 | 0 | 0|

e. 左移和右移

左移用 << 表示，（除符号位外）将操作数的所有位向左移动指定的位数；

右移用 >> 表示，（除符号位外）将操作数的所有位向右移动指定的位数

f. 无符号右移(没有无符号左移)

无符号右移用 >>> 表示，将操作数的所有位向右移动指定的位数；

4. in运算符
in运算符希望它的左操作数是一个字符串或可以转换成为字符串，希望它的右操作数是一个对象。如果右侧的对象拥有一个名为左操作数值的属性名，则返回true。
```js
var obj = {
	name:'gx'
};
'name' in obj; //true
```
5. instanceof运算符
instanceof运算符希望左操作数是一个对象，右操作数标识对象的类。如果左侧的对象是右侧类的实例，则表达式返回true。
```js
var a = new Array();
a instanceof Object; //true
a instanceof Array; //true
a instanceof Boolean; //false
```

6. delete运算符
它用来删除对象的属性或数组元素。
```js
var obj = {
	name:'gx'
};
delete obj.name;
'name' in obj; //false
```

#### 2.1.4 变量类型和内存
1. 基本类型和引用类型变量的区别
- 基本类型不能添加属性，而引用类型可以；
- 复制变量值：

```javascript
// 基本类型变量复制的是副本
var a = 5;
var b = a;
b = 2;
console.log(a); //5

/* 引用类型变量复制时，同样会将存储在变量对象中的值复制一份到新变量分配的空间中。
不同的是，这个副本实际上是一个指向存储在堆中的某个对象的指针。
复制操作结束后，两个变量实际上将引用同一个对象。因此，改变其中一个变量就会影响到另一个变量
 */
 var a = {
	 name : 'gx'
 };
 var b = a;
 b.name = 'cm';
 console.log(a.name); //cm
```
- 浅拷贝和深拷贝

```js
/*
借助 $.extend(bool,obj1,obj2) 实现对象的拷贝
定义：
浅拷贝（false 默认）：如果第二个参数对象有的属性第一个参数对象也有，
那么不会进行相同参数内部的比较，直接将第一个对象的相同参数覆盖;

深拷贝（true）：如果第二个参数对象有的属性第一个参数对象也有，还要继续
在这个相同的参数向下一层找，比较相同参数的对象中是否还有不一样的属性，如
果有，将其继承到第一个对象，如果没有，则覆盖。
*/

var a = {name : 'gx'};
 var b= {};
$.extend(false,b, a);
 b.name = 'cm';
 console.log(a.name); // gx
```

2. 作用域

内部函数可以通过 作用域链 访问外部环境的变量和函数，而外部函数不能访问内部函数

3. 没有块级作用域

Js 中没有块级作用域 ```{ }``` ，只有函数作用域
ES6 中通过 使用 let 或 const 定义变量可以解决这个问题；



### 2.2  函数

#### 2.2.1 基础

1. arguments

	- 函数内可以通过 arguments 对象来访问函数的参数数组。而且修改 arguments 的值会对应的修改命名参数的值，但反过来却不行。
	
	- arguments 还有一个名为 callee 的属性， 指向拥有 arguments 的函数

	```js
	function factorial(num){
		if(num <=1) return 1;
		else 
			return num * arguments.callee(num-1);	// 使用 factorial(num-1) 也可以,但是函数耦合性太高，不建议使用
	}
	```

	- caller属性(ES5)，表示调用当前函数的函数的引用,如果是在全局作用域中调用，则其值为 null

	```js
	function  outer(){
		inner()
	};

	function inner(){
		console.log(arguments.callee.caller);
	};

	outer(); // （显示 outer 中的源代码）
	inner(); // null 
	```
	

2. 没有重载：后定义的函数会覆盖前面定义的函数

3. length : 每个函数都有 length 属性，其值为函数参数的个数

4. apply() 和 call() : 在特定的作用域中调用函数，实际上是设置函数体内的 this 对象的值

 	[call、apply和bind](https://www.cnblogs.com/pssp/p/5215621.html);

	```js
	var a = {
		name:"gx",
		sayName:function(){
			console.log(this.name);
		}
	};

	var b = a. sayName;

	/* 即将 sayName() 函数中的 this 对象指向 a (用 a 代替 this ))*/
	b.call(a);	// gx
	```

#### 2.2.2 闭包

定义：闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的方式就是在一个函数中创建另一个函数。

```js
function Test(){
	var a = 0 ;
	
	return function(){
		a++;
		return a ;
	}
}

var func = Test();

func();	// 1
func();	// 2
func();	// 3
```

闭包的优点：
	1. 封装私有变量；
	2. 访问函数内部的变量；
	3. 变量一直保存在内存中，不会在上级函数被调用后被自动清除

闭包的缺点：
	变量会一直存在内存中


其他副作用：
	闭包只能取得包含函数中任何变量的最后一个值。

```js
	function CreateFunction(){
		var result = [];
		for(var i=0;i<5;i++){
			result[i] = function(){
				return i ;
			}
		}
		return result;
	}
```

调用该函数会返回一个函数数组，但每个函数都会返回 5;

应改为如下方法：

```js
function CreateFunction(){
		var result = [];
		for(var i=0;i<5;i++){
			result[i] = function(num){
				return function(){
					return num;
				}
			}(i);
		}
		return result;
	}
```

#### 2.2.3 立即执行函数

```js
(function(){
	console.log("123");
})()
```

特点：在匿名函数中定义的任何变量在函数执行之后都会被销毁

作用：通常用在全局作用域中，限制在全局作用域中添加过多的函数和变量以污染全局环境。此方法可以 **减少** 闭包中内存一直占用的问题

#### 2.2.4 单例模式

概念：一个类只有一个实例(一般的 JS 插件都使用这种方法)

```js
var ins = (function(){
	var name = "T_Cutter";
	var age = "22";
s
	function Human(){
		this.sayName = function(){
			console.log(name);
		};

		this.sayAge = function(){
			console.log(age);
		}
	};

	return new Human();
})()
```