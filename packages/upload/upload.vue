<template>
  <div class="k-upload">
    <el-upload
      :class="classes"
      :action="action"
      :headers="headers"
      :data="data"
      :multiple="multiple"
      :name="name"
      :drag="drag"
      :dragger="dragger"
      :with-credentials="withCredentials"
      :show-file-list="showFileList"
      :accept="accept"
      :type="type"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :on-remove="onRemove"
      :on-change="onChange"
      :on-preview="onPreview"
      :on-success="onSuccess"
      :on-progress="onProgress"
      :on-error="onError"
      :file-list="fileList"
      :auto-upload="autoUpload"
      :http-request="httpRequest
      "
      :disabled="disabled"
      :limit="limit"
      :on-exceed="onExceed">
      <slot></slot>
      <slot name="tip"></slot>
    </el-upload>
  </div>
</template>
<script>
function noop() {}
export default {
  name:'YUpload',
  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default() {
        return {};
      }
    },
    data: Object,
    multiple: Boolean,
    name: {
      type: String,
      default: 'file'
    },
    drag: Boolean,
    dragger: Boolean,
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true
    },
    accept: String,
    type: {
      type: String,
      default: 'select'
    },
    beforeUpload: Function,
    beforeRemove: Function,
    onRemove: {
      type: Function,
      default: noop
    },
    onChange: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'text' // text,picture,picture-card
    },
    httpRequest: Function,
    disabled: Boolean,
    limit: Number,
    onExceed: {
      type: Function,
      default: noop
    }
  },
  computed:{
    classes(){
      return [
        "el-upload",
        {
          [`el-upload--${this.listType}`]: !!this.listType
        }
      ]
    }
  }
}
</script>
<style>
  .el-upload__tip{ color: #999; }
</style>