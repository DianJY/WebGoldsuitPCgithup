<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>划账管理</el-breadcrumb-item>
        <el-breadcrumb-item>划账代办</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="divtitle">
        <div class="divtitleSy">已审批待发布</div>
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
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <!-- @click="SubmitPstate(scope.row.pId)" -->
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

        <el-dialog title="驳回详细信息" :visible.sync="dialogVisible1" width="70%">
          <el-table :data="RemitRejectList" stripe style="width: 100%">
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="eName" label="操作人" width="130"></el-table-column>
            <el-table-column prop="reContent" label="内容" ></el-table-column>
            <el-table-column prop="jDateTime" label="时间" width="300"></el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  GetListRemit,
  GetRemitInfo,
  SaveRemit,
  GetRemitRejectList,
} from "../../network/remit";
import detailedinfo from "./detailedinfo";
export default {
  created() {
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
        State: 1,
      },
      totle: 0,
      pId: "",
      dialogVisible: false,
      RemitRejectList: [],
      dialogVisible1: false,
    };
  },
  methods: {
    async GetprojectLists() {
      const res = await GetListRemit(this.paging);
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


    async Bohui(pId) {
      console.log(pId);
      const res = await GetRemitRejectList(pId);

      this.dialogVisible1 = true;
      this.RemitRejectList = res.data.Data
      console.log(res);
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

