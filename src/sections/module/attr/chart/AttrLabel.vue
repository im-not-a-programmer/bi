<template>
  <section class="attr-content">
    <el-checkbox v-model="module.settings.chartAttr[dataId].label.enabled" class="attr__checkbox pd_bottom_10">显示</el-checkbox>
    <el-row :gutter="10">
      <el-col :span="6">位置</el-col>
      <el-col :span="18">
        <el-radio-group v-model="module.settings.chartAttr[dataId].label.position" class="attr__radio_button">
          <el-radio-button v-for="(value, key) in position" :key="key" :label="key">{{value}}</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
  </section>
</template>
<script>
export default {
  name: 'attr-label',
  props: {
    module: {
      type: Object,
      default: () => { return {} }
    },
    dataId: {
      type: String,
      default: ''
    },
    position: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
