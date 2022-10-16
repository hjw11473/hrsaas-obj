<template>
    <div class="dashboard-container">
        <div class="app-container">
            <el-card class="box-card">
                <el-tabs v-model="activeName" @tab-click="tabclick">
                    <el-tab-pane lazy label="登录账户设置" name="first">
                        <el-form ref="form" :model="form" label-width="200px" :rules="rules">
                            <el-form-item label="姓名:" prop="username">
                                <el-input v-model="form.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码:" prop="password">
                                <el-input type="password" v-model="form.password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="update">更新</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane lazy label="个人详情" name="second">
                        <userinfo></userinfo>
                    </el-tab-pane>
                    <el-tab-pane lazy label="岗位信息" name="kshdj">
                        <jobinfo></jobinfo>
                    </el-tab-pane>

                </el-tabs>
            </el-card>
        </div>
    </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api'
import jobinfo from '@/views/employees/components/job-info.vue'
import userinfo from '@/views/employees/components/user-info.vue'
import Cookies from 'js-cookie'

// import RichText from '../components/RichText.vue'
export default {
    name: 'HrsaasIndex',
    components: {
        userinfo,
        jobinfo
    }, 
        data() {
        return {
            activeName: Cookies.get('activeName') || 'first',
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入员工名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '名称应在3个到10个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输员工入密码', trigger: 'blur' },
                    { min: 6, message: '密码长度最小6位', trigger: 'blur' }
                ],
            }
        };
    },
    created() {
        this.getUserDetailByIdAPI()
    },
    methods: {
        // 获取当前点击用户的账号信息
        async getUserDetailByIdAPI() {
            const res = await getUserDetailById(this.$route.params.id)
            console.log(res);
            this.form = res
        },
        // 更新账户信息
        async update() {
            try {
                await this.$refs.form.validate((adopt, Failed) => {
                    console.log(adopt);
                    console.log(Failed);
                })
                const res = await saveUserDetailById(this.form)
                this.$message.success('更新成功')
                console.log(res);
            } catch (err) {
                console.log(err);
            }

        },
        // 点击tabs储存cookie数据
        tabclick() {
            Cookies.set('activeName', this.activeName)
        }
    },
};
</script>

<style lang="scss" scoped>

</style>

<style  scoped>

</style>