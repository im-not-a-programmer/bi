<template>
  <section class="module">
    <div class="module__head">
      <el-row>
        <el-col :span="12" class="module__head_name icon_normal">
          <Icon iconClass="icon_board" />{{board.name}}
        </el-col>
        <el-col :span="12" class="module__head_btns icon_normal">
          <span @click="handleGoBoard"><Icon iconClass="icon_enter" />进入看板</span>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="currentMId" type="card" @tab-remove="handleRemove" class="module__tabs" :before-leave="handleBeforeLeave">
      <el-tab-pane key="add" name="add">
        <span slot="label"><i class="el-icon-circle-plus-outline module__add"></i>添加图表</span>
      </el-tab-pane>
      <el-tab-pane
        v-for="item in board.modules"
        :key="item.mId"
        :label="item.name"
        :name="item.mId"
        closable>
      </el-tab-pane>
      <div class="module_content" v-if="module">
        <div class="module__left">
          <ModuleData @selectTable="handleDataOpen" :tableId="module.tableId" />
        </div>
        <div class="module__center">
          <div>
            <Axis :dragging="dragging" :module="module"/>
            <div class="module__canvas" v-loading="loading">
              <ModuleTitle :content="module.name" :title="module.settings.title"/>
              <Background :background="module.settings.background" type="module">
                <component
                  v-show="option"
                  :is="drawType.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())"
                  :ref="drawType"
                  :mId="module.mId"
                  :option="option"
                  :cType="module.cType"
                  :theme="module.theme">
                </component>
                <Icon v-show="!option" iconClass="icon_bar_gray" />
              </Background>
            </div>
          </div>
        </div>
        <div class="module__right">
          <ChartTypes :module="module" />
          <el-tabs stretch class="module_chart__config">
            <el-tab-pane :label="transformName(module.mType)">
              <ModuleChartAttr :module="module" :option="option" :loading="loading" />
            </el-tab-pane>
            <el-tab-pane label="组件样式">
              <ModuleStyle :module="module" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-tabs>
    <DataSourceDialog
      v-if="module"
      :mode="mode"
      :tableId="module.tableId"
      @sure="handleDataSure"
      @close="handleDataClose" />
  </section>
</template>

<script>
import _ from 'lodash'
import crypto from 'crypto'
import { mapGetters, mapActions } from 'vuex'
import DataSourceDialog from '@/sections/board/DataSourceDialog'
import ModuleData from '@/sections/module/ModuleData'
import Axis from '@/sections/module/Axis'
import ChartTypes from '@/sections/module/ChartTypes'
import ModuleStyle from '@/sections/module/ModuleStyle'
import ModuleChartAttr from '@/sections/module/ModuleChartAttr'
import ModuleTitle from '@/components/ModuleTitle'
import Background from '@/components/Background'
import Chart from '@/components/draw/Chart'
import Table from '@/components/draw/Table'
import Icon from '@/components/Icon'
import constant, { settingDefault, version } from '@/const/board'

