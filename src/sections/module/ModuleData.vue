<template>
  <section class="module_data">
    <div class="module_data__table">
      <span class="ellipsis">{{tableId.substr(tableId.indexOf('$_$') + 3)}}</span>
      <i @click="handleEdit" class="fr pointer"><Icon iconClass="icon_exchange" /></i>
    </div>
    <div class="module_data__list" v-loading="loading">
      <el-scrollbar tag="ul" class="module_data__scrollbar no_x_scrollbar" v-if="tableData">
        <li v-for="item in tableData" :key="item.fieldId">
          <Drag>
            <div :data-id="item.fieldId" :data-name="item.name" :data-type="item.fieldType">
              <Icon :iconClass="item.icon" />
              {{item.name}}
            </div>
          </Drag>
        </li>
      </el-scrollbar>
    </div>
  </section>
</template>
<script>
import { mapActions } from 'vuex'
import Drag from '@/components/Drag'
import Icon from '@/components/Icon'

export default {
  name: 'module-data',
  data () {
    return {
      tableData: null,
      loading: true
    }
  },
  components: {
    Drag,
    Icon
  },
  props: {
    selectTable: {
      type: Function,
      default: () => {}
    },
    tableId: {
      type: String,
      default: ''
    }
  },
  watch: {
    tableId () {
      this.loading = true
      this.getData()
    }
  },
  created () {
    this.getData()
  },
  methods: {
    ...mapActions({
      findFieldsByTableId: 'board/findFieldsByTableId'
    }),
    // 获取当前数据表信息
    async getData () {
      const res = await this.findFieldsByTableId({ tableId: this.tableId })
      let vArr = []; let dArr = []; let iArr = []
      res.fileds.forEach(item => {
        if (item.fieldType.indexOf('DATE') > -1) {
          item.icon = 'icontime'
          dArr.push(item)
        } else if (item.fieldType.indexOf('VARCHAR') > -1) {
          item.icon = 'icontext'
          vArr.push(item)
        } else if (item.fieldType.indexOf('INT') > -1) {
          item.icon = 'iconnumber'
          iArr.push(item)
        }
      })
      this.tableData = dArr.concat(vArr).concat(iArr)
      this.loading = false
    },
    // 打开数据源弹框
    handleEdit () {
      this.$emit('selectTable', 'edit')
    }
  }
}
</script>
<style lang="less" scoped>
  .module_data {
    height: 100%;
    padding: 10px 0 10px 10px;
    .module_data__table {
      padding: 0 10px;
      height: 50px;
      line-height: 50px;
      font-weight:bold;
      display: flex;
      span {
        flex: 1;
      }
    }
    .module_data__list {
      height: calc(100% - 50px);
      li {
        margin: 15px 0;
        svg {
          font-size: 16px;
          vertical-align: middle;
          margin-right: 4px;
          color: #8186a2;
        }
      }
    }
    .module_data__scrollbar {
      height: 100%;
      padding-left: 10px;
    }
  }
</style>
