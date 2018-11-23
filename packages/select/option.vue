<template>
  <li :class="itemClasses" @click.stop="select" v-show="visible">
    <slot>{{label}}</slot>
  </li>
</template>
<script>
import emitter from '../../src/mixins/emitter'
export default {
  name: "YOption",
  mixins: [emitter],
  props: {
    value: { type: [String, Number], required: true },
    label: { type: [String, Number] },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      selected: false,
      index: 0,
      visible: true
    };
  },
  computed: {
    itemClasses() {
      return [
        "k-select-item",
        {
          ["k-select-item-selected"]: this.selected,
          ["k-select-item-disabled"]: this.disabled
        }
      ];
    }
  },
  methods: {
    select() {
      if (this.disabled) return;
      this.selected = true
      this.dispatch('YSelect', 'select-change', {
        value: this.value,
        label: this.label === undefined ? this.$el.innerHTML : this.label
      })
    },
    query(query) {
      // query 转义查询里面的正则
      let label = this.label === undefined ? this.$el.innerHTML : this.label
      let parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, "\\$1");
      this.visible = new RegExp(parsedQuery, "i").test(label);
    }
  },
  mounted() {
    this.dispatch('YSelect', 'select-add', this)
  },
  beforeDestroy() {
    this.dispatch('YSelect', 'select-remove', this)
  }
};
</script>

