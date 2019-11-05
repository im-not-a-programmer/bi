<template>
  <section class="datasource_table" ref="tableBox">
    <section class="datasource_table__type">
      <span class="el-icon-s-grid"></span>
    </section>
    <section class="datasource_table_content">
      <el-table :data="data" size="mini" border stripe :height="tableHeight">
        <el-table-column v-for="(item ,index) in fieldList" :key="index" :prop="item.name" :label="item.name">
        </el-table-column>
      </el-table>
    </section>
    <section class="datasource_table__pagination">
      <el-pagination :current-page.sync="currentPage"
                     :page-size="100"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :page-sizes="[100, 200, 500, 1000]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="data.length"></el-pagination>
    </section>
  </section>
</template>
<script>
export default {
  name: 'data-table',
  props: {
    fieldList: {
      default: null,
      type: Array
    },
    data: {
      default: null,
      type: Array
    }
  },
  data () {
    return {
      currentPage: 1,
      tableHeight: 650
    }
  },
  created () {
    this.tableHeight = document.body.clientHeight - 280
  },
  mounted () {
    let resizeTag = true // 防抖优化
    window.onresize = () => {
      if (resizeTag) {
        this.tableHeight = document.body.clientHeight - 280
        resizeTag = false
        setTimeout(() => {
          resizeTag = true
        }, 100)
      }
    }
  },
  methods: {
    handleSizeChange (val) {},
    handleCurrentChange (val) {}
  },
  beforeDestroy () {
    window.onresize = null
  }
}
</script>
<style lang="less" scoped>
.datasource_table{
  height: 100%;
  .datasource_table__type{
    display: flex;
    justify-content: flex-start;
    padding-bottom: 15px;
  }
  /*.datasource_table_content{*/
  /*  height: calc(~"100% - 30px");*/
  /*}*/
  .datasource_table__pagination{
    width: 100%;
    position: absolute;
    background: #fff;
    bottom: 8px;
    padding: 15px 0;
    margin-left: -15px;
  }
}
</style>
