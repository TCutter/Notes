<!-- TOC -->

- [Ajax](#ajax)
    - [get 请求](#get-请求)
    - [post 请求](#post-请求)
    - [JSONP](#jsonp)
    - [axiso (vue2.0)](#axiso-vue20)

<!-- /TOC -->
## Ajax

首先需要引入 [vue-resource.js](https://github.com/pagekit/vue-resource/tree/master)  插件

### get 请求
```js
this.$http.get(url,[config]).then(responce=>{
    var result = responce.body; // responce.body即为服务器返回的数据
},error=>{
    
})
```

### post 请求

```js
this.$http.post(url,body,[config]).then(responce=>{
    
},error=>{
    
})
```

### JSONP

由于浏览器的安全性限制，默认不允许Ajax发起跨域（协议不同、域名不同、端口号不同）的请求。

原理：通过动态创建script标签的形式，用script标签的src属性，代表api接口的url，因为script标签不存在跨域限制。JSONP只支持Get请求

```js
this.$http.post('www.baidu.com?id=1',[config]).then(responce=>{
    
},error=>{
    
})
```

[ajax请求](Demo/04-Ajax/get.html)

### axiso (vue2.0)