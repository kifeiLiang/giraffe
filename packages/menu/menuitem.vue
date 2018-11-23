<template>
  <li :class="classes" @click.stop="handle">
    <slot></slot>
    <slot name="title"></slot>
  </li>
</template>
<script>
import emitter from 'yt-ui/src/mixins/emitter'
export default {
  name: "YMenuItem",
  mixins: [emitter],
  props: {
    name: { type: String, required: true }
  },
  data() {
    return {
      active: false,
      // index:0,
    };
  },
  computed: {
    classes() {
      return [
        "k-menu-item",
        {
          ["k-menu-item-active"]: this.active
        }
      ];
    }
  },
  beforDistory() { },
  mounted() {
    this.active = this.getParent('YMenu').activeName == this.name
    this.$on('menu-item-update', this.update)
  },
  methods: {
    update(name) {
      this.active = this.name == name
    },
    handle() {
      this.active = true
      this.dispatch('YMenu', 'menu-select', this.name)
      this.dispatch('YSubMenu', 'menu-submenu-close', this.name)
    }
  }
};
</script>
