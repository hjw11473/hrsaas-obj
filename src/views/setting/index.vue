<template>
  <div class="app-container">
    <el-card shadow="always">
      <el-tabs v-model="activeName">
        <!-- 角色管理 -->
        <el-tab-pane label="用户管理" name="first">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="isshow = true">新增角色</el-button>
          <dialogFormVisible ref="addRole" :divvisible.sync="isshow" @refreshList="GetRoleAPI"></dialogFormVisible>
          <br />
          <br />
          <el-table v-loading="loading" :data="userlist" border style="width: 100%">
            <el-table-column type="index" label="序号" width="200">
            </el-table-column>
            <el-table-column prop="name" label="角色名称" width="180">
            </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column prop="address" label="操作" width="380" align="center">
              <template slot-scope="{row}">
                <el-button type="success" size="small">分配权限</el-button>
                <el-button type="primary" size="small" @click="bianji(row)">编辑</el-button>
                <el-button type="danger" size="small" @click="DELDate(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <br />
          <el-pagination background layout="prev, pager, next,sizes" style="float: right" :total="total"
            :current-page.sync="page.page" :page-size.sync="page.pagesize" :page-sizes="[2, 5, 10, 100]"
            @current-change="GetRoleAPI" @size-change="GetRoleAPI">
          </el-pagination>
        </el-tab-pane>

        <!-- 公司信息 -->
        <el-tab-pane label="配置管理" name="second">
          <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" type="info" show-icon :closable="false" />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input disabled style="width:400px" :placeholder="companymsg.name" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input disabled style="width:400px" :placeholder="companymsg.companyAddress" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input disabled style="width:400px" :placeholder="companymsg.mailbox" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" :rows="3" disabled style="width:400px" :placeholder="companymsg.remarks" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import dialogFormVisible from "./components/dialogFormVisible.vue";
import { GetRole, deldateRole, getCompanyInfo } from "@/api";
export default {
  components: {
    dialogFormVisible,
  },
  data() {
    return {
      activeName: "first",
      isshow: false, // 新增员工弹出框
      page: {
        // 传给获取所有角色列表接口的数组
        page: 1, // 页码
        pagesize: 10, // 每页条数
      },
      total: 0, // 获取所有角色的总数
      userlist: [], // 获取的所有角色列表信息
      loading: false,
      companymsg: {} // 公司信息
    };
  },
  created() {
    this.GetRoleAPI();
    this.getCompanyInfoAPI()
  },
  methods: {
    async GetRoleAPI() {
      try {
        this.loading = true;
        const { rows, total } = await GetRole(this.page);
        this.userlist = rows;
        this.total = total;
        if (total > 0 && rows.length === 0) {
          this.page.page--
          this.GetRoleAPI()
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
      // console.log(this.userlist);
    },
    bianji(row) {
      this.$refs.addRole.formDate = { ...row }
      this.isshow = true

    },
    async DELDate(row) {
      console.log(row);
      try {
        await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deldateRole(row.id)
        this.userlist = this.userlist.filter(item => item.id !== row.id)
        this.cloes();
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      } catch (err) {
        console.log(err);
      }
    },
    async getCompanyInfoAPI() {
      try {
        const companyId = this.$store.state.user.userinfo.companyId;
        const data = await getCompanyInfo(companyId)
        this.companymsg = data
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}
</style>
