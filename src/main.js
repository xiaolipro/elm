// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App' // ES6中可以省去文件后缀名
import router from './router'

import 'common/stylus/index.styl'

import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.config.productionTip = false

// eslint小技巧,单独为某代码块设置规则（这里允许直接new,不用赋值给对象
/* eslint-disable no-new */
new Vue({
  // el: '#app', // 挂载点
  // router, // 导入./router/index.js 实际上就是helloworld组件
  router,
  components: {
    App
  }, // ES5是App:App
  beforeCreate() {
    // console.log(this.msg);
  },
  created() {
    // console.log(this.msg); // you
  },
  template: '<App/>'
}).$mount('#app')
