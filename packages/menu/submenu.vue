<template>
  <li :class="classes" @mouseover="openMenu" @mouseout="closeMenu">
    <div class="k-menu-title" @click.stop="accordion">
      <slot name="title"></slot>
      <i class="icon-arrow_down_small icon-arrow"></i>
    </div>
    <Collapse>
      <ul class="k-menu-dropdown" v-show="visible">
        <slot></slot>
      </ul>
    </Collapse>
  </li>
</template>
<script>
import Collapse from '../collapse/collapse.js'
import emitter from '../src/mixins/emitter'
export default {
  name: "YSubMenu",
  mixins: [emitter],
  components: { Collapse },
  props: {
    name: { type: String, required: true }
  },
  data() {
    return {
      active: false,
      visible: false,
      height: 0,
      hideTime: null,
      rootMenu: this.getParent("YMenu"),
    };
  },
  computed: {
    classes() {
      return [
        "k-menu-submenu",
        {
          ["k-menu-item-active"]: this.active,
          ["k-menu-item-opened"]: this.visible
        }
      ];
    },
  },
  mounted() {
    this.visible = this.rootMenu.openIndex == this.name && this.rootMenu.mode != 'horizontal'
    this.$on('menu-submenu-update', this.update)
    this.$on('menu-submenu-close', this.close)
  },
  methods: {
    close() {
      if (this.rootMenu.mode == "vertical") return;
      this.visible = false;
      let childs = this.getChilds(this, 'YMenuItem')
      this.active = childs.filter(c => c.active).length > 0
    },
    update(name) {
      if (name != this.name && this.visible) {
        //其他的折叠
        this.visible = !this.visible
      }
    },
    accordion() {
      this.visible = !this.visible
      this.dispatch('YMenu', 'menu-accordion', this.name)
    },
    openMenu() {
      if (this.rootMenu.mode == "vertical") return;
      this.$nextTick(() => this.visible = true)
    },
    closeMenu() {
      if (this.rootMenu.mode == "vertical") return;
      this.$nextTick(() => this.visible = false)
    }
  }
};
</script>
