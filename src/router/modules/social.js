import layout from '@/layout'

export default {
    path: '/social',
    name: 'social',
    component: layout,
    children: [{
        path: '',
        component: () => import(/* webpackChunkName:"dashboard" */'@/views/social'),
        meta: { title:'社保',icon:'table' }
    }]
}