<template>
  <section class="theme">
    <ul>
      <li v-for="(value, key) in themeConst"
          :key="key"
          :class="['theme__item', {'active': key === board_.style.theme}]"
          @click="handleClick(key)"
          :style="'background-color: ' + value.boardColor ">
        <div :style="'background-color: ' + value.moduleColor ">
          <i v-for="item in value.color.slice(0, 3)" :key="item" :style="'background-color: ' + item" ></i>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
import { mapActions } from 'vuex'
import themeConst from '@/assets/theme/index'

export default {
  name: 'theme',
  data () {
    return {
      themeConst: themeConst
    }
  },
  props: {
    board_: {
      type: Object,
      default: () => { return {} }
    }
  },
  methods: {
    ...mapActions({
      saveBoard: 'board/saveBoard'
    }),
    // 切换主题
    handleClick (id) {
      if (id === this.board_.style.theme) { return }
      // 同步修改每个模块的theme
      for (let key in this.board_.modules) {
        this.board_.modules[key].theme = id
      }
      this.board_.style.theme = id
    }
  }
}
</script>
<style lang="less">
  .theme {
    padding: 20px 20px 0;
    border-top: 1px solid #e8eaed;
    margin-top: 10px;
    .theme__item {
      width: 108px;
      height: 68px;
      display: inline-block;
      position: relative;
      margin-bottom: 10px;
      padding: 9px;
      border: 2px solid transparent;
      > div {
        width: 100%;
        height: 100%;
        i {
          position: absolute;
          height: 6px;
          left: 20px;
        }
        i:first-child {
          top: 20px;
          width: 40px;
        }
        i:nth-child(2) {
          top: 30px;
          width: 70px;
        }
        i:last-child {
          top: 40px;
          width: 50px;
        }
      }
    }
    .theme__item:nth-child(2n) {
      float: right;
    }
    .active {
      border: 2px solid #3685f2;
    }
  }
</style>
