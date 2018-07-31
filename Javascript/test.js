/*
 * @Author: xiao.guo 
 * @Date: 2018-07-27 16:43:42 
 * @Last Modified by: xiao.guo
 * @Last Modified time: 2018-07-31 17:36:15
 */

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