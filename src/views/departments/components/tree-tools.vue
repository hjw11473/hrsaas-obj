<template>
  <el-row type="flex" justify="space-between" align="middle" style="height:40px;width:100%;">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <span style="margin-right:8px">{{ treeNode.manager }}</span>
        <el-dropdown @command="handleCommand">
          <span>操作<i class="el-icon-arrow-down el-icon--right" /></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add">添加子部门</el-dropdown-item>
            <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
            <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') {
        // add
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        // edit
        this.$emit('editDept', this.treeNode)
      } else {
        // del
        // 删除接口
        // async delDepartmentsAPI() {
        //   const res = await delDepartments()
        // }
        this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          type: 'warning'
        }).then((res) => {
          return delDepartments(this.treeNode.id)
        }).then(res => {
          this.$message.success('删除成功')
          this.$emit('Refreshlist')
        })
      }
    }
  }
}
</script>

<style>

</style>
