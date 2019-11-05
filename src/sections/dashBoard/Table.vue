<template>
  <el-table :data="tableData" class="board_table unify_table" stripe>
    <el-table-column label="看板名称">
      <template slot-scope="scope">
        <el-input
          v-model="scope.row.name"
          :ref="`input${scope.row._id}`"
          :class="tableData[scope.$index].rename ? 'db' : 'dn'"
          placeholder="请输入看板名"
          @blur="handleBlur(scope.row, scope.$index)"></el-input>
        <span :class="!tableData[scope.$index].rename ? 'db' : 'dn'">{{scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column label="修改者" prop="editor"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row, 'board')" type="text" size="small">编辑</el-button>
        <el-button @click="handleClick(scope.row, 'preview')" type="text" size="small">预览</el-button>
        <el-button @click="handleClick(scope.row, 'rename', scope.$index)" type="text" size="small">重命名</el-button>
        <el-button @click="handleClick(scope.row, 'delete')" type="text" size="small" :disabled="scope.row.published===1">删除</el-button>
        <el-button @click="handleClick(scope.row, 'publish')" type="text" size="small" v-if="scope.row.published===0">发布</el-button>
        <el-button @click="handleClick(scope.row, 'un-publish')" type="text" size="small" v-if="scope.row.published===1">取消发布</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'board-table',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    ...mapActions({
      findAllBoard: 'board/findAllBoard',
      deleteBoardById: 'board/deleteBoardById',
      updateBoard: 'board/updateBoard',
      publishBoard: 'board/publishBoard'
    }),
    // 获取看板列表
    async getData () {
      this.tableData = await this.findAllBoard()
      this.tableData.forEach((item, index) => {
        this.tableData[index].originName = item.name
      })
    },
    // 编辑/预览/发布/取消发布/重命名/删除看板
    async handleClick (row, type, index) {
      switch (type) {
        case 'board':
        case 'preview':
          const { href } = this.$router.resolve({
            name: type,
            params: { bId: row._id }
          })
          window.open(href, '_blank')
          break
        case 'publish':
        case 'un-publish':
          const published = Number(!row.published)
          const status = await this.publishBoard({ id: row._id, published })
          status && (row.published = published)
          break
        case 'rename':
          this.set(index, 'rename', true)
          this.$nextTick(() => {
            this.$refs[`input${row._id}`].focus()
          })
          break
        case 'delete':
          this.$confirm(`该看板含有数据，确定要删除该看板吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            await this.deleteBoardById(row._id)
            this.getData()
          }).catch(() => {
          })
          break
      }
    },
    // 重命名
    async handleBlur (row, index) {
      if (!row.name) {
        this.$message.warning('看板名不可为空')
        this.set(index, 'name', row.originName)
        this.set(index, 'rename', false)
      } else if (row.name === row.originName) {
        this.set(index, 'rename', false)
      } else {
        const status = await this.updateBoard({ id: row._id, name: row.name })
        if (status) {
          this.set(index, 'rename', false)
          this.set(index, 'originName', row.name)
          this.$message.success('修改看板名成功')
        }
      }
    },
    set (index, key, value) {
      this.$set(this.tableData[index], key, value)
    }
  }
}
</script>
<style lang="less" scoped>
  .board_table {
    margin-top: 20px;
    .dn{
      display: none;
    }
    .db {
      display: block;
    }
  }
</style>
