import request from '@/utils/request'

// 临时获取一个用户信息
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method:'POST'
  })
}

// 获取员工基本信息
export function getUsermsg(id) {
  return request({
    url: `/sys/user/${id}`,
    method:'GET'
  })
}

