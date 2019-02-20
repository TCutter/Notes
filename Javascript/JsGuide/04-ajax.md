<!-- TOC -->

- [四、 Ajax](#四-ajax)
  - [Ajax](#ajax)
    - [创建实例](#创建实例)
    - [发送请求](#发送请求)
    - [接受响应](#接受响应)
    - [其他](#其他)
    - [实例](#实例)
  - [jQuery 中的 Ajax](#jquery-中的-ajax)
    - [$.get() 和 $.post()](#get-和-post)
    - [$.getScript() 和 $.getJSON()](#getscript-和-getjson)
    - [$.ajax(options)](#ajaxoptions)
  - [jsonp](#jsonp)
    - [jquery](#jquery)
    - [ES6](#es6)
  - [HTTP](#http)

<!-- /TOC -->
## 四、 Ajax
### Ajax
定义： 一种不用刷新整个界面就可以从服务器获取数据的技术

与ajax相似的概念：
 - flash；
 - java applet :用java编写，可以嵌入在网页中；
 - 框架（frame）：如果用一组框架构建了一个页面，可以只单独更新其中一个框架；
 - iframe：与frame的区别，frame是把网页切割成不同的牙面，而iframe是嵌入到页面中的一个新的页面；
 - XMLHttpRequest对象：驱动Ajax的引擎
 
#### 创建实例
XMLHttpRequest对象：一种用在服务器和客户端之间通讯的对象，依赖于javascript；
```js
var request = new XMLHttpRequest()
```

#### 发送请求
1. onreadysatechange
事件监听函数，每当服务器向客户端发送一个更新时就会触发 onreadysatechange 方法

2. open(type, url, async)
  - type: 请求类型
    - get：***将数据附加在URL上发送数据，对数据的大小有限制，而且由于数据在URL上所以安全性不够好。一般情况不发送数据是用GET。还有如果要对表单的结果页面加书签必须用GET***
     - post：***对数据大小的限制比GET宽松。数据作为请求的一部分发送，因此数据对用户不可见；***
  - url: 请求路径
  - async: true（异步）, false(同步)

3. send
  发送数据到服务器
  - Get 方法
    ```js
    request.onreadystatechange = dosomething
    request.open('GET', 'file.txt', true)
    request.send(null)
    ```

    连接在 url 后面的查询字符串必须使用 encodeURIComponent() 进行编码
  
  - Post 方法
    ```js
    request.onreadystatechange = dosomething
    request.open('POST', 'file.txt', true)
    xhr.setRequestHeader("Content-type", "application/json") // 数据类型信息
    request.send(JSON.stringify({name: 'cutter', age: '26'}))
    ```
    
4. setRequestHeader: 发送首部信息
    |name|说明|
    |--|--|
    |Accept|浏览器能够处理的数据类型|
    |Accept-Charset|浏览器能够显示的字符集|
    |Accept-Encoding|浏览器能够处理的压缩编码|
    |Accept-Language|浏览器当前设置的语言|
    |Content-Type|发送的数据类型|
    |Cookie|当前页面的 `Cookie`|
    |Host|发出请求的页面所在的域|
    |Referer|发出请求的页面的 URI|
    |User-Agent|浏览器的用户代理字符串|
    

#### 接受响应
1. readyState: 表示 ajax 当前的状态
  - 0: 未初始化，还没有调用 open 方法
  - 1: 正在加载，open 方法已调用，还没有调用 send 方法
  - 2: 加载完毕，send 方法已调用，请求开始
  - 3: 交互中，服务器正在发送响应
  - 4: 完成，响应发送完毕

2. status: 状态码
  - 200: 一切正常
  - 304: 没有被修改
  - 403: 禁止访问
  - 404: 没有被找到
  - 500: 服务器错误 

3. response
  - responseText: 文本数据
  - responseXML: XML 数据，当响应的内容类型是 text/xml 或 application/xml 时数据会保存到这个属性中
  - response: 其他（如设置  request.responseType = 'json', request.responseType = 'arraybuffer' 时）

#### 其他
1. load 事件（新的语法）
在接受到完整的数据响应时触发，可以用来代替 `onreadystatechange` 以及 `readyState` 的判断

2. FormData
3. 超时设定
```js
xhr.timeout = 1000; // 设置超时时间, 已 readyState 是否为 4 为超时临界点
xhr.ontimeout = function () {} //设置超时处理函数
```

#### 实例
一个完整的 ajax 例子

```js
var xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:8888/getPeople?name=cutter&age=25', true)
xhr.responseType = 'json'
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200 || xhr.status === 304) {
      var res = JSON.parse(xhr.response)
    } else {
      alert('Error')
    }
  }
}
xhr.send(null)
```

### jQuery 中的 Ajax

#### $.get() 和 $.post()

1. $.get(url[, data][, callback][, type])
  - data: 发送给服务器的数据会作为 QueryString 附加到 url 请求中
  - callback(data, textStatus): 载入成功时的回调函数, 只有 textStatus 为 success 时才会调用该函数
  - type: 服务器返回的内容格式，xml、HTML、json、text等

  实例
  ```js
  $.get('get.php', {
    name: 'cutter',
    age: 24
  }, function(data){
    console.log(data)
  },'json')
  ```

2. $.post()
  使用方法与 $.get() 相同

3. 数据格式
 - HTML：无需解析就可以直接插入到主页面，效率高；
 - XML：体积较大，解析速度慢，但是可移植性强；
 - JSON：简洁，解析速度快但容错率低
 结论：不需要与其他程序共享数据时，使用HTML；如果需要数据重用，JSON在性能和文件大小上占优；当远程程序未知时，使用XML文档。

 4. 区别:

 - GET请求会将参数跟在URL后进行传递，而POST请求则是作为HTTP消息的实体内容发送给Web服务器；
 - GET方式对传输大小有限制（通常不能大于2KB），而POST方式传递的数据量更多（理论上不受限制）；
 - GET方式请求的数据会被浏览器缓存起来，因此GET方式会带来安全性问题；

#### $.getScript() 和 $.getJSON()
1. `$.getScript()`
有时候无需在初始化的时候加载全部的JS文件，因此可以在需要的时候再动态加载
```
$(document.createElement("script")).attr("src","test.js").appendTo("head");//传统方法
$.getScript("test.js");//新方法
```
2. `$.getJson()`
用来加载JSON文件，用法与`$.getScript()`相同

#### $.ajax(options)

Jquery中最底层的Ajax实现，前面所有的ajax方法都可以用`$.ajax()`方法来代替。
结构：$.ajax(options);
参数：

 - url：请求地址；
 - type：请求方式（PUT或GET）,默认为GET；其他如PUT和和DELETE方式仅部分浏览器支持；
 - timeout：设置请求超时时间（毫秒）；
 - data：Object或JSON，发送到服务器的数据，如果已经不是字符串，将自动转换成字符串格式。GET请求中的数据将附在URL之后；
 - dataType：预期服务器返回的数据类型。如果不指定，Jquery将自动根据HTTP中的MIME信息返回responseXML或responseText;
 - beforeSend：请求发送前可修改XMLHttpRequest对象的函数，如果在beforeSend函数中返回false，可取消本次Ajax；
```
function (XMLHttpRequest){
   this;//调用本次Ajax请求时传递的options参数
}
```
 - complete：请求完成后调用的回调函数（无论请求成功与否）；
 - success：请求成功后调用的回调函数，有2个参数。
```
//data:由服务器返回，并根据dataType参数进行处理后的数据；textStatus:描述状态的字符串;
function (data，textStatus){
   this;//调用本次Ajax请求时传递的options参数
}
```
 - error：请求失败时被调用的函数，有3个参数。 

```
//XMLHttpRequest对象；textStatus：错误信息；errorThrown:捕获的错误对象;
function (XMLHttpRequest，textStatus，errorThrown){
	//通常情况下textStatus和errorThrown中只有一个包含信息
   this;//调用本次Ajax请求时传递的options参数
}
```

一个完整的Ajax请求实例：
```
 $.ajax({
        type: "Post",
        url: "/Venus/Viewer/GetPresentationStateInfo",
        data: JSON.stringify({ sopInstanceUid: SOPInstanceUID }),
        dataType: "json",
        contentType: 'application/json',
        async: false,    //是否异步
        success: function (data) {
            result = ParseJson(data);
            if (result && !isTomoRead) {
                globalController.fileGspsInfo.set(SOPInstanceUID, result);
            }
        }
    });
```

### jsonp
jsonp 是利用 script 标签可以跨域的特性来实现跨域的

jsonp 是前端的跨域，如果服务器已经设置了允许跨域，那么可以直接使用 ajax 而不用声明 jsonp; 反之，如果服务器没有设置允许跨域，那么前端需要使用 jsonp

使用方法

#### jquery
jsonp是一个非官方协议，它通过JavaScript Callback的形式实现跨域访问，由于Json只是一种含有简单括号结构的纯文本，因此许多通道都可以交换Json消息，而由于同源策略的限制，开发人员无法在与外部服务器通信的时候使用XMLHttpRequest，而JSONP是一种可以绕过同源策略的方法，从服务器端直接返回可执行的JS函数或者JS对象。
```
$.jsonp({
        type: "get",
        async: false,
        url: "http://" + proxyServiceInfo.CalledHostName + ":" + proxyServiceInfo.CalledPort + "/UIHVenusProxyService/service/SetSessionUserRefid",//跨域访问
        dataType: "jsonp",
        data: { userId: userRefid, ip: requestHostIp, port: requestHostPort },
        callbackParameter: "callback",
        error: function () {            
        }
    });
```
ajax和jsonp的实质核心、区别联系
1. ajax和jsonp的调用方式很像，目的一样，都是请求url，然后把服务器返回的数据进行处理，因此jquery和ext等框架都把jsonp作为ajax的一种形式进行了封装；
2. 实质不同：ajax的核心是通过xmlHttpRequest获取非本页内容
　　　　jsonp的核心是动态添加script标签调用服务器提供的js脚本
3. 区别联系：
  - 不在于是否跨域
  - ajax通过服务端代理一样跨域
  - jsonp也不并不排斥同域的数据的获取

jsonp的实现核心就是利用script标签的跨域能力。JSONP是一种非正式传输协议，该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了

#### ES6
```js
/*
options: 
  param (String) : 添加到 querystring 中的回调函数名称
*/

jsonp(url, options, callback(err, data));
```

### HTTP
  >TODO