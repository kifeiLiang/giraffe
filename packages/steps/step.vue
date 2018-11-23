
<template>
  <div :class="classes" :style="styles">
    <div class="k-step-head">
      <div class="k-step-tail">
        <i></i>
      </div>
      <div class="k-step-icon">
        <Icon :type="icon" v-if="icon"></Icon>
        <div class="k-step-icon-inner" v-if="!icon">
          <span v-if="state!='finish' && !icon && state!='error'">{{step}}</span>
          <Icon type="icon-success" v-if="!icon && state=='finish'" />
          <Icon type="icon-failure" v-if="!icon && state=='error'" />
        </div>
      </div>
    </div>

    <div class="k-step-main">
      <div class="k-step-title">{{title}}</div>
      <div class="k-step-description">{{description}}</div>
    </div>
  </div>
</template>
<script>
  import Icon from '../icon'
  import emitter from '../../src/mixins/emitter'
  export default {
    name: 'YStep',
    components: { Icon },
    mixins: [emitter],
    props: {
      title: String,
      description: String,
      status: {
        validator: (v) => {
          return ['wait', 'process', 'finish', 'error'].indexOf(v) >= 0
        },
        default: 'wait'
      },
      icon: String
    },
    data() {
      return {
        width: 0,
        step: 0,
        state: this.status
      }
    },
    computed: {
      styles() {
        return this.width > 0 ? { width: `${this.width}%` } : {}
      },
      classes() {
        return ['k-step-item', {
          [`k-steps-${this.state}`]: this.state
        }]
      }
    },
    mounted() {
      this.dispatch('YSteps', 'steps-add', this)
    },
    beforeDestory() {
      this.dispatch('YStep', 'steps-remove', this)
    }
  }
</script>
