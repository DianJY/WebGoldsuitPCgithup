<template>
  <div>
    <el-container>
      <el-header>
        <b class="headB">后台管理</b>
        <div style="  line-height: 60px;">
          <el-button type="info">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="230px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            unique-opened
            router
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu style :index="item.mId+''" v-for="item in MenusList" :key="item.mId">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.MenuName}}</span>
              </template>
              <el-menu-item-group v-for="item in item.children" :key="item.mId">
                <el-menu-item :index="item.path+''" class="el-icon-menu">{{item.MenuName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { menusList } from "../../network/index";
export default {
  created() {
    this.LeftMenusList();

    console.log(window.sessionStorage.getItem("rId") + "----------------");
  },
  data() {
    return {
      MenusList: [],
    };
  },
  methods: {
    async LeftMenusList() {
      let rId = window.sessionStorage.getItem("rId");
      const { data: res } = await menusList(rId);

      console.log(res);

      if (res.Code !== 200) return this.$message("获取数据错误！");

      this.MenusList = res.Data;
    },
  },
};
</script>


<style  scoped>
.headB {
  font-size: 25px;
  line-height: 60px;
  color: white;
}
.el-header {
  background-color: rgb(84, 92, 100);
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
}

.el-aside {
  background: rgb(84, 92, 100);
  height: 865px;
}
</style>