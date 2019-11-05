<template>
  <section class="datasource_sidebar">
    <p class='datasource_sidebar--back'><a href="javascript:;" @click="handleBack"><span class="el-icon-back"></span>返回数据列表</a></p>
    <section class="datasource_sidebar__title">
      <h5>业务包</h5>
<!--      <el-button size="mini" type="primary">添加表</el-button>-->
    </section>
<!--    <section class="datasource_sidebar__title">-->
<!--      <p><span class="el-icon-connection icon"></span>更新进度</p>-->
<!--      <p><span class="el-icon-connection icon"></span>业务包更新</p>-->
<!--    </section>-->
    <section class="datasource_sidebar__title">
      <el-input size="mini" style="width: 100%" placeholder="搜索表和字段"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
    </section>
    <ul class="datasource_sidebar__content">
        <li v-for="(item,index) in datasourceList" :key="index" @click="handleClickDatasource(item, index)" :class="[{'datasource_sidebar--selected': index === activeIndex}]">
          <span>{{item.tableName}}</span>
          <el-popover placement="right" trigger="click" class="datasource_sidebar--display">
            <section class="datasource_sidebar__operation">
              <p><span class="el-icon-edit">编辑</span></p>
              <p><span class="el-icon-edit">重命名</span></p>
              <p><span class="el-icon-edit">移动到</span></p>
              <p><span class="el-icon-delete">删除</span></p>
            </section>
        <span slot="reference" class="el-icon-s-operation" @click="handleOperation"></span>
        </el-popover>
        </li>
    </ul>
  </section>
</template>
<script>
export default {
  name: 'data-Side-bar',
  props: {
    datasourceList: {
      default: null,
      type: Array
    },
    handleBack: {
      default: () => {},
      type: Function
    },
    clickDatasource: {
      default: () => {},
      type: Function
    }
  },
  data () {
    return {
      activeIndex: null,
      lastIndex: null
    }
  },
  methods: {
    handleClickDatasource (item, index) {
      this.activeIndex = index
      this.$emit('clickDatasource', item)
    },
    handleOperation (e) {
      e.stopPropagation()
    }
  }
}
</script>
<style lang="less" scoped>
@ftColor: #3685f2;
@pd: 10px;
@ftSize: 14px;
.datasource_sidebar{
  background: #fff;
  padding: @pd;
  text-align: left;
  height: 100%;
  .datasource_sidebar--back{
      font-size: @ftSize;
    a{
      text-decoration: none;
    color: @ftColor;
    }
  }
  .datasource_sidebar__title{
    padding: @pd 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
      font-size: @ftSize;
      .icon{
        font-size: 16px;
       color: @ftColor;
      }
    }
  }
  .datasource_sidebar__content{
    padding: @pd 0;
    li{
      padding: 8px;
      cursor: pointer;
      font-size: @ftSize;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .datasource_sidebar--display{
        display: none;
      }
      &:hover{
        background: rgba(54,133,242,.06);
        color: @ftColor;
        .datasource_sidebar--display{
        display: block;
      }
      }
    }
    .datasource_sidebar--selected{
      background: rgba(54,133,242,.06);
        color: @ftColor;
    }
  }
}
.datasource_sidebar__operation{
  p{
    cursor: pointer;
    padding: 5px;
    &:hover{
      background: rgba(54,133,242,.06);
    }
  }
}
</style>
