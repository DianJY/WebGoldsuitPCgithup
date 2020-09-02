<template>
  <div>
    <el-card class="box-card">
      <div class="divtitle">
        <div class="divtitleSy">日志管理</div>
      </div>
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>日志管理</el-breadcrumb-item>
        <el-breadcrumb-item>还款日志管理</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bodyDiv">
        <el-form :model="numberValidateForm" class="elfrom">
          <el-row :span="24">
            <el-col :span="8">
              <el-form-item label="操作人">
                <el-input
                  type="text"
                  v-model="numberValidateForm.czr"
                  placeholder="请输入操作人"
                  style="width:300px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="操作时间">
                <el-date-picker
                  style="width:200px;"
                  v-model="numberValidateForm.czdateK"
                  type="date"
                  placeholder="开始日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
                <span style="margin-left:15px;margin-right:15px;">至</span>
                <el-date-picker
                  style="width:200px;"
                  v-model="numberValidateForm.czdateJ"
                  type="date"
                  placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <div>
            <el-button type="success" @click="mohu" size="small">查询</el-button>
            <el-button size="small" @click="test">重置</el-button>
          </div>
        </el-form>

        <!-- 表格数据列表 -->
        <el-table :data="rizhiList" border stripe>
          <el-table-column prop="rjId" v-if="hidden" width="80" align="center"></el-table-column>
          <el-table-column prop="rId" v-if="hidden" width="80" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="pNmae" label="还款项目" width="200" align="center"></el-table-column>
          <el-table-column prop="eName" label="操作人" width="200" align="center"></el-table-column>
          <el-table-column prop="ReDateTime" label="操作时间" width="250" align="center">
            <template slot-scope="scope">{{scope.row.ReDateTime | dataFormart}}</template>
          </el-table-column>
          <el-table-column prop="reSate" label="内容" width="200" align="center"></el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="data">
              <el-button size="small" @click="detaile(data.row.rId)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="新闻公告详情" :visible.sync="dialogVisible" width="70%">
          <el-table :data="huankuanList" border stripe>
            <el-table-column prop="reId" v-if="hidden" width="80" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column prop="pNmae" label="项目名称" width="200" align="center"></el-table-column>
            <el-table-column prop="UserName" label="投资人" width="200" align="center"></el-table-column>
            <el-table-column prop="ReDateTime" label="还款时间时间" width="250" align="center">
              <template slot-scope="scope">{{scope.row.ReDateTime | dataFormart}}</template>
            </el-table-column>
            <el-table-column prop="reMoney" label="还款金额" width="200" align="center"></el-table-column>
          </el-table>

          <!-- 分页控件 -->
          <el-pagination
            style="margin-top:20px; "
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="xqInfo1.pagenum1"
            :page-sizes="[1, 2, 3, 4,5]"
            :page-size="xqInfo1.pagesize1"
            :total="total1"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </el-dialog>

        <!-- 分页控件 -->
        <el-pagination
          style="margin-top:20px; "
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 3, 4,5]"
          :page-size="queryInfo.pagesize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getReimbursementInfoService,
  getRepaymentesService,
} from "../../network/rizhi";
export default {
  created() {
    this.getlogInfoList();
  },
  data() {
    return {
      rizhiList: [],
      huankuanList: [],
      dialogVisible: false,
      hidden: false,
      numberValidateForm: {
        czr: "",
        czdateK: "",
        czdateJ: "",
      },
      queryInfo: {
        pagenum: 1,
        pagesize: 3,
      },
      total: 1,
      xqInfo1: {
        pagenum1: 1,
        pagesize1: 3,
        rids: "",
      },
      total1: 1,
    };
  },

  methods: {
    async getlogInfoList() {
      const res = await getReimbursementInfoService(
        this.queryInfo.pagenum,
        this.queryInfo.pagesize,
        this.numberValidateForm
      );
      this.rizhiList = res.data.data;
      this.total = res.data.totle;
    },
    test() {
      (this.numberValidateForm.czr = ""),
        (this.numberValidateForm.czdateK = ""),
        (this.numberValidateForm.czdateJ = "");
    },
    handleSizeChange(newValue) {
      this.queryInfo.pagesize = newValue;
      this.getlogInfoList();
    },
    handleCurrentChange(newValue) {
      this.queryInfo.pagenum = newValue;
      this.getlogInfoList();
    },
    handleSizeChange1(newValue) {
      this.xqInfo1.pagesize1 = newValue;
      this.detaile();
    },
    handleCurrentChange1(newValue) {
      this.xqInfo1.pagenum1 = newValue;
      this.detaile();
    },
    async mohu() {
      this.getlogInfoList();
    },
    async detaile(rId) {
      if (this.xqInfo1.rids == "") {
        this.xqInfo1.rids = rId;
      }
      this.dialogVisible = true;
      console.log(this.xqInfo1.rids);
      const res = await getRepaymentesService(
        this.xqInfo1.pagenum1,
        this.xqInfo1.pagesize1,
        this.xqInfo1.rids
      );
      console.log(res);
      this.huankuanList = res.data.data;
      this.total1 = res.data.totle;
    },
  },
};
</script>

<style scoped>
.bodyDiv {
  width: 100%;
  height: 700px;

  margin: 20px;
}
.divtitle {
  width: 100%;
  height: 40px;
  background-color: rgb(239, 251, 255);
}
.divtitleSy {
  height: 20px;
  font-size: 18px;
  line-height: 40px;
  width: 200px;
  color: rgb(37, 124, 255);
  margin-left: 10px;
}
.elfrom {
  margin: 20px;
}
</style>