import request from '@/utils/request'

// 用户登录
export function loginAPI(data) {
    return request({
        url: '/sys/login',
        method:'POST',
        data
    })
} 