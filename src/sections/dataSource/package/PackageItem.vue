<template>
  <section class="datasource_package_item" @click="handleClickPackage(packageItem)">
    <p><i class="el-icon-folder icon"></i><span class="datasource_package_item__source_num">{{packageItem.num}}</span></p>
      <input v-model="packageItem.name" type="text" autofocus="autofocus" class="datasource_package_item__input" v-if='addIndex!== 0 && addIndex === packageItem.id && isAdd' @blur="handleBlurInput"/>
      <p class="datasource_package_item__name" v-else>{{packageItem.name}}</p>
      <!-- 业务包操作 -->
      <section class="datasource_package_item__operation datasource_package_item--display">
        <el-tooltip content="重命名" placement="right">
        <p><span class="el-icon-edit"></span></p></el-tooltip>
        <el-popover placement="right" trigger="hover">
        <p slot="reference"><span class="el-icon-s-operation"></span></p>
        </el-popover>
        <el-tooltip content="删除" placement="right">
        <p @click='handleDelPackage(packageItem)'><span class="el-icon-delete"></span></p></el-tooltip>
        <p><span class="el-icon-warning-outline"></span></p>
      </section>
  </section>
</template>
<script>
export default {
  name: 'package-item',
  props: {
    handleDelPackage: {
      default: () => {},
      type: Function
    },
    handleBlurInput: {
      default: () => {},
      type: Function
    },
    handleClickPackage: {
      default: () => {},
      type: Function
    },
    packageItem: {
      default: () => {
        return {}
      },
      type: Object
    },
    addIndex: {
      default: 0,
      type: Number
    },
    isAdd: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    // 删除业务包
    // delPackage (item) {
    //   this.$emit('del_package', item)
    // }
  }
}
</script>

<style lang="less" scoped>
@ftsize: 14px; // 字体大小
@bgColor:  #f7f8fa; // 色块背景
@ftColor: #a6adb9; //字体颜色
.datasource_package_item{
    width: 150px;
    height: 130px;
    margin-bottom: 15px;
    margin-right: 15px;
    background: @bgColor;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
  .datasource_package_item__source_num{
    position: relative;
    color: #a6adb9;
    margin-left: -20px;
    top: -5px;
  }
    .datasource_package_item__name{
      font-size: @ftsize;
       color: @ftColor;
       margin-top: 20px;
    }
  .icon{
    font-size:48px;
    color:#faaa39;
  }
  .datasource_package_item__input{
    border: none;
    outline: none;
    width: 100%;
    padding: 0 15px;
    margin-top: 20px;
    color: @ftColor;
   font-size: @ftsize;
    background: @bgColor;
  }
  .datasource_package_item__operation{
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
    p{
      margin-top: 5px;
    }
  }
  .datasource_package_item--display{
    display: none;
  }
  }
  .datasource_package_item:hover {
    background: #fff;
    box-shadow: 0px 0px 8px 6px @bgColor;
    .datasource_package_item--display{
    /*display: block;*/
  }
  }
</style>
