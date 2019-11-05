<template>
  <el-container class="page">
    <el-aside width="74px">
      <SideMenu />
    </el-aside>
    <el-container>
      <el-header height="40px">
        <HeaderPanel />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from '@/components/SideMenu'
import HeaderPanel from '@/components/HeaderPanel'

export default {
  name: 'home',
  components: {
    SideMenu,
    HeaderPanel
  }
}
</script>
<style lang="less" scoped>
  .page {
    height: 100%;
    .el-header {
      padding: 0 20px 0 0;
    }
    .el-main{
      background-color: #f7f8fa;
      color: #3d4d66;
      padding: 16px 16px 0 16px;
      height: 100%;
      > section {
        background-color: #fff;
      }
    }
  }
</style>
