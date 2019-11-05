<template>
  <section class="header_panel">
    <div class="header__user fr"><i class="el-icon-user-solid"></i>admin</div>
  </section>
</template>
<script>

export default {
  name: 'header-panel'
}
</script>
<style lang="less" scoped>
  .header_panel {
    background-color: #fff;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    .header__user {
      i {
        margin-right: 10px;
      }
    }
  }
</style>
