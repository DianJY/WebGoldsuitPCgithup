<template>
  <div>
    <el-card class="box-card">
      <div class="divtitle">
        <div class="divtitleSy">首页</div>
      </div>
      <div class="bodyDiv">
        <div class="bodyDivItem">
          <span class="bodyDivItemSpan">您好！<b style="color:red;">{{this.$route.query.eName}}</b></span>
          
          <p class="bodyDivItemSpan">您有以下代办工作：</p>

          <span class="bodyDivItemSpan1">项目申请管理（10）</span> 
           <span class="bodyDivItemSpan1">划账管理（10）</span>
            <span class="bodyDivItemSpan1">还款管理（10）</span>
        </div>
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
.bodyDivItem{

    width: 80%;
    height: 60%;
        margin: 80px auto;
}
.bodyDivItemSpan{
    font-size: 20px;
}
.bodyDivItemSpan1{
     font-size: 18px;
    margin-left: 20px;
}
</style>>

