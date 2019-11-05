<template>
  <section class="attr-content">
    <el-row :gutter="10">
      <el-col :span="8" class="label">文字颜色</el-col>
      <el-col :span="16">
        <el-color-picker v-model="module.settings.tableAttr[dataId].color.color" show-alpha :predefine="presetColors" class="stretch_color_picker"></el-color-picker>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { presetColors } from '@/const/board.js'

export default {
  name: 'attr-table-color',
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
