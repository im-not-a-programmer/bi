<template>
  <div class="type_style">
    <el-collapse-item name="font">
      <template slot="title">
        <i class="el-icon-arrow-right"></i>表格字体
      </template>
      <el-row>
        <el-col :span="5">表头</el-col>
        <el-col :span="18">
          <el-row :gutter="10" class="pd_bottom_10">
            <el-select v-model="module.settings.tableStyle.font.header.fontFamily" placeholder="请选择">
              <el-option v-for="item in fontFamilies" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-row>
          <el-row :gutter="10" class="pd_bottom_10">
            <el-radio-group v-model="module.settings.tableStyle.font.header.fontAlign" class="position">
              <el-radio-button label="left"><Icon iconClass="icon_align_left" /></el-radio-button>
              <el-radio-button label="center"><Icon iconClass="icon_align_center" /></el-radio-button>
              <el-radio-button label="right"><Icon iconClass="icon_align_right" /></el-radio-button>
            </el-radio-group>
            <el-color-picker v-model="module.settings.tableStyle.font.header.color" show-alpha :predefine="presetColors" class="fr"></el-color-picker>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">表身</el-col>
        <el-col :span="18">
          <el-row :gutter="10" class="pd_bottom_10">
            <el-select v-model="module.settings.tableStyle.font.body.fontFamily" placeholder="请选择">
              <el-option v-for="item in fontFamilies" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-row>
          <el-row :gutter="10">
            <el-radio-group v-model="module.settings.tableStyle.font.body.fontAlign" class="position">
              <el-radio-button label="left"><Icon iconClass="icon_align_left" /></el-radio-button>
              <el-radio-button label="center"><Icon iconClass="icon_align_center" /></el-radio-button>
              <el-radio-button label="right"><Icon iconClass="icon_align_right" /></el-radio-button>
            </el-radio-group>
            <el-color-picker v-model="module.settings.tableStyle.font.body.color" show-alpha :predefine="presetColors" class="fr"></el-color-picker>
          </el-row>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="style">
      <template slot="title">
        <i class="el-icon-arrow-right"></i>风格
      </template>
      <el-row :gutter="10" class="pd_bottom_10">
        <el-col :span="6">风格</el-col>
        <el-col :span="18">
          <div v-for="(item, key) in styleList"
               :key="key"
               :class="['table__style', {'table__style__active': module.settings.tableStyle.style.tableStyle == key}]"
               @click="handleStyle(key)">
            <Icon :iconClass="item" />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">主题色</el-col>
        <el-col :span="18">
          <el-color-picker
            v-model="module.settings.tableStyle.style.themeColor"
            :predefine="presetColors"
            class="stretch_color_picker"></el-color-picker>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="axis">
      <template slot="title">
        <i class="el-icon-arrow-right"></i>格式
      </template>
      <el-row :gutter="10" class="pd_bottom_10 slider_row">
        <el-col :span="6" class="slider-row__label">行高</el-col>
        <el-col :span="18">
          <el-slider v-model="sliderLineHeight" @change="handleSlider($event, 'lineHeight')" :max="50"></el-slider>
        </el-col>
      </el-row>
      <el-checkbox v-model="module.settings.tableStyle.format.serialNumber" class="attr__checkbox">序号</el-checkbox>
    </el-collapse-item>
  </div>
</template>
<script>
import { presetColors, fontFamilies } from '@/const/board.js'
import Icon from '@/components/Icon'

export default {
  name: 'table-style',
  data () {
    return {
      presetColors: presetColors,
      fontFamilies: fontFamilies,
      sliderLineHeight: 0,
      styleList: {
        1: 'icon_table_01',
        2: 'icon_table_02',
        3: 'icon_table_03'
      }
    }
  },
  props: {
    module: {
      type: Object,
      default: () => { return {} }
    }
  },
  components: {
    Icon
  },
  created () {
    this.sliderLineHeight = this.module.settings.tableStyle.format.lineHeight
  },
  methods: {
    handleSlider (val, type) {
      this.module.settings.tableStyle.format[type] = val
    },
    // 选择表格风格
    handleStyle (val) {
      this.module.settings.tableStyle.style.tableStyle = Number(val)
    }
  }
}
</script>
<style lang="less" scoped>
  .table__style {
    display: inline-block;
    font-size: 20px;
    line-height: 1;
    margin-right: 10px;
    border: 1px solid transparent;
  }
  .table__style__active {
    border: 1px solid #12c39b;
    border-radius: 2px;
    padding: 2px;
  }
</style>
