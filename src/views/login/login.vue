
<template>
  <div class="kj">
    <div class="login-container">
      <el-form
        ref="form"
        :rules="rules"
        :model="EmployeeLogin"
        label-width="80px"
        class="login-form"
      >
        <h2 class="login-title">管理系统</h2>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="EmployeeLogin.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="EmployeeLogin.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
    <script>
import { getloginpwd } from "../../network/login";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("密码只能6到20位之间"));
      } else {
        callback();
      }
    };

    return {
      EmployeeLogin: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
    };
  },
  methods: {
    async submitForm(formName) {
      const res = await getloginpwd(this.EmployeeLogin);
      if (res.data.Code !== 200) return this.$message.error("登录失败");

      window.sessionStorage.setItem(
        "token",
        JSON.stringify(res.data.Data.token)
      );
      this.$message({
        message: "登陆成功",
        type: "success",
      });

      //   var query = {
      //     eName: res.data.Data.data.eName,
      //     eId: res.data.Data.data.eId,
      //     rId: res.data.Data.data.rId,
      //   };

      //   window.localStorage.setItem("dx", JSON.stringify(query));

      //   this.$router.push({
      //       path:'/index'
      //   })

      this.$router.replace({
        path: "/index",
        query: {
          eName: res.data.Data.data.eName,
          
        },
      });
   window.sessionStorage.setItem(
        "eId",
       res.data.Data.data.eId
      );
      window.sessionStorage.setItem(
        "rId",
        res.data.Data.data.rId
      );
    },
  },
};
</script>

  <style acoped>
.kj {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.login-form {
  width: 350px;
  margin: 250px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}

/* 背景 */
.login-container {
  position: absolute;
  width: 99%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  -moz-background-size: 100% 100%;
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596776016717&di=174a560fcfc5258bb85c0c65a4b5f1ac&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F4%2F54795d25701f8.jpg");
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}
</style> 