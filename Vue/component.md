## Vue 组件

模块化和组件化
- 模块化：从代码逻辑进行划分，保证每个模块的功能单一；
- 组件化：从UI角度进行划分，以便UI组件重用。

### 全局组件

使用 Vue.component 定义和注册组件

[将组件内容定义到template标签中去](Demo/08.html)

### 使用 components 定义私有组件

```html
<!-- html -->
<div id="app">
        <!-- 调用Vue实例内部的私有组件 -->
        <my-login></my-login>
    </div>
     <template id="login">
        <h2>这是一个私有组件</h2>
    </template>

<!-- script -->
    <script>
        new Vue({
            el:"#app",
            data:{},
            components:{
                myLogin:{
                    template:'#login' //注意 myLogin 的名称（驼峰命名），对应的组件名称为 my-login，也可以使用 "my-login"(推荐)
                }   
            }
        });
    </script>

```

### 为组件添加数据

```html
<!-- html -->
<div id="app">
        <my-component></my-component>
        <my-component></my-component>
    </div>
    
    <template id="addCount">
        <div>   <!-- 必须添加 div -->
            <input type="button" value="Add" @click="addCount">
            <h2>{{count}}</h2>
        </div>    
    </template>

<!-- script -->
    <script>
        Vue.component('my-component',{
            template:"#addCount",
            data:function(){
                return {count:0};
            },
            methods:{
                addCount:function(){
                    this.count++;
                }
            }
        });

        new Vue({
            el:"#app"
        })
    </script>
```

- 在 *my-component* 组件中定义的 data 和 methods 只能用在 *my-component* 组件中
- *data* 必须以 function 的形式定义，而且需要通过 *return* 的形式返回结果。目的是为了使每个组件中的 count 数据相互独立。换言之，通过函数返回对象的目的，是为了让每个组件都有自己独立的数据存储，而不应该共享一套数据。

#### 组件切换

1. [使用v-if和v-else结合进行切换](Demo/09.html)

2. [使用 <component> 标签进行切换](Demo/10.html)


### 组件之间的传值

Vue实例就是一个父组件，而我们自定义的组件（包括全局组件、私有组件）就是子组件。

#### 父组件向子组件传值
