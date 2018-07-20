function SuperType(name){
    this.color = ["red","blue","green"];
    this.name = name;
    this.sayName1 = function(){
        console.log(this.name);
    }
};

SuperType.prototype.sayName2 = function(){
    console.log(this.name);
}

function SubType(name){
    SuperType.call(this,name);
}

function inheritPrototype(child, parent) {
    var childProto = function(o) {
        function F() { }
        F.prototype = o;
        return new F();
    }
    var prototype = childProto(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
};