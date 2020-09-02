
<template>
  <div>
    <!--/* 还款代办 */-->
    <el-card class="box-card">
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>还款管理</el-breadcrumb-item>
        <el-breadcrumb-item>已还款</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="divtitle">
        <div class="divtitleSy">已还款</div>
      </div>
      <div class="bodyDiv">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="pName" label="项目名称" width="130"></el-table-column>
          <el-table-column prop="rClearing" label="还款清算日" width="130"></el-table-column>
          <el-table-column prop="rShould" label="应还本金" width="140"></el-table-column>
          <el-table-column prop="rInterest" label="应还利息" width="130"></el-table-column>
          <el-table-column prop="rSumMoney" label="应还总金额" width="140"></el-table-column>
          <el-table-column prop="rShareMoney" label="已还金额" width="140"></el-table-column>
          <el-table-column prop="reSate" label="状态" width="140"></el-table-column>
          <el-table-column label="操作" width="390">
            <template slot-scope="scope">
              <!-- @click="SubmitPstate(scope.row.pId)"-->
              <el-button type="primary" round size="small" @click="xiangxi(scope.row.pId)">查看详细</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          @next-click="next"
          @prev-click="prev"
          :page-size="paging.limit"
          :total="totle"
        ></el-pagination>
        <el-dialog title="项目详细信息" :visible.sync="dialogVisible" width="70%">
          <detailedinfo :pId="pId" v-if="dialogVisible"></detailedinfo>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  GetRepaymentList,
  ApprovalRepayment,
  RejectRepayment,
  Repayment,
} from "../../network/repaymenthasbeenmade";
import detailedinfo from "./detailedinfo";
export default {
  created() {
    this.GetRepaymentListData();
  },
  components: {
    detailedinfo,
  },
  data() {
    return {
      tableData: [],
      paging: {
        pageIndex: 1,
        limit: 5,
        i:1,
      },
      totle: 0,
      project: {},
      dialogVisible: false,
      pId: "",


    };
  },
  methods: {
    async GetRepaymentListData() {
      const res = await GetRepaymentList(this.paging);

      this.tableData = res.data.Data;
      this.totle = res.data.totle;
    },
    //下一页
    next() {
      this.paging.pageIndex++;
      this.GetRepaymentListData();
    },
    //上一页
    prev() {
      this.paging.pageIndex--;
      this.GetRepaymentListData();
    },
    //跳转
    handleCurrentChange(value) {
      this.paging.pageIndex = value;
      this.GetRepaymentListData();
    },
    //查看详细
    xiangxi(pId) {
      this.pId = pId;
      this.dialogVisible = true;
    },
    //弹出驳回
    reject(rId) {
      this.dialogVisible1 = true;
      this.rId = rId;
    },

  
  }
    
  
};
</script>

<style scoped>
.el-table__header {
  width: 100% !important;
}
.el-table__body {
  width: 100% !important;
}
.spanl {
  position: absolute;
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
.bodyDiv {
  width: 100%;
  height: 300px;
  margin: 10px;
}
</style>
