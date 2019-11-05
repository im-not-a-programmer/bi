<template>
  <el-dialog
    title="查看明细"
    :visible.sync="detailVisible"
    width="55%"
    class="check_detail"
    :before-close="handleClose">
    <el-table v-if="detailVisible" :data="details.data" height="300" stripe class="unify_table">
      <el-table-column
        v-for="item in details.fields"
        :key="item.key"
        :prop="item.key"
        :label="item.showName || item.name + (item.type === 2 ? '(' + computedTypes[item.computedType] + ')' : '')">
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handleClose">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
import { computedTypes } from '@/const/board'

export default {
  name: 'detail-dialog',
  props: {
    details: {
      type: Object,
      default: () => { return {} }
    },
    close: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      computedTypes: computedTypes
    }
  },
  computed: {
    detailVisible () {
      return !!this.details
    }
  },
  methods: {
    // 关闭明细弹框
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
  .check_detail {
    /deep/ .el-dialog {
      .el-dialog__header {
        text-align: left;
        font-weight: bold;
      }
      .el-dialog__body {
        padding: 10px 20px 30px;
      }
      .el-table:before {
        height: 0;
      }
    }
  }
</style>
