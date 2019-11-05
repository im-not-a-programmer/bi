<template>
  <section class="attr-content">
    <el-row :gutter="10" class="slider_row">
      <el-col :span="8" class="slider-row__label">半径大小</el-col>
      <el-col :span="16">
        <el-slider
          v-model="sliderOuter"
          @change="handlePie($event, 'pieRadiusOuterValue')"
          :max="1"
          :step="0.01"
          :format-tooltip="formatTooltip"></el-slider>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="slider_row">
      <el-col :span="8" class="slider-row__label">内径占比</el-col>
      <el-col :span="16">
        <el-slider
          v-model="sliderInnder"
          @change="handlePie($event, 'pieRadiusinnerValue')"
          :max="1"
          :step="0.01"
          :format-tooltip="formatTooltip"></el-slider>
      </el-col>
    </el-row>
  </section>
</template>
<script>

export default {
  name: 'attr-pie-radius',
  props: {
    module: {
      type: Object,
      default: () => { return {} }
    },
    dataId: {
      type: String,
      default: ''
    },
    option: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      sliderOuter: 0,
      sliderInnder: 0
    }
  },
  created () {
    this.sliderOuter = this.module.settings.chartAttr[this.dataId].size.pieRadiusOuterValue
    this.sliderInnder = this.module.settings.chartAttr[this.dataId].size.pieRadiusinnerValue
  },
  methods: {
    formatTooltip (val) {
      return `${parseInt(val * 100)}%`
    },
    handlePie (val, type) {
      this.module.settings.chartAttr[this.dataId].size[type] = val
    }
  }
}
</script>
<style lang="less" scoped>
</style>
