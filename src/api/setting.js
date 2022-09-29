import request from '@/utils/request'

// 获取所有角色列表
export function GetRole(params) {
  return request({
    url: "/sys/role",
    params
  })
}

/** *
 * 新增角色
 * ***/
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data,
  })
}

/**
 * 修改角色
 * ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data,
  })
}


/**
 * 删除角色
 * ***/
export function deldateRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE',
  })
}


/**
 * 获取公司信息
 * **/
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}
