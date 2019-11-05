<template>
  <el-collapse-item :name="`yAxis${index}`">
    <template slot="title">
      <i class="el-icon-arrow-right"></i>{{index === '0' ? '主Y轴' : '次Y轴'}}
      <el-checkbox v-model="module.settings.chartStyle.yAxis[index].axisEnable" class="style__show" >显示</el-checkbox>
    </template>
    <el-row :gutter="10" class="pd_bottom_10">
      <el-col :span="6">位置</el-col>
      <el-col :span="18">
        <el-radio-group v-model="module.settings.chartStyle.yAxis[index].position" class="attr__radio_button">
          <el-radio-button label="left">居左</el-radio-button>
          <el-radio-button label="right">居右</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="pd_bottom_10">
      <el-col :span="6">间距</el-col>
      <el-col :span="18">
        <el-input-number v-model="module.settings.chartStyle.yAxis[index].offset" controls-position="right" :min="0" class="input_number_right" ></el-input-number>px
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">名称</el-col>
      <el-col :span="18">
        <el-checkbox v-model="module.settings.chartStyle.yAxis[index].nameEnable" class="pd_bottom_10">显示</el-checkbox>
        <el-radio-group v-model="module.settings.chartStyle.yAxis[index].nameLocation" class="attr__radio_button pd_bottom_10">
          <el-radio-button label="end">居上</el-radio-button>
          <el-radio-button label="middle">居中</el-radio-button>
          <el-radio-button label="start">居下</el-radio-button>
        </el-radio-group>
        <el-input v-model="module.settings.chartStyle.yAxis[index].name" placeholder="请输入坐标轴名称" :maxlength="15"></el-input>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>
<script>

export default {
  name: 'y-axis-style',
  props: {
    module: {
      type: Object,
      default: () => { return {} }
    },
    index: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
</style>
