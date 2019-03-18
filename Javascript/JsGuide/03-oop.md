<!-- TOC -->

- [三、面向对象](#三面向对象)
  - [3.1 理解对象](#31-理解对象)
    - [对象属性](#对象属性)
    - [读取属性特性](#读取属性特性)
  - [3.2 创建对象](#32-创建对象)
    - [构造函数模式](#构造函数模式)
    - [原型模式](#原型模式)
    - [构造函数和原型组合模式(推荐用法)](#构造函数和原型组合模式推荐用法)
  - [3.3 继承](#33-继承)
    - [原型链](#原型链)
    - [借用构造函数](#借用构造函数)
    - [组合继承](#组合继承)
    - [原型式继承](#原型式继承)
    - [寄生式继承（个人觉得很鸡肋）](#寄生式继承个人觉得很鸡肋)
    - [寄生组合式继承（推荐）](#寄生组合式继承推荐)

<!-- /TOC -->

## 三、面向对象

面向对象的核心思想是将真实世界中的各种复杂关系，抽象成一个个对象，然后由对象之间分工合作，从而完成对真实世界的模拟。

[面向对象：封装、继承、多态](https://www.zhihu.com/question/20275578/answer/26577791?group_id=752158336673132544)

### 3.1 理解对象
#### 对象属性

ECMAScript中有两种属性：数据属性和访问器属性

- 数据属性

    数据属性包含一个数据值的位置， 在这个位置可以读取和写入值。数据属性有4个特性：

    - *configurable* : 能否同过 delete 删除属性，能否修改属性的特性，直接在对象上定义的属性（obj.name）默认值为 true
    - *enumerable*：能否通过 for-in 返回的属性（对象通过 prototype 定义的属性该值为 false），直接在对象上定义的属性（obj.name）默认值为 true
    - *writable*：能否修改属性值，直接在对象上定义的属性（obj.name）默认值为 true
    - *value*：属性的默认值。读取属性值时，从这个位置读取；写入属性值时，将新值保存到这个位置。默认为 undefined
    
    ```
    var obj = {
        name:'gx'
    }
    ```

    可以通过 Object.defineProperty() 修改属性特性：
    ```js
    var person ={};
    //  参数：对象，属性名，特性名
    Object.defineProperty(person,'name',{
        writable:false,
        value:'gx'
    });
    console.log(person.name);   // gx
    person.name = 'cm'; //严格模式下会报错
    console.log(person.name);   // gx

    Object.defineProperty(person,'age',{
        configurable:false, //将 configurable 属性设为 false 之后，如果再将其设为 true 就会报错
        value:'25'
    });
    console.log(person.age);   // 25
    delete person.age; //严格模式下会报错
    console.log(person.age);   // 25
    ```

    > 调用 Object.defineProperty 但不设置特性名时会将 configurable、enumerable 和 value 特性都置为 false

- 访问器属性

    访问器属性不包含属性值，但包含一对 getter 和 setter 函数，用来读取和写入访问器属性，它也包含4个特性

    - *configurable* ：同上
    - *enumerable* ： 同上
    - *get*：在读取属性时调用的函数，默认为 undefined
    - *set*：在写入属性时调用的函数，默认为 undefined

    访问器属性必须通过 Object.defineProperty() 定义。

    ```js
    var obj = {
        _year :2000,
        edition:1
    };

    Object.defineProperty(obj,'newYear',{
        get:function(){
            return this._year;
        },
        set:function(newValue){
            if(newValue > 2017){
                this._year = 2017;
                this.edition += newValue - 2017;
            }
        }
    });

    console.log(obj._year);   //2000
    console.log(obj.edition);   //1
    console.log(obj.newYear);   //2000

    obj.newYear = 2018;
    console.log(obj._year);   // 2017
    console.log(obj.edition);   //2
    console.log(obj.newYear);   //2017
    ```

#### 读取属性特性

```js
var book ={};

//  定义多个属性
Object.defineProperties(book,{
    _year:{
        value : 2004
    },
    edition:{
        value : 1
    },
    year : {
        get : function(){
            return this._year;
        },
        set:function(newValue){
            if(newValue > 2004){
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});

//  读取属性特性
var descriptor = Object.getOwnPropertyDescriptor(book,'_year');
console.log(descriptor.value);  // 2004
console.log(descriptor.configurable);   // false
```

### 3.2 创建对象
#### 构造函数模式

每个实例都有自己的方法和属性

```js
function Student(name,age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
        console.log("My name is " + this.name);
    };
}

var stu1 = new Student("gx",'25');
console.log(stu1.constructor === Student);  // true
console.log(stu1.constructor == Object);  // false 
```

#### 原型模式

1. 每个创建的函数都有一个 prototype (原型)属性，这个属性是一个指针，指向一个包含所有实例共享的属性和方法的对象(称为原型对象)

```js
function Student(){

};
Student.prototype.name = "gx";
Student.prototype.age = "25";
Student.prototype.address = ["hubei","wuhan","hongshan"];
Student.prototype.sayName = function(){
        console.log("My name is " + this.name);
};

var stu1 = new Student();
console.log(Student.prototype === stu1.__proto__ );  // true
console.log(Student.prototype.constructor === Student);  // true 
```

> - a. 在默认情况下，所有原型对象都会自动创建一个 constructor 属性，这个属性包含一个指向 prototype 属性所在函数的指针。
> - b. Student的每个实例都有一个内部属性( *stu1.__proto\__*)，该属性指向 Student 原型对象。可以通过 Object.getPrototypeOf(stu1) 来获取 Student 的原型( Student.prototype )

2. 对象属性的搜索顺序是先从实例中搜索，然后从原型中搜索

    可以通过实例访问原型中的值，但是不能通过实例重写原型中的值。如果在实例中重写一个与原型重名的属性，那么该属性会覆盖掉原型中的属性。

    ```js
    var stu2 = new Student();
    stu1.name  = 'cm';  //从原理上分析，添加这个属性只会阻止实例访问原型上定义的属性，而不会修改那个属性 (但如果该属性为引用类型，则会修改该属性)
    stu1.address.push("关谷");

    console.log(stu1.name); //'cm'  -- 来自实例
    console.log(stu2.name); //'gx'  -- 来自原型

    console.log(stu1.address); //["hubei", "wuhan", "hongshan", "关谷"]
    console.log(stu2.address); //["hubei", "wuhan", "hongshan", "关谷"]

    console.log(stu1.hasOwnProperty('name'));   // true

    delete stu1.name;
    console.log(stu1.name); //'gx'  -- 来自原型
    console.log(stu1.hasOwnProperty('name'));   // false
    ```
3. 其他方法

    - hasOwnProperty() : 判断属性是来自实例还是原型.来自原型返回 true
    - in : 能够返回属性时返回 true ，不论属性是在原型还是实例中
    - for ... in ... : 遍历可枚举（*enumerable* 为true）的属性。不论属性是在原型还是实例中
    - Object.keys(obj): 遍历非原型中的属性

    ```js
    function Prop(){
        this.name = "gx";
        this.age = 26;
    }

    Prop.prototype = {
        address:'wuhan',
        sayName:function(){
            console.log(this.name);
        }
    };

    var prop = new Prop();

    // 1
    for(var attr in prop){
        if(prop.hasOwnProperty(attr)){
            console.log("Real attr : " + attr);
        }else{
            console.log("Property attr : " + attr);
        }
    }
   /*output:
   Real attr : name
   Real attr : age
   Property attr : address
   Property attr : sayName
   */

    // 2
   console.log(Object.keys(prop));  // 返回一个数组 ["name","age"]

   //3 
   console.log(prop.constructor === Prop);  // false
   console.log(prop.constructor === Object);  //true

   // prop.constructor 相当于 prop.__proto__.constructor ， 由于此时原型对象已被重写，因此第一个返回false；改写后的 constructor 指向Object，因此第二个返回 true
    ```

4. 原型的动态性
```js
function Class1(){
};
var class1 = new Class1();
Class1.prototype.sayName = function(){
    console.log("Class1");
}

class1.sayName();   // 在原型中找到了 sayName 方法


function Class2(){
};
var class2 = new Class2();
Class2.prototype={  // 此赋值方法切断了原型与构造函数之间的联系，见下图
    sayName :function(){
        console.log("Class2");
    }
}
try{
    class2.sayName();   //报错，var class2 = new Class2(); 必须放在 Class2.prototype 赋值的后面
} catch(e){
    console.log(e);
}
```
![原型](/Style/images/javascript/01.PNG)

#### 构造函数和原型组合模式(推荐用法)

所有实例拥有自己的属性，但是共享对方法的引用
```js
function Person(name,age){
    this.name = name;
    this.age = age;
};

Person.prototype.sayName = function(){
    console.log(this.name);
};

Person.prototype.getName = function(){
    return this.name;
}
```

### 3.3 继承
JavaScript 靠原型链实现继承

#### 原型链

基本思想：利用原型让一个引用类型对象继承另一个引用类型对象的属性和方法。

概念：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针(constructor)，而实例都包含一个指向原型对象的内部指针(__proto__)。如果我们让原型对象（*SubType.prototype*）等于另一个类型（*SuperType*）的实例，此时的原型对象（*SubType.prototype*）将包含一个指向另一个原型（*SuperType.prototype*）的指针，相应的，另一个原型（*SuperType.prototype*）中也包含着一个指向另一个构造函数（*SuperType*）的指针。假如另一个原型又是另一个类型的实例，如此层层递进，就构成了实例与原型的链条。这就是原型链。

```js
function SuperType(){
    this.property = true;
};

SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType(){
    this.subProperty = false;
};

SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
    return this.subProperty;
}

var ins = new SubType();
console.log(ins.getSuperValue());   //true
console.log(ins.constructor);   //SuperType; SubType.prototype.constructor 已被指向了 SuperType
```
> 获取实例对象obj的原型对象,有三种方法
> `obj.__proto__`
> `obj.constructor.prototype`
> `Object.getPrototypeOf(obj)`

> ```var a = Object.create(obj)``` 实际上相当于将对象 a 的 __proto__ 属性改写成 obj

![原型链](/Style/images/javascript/02.PNG)

1. ins 实例中属性（方法）调用步骤：
    - 搜索实例；
    - 搜索 SubType.prototype；
    - 搜索 SuperType.prototype；

2. 默认的原型

    所有的引用类型都继承 Object 对象，因此 SubType 继承了 SuperType，而 SuperType 继承了 Object

3. 原型与实例的关系
    - instanceof：测试实例与原型链中出现过的构造函数
    ```js
    console.log(ins instanceof Object); //true
    console.log(ins instanceof SuperType); //true
    console.log(ins instanceof SubType); //true
    ```

    - isPrototypeOf():检测原型链中出现过的原型
    ```js
    console.log(Object.prototype.isPrototypeOf(ins)); //true
    console.log(SuperTypes.prototype.isPrototypeOf(ins)); //true
    console.log(SubType.prototype.isPrototypeOf(ins)); //true
    ```

4. 原型链的问题

    - 原型中包含引用类型值的问题：在通过原型实现继承时，原型实际上会变成另一个类型的实例。因此，原先实例属性也就成了现在的原型属性。

    ```js
    function SuperType(){
        this.color = ["red","blue","green"];
        this.name = "gx";
    };
    function SubType(){
    }
    SubType.prototype = new SuperType();

    var instance1 = new SubType();
    instance1.color.push("black"); 
    instance1.name = "cm";
    
    var instance2 = new SuperType();
    console.log(instance2.color);   //["red", "blue", "green"]
    console.log(instance2.name); // "gx"

    var instance3 = new SubType();
    console.log(instance3.color);   //["red", "blue", "green", "black"]
    console.log(instance3.name); // "gx"  
    ```

    - 创建子类型的实例时，不能向父类的构造函数传递参数


#### 借用构造函数

1. 传递参数：相对于原型链，借用构造函数可以向父类型构造函数传递参数

```js
function SuperType(name){
    this.name = name;
}

function SubType(name){
    SuperType.call(this,name);  //继承了SuperType，同时还传递了参数
    this.age = 25;
}

var instance = new SubType("gx");
console.log(instance.name); //"gx"
console.log(instance.age); //25
```

2. 存在的问题 ：只能继承构造函数中定义的属性和方法（与原型链不同）

```js
function SuperType(name){
    this.name = name;
    this.sayName1 = function(){
        console.log(this.name);
    }
}
SuperType.prototype.sayName2 = function(){
    console.log(this.name);
}

function SubType(name){
    SuperType.call(this,name);  //继承了SuperType，同时还传递了参数
    this.age = 25;
}

var instance = new SubType("gx");
instance.sayName1();    //"gx"
instance.sayName2();    //throe an error
```

#### 组合继承

使用原型链对原型的属性和方法继承，使用借造构造函数实现对实例属性的继承。这样，既实现了函数的复用，又保证每个实例有自己的属性；

```js
function SuperType(name){
    this.name = name;
    this.color = ["red","blue","green"];
};

SuperType.prototype.sayName = function(){
    console.log(this.name);
};

function SubType(name,age){
    SuperType.call(this,name);
    this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.sayAge = function(){
    console.log(this.age);
};

var instance1 = new SubType("gx",24);
instance1.color.push("black");
console.log(instance1.color);   //["red", "blue", "green", "black"]
instance1.sayName();    //"gx"
instance1.sayAge(); //24

var instance2 = new SubType("cm",27);
console.log(instance2.color);   //["red", "blue", "green"]
instance2.sayName();    //cm
instance2.sayAge(); //27
```

缺点：组合继承会使子类型实例在实例和原型中存在两组父类型的属性

```js
function SuperType(name){
    this.name = name;
}

SuperType.sayName = function(){
    console.log(this.name);
};

function SubType(name){
    SuperType.call(this,name);
    this.age = '25';
}
SubType.prototype = new SuperType();

var ins = new SubType("gx");
```

结果：

![组合继承](/Style/images/javascript/03.png)

#### 原型式继承

借助原型基于已有的对象创建新对象，同时还不必因此创建自定义类型。

```js
/*先创建一个临时的构造函数，将传入的对象作为构造函数逇原型，最后返回这个临时类型的一个新实例*/
function object(o){
    var F = function(){};
    F.prototype = o;
    return new F();
}
```

```js
var person ={
    name : "gx",
    friends:['xy','mq','cm']
}

var anotherperson = object(person);
anotherperson.name = 'gxx';
anotherperson.friends.push('wmh');

var yetperson = object(person);
yetperson.name = 'gxxx';
yetperson.friends.push('zkl');
```
输出：

person.friends 被 anotherperson 和 yetperson 共享

![原型式继承](/Style/images/javascript/04.png)

原理：
一个对象作为另一个对象的基础。先将初始对象传给 object() 函数，然后对函数返回的对象进行修改。实际上是对原始对象进行了一层浅复制。


[Object.create(Base) 和 new Base() 的区别](https://blog.csdn.net/blueblueskyhua/article/details/73135938)

- Object.create(Base) 是ECMAScript2015 的方法 : 创建一个具有指定原型且可选择性地包含指定属性的对象。
```js
Object.create= functions(Base){
    var F = function(){};
    F.prototype = Base;
    return new F();
}
```
Object.create() 可以传入两个参数，当只传入一个参数时效果与 object() 一样。

- new Base()
```js
// 内部实现
var o1 = new Object();
o1.__proto__ = Base.prototype;
Base.call(o1);
```

#### 寄生式继承（个人觉得很鸡肋）

```js
function createAnother(original){
    var clone = object(original);
    clone.sayHi =  function(){
        console.log("hi");
    };
    return clone;
}

var person = {
    name:"gx",
    friends:[1,2,3]
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi();

/*
anotherPerson 不仅具有 person 所有的属性和方法，而且还有自己定义的 sayHi() 方法
*/
```

#### 寄生组合式继承（推荐）

优点：保留 组合继承 的优点，解决 组合继承 会调用两次超类型构造函数的问题。

原理：不必为了指定子类型的原型而调用父类型的构造函数（即 ```SubType.prototype = new SuperType()```），我们需要的只是父类型的一个副本。本质上是使用寄生式继承来继承父类型的原型，然后再将结果指定给子类型的原型。

```js
function SuperType(name){
    this.name = name;
    this.colors = ["red","blue","green"];
};

SuperType.prototype.sayName = function(){
    console.log("My name is " + this.name);
};

function SubType(name){
    SuperType.call(this,name);
};

function inheritPrototype(subType,superType){   
    var childProto = function(o){
        function F(){};
        F.prototype = o;
        return new F();
    };

    var proto = childProto(superType.prototype);
    proto.constructor = subType;
    subType.prototype = proto;
};
inheritPrototype(SubType,SuperType);

SubType.prototype.sayColor = function(){
    console.info("My color is " + this.colors[0]);
};

var a = new SubType("gx");
```

结果：
![寄生组合式继承](/Style/images/javascript/05.png)

