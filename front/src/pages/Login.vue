<template>
  <div style="height: 100%">
    <el-container>
      <el-container>
        <el-main>
          <el-row :gutter="12" type="flex" justify="center" align="middle">
            <el-col :span="6">
              <el-card>
                <div slot="header">
                  <h1>登录</h1>
                </div>
                <el-form :label-position="'left'" label-width="60px" :model="formLogin" :rules="loginRules"
                  ref="formLogin">
                  <el-form-item label="账号:" prop="account">
                    <el-input v-model="formLogin.account"></el-input>
                  </el-form-item>
                  <el-form-item label="密码:" prop="password">
                    <el-input type="password" v-model="formLogin.password" show-password></el-input>
                  </el-form-item>
                  <div class="from-button">
                    <el-button type="primary" @click="login('formLogin')">登录</el-button>
                    <el-button type="text" @click="toRegister">去注册</el-button>
                  </div>
                </el-form>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
        <el-footer>
          <h4>
            Copyright &copy; 2019-2022 &nbsp;OrangeOA &nbsp;Version: 1.0.0-2209271845
            &nbsp;
          </h4>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      formLogin: {
        account: "",
        password: "",
        competitions: "",
      },
      formRegister: {
        account: "",
        password: "",
        rePassword: "",
        verificationCode: "",
      },
      competitions: [],
      competitionLoading: true,
      loginRules: {
        account: [{ required: true, message: "请输入账号" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    login(loginRules) {
      const baseUrl = "https://api.orangestudio.cn/api";
      this.$refs[loginRules].validate((valid) => {
        if (valid) {
          axios
            .post(baseUrl + "/login", {
              formLogin: this.formLogin,
            })
            .then(
              (res) => {
                if (res.data.status == "success") {
                  this.$store.commit("msgAlert", {
                    message: "登录成功",
                    type: "success",
                  });
                  this.$cookies.set("token", res.data.token, "0");
                  sessionStorage.setItem("auth", res.data.auth);
                  sessionStorage.setItem("account", res.data.account);
                  this.$router.push("/");
                } else {
                  this.$store.commit("msgAlert", {
                    message: "用户名或密码错误",
                    type: "error",
                  });
                }
              },
              (err) => {
                this.$store.commit("msgAlert", {
                  message: "服务器繁忙, 请求失败",
                  type: "error",
                });
                console.log(err.message);
              }
            );
        } else {
          return false;
        }
      });
    },
    toRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.el-form-item__label {
  font-weight: 700;
}

.el-input--suffix .el-input__inner {
  padding-right: 90px;
}

.el-select {
  width: 100% !important;
}

.el-main {
  display: flex;
}

.el-row {
  height: 100%;
  width: 100%;
}
</style>