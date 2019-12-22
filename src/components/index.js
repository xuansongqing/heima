import zuoCe from './home/zuoce'
import header from './home/header'
import breadCrumbs from '../common/bread-crumbs.vue'

export default {
  install (Vue) {
    Vue.component('zuoce', zuoCe)
    Vue.component('header-top', header)
    Vue.component('bread-crumbs', breadCrumbs)
  }

}
