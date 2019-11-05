<template>
  <div class="attr_axis">
    <el-select v-model="module.settings.chartAttr[dataId].axis.axisIndex" class="attr_axis__select">
      <el-option v-for="(item, key) in options" :key="key" :label="item" :value="key"></el-option>
    </el-select>
  </div>
</template>
<script>
  export default {
    name: 'attr-axis',
    data () {
      return {
        options: {
          0: '主Y轴',
          1: '次Y轴'
        }
      }
    },
    props: {
      module: {
        type: Object,
        default: () => { return {} }
      },
      dataId: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style lang="less" scoped>
  .attr_axis {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
    width: 50%;
    display: inline-block;
    .attr_axis__select {
      width: 100%;
      /deep/ input {
        border-radius: 0;
        background-color: #f8f9fb;
      }
    }
  }
</style>
