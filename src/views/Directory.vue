<template>
  <el-container class="directory" v-loading="loading">
    <el-aside width="210px">
      <DirectorySideBar :data="sideBarData" @clickNode="selectedNode" ref="sideBar"/>
    </el-aside>
     <el-main class="directory_main">
       <el-container class="directory_main__container">
         <el-header class="directory_main__header">
           <DirectoryTabs :tabsList="tabsList" :checkedTree="checkedTree" @removeTab="removeTab" @clickTab="clickTab"/>
         </el-header>
         <el-main class="directory_main__view">
           <DirectoryView :frameList="tabsList" :activeName="activeName" ref="directoryView"/>
         </el-main>
       </el-container>
     </el-main>
  </el-container>
</template>
<script>
import DirectorySideBar from '../sections/directory/DirectorySideBar'
import DirectoryTabs from '../sections/directory/DirectoryTabs'
import DirectoryView from '../sections/directory/DirectoryView'
import { ApiBoardFindPublishedBoard } from '@/services/api/board'
import config from '@/config.js'
export default {
  name: 'directory',
  components: {
    DirectorySideBar,
    DirectoryTabs,
    DirectoryView
  },
  data () {
    return {
      // 左侧菜单栏数据
      sideBarData: [],
      // 顶部tabs数据
      tabsList: [],
      // 选中的左侧菜单栏
      checkedTree: '',
      // 当前选中菜单,送来判断iframe显示隐藏
      activeName: null,
      loading: true
    }
  },
  mounted () {
    this.getPublishedBoard()
  },
  methods: {
    // 获取已发布看板
    async getPublishedBoard () {
      this.sideBarData = []
      await ApiBoardFindPublishedBoard(1).then(res => {
        if (res.data) {
          res.data.map(val => {
            this.sideBarData.push({
              label: val.name,
              iframeUrl: `${window.location.origin}${config.base}/preview/${val.bId}`,
              id: val.bId
            })
          })
        }
      })
      if (this.sideBarData.length > 0) {
        this.$refs['sideBar'].$refs['tree'].setCurrentKey(this.sideBarData[0])
        this.selectedNode(this.sideBarData[0])
      }
      this.loading = false
    },
    // 选中左侧菜单
    selectedNode (data) {
      this.activeName = data.id
      let obj = { closable: true }
      if (this.tabsList.length > 0) {
        // 判斷tabs數組中是否存在该菜单
        let hasTab = this.tabsList.find(value => {
          return value.id === data.id
        })
        if (!hasTab) {
          this.tabsList.push(Object.assign(obj, data))
        }
      } else {
        this.tabsList.push(Object.assign(obj, data))
      }
      this.activeName = this.checkedTree = data.id
    },
    // 删除tab标签
    removeTab (data) {
      let index = this.tabsList.findIndex(value => {
        return value.id === data
      })
      this.tabsList.splice(index, 1)
      this.checkedTree = this.tabsList.length > 0
        ? (this.checkedTree === data
          ? (index === this.tabsList.length && this.tabsList.length
            ? this.tabsList[this.tabsList.length - 1].id || '0'
            : (this.tabsList[index].id || '0'))
          : this.checkedTree)
        : '0' // 选中首页
      this.activeName = this.checkedTree === '0' ? null : this.checkedTree
      this.$refs['sideBar'].$refs['tree'].setCurrentKey(this.activeName)
    },
    // 选中tab
    clickTab (data) {
      this.activeName = data === '0' ? null : data
      this.checkedTree = data
      if (data === '0') {
        this.$refs['sideBar'].$refs['tree'].setCurrentKey(null)
      } else {
        this.$refs['sideBar'].$refs['tree'].setCurrentKey(data)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.directory{
  height: 100%;
  border-radius: 4px 4px 0 0;
  background-color: #f7f8fa !important;
  .el-aside {
    border-right: 1px solid #E6E7ED;
    border-radius: 4px 4px 0 0;
    background-color: #fff;
  }
  .directory_main{
    padding: 0;
    height: 100%;
    border-radius: 4px 4px 0 0;
    background-color: #fff;
  }
  .directory_main__container{
    height: 100%;
  }
  .directory_main__view{
    padding: 0;
    height: calc(~"100%");
    overflow: hidden;
    .board_header{
      height: 30px;
    }
  }
  .directory_main__header{
    height: 40px !important;
  }
}
</style>
