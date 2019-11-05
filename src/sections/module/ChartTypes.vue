<template>
  <section class="module_chart__types">
    <h4>图表类型</h4>
    <div class="module_chart__types_box">
      <el-button
        v-for="(item, key) in types"
        type="text"
        :key="key"
        :disabled="!canuse[key]"
        :class="[{'icon--active': key===module.cType}]"
        @click="handleSelect(key, item.mType)">
        <span @mouseover="mouseoverFn(item)" @mouseout="mouseoutFn">
          <Icon :iconClass="'icon_' + key + (canuse[key] ? '' : '_gray')" />
        </span>
      </el-button>
    </div>
    <p class="module_chart__types_tips">{{tip}}</p>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import Icon from '@/components/Icon'
import constant, { chartTypes } from '@/const/board'

export default {
  name: 'chart-types',
  data () {
    return {
      types: chartTypes,
      tip: '请选择一个图表类型',
      canuse: {} // 例如{ 'line': false, 'bar': false, 'pie', false }
    }
  },
  props: {
    module: {
      type: Object,
      default: () => { return {} }
    }
  },
  components: {
    Icon
  },
  watch: {
    'module.analysis': {
      handler () {
        this.judgeDisabled()
        // 如果当前图表不可用，切换为第一个可以画出的图表 || null
        if (this.canuse[this.module.cType] === false) {
          if (JSON.stringify(this.canuse).indexOf('true') === -1) {
            this.handleSelect(null, null)
          } else {
            for (let key in this.canuse) {
              if (this.canuse[key]) {
                this.handleSelect(key, this.types[key].mType)
                return
              }
            }
          }
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      drawTypeFn: 'board/drawTypeFn'
    })
  },
  created () {
    this.judgeDisabled()
    this.module.cType && (this.tip = this.types[this.module.cType].tip)
  },
  methods: {
    mouseoverFn (item) {
      this.tip = item.tip
    },
    mouseoutFn () {
      this.tip = this.module.cType ? this.types[this.module.cType].tip : '请选择一个图表类型'
    },
    // 切换图表类型
    handleSelect (cType, mType) {
      const oldmType = this.drawTypeFn(this.module.cType)
      const newmType = this.drawTypeFn(cType)
      if (mType && mType !== this.module.mType) {
        // 不同种mType图表类型切换：清空settings.[oldmType]Attr，根据analysis.datas 生成settings.[newmType]Attr
        this.module.settings[`${oldmType}Attr`] = {}
        this.module.analysis.datas.forEach((item, index) => {
          this.$set(
            this.module.settings[`${newmType}Attr`],
            item,
            constant[`${newmType}Const`].attrDefault(cType === 'barLine' ? (index === 0 ? 'line' : 'bar') : cType)
          )
        })
      } else {
        // 同种mType图表类型切换 || mType = null
        this.module.analysis.datas.forEach((item, index) => {
          this.module.settings[`${newmType}Attr`][item].type = cType === 'barLine' ? (index === 0 ? 'line' : 'bar') : cType
        })
      }
      this.module.cType = cType
      this.module.mType = mType
    },
    // 判断各个图表可用性--方法待优化
    judgeDisabled () {
      const analysis = this.module.analysis
      for (let key in this.types) {
        let result
        const available = this.types[key].available // 配置的各个图表需要的维度 数值个数
        if (available.exactDatas) {
          if (available.exactDimensions) {
            result = analysis.dimensions.length === available.dimensions && analysis.datas.length === available.datas
          } else {
            result = analysis.dimensions.length >= available.dimensions && analysis.datas.length === available.datas
          }
        } else {
          if (available.exactDimensions) {
            result = analysis.dimensions.length === available.dimensions && analysis.datas.length >= available.datas
          } else {
            result = analysis.dimensions.length >= available.dimensions && analysis.datas.length >= available.datas
          }
        }
        this.$set(this.canuse, key, result)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .module_chart__types {
    position: relative;
    height: 200px;
    border-bottom: 1px solid #E4E7ED;
    > h4 {
      padding-left: 20px;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #e8e8ed;
    }
    .module_chart__types_box {
      padding: 10px;
      .el-button {
        margin: 0 18px 10px 0;
        padding: 2px;
        .svg-icon {
          font-size: 32px;
        }
      }
      .el-button:nth-child(4) {
        margin-right: 0;
      }
      .icon--active {
        background-color: #E4E7ED;
      }
    }
    .module_chart__types_tips {
      position: absolute;
      bottom: 0;
      padding: 10px;
      color: #9aa3b0;
    }
  }
</style>
