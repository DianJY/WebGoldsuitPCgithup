<template>
  <div>
    <el-card class="box-card">
      <div class="divtitle">
        <div class="divtitleSy">用户管理</div>
      </div>
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bodyDiv">
        <!-- 头部信息 -->
        <el-row style="margin:10px">
          <el-col :span="24">
            <div>
              <el-button type="primary">新增用户</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- 表格数据列表 -->
        <el-table :data="usersList" border stripe style="width: 55%">
          <el-table-column prop="eId" label="编号" width="80"></el-table-column>
          <el-table-column prop="eName" label="用户名" width="100"></el-table-column>
          <el-table-column prop="ePhone" label="电话" width="120"></el-table-column>
          <el-table-column prop="eSex" label="性别" width="150"></el-table-column>
          <el-table-column prop="eBirth" label="出生日期" width="150"></el-table-column>
          <el-table-column prop="rId" label="角色id" width="150"></el-table-column>
          <el-table-column prop="eState" label="状态" width="150"></el-table-column>
          <el-table-column prop="eLogin" label="登录名" width="150"></el-table-column>
          <el-table-column prop="ePwd" label="密码" width="150"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import {getUserListService } from '../../network/systemadmin'
export default {
  created() {
    this.getUsersList();
  },
  data() {
    return {
      usersList: [],
    };
  },
  methods: {
    async getUsersList(){
  const res= await getUserListService()
    }
  },
};
</script>

<style scoped>
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
  border: 1px solid darkgrey;
  margin: 10px;
}
</style>