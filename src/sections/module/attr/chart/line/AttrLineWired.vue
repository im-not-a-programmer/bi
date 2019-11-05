<template>
  <section class="attr-content">
    <el-row :gutter="10" class="slider_row pd_bottom_10">
      <el-col :span="6" class="slider-row__label">线宽</el-col>
      <el-col :span="18">
        <el-slider
          v-model="sliderLine"
          @change="handleLine($event, 'lineWidth')"
          :show-tooltip="false"
          :max="20"></el-slider>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="pd_bottom_10">
      <el-col :span="6">线型</el-col>
      <el-col :span="18">
        <el-radio-group v-model="module.settings.chartAttr[dataId].line.type" class="attr__radio_button">
          <el-radio-button label="line">直线</el-radio-button>
          <el-radio-button label="smooth">曲线</el-radio-button>
          <el-radio-button label="step">垂直</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
  </section>
</template>
<script>

export default {
  name: 'attr-line-wired',
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
      sliderLine: 0
    }
  },
  created () {
    this.sliderLine = this.module.settings.chartAttr[this.dataId].size.lineWidth
  },
  methods: {
    formatTooltip (val) {
      return `${parseInt(val * 100)}%`
    },
    handleLine (val, type) {
      this.module.settings.chartAttr[this.dataId].size[type] = val
    }
  }
}
</script>
<style lang="less" scoped>
</style>
