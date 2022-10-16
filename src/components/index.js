// import PageTools from './PageTools/index.vue'
// const components = [PageTools]


// export default {
//     install: function (Vue) {
//         components.forEach(item => {
//             Vue.component(item.name, item)
//         })
//     }
// }

import * as filters from "@/api/filters/index";

// 自定义正则
const fn = require.context('/', true, /\.vue$/)
const components = fn.keys().map(item => {
    return fn(item)
})

export default function (Vue) {
    components.forEach(item => {
        Vue.component(item.default.name, item.default)
    })
    Object.keys(filters).forEach(key => {
        // Vue.filter(过滤器名称，过滤器的方法)
        Vue.filter(key, filters[key])
    })
}
