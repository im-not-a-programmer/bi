<template>
  <section class="attr-content attr_color">
    <el-row :gutter="10" class="pd_bottom_10">
      <el-col :span="8" class="label">配色方案</el-col>
      <el-col :span="16">
        <el-popover
          placement="bottom-end"
          width="150"
          trigger="click"
          ref="schemePopover"
          class="scheme"
          popper-class="scheme_popper">
          <el-scrollbar class="scheme_list no_x_scrollbar" wrapClass="scheme_list__wrap" tag="div">
            <div :class="['scheme_list__item', {'active' :module.settings.chartStyle.color.auto}]" @click="handleAuto">
              <p><Icon iconClass="icon_auto" />自动</p>
            </div>
            <div v-for="(value, key) in colorScheme" :key="key">
              <span>{{value.name}}</span>
              <div :class="['scheme_list__item', {'active' :key === module.settings.chartStyle.color.scheme}]">
                <div v-for="item in value.colors.slice(0, 5)" :key="item" :style="'background-color: '+item" @click="handleScheme(key)"></div>
              </div>
            </div>
          </el-scrollbar>
          <div class="scheme_list__item fr" slot="reference">
            <p v-if="module.settings.chartStyle.color.auto === true"><Icon iconClass="icon_auto" />自动</p>
            <p v-else-if="module.settings.chartStyle.color.map !== null">自定义</p>
            <div v-else v-for="item in colorScheme[module.settings.chartStyle.color.scheme].colors.slice(0, 5)" :key="item" :style="'background-color: '+item"></div>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </el-popover>
      </el-col>
    </el-row>
    <el-scrollbar class="color_list no_x_scrollbar" viewClass="color_list__view" tag="ul" v-loading="loading">
      <li v-for="(item, index) in colorList" :key="index">
        <el-color-picker
          v-model="item.value"
          show-alpha
          @change="handleUserDefined(index)"
          :predefine="presetColors"
          class="color_picker">
        </el-color-picker>
        {{item.name}}
      </li>
    </el-scrollbar>
    <el-row :gutter="10">
      <el-col :span="6">边框</el-col>
      <el-col :span="18">
        <el-color-picker v-model="module.settings.chartAttr[dataId].color.borderColor" show-alpha :predefine="presetColors" class="stretch_color_picker"></el-color-picker>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="slider_row">
        <el-col :span="6" class="slider-row__label">透明</el-col>
        <el-col :span="18">
          <el-slider
            v-model="sliderOpacity"
            @change="handleOpacity($event, 'opacity')"
            :max="1"
            :step="0.01"
            :format-tooltip="formatTooltip"></el-slider>
        </el-col>
      </el-row>
  </section>
</template>
<script>
import constant from '@/const/board.js'
import Icon from '@/components/Icon'
import _ from 'lodash'

export default {
  name: 'attr-color',
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
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sliderOpacity: 0,
      presetColors: constant.presetColors,
      colorScheme: constant.chartConst.colorScheme,
      colorList: null // 展示的颜色列表
    }
  },
  created () {
    this.sliderOpacity = this.module.settings.chartAttr[this.dataId].color.opacity
  },
  watch: {
    'option.chartSetting.color.colorList': {
      handler (newVal) {
        this.colorList = _.cloneDeep(newVal)
      },
      deep: true
    }
  },
  components: {
    Icon
  },
  methods: {
    formatTooltip (val) {
      return `${parseInt(val * 100)}%`
    },
    // 选择配色方案
    handleScheme (key) {
      if (this.module.settings.chartStyle.color.scheme === key) { return }
      this.module.settings.chartStyle.color = {
        auto: false,
        map: null,
        scheme: key
      }
      this.$refs.schemePopover.doClose()
    },
    // 选择自动配色
    handleAuto () {
      if (this.module.settings.chartStyle.color.auto) { return }
      this.module.settings.chartStyle.color = {
        auto: true,
        map: null,
        scheme: null
      }
      this.$refs.schemePopover.doClose()
    },
    // 用户自定义颜色
    handleUserDefined (index) {
      this.module.settings.chartStyle.color = {
        auto: false,
        scheme: this.module.settings.chartStyle.color.scheme || this.module.theme
      }
      this.module.settings.chartStyle.color.map = this.option.chartSetting.color.map || {}
      this.module.settings.chartStyle.color.map[index] = this.colorList[index].value
    },
    // 改变透明度
    handleOpacity (val, type) {
      this.module.settings.chartAttr[this.dataId].color[type] = val
    }
  }
}
</script>
<style lang="less">
  .attr_color {
    .color_list {
      background-color: #fff;
      margin-bottom: 10px;
      .color_list__view {
        height: 150px;
        padding: 10px;
        li:last-child {
          margin-bottom: 17px;
        }
        .color_picker{
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
    .label {
      margin-top: 8px;
    }
  }
  .scheme, .scheme_popper {
    .scheme_list__item {
      width: 120px;
      height: 27px;
      margin: 4px 0;
      border: 1px solid #e8eaed;
      padding: 1px;
      cursor: pointer;
      display: flex;
      > div {
        flex: 1;
        margin: 1px;
      }
      p {
        width: 100%;
        text-align: center;
        line-height: 26px;
        .svg-icon {
          font-size: 16px;
          margin-right: 5px;
        }
      }
      i {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
    .active, .scheme_list__item:hover {
      border: 1px solid #3685f2;
    }
  }
  .scheme_popper {
    padding: 12px 0 12px 12px;
    .scheme_list {
      height: 250px;
      .scheme_list__wrap {
        text-align: left;
      }
    }
  }
</style>
