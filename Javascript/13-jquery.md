<!-- TOC -->

- [十三、Jquery](#十三jquery)
  - [选择器](#选择器)
    - [基本选择器](#基本选择器)
    - [层次选择器](#层次选择器)
    - [过滤选择器](#过滤选择器)
      - [基本过滤选择器](#基本过滤选择器)
      - [内容过滤选择器](#内容过滤选择器)
      - [可见性过滤选择器](#可见性过滤选择器)
      - [属性过滤选择器](#属性过滤选择器)
      - [子元素过滤选择器](#子元素过滤选择器)
      - [表单对象属性过滤选择器](#表单对象属性过滤选择器)
    - [表单选择器](#表单选择器)
  - [DOM的操作](#dom的操作)
    - [查找节点](#查找节点)
    - [创建节点](#创建节点)
    - [插入节点](#插入节点)
    - [删除节点](#删除节点)
    - [复制节点](#复制节点)
    - [替换节点](#替换节点)
    - [包裹节点](#包裹节点)
    - [属性操作](#属性操作)
    - [样式操作](#样式操作)
    - [设置和获取HTML、文本和值](#设置和获取html文本和值)
    - [遍历节点](#遍历节点)
      - [children()](#children)
      - [next()，nextAll()](#nextnextall)
      - [prev()，prevAll()](#prevprevall)
      - [siblings()](#siblings)
      - [closest()](#closest)
      - [find()](#find)
      - [filter()](#filter)
      - [parent()，parents()](#parentparents)
  - [事件](#事件)
    - [加载事件](#加载事件)
    - [绑定事件](#绑定事件)
    - [合成事件](#合成事件)
    - [事件冒泡](#事件冒泡)
    - [事件对象event](#事件对象event)
    - [移除事件](#移除事件)
    - [模拟操作](#模拟操作)
  - [动画](#动画)
    - [show,hide,toggle](#showhidetoggle)
    - [fadeIn,fadeOut,fadeTo,fadeToggle](#fadeinfadeoutfadetofadetoggle)
    - [slideUp,slideDown,slideToggle](#slideupslidedownslidetoggle)
    - [自定义动画animate](#自定义动画animate)
  - [表单、表格](#表单表格)
    - [文本框](#文本框)
    - [复选框](#复选框)
    - [下拉框](#下拉框)
    - [表格筛选](#表格筛选)
  - [其他方法：](#其他方法)
    - [$.each](#each)
    - [$.extend()](#extend)

<!-- /TOC -->
## 十三、Jquery

### 选择器
#### 基本选择器
```
//五种基本选择器
$("#id")，$(".class")，$("element")，$("*")，$("#id,.class,span")
```
#### 层次选择器
```
$("div span")  //所有后代元素,子加孙
$("div >span")  //所有子元素
$("div").next("div") //或$("div + div")，后面第一个兄弟元素
$("div").nextAll("div") //或$("div ~ div")，后面所有兄弟元素
$("div").siblings("div") //所有兄弟元素，无论前后位置
```
#### 过滤选择器
##### 基本过滤选择器
```
$("div> span:first") //选取所有div元素中的第一个子元素是span的元素
$("div>span:last") //选取所有div元素中的最后一个子元素是span的元素
$("div> span:not(.myClass)") //选取class不是myClass的span元素
$("div> span:event") //选取索引是偶数的span元素(索引从0开始)
$("div> span:odd") //选取索引是奇数的span元素
$("div> span:eq(1)") //选取索引是1的span元素（索引从0开始），与$("div> span:first")相同
$("div> span:gt(1)") //选取索引大于且不等于1的span元素
$("div> span:lt(1)") //选取索引小于且不等于1的span元素
$("div> span:head") //选取所有标题元素，如h1,h2.h3.....
$("div> span:animated") //选取正在执行动画的span元素
```
##### 内容过滤选择器
```
$("div:contains('我')") //选取含有文本“我”的div元素
$("div:has(p)") //选取含有<p>元素的div元素
$("div:empty") //选取无子元素（包括文本元素）的div元素
$("div:parent") //选取拥有子元素（包括文本元素）的div元素
```
##### 可见性过滤选择器
```
$(":hidde") /*选取所有不可见元素，如<input type="hidden">,<div style="display:none">,<div style="visibility:hidden">*/
$(":visible") //选取所有可见元素
```
##### 属性过滤选择器
```
$("div[title]") //选取拥有title属性的div元素
$("div[title=test]") //选取title属性等于"test"的div元素
$("div[title!=test]") //选取title属性不等于"test"的div元素
$("div[title^=test]") //选取title属性以"test"开头的div元素
$("div[title$=test]") //选取title属性以"test"结束的div元素
$("div[title*=test]") //选取title属性包含"test"的div元素
$("div[title][title^=test][title$=test]") //多个限制条件
```
##### 子元素过滤选择器
```
$("div > span:nth-child(index/even/odd/equation)"); //选取每个div下的第index个子元素或奇偶元素是span的元素（索引从1开始）;
$("div >span:first-child"); //选取每个div下的第1个子元素是span的元素（索引从1开始）;
$("div >span:last-child"); //选取每个div下的最后1个子元素是span的元素（索引从1开始）;
$("div >span:only-child"); //如果某个元素是其父元素的唯一子元素，那么它将会被匹配，如果该元素的父元素含有多个子元素，则不会被匹配;
$("div:first-child"); //选取div元素,该div元素的特点为它是其父元素的第一个子元素;
```
##### 表单对象属性过滤选择器
```
$("#form1 :enabled")//选取所有可用元素
$("#form1 :disabled")//选取所有不可用元素
$("input :checked")//选取所有被选中的元素（针对单选框和复选框）
$("select:selected")//选取所有被选中的选项元素（针对下拉列表）
```
#### 表单选择器
```
//截取几个例子
$(":input")//选取所有input元素
$(":password")//选取所有密码框
$(":submit")//选取所有提交按钮
```

### DOM的操作
Jquery中的this对象：<font color="red">该位置的DOM节点元素（不是Jquery对象）</font>
#### 查找节点
```
var $para=$("p"); //查找p元素节点
var p_txt=$para.attr("title"); //查找p元素节点的"title"属性
```
#### 创建节点
```
var $li=$("<li title="香蕉">苹果</li>"); //创建一个<li>元素，包含元素节点、文本节点和属性节点
//<li>元素节点,苹果文本节点，title="香蕉"属性节点
```
#### 插入节点
```
$(A).append(B) //将B追加到A的内部
$(A).appendTo(B) //将A追加到B的内部
$(A).prepend(B) //将B前置到A的内部
$(A).prependTo(B) //将A前置到B的内部

//下面四个方法可以移动元素
$(A).after(B) //将B元素插到A元素后面(不是内部)
$(A).insertAfter(B) //将A元素插到B元素后面，与$(A).before(B)不一样
$(A).before(B) //将B元素插入A的前面
$(A).insertBefore(B) //将A元素插到B元素前面，与$(A).after(B)不一样

//例子
var A ="<p>我想说</p>";
var B ="<b>你好</b>";
var C=$(A).append(B);//C="<p>我想说<b>你好</b></p>";
var D=$(A).prepend(B);//D="<p><b>你好</b>我想说</p>";

//对DOM元素进行移动:移动元素时首先从文档上删除此元素，然后将改元素插入得到文档中的指定节点
<ul>
<li>1</li>
<li>2</li>
<li>3</li>
</ul>

var a=$("ul >li:eq(1)");
var b=$("ul >li:eq(2)");
a.before(b);

//结果
<ul>
<li>1</li>
<li>3</li>
<li>2</li>
</ul>
```
#### 删除节点
```
var $self = $("ul >li:eq(1)").remove(); //删除包括自身及所有后代元素，并返回指向已被删除节点的引用；
$("ul >li:eq(1)").empty();  //删除所有子孙元素，不包括自身；
```
#### 复制节点
```
$("ul >li:eq(1)").clone(true).appendTo("ul");//将节点复制到另一个节点中（深拷贝）。如果需要将节点的事件也一起复制，则需要加上参数 true
```
#### 替换节点
```
$("<p>123</p>").replaceWidth("<p>456</p>");//将"<p>123</p>"替换成"<p>456</p>"；
$("<p>456</p>").replaceAll("<p>123</p>");//结果与上面相同；
```
#### 包裹节点
```
$("<p>123</p>").wrapInner("<b></b>");//将每一个匹配元素的子内容包裹，"<p><b>123</b></p>";
$("<p>123</p><p>456</p>").wrapInner("<div></div>");//整体包裹，"<div><p>123</p><p>456</p></div>";
$("<p>123</p><p>456</p>").wrapInner("<div></div>");//分个包裹，"<div><p>123</p></div><div><p>456</p></div>";
```
#### 属性操作
```
$("p").attr("title","123");//获取或设置属性；
$("p").removeAttr("title");//删除属性
```
#### 样式操作
```
var a="<p class='initClass'></p>";
$(a).attr("class","myClass");//获取或设置样式,"<p class='myClass'></p>"
$(a).addClass("myClass");//添加样式,"<p class='initClass myClass'></p>"
$(a).removeClass("myClass");//删除样式,"<p></p>"
$(a).removeClass();//删除全部样式,"<p></p>"
$(a).toggleClass("myClass");//切换样式,如果类名存在则删除它，如果不存在则添加他,"<p class='initClass'></p>"
$(a).hasClass("myClass");//判断是否含有该样式，返回false
```
#### 设置和获取HTML、文本和值
```
$("p").html()//类似innerHTML属性；
$("p").text()//类似innerText属性；
$("p").val()//类似value属性。如果元素为多选，则返回一个包含所有选择值的数组；
```
#### 遍历节点
```
<p>
	<ul>
		<li>1</li>
		<li>2</li>
		<li>3</li>
    </ul>
</p>
```

##### children()
```
$("p").children();//获取所有子元素集（不包括孙元素）集合
```
##### next()，nextAll()
```
$("p").next();//获取后面紧邻的同辈元素；
$("p").nextAll();//获取后面所有的同辈元素；
```
##### prev()，prevAll()
```
$("p").prev();//获取前面紧邻的同辈元素；
$("p").prevAll();//获取前面所有的同辈元素；
```
##### siblings()
```
$("p").siblings();//获取前后所有同辈元素；
```
##### closest()
```
$(document).click(function(e){
	$(e.target).closest('p').attr("title","456");//先检查当前元素是否匹配，不匹配的话再逐级网上匹配，直到找到匹配的元素
});
```
##### find()
```
$("p").find("span").css('color','red');//遍历后代（子加孙）元素
```
##### filter()
```
$("p").filter();//同辈遍历，相当于数组遍历
```
##### parent()，parents()
```
$("p").parent();//获取父级元素；
$("p").parents();//获取所有祖先元素，直到html，可以用选择器筛选；
```

### 事件
#### 加载事件
```
$(document).ready(function(){});//简写$(function(){}),DOM树加载完成后即可执行，可叠加；
window.onload=function(){};//所有元素（包括图片，样式等）全部加载完成后才可执行，唯一性；
```
#### 绑定事件
```
bind(type,function(){});//type：blur,focus,mousemove,mouseup等等
```
#### 合成事件
```
hover(enter,leave);//用于模拟光标悬停事件，当光标移动到元素上时，触发enter元素；当光标移出元素时，触发leave事件
toggle(fn1,fn2......fnN);//用于模拟鼠标连续单击事件，当鼠标第一次单击时，执行fn1，第二次单击执行fn2，直到最后一个函数。然后依次循环。（双击相当于单击了两次，分别执行两次函数）;还有一个作用是切换元素的隐藏和显示状态
```
#### 事件冒泡
```
e.stopPropagation();//阻止事件冒泡
e.preventDefault();//阻止事件默认行为（如<a>标签中的跳转行为）
//在事件处理函数中返回false，可同时阻止事件冒泡和事件默认行为
```
#### 事件对象event
```
event.target//获取携带相应行为的DOM元素。与在事件处理函数中的this对象一样;
event.type//事件类型，如mouseup，mousemove等;
event.which//鼠标左中右键
```
#### 移除事件
```
$("#btn").unbind("click",fn);//如果该事件绑定了多个函数，且指定了第二个参数，则只移除事件函数fn；
$("#btn").one('click',function(){});//当事件处理函数触发一次后，立即解除绑定并删除
```
#### 模拟操作
```
$("#btn").trigger("myClick");//触发绑定的myClick事件，并且执行默认操作（如果有）
$("#btn").triggerHandle("myClick");//只执行绑定的myClick事件
```

### 动画
#### show,hide,toggle
```
//同时修改多个样式属性，高度宽度和透明度
$('div').show(1000);//1000单位是毫秒
$(selector).toggle(speed,callback);//如果元素可见，则切换为隐藏，如果元素隐藏，则切换为可见
```
#### fadeIn,fadeOut,fadeTo,fadeToggle
```
//只改变透明度

//speed：可选，可以取以下值："slow"、"fast" 或毫秒;callback：可选，淡出完成后所执行的函数名称。
$(selector).fadeOut(speed,callback);//隐藏

/*和其他两个效果函数略有不同。它把图像淡化到一定的透明度。例如，可以让图像淡化到半透明。和其他效果不同，必须提供一个速度值。此外，还提供0～1之间的一个值来表示元素的透明度;
speed：必需的，规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒;
opacity：必需的，将淡入淡出效果设置为给定的不透明度（值介于 0 与 1 之间）;
callback：可选的，该函数完成后所执行的函数名称。
*/
$(selector).fadeTo(speed,opacity,callback);

$(selector).fadeToggle(speed,callback);
```
#### slideUp,slideDown,slideToggle
```
//同时修改多个样式属性，高度宽度和透明度
$('div').slideUp();//由下到上缩短隐藏
$(selector).slideToggle(speed,callback);
```
#### 自定义动画animate

 - 简单动画
```
/*
para:包含样式属性及值的映射；
speed:可选，播放速度；
callback:可选，动画完成后执行的函数；
*/
animate(para,speed,callback)
```
 - 累加累减动画
```
$("#panel").click(function(){
	   $(this).animate({left: "+=500px"},3000);
	}
```
 - 多重动画
```
//同时执行多个动画
$("#panel").click(function(){
	   $(this).animate({left: "500px",height:"500px"},3000);
	}
//顺序执行多个动画（动画队列）
$("#panel").click(function(){
	   $(this).animate({left: "500px"},3000)
		   .animate({height:"500px"},3000);
	}
```
 - 综合动画
```
//同时执行多个动画
$("#panel").click(function(){
	   $(this).animate({left: "500px",height:"500px"},3000);
	}
//顺序执行多个动画（动画队列）.css等非动画方法不适用于动画队列，它会一开始就执行
$("#panel").click(function(){
	   $(this).animate({left: "500px"},3000)
		   .animate({height:"500px"},3000)
		   .fadeOut(3000);
	}
```
 - 停止动画
```
/*clearQueue：Boolean值，表示是否清空剩余动画队列；
  gotoEnd：Boolean值，表示是否直接跳到动画末状态；*/
$(selector).stop([clearQueue],[gotoEnd]);

$(selector).is(":animated");//判断元素是否正处于动画状态
```
### 表单、表格
#### 文本框
- 获取以及失去焦点
```
$(':input').focus(function(){})
			.blur(function(){})
			.keyup(function(){});//键盘按钮弹起事件
```
- 高度变化
```
$("#id").height($("#id").height()+50);

//或者用动画效果
$("#id").animate({height:"+=50"},300);
```
- 滚动条高度变化
```
$("#id").scrollTop($("#id").scrollTop()+50);

//或者用动画效果
$("#id").animate({scrollTop:"+=50"},300);
```
#### 复选框
```
$("#checkAll").click(function(){
	$(this).attr('checked',true); //选中某个复选框
	$(this).attr('checked',this.checked);//原生JS语法
});
```
#### 下拉框
```
$('#selected1 option'); //获取全部选项
$('#selected1 option：selected'); //获取选中的选项
```
#### 表格筛选
```
$("table tbody tr").hide()					.filter(":contains(""+$(this).val())").show();
```
### 其他方法：
#### $.each  
```
//遍历对象和数组，将a中的每个属性遍历一遍
var a={"b":"bbb","c":"ccc"};
$.each(a,function(e){   //执行两次，e分别为"b"和"c"
    console.log(this);
});
```
#### $.extend()  
```
jQuery.extend(object);//扩展jQuery类本身,为类添加新的方法。 
jQuery.fn.extend(object);//给jQuery对象添加方法
```
1.对象深度拷贝
缺点：效率低
```
var a={name:"gx"};
var b=$.extend({},a);
b.name="xm";
alert(a.name);//gx
alert(b.name);//xm

var c=a;
c.name="gm";
alert(a.name);//gm
alert(c.name);//gm
```
2.合并多个对象
```
// 浅层复制（只复制顶层的非 object 元素）  
var newObject = jQuery.extend({}, oldObject);
// 深层复制（一层一层往下复制直到最底层）  
var newObject = jQuery.extend(true, {}, oldObject); 

/*当参数为ture时，即为深拷贝，当子项item1中的子项有与item中的子项相同属性的值不一样时，item1中子项的值会将item子项中的值给覆盖，当子项item1的属性跟item中的属性不同时，会与item进行合并;
当参数为false时，子项item1中的子项中与item中的子项属性相同时，item1中子项的属性值会将item中的值给完全覆盖
*/
var item={age:23,address:{provice:”河南”,city:”郑州”}};
var item1={sex:”girl”,address:{city:”北京”}};
var result=$.extend(true,item,item1);//{age:23,sex:”gril”,address:{provice:”河南”,city:”北京”}};
var result1=$.extend(false,item,item1);//{age:23,sex:”gril”,address:{ city:”北京”}};
```
3.给jQuery添加静态方法
```
$.extend({ 
       add:function(a,b){return a+b;} ,
       minus:function(a,b){return a-b;} 
}); 
//页面中调用：
var i = $.add(3,2);//5，调用对象为jquery类本身
var j = $.minus(3,2);//1

$.fn.extend({ 
       add:function(a,b){return a+b;} ,
       minus:function(a,b){return a-b;} 
});
var m=$("div").add(3,2); //调用对象为jquery实例对象
var n=$("div").minus(3,2);
```