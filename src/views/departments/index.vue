<template>
  <div class="departments-container" v-loading="loading">
    <el-card>
      <treeTools :tree-node="company" :is-root="false" @addDept="handleAddDept" />
    </el-card>
    <el-tree :expand-on-click-node="false" :data="departs" :props="defaultProps" :default-expand-all="true"
      @node-click="handleNodeClick">
      <treeTools slot-scope="{data}" :tree-node="data" @addDept="handleAddDept" @editDept="editDept"
        @Refreshlist="getDepartments" />
    </el-tree>
    <adddept ref="addDpet" :dialog-visible.sync="dialogVisible" :tree-nodes="curerntNode"
      @contextmenu="getDepartments" />
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDepartmentsAPI } from '@/api'
import { tranListToTreeData } from './components/tree'
import adddept from './components/add-dept.vue'
export default {
  label: 'HrsaasIndex',
  components: { treeTools, adddept },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name'
      },
      dialogVisible: false,
      curerntNode: {},
      loading: false
    }
  },

  created() {

  },
  mounted() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    async getDepartments() {
      try {
        this.loading = true
        const { depts, companyManage, companyName } = await getDepartmentsAPI()
        console.log(depts);
        this.departs = tranListToTreeData(depts, '')
        this.company = { name: companyName, manager: companyManage, id: '' }
      } finally {
        this.loading = false
      }
    },
    handleAddDept(treeNode) {
      this.dialogVisible = true
      this.curerntNode = treeNode
    },
    // 编辑按钮，字传父事件
    editDept(item) {
      this.dialogVisible = true
      this.curerntNode = { ...item }
      this.$refs.addDpet.formData = { ...item }
    }
  }
}
</script>

<style lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;

  .el-tree {
    .el-tree-node__content {
      padding-right: 20px;
    }
  }
}
</style>
