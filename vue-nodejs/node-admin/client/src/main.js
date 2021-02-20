import Vue from 'vue'
import App from './App.vue'
import http from './http'
import router from './router/router'
import store from './store/store'
import './plugins/element.js'
import home from "@/mock/home";
import mock from '@/mock/mock'
// import '../public/iconfont/iconfont.css'
import dateFormat from "@/utils";
Vue.config.productionTip = false
// Vue.prototype.dateFormat = dateFormat
Vue.prototype.$http = http

new Vue({
  router,
  store,
  home,
  render: h => h(App)
}).$mount('#app')
