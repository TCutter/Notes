## 三、面向对象

### 概念
面向对象的核心思想是将真实世界中的各种复杂关系，抽象成一个个对象，然后由对象之间分工合作，从而完成对真实世界的模拟

### 3.1 理解对象
**3.1.1对象属性**
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