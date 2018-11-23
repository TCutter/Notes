<!-- TOC -->

- [五、Canvas](#五canvas)
  - [5.1 基本用法](#51-基本用法)
    - [定义](#定义)
    - [使用](#使用)

<!-- /TOC -->
## 五、Canvas
### 5.1 基本用法

#### 定义
要使用 canvas 必须声明 width 和 height
```html
<canvas id="drawing" width="100" height="100"></canvas>
```
#### 使用

```js
var canvas = document.getElementById('drawing');

/*
* 将画布转成图片
* 将 图像数据 传入后端时，有时会出现传输失败，因为 png 数据太大，这时候可以将参数改为 'image/jpeg'
*/
var img = canvas.toDataUrl('image/png')
var ctx = canvas.getContext('2d')
ctx.drawImage(img, 0, 0) // 绘图
```