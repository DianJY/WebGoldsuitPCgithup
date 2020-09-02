<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>还款管理</el-breadcrumb-item>
        <el-breadcrumb-item>划账还款</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="divtitle">
        <div class="divtitleSy">划账还款</div>
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
   
              <el-button type="primary" round size="small">确认划账还款</el-button>
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
  GetListRemit,
  GetRemitList,
  RejectRemit,
  SubmitRemit,
  GetProjectInfo,
  TransferProject,
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

