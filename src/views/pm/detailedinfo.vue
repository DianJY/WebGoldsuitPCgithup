<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="项目申请详细" name="first">
        <div class="divtitle">
          <div class="divtitleSy">项目信息</div>
        </div>
        <table class="diaTab">
          <tr>
            <th>项目类型：</th>
            <td>
              <lable>{{project.pType}}</lable>
            </td>
            <th>项目编号：</th>
            <td>
              <lable>{{project.pNumber}}</lable>
            </td>
          </tr>
          <tr>
            <th>项目名称：</th>
            <td>
              <lable>{{project.pNmae}}</lable>
            </td>
            <th>项目简介：</th>
            <td>
              <lable>{{project.pBrief}}</lable>
            </td>
          </tr>
          <tr>
            <th>项目用途：</th>
            <td>
              <lable>{{project.pUsage }}</lable>
            </td>
            <th>见证机构：</th>
            <td>
              <lable>{{project.pWitness}}</lable>
            </td>
          </tr>
          <tr>
            <th>担保公司：</th>
            <td>
              <lable>{{project.pGuarantee}}</lable>
            </td>
            <th>借款金额：</th>
            <td>
              <lable>{{project.Loanamount}}</lable>
            </td>
          </tr>
          <tr>
            <th>期限：</th>
            <td>
              <lable>{{project.pTerm}}</lable>
            </td>
            <th>借款成本年化率：</th>
            <td>
              <lable>{{project.Annualized}}</lable>
            </td>
          </tr>
          <tr>
            <th>投资人预期年化收益率：</th>
            <td>
              <lable>{{project.ExpectedAnnualized}}</lable>
            </td>
            <th>平台服务费年化率：</th>
            <td>
              <lable>{{project.Platform}}</lable>
            </td>
          </tr>
          <tr>
            <th>投资之家服务费年化率：</th>
            <td>
              <lable>{{project.Liutou}}</lable>
            </td>
            <th>服务收取费用方式：</th>
            <td>
              <lable>{{project.Service}}</lable>
            </td>
          </tr>
          <tr>
            <th>还款方式：</th>
            <td>
              <lable>{{project.Repayment}}</lable>
            </td>
            <th>还款来源：</th>
            <td>
              <lable>{{project.Source}}</lable>
            </td>
          </tr>
          <tr>
            <th>回款方式：</th>
            <td>
              <lable>{{project.Payment}}</lable>
            </td>
            <th>最低募集金额：</th>
            <td>
              <lable>{{project.Minimum}}</lable>
            </td>
          </tr>
          <tr>
            <th>起投金额：</th>
            <td>
              <lable>{{project.Initial}}</lable>
            </td>
            <th>递增金额：</th>
            <td>
              <lable>{{project.Increasing}}</lable>
            </td>
          </tr>
          <tr>
            <th>单个人投资最多金额：</th>
            <td>
              <lable>{{project.Investmentamount}}</lable>
            </td>
            <th>预热开始时间：</th>
            <td>
              <lable>{{project.PreheatDate}}</lable>
            </td>
          </tr>
          <tr>
            <th>投资开始时间---投资结束时间</th>
            <td>
              <lable>{{project.InvestmentDate}} --- {{project.InvestmentEndDate}}</lable>
            </td>
            <th>起息日---到期日</th>
            <td>
              <lable>{{project.ValueDate}} --- {{project.Duedate}}</lable>
            </td>
          </tr>
        </table>
      </el-tab-pane>
      <el-tab-pane label="借款人信息" name="third">
        <div class="divtitle">
          <div class="divtitleSy">借款人信息</div>
        </div>
        <table class="diaTab">
          <tr>
            <th>用户类型：</th>
            <td>
              <lable>{{project.pType}}</lable>
            </td>
            <th>借款人姓名/企业名称：</th>
            <td>
              <lable>{{project.Uname}}</lable>
            </td>
          </tr>
          <tr>
            <th>借款人存管账号：</th>
            <td>
              <lable>{{project.bnumber}}</lable>
            </td>
            <th>借款人证件号：</th>
            <td>
              <lable>{{project.Idcard}}</lable>
            </td>
          </tr>
          <tr>
            <th>借款人收入情况：</th>
            <td>
              <lable>{{project.bIncome}}</lable>
            </td>
            <th>借款人负债情况：</th>
            <td>
              <lable>{{project.bLiabilities}}</lable>
            </td>
          </tr>
          <tr>
            <th>借款人征信报告逾期次数：</th>
            <td>
              <lable>{{project.bOverdue}}</lable>
            </td>
            <th></th>
            <td></td>
          </tr>
        </table>
      </el-tab-pane>
      <el-tab-pane label="投资明细" name="second2">
        <el-table :data="InvestmentList" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="uName" label="投资人姓名/企业名称" width="180"></el-table-column>
          <el-table-column prop="bnumber" label="投资人存管账号"></el-table-column>
          <el-table-column prop="InvesDate" label="投资时间" width="180">
             <template slot-scope="scope">{{scope.row.InvesDate | dataFormart}}</template>
          </el-table-column>
          <el-table-column prop="InvesMoney" label="投资金额" width="180"></el-table-column>
          <el-table-column prop="address" label="预期本息总金额">
            <template slot-scope="scope">
              <label>{{scope.row.IExpectMoney + scope.row.InvesMoney}}</label>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          @next-click="next"
          @prev-click="prev"
          :page-size="InvestmentObj.limit"
          :total="InvestmentObj.totle"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="划账明细" name="second3">
        <el-table :data="RemitList" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="uName" label="借款人姓名/企业名称" width="180"></el-table-column>
          <el-table-column prop="bNumber" label="借款人存管账号" width="180"></el-table-column>
          <el-table-column prop="ReDateTime" label="划账时间" width="200">
               <template slot-scope="scope">{{scope.row.ReDateTime | dataFormart}}</template>
          </el-table-column>
          <el-table-column prop="ReState" label="划账状态" width="180"></el-table-column>
          <el-table-column prop="ReMoney" label="划账金额"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange1"
          @next-click="next1"
          @prev-click="prev1"
          :page-size="RemitObj.limit"
          :total="RemitObj.totle"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="还款明细" name="second4">
        <div class="divtitle">
          <div class="divtitleSy">还款总信息</div>
        </div>
        <el-table :data="RepaymentList" stripe style="width: 100%">
          <el-table-column prop="rClearing" label="还款清算日" width="180">
             <template slot-scope="scope">{{scope.row.rClearing | dataFormart}}</template>
          </el-table-column>
          <el-table-column prop="rShould" label="应还本金" width="180"></el-table-column>
          <el-table-column prop="rInterest" label="应还利息" width="200"></el-table-column>
          <el-table-column prop="rSumMoney" label="应还总金额" width="180"></el-table-column>
          <el-table-column prop="rShareMoney" label="已还金额"></el-table-column>
        </el-table>
        <div class="divtitle">
          <div class="divtitleSy">还款详细信息</div>
        </div>
        <el-table :data="RepaymenstList" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="rName" label="还款人户名" width="180"></el-table-column>
          <el-table-column prop="rBnumber" label="还款人存管账号" width="180"></el-table-column>
          <el-table-column prop="UserName" label="收款人户名" width="200"></el-table-column>
          <el-table-column prop="bnumber" label="收款人存管账号" width="180"></el-table-column>
          <el-table-column prop="ReDateTime" label="还款时间">
               <template slot-scope="scope">{{scope.row.ReDateTime | dataFormart}}</template>
          </el-table-column>
          <el-table-column prop="reSate" label="还款状态"></el-table-column>
          <el-table-column prop="reMoney" label="还款金额"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange2"
          @next-click="next2"
          @prev-click="prev2"
          :page-size="RepaymentObj.limit"
          :total="RepaymentObj.totle"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

  
