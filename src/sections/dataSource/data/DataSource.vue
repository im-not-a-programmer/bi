<template>
  <el-container class="datasource_detail">
    <el-aside width="300px">
      <DataSideBar :datasourceList="datasourceList" :handleBack="handleBack" @clickDatasource="handleClickDatasource"/>
    </el-aside>
     <el-main class="datasource__detail_main">
       <DataView :datasourceName="datasourceName"
       :isSelected="isSelected"
        :selectedTable="selectedTable"
        :fieldList="fieldList"
        :data="data"/>
     </el-main>
</el-container>
</template>
<script>
import DataSideBar from './DataSideBar'
import DataView from './DataView'
export default {
  name: 'data-source',
  components: {
    DataSideBar,
    DataView
  },
  props: {
    datasourceList: {
      default: null,
      type: Array
    },
    isSelected: {
      default: false,
      type: Boolean
    },
    selectedTable: {
      default: false,
      type: Boolean
    },
    fieldList: {
      default: null,
      type: Array
    },
    data: {
      default: null,
      type: Array
    },
    datasourceName: {
      default: '',
      type: String
    },
    return: {
      default: () => {},
      type: Function
    },
    clickDatasource: {
      default: () => {},
      type: Function
    }
  },
  methods: {
    // 返回数据列表
    handleBack () {
      this.$emit('goBack')
    },
    // 选中左侧表
    handleClickDatasource (item) {
      this.$emit('clickDatasource', item)
    }
  }
}
</script>
<style lang="less" scoped>
.datasource_detail{
  height: 100%;
  background: #f7f8fa;
  margin: 0 -20px;
  /*.datasource__detail_main{*/
  /*  height: calc(~"100% - 30px");*/
  /*}*/
}
</style>
