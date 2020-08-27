<template>
  <div>
    <el-card>
      <div class="divtitle">
        <div class="divtitleSy">新闻公告管理</div>
      </div>
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>新闻公告管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bodyDiv">
        <div class="bk">
          <el-form :model="numberValidateForm" class="elfrom">
            <el-row :span="24">
              <el-col :span="12">
                <el-form-item label="类型">
                  <el-select
                    style="width:400px;"
                    v-model="numberValidateForm.nType"
                    placeholder="请选择类型"
                  >
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="公司新闻" value="公司新闻"></el-option>
                    <el-option label="官方公告" value="官方公告"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="标题">
                  <el-input type="text" v-model="numberValidateForm.nTiteName" style="width:400px;"></el-input>
                </el-form-item>
              </el-col>
              <el-button type="success" @click="mhchaxun" size="small">查询</el-button>
              <el-button size="small" @click="test">重置</el-button>
            </el-row>
          </el-form>
        </div>
        <el-button type="primary" @click="addNews" size="small" style="margin:15px auto">新增</el-button>

        <!-- 表格数据列表 -->
        <el-table :data="newsList" border stripe>
          <el-table-column prop="nId" v-if="hidden" width="80" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="nType" label="类型" width="200" align="center"></el-table-column>
          <el-table-column prop="nTiteName" label="标题" width="220" align="center"></el-table-column>
          <el-table-column prop="nDateTime" label="新闻发布时间" width="250" align="center">
            <template slot-scope="scope">{{scope.row.nDateTime | dataFormart}}</template>
          </el-table-column>
          <el-table-column prop="nDisplay" label="是否显示" width="200" align="center">
            <template slot-scope="data">
              <i class="el-icon-check" style="color:lightgreen" v-if="data.row.nDisplay=='显示'"></i>
              <i class="el-icon-close" style="color:red" v-else></i>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="data">
              <el-button size="small" @click="detaile(data.row)">查看详情</el-button>
              <el-button type="danger" @click="clickbj(data.row.nId)" size="small">编辑</el-button>
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

        <!-- 弹出层：新闻详情 -->
        <el-dialog
          class="el-dialog"
          title="新闻公告详情"
          style="width:800px;"
          :visible.sync="dialogVisible"
        >
          <table class="mytable">
            <tr>
              <td>
                <label>类型：</label>
              </td>
              <th>
                <label>{{newsList.nType}}</label>
              </th>
            </tr>
            <tr>
              <td>
                <label>标题：</label>
              </td>
              <th>
                <label>{{newsList.nTiteName}}</label>
              </th>
            </tr>
            <tr>
              <td>
                <label>内容：</label>
              </td>
              <th>
                <label>{{newsList.nContent}}</label>
              </th>
            </tr>
            <tr>
              <td>
                <label>是否显示：</label>
              </td>
              <th>
                <label>{{newsList.nDisplay}}</label>
              </th>
            </tr>
          </table>
        </el-dialog>

        <!-- 弹出层：新增 -->
        <el-dialog title="新闻公告详情" :visible.sync="diaolgAdd" @closed="closeEvent">
          <el-form ref="userInfoFrom" :model="newsListadd">
            <el-form-item style="display:none" label="nId" :label-width="formLabelWidth">
              <el-input v-model="newsListadd.nId"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth">
              <el-select style="width:100%" v-model="newsListadd.nType" placeholder="请选择类型">
                <el-option label="公司新闻" value="公司新闻"></el-option>
                <el-option label="官方公告" value="官方公告"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标题" :label-width="formLabelWidth">
              <el-input placeholder="请输入标题" v-model="newsListadd.nTiteName"></el-input>
            </el-form-item>
            <el-form-item label="内容" :label-width="formLabelWidth">
              <el-input
                :rows="2"
                placeholder="请输入内容"
                v-model="newsListadd.nContent"
                type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否显示" :label-width="formLabelWidth">
              <el-select style="width:100%" v-model="newsListadd.nDisplay" placeholder="请选择类型">
                <el-option label="显示" value="显示"></el-option>
                <el-option label="不显示" value="不显示"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="diaolgAdd = false">取 消</el-button>
            <el-button type="primary">预览</el-button>
            <el-button type="primary" @click="insertNews">发布</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getNewsListservive,
  getByTypeAndTitleService,
  InsertNewsService,
  GetNewsByIdService,
} from "../../network/news";
export default {
  created() {
    this.getNewsList();
  },
  data() {
    return {
      formLabelWidth: "80px",
      numberValidateForm: {
        nType: "",
        nTiteName: "",
      },
      newsList: [],
      newsListadd: {
        nId: "",
        nType: "",
        nTiteName: "",
        nDateTime: "",
        nContent: "",
        nDisplay: "",
      },
      queryInfo: {
        pagenum: 1,
        pagesize: 3,
      },
      total: 1,
      hidden: false,
      dialogVisible: false,
      diaolgAdd: false,
    };
  },
  methods: {
    test() {
      (this.numberValidateForm.nType = ""),
        (this.numberValidateForm.nTiteName = "");
    },

    async getNewsList() {
      const res = await getNewsListservive(
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      );
      this.newsList = res.data.data;
      this.total = res.data.totle;
    },

    // danqianxz(value) {},

    //关闭弹出层回调
    closeEvent() {
      this.$refs.userInfoFrom.resetFields();
      (this.newsListadd.nId = ""),
        (this.newsListadd.nType = ""),
        (this.newsListadd.nTiteName = ""),
        (this.newsListadd.nDateTime = ""),
        (this.newsListadd.nContent = ""),
        (this.newsListadd.nDisplay = "");
    },

    handleSizeChange(newValue) {
      this.queryInfo.pagesize = newValue;
      this.getNewsList();
    },
    handleCurrentChange(newValue) {
      this.queryInfo.pagenum = newValue;
      this.getNewsList();
    },
    async mhchaxun() {
      const res = await getByTypeAndTitleService(
        this.numberValidateForm.nType,
        this.numberValidateForm.nTiteName,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      );
      this.newsList = res.data.data;
      this.total = res.data.totle;
    },
    detaile(newsInfo) {
      this.dialogVisible = true;
      this.newsList = newsInfo;
    },
    addNews() {
      this.diaolgAdd = true;
    },
    async insertNews() {
      const res = await InsertNewsService(this.newsListadd);
      if (res.status === 200)
        return this.$message({
          message: "操作成功",
          type: "success",
        });
      this.diaolgAdd = false;
      return this.$message("操作失败");

      this.getNewsList();
    },
    async clickbj(newsId) {
      const res = await GetNewsByIdService(newsId);
      this.newsListadd = res.data.data;
      this.diaolgAdd = true;
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
.mytable {
  width: 100%;
}
.mytable td {
  width: 25%;
  text-align: right;
}
.mytable th {
  width: 75%;
  text-align: left;
}

.elfrom {
  margin: 20px;
}
.bk {
  border: solid rgb(241, 234, 234) 1px;
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
</style>