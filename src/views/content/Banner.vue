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
      <div class="bodyDiv"></div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bodyDiv {
  width: 100%;
  height: 700px;

  margin: 10px;
}
</style>