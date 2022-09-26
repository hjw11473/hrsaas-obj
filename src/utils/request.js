/* eslint-disable eol-last */
// 实现对axios的二次封装
// eslint-disable-next-line quotes
import axios from "axios"
import { Message } from "element-ui"
import store from '@/store'
// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config => {
  // console.log(config);
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  // 1.考虑把那些数据跑出去
  // 2.接口成功并且业务成功
  // 3.没有成功Promise.reject跑出错误
  const { message, data, success } = response.data
  if (success) { // 如果请求成功
    return data
  }
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
}
)
export default service