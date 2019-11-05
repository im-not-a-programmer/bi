<template>
  <el-scrollbar tag="div" class="module_style_scrollbar no_x_scrollbar">
    <el-collapse v-model="activeStyleTab" class="module__style" accordion>
      <el-collapse-item name="title">
        <template slot="title">
          <i class="el-icon-arrow-right"></i>标题
          <el-checkbox v-model="module.settings.title.enabled" class="style__show" >显示</el-checkbox>
        </template>
        <el-row :gutter="10" class="pd_bottom_10">
          <el-col :span="6">内容</el-col>
          <el-col :span="18">
            <el-input v-model="module.name"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="pd_bottom_10">
          <el-col :span="6">字体</el-col>
          <el-col :span="18">
            <el-select v-model="module.settings.title.fontFamily" placeholder="请选择">
              <el-option v-for="item in fontFamilies" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="pd_bottom_10">
          <el-col :span="6">颜色</el-col>
          <el-col :span="18">
            <el-color-picker v-model="module.settings.title.color" show-alpha :predefine="presetColors" class="stretch_color_picker"></el-color-picker>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="pd_bottom_10">
          <el-col :span="6">位置</el-col>
          <el-col :span="18">
            <el-radio-group v-model="module.settings.title.position" class="position">
              <el-radio-button label="left"><Icon iconClass="icon_align_left" /></el-radio-button>
              <el-radio-button label="center"><Icon iconClass="icon_align_center" /></el-radio-button>
              <el-radio-button label="right"><Icon iconClass="icon_align_right" /></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row class="pd_bottom_10">背景</el-row>
        <el-row :gutter="10">
          <el-col>
            <el-radio-group v-model="module.settings.title.type" class="color_or_image">
              <el-radio label="backgroundColor">纯色</el-radio>
              <el-color-picker v-model="module.settings.title.backgroundColor" show-alpha :predefine="presetColors" class="fr"></el-color-picker>
              <el-radio label="backgroundImage">图片</el-radio>
              <Upload :url="module.settings.title.image" @success="handleUploadTitleBgSuccess" />
            </el-radio-group>
          </el-col>
        </el-row>
      </el-collapse-item>
      <component :is="`${drawTypeFn(module.cType)}Style`" :module="module"></component>
      <el-collapse-item name="background">
        <template slot="title">
          <i class="el-icon-arrow-right"></i>背景
        </template>
        <el-radio-group v-model="module.settings.background.type" class="color_or_image">
          <el-radio label="color">颜色</el-radio>
          <el-color-picker v-model="module.settings.background.color" show-alpha :predefine="presetColors" class="fr"></el-color-picker>
          <el-radio label="image">图片</el-radio>
          <Upload :url="module.settings.background.image" @success="handleUploadBgSuccess" />
        </el-radio-group>
      </el-collapse-item>
      <el-collapse-item name="timing">
        <template slot="title">
          <i class="el-icon-arrow-right"></i>定时任务
        </template>
        <el-row>
          <el-col :span="8">模式</el-col>
          <el-col :span="16">
            <el-radio-group v-model="module.settings.timingTask.auto" @change="handleTiming" class="timing_set">
              <el-radio :label="true">继承看板设置</el-radio>
              <el-radio :label="false">自定义</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row v-if="!module.settings.timingTask.auto" class="pd_bottom_10">
          <el-col :span="8">启用</el-col>
          <el-col :span="16">
            <el-checkbox v-model="module.settings.timingTask.open"></el-checkbox>
          </el-col>
        </el-row>
        <el-row v-if="!module.settings.timingTask.auto">
          <el-col :span="8">时间间隔</el-col>
          <el-col :span="16">
            <el-input-number v-model="module.settings.timingTask.value" controls-position="right" class="input_number_right" :min="10"></el-input-number>秒
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </el-scrollbar>
</template>
<script>
import Upload from '@/components/Upload'
import Icon from '@/components/Icon'
import { presetColors, fontFamilies } from '@/const/board.js'
import ChartStyle from '@/sections/module/style/ChartStyle'
import TableStyle from '@/sections/module/style/TableStyle'
import { mapGetters } from 'vuex'

export default {
  name: 'module-style',
  components: {
    Upload,
    Icon,
    ChartStyle,
    TableStyle
  },
  data () {
    return {
      activeStyleTab: null,
      presetColors: presetColors,
      fontFamilies: fontFamilies
    }
  },
  props: {
    module: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    ...mapGetters({
      board: 'board/board',
      drawTypeFn: 'board/drawTypeFn'
    })
  },
  methods: {
    // 上传标题背景图片成功
    handleUploadTitleBgSuccess (url) {
      this.module.settings.title.image = url
    },
    // 上传背景图片成功
    handleUploadBgSuccess (url) {
      this.module.settings.background.image = url
    },
    // 修改定时自动||自定义
    handleTiming (val) {
      if (val) {
        this.module.settings.timingTask.open = this.board.setting.timingTask.open
        this.module.settings.timingTask.value = this.board.setting.timingTask.value
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .module_style_scrollbar {
    height: 100%;
  }
  .module__style {
    border-top: 0;
    /deep/ .el-collapse-item {
      .el-icon-arrow-right {
        margin-right: 8px;
      }
      .is-active {
        .el-icon-arrow-right {
          transform: rotate(90deg);
        }
      }
      .el-collapse-item__arrow {
        display: none;
      }
      .style__show {
        margin: 0;
        position: absolute;
        right: 10px;
        top: 0;
      }
      .el-collapse-item__header {
        padding: 0 10px;
        position: relative;
      }
      .el-collapse-item__content {
        padding: 0 20px 10px 10px;
      }
      .position {
        .el-radio-button {
          .el-radio-button__inner {
            padding: 4px 10px;
          }
        }
        .svg-icon {
          font-size: 16px;
        }
      }
    }
    .uploader {
      float: right;
      width: 130px;
    }
    .timing_set {
      .el-radio {
        margin: 5px 0;
      }
    }
    .type_style {
      border-bottom: 1px solid #EBEEF5;
    }
  }
</style>
