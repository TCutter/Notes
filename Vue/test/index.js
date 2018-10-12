new Vue({
  el: '#app',
  data: {
      msg: 'hello vuejs'
  },
  // 这是第1个生命周期函数，表示实例完全被创建出来之前，会执行它
  beforeCreate: function () {
      console.log('01 beforeCreate', this.msg);
      //注意：在 beforeCreate 生命周期函数执行的时候，data 和 methods 中的 数据都还没有没初始化
  },

  // 这是第2个生命周期函数
  created: function () {
    debugger;
      console.log('02 created', this.msg);
      //注意：如果要调用 methods 中的方法，或者操作 data 中的数据，最早，只能在 created 中操作
  },

  // 这是第3个生命周期函数，表示 模板已经在内存中编辑完成了，但是尚未把模板渲染到页面中
  beforeMount: function () {
      debugger;
      console.log('03 beforeMount', this.msg);
      // 在 beforeMount 执行的时候，页面中的元素，还没有被真正替换过来，只是之前写的一些模板字符串
  },

  // 这是第4个生命周期函数，表示，内存中的模板，已经真实的挂载到了页面中，用户已经可以看到渲染好的页面了
  mounted: function () {
      console.log('04 mounted', this.msg);
      // 注意： mounted 是 实例创建期间的最后一个生命周期函数，当执行完 mounted 就表示，实例已经被完全创建好了
      // 此时，如果没有其它操作的话，这个实例，就静静的 躺在我们的内存中，一动不动
  }
});