<template>
  <el-dialog
    title="数据源"
    :visible.sync="visible"
    width="55%"
    class="board_dataset"
    :before-close="handleClose">
    <el-row :gutter="10">
      <el-col :span="6">
        <h4><el-divider direction="vertical"></el-divider>数据源</h4>
        <el-scrollbar tag="ul" class="board_dataset__scrollbar no_x_scrollbar">
          <li v-for="item in dataset" :key="item.tableId" @click="handleClickTable(item.tableId)"
             :class="['pointer', 'ellipsis', 'icon_normal', {'board_dataset__item--active': item.tableId===activeTableId }]">
            <Icon iconClass="icon_biao" />{{item.tableName}}
          </li>
        </el-scrollbar>
      </el-col>
      <el-col :span="18">
        <h4><el-divider direction="vertical"></el-divider>表详情</h4>
        <el-table :data="tableData.data" height="300" stripe class="unify_table">
          <el-table-column
            v-for="item in tableData.fileds"
            :key="item.fieldId"
            :prop="item.name"
            :label="item.name">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-popover
        v-if="mode==='edit' && tableId !== this.activeTableId"
        placement="bottom-end"
        width="250"
        trigger="click"
        v-model="popoverVisible"
        popper-class="board_dataset__confirm">
        <p>切换新的数据表，将清空组件中的已有字段。确定切换新的数据表？</p>
        <div>
          <el-button type="text" @click="popoverVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSure">确定</el-button>
        </div>
        <el-button slot="reference" type="primary" :disabled="!activeTableId" class="board_dataset__sure">确 定</el-button>
      </el-popover>
      <el-button v-else type="primary" @click="handleSure" :disabled="!activeTableId">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import Icon from '@/components/Icon'

export default {
  name: 'data-source-dialog',
  data () {
    return {
      dataset: [],
      tableData: {},
      activeTableId: null,
      popoverVisible: false
    }
  },
  props: {
    mode: {
      type: String,
      default: ''
    },
    tableId: {
      type: String,
      default: ''
    },
    sure: {
      type: Function,
      default: () => {}
    },
    close: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    Icon
  },
  computed: {
    visible () {
      return !!this.mode
    }
  },
  watch: {
    mode: {
      async handler (val) {
        if (val) {
          const res = await this.getDatasetAll()
          this.dataset = res
          val === 'edit' && this.handleClickTable(this.tableId)
        } else {
          this.activeTableId = null
          this.dataset = []
          this.tableData = {}
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getDatasetAll: 'board/getDatasetAll',
      findFieldsByTableId: 'board/findFieldsByTableId',
      createModule: 'board/createModule'
    }),
    // 选中某张表
    async handleClickTable (tableId) {
      this.activeTableId = tableId
      this.tableData = await this.findFieldsByTableId({ tableId })
    },
    // 关闭弹框
    handleClose () {
      this.$emit('close')
    },
    // 确认选中该表格
    handleSure () {
      this.$emit('sure', this.activeTableId)
      this.popoverVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
  .board_dataset {
    text-align: left;
    /deep/ .el-dialog__title {
      font-weight: bold;
    }
    .board_dataset__item--active {
      background: #f3f3f8;
      border-radius: 4px;
    }
    .board_dataset__sure {
      margin-left: 10px;
    }
    h4 {
      margin-bottom: 20px;
      .el-divider {
        width: 5px;
        background: #12c39b;
        border-radius: 2px;
        margin: 0 6px 0 0;
      }
    }
    .el-table:before {
      height: 0;
    }
    .board_dataset__scrollbar {
      height: 300px;
      border: 1px solid #e3e3e3;
      border-radius: 4px;
      li {
        padding: 10px;
      }
    }
  }
</style>
