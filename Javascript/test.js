var a = function(){
};

a.prototype.id = 0;
a.prototype.add = function(){
    this.id++;
}
console.log(a.constructor);
console.log(a.prototype.constructor);
