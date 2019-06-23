<!-- TOC -->

- [Vue 相关](#vue-相关)
  - [MVVM 设计模式](#mvvm-设计模式)
  - [Vue 生命周期](#vue-生命周期)
  - [Vue的双向数据绑定原理](#vue的双向数据绑定原理)
  - [Proxy 相比于 defineProperty 的优势](#proxy-相比于-defineproperty-的优势)
  - [vue-router 有哪几种导航守卫](#vue-router-有哪几种导航守卫)
    - [全局导航守卫](#全局导航守卫)
    - [路由独享守卫](#路由独享守卫)
    - [组件内守卫](#组件内守卫)
- [其他](#其他)
  - [SSR（服务端渲染）](#ssr服务端渲染)
    - [优点](#优点)
    - [缺点](#缺点)

<!-- /TOC -->
## Vue 相关

### MVVM 设计模式
- `MVC`: `Modle-View-Controller`,用户操作View去改变Controller，Controller改变Model, Model再直接根据业务代码显示在View上
- `MVVM`: `Modle-View-ViewModel`,利用双向绑定技术，使得 Model 变化时，ViewModel 会自动更新，而 ViewModel 变化时，View 也会自动变化。`MVVM` 模式简化了界面与业务的依赖，解决了数据频繁更新

### Vue 生命周期
1. `beforeCreate`: 创建前，数据还未初始化，`data、computed` 等对象都不能使用
2. `created`: 创建后，数据已经可以使用，`el` 还未初始化，还没有开始编译模板，一般在这里发送 ajax 请求
3. `beforeMount`: 载入前，模板已编译完成，但是还没有挂载到页面上
4. `mounted`: 载入后，模板已挂载到页面上，`DOM` 已渲染完，此时可以操作 `DOM`
5. `beforeUpdate`: 更新前， 在数据更新之前调用，此时 data 中的状态值是最新的，但是界面上显示的数据还是旧的，因为此时还没有开始重新渲染DOM节点
6. `updated`: 更新后，组件DOM已经更新
7. `beforeDestroy`: 销毁前，实例销毁之前调用。在这一步，实例仍然完全可用。（可以在这里清除定时器、或清除事件绑定。 **触发方法 `vm.$destroy()`**
8. `destroyed`: 销毁后，所有的事件监听器被移除、所有的子实例被销毁 
9. `activated`: keep-alive 组件激活时调用。
10. `deactivated`: keep-alive 组件停用时调用。

### Vue的双向数据绑定原理
采用数据劫持结合发布-订阅者模式的方法，通过 `Object.defineProperty()` 来劫持各个属性的 `setter`,`getter`, 在数据变动时发布消息给订阅者，触发相应的监听回调。

重点
1. 实现一个数据监听器 `Observer`, 能够对数据对象的所有属性进行监听，如有变动通知订阅者
2. 实现一个指令解析器 `Compile`，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数，添加监听数据的订阅者
3. 实现一个 `Watcher`，作为连接 `Observer` 和 `Compile` 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数

### Proxy 相比于 defineProperty 的优势
数组变化也能监听到

### vue-router 有哪几种导航守卫

#### 全局导航守卫
1. `beforeEach`: 全局前置守卫，进入路由前调用
2. `beforeResolve`: 全局解析守卫(2.5.0+) 在 `beforeRouteEnter` 调用之后调用。同时在所有组件内守卫和异步路由组件被解析之后
3. `afterEach`: 全局后置守卫，进入路由后调用

#### 路由独享守卫
`beforeEnter`: 某些路由单独配置守卫

#### 组件内守卫
1. `beforeRouteEnter`:  进入路由前, 组件实例还未创建，不能使用 `this`
2. `beforeRouteUpdate`: 路由跳转但是两个路由复用了同一个组件，在当前路由跳转之前调用, 可以访问 `this`
3. `beforeRouteLeave`: 离开该组件的对应路由时调用, 可以访问 `this`

## 其他

### SSR（服务端渲染）
直接在服务端层获取数据，渲染出完成的 HTML 文件，直接返回给用户浏览器访问。

#### 优点
- 有利于SEO
- 前端耗时少

#### 缺点
- 不利于前后端分离，开发效率低
- 占用服务器端资源
