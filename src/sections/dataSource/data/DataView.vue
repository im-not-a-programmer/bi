<template>
  <section class="datasource_view">
    <section v-if="isSelected" class="datasource_view__contain">
    <section class="datasource_view__title">
      <h5>{{datasourceName}}</h5>
    </section>
    <section class="datasource_view__content">
      <el-tabs type="border-card">
        <el-tab-pane label="数据预览">
          <DataTable :fieldList="fieldList" :data="data" v-if="selectedTable"/>
        </el-tab-pane>
<!--        <el-tab-pane label="血缘分析">血缘分析</el-tab-pane>-->
<!--        <el-tab-pane label="关联视图">关联视图</el-tab-pane>-->
<!--        <el-tab-pane label="更新信息"><span slot="label"><i class="el-icon-date"></i>更新信息</span>更新信息</el-tab-pane>-->
<!--  <el-tab-pane label="更新进度" disabled>-->
<!--    <span slot="label" >-->
<!--    <el-popover-->
<!--      placement="top-start"-->
<!--      title=""-->
<!--      width="200"-->
<!--      trigger="click"-->
<!--      content="更新时间：2019-07-18">-->
<!--      <span slot="reference">更新进度</span>-->
<!--    </el-popover>-->
<!--    </span></el-tab-pane>-->
      </el-tabs>
    </section>
    </section>
    <section class="datasource_view__no_data" v-else>
      <p class="el-icon-odometer icon"></p>
      <p class="tips">请从左侧选择表</p>
    </section>
  </section>
</template>
<script>
import DataTable from './DataTable'
export default {
  name: 'data-view',
  components: {
    DataTable
  },
  props: {
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
    }
  }
}
</script>
<style lang="less" scoped>
.datasource_view{
  height: calc(~"100%");
  .datasource_view__contain{
    height: calc(100%);
  }
.datasource_view__title{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.datasource_view__content{
  margin-top: 15px;
   height: calc(~"100% - 30px");
  /deep/ .el-tabs{
   height: 100%;
  }
  /deep/ .el-tabs__content{
    height: calc(~"100% - 30px");
  }
  /deep/ .el-tabs__item.is-disabled{
    color: #409EFF;
    cursor: pointer;
  }
}
.datasource_view__no_data{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .icon{
    font-size: 48px;
    color: #b9d3f6
  }
  .tips{
    font-size: 14px;
  }
}
}
</style>
