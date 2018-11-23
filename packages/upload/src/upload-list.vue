<template>
  <transition-group
    tag="ul"
    :class="[
      'k-upload-list',
      'k-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="k-list"
  >
    <li
      v-for="file in files"
      :class="['k-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '']"
      :key="file.uid"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <!--<img
        class="k-upload-list__item-thumbnail"
        v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"
        :src="file.url" alt=""
      >-->
      <a class="k-upload-list__item-name" @click="handleClick(file)">
        <i class="icon-huixingzhen"></i>
        <div class="k-upload-list__item-wrap">
          {{file.name}}
          <div v-if="file.status=='success'">
            <span class="k-upload-list__item-thumbnail">
              <div class="tri-up">
                  <span></span>
              </div>
              <img class="k-upload-list__item-pic" :src="file.url" />
            </span>
          </div>
        </div>
      </a>
      <label class="k-upload-list__item-status-label" v-if="file.status=='success'">
        <i :class="{
          'icon-info_success': true
        }"></i>
      </label>

      <label class="k-upload-list__item-status-label k-upload-list__item-status-error" v-else>
        <i class="red-tip">上传失败</i>
        <a href="javascript:;"  @click="$emit('retry', file)">重试</a>
      </label>
      <i class="icon-close" v-if="!disabled&&file.status=='success'" @click="$emit('remove', file)"></i>
       <!--<i class="icon-close-tip" v-if="!disabled">{{ t('el.upload.deleteTip') }}</i>因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上
          'icon-circle-check': listType === 'text',
          'icon-check': ['picture-card', 'picture'].indexOf(listType) > -1-->
      <y-progress
        v-if="file.status === 'uploading'"
        :percent="parsePercentage(file.percentage)">
      </y-progress>
      <!--<span class="k-upload-list__item-actions" v-if="listType === 'picture-card'">
        <span
          class="k-upload-list__item-preview"
          v-if="handlePreview && listType === 'picture-card'"
          @click="handlePreview(file)"
        >
          <i class="icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="k-upload-list__item-delete"
          @click="$emit('remove', file)"
        >
          <i class="icon-delete"></i>
        </span>
      </span>-->
    </li>
  </transition-group>
</template>
<script>
  import Locale from '../../../src/mixins/locale';
  import YProgress from '../../progress';

  export default {

    name: 'YUploadList',

    mixins: [Locale],

    data() {
      return {
        focusing: false
      };
    },
    components: { YProgress },

    props: {
      files: {
        type: Array,
        default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      handlePreview: Function,
      listType: String
    },
    methods: {
      parsePercentage(val) {
        return parseInt(val, 10);
      },
      handleClick(file) {
        this.handlePreview && this.handlePreview(file);
      }
    }
  };
</script>
