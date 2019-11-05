<template>
  <section class="module_title" :style="style" v-show="title.enabled">
    {{content}}
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import themeConst from '@/assets/theme/index'

export default {
  name: 'module-title',
  props: {
    title: {
      type: Object,
      default: () => { return {} }
    },
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      theme: 'board/theme'
    }),
    style () {
      const themeData = themeConst[this.theme]
      const obj = {
        color: this.title.color || themeData.title.textStyle.color,
        fontFamily: this.title.fontFamily,
        textAlign: this.title.position || 'left'
      }
      switch (this.title.type) {
        case 'backgroundColor':
          obj.backgroundColor = this.title.backgroundColor || themeData['moduleColor']
          break
        case 'backgroundImage':
          this.title.image
            ? obj.background = `url(${this.title.image}) center center /cover no-repeat`
            : obj.backgroundColor = themeData['moduleColor']
          break
      }
      return obj
    }
  }
}
</script>
<style lang="less" scoped>
  .module_title {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
  }
</style>
