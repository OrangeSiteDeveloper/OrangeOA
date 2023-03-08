<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="padding: 25px 40px">
        <h2 style="float: left">{{ tittle }}</h2>
        <el-button @click="bookImportClick()" style="float: right" type="text">图书录入</el-button>
        <el-button @click="bookBorrowingFormVisible = true" style="float: right; padding-right: 5px;"
          type="text">图书借阅</el-button>
      </div>
      <div>
        <el-table ref="filterTable" :data="showData" style="width: 100%" @filter-change="filterChange">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item v-for="(item, index) in tableColumn.filter((item) => !item.isShow)" :key="index"
                  :label="item.label">
                  <span>{{ props.row[item.value] }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column v-for="(item, index) in isTittle" :key="index" :label="item.label" :prop="item.value"
            :filters="item.filters" :column-key="item.value">
            <template #default="scope" v-if="item.value === 'operate'">
              <oButton v-for="(item1, index1) in item.buttons" :key="index1" :url="item1.url" :subData="scope.row"
                :label="item1.label" :methods="item1.methods">
              </oButton>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination layout="prev, pager, next, jumper" :hide-on-single-page="true"
          :total="Math.ceil(filterData.length / pageSize) * 10" @current-change="changePage">
        </el-pagination>
      </div>
    </el-card>


    <el-dialog title="图书录入" :visible.sync="bookImportFormVisible" width="30%">
      <el-form :model="bookImportForm">
        <el-form-item label="图书编号:" :label-width="formLabelWidth">
          <el-input v-model="bookImportForm.bookId" autocomplete="off" v-focus></el-input>
        </el-form-item>
        <el-form-item label="图书名称:" :label-width="formLabelWidth">
          <el-input v-model="bookImportForm.bookName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入库时间:" :label-width="formLabelWidth">
          <el-input v-model="bookImportForm.importTime" autocomplete="off" readonly></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bookImportFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="importBook">录 入</el-button>
      </div>
    </el-dialog>

    <el-dialog title="图书借阅" :visible.sync="bookBorrowingFormVisible" width="30%">
      <el-form :model="bookBorrowingForm">
        <el-form-item label="图书编号:" :label-width="formLabelWidth">
          <el-input v-model="bookBorrowingForm.bookId" autocomplete="off" ref="elInput" v-focus @blur="searchBookStatus(bookBorrowingForm.bookId)"></el-input>
        </el-form-item>
        <el-form-item label="图书名称:" :label-width="formLabelWidth">
          {{ bookBorrowingForm.bookName }}
        </el-form-item>
        <el-form-item label="入库时间:" :label-width="formLabelWidth">
          {{ bookBorrowingForm.importTime }}
        </el-form-item>
        <el-form-item label="借阅状态:" :label-width="formLabelWidth">
          {{ bookBorrowingForm.status }}
        </el-form-item>
        <el-form-item label="借阅人:" v-if="bookBorrowingForm.status === 'borrowed'" :label-width="formLabelWidth">
          {{ bookBorrowingForm.peopleName }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bookBorrowingFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="bookBorrowingFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import axios from "axios";
import oButton from "./oButton.vue"
export default {
  name: "pageFilterTable",
  data() {
    return {
      showData: [],
      filterData: this.tableData,
      Filter: {},
      bookImportFormVisible: false,
      bookBorrowingFormVisible: false,
      bookImportForm: {
        bookId: "",
        bookName: "",
        importTime: ""
      },
      bookBorrowingForm: {
        bookId: "",
        bookName: "",
        importTime: "",
        status: "",
        peopleName: ""
      },
      formLabelWidth: '80px'
    };
  },
  props: ["tableData", "tittle", "tableColumn", "pageSize"],
  components: { oButton },
  computed: {
    isTittle() {
      return this.tableColumn.filter((item) => item.isShow);
    },
    getTableData() {
      return this.tableData;
    },
  },
  methods: {
    reGetData() {
      this.filterData = this.tableData;
      this.showData = this.tableData.slice(0, this.pageSize);
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
      this.showData = this.tableData.slice(0, this.pageSize);
      this.filterData = this.tableData;
    },
    changePage(val) {
      this.showData = this.filterData.slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
    },
    filterChange(column) {
      const key = Object.keys(column);
      const value = Object.values(column);
      const filterKeys = Object.keys(this.Filter);

      this.Filter[key] = value[0];
      this.filterData = this.tableData;

      const filterValues = Object.values(this.Filter);

      for (let i = 0; i < filterKeys.length; i++) {
        this.filterData = this.filterData.filter(
          (item) =>
            filterValues[i].includes(item[filterKeys[i]]) ||
            filterValues[i].length === 0
        );
      }
      this.showData = this.filterData.slice(0, this.pageSize);
    },
    bookImportClick() {
      const date = new Date();
      let year = date.getFullYear() // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let hour = date.getHours(); // 时
      let minutes = date.getMinutes(); // 分
      let seconds = date.getSeconds() //秒
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (day >= 0 && day <= 9) {
        day = "0" + day;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      this.bookImportFormVisible = true;
      this.bookImportForm.importTime = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    },
    importBook() {
      this.bookImportFormVisible = false;
      const baseUrl = "https://api.orangestudio.cn/api";
      // const baseUrl = "http://127.0.0.1:3002/api/book";
      axios.post(baseUrl + "/importBook", { data: this.bookImportForm })
        .then(
          (res) => {
            console.log(res.data);
          },
          (err) => {
            console.log(err);
            this.$store.commit("msgAlert", {
              message: "服务器繁忙, 请求失败",
              type: "error",
            });
          }
        )
    },
    searchBookStatus(id) {
      if(id) console.log("我要查找id是:" + id + "的这本书");
      else this.$refs.elInput.focus()
    }
  },
  mounted() {
    const filters = this.tableColumn.filter((item) => item.filters);
    for (let i = 0; i < filters.length; i++) {
      this.Filter[filters[i].value] = filters[i].filterVal;
    }
  },
  watch: {
    getTableData(newVal) {
      if (newVal) {
        this.filterData = this.tableData;
        this.showData = this.tableData.slice(0, this.pageSize);
      }
    }
  }

};
</script>
<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.block {
  margin-top: 10px;
  text-align: right;
}
</style>