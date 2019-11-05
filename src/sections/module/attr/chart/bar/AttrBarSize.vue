<template>
  <section class="attr-content">
    <el-row :gutter="10" class="slider_row">
      <el-col :span="6" class="slider-row__label">柱宽</el-col>
      <el-col :span="18">
        <el-slider
          v-model="sliderWidth"
          @change="handleBar($event, 'barWidth')"
          :show-tooltip="false"
          :step="0.01"
          :max="0.5"></el-slider>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="slider_row">
      <el-col :span="6" class="slider-row__label">圆角</el-col>
      <el-col :span="18">
        <el-slider
          v-model="sliderRadius"
          @change="handleBar($event, 'barBorderRadius')"
          :format-tooltip="formatTooltip"
          :max="50"></el-slider>
      </el-col>
    </el-row>
  </section>
</template>
<script>

export default {
  name: 'attr-bar-size',
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
      sliderWidth: 0,
      sliderRadius: 0
    }
  },
  created () {
    this.sliderWidth = this.module.settings.chartAttr[this.dataId].size.barWidth
    this.sliderRadius = this.module.settings.chartAttr[this.dataId].size.barBorderRadius
  },
  methods: {
    formatTooltip (val) {
      return `${val}px`
    },
    handleBar (val, type) {
      this.module.settings.chartAttr[this.dataId].size[type] = val
    }
  }
}
</script>
