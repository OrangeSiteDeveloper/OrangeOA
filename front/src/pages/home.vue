<template>
  <div style="height: 100%">
    <el-container>
      <aside>
        <navBar />
      </aside>
      <el-container>
        <el-header>
          <el-row type="flex" justify="end">
            <el-col :span="2">
              <!-- <el-button round @click="test">一键发送!</el-button> -->
              <el-button round @click="logout">退出</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <transition name="main" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer>
          <h4>
            Copyright &copy; 2019-2022 &nbsp;Daisy &nbsp;Version:
            1.0.0-220928 &nbsp;
          </h4>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import axios from "axios";

export default {
  name: "home",
  components: {
    navBar,
  },
  data() {
    return {
      width: "400px",
      height: "400px",
      account: sessionStorage.getItem("account"),
      competition: sessionStorage.getItem("competition"),
    };
  },
  methods: {
    test() {
      axios.post("http://localhost:3000/api/email/sendMail").then(
        (res) => {
          console.log(res.data);
        },
        (err) => {
          console.log(err.message);
        }
      );
    },
    logout() {
      this.$cookies.remove("token");
      this.$router.push("/login");
      this.$store.commit("msgAlert", { message: "退出成功", type: "success" });
    },
  },
  mounted: function () {},
};
</script>

<style scoped>

.main-enter,
.main-leave-to {
  transform: translateY(300px);
  opacity: 0;
}
.main-enter-active {
  transition: all .3s ease;
}
.main-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
</style>