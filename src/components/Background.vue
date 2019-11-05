<template>
  <section class="bg_container" :style="style">
    <slot></slot>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import themeConst from '@/assets/theme/index'

export default {
  name: 'background',
  props: {
    type: {
      type: String,
      default: ''
    },
    background: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    ...mapGetters({
      theme: 'board/theme'
    }),
    style () {
      switch (this.background.type) {
        case 'color':
          return `background-color: ${this.background.color || themeConst[this.theme][this.type + 'Color']}`
        case 'image':
          return this.background.image
            ? `background: url(${this.background.image}) center center /cover no-repeat`
            : `background-color: ${themeConst[this.theme][this.type + 'Color']}`
        default:
          return ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .bg_container {
    height: 100%;
    position: relative;
  }
</style>
