<template>
  <el-container class="preview">
    <el-header class="board_header">
      <BoardHeader :showEdit="true" @editBoard="editBoard" />
    </el-header>
    <el-main class="board_main">
      <BoardCanvas />
    </el-main>
  </el-container>
</template>

<script>
import { mapActions } from 'vuex'
import BoardCanvas from '@/sections/board/BoardCanvas'
import BoardHeader from '@/sections/board/BoardHeader'

export default {
  name: 'board',
  components: {
    BoardCanvas,
    BoardHeader
  },
  created () {
    this.findBoardDetailById(this.$route.params.bId)
  },
  methods: {
    ...mapActions({
      findBoardDetailById: 'board/findBoardDetailById'
    }),
    editBoard () {
      this.$router.push({
        name: 'board',
        params: { bId: this.$route.params.bId }
      })
    }
  }
}
</script>
