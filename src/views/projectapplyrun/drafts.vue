<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项目申请</el-breadcrumb-item>
        <el-breadcrumb-item>草稿箱</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="divtitle">
        <div class="divtitleSy">草稿箱</div>
      </div>
      <div class="bodyDiv">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="pType" label="项目类型" width="100"></el-table-column>
          <el-table-column prop="pNmae" label="项目名称" width="140"></el-table-column>
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
          <el-table-column prop="PreheatDate" label="预热开始时间" width="180">
             <template slot-scope="scope">{{scope.row.PreheatDate | dataFormart}}</template>
          </el-table-column>
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
          <el-table-column label="操作" width="380">
            <template slot-scope="scope">
              <el-button
                type="primary"
                round
                size="small"
                @click="SubmitPstate(scope.row.pId)"
                v-show="scope.row.pState === '待提交' || scope.row.pState === '已驳回'"
              >提交</el-button>
              <el-button
                type="primary"
                round
                size="small"
                v-show="scope.row.pState === '待提交' || scope.row.pState === '已驳回'"
                @click="AraftsInfo(scope.row.pId)"
              >编辑</el-button>
              <el-button
                type="primary"
                round
                size="small"
                @click="RejectInfos(scope.row.pId)"
                v-show="scope.row.pState === '已驳回'"
              >驳回信息</el-button>
              <el-button
                type="primary"
                round
                @click="WaivePstate(scope.row.pId)"
                size="small"
                v-show="scope.row.pState !== '已放弃' || scope.row.pState !== '待审核'"
              >放弃项目</el-button>
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
      </div>
    </el-card>
    <el-dialog title="编辑项目" :visible.sync="dialogFormVisible">
      <div style="color: rgb(37, 124, 255);margin-top:15px;">
        <span>项目信息</span>
      </div>
      <table class="diaTab">
        <tr>
          <th>项目类型：</th>
          <td>
            <el-input v-model="project.pType" autocomplete="off"></el-input>
          </td>
          <th>项目编号：</th>
          <td>
            <el-input v-model="project.pNumber" autocomplete="off"></el-input>
          </td>
        </tr>
        <tr>
          <th>项目名称：</th>
          <td>
            <el-input v-model="project.pNmae" autocomplete="off"></el-input>
          </td>
          <th>项目简介：</th>
          <td>
            <el-input v-model="project.pBrief" autocomplete="off"></el-input>
          </td>
        </tr>
        <tr>
          <th>借款用途：</th>
          <td>
            <el-input v-model="project.pUsage" autocomplete="off"></el-input>
          </td>
          <th>见证机构：</th>
          <td>
            <el-input v-model="project.pWitness" autocomplete="off"></el-input>
          </td>
        </tr>
        <tr>
          <th>担保公司：</th>
          <td>
            <el-input v-model="project.pGuarantee" autocomplete="off"></el-input>
          </td>
          <th>预热开始时间：</th>
          <td>
            <el-date-picker
              v-model="project.PreheatDate"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <th>投资开始时间：</th>
          <td>
            <el-date-picker
              v-model="project.InvestmentDate"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </td>
          <th>投资结束时间：</th>
          <td>
            <el-date-picker
              v-model="project.InvestmentEndDate"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <th>起息日：</th>
          <td>
            <el-date-picker
              v-model="project.ValueDate"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </td>
          <th>到期日：</th>
          <td>
            <el-date-picker
              v-model="project.Duedate"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              @blur="Timelimit()"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <th>期限：</th>
          <td>
            <el-input v-model="project.pTerm" autocomplete="off"></el-input>
          </td>
          <th>借款金额：</th>
          <td>
            <el-input @blur="Timelimit()" v-model="project.Loanamount" autocomplete="off"></el-input>
          </td>
        </tr>
        <tr>
          <th>最低募集金额：</th>
          <td>
            <el-input v-model="project.Minimum" autocomplete="off"></el-input>
          </td>
          <th>起投金额：</th>
          <td>
            <el-input v-model="project.Initial" autocomplete="off"></el-input>
          </td>
        </tr>

        <tr>
          <th>递增金额：</th>
          <td>
            <el-input v-model="project.Increasing" autocomplete="off"></el-input>
          </td>
          <th>单个最多投资金额：</th>
          <td>
            <el-input v-model="project.Investmentamount" autocomplete="off"></el-input>
          </td>
        </tr>
        <tr>
          <th>借款成本年化率：</th>
          <td>
            <el-input @blur="Timelimit()" v-model="project.Annualized" autocomplete="off"></el-input>
            <span class="spanl">%</span>
          </td>
          <th>投资人预期年化率：</th>
          <td>
            <el-input @blur="Timelimit()" v-model="project.ExpectedAnnualized" autocomplete="off"></el-input>
            <span class="spanl">%</span>
          </td>
        </tr>
        <tr>
          <th>平台服务费：</th>
          <td>
            <el-input @blur="Timelimit()" v-model="project.Platform" autocomplete="off"></el-input>
            <span class="spanl">%</span>
          </td>
          <th>贷款之家服务费：</th>
          <td>
            <el-input @blur="Timelimit()" v-model="project.Liutou" autocomplete="off"></el-input>
            <span class="spanl">%</span>
          </td>
        </tr>
        <tr>
          <th>还款方式：</th>
          <td>
            <el-input v-model="project.Repayment" autocomplete="off"></el-input>
          </td>
          <th>还款来源：</th>
          <td>
            <el-input v-model="project.Source" autocomplete="off"></el-input>
          </td>
        </tr>
        <tr>
          <th>回款方式：</th>
          <td>
            <el-input v-model="project.Payment" autocomplete="off"></el-input>
          </td>
        </tr>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="SaveProject">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="项目详细信息" :visible.sync="dialogVisible" width="70%">
      <el-table :data="RejectList" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="rProcess" label="阶段" width="180"></el-table-column>
        <el-table-column prop="eName" label="负责人"></el-table-column>
        <el-table-column prop="rContent" label="驳回理由"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetprojectList,
  GetProjectInfo,
  SaveProjectInfo,
  SubmitStateProject,
} from "../../network/drafts";
import { GetRejEctList } from "../../network/reject";
export default {
  created() {
    this.GetprojectLists();
  },
  data() {
    return {
      tableData: [],
      paging: {
        pageIndex: 1,
        limit: 5,
        eId: window.sessionStorage.getItem("eId"),
        IfSelect: 0,
        State: "",
      },
      totle: 0,
      dialogFormVisible: false,
      project: {},
      dialogVisible: false,
      RejectList: [],
    };
  },
  methods: {
    async GetprojectLists() {
      const res = await GetprojectList(this.paging);
      this.tableData = res.data.Data;
      this.totle = res.data.totle;
      /* parseInt(
        (res.data.totle + this.paging.limit - 1) / this.paging.limit
      ); */
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
    //编辑项目信息
    async AraftsInfo(pId) {
      const res = await GetProjectInfo(pId);
      this.project = res.data.Data;
      this.dialogFormVisible = true;
    },
    //期限&金额
    Timelimit() {
      this.project.pTerm = this.GetDateDiff(
        this.project.ValueDate,
        this.project.Duedate,
        "day"
      );

      this.project.Actual = this.project.Loanamount;

      //平台总服务费
      this.project.Totalplatform = (
        this.project.Loanamount *
        (this.project.Platform / 100)
      ).toFixed(2);

      //投资之家总服务费
      this.project.TotalLiutou = (
        this.project.Loanamount *
        (this.project.Liutou / 100)
      ).toFixed(2);

      //投资人预期总利息
      this.project.Totalinterest = (
        (this.project.Loanamount *
          (this.project.ExpectedAnnualized / 100) *
          this.project.pTerm) /
        365
      ).toFixed(2);

      //总还款
      this.project.Totalamount = (
        parseFloat(this.project.Loanamount) +
        parseFloat(this.project.Totalinterest) +
        parseFloat(this.project.Totalplatform) +
        parseFloat(this.project.TotalLiutou)
      ).toFixed(2);
    },
    //计算时间差
    GetDateDiff(startTime, endTime, diffType) {
      //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
      startTime = startTime.replace(/\-/g, "/");
      endTime = endTime.replace(/\-/g, "/");

      //将计算间隔类性字符转换为小写
      diffType = diffType.toLowerCase();
      var sTime = new Date(startTime); //开始时间
      var eTime = new Date(endTime); //结束时间
      //作为除数的数字
      var divNum = 1;
      switch (diffType) {
        case "second":
          divNum = 1000;
          break;
        case "minute":
          divNum = 1000 * 60;
          break;
        case "hour":
          divNum = 1000 * 3600;
          break;
        case "day":
          divNum = 1000 * 3600 * 24;
          break;
        default:
          break;
      }
      return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
    },
    //保存
    async SaveProject() {
      const res = await SaveProjectInfo(this.project);
      if (res.data !== 1) this.$message.error("数据出错！");

      this.$message({
        message: "保存成功！",
        type: "success",
      });

      this.GetprojectLists();
      this.dialogFormVisible = false;
    },

    //提交
    async SubmitPstate(pId) {
      var obj = {
        pId: pId,
        IfState: 0,
      };

      const res = await SubmitStateProject(obj);
      if (res.data !== 1) this.$message.error("数据出错！");

      this.$message({
        message: "保存成功！",
        type: "success",
      });

      this.GetprojectLists();
    },
    //放弃
    async WaivePstate(pId) {
      var obj = {
        pId: pId,
        IfState: 1,
      };

      const res = await SubmitStateProject(obj);
      if (res.data !== 1) this.$message.error("数据出错！");

      this.$message({
        message: "保存成功！",
        type: "success",
      });

      this.GetprojectLists();
    },

    //查看驳回信息
    async RejectInfos(pId) {
      console.log(pId);
      this.dialogVisible = true;

      const res =await GetRejEctList(pId);
  this.RejectList =  res.data.Data
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
.diaTab {
  width: 100%;
  height: 100%;
}
.diaTab tr {
  margin: 3px;
  border: 1px solid gray;
}
.diaTab tr td {
  margin: 3px;
  border: 1px solid gray;
}
.diaTab tr th {
  margin: 3px;
  border: 1px solid gray;
}
</style>

