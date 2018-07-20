## 1. let 

### 基本用法

let 声明的变量只在所在的代码块内有效

```js
{
    let a = 10;
    var b =1 ; 
}

a // error
b // 1 
```

在 for 循环中的用法：
1. 设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域

```js
for(let i=0;i<3;i++){
    let i = 'abc';
    console.log(i);
}

// abc
// abc
// abc
```
2. 每一个循环的 i 其实都是一个新的变量，只是 JavaScript 引擎内部会记住上一轮循环的值

```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

### 不存在变量提升

```js
console.log(test);  // abc
var test = "abc";

console.log(test1); // error
let test1 = "abc";
```

### 暂时性死区

ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

```js
var temp = '123';
if(true){
    temp = 'abc';   // error
    let temp;
}
```

基于这一点 *typeof* 不再是一个完全安全的操作

```js
{
    typeof x;   // error
    let x ='123';
}
```

### 不允许重复声明

let 不允许在相同作用域内

```js
function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```

## 2. 块级作用域

ES6 之前没有块级作用域，导致内层变量可能会覆盖外层变量。

let实际上为 JavaScript 新增了块级作用域。

块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。

```js
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

## 3. const 命令

### 基本用法

const 声明一个只读的常亮，一旦声明，常量的值就不能改变