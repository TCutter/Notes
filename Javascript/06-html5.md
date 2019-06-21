<!-- TOC -->

- [六、HTML5 API](#六html5-api)
    - [跨文档消息传递](#跨文档消息传递)
    - [WebWorker](#webworker)
        - [WebWorker原理](#webworker原理)
        - [WorkerGlobalScope全局上下文](#workerglobalscope全局上下文)
        - [共享线程（Shared Worker）和专用线程（Dedicated Worker）](#共享线程shared-worker和专用线程dedicated-worker)
        - [WebWorker之常用API](#webworker之常用api)
        - [WebWorker优缺点：](#webworker优缺点)
        - [WebWorker应用](#webworker应用)

<!-- /TOC -->
##  六、HTML5 API

### 跨文档消息传递

利用 postMessage/onmessage 在框架(`iframe`)之间互相传递信息

`window.postmessage(data, url)`

### WebWorker
1. 产生原因：js是单线程，比如当js运行一段代码时，如果这段代码没有运行完成，是无法做其他的操作。随着HTML要处理的任务越来越重，单线程有时满足使用要求；
2. 概念：Web Worker允许开发人员编写能长时间运行而不被用户中断的后台程序，去执行事务或者逻辑，并同时保证页面对用户的及时响应。简言之，即允许js创建多个线程，但子线程完全受主线程控制，而且子线程不能操作DOM；
3. 特点：能够长时间运行（响应），理想的启动性能以及理想的内存消耗；
4. 使用说明：
- 无法访问DOM；
- 无法访问全局变量或全局函数（只能访问当前js中的函数）；
- 无法调用alert或者confirm等函数；
- 无法访问window、document之类的浏览器全局变量;
- 可以使用setTimeout、setInterval;
- 可以使用XMLHttpRequest对象来做Ajax通信。
- <font color='#f00'>通过new Work(url)来创建work对象，加载的js文件不能跨域</font>;
- <font color='#f00'>如果使用了WebWorker，必须将html页面部署到服务器上</font>;

#### WebWorker原理
传统的线程可解释为轻量级进程，它和进程一样有独立的执行控制，一般情况下由操作系统负责调度。在HTML5中的多线程是指允许web程序<font color='#f0f'>并发的执行js脚本，每个脚本执行流都称为一个线程</font>，彼此间相互独立，并由浏览器中的js引擎负责管理

#### WorkerGlobalScope全局上下文
主页面html执行的全局上下文是window，而WebWorker执行的全局上下文是WorkerGlobalScope（不知道是啥），所以无法访问window对象，其属性与window中的属性类似；WorkerGlobalScope作用域下常见的属性如下
1. self：表示对WorkerGlobalScope对象本身的引用，专用线程中执行结果为DedicatedWorkerGlobalScope，共享线程中执行结果为SharedWorkerGlobalScope；
2. location：表示用于初始化这个工作线程的脚本资源的绝对 URL；
3. close：关闭当前线程，与terminate作用类似。步骤：删除这个工作线程事件队列中的所有任务，设置 WorkerGlobalScope 对象的 closing 状态为 true （这将阻止以后任何新的任务继续添加到事件队列中来）；
4. importScripts：可以通过importScripts批量加载js文件；
5. XMLHttpRequest：通过该对象发送Ajax请求；
6. setTimeout/setInterval：用法与window中一样；
7. addEventListener(onmessage)/postMessage：addEventListener方法可以代替onmessage

#### 共享线程（Shared Worker）和专用线程（Dedicated Worker）
区别：
1. 专用线程会使用<font color='red'>隐式</font>的 MessagePort 实例，MessagePort对象支持 HTML5 中多线程提供的所有功能。当专用线程被创建的时候，MessagePort 的端口消息队列便被主动启用;而共享线程必须显式使用。
2. 创建方法：专用线程只有URL一个参数；而共享线程创建是如果提供了第二个参数，那么这个参数将被用于作为这个共享线程的名称。
3. Woker对象和SharedWorker对象
<!-- ![drawImage](/Style/images/javascript/drawImage.png) -->

![这里写图片描述](/Style/images/javascript/worker.png)

![这里写图片描述](/Style/images/javascript/sharedWorker.png)

```
//专用线程
var worker=new Worker('worker.js');
worker.onmessage=function(){};
worker.postMessage('123');
worker.postMessage(data,[data]);//如果data为ArrayBuffer数据时，需要在第二个参数中指定它以提高传输效率；

//共享线程
var worker=new SharedWorker('SharedWorker.js','myShareWorker');
worker.port.addEventListener('message',function(e){});
worker.port.start();//在SharedWorker中使用addEventListener时，必须用worker.port.start()来启动这个端口
worker.port.postMessage('123');
```

#### WebWorker之常用API
worker线程从上到下同步运行它的代码，worker线程从上到下同步运行它的代码，如果worker注册了message事件处理程序，只要其有可能触发，worker就一直在内存中，不会退出，所以通信完毕后得手动在主线程中terminate或者子线程中close掉，但如果worker没有监听消息，那么当所有任务执行完毕（包括计数器）后，他就会退出。

1. postMeassge(data):
子线程与主线程互相传递消息使用的方法
	
```
//var worker =new Worker('worker.js');
//主线程传消息给子线程
worker.postMessage(data1);

//在worker.js文件中，子线程传消息给主线程
postMessage(data2);
```

2. terminate():
主线程中终止worker，此后无法再利用其进行消息传递。注意：一旦terminate后，无法重新启用，只能另外创建

```
//var worker =new Worker('worker.js');
worker.terminate();
```

3. onmessage:
主线程、子线程接收消息。可以用addEventListener代替

```
//var worker =new Worker('worker.js');
//主线程接收来自子线程的消息
 worker.onmessage=function(e){
	var data=e.data;    //e为MessageEvent对象
};

//在worker.js文件中，子线程接收来自主线程的消息
onmessage=function(e){
	var data=e.data;
};
```

4. MessageEvent：接收消息时用到，消息的实际传递内容为e.data;
5. message:当有消息发送时，触发该事件。且，消息发送是双向的，消息内容可通过data来获取;
6. error:出错处理。且错误消息可以通过e.message来获取。

```
//var worker =new Worker('worker.js');
worker.onerror = function(e){
    //打印出错消息
    console.log(e.message);
    //中断与子线程的联系
    worker.terminate();
}
```

#### WebWorker优缺点：
优点：
1. 可以加载一个JS进行大量的复杂计算而不挂起主进程，并通过postMessage，onmessage进行通信
2. 可以在worker中通过importScripts(url)加载另外的脚本文件
3. 可以使用 setTimeout(), clearTimeout(), setInterval(), and clearInterval()
4. 可以使用XMLHttpRequest来发送请求
5. 可以访问navigator的部分属性

缺点：
1. 不能跨域加载JS（html主页面可以）
2. worker内代码不能访问DOM
3. 各个浏览器对Worker的实现不大一致，例如FF里允许worker中创建新的worker,而Chrome中就不行
4. 无法加载本地资源

#### WebWorker应用
1. 后台计算：

```html
<!-- 创建一个共享线程用于接收从不同连接发送过来的指令,指令结果处理完成后将结果返回到各个不同的连接用户 -->

<!Doctype html>
<html>
	<head>
		<meta charset='utf-8' />
		<title>Calculate Number</title>	
	</head>
	<body>
		<div> The last common multiple and greateset common divisor is :
		<p id='result'>Please wait,computing......</p>
		</div>
<script type='text/javascript'>
	var worker=new Worker('js/webworker.js');
	worker.onmessage=function(e){//主线程接收来自子线程的消息
		document.getElementById('result').innerHTML=e.data;
	}
	worker.postMessage({first:100,second:50});//主线程向子线程发消息
	worker.onerror=function(){
			alert('线程出错！');//异常处理
		}
</script>
	</body>
</html>
```

```js
//webworker.js文件
onmessage=function(e){	//子线程接收来自主线程的消息
	var data=e.data;
	Calculate(data.first,data.second);
}

function Calculate(first,second){
	var common_divisor=divisor(first,second);
	var common_multiple=multiple(first,second);
    postMessage("Work done! " +
"The least common multiple is "+common_divisor
 +" and the greatest common divisor is "+common_multiple); //子线程向主线程发消息
}

function divisor(a, b) {
	if (a % b == 0) return b;
	else return divisor(b, a % b);
 }
 
 function multiple( a,  b) {
	var multiple = 0;
	multiple = a * b / divisor(a, b);
	return multiple;
 } 
```

2. 使用共享线程处理多用户并发连接
      由于线程的构建以及销毁都要消耗很多的系统性能，例如 CPU 的处理器调度，内存的占用回收等，在一般的编程语言中都会有线程池的概念，线程池是一种对多线程并发处理的形式，在处理过程中系统将所有的任务添加到一个任务队列，然后在构建好线程池以后自动启动这些任务。处理完任务后再把线程收回到线程池中，用于下一次任务调用。线程池也是共享线程的一种应用。 （Web2D中有专用线程实现线程池的用法，即创建4个专用线程）

```html
<!DOCTYPE html> 
<html> 
<head> 
<meta charset="UTF-8"> 
<title>Shared worker example: how to use shared worker in HTML5</title> 
 
<script>
 var worker = new SharedWorker('sharedworker.js'); //创建线程
 var log = document.getElementById('response_from_worker'); 
 worker.port.addEventListener('message', function(e) { 
	log.textContent =e.data; 
 }, false); 
 worker.port.start(); //启动端口
 worker.port.postMessage('ping from user web page..'); 
  
 //Send user input to sharedworker 
 function postMessageToSharedWorker(input) 
 { 
	 //Define a json object to construct the request 
	 var instructions={
			 instruction:input.value
		}; 
	 worker.port.postMessage(instructions); 
 } 
</script>
 
</head> 
<body onload=''> 
<output id='response_from_worker'> 
	How to use shared worker in HTML5!
</output> 
	Send instructions to shared worker: 
<input type="text" autofocus 			oninput="postMessageToSharedWorker(this);return false;"> 
</input> 
</body> 
</html>  
```

```js
/* 
* define a connect count to trace connecting 
* this variable will be shared within all connections 
*/ 
//sharedworker.js文件
var connect_number = 0; //记录连接到这个共享线程的总
onconnect = function(e) { 
	 connect_number =connect_number+ 1; 
	 //get the first port here 
	 var port = e.ports[0]; 
	 port.postMessage('A new connection! The current connection number is ' + connect_number); 
	 port.onmessage = function(e) { 
		//get instructions from requester 
		var instruction=e.data.instruction; 
		var results=execute_instruction(instruction); 
	   port.postMessage('Request: '+instruction+' Response '+results +' from shared worker...'); 
 }; 
}; 
 
/* 
* this function will be used to execute the instructions send from requester 
* @param instruction 
* @return 
*/ 
function execute_instruction(instruction) 
{ 
	var result_value; 
	//implement your logic here 
	//execute the instruction... 
	return result_value 
}
```

3.HTML5 线程代理

```html
<!DOCTYPE html> 
<html> 
<head> 
<meta charset="UTF-8"> 
<title>Shared worker example: how to use delegation worker in HTML5</title> 
 
<script>
	 var worker = new SharedWorker('delegationworker.js'); 
	 var log = document.getElementById('response_from_worker'); 
	 worker.onmessage = function (event) { 
	 //resolve the population from delegation worker 
	 var resultdata=event.data; 
	 var population=resultdata.total_population; 
	 var showtext='The total population of the word is '+population; 
 document.getElementById('response_from_worker').textContent = showtext; 
 }; 
</script>
 
</head> 
<body onload=''> 
<output id='response_from_worker'> 
	Shared worker example: how to use delegation worker in HTML5 
</output> 
</body> 
</html>
```

```js
/* 
* define the country list in the whole word 
* take following Array as an example 
*/ 
var country_list = ['Albania','Algeria','American','Andorra','Angola','Antigua','....']; 
 
// define the variable to record the population of the word 
var total_population=0; 
var country_size=country_list.length; 
var processing_size=country_list.length; 
 
for (var i = 0; i < country_size; i++) 
{ 
	 var worker = new Worker('subworker.js'); 
	 //wrap the command, send to delegations 
	 var command={command:'start',country:country_list[i]}; 
	 worker.postMessage(command); 
	 worker.onmessage = update_results; 
} 
 
/* 
* this function will be used to update the result 
* @param event 
* @return 
*/ 
 
function storeResult(event) 
{ 
	total_population += event.data; 
	processing_size -= 1; 
	if (processing_size <= 0) 
	{ 
		//complete the whole work, post results to web page 
		postMessage(total_population); 
	} 
}

//define the onmessage hander for the delegation 
onmessage = start_calculate; 
 
/* 
* resolve the command and kick off the calculation 
*/ 
function start_calculate(event) 
{ 
	var command=event.data.command; 
	if(command!=null&&command=='start') 
	{ 
		var coutry=event.data.country; 
		do_calculate(country); 
	} 
	onmessage = null; 
} 
 
/* 
* the complex calculation method defined here 
* return the population of the country 
*/ 
function do_calculate(country) 
{ 
	 var population = 0; 
	 var cities=//get all the cities for this country 
	 for (var i = 0; i < cities.length; i++) 
	{ 
		 var city_popu=0; 
	     // perform the calculation for this city 
		 //update the city_popu 
	 population += city_popu; 
	 } 
	 postMessage(population); 
	 close(); 
}
```
