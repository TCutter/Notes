<!-- TOC -->

- [Vue 组件](#vue-组件)
    - [全局组件](#全局组件)
    - [使用 components 定义私有组件](#使用-components-定义私有组件)
    - [为组件添加数据](#为组件添加数据)
        - [组件切换](#组件切换)
    - [组件之间的传值](#组件之间的传值)
        - [子组件使用父组件的属性](#子组件使用父组件的属性)
        - [子组件调用父组件的方法](#子组件调用父组件的方法)
        - [父组件使用子组件的属性](#父组件使用子组件的属性)
    - [通过 ref 属性获取DOM元素](#通过-ref-属性获取dom元素)
        - [通过 ref 属性获取DOM元素的步骤](#通过-ref-属性获取dom元素的步骤)
        - [通过 ref 属性获取整个子组件](#通过-ref-属性获取整个子组件)

<!-- /TOC -->

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

2. [使用 *component* 标签进行切换](Demo/10.html)


### 组件之间的传值

Vue实例就是一个父组件，而我们自定义的组件（包括全局组件、私有组件）就是子组件。

#### 子组件使用父组件的属性

父组件可以通过 *props* 属性向子组件传值。

[实例 11](Demo/11.html)

传值步骤：
1. 在子组件的 props 属性中声明父组件传递的数据；
2. 定义子组件的模板时，使用 props 中的属性；
3. 父组件在引用子组件时，进行属性绑定

data 与 props 中数据的区别
1. 子组件中的 data 数据，并不是通过 父组件传递过来的，而是子组件自身私有的；props 中的数据，都是通过 父组件 传递给子组件的。
2. data中的数据是可读可写的；props中的属性只是可读的，重新赋值会报错

#### 子组件调用父组件的方法
父组件通过事件绑定机制，将父组件的方法传递给子组件

[实例 11](Demo/11.html)


#### 父组件使用子组件的属性

```html
<!-- html -->
 <div id="app">
        <component1 @parent-show='show'></component1>
    </div>

    <!-- 定义子组件的模板 -->
    <template id="myTemplate">
        <h2 @click="childClick">我是子组件，点击调用父组件的方法</h2>
    </template>

<!-- script -->
    <script>
        var vm = new Vue({
            el: '#app',
            data: { //父组件的data
            },
            methods: { // 定义父组件的方法
                show: function (arg1, arg2) { //【第二步】父组件里放两个参数，这个两个参数就代表着子组件中的`child 123`、`child 789`
                    console.log('父组件提供的方法');
                    console.log('打印子组件传递过来的参数。参数一：' + arg1 + '，参数二：'+ arg2);
                }
            },
            components: {
                component1: { 
                    template: '#myTemplate',
                    data() { // 子组件的data
                        return {
                            // content: '子组件私有的数据 content'
                        }
                    },
                    props: [''],
                    directives: {},
                    filters: {},
                    components: {},
                    methods: {
                        childClick() {
                            // 子组件如果要给父组件传递参数，在触发 emit 的时候，通过参数的形式带出去就可以了
                            // 【第一步】在子组件里，我们带两个参数出去，传给父组件
                            this.$emit('parent-show', 'child 123', 'child 789');
                        }
                    }
                }
            }
        });
    </script>
```

[DEMO-发表评论功能](Demo/12.html)

### 通过 ref 属性获取DOM元素

#### 通过 ref 属性获取DOM元素的步骤

1. 在标签中添加 ref 属性
    ```html
    <h2 ref="myTitle">Friyday</h2>
    ```
2. 通过 this.$refs.xxx 获取 DOM 元素 
    ```js
    console.log(this.$refs.myTitle.innerText)
    ```

#### 通过 ref 属性获取整个子组件

```html
<div id="app">
        <input type="button" value="点击按钮" @click="getElement">
        <login-component ref="loginTemplate"></login-component>
    </div>

   <script>

        // 创建 Vue 实例，得到 ViewModel
        var vm = new Vue({
            el: '#app',
            data: {},
            methods: {
                getElement() {

                    //在父组件中，通过ref获取整个子组件，进而获取子组件的data
                    console.log(this.$refs.loginTemplate.myData)

                    //在父组件中，通过ref获取整个子组件，进而获取子组件的method
                    this.$refs.loginTemplate.showMethod()
                }
            },
            components: {
                'login-component': {
                    template: '<h1>登录组件</h1>',
                    data() {
                        return {
                            myData: '子组件的data'
                        }
                    },
                    methods: {
                        showMethod() {
                            console.log('调用子组件的method')
                        }
                    }
                }
            }
        });
    </script>  
```
