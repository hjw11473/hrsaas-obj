import layout from '@/layout'

export default {
    path: '/approvals',
    name: 'approvals',
    component: layout,
    children: [{
        path: '',
        component: () => import(/* webpackChunkName:"dashboard" */ '@/views/approvals'),
        meta: { title:'审批', icon: 'tree-table' }
    }]
}