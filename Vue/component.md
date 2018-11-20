<!-- TOC -->

- [Vue 组件](#vue-组件)
  - [组件注册](#组件注册)
    - [全局注册](#全局注册)
    - [局部注册](#局部注册)
    - [基础组件的自动化全局注册](#基础组件的自动化全局注册)
  - [组件特性](#组件特性)
    - [为组件添加数据](#为组件添加数据)
    - [组件切换](#组件切换)
    - [异步组件](#异步组件)
    - [插槽](#插槽)
    - [访问元素 & 组件](#访问元素--组件)
    - [程序化的事件侦听器](#程序化的事件侦听器)
    - [组件之间循环引用](#组件之间循环引用)
    - [控制更新](#控制更新)
  - [组件之间的传值](#组件之间的传值)
    - [props](#props)
    - [自定义事件](#自定义事件)
    - [子组件使用父组件的属性](#子组件使用父组件的属性)
    - [子组件调用父组件的方法](#子组件调用父组件的方法)
    - [父组件使用子组件的属性](#父组件使用子组件的属性)
  - [通过 ref 属性获取DOM元素](#通过-ref-属性获取dom元素)
    - [通过 ref 属性获取DOM元素的步骤](#通过-ref-属性获取dom元素的步骤)
    - [通过 ref 属性获取整个子组件](#通过-ref-属性获取整个子组件)

<!-- /TOC -->

## Vue 组件

1. 模块化和组件化
- 模块化：从代码逻辑进行划分，保证每个模块的功能单一；
- 组件化：从UI角度进行划分，以便UI组件重用。

2. 字符串模板和非字符串模板
- 字符串模板 :模板写在 JS 中;
- 非字符串模板 :模板写在 HTML 中，用 template 标签包含;

### 组件注册

组件命名：短横线分隔命名

#### 全局注册

使用 Vue.component 定义和注册组件

```js
Vue.component('my-template', {
    template: "#myAccount"
});
```

[将组件内容定义到template标签中去](Demo/08.html)

#### 局部注册

```html
<div id="app">
    <!-- 调用Vue实例内部的私有组件 -->
    <my-login></my-login>
</div>
<template id="login">
    <!-- 此时好 h2 标签会作为根元素，因此不会报错-->
    <h2>这是一个私有组件</h2> 
</template>
```

```js
new Vue({
    el: "#app",
    data: {},
    components: {
        'my-login': {
            template: '#login' //注意 myLogin 的名称（驼峰命名），对应的组件名称为 my-login，也可以使用 "my-login"(推荐)
        }
    }
});
```

#### 基础组件的自动化全局注册
[自动化全局注册](https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9C%A8%E6%A8%A1%E5%9D%97%E7%B3%BB%E7%BB%9F%E4%B8%AD%E5%B1%80%E9%83%A8%E6%B3%A8%E5%86%8C)

### 组件特性

#### 为组件添加数据

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

2. [使用 **component** 标签 和 **is** 属性进行切换](Demo/10.html)

3. 使用 keep-alive 标签可以使组件切换时保持切换前的状态

```html
<keep-alive>
    <component :is="compName">
    </component>
</keep-alive>
```

> keep-alive 要求被切换到的组件都有自己的名字

#### 异步组件
在大型应用中会将应用分成许多小的模块，并且只有在使用的时候才会从服务器加载这些模块。
Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染

处理加载状态

```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

#### 插槽

1. 定义
通过 slot 标签分发组件内容

```html
<navigation>
    <span>这是测试1 </span>
    这是测试2
</navigation>
```

navigation 组件的内容为
```html
<div class="head">
    <slot></slot>
</div>
```

当组件被渲染时，slot 会被渲染为 
```html
<span>这是测试1 </span>
这是测试2
```
> 如果 navigation 组件中没有包含 slot 元素 ,那么任何传入 navigation 的内容都会被丢弃

2. 具名插槽和默认插槽

有些时候我们需要多个插槽

```html
<!-- <base-layout> 组件 -->
<template>
<div>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
</template>
```

使用模板

```html
<base-layout>
  <h1 slot="header">Here might be a page title</h1>

  <p>A paragraph for the main content.</p>  <!-- 默认插槽 -->
  <p>And another one.</p>

  <p slot="footer">Here's some contact info</p>
</base-layout>
```

结果

```html
<div>
  <header>
     <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

#### 访问元素 & 组件

本小结的所有方法都不是响应式的，而且推荐使用 [**Vuex**](https://vuex.vuejs.org/zh/) 代替

1. 访问根实例
在每个 new Vue 实例的子组件中，其根实例可以通过 $root 属性进行访问

```js
// Vue 根实例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  }
})


// 获取根组件的数据
this.$root.foo

// 写入根组件的数据
this.$root.foo = 2

// 访问根组件的计算属性
this.$root.bar

// 调用根组件的方法
this.$root.baz()
```

2. 访问父级组件实例

通过 **$parent** 特性替代 prop 传值的方式

3. 访问子组件实例或子元素

首先通过 **ref** 特性为子组件赋予一个 ID 引用

```html
<base-input ref="usernameInput"></base-input>
```

在父组件使用子组件实例

```js
this.$ref.usernameInput
```

然后父组件通过 **$refs** 属性访问这个 **base-input** 实例

```js
this.$refs.usernameInput 
```

4. 依赖注入
可以看作为一部分“大范围有效的 prop”

是为了解决访问父辈组建数据时，容易造成混乱的问题

首先在父组件中注册

```js
provide: function () {
  return {
    getMap: this.getMap
  }
}
```

然后在子组件中添加该属性
```js
inject: ['getMap']
```

#### 程序化的事件侦听器

#### 组件之间循环引用

#### 控制更新
1. 使用 **$forceUpdate** 强制更新
2. 使用 **v-once** 只计算一次组件内容


### 组件之间的传值

Vue实例就是一个父组件，而我们自定义的组件（包括全局组件、私有组件）就是子组件。

#### props 
1. 大小写
HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符

```js
Vue.component('blog-post', {
    // 在 JavaScript 中是 camelCase 的.也可以直接写成 post-title
    props: ['postTitle'],
    template: '<h3>{{ postTitle }}</h3>'
})
```

```html
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```

2. props类型：数组或者对象

```js
// 数组
Vue.component('blog-post', {
    // 在 JavaScript 中是 camelCase 的.也可以直接写成 post-title
    props: ['title', 'likes', 'isPublished', 'commentIds', 'author'],
    template: '<h3>{{ postTitle }}</h3>'
});

// 对象：写成对象还可以自动实现基础的类型检查。验证失败时,控制台会弹出警告
Vue.component('blog-post', {
    // 在 JavaScript 中是 camelCase 的.也可以直接写成 post-title
    props: {
        title: String,
        likes: Number,
        isPublished: Boolean,
        commentIds: Array,
        author: Object
    },
    template: '<h3>{{ postTitle }}</h3>'
});
```

3. 单向数据流
所有的 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来不应该在子组件内部修改 prop

- prop 用来传递一个初始值；子组件希望将其作为一个本地的 prop 数据来使用

```js
// 定义一个本地的 data 属性并将这个 prop 用作其初始值
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

- prop 以一种原始的值传入且需要进行转换

```js
// 使用这个 prop 的值来定义一个计算属性
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

> 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态。

4. props 验证

prop 会在一个组件实例创建之前进行验证

```js
// 验证失败时，控制台会弹出一个警告
Vue.component('my-component', {
    props: {
        // 基础的类型检查 (`null` 匹配任何类型)
        propA: Number,
        // 多个可能的类型
        propB: [String, Number],
        // 必填的字符串
        propC: {
            type: String,
            required: true
        },
        // 带有默认值的数字
        propD: {
            type: Number,
            default: 100
        },
        // 带有默认值的对象
        propE: {
            type: Object,
            // 对象或数组默认值必须从一个工厂函数获取
            default: function () {
                return {
                    message: 'hello'
                }
            }
        },
        // 自定义验证函数
        propF: {
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['success', 'warning', 'danger'].indexOf(value) !== -1
            }
        }
    }
})
```

prop可能的类型
- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol
- 自定义构造函数：通过 instanceof 属性验证

5. 就算模板的根元素没有定义 props 特性，子组件仍然会添加 props 特性

禁用特性继承：在组件的选项中设置 inheritAttrs: false

```js
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})
```

[inheritAttrs 与 $attrs 组合使用](https://www.jianshu.com/p/ce8ca875c337)

#### 自定义事件

大小写：始终使用 **kebab-case** 格式的事件名。

1. vue 自定义组件使用v-model
- v-model 语法糖

```html
<div>
    <input v-model="price" />
</div>

<!-- v-model 双向绑定的真正实现:
1. 将输入框的值绑定到 price 变量上，单向绑定；
2. 监听 input 事件，实现双向绑定
 -->
<div>
    <input 
    v-bind:value="price" @input="price=$event.target.value"/>
</div>
```

- 组件中的 v-model
```js
Vue.component('my-component', {
    template: `<div>
  <input type="text" :value="currentValue" @input="handleInput"/>
  </div>`,
    computed: {
        currentValue: function () {
            return this.value
        }
    },
    props: ['value'], //接收一个 value prop
    methods: {
        handleInput(event) {
            var value = event.target.value;
            this.$emit('input', value); //触发 input 事件，并传入新值
        }
    }
});
```

2. 将原生事件绑定到组件

```html
<base-input @focus.native="onFocus"></base-input>
```

```html
<!-- base-input 组件 -->
<template>
    <label>
        {{label}}
        <input v-bind="$attrs" v-bind:value="value" @input="$emit('input', $event.target.value)" />
    </label>
</template>
```

**focus** 事件被绑定到 *label* 标签上

 Vue 提供了一个 ***$listeners*** 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器:
 ```js
 {
  focus: function (event) { /* ... */ }
  input: function (value) { /* ... */ },
}
 ```

[Vue v2.4中新增的$attrs及$listeners属性使用教程](https://www.jb51.net/article/132371.htm)
```js
Vue.component('base-input', {
    inheritAttrs: false,
    props: ['label', 'value'],
    computed: {
        inputListeners: function () {
            var vm = this
            // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
                // 我们从父级添加所有的监听器
                this.$listeners,
                // 然后我们添加自定义监听器，
                // 或覆写一些监听器的行为
                {
                    // 这里确保组件配合 `v-model` 的工作
                    input: function (event) {
                        vm.$emit('input', event.target.value)
                    }
                }
            )
        }
    },
    template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```


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
