import Vue from 'vue'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import App from './App'
import router from './router'
import store from './vuex'
import HeaderTop from './components/HeaderTop/HeaderTop.vue'
//引入mock 随机数据
import './mock/mockServer'
//自定义过滤器
import './filter/index'
//引入loading图片
import loading from './assets/imgs/loading.gif'
Vue.use(VueLazyload, {
  loading
})
//注册全局组件
Vue.component('HeaderTop',HeaderTop)
// 注册全局组件标签
Vue.component(Button.name, Button)  // <mt-button>
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
  /*components: { App },
  template: '<App/>'*/

  /*render: function (h) {
    return h(App)
  }*/
})
