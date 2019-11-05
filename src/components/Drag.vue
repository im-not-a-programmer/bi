<template>
  <div draggable="true" class="drag-box pointer">
    <slot></slot>
  </div>
</template>
<script>

export default {
  name: 'drag'
}
</script>
<style lang="less" scoped>
  .drag-box {
    height: 100%;
  }
</style>
