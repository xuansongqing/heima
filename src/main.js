import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import Component from './components/index'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from './utile/request'
import './permission'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)

Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
