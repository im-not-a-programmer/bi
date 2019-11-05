<template>
  <BoardCanvas />
</template>

<script>
import { mapActions } from 'vuex'
import BoardCanvas from '@/sections/board/BoardCanvas'

export default {
  name: 'board',
  components: {
    BoardCanvas
  },
  created () {
    this.findBoardDetailById(this.$route.params.bId)
  },
  methods: {
    ...mapActions({
      findBoardDetailById: 'board/findBoardDetailById'
    })
  }
}
</script>
