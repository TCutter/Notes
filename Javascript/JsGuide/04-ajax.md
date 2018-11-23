<!-- TOC -->

- [四、 Ajax](#四-ajax)
  - [4.1 XMLHttpRequest](#41-xmlhttprequest)
    - [创建实例](#创建实例)
    - [发送请求](#发送请求)
    - [接受响应](#接受响应)
    - [实例](#实例)
  - [4.2 jQuery 中的 Ajax](#42-jquery-中的-ajax)
    - [$.get() 和 $.post()](#get-和-post)
    - [$.getScript() 和 $.getJSON()](#getscript-和-getjson)
    - [$.ajax(options)](#ajaxoptions)
  - [4.3 HTTP](#43-http)

<!-- /TOC -->
## 四、 Ajax
### 4.1 XMLHttpRequest
定义： 一种不用刷新整个界面就可以从服务器获取数据的技术

#### 创建实例

```js
var request = new XMLHttpRequest()
```

#### 发送请求
1. onreadysatechange
事件监听函数，每当服务器向客户端发送一个更新时就会触发 onreadysatechange 方法

2. open(type, url, async)
  - type: 请求类型
    - get
    - post
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
  
  - Post 方法
    ```js
    request.onreadystatechange = dosomething
    request.open('POST', 'file.txt', true)
    xhr.setRequestHeader("Content-type", "application/json") // 数据类型信息
    request.send(JSON.stringify({name: 'cutter', age: '26'}))
    ```
    
    setRequestHeader: 发送首部信息
    

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
  - responseXML: XML 数据
  - response: 其他（如设置  request.responseType = 'json', request.responseType = 'arraybuffer' 时）

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

### 4.2 jQuery 中的 Ajax

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

  区别：
    - get 最多只能发送 2KB 的数据，而 post 理论上不受限制
    - url 安全问题

#### $.getScript() 和 $.getJSON()
  动态加载文件

#### $.ajax(options)

1. 参数列表

|参数名称|说明|
| -- | -- |
|url|请求地址|
|type|请求方法（GET 或 POST）|
|timeout|请求超时时间|
|data|发送到服务器的数据|
|dataType|预期服务器返回的数据类型|
|success|参数 (data, textStatus), 调用成功的回调函数|
|error|参数 (XMLHttpRequest, textStatus, errorThrown), 调用失败的回调函数|
|complete|回调函数,不管成功或失败|

### 4.3 HTTP
  >TODO