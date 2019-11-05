<template>
  <section class="datasource_package">
    <!-- 添加业务包 -->
<!--     <section class="datasource_package_item" @click="handleAddPackage">-->
<!--      <p><i class="el-icon-folder-add icon"></i></p>-->
<!--      <p class="datasource_package__name">添加业务包</p>-->
<!--    </section>-->
    <!-- 已有业务包 -->
    <section v-for="(item,index) in packageList" :key="index">
      <PackageItem :handleDelPackage="handleDelPackage"
                   :handleBlurInput="handleBlurInput"
                   :handleClickPackage="handleClickPackage"
                   :packageItem="item"
                   :addIndex="addIndex"
                   :isAdd="isAdd"/>
    </section>
  </section>
</template>
<script>
import PackageItem from './PackageItem'
export default {
  name: 'package-list',
  props: {
    packageList: {
      default: null,
      type: Array
    },
    addPackage: {
      default: () => {},
      type: Function
    },
    delPackage: {
      default: () => {},
      type: Function
    },
    clickPackageItem: {
      default: () => {},
      type: Function
    }
  },
  components: {
    PackageItem
  },
  data () {
    return {
      addIndex: 0,
      isAdd: true
    }
  },
  methods: {
    // 添加业务包
    handleAddPackage () {
      this.isAdd = true
      this.addIndex += 1
      this.$emit('addPackage')
    },
    // 修改业务包名称
    handleBlurInput () {
      this.isAdd = false
    },
    // 删除业务包
    handleDelPackage (item) {
      this.$emit('delPackage', item)
    },
    // 跳转到数据表
    handleClickPackage (item) {
      this.$emit('clickPackage', item)
    }
  }
}
</script>
<style lang="less" scoped>
@ftsize: 14px; // 字体大小
@bgColor:  #f7f8fa; // 色块背景
@ftColor: #a6adb9; //字体颜色
.datasource_package{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: calc(100% - 70px);
  background: #fff;
  padding: 15px;
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
    .datasource_package__name{
      font-size: @ftsize;
       color: @ftColor;
       margin-top: 20px;
    }
  .icon{
    font-size:48px;
    color: @ftColor;
  }
  }
  .datasource_package_item:hover {
    background: #fff;
    box-shadow: 0px 0px 8px 6px @bgColor;
  }
}
</style>