<script>
import { GetProjectInfo } from "../../network/drafts";
import {
  GetInvestmentList,
  GetRemitList,
  GetRepaymentInfo,
} from "../../network/pm";

export default {
  created() {
    this.AraftsInfo();
    this.GetInvestmenData();
    this.GetRemitListData();
    this.GetRepaymentInfoData();
  },
  data() {
    return {
      activeName: "first",
      project: {},
      InvestmentList: [],
      InvestmentObj: {
        pageIndex: 1,
        limit: 5,
        totle: 0,
      },
      RemitList: [],

      RemitObj: {
        pageIndex: 1,
        limit: 5,
        totle: 0,
      },

      RepaymentList: [],
      RepaymenstList: [],
      RepaymentObj: {
        pageIndex: 1,
        limit: 2,
        totle: 0,
      },
    };
  },
  props: {
    pId: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleClick(tab, event) {},
    //编辑项目信息
    async AraftsInfo() {
      const res = await GetProjectInfo(this.pId);
      this.project = res.data.Data;
    },
    //查看项目详细投资人
    async GetInvestmenData() {
      var obj = {
        pId: this.pId,
        pageIndex: this.InvestmentObj.pageIndex,
        limit: this.InvestmentObj.limit,
      };
      const res = await GetInvestmentList(obj);

      this.InvestmentList = res.data.Data;
      this.InvestmentObj.totle = res.data.totle;
    },
    //下一页
    next() {
      this.InvestmentObj.pageIndex++;
      this.GetInvestmenData();
    },
    //上一页
    prev() {
      this.InvestmentObj.pageIndex--;
      this.GetInvestmenData();
    },
    //跳转
    handleCurrentChange(value) {
      this.InvestmentObj.pageIndex = value;
      this.GetInvestmenData();
    },

    //查看划账信息
    async GetRemitListData() {
      var obj = {
        pId: this.pId,
        pageIndex: this.RemitObj.pageIndex,
        limit: this.RemitObj.limit,
      };
      const res = await GetRemitList(obj);

      this.RemitList = res.data.Data;
      this.RemitObj.totle = res.data.totle;
    },
    //下一页
    next1() {
      this.RemitObj.pageIndex++;
      this.GetRemitListData();
    },
    //上一页
    prev1() {
      this.RemitObj.pageIndex--;
      this.GetRemitListData();
    },
    //跳转
    handleCurrentChange1(value) {
      this.RemitObj.pageIndex = value;
      this.GetRemitListData();
    },
    //还款总信息
    async GetRepaymentInfoData() {
      var obj = {
        pId: this.pId,
        pageIndex: this.RepaymentObj.pageIndex,
        limit: this.RepaymentObj.limit,
      };
      const res = await GetRepaymentInfo(obj);
       this.RepaymentList =[];
      this.RepaymentList.push(res.data.Data.Repayment);
      this.RepaymenstList = res.data.Data.Repaymentes;
      this.RepaymentObj.totle = res.data.totle;
    },

    //下一页
    next2() {
      this.RepaymentObj.pageIndex++;
      this.GetRepaymentInfoData();
    },
    //上一页
    prev2() {
      this.RepaymentObj.pageIndex--;
      this.GetRepaymentInfoData();
    },
    //跳转
    handleCurrentChange2(value) {
      this.RepaymentObj.pageIndex = value;
      this.GetRepaymentInfoData();
    },
  },
};
</script>


<style  scoped>
.divtitle {
  width: 100%;
  height: 40px;
  background-color: rgb(239, 251, 255);
}
.divtitleSy {
  height: 20px;
  font-size: 14px;
  line-height: 40px;
  width: 200px;
  color: rgb(37, 124, 255);
  margin-left: 10px;
}
.diaTab {
  width: 100%;
  height: 100%;
}
.diaTab tr {
  margin: 3px;
  width: 100%;
  border: 1px solid gray;
}
.diaTab tr td {
  margin: 3px;
  border: 1px solid gray;
}
.diaTab tr th {
  margin: 3px;
  width: 400px;
  border: 1px solid gray;
}
</style>