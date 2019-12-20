import zuoCe from './home/zuoce'
import header from './home/header'

export default {
  install (Vue) {
    Vue.component('zuoce', zuoCe)
    Vue.component('header-top', header)
  }

}
