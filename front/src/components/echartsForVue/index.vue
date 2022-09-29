<template>
  <div :id="uuid" :style="style"></div>
</template>

<script>
import * as echarts from "echarts";

const idGen = () => {
  return Math.random();
};

export default {
  props: {
    height: {
      type: String,
      default: "400px",
    },
    width: {
      type: String,
      default: "400px",
    },
    options: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      uuid: null,
      myChart: null,
    };
  },

  watch: {
    width() {
      if (this.myChart) {
        this.myChart.resize({
          animation: {
            duration: 300,
          },
        });
      }
    },

    options: {
      deep: true,
      handler() {
        this.updateChartView()
      },
    },
  },

  methods: {
    updateChartView() {
      if (!this.myChart) return;
      this.myChart.setOption(this.options);
    },
  },

  computed: {
    style() {
      return {
        height: this.height,
        width: this.width,
      };
    },
  },

  created() {
    this.uuid = idGen();
  },

  mounted() {
    this.myChart = echarts.init(document.getElementById(this.uuid));

    this.myChart.setOption(this.options);
  },
};
</script>

<style>
</style>