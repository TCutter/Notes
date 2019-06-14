<!-- TOC -->

- [其他问题](#其他问题)
    - [分布式与集群](#分布式与集群)
    - [script 引入方式](#script-引入方式)
    - [递归](#递归)
    - [对象的拷贝](#对象的拷贝)
        - [浅拷贝](#浅拷贝)
        - [深拷贝](#深拷贝)
    - [Async 和 await](#async-和-await)
    - [require 与 import](#require-与-import)
- [作用域](#作用域)
    - [词法作用域](#词法作用域)
    - [执行上下文](#执行上下文)
        - [执行上下文栈 `ECStack`](#执行上下文栈-ecstack)
        - [代码执行过程](#代码执行过程)
- [网络安全](#网络安全)
    - [XSS 攻击](#xss-攻击)
        - [反射型XSS](#反射型xss)
        - [DOM 型 XSS](#dom-型-xss)
        - [存储型XSS](#存储型xss)
        - [解决方法](#解决方法)
    - [CSRF 攻击](#csrf-攻击)
        - [解决方法](#解决方法-1)
    - [区别](#区别)
    - [点击劫持](#点击劫持)
        - [解决方法](#解决方法-2)
- [模拟 call、apply、bind、new](#模拟-callapplybindnew)
    - [call、apply](#callapply)
    - [bind](#bind)
    - [new](#new)
- [setTimeout(fn, 0) 和 Promise](#settimeoutfn-0-和-promise)
- [设计模式](#设计模式)
    - [单例模式](#单例模式)
    - [工厂模式](#工厂模式)
    - [适配器模式](#适配器模式)
    - [代理模式](#代理模式)
    - [发布订阅模式与观察者模式](#发布订阅模式与观察者模式)
    - [装饰器模式](#装饰器模式)

<!-- /TOC -->
## 其他问题

### 分布式与集群
分布式：减少单个任务的执行时间以提高效率；

集群：提高单位时间内执行的任务数以提高效率

[分布式与集群的区别](https://www.cnblogs.com/aspirant/p/5697807.html)

### script 引入方式
- html 静态<script>引入
- js 动态插入<script>
- <script defer>: 延迟加载，彼此之间有先后顺序，元素解析完成后执行
- <script async>: 异步加载，彼此之间先后顺序不可控，加载完成后立刻执行，因此执行时会阻塞元素渲染

### 递归
1. 子问题须与原始问题为同样的事，且更为简单；
2. 不能无限制地调用本身，须有个出口，化简为非递归状况处理。
```js
function getFib (n) {
    if (n <=1 ) return 1
    return getFib(n - 1) + getFib(n - 2)
}

// 尾递归优化
function getFib (n， arg1 = 1, arg2 = 1) {
    if (n <=1 ) return arg2
    return getFib(n - 1, arg2, arg1 + arg2)
}
```

### 对象的拷贝
#### 浅拷贝
- Object.assign
- 展开运算符(...)

#### 深拷贝
- `JSON.parse(JSON.stringify(obj))`: 性能最快
    - 具有循环引用的对象时，报错
    - 当值为函数、undefined、或symbol时，无法拷贝
- 递归

### Async 和 await
1. 所有async 中的代码都会同步执行，它代替了自动执行的 co 模块
2. await 后面跟着的是异步执行代码，最后都会转换成Promise对象

### require 与 import
- 动态导入： `require()` 和 `import()`
- require 是同步导入， import是异步导入
- require 导入的是值拷贝，导出值变化不会影响导入值;import 是引用，指向内存地址 (`Vue` 单文件中 import 的也是副本，每个组件都有自己的数据)，导入值会随导出值而变化

## 作用域
### 词法作用域
JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。函数的作用域基于函数创建的位置

```js
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();// 结果是 1
```

### 执行上下文
当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈(`ECStack  = []`), 它有3个属性

- 变量对象(Variable object，VO)：变量对象是与执行上下文相关的 **数据作用域**，存储了在上下文中定义的变量和函数声明
- 作用域链(Scope chain)：可以理解为一组对象列表，包含 **父级和自身的变量对象**。当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链
- this

[执行上下文](https://github.com/mqyqingfeng/Blog/issues/8)

#### 执行上下文栈 `ECStack`
1. 当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 `globalContext` 表示它，并且只有当整个应用程序结束的时候，`ECStack` 才会被清空，所以程序结束之前， `ECStack` 最底部永远有个 `globalContext`
2. 当函数调用时，压入栈顶。当它执行完毕时，被弹出栈

```js
ECStack.push('bar')
ECStack.push('foo')
ECStack.pop()
ECStack.pop()
```

#### 代码执行过程
1. 首先创建全局上下文，将其压入执行上下文栈
2. 全局执行上下文（caller）自上而下的执行。遇到函数时，函数执行上下文（callee）被 `push` 到栈顶
3. 函数z执行上下文被激活，开始执行函数代码，caller 被挂起
4. 函数执行完毕，函数执行上下文被弹出，控制权被交还给全局上下文，继续执行。
5. 所有代码执行完毕后全局上下文被弹出


## 网络安全
### XSS 攻击
XSS(跨站脚本攻击)是一种代码注入攻击。可以读取 cookie，session tokens，或者其它敏感的网站信息，对用户进行钓鱼欺诈。
#### 反射型XSS
当用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被攻击者的网站
#### DOM 型 XSS
把不可信的数据作为 HTML 插到页面上
#### 存储型XSS
恶意脚本未经转换，存储到了后台。任何用户访问此页面，都会执行恶意脚本。

#### 解决方法
1. 数据过滤，数据编码
    > 对于 存储型XSS，三种情况 `前端输入时过滤/服务端增加过滤/前端输出时过滤` 下都要进行过滤
2. Content Security Policy
    只允许加载同域下的资源
3. HTTP-only Cookie: 禁止 JavaScript 读取某些敏感 Cookie
4. 验证码：防止脚本冒充用户提交危险操作。
5. 输入内容长度控制


```js
/* 过滤函数 */
//Html 编码
function encodeHtml (str) {
    return str.replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
//Html 解码
function decodeHtml (str) {
    return str.replace(/&quot;/g, '\"')
        .replace(/&apos;/g, '\'')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
}
```

### CSRF 攻击
CSRF(跨站请求伪造)。击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证(因此需要先登录)，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

#### 解决方法
1. 验证码（体验不好）
2. Token
3. 接口设置禁止跨域

### 区别
1.
- CSRF：需要用户先登录网站A，获取 cookie。
- XSS：不需要登录。

2.
- CSRF：是利用网站A本身的漏洞，去请求网站A的api。
- XSS：是向网站 A 注入 JS代码，然后执行 JS 里的代码，篡改网站A的内容。

### 点击劫持
点击劫持是指在一个Web页面中隐藏了一个透明的iframe，用外层假页面诱导用户点击，实际上是在隐藏的frame上触发了点击事件进行一些用户不知情的操作。

#### 解决方法
使用一个HTTP响应头——X-Frame-Options

## 模拟 call、apply、bind、new
### call、apply
原理
1. 将函数设为对象属性
2. 执行该函数
3. 删除该函数

### bind
特点
1. 返回一个函数
2. 可以传入参数

### new
步骤
1. 新建一个对象
2. 链接到原型: `obj.__proto__ = Con.prototype`
3. 绑定this:` Constructor.apply(obj)`
4. 返回这个对象(如果构造函数有自己 retrun 时，则返回该值)

## setTimeout(fn, 0) 和 Promise
[setTimeout(fn, 0)](https://cloud.tencent.com/developer/article/1405717)

浏览器中的事件循环 eventLoop，分为同步执行栈和异步队列，首先会执行同步的任务，当同步任务执行完之后会从异步队列中取异步任务拿到同步执行栈中进行执行。
而异步队列分为两种：
- `microtask`: 微任务，优先级高，并且可以插队，不是先定义先执行。包括：`promise` 中的 `then`，`observer`，`MutationObserver`，`setImmediate`
- `macrotask`: 宏任务，优先级低，先定义的先执行。包括：`ajax`，`setTimeout`，`setInterval`，事件绑定，`postMessage`，`MessageChannel`（用于消息通讯）

## 设计模式
### 单例模式
- 定义: 一个类只有一个实例
- 意义：减少不必要的内存开销，减少全局函数以及变量冲突

```js
class SingletonApple {
    constructor (name, creator, products) {
        if (!SingletonApple.instance) {
            this.name = name
            this.creator = creator
            this.products = products

            SingletonApple.instance = this
        }
        return SingletonApple.instance
    }
}

let appleCompany = new SingletonApple('苹果公司', '乔布斯', ['iPhone', 'iMac', 'iPad', 'iPod']);
let copyApple = new SingletonApple('苹果公司', '阿辉', ['iPhone', 'iMac', 'iPad', 'iPod']);

console.log(appleCompany === copyApple); // true
```

### 工厂模式
- 定义: 不暴露创建对象的具体逻辑，而是将逻辑封装在一个函数中，这个函数就被视为一个工厂

1. 简单工厂模式

只需要一个正确的参数，就可以获取到你所需要的对象，而无需知道其创建的具体细节
```js
class User {
  //构造器
  constructor(opt) {
    this.name = opt.name;
    this.viewPage = opt.viewPage;
  }

  //静态方法
  static getInstance(role) {
    switch (role) {
      case 'superAdmin':
        return new User({ name: '超级管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'] });
        break;
      case 'admin':
        return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] });
        break;
      case 'user':
        return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] });
        break;
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}

//调用
let superAdmin = User.getInstance('superAdmin');
let admin = User.getInstance('admin');
let normalUser = User.getInstance('user');
```

2. 工厂方法模式

将实际创建对象的工作推迟到子类中，这样核心类就变成了抽象类
```js
class User {
  constructor(name = '', viewPage = []) {
    if(new.target === User) {
      throw new Error('抽象类不能实例化!');
    }
    this.name = name;
    this.viewPage = viewPage;
  }
}

class UserFactory extends User {
  constructor(name, viewPage) {
    super(name, viewPage)
  }
  create(role) {
    switch (role) {
      case 'superAdmin': 
        return new UserFactory( '超级管理员', ['首页', '通讯录', '发现页', '应用数据', '权限管理'] );
        break;
      case 'admin':
        return new UserFactory( '普通用户', ['首页', '通讯录', '发现页'] );
        break;
      case 'user':
        return new UserFactory( '普通用户', ['首页', '通讯录', '发现页'] );
        break;
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}

let userFactory = new UserFactory();
let superAdmin = userFactory.create('superAdmin');
let admin = userFactory.create('admin');
let user = userFactory.create('user');
```

### 适配器模式
- 定义：将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类可以一起工作
- 使用场景：库的适配、参数的适配和数据的适配

### 代理模式
- 定义: 为其他对象提供一种代理以控制对这个对象的访问。在某些情况下，一个对象不适合或者不能直接引用另一个对象，而代理对象可以在客户端和目标对象之间起到中介的作用。
- 特点：代理对象和本体对象具有一致的接口, 对使用者友好

```js
// 虚拟代理
const myImage = (function() {
  const imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function(src) {
      imgNode.src = src
    }
  }
})()

const proxyImage = (function() {
  const img = new Image()
  img.onload = function() { // http 图片加载完毕后才会执行
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('loading.jpg') // 本地 loading 图片
      img.src = src
    }
  }
})()

proxyImage.setSrc('http://loaded.jpg')

// 缓存代理，将结果缓存下来，下一次调用的时候直接从缓存取结果
const mult = function() {
  let a = 1
  for (let i = 0, l; l = arguments[i++];) {
    a = a * l
  }
  return a
}

const proxyMult = (function() {
  const cache = {}
  return function() {
    const tag = Array.prototype.join.call(arguments, ',')
    if (cache[tag]) {
      return cache[tag]
    }
    cache[tag] = mult.apply(this, arguments)
    return cache[tag]
  }
})()

proxyMult(1, 2, 3, 4) // 
```

### 发布订阅模式与观察者模式
- 区别：发布订阅模式有个事件调度中心
- 观察者模式由具体目标调度，每个被订阅的目标里面都需要有对观察者的处理，强耦合
- 发布订阅模式：订阅者把自己想订阅的事件注册到调度中心，当该事件触发时，发布者发布该事件到调度中心，由调度中心统一调度订阅者注册到调度中心的代码

```js
/**
 * 发布订阅模式
 */

 // 调度中心
class Player {
    constructor () {
        // 初始化观察者列表
        this.watchers = {}
    }

    // 发布事件
    publish (event, data) {
        if (this.watchers[event] && this.watchers[event].length) {
            this.watchers[event].forEach(callback => callback.call(this, data))
        }
    }

    // 订阅事件
    subscribe (event, callback) {
        this.watchers[event] = this.watchers[event] || []
        this.watchers[event].push(callback)
    }
}

// 实例化播放器
const player = new Player()

const onPlayerPlay1 = data => {
    console.log('1: Player is play, the `this` context is current player', this, data)
}

const onPlayerPlay2 = data => {
    console.log('2: Player is play', data)
}

// 暂停事件回调函数
const onPlayerPause = data => {
    console.log('Player is pause', data)
}

// 加载事件回调函数
const onPlayerLoaded = data => {
    console.log('Player is loaded', data)
}

// 可订阅多个不同事件
player.subscribe('play', onPlayerPlay1)
player.subscribe('play', onPlayerPlay2)
player.subscribe('pause', onPlayerPause)
player.subscribe('loaded', onPlayerLoaded)

player.publish('loaded', true)


/**
 * 观察者模式
 */

// 发布者
class Subject {
    constructor () {
        this.subjectList = [] 
    }

    // 注册
    add (obj) {
        this.subjectList.push(obj)
    }

    // 发通知
    notify (data) {
        this.subjectList.forEach(subject => subject.update(data))
    }
}

//观察者（订阅者） A
class ObserveA {
    update (date) {
        console.log('a update:' + date)
    }
}

//观察者 B
class ObserveB {
    update (date) {
        console.log('b update:' + date)
    }
}

var subject = new Subject()	//目标
var a = new ObserverA()	//观察者b
var b = new ObserverB()	//观察者c

subject.add(a) // 观察者将事件注册到发布者中
subject.add(b)
subject.notify('change') // 发布者发布事件，形成耦合
```

### 装饰器模式
- 定义：向一个现有的对象添加新的功能，同时又不改变其结构的设计模式被称为装饰器模式。它是作为现有的类的一个包装
