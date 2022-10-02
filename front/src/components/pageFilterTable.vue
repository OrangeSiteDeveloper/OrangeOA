<!--
集成分页+筛选的可折叠table
所需参数:
1、tittle: table的标题(String)
2、tableData: table的完整数据(Array)
3、tableColumn: table展示数据的标题(Array)
4、pageSize: 单页展示的条数(Number)
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="padding: 25px 40px">
        <h2 style="float: left">{{ tittle }}</h2>
        <el-button @click="clearFilter" style="float: right" type="text">清除所有过滤器</el-button>
        <el-button @click="reGetData" style="float: right; padding-right: 5px;" type="text">重新渲染数据</el-button>
      </div>
      <div>
        <el-table ref="filterTable" :data="showData" style="width: 100%" @filter-change="filterChange">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item v-for="(item, index) in tableColumn.filter((item)=> !item.isShow)" :key="index"
                  :label="item.label">
                  <span>{{ props.row[item.value] }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column v-for="(item, index) in isTittle" :key="index" :label="item.label" :prop="item.value"
            :filters="item.filters" :column-key="item.value">
            <template #default="scope" v-if="item.value === 'operate'">
              <OButton v-for="(item1, index1) in item.buttons" :key="index1" :url="item1.url" :subData="scope.row" :label="item1.label" :methods="item1.methods">
              </OButton>
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
  </div>
</template>


<script>
import oButton from "./oButton.vue"
import OButton from "./oButton.vue";
export default {
  name: "pageFilterTable",
  data() {
    return {
      showData: [],
      filterData: this.tableData,
      Filter: {},
    };
  },
  props: ["tableData", "tittle", "tableColumn", "pageSize"],
  components: { oButton, OButton },
  computed: {
    isTittle() {
      return this.tableColumn.filter((item) => item.isShow);
    },
    getTableData() {
      return this.tableData;
    }
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
    }
  },
  mounted() {
    // this.showData = this.tableData.slice(0, this.pageSize);
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