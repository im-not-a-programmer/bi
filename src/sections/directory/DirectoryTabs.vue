<template>
  <section class="directory_tabs">
    <el-tabs type="card" v-model="tabVaule" @tab-remove="handleRemoveTab" @tab-click="handleClickTab">
      <el-tab-pane v-for="(item) in tabsList" :key="item.id" :closable="item.closable" :name="item.id">
        <span slot="label">
          {{item.label}}
          <el-dropdown v-if="item.id !== null" trigger="click" @command="handleCommand($event, item.id)">
            <span><i class="el-icon-arrow-down"></i></span>
            <el-dropdown-menu slot="dropdown" class="directory_tabs__dropdown">
              <el-dropdown-item command="fullscreen"><Icon iconClass='icon_fullscreen' />全屏</el-dropdown-item>
              <el-dropdown-item command="share"><i class="el-icon-share"></i>分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="剪贴板" :visible.sync="dialogVisible" width="30%" custom-class="clip_dialog">
      <el-input placeholder="请输入内容" :value="href" id="input">
        <template slot="append"><i class="el-icon-document-copy pointer" data-clipboard-target="#input" id="copy_btn" @click="clip"></i></template>
      </el-input>
      <p>点击右侧图标复制链接到剪贴板</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
import Icon from '@/components/Icon'
import screenfull from 'screenfull'
import Clipboard from 'clipboard'
import config from '@/config.js'

export default {
  name: 'directory-tabs',
  props: {
    tabsList: {
      default: null,
      type: Array
    },
    checkedTree: {
      default: '',
      type: String
    },
    removeTab: {
      default: () => {},
      type: Function
    },
    clickTab: {
      default: () => {},
      type: Function
    }
  },
  data () {
    return {
      tabVaule: null,
      dialogVisible: false,
      href: ''
    }
  },
  watch: {
    checkedTree (newVal) {
      this.tabVaule = newVal
    }
  },
  components: {
    Icon
  },
  methods: {
    // 删除tab组件
    handleRemoveTab (targetName) {
      this.$emit('removeTab', targetName)
    },
    // 切换tabs标签
    handleClickTab () {
      this.$emit('clickTab', this.tabVaule)
    },
    // 下拉菜单
    handleCommand (command, id) {
      switch (command) {
        case 'fullscreen':
          if (screenfull.enabled) {
            screenfull.request(document.getElementById(id))
          }
          break
        case 'share':
          this.dialogVisible = true
          this.href = `${window.location.origin}${config.base}/preview/${id}`
      }
    },
    clip () {
      const clipboard = new Clipboard('#copy_btn')
      clipboard.on('success', () => {
        this.$message.success('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        this.$message.warning('该浏览器不支持自动复制')
        clipboard.destroy()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.directory_tabs{
  /deep/ .el-tabs {
    margin-top: 9px;
    .el-tabs__header {
      margin: 0;
      border: 0;
    }
    .el-tabs__item {
      height: 30px;
      line-height: 30px;
    }
  }
}
.directory_tabs__dropdown {
  padding: 10px 0;
  li {
    font-size: 14px;
  }
  .svg-icon {
    margin-right: 4px;
  }
}
.clip_dialog {
  text-align: left;
  .el-icon-document-copy {
    font-size: 16px;
  }
  p {
    margin-top: 10px;
  }
}
</style>
