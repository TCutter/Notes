<!-- TOC -->

- [五、Canvas](#五canvas)
  - [5.1 基本用法](#51-基本用法)
    - [定义](#定义)
    - [使用](#使用)
  - [绘图](#绘图)
    - [属性](#属性)
    - [基本图形](#基本图形)
    - [变换](#变换)
    - [绘制图像](#绘制图像)
    - [效果](#效果)
    - [WebGL](#webgl)

<!-- /TOC -->
## 五、Canvas
### 5.1 基本用法

#### 定义
要使用 `canvas` 必须声明 `width` 和 `height`, 默认是 `300*300`
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

### 绘图
#### 属性
```js
ctx.fillStyle = 'red' // 填充, 默认值都为 #000
ctx.strokeStyle = 'green' // 描边, 默认值都为 #000
ctx.lineWidth = 1 // 线条宽度
ctx.lineCap = 'butt' // round\square 线条末端的形状

ctx.font = '12px Arial' // 设置文本样式
ctx.textAlign = 'left' // 设置文本对齐方式
```

#### 基本图形
1. moveTo(x, y) <br>
  将绘图游标移动到 (x, y)，不画线
  
2. lineTo(x, y) <br>
  从上一个点绘制一条直线到 (x, y)

3. arc(x, y, radius, startAngle, endAngle, clockWise) <br>
  以 (x, y) 为圆心， radius 为半径画圆弧，起始角度和终止角度（弧度）分别为 startAngle 和 endAngle，clockWise 表示是否是逆时针（false表示顺时针）

4. arcTo(x1, y1, x2, y2, radius) <br>
  从上一个点开始以半径 radius 画弧，到 （x2, y2）为止，并且经过 （x1, x2）

5. fillRect、strokeRect、clearRect  <br>
  参数： x坐标、y坐标、矩形宽度、矩形高度

6. rect(x, y, width, height) <br>
  绘制的是矩形路径，与 strokeRect 和 fillRect 不一样

7. beginPath() <br>
  开始一段新路径

8. closePath() <br>
  关闭路径。它会试图从（MoveTo点之后）当前路径的终点连一条路径到起点，让整个路径闭合起来
  
9. fillText(text, x, y) <br>
  绘制文本

#### 变换

1. rotate(angle) : 单位是弧度
2. scale(scaleX, scaleY)
3. translate(x, y)
4. transform()
5. setTransform()

#### 绘制图像
1. drawImage(img, sx, sy, swidth, sheight, dx, dy, dwidth, dheight)

|参数|说明|
|--|--|
|img|图像、画布或视频|
|sx、sy|开始剪切的 x、y 坐标的位置|
|swidth、sheight|被剪切图像的 宽度、高度|
|dx、dy|在画布上放置图像的 x、y 坐标位置|
|dwidth、dheight|要使用的图像的宽度、高度。（伸展或缩小图像）|

- drawImage(img, dx, dy)
  从 canvas 的 (dx, dy) 位置上开始绘制 img

- drawImage(image, dx, dy, dw, dh) 
  从 canvas 的 (dx, dy) 位置上以 dw,dh 开始绘制 img

- drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  从 canvas 的 (dx, dy) 位置上以 （dw,dh）的大小 开始绘制 img, img 从（sx, sy）坐标开始裁剪，裁剪大小为（sw, s）

![drawImage](/Style/images/javascript/drawImage.png)

2. putImageData/getImageData
```js
let imageData = ctx.getImageData(x, y, width, height)
/* imageData 包含三个属性：data, width, height
  data 是一个数组，包含着每一个元素的 rgba 值
*/
putImageData(imageData, x, y)
```

#### 效果
1. 阴影
  - shadowColor: 阴影颜色
  - shadowOffsetX: x 轴方向的阴影偏移量，默认为 0
  - shadowOffsetY: y 轴方向的阴影偏移量，默认为 0
  - shadowBlur: 模糊的像素数，默认为0，即不模糊

2. 渐变
3. 模式

#### WebGL