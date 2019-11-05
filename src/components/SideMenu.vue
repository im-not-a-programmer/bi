<template>
  <section class="side_bar">
    <div class="logo"><p>DBC</p></div>
    <el-menu
      class="side_menu"
      :router="true"
      :default-active="getActive()"
      background-color="#2E3381"
      text-color="rgba(255,255,255,0.6)"
      active-text-color="#fff">
      <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
        <Icon :iconClass="item.menuIcon" />
        <p slot="title">{{item.name}}</p>
      </el-menu-item>
    </el-menu>
  </section>
</template>
<script>
import Icon from '@/components/Icon'

export default {
  name: 'side-menu',
  data () {
    return {
      menuList: [
        {
          name: '看板目录',
          menuIcon: 'icon_publish',
          path: '/directory'
        },
        {
          name: '看板自定义',
          menuIcon: 'icon_custom_board',
          path: '/dashboard'
        },
        {
          name: '数据源',
          menuIcon: 'icon_data_source',
          path: '/dataSource'
        }
      ]
    }
  },
  components: {
    Icon
  },
  methods: {
    getActive () {
      const p = this.$route.path
      return p === '/' ? '/directory' : p
    }
  }
}
</script>
<style lang="less" scoped>
  .side_bar {
    height: 100%;
    display: flex;
    flex-direction: column;
    .logo {
      background-color: #2E3381;
      width: 73px;
      padding: 26px 0;
      p {
        font-size: 24px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        background: linear-gradient(0deg,rgba(10,255,154,1) 0%, rgba(60,207,255,1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .side_menu {
      flex: 1;
      li {
        height: 110px;
        padding: 10px 0 !important;
        .svg-icon {
          font-size: 32px;
        }
        p {
          line-height: 0;
          font-size: 12px;
        }
      }
      .is-active:before {
        content: "";
        display: block;
        width: 3px;
        height: 50px;
        background-color: #12C39B;
        position: absolute;
        left: 0;
        top: 21px;
      }
      li:hover{
        i, p {
          color: #fff;
        }
      }
    }
  }
</style>
