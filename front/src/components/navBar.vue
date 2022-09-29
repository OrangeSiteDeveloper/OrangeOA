<template>
  <div>
    <div class="sidenav-header d-flex align-items-center">
      <transition name="fade">
        <img :src="url" class="navImg" v-show="!isCollapse" @click="$router.push('/')"/>
      </transition>
      <div class="sidenav-toggler">
        <el-button
          @click="menuChange"
          icon="icon-other"
          type="text"
          class="navIcon"
        ></el-button>
      </div>
    </div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      show-timeout="0"
      hide-timeout="0"
    >
      <!-- 无子菜单 -->
      <el-menu-item
        v-for="item in noChildren"
        :index="item.key"
        :key="item.key"
        @click="changePath(item)"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <!-- 有子菜单 -->
      <el-submenu v-for="item in hasChildren" :index="item.key" :key="item.key">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem.key"
          @click="changePath(subItem)"
        >
          <el-menu-item :index="subItem.key">{{ subItem.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
import axios from "axios";
export default {
  name: "navBar",
  data() {
    return {
      isCollapse: false,
      url: require("../../public/logo2.png"),
      menu: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    menuChange() {
      this.isCollapse = !this.isCollapse;
    },
    changePath(item) {
      this.$router.push({ name: item.name });
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter(
        (item) =>
          !item.children &&
          item.isUsed &&
          item.auth == sessionStorage.getItem("auth")
      );
    },
    hasChildren() {
      return this.menu.filter(
        (item) =>
          item.children &&
          item.isUsed &&
          item.auth == sessionStorage.getItem("auth")
      );
    },
  },
  created: function () {
    const baseUrl = "http://localhost:3000/api/base";

    axios.get(baseUrl + "/navBar").then(
      (res) => {
        this.menu = res.data;
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
};
</script>

<style scoped>
.el-menu {
  border-right: solid 0px !important;
}
.el-menu-vertical-demo {
  margin: 0 !important;
}
.navImg {
  padding: 1rem;
  width: 140px;
}
.sidenav-header {
  height: 78px;
}
.align-items-center {
  align-items: center !important;
}
.d-flex {
  display: flex !important;
}
.sidenav-toggler {
  padding: 1rem;
  cursor: pointer;
}
.navIcon {
  font-size: 30px !important;
  color: #909399;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
