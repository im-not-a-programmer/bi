<template>
  <el-card class="module_item" v-loading="loading">
    <div slot="header">
      <ModuleTitle :content="module.name" :title="module.settings.title"/>
      <div class="module_item__head_btns">
        <el-tooltip class="item" effect="dark" content="详细设置" placement="top" v-if="edit">
          <i class="el-icon-edit" @click="handleEdit(module.mId)"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top" v-if="edit">
          <i class="el-icon-delete" @click="handleDelete(module.mId)"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="查看明细" placement="top" v-if="!edit && option">
          <span @click="handleCheck(option.table)"><Icon iconClass="icon_detail" /></span>
        </el-tooltip>
      </div>
    </div>
    <Background :background="module.settings.background" type="module">
      <component
        v-show="option"
        :is="drawTypeFn(module.cType).replace(/( |^)[a-z]/g, (L) => L.toUpperCase())"
        :ref="drawTypeFn(module.cType)"
        :mId="module.mId"
        :option="option"
        :cType="module.cType"
        :theme="module.theme">
      </component>
      <div v-show="!option" class="module_item__empty">
        <Icon iconClass="icon_bar_gray" />
        <p v-if="edit">点击右上角编辑图标进行配置</p>
      </div>
    </Background>
  </el-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Chart from '@/components/draw/Chart'
import Table from '@/components/draw/Table'
import ModuleTitle from '@/components/ModuleTitle'
import Background from '@/components/Background'
import Icon from '@/components/Icon'

export default {
  name: 'item',
  data () {
    return {
      option: null, // 绘图数据
      timer: null, // 定时任务
      loading: true
    }
  },
  props: {
    module: {
      type: Object,
      default: () => { return {} }
    },
    edit: {
      type: Boolean,
      default: false
    },
    checkDetails: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    Chart,
    ModuleTitle,
    Background,
    Icon,
    Table
  },
  watch: {
    'module.theme' () {
      this.draw()
    }
  },
  created () {
    this.draw()
    if (!this.edit && this.module.settings.timingTask.open && this.module.cType) {
      this.timingTaskFunc(this.module.settings.timingTask.value)
    }
  },
  computed: {
    ...mapGetters({
      drawTypeFn: 'board/drawTypeFn'
    })
  },
  methods: {
    ...mapActions({
      getModuleDrawData: 'board/getModuleDrawData',
      deleteModuleById: 'board/deleteModuleById',
      findBoardDetailById: 'board/findBoardDetailById',
      saveBoard: 'board/saveBoard'
    }),
    // 编辑模块
    handleEdit (mId) {
      this.$router.push({
        name: 'module',
        params: { bId: this.$route.params.bId },
        query: { mId }
      })
    },
    // 删除模块
    async handleDelete (mId) {
      await this.deleteModuleById(mId)
      this.findBoardDetailById(this.$route.params.bId)
    },
    // 查看明细
    handleCheck (table) {
      this.$emit('checkDetails', table)
    },
    // 获取图表绘图数据
    async draw () {
      this.loading = true
      if (Object.keys(this.module.dimensionMap).length > 0) {
        this.option = await this.getModuleDrawData(this.module)
      }
      this.loading = false
    },
    // 定时任务
    timingTaskFunc (val) {
      if (this && !this._isDestroyed) {
        this.timer = setTimeout(async () => {
          await this.draw()
          this.timingTaskFunc(val)
        }, val * 1000)
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>
<style lang="less" scoped>
  .module_item {
    background-color: #fff;
    height: 100%;
    display: flex;
    position: relative;
    border: 0;
    border-radius: 0;
    flex-direction: column;
    /deep/ .el-card__header {
      padding: 0;
      border-bottom: 0;
    }
    /deep/ .el-card__body {
      flex: 1;
      padding: 0;
    }
    .module_item__head_btns {
      position: absolute;
      right: 10px;
      top: 6px;
      display: none;
      text-align: right;
      font-size: 14px;
      z-index: 1;
      i, .svg-icon {
        margin-left: 10px;
        padding: 2px;
        cursor: pointer;
        background-color: #fff;
      }
      .svg-icon {
        font-size: 18px;
      }
    }
    .module_item__empty {
      color: #9ea6b2;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .svg-icon {
        font-size: 40px;
        margin-bottom: 20px;
      }
    }
  }
  .module_item:hover {
    .module_item__head_btns {
      display: block;
    }
  }
</style>
