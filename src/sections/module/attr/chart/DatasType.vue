<template>
  <div class="datas_type">
    <Icon :iconClass="dataTypes[module.settings.chartAttr[dataId].type].icon" class="datas_type__icon" />
    <el-select v-model="module.settings.chartAttr[dataId].type" class="datas_type__select" popper-class="datas_type__popper">
      <el-option
        v-for="(item, key) in dataTypes"
        :key="key"
        :label="item.name"
        :value="key">
        <span><Icon :iconClass="item.icon" />{{ item.name }}</span>
      </el-option>
    </el-select>
  </div>
</template>
<script>
import constant from '@/const/board.js'
import Icon from '@/components/Icon'

export default {
  name: 'datas-type',
  props: {
    module: {
      type: Object,
      default: () => { return {} }
    },
    dataId: {
      type: String,
      default: ''
    }
  },
  components: {
    Icon
  },
  data () {
    return {
      dataTypes: constant.chartConst.dataTypes
    }
  }
}
</script>
<style lang="less" scoped>
  .datas_type {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px 0 10px 10px;
    position: relative;
    width: 50%;
    display: inline-block;
    .datas_type__icon {
      position: absolute;
      z-index: 1;
      top: 18px;
      left: 20px;
    }
    .datas_type__select {
      width: 100%;
      /deep/ input {
        border-radius: 0;
        background-color: #f8f9fb;
        padding-left: 30px;
      }
    }
  }
</style>
<style lang="less">
  .datas_type__popper {
    svg {
      margin-right: 10px;
    }
  }
</style>
