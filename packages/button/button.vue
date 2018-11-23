
<template>
  <button :type="buttonType" :class="classes" :disabled="disabled" @click="click">
    <i :class="icon" v-if="icon"></i>
    <span><slot></slot></span>
  </button>
</template>
<script>
export default {
  name: "YButton",
  props: {
    buttonType: {
      default: "button",
      validator(value) {
        return ["button", "submit", "reset"].indexOf(value) >= 0;
      }
    },
    icon: String,
    type: {
      default: "default",
      validator(value) {
        return (
          [
            "danger",
            "gray",
            "link",
            "default",
            "plain"
          ].indexOf(value) >= 0
        );
      }
    },
    disabled: Boolean,
    medium: { type: Boolean, default: false },
    mini: { type: Boolean, default: false },
    large: { type: Boolean, default: false }
  },
  computed:{
    classes(){
      return [
        "k-button",
        {
          [`k-button-${this.type}`]: !!this.type,
          ["is-mini"]: !!this.mini,
          ["is-medium"]: !!this.medium,
          ["is-large"]: !!this.large
        }
      ];
    }
  },
  methods:{
    click(e){
      this.$emit('click',e)
    }
  }
};
</script>
