import zuoCe from './home/zuoce'
import header from './home/header'
import breadCrumbs from '../common/bread-crumbs.vue'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('zuoce', zuoCe) // 注册一个全局组件
    Vue.component('header-top', header) // 注册一个全局组件
    Vue.component('bread-crumbs', breadCrumbs) // 注册一个全局面包屑
    Vue.component('quill-editor', quillEditor) // 注册一个全局的富文本编辑
  }
}
