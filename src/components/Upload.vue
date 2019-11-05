<template>
  <el-upload
    class="uploader"
    :action="fileServer"
    :show-file-list="false"
    :on-success="handleSuccess"
    :before-upload="beforeUpload">
    <el-button type="primary" icon="el-icon-upload2" plain>上传图片</el-button>
    <img v-if="imageUrl" :src="imageUrl">
    <!--<p class="tip">.jpg/.jpeg/.png</p>-->
  </el-upload>
</template>
<script>

export default {
  name: 'upload',
  data () {
    return {
      fileServer: `${process.env.NODE_ENV === 'production' ? '/node' : ''}/api/uploadFile`,
      imageUrl: null
    }
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    success: {
      type: Function,
      default: () => {}
    }
  },
  watch: {
    url () {
      this.imageUrl = this.url
    }
  },
  created () {
    this.imageUrl = this.url
  },
  methods: {
    // 图片上传成功
    handleSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$emit('success', res.data.url)
    },
    // 上传图片前校验
    beforeUpload (file) {
      const isSuffix = /(.jpg|.jpeg|.png)$/i.test(file.name)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isSuffix) {
        this.$message.error('仅支持jpg、jpeg、png格式的文件')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isSuffix && isLt2M
    }
  }
}
</script>
<style lang="less" scoped>
  .uploader {
    display: inline-block;
    margin-top: -6px;
    /deep/ .el-upload {
      cursor: pointer;
      overflow: hidden;
    }
    .uploader-icon {
      font-size: 22px;
      color: #8c939d;
      width: 26px;
      height: 26px;
      line-height: 26px;
      text-align: center;
    }
    img {
      width: 26px;
      height: 26px;
      vertical-align: top;
      margin-left: 6px;
    }
    /*.tip {
      font-size: 12px;
      color: #8c939d;
      margin-top: 8px;
      text-align: right;
    }*/
  }
</style>