export default {
  name: 'module',
  components: {
    DataSourceDialog,
    ModuleData,
    Axis,
    ChartTypes,
    ModuleStyle,
    ModuleChartAttr,
    Chart,
    Table,
    ModuleTitle,
    Background,
    Icon
  },
  data () {
    return {
      module: null, // 当前module数据
      currentMId: null, // 当前module的mId
      dragging: false, // 是否正在拖动字段
      dragItem: {}, // 正在拖动字段的信息
      option: null, // 当前module的绘图数据
      mode: null, // 选择数据源'edit'修改数据源 'add'新增模块
      loading: true,
      empty: {
        cType: 'table',
        mType: 'table_01',
        analysis: {
          datas: [],
          dimensions: []
        },
        dimensionMap: {},
        settings: {}
      }
    }
  },
  computed: {
    ...mapGetters({
      board: 'board/board',
      currentModuleFn: 'board/currentModuleFn',
      drawTypeFn: 'board/drawTypeFn'
    }),
    drawType () {
      return this.drawTypeFn(this.module.cType)
    }
  },
  async created () {
    await this.findBoardDetailById(this.$route.params.bId)
    this.currentMId = this.$route.query.mId
    window.addEventListener('resize', this.resizeListenerFn, false)
  },
  mounted () {
    document.addEventListener('dragstart', this.dragstartFn, false)
    document.addEventListener('dragover', this.dragoverFn, false)
    document.addEventListener('drop', this.dropFn, false)
  },
  watch: {
    currentMId (val) {
      if (val !== '0') {
        this.option = null
        this.module = _.cloneDeep(this.currentModuleFn(val))
      }
    },
    module: {
      async handler (val) {
        if (!val) { return }
        let boardDeep = _.cloneDeep(this.board)
        boardDeep.modules[this.currentMId] = val
        // 初始化
        if (Object.keys(val.settings).length < 1) {
          boardDeep.modules[this.currentMId].settings = settingDefault({
            timingTaskOpen: boardDeep.setting.timingTask.open,
            timingTaskValue: boardDeep.setting.timingTask.value
          })
        }
        !val.cType && (this.$set(val, 'cType', 'table'))
        !val.dimensionMap && (this.$set(val, 'dimensionMap', {}))
        !val.mType.length && (val.mType = 'table_01') // 新建模块后端返回的mType:{}
        !val.version && (val.version = version)
        !val.theme && (val.theme = boardDeep.style.theme)
        // 重绘图表
        this.loading = true
        this.option = null
        if (Object.keys(val.dimensionMap).length > 0) {
          this.option = await this.getModuleDrawData(val)
        }
        this.loading = false
        this.saveBoard(boardDeep)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      findBoardDetailById: 'board/findBoardDetailById',
      saveBoard: 'board/saveBoard',
      getModuleDrawData: 'board/getModuleDrawData',
      createModule: 'board/createModule',
      deleteModuleById: 'board/deleteModuleById'
    }),
    dragstartFn (event) {
      event.dataTransfer.setData('text', '')
      this.dragging = true
      this.dragItem = event.target.childNodes[0].dataset
    },
    dragoverFn (event) {
      event.preventDefault()
    },
    // 添加数值 || 维度
    dropFn (event) {
      event.preventDefault()
      this.dragging = false
      const targetId = event.target.id
      if (targetId !== 'dimensions' && targetId !== 'datas') { return }
      const md5 = crypto.createHash('md5')
      const key = md5.update(`${new Date().getTime()}`).digest('hex').toUpperCase()
      // 1. 更新analysis.dimensions || (analysis.datas && settings.chartAttr)
      // 2. 更新dimensionMap
      this.$set(this.module.dimensionMap, key, {
        name: this.dragItem.name,
        fieldId: this.dragItem.id,
        fieldType: this.dragItem.type,
        type: targetId === 'dimensions' ? 1 : 2,
        computedType: 1
      })
      if (targetId === 'datas') {
        this.$set(this.module.analysis.datas, this.module.analysis.datas.length, key)
        this.$set(this.module.settings[`${this.drawType}Attr`], key, constant[`${this.drawType}Const`].attrDefault(this.module.cType === 'barLine' ? 'bar' : this.module.cType))
      } else if (targetId === 'dimensions') {
        this.$set(this.module.analysis.dimensions, this.module.analysis.dimensions.length, key)
      }
    },
    // 删除模块
    handleRemove (targetName) {
      this.$confirm(`确定删除 ${this.board.modules[targetName].name}？`, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const status = await this.deleteModuleById(targetName)
        if (status) {
          await this.findBoardDetailById(this.board.id)
          // 切换当前tab为上一个tab || 回到看板页
          if (targetName === this.currentMId) {
            let keys = Object.keys(this.board.modules)
            if (keys.length < 1) {
              this.handleGoBoard()
            } else {
              this.$router.push({
                name: 'module',
                params: { bId: this.$route.params.bId },
                query: { mId: keys[keys.length - 1] }
              })
              this.currentMId = keys[keys.length - 1]
            }
          }
        }
      }).catch(() => {
      })
    },
    handleBeforeLeave (targetName) {
      if (targetName === 'add') {
        this.handleDataOpen('add')
        return false
      }
    },
    // 进入看板
    handleGoBoard () {
      this.$router.push({
        name: 'board',
        params: { bId: this.$route.params.bId }
      })
    },
    // 数据源选择框中点确认
    async handleDataSure (tableId) {
      // 1. mode='edit' 没有切换数据表,关闭弹框 || 切换数据表,清空模块数据
      // 2. mode='add' 新建模块
      switch (this.mode) {
        case 'edit':
          if (this.module.tableId === tableId) {
            this.handleDataClose()
          } else {
            this.module = { ...this.module, ...this.empty, ...{ tableId } }
            this.option = null
            this.handleDataClose()
          }
          break
        case 'add':
          this.addModule(tableId)
          break
      }
    },
    // 新建模块
    async addModule (tableId) {
      let maxY = 0 // 计算最下方的y值
      for (let item in this.board.modules) {
        let style = this.board.modules[item].style
        if (style.y + style.h > maxY) {
          maxY = style.y + style.h
        }
      }
      const res = await this.createModule({
        bId: this.$route.params.bId,
        tableId,
        style: { x: 0, y: maxY, w: 4, h: 6 }
      })
      if (res.status) {
        await this.findBoardDetailById(this.$route.params.bId)
        this.currentMId = res.data.mId
        this.handleDataClose()
      }
    },
    // 关闭数据源选择框
    handleDataClose () {
      this.mode = null
    },
    // 打开数据源选择框
    handleDataOpen (mode) {
      this.mode = mode
    },
    // window resize 触发图表resize
    resizeListenerFn: _.debounce(function () {
      this.$refs[this.drawType].resize()
    }, 200),
    // 转换属性名字
    transformName (mType) {
      switch (mType) {
        case 'charts_01':
          return '图形属性'
        case 'table_01':
          return '表格属性'
        default:
          return '属性'
      }
    }
  },
  beforeDestroy () {
    document.removeEventListener('dragstart', this.dragstartFn)
    document.removeEventListener('dragover', this.dragoverFn)
    document.removeEventListener('drop', this.dropFn)
    window.removeEventListener('resize', this.resizeListenerFn)
  }
}
</script>

