/*
 * @Author: xiao.guo 
 * @Date: 2018-07-27 16:43:42 
 * @Last Modified by: xiao.guo
 * @Last Modified time: 2018-08-01 10:17:39
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

inheritPrototype(SubType,SuperType);

SubType.prototype.sayColors = function(){
    console.info("My color is " + this.colors[0]);
};

var a = new SubType("gx");