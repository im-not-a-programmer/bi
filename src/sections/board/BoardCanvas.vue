<template>
  <section class="board_canvas">
    <Background :background="boardBg" type="board">
      <el-scrollbar
        v-if="board.modules && Object.keys(board.modules).length > 0"
        tag="div"
        class="board_canvas__container"
        wrapClass="board_canvas__container_wrap" >
        <grid-layout
          :layout.sync="layout"
          :is-draggable="draggable"
          :is-resizable="resizable"
          :is-mirrored="false"
          :vertical-compact="false"
          :margin="[10, 10]"
          :use-css-transforms="true"
          :col-num="12"
          :row-height="50"
          :col-width="50"
          @layout-ready="handleLayout"
          @layout-updated="handleLayoutUpdated">
          <grid-item v-for="item in layout"
                     :key="item.i"
                     :x="item.x"
                     :y="item.y"
                     :w="item.w"
                     :h="item.h"
                     :i="item.i"
                     :minW="3"
                     :minH="3"
                     drag-allow-from=".module_title"
                     drag-ignore-from=".bg_container"
                     @resized="handleResize">
            <BoardItem :module="board.modules[item.i]" :edit="edit" :ref="item.i" @checkDetails="checkDetails" />
          </grid-item>
        </grid-layout>
      </el-scrollbar>
      <div v-else-if="this.edit" class="board_canvas__add_module pointer" @click="handleAdd">
        <i class="el-icon-document-add"></i>添加组件
      </div>
      <DetailsDialog :details="details" @close="checkDetails" />
    </Background>
  </section>
</template>
<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import BoardItem from '@/sections/board/BoardItem'
import DetailsDialog from '@/components/DetailsDialog'
import Background from '@/components/Background'
import VueGridLayout from 'vue-grid-layout'

export default {
  name: 'board-header',
  components: {
    BoardItem,
    DetailsDialog,
    Background,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: {
    selectTable: {
      type: Function,
      default: () => {}
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      layout: [],
      details: null // 明细表
    }
  },
  computed: {
    ...mapGetters({
      board: 'board/board'
    }),
    draggable () {
      return this.edit
    },
    resizable () {
      return this.edit
    },
    boardBg () {
      const style = this.board.style
      return style ? style.background : {}
    }
  },
  watch: {
    'board': {
      // 增加/删除模块时重新计算layout
      handler (newVal, oldVal) {
        if (!oldVal.modules) return
        if (Object.keys(newVal.modules).length === Object.keys(oldVal.modules).length) return
        this.handleLayout()
      },
      deep: true
    }
  },
  created () {
    window.addEventListener('resize', this.resizeListenerFn, false)
  },
  methods: {
    ...mapActions({
      saveBoard: 'board/saveBoard'
    }),
    // 计算出vue-grid-layout需要的数组格式
    handleLayout () {
      this.layout.length = 0
      const modules = this.board.modules
      for (let key in modules) {
        let style = { ...modules[key].style, ...{} }
        style.i = modules[key].mId
        this.layout.push(style)
      }
    },
    // layout改变时保存看板
    handleLayoutUpdated (newLayout) {
      let boardDeep = _.cloneDeep(this.board)
      newLayout.forEach(item => {
        for (let key in boardDeep.modules) {
          if (item.i === boardDeep.modules[key].mId) {
            boardDeep.modules[key].style = item
          }
        }
      })
      this.saveBoard(boardDeep)
    },
    // 触发模块resize
    handleResize (key) {
      this.$nextTick(() => {
        this.resize(key)
      })
    },
    // 触发window resize
    resizeListenerFn: _.debounce(function () {
      for (let key in this.board.modules) {
        this.resize(key)
      }
    }, 200),
    // resize具体操作
    resize (key) {
      Object.values(this.$refs[key][0].$refs)[0].resize() // 取出BoardItem下的drawType组件
    },
    // 打开数据源弹框
    handleAdd () {
      this.$emit('selectTable')
    },
    // 查看明细
    checkDetails (details) {
      this.details = details || null
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeListenerFn)
  }
}
</script>
<style lang="less">
  .board_canvas {
    height: 100%;
    .board_canvas__container {
      height: 100%;
    }
  }
  .board_canvas__add_module {
    width: 150px;
    height: 130px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    > i{
      display: block;
      font-size: 35px;
      margin: 20px;
    }
  }
</style>
