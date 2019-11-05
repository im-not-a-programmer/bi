<template>
  <div class="type_style">
    <el-collapse-item name="legend">
      <template slot="title">
        <i class="el-icon-arrow-right"></i>图例
        <el-checkbox v-model="module.settings.chartStyle.legend.enabled" class="style__show" >显示</el-checkbox>
      </template>
      <el-row :gutter="10" class="pd_bottom_10">
        <el-col :span="6">边框</el-col>
        <el-col :span="18">
          <el-color-picker v-model="module.settings.chartStyle.legend.borderColor" show-alpha :predefine="presetColors" class="stretch_color_picker"></el-color-picker>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="6">位置</el-col>
        <el-col :span="18">
          <el-radio-group v-model="module.settings.chartStyle.legend.position" class="attr__radio_button">
            <el-radio-button label="top">上</el-radio-button>
            <el-radio-button label="bottom">下</el-radio-button>
            <el-radio-button label="left">左</el-radio-button>
            <el-radio-button label="right">右</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="axis">
      <template slot="title">
        <i class="el-icon-arrow-right"></i>轴线
        <el-checkbox v-model="module.settings.chartStyle.axis.enabled" class="style__show" >显示</el-checkbox>
      </template>
      <el-row :gutter="10" class="pd_bottom_10">
        <el-col :span="6">线型</el-col>
        <el-col :span="18">
          <el-select v-model="module.settings.chartStyle.axis.type" placeholder="请选择" class="pd_bottom_10">
            <el-option key="solid" label="——————" value="solid"></el-option>
            <el-option key="dashed" label="---------------" value="dashed"></el-option>
          </el-select>
          <el-input-number v-model="module.settings.chartStyle.axis.width" controls-position="right" :min="1" class="input_number_right" ></el-input-number>px
          <el-color-picker v-model="module.settings.chartStyle.axis.color" class="fr" show-alpha :predefine="presetColors"></el-color-picker>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="vGrid">
      <template slot="title">
        <i class="el-icon-arrow-right"></i>横向网格线
        <el-checkbox v-model="module.settings.chartStyle.vGrid.enabled" class="style__show" >显示</el-checkbox>
      </template>
      <el-row :gutter="10" class="pd_bottom_10">
        <el-col :span="6">线型</el-col>
        <el-col :span="18">
          <el-select v-model="module.settings.chartStyle.vGrid.type" placeholder="请选择" class="pd_bottom_10">
            <el-option key="solid" label="——————" value="solid"></el-option>
            <el-option key="dashed" label="---------------" value="dashed"></el-option>
          </el-select>
          <el-input-number v-model="module.settings.chartStyle.vGrid.width" controls-position="right" :min="1" class="input_number_right"></el-input-number>px
          <el-color-picker v-model="module.settings.chartStyle.vGrid.color" class="fr" show-alpha :predefine="presetColors"></el-color-picker>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="hGrid">
      <template slot="title">
        <i class="el-icon-arrow-right"></i>纵向网格线
        <el-checkbox v-model="module.settings.chartStyle.hGrid.enabled" class="style__show" >显示</el-checkbox>
      </template>
      <el-row :gutter="10" class="pd_bottom_10">
        <el-col :span="6">线型</el-col>
        <el-col :span="18">
          <el-select v-model="module.settings.chartStyle.hGrid.type" placeholder="请选择" class="pd_bottom_10">
            <el-option key="solid" label="——————" value="solid"></el-option>
            <el-option key="dashed" label="---------------" value="dashed"></el-option>
          </el-select>
          <el-input-number v-model="module.settings.chartStyle.hGrid.width" controls-position="right" :min="1" class="input_number_right"></el-input-number>px
          <el-color-picker v-model="module.settings.chartStyle.hGrid.color" class="fr" show-alpha :predefine="presetColors"></el-color-picker>
        </el-col>
      </el-row>
    </el-collapse-item>
    <template v-if="module.cType==='barLine'">
      <YAxisStyle v-for="(item, key) in module.settings.chartStyle.yAxis" :key="key" :index="key" :module="module" />
    </template>
  </div>
</template>
<script>
import { presetColors } from '@/const/board.js'
import YAxisStyle from '@/sections/module/style/YAxisStyle'

export default {
  name: 'chart-style',
  data () {
    return {
      presetColors: presetColors
    }
  },
  props: {
    module: {
      type: Object,
      default: () => { return {} }
    }
  },
  components: {
    YAxisStyle
  }
}
</script>
<style lang="less" scoped>
</style>
