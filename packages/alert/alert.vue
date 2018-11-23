<template>
  <transition name="dropdown" v-if="!closed">
    <div :class="classes">
      <Icon :type="icon" v-if="showIcon" />
      <a class="k-alert-close" v-if="closable" @click="close"></a>
      <span v-if="title">{{ title }}</span>
      <slot>
        <p class="k-desc" v-if="description">{{description}}</p>
      </slot>
    </div>
  </transition>
</template>
<script>
import Icon from "../icon";
export default {
  components: { Icon },
  name: "YAlert",
  props: {
    type: { type: String, default: "warning" },
    closable: Boolean,
    showIcon: Boolean,
    title: {
      type: String,
      default: '',
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      closed: false
    };
  },
  computed: {
    icon() {
      let icons = {
        info: "icon-info_normal",
        error: "icon-info_danger",
        success: "icon-info_success",
        warning: "icon-info_warn"
      };
      return icons[this.type];
    },
    classes() {
      return [
        "k-alert",
        {
          [`k-alert-${this.type}`]: this.type
        }
      ];
    }
  },
  methods: {
    close() {
      this.closed = true;
      this.$emit("close");
    }
  }
};
</script>
