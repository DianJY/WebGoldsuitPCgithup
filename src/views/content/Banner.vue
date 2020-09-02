<template>
  <div>
    <el-card>
      <div class="divtitle">
        <div class="divtitleSy">Banner管理</div>
      </div>
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>Banner管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bodyDiv">
        <div class="bk">
          <el-form :model="numberValidateForm" class="elfrom">
            <el-row :span="24">
              <el-col :span="12">
                <el-form-item label="渠道">
                  <el-select
                    style="width:400px;"
                    v-model="numberValidateForm.bChannel"
                    placeholder="请选择类型"
                  >
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="PC" value="PC"></el-option>
                    <el-option label="APP" value="APP"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="标题">
                  <el-input type="text" v-model="numberValidateForm.bTitle" style="width:400px;"></el-input>
                </el-form-item>
              </el-col>
              <el-button type="success" @click="mhchaxun" size="small">查询</el-button>
              <el-button size="small" @click="test">重置</el-button>
            </el-row>
          </el-form>
        </div>
        <el-button type="primary" @click="addBanner" size="small" style="margin:15px auto">新增</el-button>

        <!-- 表格数据列表 -->
        <el-table :data="BannerList" border stripe>
          <el-table-column prop="bid" v-if="hidden" width="80" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="bChannel" label="类型" width="200" align="center"></el-table-column>
          <el-table-column prop="bTitle" label="标题" width="220" align="center"></el-table-column>
          <el-table-column type="index" label="前台页面顺序" width="220" align="center"></el-table-column>
          <el-table-column prop="bUrl" label="跳转链接" width="220" align="center"></el-table-column>
          <el-table-column prop="bDisplay" label="是否显示" width="200" align="center">
            <template slot-scope="data">
              <i class="el-icon-check" style="color:lightgreen" v-if="data.row.bDisplay=='显示'"></i>
              <i class="el-icon-close" style="color:red" v-else></i>
            </template>
          </el-table-column>
          <el-table-column prop="bDate" label="创建时间" width="250" align="center">
            <template slot-scope="scope">{{scope.row.bDate | dataFormart}}</template>
          </el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="data">
              <el-button size="small" @click="detaile(data.row)">查看详情</el-button>
              <el-button type="danger" @click="clickbj(data.row.nId)" size="small">编辑</el-button>
              <el-button
                type="danger"
                @click="updateBanner(data.row)"
                size="small"
                v-if="data.row.bDisplay=='不显示'"
              >{{zhuangtai}}</el-button>
              <el-button
                type="success"
                @click="updateBanner1(data.row)"
                size="small"
                v-else
              >{{zhuangtai1}}</el-button>
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
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getBannerListService,
  UpdateBannerService,
  UpdateBannerService1,
} from "../../network/Banner";
export default {
  created() {
    this.getBannerList();
  },
  data() {
    return {
      numberValidateForm: {
        bChannel: "",
        bTitle: "",
      },
      BannerList: [],
      hidden: false,
      zhuangtai: "显示",
      zhuangtai1: "不显示",
      queryInfo: {
        pagenum: 1,
        pagesize: 3,
      },
      total: 1,
    };
  },
  methods: {
    //重置
    test() {
      (this.numberValidateForm.bChannel = ""),
        (this.numberValidateForm.bTitle = "");
    },
    async getBannerList() {
      const res = await getBannerListService(
        this.queryInfo.pagenum,
        this.queryInfo.pagesize,
        this.numberValidateForm
      );
      this.BannerList = res.data.data;
      this.total = res.data.totle;
    },
    async mhchaxun() {
      this.getBannerList();
    },
    //新增
    async addBanner() {

    },
    //查看详情
    async detaile(){

    },
    handleSizeChange(newValue) {
      this.queryInfo.pagesize = newValue;
      this.getBannerList();
    },
    handleCurrentChange(newValue) {
      this.queryInfo.pagenum = newValue;
      this.getBannerList();
    },
    async updateBanner(BannerInfo) {
      const res = await UpdateBannerService(BannerInfo.bid);
      this.getBannerList();
      if (res.status === 200)
        return this.$message({
          message: "操作成功",
          type: "success",
        });

      return this.$message("操作失败");
    },
    async updateBanner1(BannerInfo) {
      const res = await UpdateBannerService1(BannerInfo.bid);
      this.getBannerList();
      if (res.status === 200)
        return this.$message({
          message: "操作成功",
          type: "success",
        });

      return this.$message("操作失败");
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
.elfrom {
  margin: 20px;
}
.bk {
  border: solid rgb(241, 234, 234) 1px;
}
</style>