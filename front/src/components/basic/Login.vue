<template>
  <div style="height: 100%">
    <el-container>
      <el-container>
        <el-header>
          <!-- <h1>欢迎登录</h1> -->
        </el-header>
        <el-main>
          <el-row :gutter="12" type="flex" justify="center">
            <el-col :span="8">
              <el-card>
                <div slot="header">
                  <h1>登录</h1>
                </div>
                <el-form
                  :label-position="'left'"
                  label-width="60px"
                  :model="formLogin"
                  :rules="loginRules"
                  ref="formLogin"
                >
                  <el-form-item label="账号:" prop="account">
                    <el-input v-model="formLogin.account"></el-input>
                  </el-form-item>
                  <el-form-item label="密码:" prop="password">
                    <el-input
                      type="password"
                      v-model="formLogin.password"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="赛事:" prop="competitions">
                    <el-select
                      v-model="formLogin.competitions"
                      placeholder="请选择"
                      :loading="competitionLoading"
                    >
                      <el-option
                        v-for="item in competitions"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"
                        :disabled="item.disabled"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <div class="from-button">
                    <el-button type="primary" @click="login('formLogin')"
                      >登录</el-button
                    >
                    <el-button type="text" @click="toRegister"
                      >去注册</el-button
                    >
                  </div>
                </el-form>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
        <el-footer>
          <h4>
            Copyright &copy; 2019-2023 &nbsp;OrangeOA &nbsp;Version: 1.1.0-2303062143
            &nbsp;
          </h4>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import navBar from "../navBar.vue";
export default {
  name: "Login",
  components: {
    navBar,
  },
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
        competitions: [{ required: true, message: "请选择赛事" }],
      },
    };
  },
  methods: {
    login(loginRules) {
      this.$refs[loginRules].validate((valid) => {
        if (valid) {
          axios
            .post("/api/basic/login", {
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
                  sessionStorage.setItem("competition", res.data.competition);
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
  created: function () {
    axios.get("/api/basic/competitionMenu").then(
      (res) => {
        this.competitions = res.data;
        this.competitionLoading = false;
      },
      (err) => {
        this.$store.commit("msgAlert", {
          message: "服务器繁忙, 赛事列表加载失败",
          type: "error",
        });
        console.log(err.message);
      }
    );

    this.$cookies.remove("token");
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

</style>