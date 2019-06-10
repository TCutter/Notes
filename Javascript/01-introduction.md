<!-- TOC -->

- [一、简介](#一简介)
  - [1.1 严格模式](#11-严格模式)

<!-- /TOC -->
## 一、简介

JavScrip由三个部分组成
- ECMAScript : 提供核心语言功能
- DOM ：提供访问和操作网页内容的方法和接口
- BOM ：提供与浏览器交互的方法和接口

### 1.1 严格模式
可在整个脚本中启用，也可以在函数体内部使用

```js
"use strict";
function doSomething(){
"use strict";
// 函数体
}
```

在严格模式下会报错的情况

- 八进制语法:var n = 023和var s = "\047"
- with语句
- 使用delete删除一个变量名(而不是属性名):delete myVariable
- 使用eval或arguments作为变量名或函数名
- 使用未来保留字(也许会在ECMAScript 6中使用):implements, interface, let, package, private, protected, public, static,和yield作为变量名或函数名
- 在语句块中使用函数声明:if(a<b){ function f(){} }
- 对象字面量中使用两个相同的属性名:{a: 1, b: 3, a: 7}
- 函数形参中使用两个相同的参数名:function f(a, b, b){}
