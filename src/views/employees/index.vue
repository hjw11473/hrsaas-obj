<template>
  <div id="app">
    <div class="app-container">
      <PageTools type="info" :isshow="isshow">
        <template #before>
          <span slot="before">共166条记录</span>
        </template>
        <template #after>
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="ExportTable">导出</el-button>
          <el-button size="small" type="primary" @click="isshow1 = true">新增员工</el-button>
        </template>
      </PageTools>

      <!-- 新增组件 -->
      <add :dialogFormVisible.sync="isshow1"></add>

      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table border :data="list" style="width: 100%" header-align="center">
          <el-table-column align="center" label="序号" sortable="" width="80" type="index" />
          <el-table-column align="center" prop="username" label="姓名" />
          <el-table-column align="center" prop="staffPhoto" label="头像">
            <template slot-scope="{ row }">
              <el-image @click="genQrcode(row.staffPhoto)" style="width: 80px; height: 80px; margin-bottom: -4px"
                :src="row.staffPhoto" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="workNumber" label="工号" />
          <el-table-column align="center" prop="formOfEmployment" label="聘用形式" :formatter="formatter" />
          <el-table-column align="center" prop="departmentName" label="部门" />
          <el-table-column align="center" prop="timeOfEntry" label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="enableState" label="账户状态">
            <template slot-scope="{ row }">
              <el-switch :value="row.enableState === 1"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="seeinformation(row)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="dellist(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination background layout="prev, pager, next, sizes, total" :current-page.sync="page.page"
            :page-size.sync="page.size" :page-sizes="[5, 10, 15, 20]" :total="total"
            @current-change="getEmployeeListAPI" @size-change="getEmployeeListAPI" />
        </el-row>
      </el-card>
    </div>
    <touxiang ref="canves" :dialogFormVisibless.sync="isshow2"></touxiang>

  </div>
</template>

<script>
import PageTools from "@/components/PageTools/index.vue";
import { getEmployeeList, delEmployee } from "@/api";
import EnumHireType from "@/api/constant/employees";
import add from "./components/add.vue";
import touxiang from "./components/touxiang.vue";
var QRCode = require('qrcode')
export default {
  components: {
    PageTools,
    add,
    touxiang,
  },
  data() {
    return {
      page: {
        page: 1, // 当前页码
        size: 10,
      },
      list: [], // 接数据的
      total: 0,
      isshow: true,
      isshow1: false,
      isshow2: false,
      loading: false,
      hireType: EnumHireType.hireType,
    };
  },
  created() {
    this.getEmployeeListAPI();
  },
  methods: {
    // 获取列表渲染
    async getEmployeeListAPI() {
      try {
        this.loading = true;
        const { total, rows } = await getEmployeeList(this.page);
        console.log(rows);
        this.total = total;
        this.list = rows;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    formatter(row, column, cellValue) {
      const res = this.hireType.find((item) => item.id === cellValue);
      return res ? res.value : "";
    },
    // 删除功能
    async dellist(row) {
      console.log(row);
      console.log(this.list);
      try {
        this.$confirm("此操作将永久删除该员工信息, 是否继续?", "提示", {
          type: "warning",
        });
        await delEmployee(row.id);
        // this.list = this.list.filter(item => item.id !== id)
        this.getEmployeeListAPI();
        // this.$message.success('删除成功')
      } catch (err) {
        console.log(err);
      }
    },
    // 导出表格
    async ExportTable() {
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total,
      });
      const exportExcelpath = {
        手机号: "mobile",
        姓名: "username",
        入职日期: "timeOfEntry",
        聘用形式: "formOfEmployment",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
      };
      const header = Object.keys(exportExcelpath);
      // console.log(header);
      const data = rows.map((item) => {
        return header.map((h) => {
          // 处理聘用数据是数字的问题
          if (h === "聘用形式") {
            // const find = this.hireType.filter(k => k.id === item[exportExcelpath[h]])
            // console.log(find[0]);
            // return find[0] ? find[0].value : '未知'
            const find = this.hireType.find(
              (k) => k.id === item[exportExcelpath[h]]
            );
            return find ? find.value : "未知";
          }
          return item[exportExcelpath[h]];
        });
      });
      // 使用文件懒加载
      import("@/vendor/Export2Excel").then((res) => {
        // console.log(res);
        res.export_json_to_excel({
          header, //表头 必填
          data, //具体数据 必填
          filename: "黑马工作列表", //非必填
          autoWidth: true, //非必填
          bookType: "xlsx", //非必填
        });
      });
    },
    // 查看信息
    seeinformation(row) {
      this.$router.push("/employees/detall/" + row.id);
    },
    async genQrcode(photo) {
      if (!photo) return this.$message.error('暂无头像')
      this.isshow2 = true
      // this.$nextTick(() => {
      await this.$nextTick()
      var canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, photo, function (error) {
        if (error) console.error(error)
        console.log('success!');
      })
      // })
    }
  },
};
</script>

<style lang="scss" scoped>
#app {
  padding: 20px;
}
</style>
