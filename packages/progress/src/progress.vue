
<template>
  <div class="progress">
    <div class="progress_outer">
      <div class="progress_in" :style="{width: strokeWidth}"></div>
    </div>
    <div class="percent" v-show="status">
      <span>{{percent}}</span>%
    </div>

  </div>
</template>
<script>
export default {
  name: "YProgress",
  props: {
    percent:{
      type:Number,
      default:0,
      required:true,
      validator: val => val >= 0 && val <= 100
    },
    status:{
      type:Boolean,
      default:true
    }
    
  },
  computed: {
    strokeWidth(){
      return this.percent+'%'
    }
  },
 
};
</script>

