<style>
  .k-scrollbar {
    overflow: hidden;
    position: relative;
  }
  .k-scrollbar-wrap{
    overflow: scroll;
    height: 100%;
    margin-bottom: -17px;
    margin-right: -17px;
  }
  .k-scrollbar-bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    opacity: 1;
    transition: opacity .12s ease-out;
    width: 6px;
    top: 2px;
  }
  .k-scrollbar-thumb {
    position: relative;
    display: block;
    width: 100%;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: #9092984d;
    transition: background-color .3s;
    height: 2%;
    transform: translateY(0%);
  }
</style>
<template>
  <div class="k-scrollbar">
    <!--onScroll={{this.handleScroll}}-->
    <div class="k-scrollbar-wrap" ref="wrap">
      <div class="k-scrollbar-view">
        <slot></slot>
      </div>
    </div>
    <div class="k-scrollbar-bar">
      <div class="k-scrollbar-thumb" v-bind:style="{height: sizeHeight ,transform:translate}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "YScrollbar",
    data(){
      return{
        sizeHeight:'0',
        sizeWidth: '0',
        moveY:0,
        moveX:0,
        translate:''
      }
    },
    computed:{
      wrap(){
        return this.$refs.wrap;
      }
    },
    methods:{
      handleScroll(){
        const wrap = this.wrap;

        this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
        this.translate = `translateY(${ this.moveY }%)`;
        this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);
      },
      update() {
        let heightPercentage, widthPercentage;
        const wrap = this.wrap;
        if (!wrap) return;
        heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
        widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);
        this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
        this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';
      }
    },
    mounted(){
      const wrap = this.wrap;
      wrap.addEventListener('scroll', this.handleScroll)
      this.$nextTick(this.update);

    }
  }
</script>
