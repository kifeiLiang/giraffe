<template>
  <div class="k-tabs-tabpane" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
import emitter from "../../src/mixins/emitter";
export default {
  name: "YTabpane",
  mixins: [emitter],
  props: {
    name: [String, Number],
    label: [String, Number],
    icon: String,
    disabled: Boolean,
    closable: { type: Boolean, default: true }
  },
  data() {
    return {
      activeName: this.name,
      active: false,
      width: 0 //ie9
    };
  },
  computed: {
    styles() {
      return this.width ? { width: `${this.width}px` } : {};
    }
  },
  mounted() {
    console.log(this)
    console.log("11")
    this.dispatch("YTabs", "tabs-add", this);
  },
  beforeDestroy() {
    this.dispatch("YTabs", "tabs-remove", this);
  }
};
</script>