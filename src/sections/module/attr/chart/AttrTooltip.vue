<template>
  <section class="attr-content">
    <el-row :gutter="10">
      <el-col :span="6">背景</el-col>
      <el-col :span="18">
        <el-color-picker
          v-model="module.settings.chartAttr[dataId].tooltip.backgroundColor"
          class="stretch_color_picker"
          show-alpha
          :predefine="presetColors">
        </el-color-picker>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { presetColors } from '@/const/board.js'

export default {
  name: 'attr-tooltip',
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
      presetColors: presetColors
    }
  }
}
</script>
