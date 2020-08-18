<template>
  <div>
    <el-card class="box-card">
      <div class="divtitle">
        <div class="divtitleSy">新增项目申请</div>
      </div>
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项目申请</el-breadcrumb-item>
        <el-breadcrumb-item>新增项目申请</el-breadcrumb-item>
      </el-breadcrumb>
      <el-scrollbar>
        <div class="bodyDiv">
          <div class="bodyDivItem">
            <div style="color: rgb(37, 124, 255);margin-top:15px;">
              <span>项目信息</span>
            </div>
            <el-divider></el-divider>
          </div>

          <div class="divForm">
            <el-form label-position="right" label-width="170px" :model="project">
              <el-form-item label="已受理项目：">
                <el-select
                  @change="change"
                  style="width: 690px;"
                  v-model="lid"
                  placeholder="请选中受理过的项目"
                >
                  <el-option
                    v-for="item in acceptproject"
                    :key="item.lid"
                    :label="item.UserName"
                    :value="item.lid"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目类型：">
                <el-input v-model="project.pType"></el-input>
              </el-form-item>
              <el-form-item label="项目编号：">
                <el-input v-model="project.pNumber"></el-input>
              </el-form-item>
              <el-form-item label="项目名称：">
                <el-input v-model="project.pNmae"></el-input>
              </el-form-item>
              <el-form-item label="项目简介：">
                <el-input v-model="project.pBrief"></el-input>
              </el-form-item>
              <el-form-item label="借款用途：">
                <el-input v-model="project.pUsage"></el-input>
              </el-form-item>
              <el-form-item label="见证机构：">
                <el-input v-model="project.pWitness"></el-input>
              </el-form-item>
              <el-form-item label="担保公司：">
                <el-input v-model="project.pGuarantee"></el-input>
              </el-form-item>
              <el-form-item label="预热开始时间：">
                <el-date-picker
                  v-model="project.PreheatDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  style="width: 690px;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="投资开始时间：">
                <el-date-picker
                  v-model="project.InvestmentDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  style="width: 690px;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="投资结束时间：">
                <el-date-picker
                  v-model="project.InvestmentEndDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  style="width: 690px;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="起息日：">
                <el-date-picker
                  v-model="project.ValueDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  style="width: 690px;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="到期日：">
                <el-date-picker
                  v-model="project.Duedate"
                  type="datetime"
                  placeholder="选择日期时间"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  style="width: 690px;"
                  @blur="Timelimit()"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="期限：">
                <el-input v-model="project.pTerm"></el-input>
              </el-form-item>
              <el-form-item label="借款金额：">
                <el-input v-model="project.Loanamount"></el-input>
              </el-form-item>
              <el-form-item label="最低募集金额：">
                <el-input v-model="project.Minimum"></el-input>
              </el-form-item>
              <el-form-item label="起投金额：">
                <el-input v-model="project.Initial"></el-input>
              </el-form-item>
              <el-form-item label="递增金额：">
                <el-input v-model="project.Increasing"></el-input>
              </el-form-item>

              <el-form-item label="单个最多投资金额：">
                <el-input v-model="project.Investmentamount"></el-input>
              </el-form-item>
              <el-form-item label="借款成本年化率：">
                <el-input v-model="project.Annualized"></el-input>
                <span class="spanl">%</span>
              </el-form-item>
              <el-form-item label="投资人预期年化率：">
                <el-input v-model="project.ExpectedAnnualized"></el-input>
                <span class="spanl">%</span>
              </el-form-item>
              <el-form-item label="平台服务费：">
                <el-input v-model="project.Platform"></el-input>
                <span class="spanl">%</span>
              </el-form-item>
              <el-form-item label="贷款之家服务费：">
                <el-input v-model="project.Liutou"></el-input>
                <span class="spanl">%</span>
              </el-form-item>
              <el-form-item label="服务收取费方式：">
                <el-select style="width: 690px;" v-model="project.Service" placeholder="请选中受理过的项目">
                  <el-option label="还款时收取" value="还款时收取"></el-option>
                  <el-option label="划账时收取" value="划账时收取"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="还款方式：">
                <el-input v-model="project.Repayment"></el-input>
              </el-form-item>
              <el-form-item label="还款来源：">
                <el-input v-model="project.Source"></el-input>
              </el-form-item>
              <el-form-item label="回款方式：">
                <el-input v-model="project.Payment"></el-input>
              </el-form-item>
              <el-form-item>
                <div>
                  <label>借款人实际到账：</label>
                  <label>{{project.Actual}}元</label>

                  <label style="margin-left:50px;">借款人应还总金额：</label>
                  <label>{{project.Totalamount}}元</label>
                </div>

                <div>
                  <label>投资人预期总利息：</label>
                  <label>{{project.Totalinterest}}元</label>
                  <label style="margin-left:50px;">平台服务费：</label>
                  <label>{{project.Totalplatform}}元</label>
                  <label style="margin-left:50px;">贷款之家总服务费：</label>
                  <label>{{project.TotalLiutou}}元</label>
                </div>
              </el-form-item>
            </el-form>
          </div>

          <div style="color: rgb(37, 124, 255);margin-top:15px;">
            <span>借款人信息</span>
          </div>
          <el-divider></el-divider>
          <div class="divForm">
            <el-form label-position="right" label-width="170px" :model="project">
              <el-form-item label="用户类型：">
                <el-input v-model="borrower.uType"></el-input>
              </el-form-item>
              <el-form-item label="借款人姓名/企业名称：">
                <el-input v-model="borrower.uName"></el-input>
              </el-form-item>
              <el-form-item label="借款人存管账号：">
                <el-input v-model="borrower.ulogin"></el-input>
              </el-form-item>
              <el-form-item label="借款人证号：">
                <el-input v-model="borrower.uCard"></el-input>
              </el-form-item>
              <el-form-item label="借款人所属行业：">
                <el-input v-model="borrower.bIndustry"></el-input>
              </el-form-item>
              <el-form-item label="借款人收入情况：">
                <el-input v-model="borrower.bIncome"></el-input>
              </el-form-item>
              <el-form-item label="借款人负债：">
                <el-input v-model="borrower.bLiabilities"></el-input>
              </el-form-item>
              <el-form-item label="借款人征信逾期次数：">
                <el-input v-model="borrower.bOverdue"></el-input>
              </el-form-item>
              <el-form-item label="借款人已认证信息：">
                <div>
                  <el-checkbox label="身份认证" v-model="checked" @change="checkchange"></el-checkbox>
                  <el-checkbox v-model="checked" label="工作认证" @change="checkchange"></el-checkbox>
                  <el-checkbox v-model="checked" label="信用报告" @change="checkchange"></el-checkbox>
                </div>
                <div>
                  <el-checkbox v-model="checked" label="收入认证" @change="checkchange"></el-checkbox>
                  <el-checkbox v-model="checked" label="资产认证" @change="checkchange"></el-checkbox>
                  <el-checkbox v-model="checked" label="手机号认证" @change="checkchange"></el-checkbox>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="projectapplySave()">立即创建</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<script>
