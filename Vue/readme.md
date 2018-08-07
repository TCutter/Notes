## Vue入门知识整理

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

#### v-if \ v-show: 元素的隐藏和显示（删除/添加）

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