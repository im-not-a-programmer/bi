<template>
  <div class="table" :id="tableId">
    <el-table
      v-if="option"
      :data="option.table.data"
      :style="{ borderColor: borderColor, borderLeft: 'none'}"
      :height="tableHeight"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :header-row-style="headerRowStyle"
      :header-cell-style="headerCellStyle"
      border>
      <el-table-column
        v-if="option.tableStyle.format.serialNumber"
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        v-for="item in option.table.fields"
        :key="item.key"
        :column-key="item.key"
        :prop="item.key"
        resizable
        sortable
        show-overflow-tooltip
        :label="item.showName || item.name + (item.type === 2 ? '(' + computedTypes[item.computedType] + ')' : '')">
      </el-table-column>
    </el-table>
  <!--  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="option.table.data.length">
    </el-pagination>-->
  </div>
</template>
<script>
import themeConst from '@/assets/theme/index'
import { computedTypes } from '@/const/board'

  export default {
  name: 'table-detail',
  props: {
    mId: {
      type: String,
      default: ''
    },
    option: {
      type: Object,
      default: () => { return {} }
    },
    cType: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fields: [],
      data: [],
      tableHeight: 0,
      computedTypes: computedTypes
    }
  },
  computed: {
    tableId () {
      return `table-${this.mId}`
    },
    themeFile () { // 看板主题文件
      return themeConst[this.option.theme]
    },
    color () { // 表格主题色
      return this.option.tableStyle.style.themeColor || this.themeFile.tableThemeColor
    },
    borderColor () { // 边框颜色
      return this.hexToRgbA(this.color, '0.7')
    },
    oddColor () { // 奇数行颜色
      return this.hexToRgbA(this.color, '0.1')
    },
    evenColor () { // 偶数行颜色
      return this.hexToRgbA(this.color, '0.25')
    },
    // 表头行样式
    headerRowStyle () {
      return {
        fontFamily: this.option.tableStyle.font.header.fontFamily,
        textAlign: this.option.tableStyle.font.header.fontAlign,
        color: this.option.tableStyle.font.header.color || this.themeFile.tableFontColor,
        backgroundColor: this.option.tableStyle.style.tableStyle === 3
          ? 'transparent'
          : this.color
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.resize()
    })
  },
  methods: {
    // 行样式
    rowStyle (row) {
      return {
        fontFamily: this.option.tableStyle.font.body.fontFamily,
        textAlign: this.option.tableStyle.font.body.fontAlign,
        color: this.option.tableStyle.font.body.color || this.themeFile.tableFontColor,
        padding: `${this.option.tableStyle.format.lineHeight}px 0`,
        backgroundColor: this.option.tableStyle.style.tableStyle === 1
          ? (row.rowIndex % 2 === 0 ? this.evenColor : this.oddColor)
          : 'transparent'
      }
    },
    // 格样式
    cellStyle (row) {
      const column = this.option.tableAttr[row.column.columnKey]
      return {
        padding: `${this.option.tableStyle.format.lineHeight / 2}px 0`,
        borderColor: this.borderColor,
        borderLeft: row.columnIndex === 0 ? `1px solid ${this.borderColor}` : '',
        color: column ? column.color.color : this.option.tableStyle.font.body.color
      }
    },
    // 表头格样式
    headerCellStyle (row) {
      return {
        padding: `${this.option.tableStyle.format.lineHeight / 2}px 0`,
        borderColor: this.borderColor,
        borderLeft: row.columnIndex === 0 ? `1px solid ${this.borderColor}` : ''
      }
    },
    resize () {
      this.tableHeight = document.getElementById(this.tableId).parentNode.clientHeight - 15
    },
    // hex转rgba
    hexToRgbA (hex, opacity) {
      let c
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity})`
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .table {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    /deep/ .el-table {
      color: #333;
      background-color: transparent;
      thead {
        color: #333;
      }
      th, td, tr {
        text-align: inherit;
        background-color: transparent;
      }
    }
    .el-table--border::after {
      width: 0;
    }
    .el-table::before {
      height: 0;
    }
  }
</style>
