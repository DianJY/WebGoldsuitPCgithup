<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项目申请</el-breadcrumb-item>
        <el-breadcrumb-item>代办工作</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="divtitle">
        <div class="divtitleSy">代办工作</div>
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
          <el-table-column prop="pState" label="状态" width="100"></el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="primary" @click="ApprovePstate(scope.row.pId)" round size="small">审核</el-button>
              <!-- @click="SubmitPstate(scope.row.pId)"     -->
              <el-button type="primary" round size="small" @click="xiangxi(scope.row.pId)">查看详细</el-button>
              <el-button type="primary" round size="small" @click="bohui(scope.row.pId)">驳回</el-button>
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

        <el-dialog title="驳回信息" :visible.sync="dialogVisible1" width="40%">
          <el-input type="textarea" v-model="rContent"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="Reject()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { GetprojectList } from "../../network/drafts";
import detailedinfo from "./detailedinfo";
import {
  RejectProjectInfo,
  ApprovalapproveProject,
} from "../../network/reject";
export default {
  created() {
    if (window.sessionStorage.getItem("rName") === "风控主管") {
      this.paging.State = "一审";
    } else if (window.sessionStorage.getItem("rName") === "分管领导") {
      this.paging.State = "二审";
    } else if (window.sessionStorage.getItem("rName") === "总经理") {
      this.paging.State = "三审";
    }
    this.GetprojectLists();
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
        eId: window.sessionStorage.getItem("eId"),
        IfSelect: 1,
        State: "待审核",
      },
      totle: 0,
      dialogFormVisible: false,
      project: {},
      dialogVisible: false,
      dialogVisible1: false,
      pId: "",
      rContent: "",

      eId: "",
      aOperation: "",

      pState: "",
    };
  },
  methods: {
    async GetprojectLists() {
      const res = await GetprojectList(this.paging);
      this.tableData = res.data.Data;
      this.totle = parseInt(
        (res.data.totle + this.paging.limit - 1) / this.paging.limit
      );
    },
    //下一页
    next() {
      this.paging.pageIndex++;
      this.GetprojectLists();
    },
    //上一页
    prev() {
      this.paging.pageIndex--;
      this.GetprojectLists();
    },
    //跳转
    handleCurrentChange(value) {
      this.paging.pageIndex = value;
      this.GetprojectLists();
    },
    //查看详细
    xiangxi(pId) {
      this.pId = pId;
      this.dialogVisible = true;
    },
    //点击驳回弹出框
    bohui(pId) {
      this.pId = pId;
      this.dialogVisible1 = true;
    },
    //驳回
    async Reject() {
      var Reject = {
        rContent: this.rContent,
        rState: "被驳回",
        rProcess: window.sessionStorage.getItem("rName"),
        pId: this.pId,
        eId: window.sessionStorage.getItem("eId"),
      };
      var Approval = {
        eId: window.sessionStorage.getItem("eId"),
        aOperation: window.sessionStorage.getItem("rName") + "复审",
        aContent: this.rContent,
        pId: this.pId,
      };
      var obj = {
        Reject: Reject,
        Approval: Approval,
      };
      const res = await RejectProjectInfo(obj);

      if (res.data !== 1) return this.$message.error("数据出错！");

      this.$message({
        message: "驳回成功！",
        type: "warning",
      });
      console.log(res.data);
      this.dialogVisible1 = false;
      this.GetprojectLists();
    },

    //审核
    async ApprovePstate(pId) {
      if (window.sessionStorage.getItem("rName") === "部门主管") {
        this.pState = "一审";
      } else if (window.sessionStorage.getItem("rName") === "风控主管") {
        this.pState = "二审";
      } else if (window.sessionStorage.getItem("rName") === "分管领导") {
        this.pState = "三审";
      } else if (window.sessionStorage.getItem("rName") === "总经理") {
        this.pState = "待发布";
      }
      this.eId = window.sessionStorage.getItem("eId");
      this.aOperation = window.sessionStorage.getItem("rName") + "复审";

      var obj = {
        pId: pId,
        pState: this.pState,
        eId: this.eId,
        aOperation: this.aOperation,
      };
      const res = await ApprovalapproveProject(obj);

      if (res === 0)   return this.$message({message: "数据错误", type: "warning",});


        this.$message({
          message: '审批成功！',
          type: 'success'
        });
     this.GetprojectLists();
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

