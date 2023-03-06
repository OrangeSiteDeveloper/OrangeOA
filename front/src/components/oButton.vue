<template>
  <button @click="submit">{{ label }}</button>
</template>

<script>
import axios from "axios";
export default {
  name: "oButton",
  data() {
    return {
      data: null
    }
  },
  props: ["url", "subData", "label", "methods"],
  methods: {
    submit() {
      const baseUrl = "https://api.orangestudio.cn/api"
      console.log(baseUrl + this.url);
      axios[this.methods](baseUrl + this.url, { data: this.subData }).then(
        (res) => {
          this.$store.commit("msgAlert", {
            message: "提交成功",
            type: "success",
          });
          this.data = res.data
        },
        (err) => {
          this.$store.commit("msgAlert", {
            message: "服务器繁忙, 请求失败",
            type: "error",
          });
          console.log(err.message);
        }
      )
    }
  }
}
</script>

<style>
button {
  border-color: transparent;
  color: #409eff;
  background: transparent;
  padding-right: 5px;
  border: 0px;
  height: auto;
  cursor: pointer;
}
button:hover {
  color: #a0cfff;
}
</style>
