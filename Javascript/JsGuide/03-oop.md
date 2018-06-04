## 三、面向对象

### 概念
面向对象的核心思想是将真实世界中的各种复杂关系，抽象成一个个对象，然后由对象之间分工合作，从而完成对真实世界的模拟。

[面向对象：封装、继承、多态](https://www.zhihu.com/question/20275578/answer/26577791?group_id=752158336673132544)

### 3.1 理解对象
**3.1.1 对象属性**

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

**3.1.2 读取属性特性**

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
**3.2.1 构造函数模式**

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

**3.2.2 原型模式**

1. 每个创建的函数都有一个 prototype (原型)属性，这个属性是一个指针，指向一个包含所有实例共享的属性和方法的对象(称为原型对象)

```js
function Student(){

};
Student.prototype.name = "gx";
Student.prototype.age = "25";
Student.prototype.sayName = function(){
        console.log("My name is " + this.name);
};

var stu1 = new Student();
console.log(Student.prototype === stu1.__proto__ );  // true
console.log(Student.prototype.constructor === Student);  // true 
```

> - a. 在默认情况下，所有原型对象都会自动创建一个 constructor 属性。
> - b. Student的每个实例都有一个内部属性( *stu1.__proto\__*)，该属性指向 Student 原型对象。可以通过 Object.getPrototypeOf(stu1) 来获取 Student 的原型( Student.prototype )

2. 对象属性的搜索顺序是先从实例中搜索，然后从原型中搜索

    可以通过实例访问原型中的值，但是不能通过实例重写原型中的值。如果在实例中重写一个与原型重名的属性，那么该属性会覆盖掉原型中的属性。

    ```js
    var stu2 = new Student();
    stu1.name  = 'cm';  //从原理上分析，添加这个属性只会阻止实例访问原型上定义的属性，而不会修改那个属性

    console.log(stu1.name); //'cm'  -- 来自实例
    console.log(stu2.name); //'gx'  -- 来自原型

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
![原型](../../Style/images/javascript/prototype.png)

**3.2.3 构造函数和原型组合模式(推荐用法)**

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

**3.3.1 原型链**