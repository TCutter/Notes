##  编程规范
1. eval()函数只用来解8.8.析序列化串
```
var jsonData = eval('(' + data + ')');
```

原因：eval()会让程序执行的比较混乱


2. {}和[]
使用{}代替new Object()，使用[]代替new Array()


3. 单引号（'）
   尽量使用单引号（'），只在JSON文件中使用双引号。
