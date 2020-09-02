<template>
  <div>
    <el-card>
      <div class="divtitle">
        <div class="divtitleSy">意见反馈管理</div>
      </div>
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>意见反馈管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bodyDiv">
        <div class="bk">
          <el-form :model="numberValidateForm" class="elfrom">
            <el-row :span="24">
              <el-col :span="12">
                <el-form-item label="反馈渠道">
                  <el-select
                    style="width:400px;"
                    v-model="numberValidateForm.fType"
                    placeholder="请选择类型"
                  >
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="PC" value="PC"></el-option>
                    <el-option label="APP" value="APP"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名">
                  <el-input
                    type="text"
                    placeholder="请输入姓名"
                    v-model="numberValidateForm.UserName"
                    style="width:400px;margin-left:28px;"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :span="24">
              <el-col :span="12">
                <el-form-item label="手机号">
                  <el-input
                    type="text"
                    placeholder="请输入手机号"
                    v-model="numberValidateForm.LoginPhone"
                    style="width:400px;margin-left:14px;"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="提交时间">
                  <el-date-picker
                    style="width:400px;"
                    v-model="numberValidateForm.fDateTime"
                    type="date"
                    placeholder="请选择提交日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-button type="success" @click="mohuchaxun" size="small">查询</el-button>
            <el-button size="small" @click="test">重置</el-button>
          </el-form>
        </div>

        <!-- 表格数据列表 -->
        <el-table :data="yijianfkList" border stripe>
          <el-table-column prop="fId" v-if="hidden" width="80" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="fType" label="反馈渠道" width="150" align="center"></el-table-column>
          <el-table-column prop="UserName" label="姓名" width="150" align="center"></el-table-column>
          <el-table-column prop="LoginPhone" label="手机号" width="250" align="center"></el-table-column>
          <el-table-column prop="fContent" label="反馈内容" width="200" align="center"></el-table-column>
          <el-table-column prop="fDateTime" label="提交时间" width="250" align="center">
            <template slot-scope="scope">{{scope.row.fDateTime | dataFormart1}}</template>
          </el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="data">
              <el-button type="primary" @click="detaile(data.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页控件 -->
        <el-pagination
          style="margin-top:20px; "
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 3, 4,5]"
          :page-size="queryInfo.pagesize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>

        <!-- 弹出层：新增 -->
        <el-dialog title="新闻公告详情" :visible.sync="diaolgAdd">
          <el-form :model="yijianfkList">
            <el-form-item>
              <label>{{yijianfkList.fContent}}</label>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="diaolgAdd = false">关闭</el-button>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  gerFeedbackListService,
  
} from "../../network/feedback";
export default {
  created() {
    this.getFeedbackList();
  },
  data() {
    return {
      hidden: false,
      diaolgAdd: false,
      numberValidateForm: {
        fType: "",
        fDateTime: "",
        UserName: "",
        LoginPhone: "",
      },
      yijianfkList: [],
      queryInfo: {
        pagenum: 1,
        pagesize: 3,
      },
      total: 1,
    };
  },
  methods: {
    test() {
      this.numberValidateForm.fType = "";
      this.numberValidateForm.fDateTime = "";
      this.numberValidateForm.UserName = "";
      this.numberValidateForm.LoginPhone = "";
    },
    async getFeedbackList() {
      const res = await gerFeedbackListService(
        this.queryInfo.pagenum,
        this.queryInfo.pagesize,
        this.numberValidateForm
      );
      this.yijianfkList = res.data.data;
      this.total = res.data.totle;
    },
    handleSizeChange(newValue) {
      this.queryInfo.pagesize = newValue;
      this.getFeedbackList();
    },
    handleCurrentChange(newValue) {
      this.queryInfo.pagenum = newValue;
      this.getFeedbackList();
    },
    detaile(feedbackInfo) {
      this.yijianfkList = feedbackInfo;
      this.diaolgAdd = true;
    },
    async mohuchaxun() {
       this.getFeedbackList();
      // const res = await MoHuGetFeedBackListService(
      //   this.numberValidateForm.fType,
      //   this.numberValidateForm.fDateTime,
      //   this.numberValidateForm.UserName,
      //   this.numberValidateForm.LoginPhone,
      //   this.queryInfo.pagenum,
      //   this.queryInfo.pagesize
      // );
      // console.log(this.numberValidateForm);
      // this.yijianfkList = res.data.data;
      // this.total = res.data.totle;
      // console.log(res);
    },
  },
};
</script>

<style scoped>
.el-dialog {
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
.bodyDiv {
  width: 100%;
  height: 700px;

  margin: 20px;
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
.bk {
  border: solid rgb(241, 234, 234) 1px;
}
.elfrom {
  margin: 20px;
}
</style>