<style lang="less" scoped>
  .module {
    height: 100%;
    font-size: 14px;
    overflow: hidden;
    .module__head {
      height: 54px;
      line-height: 54px;
      border-bottom: 1px solid #ecedf1;
      .module__head_name {
        text-align: left;
        padding-left: 60px;
      }
      .module__head_btns {
        text-align: right;
        padding-right: 20px;
        > span {
          cursor: pointer;
        }
      }
    }
    /deep/ .module__tabs  {
      height: calc(100% - 50px);
      > .el-tabs__header {
        margin: 0 0 0 4px;
        box-shadow: 0 2px 12px 0 rgba(24,28,85,0.08);
        border: 0;
        .el-tabs__item {
          height: 30px;
          line-height: 30px;
        }
        .el-tabs__nav-scroll {
          margin-top: 2px;
        }
      }
      > .el-tabs__content {
        height: calc(100% - 36px);
      }
      .module__add {
        margin-right: 6px;
      }
    }
    .module_content {
      height: 100%;
      text-align: left;
      display: flex;
      .module__left {
        box-shadow: 0 2px 12px 0 rgba(24,28,85,0.08);
        width: 200px;
      }
      .module__right {
        height: 100%;
        box-shadow: 0 2px 12px 0 rgba(24,28,85,0.08);
        width: 230px;
        /deep/ .module_chart__config {
          height: calc(100% - 200px);
          .el-tabs__header {
            margin: 0;
          }
          .el-tabs__content {
            height: calc(100% - 40px);
            .el-tab-pane {
              height: 100%;
            }
          }
        }
      }
      .module__center {
        padding: 20px 20px 0 20px;
        flex: 1;
        background-color: #f2f3f8;
        box-shadow: 0 2px 12px 0 rgba(24,28,85,0.08);
        border-radius:4px;
        > div {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .module__canvas {
          flex: 1;
          display: flex;
          flex-direction: column;
          border-radius: 4px;
          background-color: #fff;
          svg {
            font-size: 80px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
</style>
