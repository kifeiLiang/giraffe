<template>
  <div :class="classes">
    <div class="k-card-img">
      <slot name="img"></slot>
    </div>
    <div class="k-card-body">
      <div class="k-card-title">
        <slot name="title"></slot>
        <!-- <slot name="title" v-if="!title"></slot>
        <p v-if="title">{{title}}</p> -->
      </div>
      <div class="k-card-desc">
        <slot name="desc"></slot>
      </div>
      <div class="k-card-date">
        <slot name="date"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'YCard',
    computed: {
      classes() {
        return ['k-card', {
          ['k-card-bordered']: this.bordered
        }]
      }
    }
  }
</script>

