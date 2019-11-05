<template>
  <div :id=chartId class="chart"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'chart',
  props: {
    mId: {
      type: String,
      default: ''
    },
    option: {
      type: Object,
      default: () => { return {} }
    },
    cType: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      barChart: null
    }
  },
  computed: {
    chartId () {
      return `chart-${this.mId}`
    }
  },
  watch: {
    option (newVal, oldVal) {
      this.barChart.clear()
      this.resize()
      if (!newVal || !this.cType) return
      if (oldVal && (newVal.theme !== oldVal.theme)) {
        this.barChart.dispose()
        this.barChart = echarts.init(document.getElementById(this.chartId), newVal.theme)
      }
      this.barChart.setOption(newVal.charts)
    }
  },
  mounted () {
    this.barChart = echarts.init(document.getElementById(this.chartId), this.theme)
  },
  methods: {
    resize () {
      this.barChart.resize()
    }
  }
}
</script>
<style lang="less" scoped>
  .chart {
    width: 100%;
    height: 100%;
  }
</style>
