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
    <div class="bodyDiv">
      <el-from></el-from>
    </div>
      </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
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