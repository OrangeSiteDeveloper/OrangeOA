<template>
  <div style="height: 100%">
    <el-container>
      <el-container>
        <el-header>
          <!-- <h1>欢迎登录</h1> -->
        </el-header>
        <el-main>
          <el-row :gutter="12" type="flex" justify="center">
            <el-col :span="6">
              <el-card>
                <div slot="header">
                  <h1>注册</h1>
                </div>
                <el-form
                  :label-position="'left'"
                  label-width="120px"
                  :model="formRegister"
                  :rules="registerRules"
                  ref="formRegister"
                >
                  <el-form-item label="请输入账号:" prop="account">
                    <el-input v-model="formRegister.account"></el-input>
                  </el-form-item>
                  <el-form-item label="请输入密码:" prop="password">
                    <el-input
                      type="password"
                      v-model="formRegister.password"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="请确认密码:" prop="rePassword">
                    <el-input
                      type="password"
                      v-model="formRegister.rePassword"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="请输入验证码:" prop="verificationCode">
                    <el-input
                      v-model="formRegister.verificationCode"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div class="from-button">
                  <el-button type="primary" @click="register">注册</el-button>
                  <el-button type="text" @click="toLogin">去登录</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
        <el-footer>
          <h4>
            Copyright &copy; 2019-2022 &nbsp;Daisy &nbsp;Version: 3.0.0-Alpha-220808
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
    const rePasswordCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formRegister.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formRegister: {
        account: "",
        password: "",
        rePassword: "",
        verificationCode: "",
      },
      registerRules: {
        account: [{ required: true, message: "请输入账号" }],
        password: [{ required: true, message: "请输入密码" }],
        rePassword: [{ required: true, validator: rePasswordCheck }],
        verificationCode: [{ required: true, message: "请输入验证码" }],
      },
    };
  },
  methods: {
    register() {
      axios
        .post("/api/basic/register", {
          formRegister: this.formRegister,
        })
        .then(
          (res) => {
            if (res.data.status == "success") {
              this.$store.commit("msgAlert", {
                message: "注册成功",
                type: "success",
              });
              this.$router.push("/login");
            } else if (res.data.status == "codeErr") {
              this.$store.commit("msgAlert", {
                message: "验证码错误",
                type: "error",
              });
            } else {
              this.$store.commit("msgAlert", {
                message: "注册失败",
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
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
  created: function () {},
};
</script>

<style>
.el-form-item__label {
  font-weight: 700;
}
</style>