<template>
  <el-dialog
    v-if="board_"
    title="看板样式"
    :visible.sync="styleVisible"
    :modal="false"
    custom-class="board_style"
    top="0"
    :before-close="handleClose">
    <Theme :board_="board_" />
    <el-collapse v-model="activeTab">
      <el-collapse-item title="看板" name="board">
        <el-row :gutter="10">
          <el-col :span="6">背景</el-col>
          <el-col :span="18">
            <el-radio-group v-model="board_.style.background.type" class="color_or_image">
              <el-radio label="color">颜色</el-radio>
              <el-color-picker
                v-model="board_.style.background.color"
                show-alpha
                class="fr"
                :predefine="presetColors"></el-color-picker>
              <el-radio label="image">图片</el-radio>
              <Upload :url="board_.style.background.image" @success="handleUploadSuccess" />
            </el-radio-group>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="定时任务" name="timing">
        <el-row class="pd_bottom_10">
          <el-col :span="6">启用</el-col>
          <el-col :span="18">
            <el-checkbox v-model="board_.setting.timingTask.open" @change="handleTiming($event, 'open')"></el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">时间间隔</el-col>
          <el-col :span="18">
            <el-input-number
              v-model="board_.setting.timingTask.value"
              controls-position="right"
              @change="handleTiming($event, 'value')"
              class="input_number_right"
              :min="10">
            </el-input-number>秒
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import Upload from '@/components/Upload'
import Theme from '@/sections/board/Theme'
import { presetColors } from '@/const/board.js'

export default {
  name: 'board-style',
  components: {
    Upload,
    Theme
  },
  props: {
    editStyle: {
      type: Function,
      default: () => {}
    },
    styleVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeTab: null,
      board_: null,
      presetColors: presetColors
    }
  },
  computed: {
    ...mapGetters({
      board: 'board/board'
    })
  },
  watch: {
    styleVisible (newVal) {
      newVal && (this.board_ = _.cloneDeep(this.board))
    },
    'board_': {
      handler (newVal, oldVal) {
        if (!oldVal) { return }
        this.saveBoard(newVal)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      saveBoard: 'board/saveBoard'
    }),
    // 关闭看板样式弹框
    handleClose () {
      this.$emit('editStyle')
    },
    // 上传图片成功
    handleUploadSuccess (url) {
      this.board_.style.background.image = url
    },
    // 修改定时任务
    handleTiming (val, type) {
      const { modules } = this.board_
      for (let item in modules) {
        if (modules[item].settings.timingTask.auto) {
          modules[item].settings.timingTask[type] = val
        }
      }
    }
  }
}
</script>
<style lang="less">
  .board_style {
    position: absolute;
    left: 60px;
    top: 30px;
    bottom: 0;
    width: 300px;
    padding: 10px;
    box-shadow: 0 1px 5px 0 rgba(35,46,64,.4);
    text-align: left;
    margin: 0;
    .el-collapse {
      border-top: 0;
      .el-collapse-item__header{
        padding-left: 20px;
        position: relative;
        > i {
          position: absolute;
          left: 0;
          top: 16px;
        }
      }
      .el-collapse-item__content {
        padding-bottom: 10px;
      }
    }
    .el-dialog__header, .el-dialog__body {
      padding: 0;
      .el-dialog__title {
        color: #3d4d66;
        font-size: 14px;
      }
      .el-dialog__headerbtn {
        top: 14px;
      }
    }
    .uploader {
      float: right;
      width: 130px;
    }
  }
</style>
