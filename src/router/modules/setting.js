import layout from '@/layout'

export default {
    path: '/setting',
    // name: 'setting',
    component: layout,
    children: [{
        path: '',
        component: () => import('@/views/setting'),
        meta: { title: '公司设置', icon: 'setting' },
        name: 'settingindex'
    }]
}