import {
  GetLoanaccept,
  GetLoanInfo,
  SaveProjectandBorrower,
} from "../../network/projectapply";
export default {
  created() {
    this.project.eId = window.sessionStorage.getItem("eId");
    let lids = this.$route.query.lid;
    if (lids != null) {
      this.change(lids);
      this.lid = lids;
    }
    console.log(this.project.eId);
    this.loadGetLoanaccept();
  },
  data() {
    return {
      lid: "",
      project: {
        pType: "",
        pNmae: "",
        pNumber: "",
        pBrief: "",
        pUsage: "",
        pWitness: "贷款之家有限公司",
        pGuarantee: "贷款之家有限公司",
        PreheatDate: "",
        InvestmentDate: "",
        InvestmentEndDate: "",
        ValueDate: "",
        Duedate: "",
        pTerm: "",
        Loanamount: "",
        Minimum: "",
        Initial: "",
        Increasing: "",
        Investmentamount: "",
        Annualized: "15",
        ExpectedAnnualized: "4",
        Platform: "5",
        Liutou: "6",
        Service: "还款时收取",
        Repayment: "到期一次性还本利息",
        Source: "",
        Payment: "到期一次性回款本金及利息",
        Actual: "",
        Totalamount: "",
        Totalinterest: "",
        Totalplatform: "",
        TotalLiutou: "",
        lid: "",
        pState: "待提交",
        eId: "",
      },
      borrower: {
        bId: "",
        pId: "",
        bIndustry: "",
        bIncome: "",
        bLiabilities: "",
        bOverdue: "",
        bCertified: "",
        lid: "",
        uType: "",
        ulogin: "",
        uCard: "",
        uName: "",
      },
      acceptproject: [],
      checked: [],
    };
  },
  methods: {
    //受理下拉框加载
    async loadGetLoanaccept() {
      const res = await GetLoanaccept();
      this.acceptproject = res.data.Data;
    },
    //下拉框改变事件
    async change(value) {
      const res = await GetLoanInfo(value);
      this.project.pType = res.data.Data.uType;
      this.borrower.uType = res.data.Data.uType;
      this.project.Loanamount = res.data.Data.lPrice;
      this.borrower.uCard = res.data.Data.Idcard;
      this.project.pNumber = res.data.Data.lid;
      this.borrower.ulogin = res.data.Data.bnumber.bnumber;
      this.borrower.uName = res.data.Data.UserName;
    },
    //期限
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
    //身份验证
    checkchange() {
      const res = new Map();
      this.checked = this.checked.filter((a) => !res.has(a) && res.set(a, 1));
    },
    //保存
    async projectapplySave() {
      this.borrower.bCertified = this.checked.join(",");
      this.borrower.lid = this.lid;
      this.project.lid = this.lid;
      var obj = {
        Project: this.project,
        Borrower: this.borrower,
      };
      const res = await SaveProjectandBorrower(obj);

      this.$message({
        message: "添加项目成功！",
        type: "success",
      });
    },
  },
};
</script>

<style scoped>
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
  width: 90%;
  height: 670px;
  margin: 10px;
}
.divForm {
  width: 60%;
  margin: 0px auto;
}
</style>
