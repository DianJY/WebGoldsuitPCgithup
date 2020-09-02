<template>
  <div>
    <el-card>
      <div class="divtitle">
        <div class="divtitleSy">信息披露管理</div>
      </div>
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>信息披露管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bodyDiv">
        <!-- 表格数据列表 -->
        <el-table :data="inforList" border stripe>
          <el-table-column prop="dId" v-if="hidden" width="80" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>

          <el-table-column prop="dType" label="类型" width="200" align="center"></el-table-column>
          <el-table-column prop="dTiteName" label="标题" width="220" align="center"></el-table-column>
          <el-table-column prop="dDateTime" label="新闻发布时间" width="250" align="center">
            <template slot-scope="scope">{{scope.row.dDateTime | dataFormart}}</template>
          </el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="data">
              <el-button size="small" @click="detailck(data.row)">查看详情</el-button>
              <el-button type="danger" @click="editInfor(data.row)" size="small">编辑</el-button>
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

        <!-- 弹出层：信息披露板块详情
        <el-dialog
          class="el-dialog"
          title="信息披露板块详情"
          style="width:800px;"
          :visible.sync="dialogVisible"
        >
          <table class="mytable">
            <tr>
              <td>
                <label>板块标题：</label>
              </td>
              <th>
                <label>{{inforListById.dTiteName}}</label>
              </th>
            </tr>
            <tr>
              <td>
                <label>发布渠道：</label>
              </td>
              <th>
                <label>{{inforListById.dType}}</label>
              </th>
            </tr>
            <tr>
              <td>
                <label>内容：</label>
              </td>
              <th>
                <label>{{inforListById.dContent}}</label>
              </th>
            </tr>
          </table>
        </el-dialog>-->

        <el-dialog title="信息披露板块详情" :visible.sync="dialogVisible" width="30%">
          <div style="width: 100%; height: 100%;margin:10px auto; text-align: center;">
            <p style="font-size:18px;">
              板块标题：
              <span style="color:red">{{inforListById.dTiteName}}</span>
            </p>
            <p style="font-size:18px;margin-left:-48px;">
              发布渠道：
              <span style="color:red">{{inforListById.dType}}</span>
            </p>
            <p style="font-size:18px;margin-left:20px;">
              内容：
              <span style="color:red">{{inforListById.dContent}}</span>
            </p>
          </div>
        </el-dialog>

        <!-- 弹出层：编辑信息披露板块 -->
        <el-dialog title="编辑信息披露板块" :visible.sync="diaolgAdd">
          <el-form :model="inforListById">
            <el-form-item style="display:none" label="dId" :label-width="formLabelWidth">
              <el-input v-model="inforListById.dId"></el-input>
            </el-form-item>
            <el-form-item label="板块标题" :label-width="formLabelWidth">
              <el-input v-model="inforListById.dTiteName"></el-input>
            </el-form-item>
            <el-form-item label="发布渠道" :label-width="formLabelWidth">
              <el-input v-model="inforListById.dType"></el-input>
            </el-form-item>
            <el-form-item label="内容" :label-width="formLabelWidth">
              <el-input
                :rows="2"
                placeholder="请输入内容"
                v-model="inforListById.dContent"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="diaolgAdd = false">取 消</el-button>
       
            <el-button type="primary" @click="eidt">发布</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getinforListService,
  editInforListByIdSerVice,
} from "../../network/information";
export default {
  created() {
    this.getinforList();
  },
  data() {
    return {
      hidden: false,
      inforList: [],
      queryInfo: {
        pagenum: 1,
        pagesize: 3,
      },
      total: 0,
      dialogVisible: false,
      diaolgAdd: false,
      inforListById: {
        dId: "",
        dType: "",
        dContent: "",
        dTiteName: "",
        dDateTime: "",
      },
    };
  },
  methods: {
    async getinforList() {
      const res = await getinforListService(
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      );
      this.inforList = res.data.data;
      this.total = res.data.totle;
      console.log(res);
    },
    handleSizeChange(newValue) {
      this.queryInfo.pagesize = newValue;
      this.getinforList();
    },
    handleCurrentChange(newValue) {
      this.queryInfo.pagenum = newValue;
      this.getinforList();
    },
    detailck(inforInfo) {
      this.inforListById = inforInfo;
      this.dialogVisible = true;
    },
    editInfor(inforInfo) {
      this.inforListById = inforInfo;
      this.diaolgAdd = true;
    },
    async eidt() {
      const res = await editInforListByIdSerVice(this.inforListById);
      if (res.status === 200)
        return this.$message({
          message: "操作成功",
          type: "success",
        });
      this.diaolgAdd = false;
      return this.$message("操作失败");
      this.getinforList();
    },
  },
};
</script>

<style scoped>
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