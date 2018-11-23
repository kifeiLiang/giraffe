<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
import { oneOf } from '../../src/utils/assist';
export default {
  name: "YRow",
  props: {
    gutter: {
      type: [Number, String],
      default: 0
    },
    type: {
      validator(value) {
        return oneOf(value, ['flex']);
      }
    },
    align: {
      validator (value) {
        return oneOf(value, ['top', 'middle', 'bottom']);
      }
    },
    justify: {
      validator (value) {
        return oneOf(value, ['start', 'end', 'center', 'space-around', 'space-between']);
      }
    },
  },
  data() {
    return {};
  },
  computed: {
    classes(){
      return[
      {
        [`k-row`]: !this.type,
        [`k-row-${this.type}`]: !!this.type,
        [`k-row-${this.type}-${this.align}`]: !!this.align,
        [`k-row-${this.type}-${this.justify}`]: !!this.justify
      }] 
    },
    styles() {
      let style = {};
      if (this.gutter !== 0) {
        style = {
          marginLeft: this.gutter / -2 + "px",
          marginRight: this.gutter / -2 + "px"
        };
      }
      return style;
    }
  }
};
</script>

