<template>
  <div class="directory_sidebar">
    <h3>看板</h3>
    <el-tree
      ref="tree"
      accordion
      node-key="id"
      class="directory_sidebar__tree"
      empty-text="暂无已发布看板"
      :data="data"
      :props="defaultProps"
      :highlight-current="true"
      :render-content="renderContent"
      @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<script>
/* eslint-disable */
import Icon from '@/components/Icon'

export default {
  name: 'directory-sidebar',
  props: {
    data: {
      type: Array,
      default: null
    },
    clickNode: {
      default: () => {},
      type: Function
    }
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  components: {
    Icon
  },
  methods: {
    handleNodeClick (data) {
      this.$emit('clickNode', data)
    },
    renderContent (h, { node, data, store }) {
      return (
        // eslint-disable-next-line
        <span class="custom-tree-node">
          <Icon iconClass="icon_board" />
          <span style="margin-left:5px;">{node.label}</span>
        </span>
      )
    }
  }
}
</script>
<style lang="less" scoped>
.directory_sidebar{
  h3 {
    font-size: 16px;
    text-align: left;
    height: 40px;
    line-height: 40px;
    text-indent: 20px;
  }
  .directory_sidebar__tree {
    padding: 0 2px;
    font-size: 14px;
    color: #40424C;
    /deep/ .el-tree-node {
      .el-tree-node__content {
        height: 42px;
        line-height: 42px;
        svg {
          margin: 0 6px 0 20px;
        }
      }
      .el-tree-node__expand-icon.is-leaf {
        display: none;
      }
    }
    /deep/ .is-current>.el-tree-node__content{
      background: rgba(243,243,248,1);
      border-radius: 4px;
    }
  }
}
</style>
