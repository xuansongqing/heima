// axios拦截器
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import JsonBigin from 'json-bigint'
// 请求拦截器
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
  // config是要发送请求的配置信息
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
},
function () {})

// 处理关闭打开评论
axios.defaults.transformResponse = [function (data) {
  return JsonBigin.parse(data)
}]

// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
},
function (error) {
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求数据错误'
      break
    case 403:
      message = 'refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      // message = '服务器数据库异常'
      window.localStorage.removeItem('user-token')
      router.push('/login')
      break
    default:
      break
  }
  Message({ message })// 提示信息
})

export default axios
