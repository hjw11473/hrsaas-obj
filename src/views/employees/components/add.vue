<template>
    <el-dialog title="新增员工" :visible.sync="dialogFormVisible" :before-close="cloes">
        <!-- 表单 -->
        <el-form :model="formData" :rules="rules" label-width="120px" ref="newForm">
            <el-form-item label="姓名" prop="username">
                <el-input v-model="formData.username" style="width:80%" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="formData.mobile" style="width:80%" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker v-model="formData.timeOfEntry" style="width:80%" placeholder="请选择日期" />
            </el-form-item>
            <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select v-model="formData.formOfEmployment" style="width:80%" placeholder="请选择">
                    <el-option v-for="item in hireType" :key="item.id" :label="item.value" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="工号" prop="workNumber">
                <el-input v-model="formData.workNumber" style="width:80%" placeholder="请输入工号" />
            </el-form-item>
            <el-form-item label="部门" prop="departmentName">
                <el-input v-model="formData.departmentName" style="width:80%" placeholder="请选择部门"
                    @focus="getDepartmentsAPI" />
                <el-tree v-if="showTree" v-loading="loading" @node-click="selectNode" style="width: 80%;"
                    :data="treeData" default-expand-all :props="{ label: 'name' }" />
            </el-form-item>
            <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker v-model="formData.correctionTime" style="width:80%" placeholder="请选择日期" />
            </el-form-item>
        </el-form>
        <!-- footer插槽 -->
        <template v-slot:footer>
            <el-row type="flex" justify="center">
                <el-col :span="6">
                    <el-button size="small" @click="cloes">取消</el-button>
                    <el-button type="primary" size="small" @click="determine">确定</el-button>
                </el-col>
            </el-row>
        </template>
    </el-dialog>
</template>


<script>
import EnumHireType from '@/api/constant/employees'
import { getDepartmentsAPI, addEmployee } from '@/api';
import { tranListToTreeData } from '@/utils'
export default {
    props: {
        dialogFormVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            hireType: EnumHireType.hireType,
            formData: {
                username: '',
                mobile: '',
                formOfEmployment: '',
                workNumber: '',
                departmentName: '',
                timeOfEntry: '',
                correctionTime: ''
            },
            rules: {
                username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
                    min: 1, max: 4, message: '用户姓名为1-4位'
                }],
                mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
                    pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
                }],
                formOfEmployment: [{ required: true, message: '聘用形式不能为空' }],
                workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
                departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
                timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
            },
            treeData: [{ name: '行政部', manager: '刘备' }],
            showTree: false,
            loading: false
        };
    },
    created() {
        // this.getDepartmentsAPI()
    },
    methods: {
        // 关闭窗口
        cloes() {
            this.$emit("update:dialogFormVisible", false);
            this.$refs.newForm.resetFields();
            this.formData = {
                username: '',
                mobile: '',
                formOfEmployment: '',
                workNumber: '',
                departmentName: '',
                timeOfEntry: '',
                correctionTime: ''
            }
        },
        // 确定按钮
        async determine() {
            try {
                await this.$refs.newForm.validate()
                const res = await addEmployee(this.formData)
                this.$emit("update:dialogFormVisible", false);
                this.$message({
                    message: '新增成功',
                    type: 'success'
                });
                // console.log(res);
            } catch (err) {
                console.log(err);
            }
        },
        // 获取树状数据
        async getDepartmentsAPI() {
            try {
                this.loading = true
                this.showTree = true
                const { depts } = await getDepartmentsAPI()
                this.treeData = tranListToTreeData(depts, '')
            } catch (err) {
                console.log(err);
            } finally {
                this.loading = false
            }
        },
        selectNode(node) {
            this.showTree = false
            this.formData.departmentName = node.name
        }
    },
};
</script>

<style lang="scss" scoped>

</style>