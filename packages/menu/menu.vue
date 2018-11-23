<template>
  <ul :class="classes" :style="styles">
    <slot></slot>
  </ul>
</template>
<script>
import emitter from '../../src/mixins/emitter'
export default {
  name: "YMenu",
  mixins: [emitter],
  props: {
    theme: { type: String, default: "light" },
    mode: { type: String, default: "vertical" },
    activeName: String,
    openName: String,
    accordion: Boolean,
    width: { type: [Number, String], default: 198 }
  },
  data() {
    return {
      activeIndex: this.activeName,
      openIndex: this.openName,
      items: [],
      submenus: []
    };
  },
  watch: {
    activeIndex(name) {
      this.broadcast('YMenuItem', 'menu-item-update', name)
      this.broadcast('YSubMenu', 'menu-submenu-close', name)
    },
    openIndex(name) {
      console.log(name)
      this.broadcast('YSubMenu', 'menu-submenu-update', name)
    }
  },
  computed: {
    classes() {
      return [
        "k-menu",
        {
          [`k-menu-${this.theme}`]: this.theme,
          [`k-menu-${this.mode}`]: this.mode
        }
      ];
    },
    styles() {
      return this.mode == "vertical" ? { width: this.width > 0 ? `${this.width}px` : this.width } : {};
    }
  },
  methods: {
    setAccordion(name) {
      this.openIndex = name
      if (this.accordion) {
        this.broadcast('YSubMenu', 'menu-submenu-update', name)
      }
    },
    itemSelect(name) {
      this.activeIndex = name;
      this.$emit("select", name);
    }
  },
  mounted() {
    this.$on('menu-select', this.itemSelect)
    this.$on('menu-accordion', this.setAccordion)
  }
};
</script>
