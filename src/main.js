import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './plugins/element.js'
// 导入图标也在这里
/* 引入全局样式表 */
import './assets/css/global.css'
import axios from 'axios'
// 把axios包挂载到vue原型上
Vue.prototype.$http = axios
// 配置请求的根路径
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
