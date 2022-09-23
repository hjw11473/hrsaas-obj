import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
console.log(req)
console.log(req.keys())
console.log(req('./dashboard.svg'))
// map返回一个新数组
// 长度和原来的一样
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
console.log(requireAll(req))
