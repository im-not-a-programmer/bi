<template>
  <section class="dashboard">
    <div class="dashboard_head">
      <el-popover
        ref="newBoardPopover"
        v-model="newBoardVisible"
        placement="bottom-start"
        width="250"
        @hide="handleHide"
        trigger="click">
        <el-row :gutter="10">
          <el-col :span="6">名称：</el-col>
          <el-col :span="18">
            <el-input v-model="name" placeholder="请输入看板名称"></el-input>
          </el-col>
        </el-row>
        <div class="new_board__popover_btns">
          <el-button @click="handleHide">取消</el-button>
          <el-button type="primary" @click="newBoard">确定</el-button>
        </div>
        <el-button slot="reference" type="primary" icon="el-icon-plus">新建看板</el-button>
      </el-popover>
    </div>
    <Table ref="dashboardTable" />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Table from '@/sections/dashBoard/Table'

export default {
  name: 'dashboard',
  components: {
    Table
  },
  data () {
    return {
      name: '',
      newBoardVisible: false
    }
  },
  methods: {
    ...mapActions({
      createBoard: 'board/createBoard'
    }),
    async newBoard () {
      if (this.name) {
        const res = await this.createBoard({ name: this.name })
        if (res.status) {
          this.$refs.newBoardPopover.doClose()
          this.$refs.dashboardTable.getData()
          const { href } = this.$router.resolve({
            name: 'board',
            params: { bId: res.data.boardId }
          })
          window.open(href, '_blank')
        }
      } else {
        this.$message.warning('请输入看板名')
      }
    },
    // 关闭新建框
    handleHide () {
      this.newBoardVisible = false
      this.name = ''
    }
  }
}
</script>

<style lang="less" scoped>
  .dashboard {
    height: 100%;
    font-size: 14px;
    padding: 20px;
    .dashboard_head {
      text-align: left;
    }
  }
  .new_board__popover_btns {
    text-align: center;
    margin-top: 20px;
  }
</style>
