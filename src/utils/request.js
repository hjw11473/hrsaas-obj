/* eslint-disable eol-last */
// 实现对axios的二次封装
// eslint-disable-next-line quotes
import axios from "axios"
// 通过axios创建axios实例
const service = axios.create({
  baseURL: '/dev',
  timeout: 5000
})
export default service