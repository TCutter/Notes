<!-- TOC -->

- [Vue入门知识整理](#vue入门知识整理)
    - [利用 vue-cli 新建工程](#利用-vue-cli-新建工程)
    - [基本指令](#基本指令)
        - [插值表达式 {{}}](#插值表达式-)
        - [v-cloak](#v-cloak)
        - [v-text](#v-text)
        - [v-html](#v-html)
        - [v-bind 属性绑定](#v-bind-属性绑定)
        - [v-on: 事件绑定](#v-on-事件绑定)
        - [v-model：数据双向绑定](#v-model数据双向绑定)
        - [利用 v-bind 绑定 class](#利用-v-bind-绑定-class)
        - [利用 v-bind 绑定 style](#利用-v-bind-绑定-style)
        - [v-for：模板遍历](#v-for模板遍历)
        - [v-if \ v-show: 元素的隐藏和显示（删除添加/设置 display 属性）](#v-if-\-v-show-元素的隐藏和显示删除添加设置-display-属性)
        - [v-on 的按键修饰符及自定义指令](#v-on-的按键修饰符及自定义指令)
    - [动画](#动画)
        - [过渡类名](#过渡类名)
        - [调用第三方动画库](#调用第三方动画库)
        - [使用 transition-group 实现列表动画](#使用-transition-group-实现列表动画)

<!-- /TOC -->

## Vue入门知识整理

[原文](https://github.com/smyhvae/Web/tree/master/21-Vue%E5%9F%BA%E7%A1%80)

### 利用 vue-cli 新建工程

安装 vue-cli
```
$ npm  install -g vue-cli
```

新建工程
```
$ vue init webpack demo01
```

在命令窗口填写配置信息，填写完成后生成项目文件

![项目结构](/Style/images/vue/01.png)

- bulid : 打包配置的文件夹
- config : webpack 配置
- src : 开发项目的源码
    - App.vue ： 入口文件
    - main.js : 项目入口文件
- static : 静态资源
- .babelrc : babel 配置
- .editorconfig : 编辑器配置
- .postcssrc.js : html 添加前缀的配置
- index.html : 单页面入口。通过 webpack 打包后，会把 src 源码进行编译，插入到这个 html 里面来
- package.json : 项目的基础配置，包含版本号、脚本命令、项目依赖库、开发依赖库、引擎等


项目文件生成完成之后跟着命令栏中产生的提示信息操作，如

```bash
cd demo01
npm install (or if using yarn: yarn)
npm run lint -- --fix (or for yarn: yarn run lint --fix)
npm run dev
```

此时服务器开启，可以在浏览器上访问，默认端口 8080

### 基本指令

#### 插值表达式 {{}}

```html
<!-- html-->
<div id="app">
    {{message}}
</div>

<!-- script-->
<script>
    var app = new Vue({
        el:"#app",
        data:{
            message:"It's my first vue demo!"
        }
    });
</script>
```

#### v-cloak

v-cloak 指令和 CSS 规则一起使用

在网速很慢的时候，上面的代码开始会显示  {{message}}，等网络加载完成才会显示 "It's my first vue demo!"。**闪烁问题**

```html
<!-- css-->
<style>
        [v-cloak]{
            display: none;
        }
</style>

<!-- html-->
<div id="app" v-cloak>
        cotent:{{message}}
</div>

<!-- script-->
<script>    
setTimeout(function(){
    var app = new Vue({
        el:"#app",
        data:{
            message:"123"
        }
    })
},2000)

/*
开始不会显示，指导 Vue 实例加载完成后才会显示 cotent:123 
*/
</script>
```

#### v-text

```html
<!-- v-text ： 会直接替换 div 中的内容 -->
<div id="app" v-text="message"></div>

<!-- 插值表达式-->
<div id="app">{{message}}</div>
```

#### v-html

可能会造成 XSS（跨站脚本） 攻击，不建议使用

```html
<!-- html -->
 <div id="app">
    <p>{{msg}}</p>
    <p v-text="msg"></p>
    <p v-html="msg"></p>
</div>

<!-- script -->
<script>    
 new Vue({
        el: '#app',
        data: {
            msg: '<h1>我是一个大大的h1标题</h1>'
        }
    })    
</script>
```

#### v-bind 属性绑定

```html
<!-- html -->
 <div id="div1">
            <input type="text" :value="name">
            <a v-bind="{href:'http://www.baidu.com/'+path,target:targetType}">超链接</a>       <!--批量绑定-->
</div>

<!-- script -->
<script>    
 new Vue({
    el: '#div1',
    data: {
      name: 't_cutter',
      path: '2.html',
      targetType:'_self'
    }
  });    
</script>
```

#### v-on: 事件绑定

1. 
```html
<!-- html -->
 <div id="div1">
    <div>{{name}}</div>
    <br />
    <button v-on:click = 'reversename'>Reverse Name</button>
</div>

<!-- script -->
<script>    
new Vue({
    el: '#div1',
    data: {
        name: 't_cutter',
    },
    methods:{
        reversename:function(){
              this.name = this.name.split("").reverse().join("");
          }
    }
}); 
</script>
```

2. 事件修饰符

- **.stop** : 阻止冒泡，即 event.stopPropagation()
- **.prevent** : 阻止默认行为，即 event.preventDefault()
- **.capture** : 使用 事件捕获（而不是事件冒泡） 的方法监听事件
- **.self** : 只有当事件在该元素本身（不是子元素）触发时，才触发回调
- **.once** ： 事件只触发一次
- **.passive** ： 立即触发事件的默认行为，与 **.prevent** 一起使用时 **.prevent**  会被覆盖


#### v-model：数据双向绑定

> v-model只能用于表单元素。如 input、select、checkbox、textarea

```html
<!-- html -->
<div id="app">
    <form action="#">
        <input type="text" id="username" v-model="myAccount.username">
        <input type="password" id="pwd" v-model="myAccount.userpwd">
        <input type="submit" v-on:click="submit1" value="注册">
    </form>
</div>

<!-- script -->
<script>    
new Vue({
        el: '#app',
        //上面的标签中采用v-model进行双向数据绑定，数据会自动更新到data里面来
        data: {
            name: 'smyhvae',
            myAccount: {username: '', userpwd: ''}
        },
        //在methods里绑定各种方法，根据业务需要进行操作
        methods: {
            submit1: function () {
                alert(this.myAccount.username + "  pwd=" + this.myAccount.userpwd);
            }
        }
    });
</script>
```

#### 利用 v-bind 绑定 class

1. 在数组中使用 对象

```html
<!-- html -->
<h1 :class="[ {'my-active':flag} ]">我是cutter，生命壹号</h1>

<!-- script -->
<script>  
new Vue({
            el: '#app',
            data: {
                flag: true
            }
        });
</script>
```

2. 直接使用对象

```html
<!-- html -->
<h1 :class="classObj">我是cutter，生命壹号</h1>

<!-- script -->
<script>  
new Vue({
            el: '#app',
            data: {
                classObj:{
                    active:true,
                    not-active:false
                }
            }
        });
</script>
```

#### 利用 v-bind 绑定 style

1. 直接使用对象

```html
<!-- html -->
<div id="app">
    <h1 :style="styleObj">我是cutter，生命壹号</h1>
</div>

<!-- script -->
<script>  
new Vue({
                el: '#app',
                data: {
                    styleObj: { 
                        color: 'red',
                         'font-size': '20px',
                         'text-align': 'center'
                        }
                }
            });
</script>
```

2. 样式数组

```html
<!-- html -->
<div id="app">
    <h1 :style="[ styleObj1, styleObj2 ]">我是cutter，生命壹号</h1>
</div>

<!-- script -->
<script>  
new Vue({
    el: '#app',
    data: {
        styleObj1: { color: 'red', 'font-size': '20px' },
        styleObj2: { 'font-style': 'italic' }
    }
});
</script>
```

#### v-for：模板遍历

1. 数组遍历

```html
<!-- html -->
<div id="app">
    <ul>
        <li v-for="(item,index) in arr1">值：{{item}} --- 索引：{{index}}</li>
    </ul>
</div>

<!-- script -->
<script>  
new Vue({
    el: '#app',
    data: {
        list: [1, 2, 3]
    }
});
</script>
```

2. 对象遍历

```html
<!-- html -->
<div id="app">
    <ul>
        <!-- 括号里如果写两个参数：则第一个参数代表value，第二个参数代表key -->
        <li v-for="(value,key) in obj1">值：{{value}} --- 键：{{key}} </li>

        <!-- 括号里如果写三个参数：则第一个参数代表value，第二个参数代表key，第三个参数代表index -->
        <li v-for="(value,key,index) in obj1">值：{{value}} --- 键：{{key}} --- index：{{index}} </li>
    </ul>
</div>

<!-- script -->
<script>  
new Vue({
    el: '#app',
    data: {
        obj1: {
            name: 'smyhvae',
            age: '26',
            gender: '男'
        }
    }
});
</script>
```

3. 数字遍历

```html
<!-- 注意：如果使用 v-for 遍历数字的话，前面的 myCount 值从 1 开始算起 -->
<li v-for="myCount in 10">这是第 {{myCount}}次循环</li>
```

4. key 

> 在 Vue 2.2.0+ 版本里，当在组件中使用 v-for 时，key 属性是必须要加上的。

```html
<!-- html -->
<div id="app">
    <ul>
        <li v-for="item in list" :key="item.id">值：{{value}} --- 键：{{key}} </li>
    </ul>
</div>

<!-- script -->
<script>  
new Vue({
    el: '#app',
    data: {
        list: [
                { id: 1, name: 'smyh' },
                { id: 2, name: 'vae' },
                { id: 3, name: 'smyhvae' },
                { id: 4, name: 'xiaoming' },
                { id: 5, name: 'xiaohong' }
        ]
    }
});
</script>
```

#### v-if \ v-show: 元素的隐藏和显示（删除添加/设置 display 属性）

> v-if：删除/添加
> 
> v-show：设置 display 属性

```html
<!-- html -->
<div id="app">
    <div v-if="isShow">我是盒子</div>
</div>

<!-- script -->
<script>  
new Vue({
    el: '#app',
    data: {
        isShow: true
    }
});
</script>
```

#### v-on 的按键修饰符及自定义指令

1. 内置按键修饰符

 .enter、.tab、.delete、.esc、.space、up、down、left、right

 比如：
 -  @keyup.enter = 'addData' : 按下enter 键后 执行 addData() 方法
 -  @keyup.113 = 'addData' : 按下 F2 键（113）后 执行 addData() 方法

 2. 自定义全局按键修饰符

 ```js
 Vue.config.keyCodes.f2 = 113;
 @keyup.f2 = 'addData'; // 如果没有上一行代码，则此行代码无效
 ```

 3. 自定义全局指令 Vue.directive()

 ```html
 <!-- html -->
 <input type="text" id="search" v-model="name" v-color="'green'"> 
 <!--green 如果去掉单引号，就成了变量-->

 <!-- script -->
 <script>
 /*
    自定义 v-color 指令，让文本获取焦点
    第一个参数，自动以指令的名称，
    第二个参数，为一个包含指令相关函数的对象
 */
 Vue.directive('color',{
     // 每个函数的第一个参数为 el，表示被绑定了指令的 JS 对象（DOM对象）
     bind:function(el,binding){ 
         /* 每当指令绑定到元素上的时候，会立即执行这个 bind 函数,此时元素还未插入到DOM中的时候，【只执行一次】*/  
         // 第二个参数用来拿到传递的参数

        console.log(binding.name); //打印结果：color
        console.log(binding.value); //打印结果：green
        console.log(binding.expression);  //'green'

        el.style.color = binding.value
     },
     inserted:function(el){   
         /*元素插入到DOM中的时候，会执行 inserted 函数【触发1次】*/
         el.focus();
         // 和JS行为有关的操作，最好在 inserted 中去执行，放置 JS行为不生效
     },
    updated: function (el) {  
        /* 当VNode更新的时候，会执行 updated， 【可能会触发多次】*/
    }
 })
 </script>
 ```

 简写 ：
 
 ```js
 // 相当于 bind 和 updated 公用同一个函数
 Vue.directive('color', function (el, binding) {
            el.style.color = binding.value
})
 ```

 4. 自定义私有指令
 
 在某一个 vue 对象内部自定义的指令称之为私有指令。这种指令只有在当前vue对象的el指定的监管区域有用。

  ```html
 <!-- html -->
 <input type="text" id="search" v-model="name" v-fontsize="'15px'"> 
 
 <!-- script -->
 <script>
new Vue({
    el:"#app",
    data:{
        name:"t_cutter"
    },
    directives:{
        'fontsize':{
            bind:function(el,binding){
                el.style.fontSize = binding.value;
            }
        }
    }
});
 </script>
 ```

 ### 生命周期

 生命周期函数可以分为3类

 #### 创建期间的生命周期函数

 1. beforeCreate : 实例刚在内存中创建，还未初始化 data 和 methods;
 2. created：data 和 methods 已初始化,还没有开始编译模板，可以在此处发送 ajax 请求；
 3. beforeMount：模板已编译完成，还未加载到界面中；
 4. mounted：模板已加载到界面中（mounted之后，表示 **真实DOM渲染完了，可以操作DOM了**）

 ```js
 <script>
    new Vue({
        el: '#app',
        data: {
            msg: 'hello vuejs'
        },
        // 这是第1个生命周期函数，表示实例完全被创建出来之前，会执行它
        beforeCreate: function () {
            console.log('01 beforeCreate', this.msg);
            //注意：在 beforeCreate 生命周期函数执行的时候，data 和 methods 中的 数据都还没有没初始化
        },

        // 这是第2个生命周期函数
        created: function () {
            console.log('02 created', this.msg);
            //注意：如果要调用 methods 中的方法，或者操作 data 中的数据，最早，只能在 created 中操作
        },

        // 这是第3个生命周期函数，表示 模板已经在内存中编辑完成了，但是尚未把模板渲染到页面中
        beforeMount: function () {
            console.log('03 beforeMount', this.msg);
            // 在 beforeMount 执行的时候，页面中的元素，还没有被真正替换过来，只是之前写的一些模板字符串
        },

        // 这是第4个生命周期函数，表示，内存中的模板，已经真实的挂载到了页面中，用户已经可以看到渲染好的页面了
        mounted: function () {
            console.log('04 mounted', this.msg);
            // 注意： mounted 是 实例创建期间的最后一个生命周期函数，当执行完 mounted 就表示，实例已经被完全创建好了
            // 此时，如果没有其它操作的话，这个实例，就静静的 躺在我们的内存中，一动不动
        }
    });

</script>
 ```

 #### 运行期间的生命周期函数

 1. beforeUpdate：状态更新之前执行此函数， 此时 data 中的状态值是最新的，但是界面上显示的 数据还是旧的，因为此时还没有开始重新渲染DOM节点
 2. 实例更新完毕之后调用此函数，此时 data 中的状态值 和 界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了。

 #### 销毁期间的生命周期函数
 1. beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。（可以在beforeDestory里清除定时器、或清除事件绑定）

2. destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。


![生命周期示意图](/Style/images/vue/02.png)

### 动画

#### 过渡类名

与 transition 标签结合使用

- enter
    - v-enter : 动画进入之前的初始状态；
    - v-enter-to : 动画进入之后的结束状态；
    - v-enter-active : 动画进入的时间段

- leave
    - v-leave : 动画离开之前的初始状态；
    - v-leave-to : 动画离开之后的结束状态；
    - v-leave-active : 动画离开的时间段


```html
<!-- html -->
<div id="app">
    <input type="button" value="toggle" @click="flag=!flag">
    <transition>
        <h3 v-show="flag">Guess What</h3>
    </transition>
</div>

<!-- css -->
.v-enter,
.v-leave-to {
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: all 1s ease;

}

<!-- js -->
new Vue({
        el: "#app",
        data: {
            flag: false
        }
    });
```

![过渡示意图](/Style/images/vue/03.png)

[自定义过渡类名](Demo/05.html)

#### 调用第三方动画库

css类库 [animate.css](https://daneden.github.io/animate.css/)

```html
<link rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
<div id = "app">
    <input type="button" value="Toggle" @click = "flag=!flag">
    <transition enter-active-class="animated fadeOut" leave-active-class="animated fadeIn" :duration = "{enter:1000,leave:500}">    <!-- duration设置动画持续时间 -->
        <h1 v-if="flag">这是一个H1标签</h1>
    </transition>
</div>
```

- 动画的钩子函数(生命周期)

```html
<!-- 包括4个入场事件和4个离场事件 -->
    <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled"

        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
        v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled"
    ></transition>

<!-- 如果 transition 中定义了某个事件 （如 enter），那么相应的CSS中定义的样式就不会生效（如 .v-enter） -->
```

[钩子函数实例](Demo/06.html)

#### 使用 transition-group 实现列表动画

[列表动画](Demo/07.html)
