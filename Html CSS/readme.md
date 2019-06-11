# HTML 和 Css 相关知识
## CSS
### 行内元素与块级元素
#### 分类
- 行内元素：`span, a, img`
- 块级元素：`div, p, h系列, li, dt, dd`

#### 特性

- 行内元素:
    - 与其他行内元素并排
    - 不能设置宽高
    - 可以使用部分 `padding`, `margin` ，只能使用 `left` 和 `right`
- 块级元素:
    - 独占一行
    - 能接受宽、高设置。如果不设置宽度，那么宽度将默认变为父元素的100%
    - 可以使用 `padding`和 `margin`

#### `display:inline-block`
- 与其他行内元素并排
- 能接受宽、高设置
- 可以使用 `padding`和 `margin`

>总结：不独占一行的块级元素。

### 浮动
1. 元素被设为浮动就代表脱离标准流，此时元素不再区分行内或块级元素，可以设置宽高了。如果没有设置width，那么将自动收缩为内容的宽度
2. 浮动的元素相互贴靠
3. 标准流中的文字不会被浮动的盒子遮挡住，形成“字围”效果。（文字就像水一样）
4. `clear:left` 属性只能作用于自身

### margin
1. 标准文档流中,竖直方向的margin不叠加，取较大的值**作为margin,水平方向的margin是可以叠加的
2. margin的值可以为auto，表示自动。<font color="red">对于标准流的盒子</font>, 当left、right两个方向都是auto的时候，盒子居中了：`margin:0 auto;`
3. 善于使用父元素的 `padding`，而不是子元素的 `margin`

### 文字省略号
```css
div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

### box-sizing 属性
#### content-box（默认）(W3C 标准盒模型)
此时设置的 width 和 height 是内容区域的宽高。盒子的实际宽度 = 设置的 width + padding + border
#### border-box (IE 盒模型)
此时设置的 width 和 height 是盒子的总宽高。盒子的实际宽度 = 设置的 width

### BFC(块级格式化上下文)
定义： 是块级盒布局出现的区域，也是浮动层元素进行交互的区域
#### BFC 产生条件
- 根元素
- `float` 不为 `none`
- `display` 为 `inline-block, table-cell, table-caption, flex, inline-flex`
- `position` 为 `absolute/fixed`
- `overflow` 不为 `visible`

#### 应用
1. 自适应两栏布局


### box-shadow 边框阴影
```css
box-shadow: 水平偏移 垂直偏移 模糊程度 阴影大小 阴影颜色 内/外阴影;
box-shadow: 15px 21px 48px -2px #666 inset;
```
> 设置边框阴影不会改变盒子的大小

### 动画
> 属性变化时触发

- transition：过渡
- transform：2D/3D 转换
- animation: 动画

#### transition
- `transition-property: all;` 如果希望所有的属性都发生过渡，就使用all。
- `transition-duration: 1s;` 过渡的持续时间。
- `transition-timing-function: linear;` 运动曲线。属性值可以是:
    - linear 线性
    - ease 减速
    - ease-in 加速
    - ease-out 减速
    - ease-in-out 先加速后减速
- `transition-delay: 1s;` 过渡延迟。多长时间后再执行这个过渡动画

```css
transition: 让哪些属性进行过度 过渡的持续时间 运动曲线 延迟时间;
transition: all 3s linear 0s;
```

#### transform
- 2D

    translate、scale、rotate、matrix
- 3D

    translate3d、scale3d、rotate3d、matrix3d

#### animation

## 弹性布局
### 容器属性
#### flex-direction（主轴方向）
- row 水平方向（默认值）
- reverse-row 反转
- column 垂直方向
- reverse-column 反转列

#### flex-wrap（换行相关属性）
#### flex-flow
`flex-direction` 和 `flex-flow` 的简写形式

#### justify-content（子元素在主轴上的对齐方式）
- flex-start 从主轴的起点对齐（默认值）
- flex-end 从主轴的终点对齐
- center 居中对齐
- space-around 在父盒子里平分
- space-between 两端对齐 平分

#### align-items（子元素在侧轴上的对齐方式）
- flex-start 从侧轴开始的方向对齐
- flex-end 从侧轴结束的方向对齐
- baseline 基线 默认同flex-start
- center 中间对齐
- stretch 拉伸

#### align-content（多根轴线的对齐方式）

### Item 属性
#### order（排列顺序）
默认为0

#### flex-grow（放大比例）
1. 默认为0，即如果存在剩余空间，也不放大
2. 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间

#### flex-shrink（缩小比例）
1. 默认为1，即如果空间不足，该项目将缩小
2. 所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小

#### flex-basis（分配多余空间之前，项目占据的主轴空间）
1. 默认值为auto，即项目的本来大小
2. 可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间

#### flex
1. `flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`
2. `auto (1 1 auto)`
3. `none (0 0 auto)`

#### align-self
允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性
