/* eslint-disable eol-last */
// 实现对axios的二次封装
// eslint-disable-next-line quotes
import axios from "axios"
import { Message } from "element-ui"
import store from '@/store'
import router from "@/router"

const TimeOut = 1
// 对比时间是否超时
function checkTimeout() {
  const currentTime = Date.now() // 时间2 接口调用的真正时间
  const timeStamp = (currentTime - store.getters.tokenTime) / 1000
  return timeStamp > TimeOut // true的时候为超时 / false
}

// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config => {
  // console.log(config);
  if (store.getters.token) {
    // 时间2 - 时间1 > token超时的时间 ==> token登录失效
    if (checkTimeout()) {
      store.dispatch('user/emptytoken')
      router.push('/login')
      return Promise.reject(new Error('token 超时'))
    } 
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
  // 如果token被修改或者在401的时候直接返回；login
  if (error.response && error.response.status === 401) {
    store.dispatch('user/emptytoken')
    router.push('/login')
    Message.error('登录过期')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
}
)
export default service