
<template>
  <div>
    <!--/* 还款代办 */-->
    <el-card class="box-card">
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>还款管理</el-breadcrumb-item>
        <el-breadcrumb-item>还款代办</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="divtitle">
        <div class="divtitleSy">还款代办</div>
      </div>
      <div class="bodyDiv">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="pType" label="项目类型" width="100"></el-table-column>
          <el-table-column prop="pNmae" label="项目名称" width="130"></el-table-column>
          <el-table-column label="借款金额" width="100">
            <template slot-scope="scope">
              <label>{{scope.row.Loanamount}} 元</label>
            </template>
          </el-table-column>
          <el-table-column label="期限" width="80">
            <template slot-scope="scope">
              <label>{{scope.row.pTerm}} 天</label>
            </template>
          </el-table-column>
          <el-table-column prop="PreheatDate" label="预热开始时间" width="180"></el-table-column>
          <el-table-column label="投资开始---投资结束" width="350">
            <template slot-scope="scope">
              <label>{{scope.row.InvestmentDate}}---{{scope.row.InvestmentEndDate}}</label>
            </template>
          </el-table-column>
          <el-table-column label="起息日---到期日" width="350">
            <template slot-scope="scope">
              <label>{{scope.row.ValueDate}}---{{scope.row.Duedate}}</label>
            </template>
          </el-table-column>
          <el-table-column prop="pState" label="状态" width="140"></el-table-column>
          <el-table-column label="操作" width="390">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="ApprovePstate(scope.row.pId)"
                round
                size="small"
              >申请还款</el-button>
              <!-- @click="SubmitPstate(scope.row.pId)"     -->
              <el-button type="primary" round size="small" @click="xiangxi(scope.row.pId)">查看详细</el-button>
              <el-button type="primary" round size="small" @click="Bohui(scope.row.pId)">查看驳回信息</el-button>
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

        <el-dialog title="项目详细信息" :visible.sync="dialogVisible2" width="70%">
          <el-table :data="RepayReject" stripe style="width: 100%">
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="jDateTime" label="日期" width="180"></el-table-column>
            <el-table-column prop="eName" label="操作人" width="140"></el-table-column>
            <el-table-column prop="reContent" label="原因"></el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  GetProjectList,
  ApplicationRepayment,
  GetRepaymentInfo,
  GetRepayRejectList,
} from "../../network/repaymentagency";
import detailedinfo from "./detailedinfo";
export default {
  created() {
    this.GetProjectListData();
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
      },
      totle: 0,
      dialogFormVisible: false,
      project: {},
      dialogVisible: false,
      dialogVisible1: false,
      pId: "",
      pName: "",
      dialogVisible2: false,
      RepayReject: [],
    };
  },
  methods: {
    async GetProjectListData() {
      var obj = {
        pageIndex: this.paging.pageIndex,
        limit: this.paging.limit,
        pName: this.pName,
      };

      const res = await GetProjectList(obj);

      this.tableData = res.data.Data;
      this.totle = res.data.totle;
    },
    //下一页
    next() {
      this.paging.pageIndex++;
      this.GetProjectListData();
    },
    //上一页
    prev() {
      this.paging.pageIndex--;
      this.GetProjectListData();
    },
    //跳转
    handleCurrentChange(value) {
      this.paging.pageIndex = value;
      this.GetProjectListData();
    },
    //查看详细
    xiangxi(pId) {
      this.pId = pId;
      this.dialogVisible = true;
    },

    async ApprovePstate(pId) {
      const state = await GetRepaymentInfo(pId);
      console.log(state.data.Data.reSate);
      if (
        state.data.Data.reSate == null ||
        state.data.Data.reSate == "已驳回"
      ) {
        const res = await ApplicationRepayment(pId);

        if (res.Data === 0) return this.$message.error("数据出错。。");

        return this.$message({
          message: "申请成功！",
          type: "success",
        });
      } else {
        return this.$message({
          message: "已审核，请勿重复提交！",
          type: "warning",
        });
      }
    },
    async Bohui(pId) {
      const res = await GetRepayRejectList(pId);
   
      this.RepayReject = res.data.Data;
       console.log( res);
      this.dialogVisible2 = true;
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
