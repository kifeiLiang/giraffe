<template>
  <div class="k-checkbox-group">
    <slot></slot>
  </div>
</template>
<script>
import emitter from "../../src/mixins/emitter";
export default {
  name: "YCheckboxGroup",
  mixins: [emitter],
  props: {
    value: { type: Array, default: () => [] },
  },
  data() {
    return {
      childrens: []
    };
  },
  watch: {
    value(v) {
      this.update();
    },
  },
  mounted() {
    this.update();
    this.$on('checkbox-group-update', this.update)
    this.$on('checkbox-group-change', this.change)
  },
  methods: {
    update() {
      this.broadcast('YCheckbox', 'checkbox-update', {
        value: this.value,
        group: true,
      })
    },
    change(data) {
      let length = this.value.indexOf(data.value);
      if (data.checked && length < 0) {
        this.value.push(data.value);
      } else {
        this.value.splice(length, 1);
      }
      this.$emit("input", this.value);
      this.$emit("change", this.value);
      this.dispatch('FormItem', 'form-item-change', { field: this.value })
    }
  }
};
</script>
