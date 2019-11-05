<template>
  <section class="datasource">
    <section class="datasource_title"  v-if="isHome">
      <p>数据列表</p>
    </section>
    <PackageList :packageList="packageList"
     @addPackage="addPackage"
     @delPackage="delPackage"
      @clickPackage="clickPackage"  v-if="isHome"/>
     <DataSource
     :datasourceName="datasourceName"
     :datasourceList="datasourceList"
      :isSelected="isSelected"
      :selectedTable="selectedTable"
      :fieldList="preview.fieldList"
      :data="preview.dataList"
       @clickDatasource="clickDatasource"
       @goBack="goBack" v-else />
  </section>
</template>
<script>
import PackageList from '../sections/dataSource/package/PackageList'
import DataSource from '../sections/dataSource/data/DataSource'
import { ApiDatasetAll,
  ApiDatasetFindFieldsByTableId } from '@/services/api/dataset'
export default {
  name: 'data-source',
  components: {
    PackageList,
    DataSource
  },
  data () {
    return {
      packageList: [{
        name: '业务包',
        num: 1,
        id: 0
      }],
      isHome: true,
      datasourceList: [],
      isSelected: false, // 判断是否选中表
      selectedTable: false,
      preview: { // 数据预览
        fieldList: [],
        dataList: []
      },
      datasourceName: '' // 选中表的名称
    }
  },
  mounted () {
    this.getDataSourceList()
  },
  methods: {
    getDataSourceList () {
      ApiDatasetAll().then(res => {
        this.datasourceList = res.data
      })
    },
    // 添加业务包
    addPackage () {
      this.packageList.unshift({
        name: this.packageList.length > 0 ? `业务包${this.packageList.length}` : '业务包',
        id: this.packageList.length
      })
    },
    // 删除业务包
    delPackage (item) {
      event.stopPropagation()
      let currentIndex = this.packageList.findIndex(val => {
        return val.id === item.id
      })
      this.$confirm(`业务包内的表将会被删除，相关联的自动数据集、仪表也将受到影响，确定删除${item.name}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.packageList.splice(currentIndex, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 点击业务包，跳转至数据表
    clickPackage (v) {
      this.isHome = false
    },
    // 返回业务包列表
    goBack () {
      this.isHome = true
      this.isSelected = false
    },
    // 选中左侧数据表
    clickDatasource (v) {
      this.selectedTable = false
      this.datasourceName = v.tableName
      this.isSelected = true
      this.getSourceDetailById(v.tableId)
    },
    // 获取表详情
    getSourceDetailById (tableId) {
      ApiDatasetFindFieldsByTableId({
        tableId: tableId
      }).then(res => {
        this.preview.fieldList = res.data.fileds
        this.preview.dataList = res.data.data
        this.selectedTable = true
      })
    }
  }
}
</script>
<style lang="less" scoped>
.datasource{
  height: 100%;
  .datasource_title{
    text-align: left;
    padding: 15px 0;
  }
}
</style>
