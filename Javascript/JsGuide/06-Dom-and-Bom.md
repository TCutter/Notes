<!-- TOC -->

- [Dom and Bom](#dom-and-bom)
    - [window 对象](#window-对象)
        - [全局作用域](#全局作用域)
        - [框架](#框架)
        - [窗口大小与位置](#窗口大小与位置)

<!-- /TOC -->

## Dom and Bom

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

1. 窗口位置

screenTop和screenLeft 分别表示窗口相对于屏幕上边和左边的位置

>Firefox 中使用 screenY 和 screenX 

2. 窗口大小

outerWidth和innerWidth不一样，innerWidth和下面的document.body是视口大小，outerWidth是浏览器本身的尺寸