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
      <el-tab-pane label="审批审核日志" name="second">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="aOperation" label="阶段" width="180"></el-table-column>
          <el-table-column prop="eName" label="负责人"></el-table-column>
          <el-table-column prop="aStage" label="处理操作"></el-table-column>
          <el-table-column prop="aContent" label="驳回理由"></el-table-column>
          <el-table-column prop="aDateTime" label="处理完成时间">
               <template slot-scope="scope">{{scope.row.aDateTime | dataFormart}}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

  
<script>
import { GetProjectInfo } from "../../network/drafts";
import { GetApprovalList } from "../../network/reject";
export default {
  created() {
    this.AraftsInfo();
    this.GetApprovalLists()
  },
  data() {
    return {
      activeName: "first",
      tableData: [],
      project: {},
    };
  },
  props: {
    pId: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleClick(tab, event) {
    },
    //编辑项目信息
    async AraftsInfo() {
      const res = await GetProjectInfo(this.pId);
      this.project = res.data.Data;
    },
    //查询审批审核信息
    async GetApprovalLists() {
      const res = await GetApprovalList(this.pId);

      this.tableData = res.data.Data
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