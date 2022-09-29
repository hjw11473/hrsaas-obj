<template>
  <el-dialog
    title="新增角色"
    width="50%"
    :visible.sync="divvisible"
    :before-close="cloes"
  >
    <el-form ref="roleDialogForm" label-width="80px" :model="formDate">
      <el-form-item
        prop="name"
        label="角色"
        :rules="[
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
        ]"
      >
        <el-input v-model="formDate.name" />
      </el-form-item>
      <el-form-item prop="describe" label="描述">
        <el-input type="textarea" row="3" v-model.lazy="formDate.description" />
      </el-form-item>
    </el-form>
    <el-row
      slot="footer"
      type="flex"
      justify="center"
      align="middle"
      class="dialog-footer"
    >
      <el-button @click="cloes">取 消</el-button>
      <el-button v-loading="loading" @click="handleAdd">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRole,updateRole } from "@/api";
export default {
  props: {
    divvisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formDate: {
        name: "",
        description: "",
      },
      loading: false,
    };
  },
  methods: {
    cloes() {
      this.$emit("update:divvisible", false);
      this.$refs.roleDialogForm.resetFields();
      this.formDate = ''
    },
    async handleAdd() {
      try {
        await this.$refs.roleDialogForm.validate();
        this.loading = true;
        this.formDate.id ? await updateRole(this.formDate) : await addRole(this.formDate)
        this.$message.success(this.formDate.id ? "编辑成功" :"新增成功");
        this.$emit("refreshList");
        this.cloes();
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
