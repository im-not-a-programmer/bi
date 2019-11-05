<template>
  <section class="module__axis">
    <div :class="['module__axis_box', {'module__axis_box--active': dragging}]">
      <span class="module__axis_type">维度</span>
      <div id="dimensions" class="module__axis_value">
        <template v-if="module.analysis.dimensions.length < 1">请拖入左侧字段</template>
        <template v-else v-for="field in module.analysis.dimensions">
          <AxisItem :module="module" :field="field" :key="field" type="dimensions" />
        </template>
      </div>
    </div>
    <div :class="['module__axis_box', {'module__axis_box--active': dragging}]">
      <span class="module__axis_type">数值</span>
      <div id="datas" class="module__axis_value">
        <template v-if="module.analysis.datas.length < 1">请拖入左侧字段</template>
        <template v-else v-for="field in module.analysis.datas" >
          <AxisItem :module="module" :field="field" :key="field" type="datas" />
        </template>
      </div>
    </div>
  </section>
</template>
<script>
import AxisItem from '@/sections/module/AxisItem'

export default {
  name: 'axis',
  props: {
    dragging: {
      type: Boolean,
      default: false
    },
    module: {
      type: Object,
      default: () => { return {} }
    }
  },
  components: {
    AxisItem
  }
}
</script>
<style lang="less" scoped>
  .module__axis {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    .module__axis_box {
      line-height: 32px;
      border:1px solid #e6e7ed;;
      border-radius:4px;
      display: flex;
      .module__axis_type {
        padding: 0 20px;
        border-right: 1px solid #E4E7ED;
      }
      .module__axis_value {
        flex: 1;
        padding: 0 10px;
        font-size: 12px;
        color: #909399;
      }
    }
    .module__axis_box:first-child {
      margin-bottom: 10px;
    }
    .module__axis_box--active {
      border-color: #12c39b;
    }
  }
</style>
