<template>
  <div class="module__axis_item">
    <span @click="handleAlias" class="module__axis_item__name ellipsis" v-show="!editState">
      {{current.showName || (current.name + `${type === 'datas' ? currentComputedName() : ''}`)}}
    </span>
    <input
      v-show="editState"
      ref="inputName"
      :value="current.showName || (current.name + `${type === 'datas' ? currentComputedName() : ''}`)"
      class="module__axis_item__input"
      @keyup.enter="handleBlur($event)"
      @blur="handleBlur($event)"/>
    <el-popover
        placement="bottom"
        width="130"
        popper-class="module__axis_item__popover"
        ref="popoverAxisItem"
        trigger="click">
      <el-popover
        v-if="type === 'datas'"
        placement="right-start"
        width="90"
        ref="popoverComputedTypes"
        popper-class="module__axis_item__popover"
        popper-append-to-body="false"
        trigger="hover">
        <div v-for="(type, key) in current.fieldType.indexOf('INT') > -1 ? computedTypes : partComputedTypes"
             :key="key"
             @click="handleComputedType(key)"
             :class="{'dot_transparent': Number(key) !== current.computedType}">
          <i class="dot"></i>{{type}}
        </div>
        <div slot="reference"><Icon iconClass="icon_sum" />汇总方式<i class="el-icon-arrow-right"></i></div>
      </el-popover>
      <div @click="handleAlias"><i class="el-icon-setting"></i>设置显示名</div>
      <div @click="handleDelete"><i class="el-icon-delete"></i>删除</div>
      <i slot="reference" class="el-icon-caret-bottom module__axis_item__arrow"></i>
    </el-popover>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { computedTypes, partComputedTypes } from '@/const/board'
import Icon from '@/components/Icon'

export default {
  name: 'axis-item',
  props: {
    module: {
      type: Object,
      default: () => { return {} }
    },
    field: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editState: false,
      computedTypes: computedTypes,
      partComputedTypes: partComputedTypes
    }
  },
  components: {
    Icon
  },
  computed: {
    ...mapGetters({
      drawTypeFn: 'board/drawTypeFn'
    }),
    // 当前dimensionMap的值
    current () {
      return this.module.dimensionMap[this.field]
    }
  },
  methods: {
    // 当前计算方式的中文
    currentComputedName () {
      return `(${this.computedTypes[this.current.computedType]})`
    },
    // 删除维度||数值
    handleDelete () {
      this.module.analysis[this.type].splice(this.module.analysis[this.type].findIndex(key => this.field === key), 1)
      delete this.module.dimensionMap[this.field]
      delete this.module.settings[`${this.drawTypeFn(this.module.cType)}Attr`][this.field]
    },
    // 设置显示名
    handleAlias () {
      this.editState = true
      this.$refs.popoverAxisItem.doClose()
      this.$nextTick(() => {
        this.$refs.inputName.focus()
        this.$refs.inputName.select()
      })
    },
    // 输入框失去焦点
    handleBlur (event) {
      this.editState = false
      const value = event.currentTarget.value
      if (!value) {
        this.$message.warning('字段名不可为空')
        return
      }
      if ((this.current.name + (this.type === 'datas' ? this.currentComputedName() : '')) !== value) {
        this.$set(this.module.dimensionMap[this.field], 'showName', value)
      }
    },
    // 选择计算类型
    handleComputedType (key) {
      this.$refs.popoverAxisItem.doClose()
      this.$refs.popoverComputedTypes.doClose()
      if (this.current.computedType === Number(key)) { return }
      this.module.dimensionMap[this.field].computedType = Number(key)
      this.module.dimensionMap[this.field].showName = null
    }
  }
}
</script>
<style lang="less" scoped>
  .module__axis_item {
    padding-left: 10px;
    height: 22px;
    line-height: 22px;
    margin-right: 10px;
    display: inline-block;
    max-width: 200px;
    border: 1px solid #d3d4d6;
    border-radius: 4px;
    vertical-align: middle;
    cursor: pointer;
    position: relative;
    color: #333;
    .module__axis_item__input {
      border: 0;
      outline:none;
    }
    .module__axis_item__name, .module__axis_item__input {
      width: 100%;
      padding-right: 20px;
      display: inline-block;
    }
    .module__axis_item__arrow {
      position: absolute;
      right: 4px;
      top: 3px;
      outline: none;
      display: none;
      font-size: 14px;
    }
  }
  .module__axis_item:hover {
    .module__axis_item__arrow {
      display: block;
    }
  }
</style>
<style lang="less">
  .module__axis_item__popover {
    min-width: auto;
    padding: 5px 0;
    font-size: 12px;
    div {
      height: 26px;
      line-height: 26px;
      padding: 0 10px;
      cursor: pointer;
      i, svg {
        margin-right: 10px;
        font-size: 14px;
      }
      .el-icon-arrow-right {
        position: absolute;
        right: 0;
        top: 10px;
      }
    }
    div:hover {
      background-color: #f8f3fe;
    }
    .dot_transparent {
      .dot {
        background: transparent;
      }
    }
  }
  .el-popper[x-placement^="right"] .popper__arrow {
    border-color: transparent
  }
</style>
