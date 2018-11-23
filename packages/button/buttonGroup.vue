<template>
   <div :class="['k-btn-group',mini?'k-btn-group-mini':'',circle?'k-btn-group-circle':'']">
      <slot></slot>
   </div>
</template>
<script>
export default {
  name: "YButtonGroup",
  props: {
    mini: Boolean,
    circle: Boolean
  },
  data() {
    return {};
  }
};
</script>

