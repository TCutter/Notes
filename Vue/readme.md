### route-view
在 router-view上加上一个唯一的key，来保证路由切换时都会重新渲染触发钩子
```html
<router-view :key="key"></router-view>
```
```js
computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
}
```

## 组件
> 一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝
```js
data: function () {
  return {
    count: 0
  }
}
```