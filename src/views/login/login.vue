
<template>
   <div class="login-container">
      <el-form ref="form" :rules="rules" :model="EmployeeLogin" label-width="80px" class="login-form">
        <h2 class="login-title">管理系统</h2>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="EmployeeLogin.eLogin"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type='password' v-model="EmployeeLogin.ePwd"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>



    <script>
  export default {
    data() {
      return {
        EmployeeLogin: {
          eLogin: "",
          ePwd: "",
        },
        rules: {
          username: [
            {required: true, message: "用户名不能为空", trigger: 'blur'},
            {min: 3, max: 10, message: "用户名3-5位", trigger: 'blur'}
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: 'blur'},
            {min: 3, max: 10, message: "密码3-5位", trigger: 'blur'}
          ]
      }
      };
    },
    methods: {
      submitForm(formName) {
          this.$refs[formName].validate(valid => {
            // console.log(valid) 验证通过为true，有一个不通过就是false
            if (valid) {
              // 通过的逻辑
            } else {
              console.log('验证失败');
              return false;
            }
          });
      }
    }
  };
  </script>

  <style acoped>
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
    width: 85%;
    height: 85%;

    background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596775268455&di=a700bf6b90fba457e88757335054c297&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1754151445%2C3301553678%26fm%3D214%26gp%3D0.jpg') ;
  }

  /* 标题 */
  .login-title {
    color: #303133;
    text-align: center;
  }
  </style> 