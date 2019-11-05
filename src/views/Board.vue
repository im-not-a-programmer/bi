<template>
  <el-container class="board">
    <el-header class="board_header">
      <BoardHeader
        :showStyle="true"
        :showPreview="true"
        @editStyle="editStyle"
        @previewBoard="previewBoard" />
    </el-header>
    <el-container class="board_container">
      <el-aside class="board_sidebar">
        <BoardSidebar @selectTable="handleDataOpen" />
      </el-aside>
      <el-main class="board_main" v-loading="loading">
        <BoardCanvas :edit="true" @selectTable="handleDataOpen" />
      </el-main>
    </el-container>
    <BoardStyle
      :styleVisible="styleVisible"
      @editStyle="editStyle" />
    <DataSourceDialog
      :mode="mode"
      @sure="handleDataSure"
      @close="handleDataClose" />
  </el-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BoardStyle from '@/sections/board/BoardStyle'
import DataSourceDialog from '@/sections/board/DataSourceDialog'
import BoardSidebar from '@/sections/board/BoardSidebar'
import BoardHeader from '@/sections/board/BoardHeader'
import BoardCanvas from '@/sections/board/BoardCanvas'

export default {
  name: 'board',
  components: {
    BoardStyle,
    BoardSidebar,
    BoardHeader,
    DataSourceDialog,
    BoardCanvas
  },
  data () {
    return {
      styleVisible: false, // 展示看板样式弹框
      mode: null, // 数据源选择框类型 'add'添加模块 'edit'切换数据源
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      board: 'board/board'
    })
  },
  created () {
    this.findBoardDetailById(this.$route.params.bId).then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      findBoardDetailById: 'board/findBoardDetailById',
      createModule: 'board/createModule'
    }),
    // 控制展示看板样式弹框
    editStyle () {
      this.styleVisible = !this.styleVisible
    },
    // 打开数据源弹框
    handleDataOpen () {
      this.mode = 'add'
    },
    // 关闭数据源弹框
    handleDataClose () {
      this.mode = null
    },
    // 数据源弹框中点确认
    async handleDataSure (tableId) {
      let maxY = 0
      if (this.board.modules && Object.keys(this.board.modules).length > 0) {
        // 将新建的模块放在最下方
        for (let item in this.board.modules) {
          let style = this.board.modules[item].style
          if (style.y + style.h > maxY) {
            maxY = style.y + style.h
          }
        }
      }
      const res = await this.createModule({
        bId: this.$route.params.bId,
        tableId,
        style: { x: 0, y: maxY, w: 4, h: 6 }
      })
      if (res.status) {
        this.handleDataClose()
        this.$router.push({
          name: 'module',
          params: { bId: res.data.bId },
          query: { mId: res.data.mId }
        })
      }
    },
    // 预览
    previewBoard () {
      this.$router.push({
        name: 'developerPreview',
        params: { bId: this.$route.params.bId }
      })
    }
  }
}
</script>
