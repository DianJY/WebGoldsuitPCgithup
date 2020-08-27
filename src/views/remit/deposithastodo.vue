<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>划账管理</el-breadcrumb-item>
        <el-breadcrumb-item>划账已办</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="divtitle">
        <div class="divtitleSy">划账已办</div>
      </div>
      <div class="bodyDiv">
        <el-table :data="RemitList" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="uName" label="借款人姓名/企业名称" width="180"></el-table-column>
          <el-table-column prop="bNumber" label="借款人存管账号" width="180"></el-table-column>
          <el-table-column prop="ReDateTime" label="划账时间" width="200"></el-table-column>
          <el-table-column prop="ReState" label="划账状态" width="180"></el-table-column>
          <el-table-column prop="ReMoney" label="划账金额" width="180"></el-table-column>
          <el-table-column label="操作" width="290">
            <template slot-scope="scope">
              <!-- @click="SubmitPstate(scope.row.pId)" -->
              <el-button
                type="primary"
                v-show="scope.row.ReState === '待划账'"
                round
                size="small"
                @click="SubmitPstate(scope.row.rId)"
              >审批</el-button>
              <el-button
                type="primary"
                v-show="scope.row.ReState === '已审核'"
                @click="Remitaccount(scope.row.pId)"
                round
                size="small"
              >划账</el-button>
              <el-button type="primary" round size="small" @click="Bohuis(scope.row.rId)">驳回</el-button>
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
      <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%">
        <label>反驳内容：</label>
        <el-input type="textarea" v-model="conten"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="Bohui()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>

    <el-dialog title="划账信息" :visible.sync="dialogVisible2" width="30%">
      <div style="width: 100%; height: 100%;margin:10px auto; text-align: center;">
        <p style="font-size: 20px;margin:10px">
          确认通过
          <label style="color:rgb(51,204,211)">{{huazhanginfo.pNmae}}</label>的划账申请吗?
        </p>
        <p style="font-size:18px;">划账金额：{{huazhanginfo.Actual}}元</p>
        <p style="font-size:18px;">平台服务费：{{huazhanginfo.Totalplatform}}元</p>
        <p style="font-size:18px;">投资之家服务费：{{huazhanginfo.TotalLiutou}}元</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetListRemit,
  GetRemitList,
  RejectRemit,
  SubmitRemit,
  GetProjectInfo,
} from "../../network/remit";
import detailedinfo from "./detailedinfo";
export default {
  created() {
    this.GetRemitListData();
  },
  components: {
    detailedinfo,
  },
  data() {
    return {
      RemitList: [],
      paging: {
        pageIndex: 1,
        limit: 5,
      },
      totle: 0,
      pId: "",
      dialogVisible: false,
      rId: "",
      dialogVisible1: false,
      conten: "",
      dialogVisible2: false,
      huazhanginfo: {},
    };
  },
  methods: {
    async GetRemitListData() {
      const res = await GetRemitList(this.paging);
      this.RemitList = res.data.Data;
      this.totle = res.data.totle;
      /* parseInt(
        (res.data.totle + this.paging.limit - 1) / this.paging.limit
      ); */
    },
    //下一页
    next() {
      this.paging.pageIndex++;
      this.GetRemitListData();
    },
    //上一页
    prev() {
      this.paging.pageIndex--;
      this.GetRemitListData();
    },
    //跳转
    handleCurrentChange(value) {
      this.paging.pageIndex = value;
      this.GetRemitListData();
    },
    //查看详细
    xiangxi(pId) {
      this.pId = pId;
      this.dialogVisible = true;
    },
    //驳回打开
    Bohuis(rid) {
      this.rId = rid;
      this.dialogVisible1 = true;
    },
    //驳回提交
    async Bohui() {
      var Remitjournal = {
        rid: this.rId,
        eId: window.sessionStorage.getItem("eId"),
      };

      var RemitReject = {
        rid: this.rId,
        eId: window.sessionStorage.getItem("eId"),
        reContent: this.conten,
      };

      var obj = {
        Remitjournal: Remitjournal,
        RemitReject: RemitReject,
      };

      const res = await RejectRemit(obj);

      if (res.data === 0) return this.$message.error("数据出错！");

      this.$message({
        message: "已驳回！",
        type: "warning",
      });
      this.GetRemitListData();
      this.dialogVisible1 = false;
    },

    //审批
    async SubmitPstate(rId) {
      const res = await SubmitRemit(rId,window.sessionStorage.getItem("eId"));

      if (res.data === 0) return this.$message.error("数据出错！");

      this.$message({ message: "审核成功！请划账。", type: "success" });

      this.GetRemitListData();
    },

    //划账基本信息
    async Remitaccount(pId) {
      const res = await GetProjectInfo(pId);
      this.huazhanginfo = res.data.Data;
      this.huazhanginfo.Actual = this.huazhanginfo.Actual.toFixed(2);
      this.huazhanginfo.Totalplatform = this.huazhanginfo.Totalplatform.toFixed(
        2
      );
      this.huazhanginfo.TotalLiutou = this.huazhanginfo.TotalLiutou.toFixed(2);

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

