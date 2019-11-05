<template>
  <section class="board_header__content fl">
    <span @click="handleStyle" class="icon_normal pointer" v-if="showStyle">
      <Icon iconClass="icon_style" />看板样式
    </span>
    <span @click="handlePreview" class="icon_normal pointer" v-if="showPreview">
      <Icon iconClass="icon_preview" />预览
    </span>
    <span @click="handleEdit" class="icon_normal pointer" v-if="showEdit">
      <Icon iconClass="icon_edit" />编辑看板
    </span>
  </section>
</template>
<script>
import Icon from '@/components/Icon'

export default {
  name: 'board-header',
  props: {
    showStyle: {
      default: false,
      type: Boolean
    },
    showPreview: {
      default: false,
      type: Boolean
    },
    showEdit: {
      default: false,
      type: Boolean
    },
    editStyle: {
      type: Function,
      default: () => {}
    },
    previewBoard: {
      type: Function,
      default: () => {}
    },
    editBoard: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    Icon
  },
  methods: {
    handleStyle () {
      this.$emit('editStyle')
    },
    handlePreview () {
      this.$emit('previewBoard')
    },
    handleEdit () {
      this.$emit('editBoard')
    }
  }
}
</script>
<style lang="less" scoped>
  .board_header__content {
    span {
      margin-left: 30px;
    }
  }
</style>
