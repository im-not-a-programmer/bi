<template>
<section class="directory_view">
  <iframe v-for="(item) in frameList"
          :key="item.id"
          :id="item.id"
          :class="[{'active_iframe': item.id === activeName}]"
          :src="item.iframeUrl"
          scrolling="auto"
          frameborder="0"
          class="directory_view__iframe"></iframe>
  <div v-show="frameList.length < 1" class="directory_view__tip">
    <img src="@/assets/images/dashboard.png">
    <p>请点击左侧列表选择看板</p>
  </div>
</section>
</template>
<script>
export default {
  name: 'directory-view',
  props: {
    frameList: {
      default: null,
      type: Array
    },
    activeName: {
      default: '',
      type: String
    }
  }
}
</script>
<style lang="less" scoped>
  .directory_view{
    height: 100%;
    position: relative;
    .directory_view__iframe{
      width: 100%;
      height: 100%;
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
    }
    .directory_view__tip {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #999;
      p {
        margin-top: 20px;
      }
    }
    .active_iframe {
      z-index: 1000;
    }
  }
</style>
