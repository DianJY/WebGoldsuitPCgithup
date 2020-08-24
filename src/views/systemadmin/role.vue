<template>
  <div>
    <el-card class="box-card">
      <div class="divtitle">
        <div class="divtitleSy">角色管理</div>
      </div>
      <el-breadcrumb separator="/" style="margin: 15px;">
        <el-breadcrumb-item :to="{ path: '/index/zhuye'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bodyDiv">
        <!-- 表格数据列表 -->
        <el-table :data="roleList" border stripe style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-row v-for="(item) in scope.row.children" :key="item.id">
                <el-col :span="5" class="colstyle">
                  <el-tag
                    @close="deleteRights(scope.row,item.mId)"
                    info="info"
                    closable
                  >{{item.MenuName}}</el-tag>
                </el-col>
                <el-col :span="19" style="margin:0px" class="colstyle">
                  <el-row v-for="(item1) in item.children" :key="item1.id">
                    <el-col :span="5" class="colstyle">
                      <el-tag
                        @close="deleteRights(scope.row,item1.mId)"
                        closable
                        type="warning"
                      >{{item1.MenuName}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column prop="rId" label="编号" width="400" align="center"></el-table-column>
          <el-table-column prop="rName" label="角色名称" width="200" align="center"></el-table-column>
          <el-table-column label="操作" width="220" align="center">
            <template slot-scope="scope">
              <el-button
                type="success"
                :disabled="scope.row.rName=='系统管理员'"
                @click="clickQX(scope.row)"
                size="small"
              >授权</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 弹出层：授权 -->
        <el-dialog title="授权" :visible.sync="dialogSQ" width="40%" :before-close="cleardialog">
          <!-- 树形菜单 -->
          <el-tree
            ref="tref"
            :data="rightsList"
            default-expand-all
            show-checkbox
            :props="defaultProps"
            node-key="mId"
            :default-checked-keys="defaultCheckKeys"
          ></el-tree>

          <span slot="footer" class="dialog-footer">
            <el-button @click="cleardialog()">取 消</el-button>
            <el-button type="primary" @click="shouquan">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getRolesListService } from "../../network/systemadmin";
import {
  deleteRolesQX,
  getrolesTreeListService,
  saverightsService,
} from "../../network/roles";
export default {
  created() {
    this.getrolesList();
  },
  data() {
    return {
      roid: 0,
      dialogSQ: false,
      roleList: [],
      rightsList: [],
      defaultProps: {
        children: "children",
        label: "MenuName",
      },
      defaultCheckKeys: [],
    };
  },
  methods: {
    //查询角色信息
    async getrolesList() {
      const res = await getRolesListService();
      this.roleList = res.data.data;
      console.log(123);
    },

    //删除角色权限
    async deleteRights(roleInfo, roleid) {
      const res = await deleteRolesQX(roleInfo.rId, roleid);
      this.getrolesList();
    },

    //删除角色
    // deleteRole(rolesInfo){ },

    //点击授权
    clickQX(roleinfo) {
      this.dialogSQ = true;
      this.roid = roleinfo.rId;
      this.getroleTreeList();
      console.log(roleinfo);
      this.getDefaultKeys(roleinfo, this.defaultCheckKeys);
    },

    //获取树形菜单所以信息
    async getroleTreeList() {
      const res = await getrolesTreeListService();
      this.rightsList = res.data;
    },

    //递归获取用户的权限
    getDefaultKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.mId);
      }

      //递归权限
      node.children.forEach((item) => {
        this.getDefaultKeys(item, arr);
      });
    },

    //清空值
    cleardialog() {
      (this.defaultCheckKeys = []), (this.dialogSQ = false);
    },

    //授权
    async shouquan() {
      const keys = [
        ...this.$refs.tref.getCheckedKeys(),
        ...this.$refs.tref.getHalfCheckedKeys(),
      ];
      const res = await saverightsService(this.roid, keys.join(","));
      if (res.status !== 200) return this.$message("保存失败");
      this.$message({
        type: "success",
        message: "保存成功",
      });
      this.getrolesList();
      this.dialogSQ = false;
    },
  },
};
</script>

<style scoped>
.colstyle {
  margin-top: 20px;
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
.bodyDiv {
  width: 100%;
  height: auto;

  margin: 10px;
}
.el-row::after {
  display: none;
}
</style>