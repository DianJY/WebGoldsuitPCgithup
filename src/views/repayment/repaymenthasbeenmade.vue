
<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>还款管理</el-breadcrumb-item>
        <el-breadcrumb-item>还款已办</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="divtitle">
        <div class="divtitleSy">还款已办</div>
      </div>
      <div class="bodyDiv">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="pName" label="项目名称" width="130"></el-table-column>
          <el-table-column prop="rClearing" label="还款清算日" width="130">
                <template slot-scope="scope">{{scope.row.rClearing | dataFormart}}</template>
          </el-table-column>
          <el-table-column prop="rShould" label="应还本金" width="140"></el-table-column>
          <el-table-column prop="rInterest" label="应还利息" width="130"></el-table-column>
          <el-table-column prop="rSumMoney" label="应还总金额" width="140"></el-table-column>
          <el-table-column prop="rShareMoney" label="已还金额" width="140"></el-table-column>
          <el-table-column prop="reSate" label="状态" width="140"></el-table-column>
          <el-table-column label="操作" width="390">
            <template slot-scope="scope">
              <el-button
                type="primary"
                v-show="scope.row.reSate=='待审核'"
                @click="Approval(scope.row.rId)"
                round
                size="small"
              >审核</el-button>
              <el-button
                type="primary"
                v-show="scope.row.reSate=='已审核'"
                @click="haikuan(scope.row)"
                round
                size="small"
              >还款</el-button>
              <!-- @click="SubmitPstate(scope.row.pId)"-->
              <el-button type="primary" round size="small" @click="xiangxi(scope.row.pId)">查看详细</el-button>
              <el-button type="primary" @click="reject(scope.row.rId)" round size="small">驳回</el-button>
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

        <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%">
          <el-input type="textarea" v-model="reContent"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="qdreject()">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="还款信息" :visible.sync="dialogVisible3" width="30%">
          <div style="width: 100%; height: 100%;margin:10px auto; text-align: center;">
            <p style="font-size: 20px;margin:10px">
              确认通过
              <label style="color:rgb(51,204,211)">{{Rep.pName}}</label>的划账申请吗?
            </p>
            <p style="font-size:18px;">还款总结金额：{{Rep.rSumMoney}}元</p>
            <p style="font-size:18px;">服务费：{{Rep.rInterest}}元</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible3 = false">取 消</el-button>
            <el-button type="primary" @click="RepaymentClick()">确 定</el-button>
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
        i:0,
      },
      totle: 0,
      project: {},
      dialogVisible: false,
      pId: "",
      reContent: "",
      dialogVisible1: false,
      rId: "",
      dialogVisible3: false,
      Rep: {
        pName: "",
        rSumMoney: "",
        rInterest: "",
        pId: "",
        rId: "",
      },
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
    //弹出驳回
    async qdreject() {
      var repInfo = {
        rid: this.rId,
        eId: window.sessionStorage.getItem("eId"),
        reContent: this.reContent,
      };
      const res = await RejectRepayment(repInfo);

      if (res.data.Data === 0) return this.$message.error("数据出错！");

      this.$message({
        message: "驳回成功!",
        type: "warning",
      });
      this.GetRepaymentListData();
      this.dialogVisible1 = false;
    },
    //审批
    async Approval(rId) {
      var obj = {
        rId: rId,
        eId: window.sessionStorage.getItem("eId"),
      };
      const res = await ApprovalRepayment(obj);
      if (res.data.Data === 0) return this.$message.error("数据出错！");

      this.$message({
        message: "审核成功！",
        type: "success",
      });
      this.GetRepaymentListData();
    },
    //还款
    haikuan(row) {
      this.Rep.pName = row.pName;
      this.Rep.rSumMoney = row.rSumMoney;
      this.Rep.rInterest = row.rInterest;
      this.Rep.pId = row.pId;
      this.Rep.rId = row.rId;

      this.dialogVisible3 = true;
    },
    //点击还款
    async RepaymentClick() {
      var obj = {
        rId: this.Rep.rId,
        pId: this.Rep.pId,
        eId: window.sessionStorage.getItem("eId"),
      };
      const res = await Repayment(obj);

      if (res.data === 0) return this.$message.error("数据出错！");

      this.$message({
        message: "还款成功！",
        type: "success",
      });
        this.GetRepaymentListData();
      this.dialogVisible3 = false;
    },
  },
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
