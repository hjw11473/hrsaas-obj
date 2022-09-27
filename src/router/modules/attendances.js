import layout from '@/layout'

export default {
    path: '/attendances',
    name: 'attendances',
    component: layout,
    children: [{
        path: '',
        component: () => import(/* webpackChunkName:"dashboard" */'@/views/attendances'),
        meta: { title:'考勤', icon: 'skill' }
    }]
}