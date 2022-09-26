import router from "./router";
import store from '@/store'
const whitelist = ['/login','404']

router.beforeResolve((to, from, next) => {
    // console.log(to);
    // console.log(from);
    // next(false)
    // 1,半判新token是否存在
    // 1.1存在处于登录状态是否去往登录页处于则去首页否则放行
    // 1.2不存在不处于登录状态是否处于白名单处于则放行否则登录页
    if (store.getters.token) {
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    } else {
        if (whitelist.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})