<template>
  <div>
    <el-card class="box-card">
      <div class="divtitle">
        <div class="divtitleSy">借款申请管理</div>
      </div>
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>借款申请管理</el-breadcrumb-item>
        <el-breadcrumb-item>借款申请管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bodyDiv">
        <div>
          <el-form ref="form" label-width="80px">
            <el-form-item>
              <label>借款人姓名：</label>
              <el-input style="width:500px;margin:0px 10px" v-model="params.UserName"></el-input>
              <el-button @click="Fuzzyquery">查询</el-button>

              <el-radio
                style="margin-left:150px;"
                @change="change"
                value="待处理"
                label="待处理"
                v-model="params.zt"
              ></el-radio>
              <el-radio label="已处理" value="已处理" @change="change" v-model="params.zt"></el-radio>
              <el-radio label="全部" value="全部" @change="change" v-model="params.zt"></el-radio>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="lid" label="借款申请Id" width="180"></el-table-column>
            <el-table-column prop="uType" label="用户类型" width="100"></el-table-column>
            <el-table-column prop="uName" label="借款人姓名/企业名称" width="180"></el-table-column>
            <el-table-column prop="uIdcard" label="借款人证号" width="180"></el-table-column>
            <el-table-column prop="uPhone" label="借款人手机号" width="180"></el-table-column>
            <el-table-column prop="ubnumber" label="借款人存管账号" width="180"></el-table-column>
            <el-table-column prop="lPrice" label="借款金额（元）" width="150"></el-table-column>
            <el-table-column prop="lDateTime" label="申请日期" width="180"></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  v-show="scope.row.IState ==='待处理'"
                  @click="clickstate(scope.row.lid)"
                  round
                  type="primary"
                  size="small"
                >受理</el-button>
                <el-button v-show="scope.row.IState ==='已处理'" round type="success" size="small">创建项目</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              @next-click="next"
              @prev-click="prev"
              :page-size="params.limit"
              :total="totle"
            ></el-pagination>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { LoanList, UpdateState } from "../../network/loan";
export default {
  created() {
    this.GetLoanListTo();
  },
  data() {
    return {
      tableData: [],
      params: {
        zt: "待处理",
        pageIndex: 1,
        limit: 5,
        UserName: "",
      },
      totle: 0,
    };
  },
  methods: {
    async GetLoanListTo() {
      const res = await LoanList(this.params);
      this.totle = res.data.totle;
      this.tableData = res.data.Data;
      this.totle = parseInt(
        (res.data.totle + this.params.limit - 1) / this.params.limit
      );
      console.log(this.tableData);
    },
    //下一页
    next() {
      this.params.pageIndex++;
      this.GetLoanListTo();
    },
    //上一页
    prev() {
      this.params.pageIndex--;
      this.GetLoanListTo();
    },
    //跳转
    handleCurrentChange(value) {
      this.params.pageIndex = value;
      this.GetLoanListTo();
    },
    //模糊查询
    Fuzzyquery() {
      this.params.pageIndex = 1;
      this.GetLoanListTo();
    },
    //单选框改变事件
    change(e) {
      this.params.zt = e;
      this.GetLoanListTo();
    },
    //受理
    async clickstate(e) {
      const res = await UpdateState(e);

      if (res === 0) return this.$message("受理失败！");


      this.$message({
        showClose: true,
        message: "受理成功！",
        type: "success",
      });
        this.params.pageIndex = 1;
       this.GetLoanListTo();
    },
  },
};
</script>

<style>
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
.bodyDiv {
  width: 100%;
  height: 500px;
  margin: 15px;
}
</style>