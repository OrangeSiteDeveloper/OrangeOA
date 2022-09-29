<template>
  <PFTable tittle="面试管理" :tableColumn="tableColumn" :tableData="tableData" :pageSize="10"></PFTable>
</template>

<script>
import axios from "axios";
import PFTable from "../components/pageFilterTable";
export default {
  name: "joinManager",
  components: {
    PFTable,
  },
  data() {
    return {
      tableColumn: [
        {
          label: "学号",
          value: "sId",
          isShow: true,
        },
        {
          label: "姓名",
          value: "sName",
          isShow: true,
        },
        {
          label: "性别",
          value: "sex",
          isShow: false,
        },
        {
          label: "专业",
          value: "sMajor",
          isShow: false,
        },
        {
          label: "手机号",
          value: "sPhone",
          isShow: false,
        },
        {
          label: "QQ",
          value: "sQQ",
          isShow: false,
        },
        {
          label: "电子邮箱",
          value: "sEmail",
          isShow: false,
        },
        {
          label: "意向小组",
          value: "sGroup",
          isShow: true,
          filters: [
            { text: "web", value: "web" },
            { text: "programming", value: "programming"},
            { text: "bigData", value: "bigData"},
            { text: "embedded", value: "embedded"},
            { text: "hardware", value: "hardware"},
          ],
          filterVal: [
          "web", "programming", "bigData", "embedded", "hardware" 
          ]
        },
        {
          label: "意向部门",
          value: "sDepartment",
          isShow: true,
        },
        {
          label: "简短文字描述",
          value: "w3review",
          isShow: false,
        },
        {
          label: "面试进度",
          value: "steps",
          isShow: false,
        },
        {
          label: "面试状态",
          value: "status",
          isShow:  true,
          filters: [
            { text: "2.1", value: "2.1" },
            { text: "2.2", value: "2.2"},
          ],
          filterVal: [
          "2.1", "2.2"
          ]
        },
        {
          label: "面试场次",
          value: "interview",
          isShow: false,
        }
        
      ],
      tableData: []
    }
  },
  created: function () {
    const baseUrl = "http://localhost:3000/api/join";

    axios.post(baseUrl + "/getAllStu").then(
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