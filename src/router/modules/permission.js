import layout from '@/layout'

export default {
    path: '/permission',
    name: 'permission',
    component: layout,
    children: [{
        path: '',
        component: () => import(/* webpackChunkName:"dashboard" */'@/views/permission'),
        meta: { title:'权限管理' ,icon:'lock'}
    }]
}