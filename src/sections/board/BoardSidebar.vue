<template>
  <section class="board_sidebar__content">
    <div class="board_sidebar__add_module pointer" @click="handleAddModule">
      <i class="el-icon-circle-plus-outline"></i>组件
    </div>
  </section>
</template>
<script>
export default {
  name: 'board-sidebar',
  props: {
    selectTable: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    // 打开数据源弹框
    handleAddModule () {
      this.$emit('selectTable')
    }
  }
}
</script>
<style lang="less" scoped>
  .board_sidebar__content {
    .board_sidebar__add_module {
      i {
        display: block;
        font-size: 26px;
        margin: 30px auto 15px auto;
      }
    }
  }
</style>
