<template>
  <PFTable 
  tittle="图书管理" 
  :tableColumn="tableColumn" 
  :tableData="tableData" 
  :pageSize="10"></PFTable>
</template>

<script>
import axios from "axios";
import PFTable from "../components/pageFilterTableBook";
export default {
  name: "bookManager",
  components: {
    PFTable,
  },
  data() {
    return {
      tableColumn: [
        {
          label: "图书编号",
          value: "bookId",
          isShow: true,
        },
        {
          label: "图书名称",
          value: "bookName",
          isShow: true,
        },
        {
          label: "借阅状态",
          value: "status",
          isShow: true,
        },
        {
          label: "借阅人",
          value: "borrowPeopleName",
          isShow: true,
        },
        // {
        //   label: "操作",
        //   value: "operate",
        //   isShow: true,
        //   buttons: [
        //     {
        //       url: "/join/pass",
        //       label: "通过",
        //       methods: "post"
        //     },
        //     {
        //       url: "/join/fail",
        //       label: "不通过",
        //       methods: "post"
        //     }
        //   ]
        // }
      ],
      tableData: []
    }
  },
  created: function () {
    // const baseUrl = "https://api.orangestudio.cn/api/book";
    const baseUrl = "http://127.0.0.1:3002/api/book";

    axios.get(baseUrl + "/getAllBook").then(
      (res) => {
        this.tableData = res.data;
      },
      (err) => {
        this.$store.commit("msgAlert", {
          message: "服务器繁忙, 请求失败",
          type: "error",
        });
        console.log(err.message);
      }
    );
  }
}
</script>