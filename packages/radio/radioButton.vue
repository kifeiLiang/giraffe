<template>
  <Button :type="actived?'default':'gray'" :disabled="disabled" :mini="mini" @click="click">
    <slot>{{label}}</slot>
  </Button>
</template>
<script>
import {Button}from '../button'
import emitter from 'yt-ui/src/mixins/emitter'
export default {
  name: 'YRadioButton',
  components: { Button },
  mixins: [emitter],
  props: {
    label: String,
  },
  data() {
    return {
      disabled: false,
      mini: false,
      actived: false
    }
  },
  methods: {
    click() {
      !this.selected && this.dispatch('YRadioGroup', 'radio-group-change', {
        value: this.label,
      })
    }
  }
}
</script>
