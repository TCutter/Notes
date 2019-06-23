<!-- TOC -->

- [七、事件](#七事件)
  - [7.1 事件流](#71-事件流)
    - [事件冒泡](#事件冒泡)
    - [事件捕获](#事件捕获)
    - [DOM事件流](#dom事件流)
  - [7.2 事件处理程序](#72-事件处理程序)
    - [HTML事件处理程序(不推荐)](#html事件处理程序不推荐)
    - [DOM0级](#dom0级)
    - [DOM2级](#dom2级)
    - [IE事件处理程序](#ie事件处理程序)
  - [7.3 事件对象（event）](#73-事件对象event)
    - [DOM 中的事件对象](#dom-中的事件对象)
    - [IE 中的事件对象](#ie-中的事件对象)
    - [[鼠标位置](08-dev-techs.md#event对象)](#鼠标位置08-dev-techsmdevent对象)

<!-- /TOC -->
## 七、事件
### 7.1 事件流
事件流描述了页面接收事件的顺序

```html
<div>
  <p>
    <span>it's a test<span>
  </p>
</div>
```

#### 事件冒泡
由具体的节点开始向上传播

如果点击了 span，事件传播顺序如下

1. span
2. p 
3. div

#### 事件捕获
最具体的节点最后收到事件

事件传播顺序刚好相反

1. div
2. p
3. span

#### DOM事件流
事件流按规定分为 3 个阶段：事件捕获阶段 -> 处于目标阶段 -> 事件冒泡阶段。

### 7.2 事件处理程序

#### HTML事件处理程序(不推荐)
将事件绑定在 html 元素上
```html
<input type="button" onclick='myClick' />
```

#### DOM0级
```js
var btn = document.getElementById('myBtn')
btn.onclick = function () {
  // this 指向 btn 这个节点元素
  console.log(this.id)
}
```

#### DOM2级
addEventListener 和 removeEventListener

```js
var btn = document.getElementById('myBtn')

// 事件绑定
btn.addEventListener('click', myClick, false)

// 解除绑定
btn.removeEventListener('click', myClick, false)
```

最后一个参数 bool
1. true表示在事件捕获阶段调用事件处理函数
2. false 表示在事件冒泡阶段调用，默认值 （***建议***）

#### IE事件处理程序
```js
var btn = document.getElementById('myBtn')

btn.attachEvent('onclick', myClick)

btn.detachEvent('onclick', myClick)
```

### 7.3 事件对象（event）

#### DOM 中的事件对象
常用属性和方法如下

|属性|说明|
|--|--|
|bubbles|事件是否冒泡|
|currentTarget|处理程序正在处理事件的那个元素|
|target|事件的目标|
|type|事件类型|
|eventPhase|事件所处的阶段：1表示 ‘捕获’，2表示 ‘处于目标’ ，3表示 ‘冒泡’|
|preventDefault()|取消事件的默认行为|
|stopPropagation()|取消事件冒泡|

> 在事件处理程序内部，对象 this 始终指向 currentTarget 的值.如果事件直接指向了目标元素，那么 this === event.currentTarget === event.target

#### IE 中的事件对象
|属性|说明|
|--|--|
|cancelBubble|默认为 false, 将其设为 true 效果与 stopPropagation() 一样|
|retunValue|默认为 true, 将其设为 false 效果与 preventDefault() 一样|
|srcElement|效果与 target 一样|
|type|事件类型|

#### [鼠标位置](08-dev-techs.md#event对象)
