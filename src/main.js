import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import HeaderTop from './components/HeaderTop/HeaderTop.vue'
//注册全局组件
Vue.component('HeaderTop',HeaderTop)
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
