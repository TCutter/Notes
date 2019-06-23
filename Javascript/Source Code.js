/**
 * @summary js 常见函数源码实现
 * @author TCutter
 *
 * Created at     : 2019-06-13 16:03:56 
 * Last modified  : 2019-06-21 17:35:34
 */


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
        for (var i = 0, len = arr.length; i < len; i++) {
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
 * 你尽管触发事件，但是我一定在事件触发 n 秒后才执行。即最后一次触发事件后 n 秒才执行
 * 将高频操作优化为最后一次操作的 n 秒后才执行（电梯门开关）
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
 * 如果你持续触发事件，每隔一段时间，只执行一次事件
 * 将高频操作优化为在指定间隔时间只执行一次操作（滚动条、resize事件）
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
 * 插入排序: 将元素插入到已排序好的数组中
 * 平均时间复杂度、最坏时间复杂度、空间复杂度、是否稳定
 * O(n^2)，O(n^2), O(1),稳定
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
 * O(nlogn), O(n^2), O(nlogn),不稳定
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
 * O(n^2), O(n^2), O(1),稳定
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

/**
 * ES5 继承（ES6 直接用 class ... extends ...）
 * @param {*} Child 
 * @param {*} Parent 
 */
function inherit(Child, Parent) {
    function create(obj) {
        var fn = function () {}
        fn.prototype = obj
        return new fn()
    }

    var prototype = create(Parent.prototype)    
    prototype.constructor = Child
    Child.prototype = prototype
}
