<template>
  <div>
    <el-card class="box-card">
      <div class="divtitle">
        <div class="divtitleSy">用户管理</div>
      </div>
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bodyDiv">
        <div style="margin-left:30px;">
          <!-- 头部信息 -->
          <el-row style="margin:10px">
            <el-col :span="24">
              <div>
                <el-button type="primary" @click="AddUsers">新增用户</el-button>
              </div>
            </el-col>
          </el-row>
          <!-- 表格数据列表 -->
          <el-table
            :data="usersList"
            border
            :header-cell-style="{ 'background-color': 'oldlace','border-bottom': '1px RGBA(199, 199, 199, 1) solid'}"
            stripe
            style="margin-top:20px; width:100%"
          >
            <el-table-column prop="eId" v-if="a" width="80"></el-table-column>
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="eName" label="用户名" width="100"></el-table-column>
            <el-table-column prop="ePhone" label="电话" width="120"></el-table-column>
            <el-table-column prop="eSex" label="性别" width="150"></el-table-column>
            <el-table-column prop="eBirth" label="出生日期" width="200"></el-table-column>
            <el-table-column prop="rName" label="角色" width="150"></el-table-column>

            <el-table-column label="状态" width="150">
              <template slot-scope="data">
                <i class="el-icon-check" style="color:lightgreen" v-if="data.row.eState=='在职人员'"></i>
                <i class="el-icon-close" style="color:red" v-else></i>
              </template>
            </el-table-column>

            <el-table-column prop="eLogin" label="登录名" width="150"></el-table-column>

            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button size="small" @click="updateUser(scope.row.eId)">编辑</el-button>
                <el-button type="danger" @click="deleteUser(scope.row)" size="small">删除</el-button>
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

          <!-- 弹出层：新增用户信息 -->
          <el-dialog title="用户信息" :visible.sync="dialogVisible">
            <el-form ref="userInfoFrom" :model="usersInfo">
               <el-form-item style="display:none" label="id" :label-width="formLabelWidth">
                <el-input type="text" v-model="usersInfo.eId"></el-input>
              </el-form-item>
              <el-form-item label="用户名称" :label-width="formLabelWidth">
                <el-input type="text" v-model="usersInfo.eName"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" :label-width="formLabelWidth">
                <el-input type="text" v-model="usersInfo.ePhone"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-radio-group v-model="usersInfo.eSex">
                  <el-radio label="男" vlaue="男"></el-radio>
                  <el-radio label="女" vlaue="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="出生日期" :label-width="formLabelWidth">
                <el-date-picker
                  style="width:100%"
                  v-model="usersInfo.eBirth"
                  type="date"
                  placeholder="选择出生日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="角色名称" :label-width="formLabelWidth">
                <el-select
                  style="width:100%"
                  v-model="usersInfo.rId"
                  placeholder="请选择角色"
                  :label-width="formLabelWidth"
                >
                  <el-option
                    v-for="item in rolesInfo"
                    :key="item.rId"
                    :label="item.rName"
                    :value="item.rId"
                    :disabled="item.rName==='系统管理员'?true:false"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="登录名" :style="{display:editState}" :label-width="formLabelWidth">
                <el-input type="text" v-model="usersInfo.eLogin"></el-input>
              </el-form-item>

              <el-form-item v-if="visible" label-width="70px" label="密码">
                <el-input type="password" v-model="usersInfo.ePwd" placeholder="请输入密码">
                  <i
                    slot="suffix"
                    title="显示密码"
                    @click="changePass('show')"
                    style="cursor:pointer;"
                    
                  >
                    <img src="../../assets/biyan.png" style="width:20px;height:20px; margin-top:12px;" />
                  </i>
                </el-input>
              </el-form-item>
              <el-form-item v-else label="密码" label-width="70px">
                <el-input type="text" v-model="usersInfo.ePwd" placeholder="请输入密码">
                  <i slot="suffix" title="隐藏密码" @click="changePass('hide')" style="cursor:pointer;">
                    <img src="../../assets/zhengyan.png" style="width:20px;height:20px;margin-top:12px;" />
                  </i>
                </el-input>
              </el-form-item>

              <!-- <el-input type="password" v-model="usersInfo.ePwd"></el-input> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveUserInfo">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  getUserListService,
  deleteUserService,
  getRolesListService,
  adduserListService,
  GetUsersInfoById,
} from "../../network/systemadmin";
export default {
  created() {
    this.getUsersList();
    this.getrolesList();
  },
  data() {
    return {
      visible: true,
      editState: "block",
      formLabelWidth: "70px",
      dialogVisible: false,
      usersList: [],
      queryInfo: {
        pagenum: 1,
        pagesize: 5,
      },
      total: 1,
      usersInfo: {
        eId:"",
        eName: "",
        ePhone: "",
        eSex: "",
        eBirth: "",
        rId: "",
        eLogin: "",
        ePwd: "",
      },
      rolesInfo: [],
      a: false,
    };
  },
  methods: {
    changePass(value) {
      this.visible = !(value === "show");
    },
    //查询角色信息
    async getrolesList() {
      const res = await getRolesListService();
      this.rolesInfo = res.data.data;
      // console.log(this.rolesInfo);
    },
    //查询
    async getUsersList() {
      const res = await getUserListService(
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      );
      this.usersList = res.data.data;
      this.total = res.data.totle;
    },

    handleSizeChange(newValue) {
      this.queryInfo.pagesize = newValue;
      this.getUsersList();
    },
    handleCurrentChange(newValue) {
      this.queryInfo.pagenum = newValue;
      this.getUsersList();
    },
    //删除
    async deleteUser(userInfo) {
      const res = await deleteUserService(userInfo.eId);
      if (res.status === 200)
        return this.$message({
          message: "操作成功",
          type: "success",
        });
      return this.$message("操作失败");
    },
    //弹出层
    AddUsers() {
      this.dialogVisible = true;
      this.editState = "block";
    },
    //添加保存
    async saveUserInfo() {
      const res = await adduserListService(this.usersInfo);   
      if (res.data > 0)
        return this.$message({
          message: "保存成功",
          type: "success",
        });
      this.dialogVisible = false;
      this.getUsersList();
    },
    hq(value) {
      this.usersInfo.rId = value;
    },
    //修改
    async updateUser(id) {
      this.editState = "none";
      const res = await GetUsersInfoById(id);
      if (res.data.code !== 200) return this.$message("获取数据失败！！");
      this.usersInfo = res.data.data;
      console.log(this.usersInfo.rId);
      this.dialogVisible = true;
    },
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
  height: 700px;
 
  margin: 10px;
}
</style>