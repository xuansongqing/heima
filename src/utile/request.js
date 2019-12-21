// axios拦截器
import axios from 'axios'
// 请求拦截器
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
  // config是要发送请求的配置信息
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
},
function () {})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
},
function () {

})

export default axios
