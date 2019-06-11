<!-- TOC -->

- [其他问题](#其他问题)
    - [分布式与集群](#分布式与集群)
- [Async 和 await](#async-和-await)
- [作用域](#作用域)
    - [词法作用域](#词法作用域)
    - [执行上下文](#执行上下文)
        - [执行上下文栈 `ECStack`](#执行上下文栈-ecstack)
        - [作用域链和变量对象的创建过程](#作用域链和变量对象的创建过程)
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
- [防抖和节流](#防抖和节流)
    - [防抖（debounce）](#防抖debounce)
    - [节流（throttle）](#节流throttle)
- [递归](#递归)
- [setTimeout(fn, 0) 和 Promise](#settimeoutfn-0-和-promise)
- [设计模式](#设计模式)
    - [单例模式](#单例模式)
    - [工厂模式](#工厂模式)
    - [适配器模式](#适配器模式)
    - [代理模式](#代理模式)
    - [发布订阅模式与观察者模式](#发布订阅模式与观察者模式)
    - [装饰器模式](#装饰器模式)
- [Source Code](#source-code)

<!-- /TOC -->
## 其他问题

### 分布式与集群
分布式：减少单个任务的执行时间以提高效率；

集群：提高单位时间内执行的任务数以提高效率

[分布式与集群的区别](https://www.cnblogs.com/aspirant/p/5697807.html)

## Async 和 await
1. 所有async 中的代码都会同步执行，它代替了自动执行的 co 模块
2. await 后面跟着的是异步执行代码，最后都会转换成Promise对象

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

- 变量对象(Variable object，VO)：变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明
- 作用域链(Scope chain)：当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链
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

#### 作用域链和变量对象的创建过程
函数有一个内部属性 [[scope]]，当函数创建的时候，就会保存所有父变量对象到其中

```js
var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();
```

1. `checkscope` 被创建，保存作用域链到内部属性 `[[scope]]`
```js
checkscope.[[scope]] = [
    globalContext.VO
]
```

2. 执行 `checkscope` 函数，创建 `checkscope` 函数执行上下文，`checkscope` 函数执行上下文被压入执行上下文栈
```js
ECStack = [
    checkscopeContext,
    globalContext
];
```

3. `checkscope` 函数并不立刻执行，开始做准备工作, 复制函数 `[[scope]]` 属性创建作用域链
```js
checkscopeContext = {
    Scope: checkscope.[[scope]],
}
```

4. 用 `arguments` 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明
```js
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    }，
    Scope: checkscope.[[scope]],
}
```

5. 将活动对象压入 `checkscope` 作用域链顶端
```js
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    },
    Scope: [AO, [[Scope]]]
}
```

6. 准备工作做完，开始执行函数，随着函数的执行，修改 AO 的属性值
```js
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: 'local scope'
    },
    Scope: [AO, [[Scope]]]
}
```

7. 查找到 `scope2` 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出
```js
ECStack = [
    globalContext
];
```

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
1. 新建一个对象，并将对象的原型指向 Constructor.prototype
2. 然后 Constructor.apply(obj)
3. 返回这个对象

## 防抖和节流
### 防抖（debounce）
原理：你尽管触发事件，但是我一定在事件触发 n 秒后才执行。即最后一次触发事件后 n 秒才执行
### 节流（throttle）
原理：如果你持续触发事件，每隔一段时间，只执行一次事件

## 递归
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

## Source Code
```js
/**
 * 对象、数组深拷贝
 * @param {Object} obj
 * @returns {Object}
 */
function deepCopy (obj) {
    let objClone = obj.constructor === Array ? [] : {}
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                objClone[key] = deepCopy(obj[key])
            } else {
                objClone[key] = obj[key]
            }
        }
    }
    return objClone
}

/**
 * 模拟 call
 * @param {*} context
 * @returns {*}
 */
Function.prototype.call2 = function (context) {
    var context = context || window
    context.fn = this

    var args = []
    // 执行后 args为 ["arguments[1]", "arguments[2]", "arguments[3]"]
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']')
    }
    var result = eval('context.fn(' + args + ')') // args 会自动调用 Array.toString()
    delete context.fn
    return result
}

/**
 * 模拟 apply
 * @param {*} context 
 * @param {Array} arr
 * @returns {*}
 */
Function.prototype.apply2 = function (context, arr) {
    var context = context || window
    context.fn = this

    var result = null
    if (!arr) {
        result = context.fn()
    } else {
        var args = []
        for (var i = 1, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']')
        }
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn
    return result
}

/**
 * 模拟 bind
 * @param {*} context
 * @returns {Function}
 */
Function.prototype.bind2 = function (context) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var self = this
    // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1)

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments)
        /**
         * 当作为构造函数时，this 指向实例， 结果为 true;
         * 当作为普通函数时，this 指向 window, 结果为 false
         */
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }

    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    fBound.prototype = Object.create(self.prototype)
    fBound.prototype.constructor = fBound
    return fBound
}

/**
 * 模拟 new
 * @returns {*}
 */

function createObjIns () {
    var Constructor = [].shift.call(arguments)
    // 设置 obj.__proto__ = Constructor.prototype, 相当于复制 Constructor 原型上的属性
    var obj = Object.create(Constructor.prototype)
    // 设置内部属性，跟寄生组合式继承很像
    var ret = Constructor.apply(obj, arguments)
    // 我们还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么。
    return typeof ret === 'object' ? ret : obj;
}

/**
 * Generator 实现状态机
 */
const clock = function* () {
    while (true) {
        yield true
        yield false
    }
}

/**
 * 函数防抖
 * @param {Function} fn 待执行函数
 * @param {Number} delay 延迟时间
 */
function debounce (fn, delay) {
    var timeout 
    return function () {
        var self = this
        var args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function () {
            fn.apply(self, args)
        }, delay)
    }
}

/**
 * 函数节流
 * @param {Function} fn 待执行函数
 * @param {Number} delay 间隔时间
 */
function throttle (fn, delay) {
    var timeout
    var args // 取第一次还是最后一次的 args？？？写在这里表示是最后一次，形成一个闭包，凉羽大神用的也是最后一次
    return function () {
        var self = this
        args = arguments // 闭包变量，每次执行都更新值
        if (!timeout) {
            timeout = setTimeout(function () {
                fn.apply(self, args)
                timeout = null
            }, delay);
        }        
    }
}

/**
 * 类型检测
 */
function types (obj) {
    var classType = {}

    'Boolean Number String Function Array Date RegExp Object Error'.split(' ').map(item => {
        classType[`[object ${item}]`] = item.toLowerCase()
    })

    if (obj == null) {
        return obj + ''
    }

    return typeof obj === 'object' || typeof obj === 'function'
        ? classType[Object.prototype.toString().call(obj)] || 'object' // 引用类型
        : typeof obj // 基本类型
}

/**
 * 惰性函数
 * 每次都需要进行条件判断，其实只需要判断一次，接下来的使用方式都不会发生改变
 */
function addEvent (type, el, fn) {
    if (window.addEventListener) {
        addEvent = function (type, el, fn) {
            el.addEventListener(type, fn, false)
        }
    } else {
        addEvent = function (type, el, fn) {
            el.attachEvent('on' + type, fn);
        }
    }
    addEvent(type, el, fn); // 此时 addEvent 已被改写
}

/**
 * 函数柯里化（有限参数）: 将使用多个参数的一个函数转换成一系列使用一个参数的函数
 */
function curry (fn, ...args) {
    let length = fn.length
    let all = args || []

    return function (...rest) {
        let _args = all.slice(0)
        _args.push(...rest)
        if (_args.length < length) {
            return curry.call(this, fn, ..._args)
        } else { // 参数长度满足了才会开始执行
            return fn.apply(this, _args)
        }
    }
}

/**
 * 偏函数: 固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数
 */
function partial (fn, ...args) {
    return function (...rest) {
        var _args = args.concat(rest)
        return fn.apply(this, _args)
    }
}

/**
 * 无限(任意)参数柯里化
 * 经典面试题: 利用函数柯里化、偏函数以及函数的隐式转换(toString())实现
 * add(1)(2)(3)(4)
 * add(1, 2, 3)(4)
 * add(1, 2)(3)(4)
 * add(1, 2)(3, 4)
 * add(1, 2)(3, 4)()
 */
function add (...args) {
    let _args = args || []
    var adder = function (...rest) {
        _args.push(...rest)
        return adder
    }

    adder.toString = function () {
        return _args.reduce((a, b) => {
            return a + b
        })
    }

    return adder
}

/**
 * 插入排序
 * @param {Array} arr 
 */
function insertSort (arr) {
    for (var i = 1; i < arr.length; i++) {
        var element = arr[i]
        for (var j = i - 1; j >= 0; j--) {
            var tmp  = arr[j]
            if (element < tmp) {
                arr[j + 1] = tmp 
            } else {
                break
            }
        }
        arr[j + 1] = element
    }
}

/**
 * 快速排序
 * @param {Array} arr 
 */
function quickSort (arr) {
    if (arr.length <= 1) {
        return arr
    }
    var pivotIndex = Math.floor(arr.length / 2)
    var pivot = arr.splice(pivotIndex, 1)[0]
    var left = []
    var right = []
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pivot], quickSort(right))
}

/**
 * 冒泡排序
 * @param {Array} arr 
 */
function bubbleSort (arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        for (var j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
}
```
