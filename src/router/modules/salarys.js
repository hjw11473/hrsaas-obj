import layout from '@/layout'

export default {
    path: '/salarys',
    name: 'salarys',
    component: layout,
    children: [{
        path: '',
        component: () => import(/* webpackChunkName:"dashboard" */'@/views/salarys'),
        meta: { title:'工资',icon:'money' }
    }]
}