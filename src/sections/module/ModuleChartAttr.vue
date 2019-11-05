<template>
  <el-scrollbar tag="div" class="module_chart__attr_scrollbar no_x_scrollbar">
    <el-collapse v-model="activeAttrTab" class="module_chart__attr" accordion>
      <template v-if="module.cType">
        <el-collapse-item
          v-for="(item, index) in module.analysis.datas"
          :name="item"
          :key="item">
          <template slot="title">
            <i class="dot"></i>
            <span class="ellipsis">{{module.dimensionMap[item].showName || `${module.dimensionMap[item].name}(${computedTypes[module.dimensionMap[item].computedType]})`}}</span>
          </template>
          <el-collapse v-model="activeItemTab[index]" class="attr_item">
            <!--组合图-图形属性-->
            <template v-if="module.cType==='barLine'" >
              <DatasType :module="module" :dataId="item" />
              <AttrAxis :module="module" :dataId="item" />
            </template>
            <el-collapse-item v-for="value in types[module.settings[`${drawTypeFn(module.cType)}Attr`][item].type].attr" :key="value.type">
              <template slot="title">
                <i class="el-icon-arrow-right normal_arrow"></i>{{value.name}}
              </template>
              <component :is="value.type" :module="module" :dataId="item" :option="option" :loading="loading" :position="value.position"></component>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>
      </template>
      <p v-else>请先选择图表类型</p>
    </el-collapse>
  </el-scrollbar>
</template>
<script>
import { mapGetters } from 'vuex'
import { chartTypes, computedTypes } from '@/const/board'
import AttrColor from './attr/chart/AttrColor'
import AttrLabel from './attr/chart/AttrLabel'
import AttrTooltip from './attr/chart/AttrTooltip'
import DatasType from './attr/chart/DatasType'
import AttrBarSize from './attr/chart/bar/AttrBarSize'
import AttrLineWired from './attr/chart/line/AttrLineWired'
import AttrPieRadius from './attr/chart/pie/AttrPieRadius'
import AttrTableColor from './attr/table/AttrTableColor'
import AttrAxis from './attr/chart/barLine/AttrAxis'

export default {
  name: 'module-chart-attr',
  components: {
    AttrColor,
    AttrLabel,
    AttrTooltip,
    AttrBarSize,
    AttrLineWired,
    AttrPieRadius,
    AttrTableColor,
    DatasType,
    AttrAxis
  },
  data () {
    return {
      activeAttrTab: null,
      types: chartTypes,
      computedTypes: computedTypes
    }
  },
  props: {
    module: {
      type: Object,
      default: () => { return {} }
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
  computed: {
    ...mapGetters({
      drawTypeFn: 'board/drawTypeFn'
    }),
    // 每一项series下面的配置项(颜色/大小/标签/提示等)折叠面板绑定的v-model
    activeItemTab () {
      const len = this.types[this.module.cType].attr.length
      let arr = []
      for (let i = 0; i < len; i++) {
        arr.push(null)
      }
      return arr
    }
  }
}
</script>
<style lang="less" scoped>
  .module_chart__attr_scrollbar {
    height: 100%;
  }
  .module_chart__attr {
    border-top: 0;
    /deep/ .el-collapse-item {
      .el-collapse-item__header {
        padding: 0 10px;
        /*第一层折叠面板的箭头替换成实心箭头*/
        .el-icon-arrow-right:not(.normal_arrow) {
          color: #b8b8ba;
        }
        .el-icon-arrow-right:not(.normal_arrow):before {
          content: "\e791";
        }
      }
      .el-collapse-item__content {
        padding-bottom: 0;
      }
    }
    /deep/ .attr_item {
      border: none;
      background-color: #f8f9fb;
      .el-collapse-item__header, .el-collapse-item__wrap {
        background-color: #f8f9fb;
      }
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
    }
    .attr-content {
      padding: 0 20px 10px 10px;
    }
    > p {
      padding: 20px;
    }
  }
</style>
