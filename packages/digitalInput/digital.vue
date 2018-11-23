<template>
	<div :class="classes">
		<button type="button" class="k-digital-btn k-digital-left icon-reduce" :disabled="disabled" @click="decrease"></button>
		<input class="k-digital-input" type="text" :name="name" v-model="myvalue" :disabled="disabled">
		<button type="button" class="k-digital-btn k-digital-right icon-add" :disabled="disabled" @click="increase"></button>
	</div>
</template>
<script>
	export default {
		name: 'YDigital',
		props:{
			disabled: { type: Boolean, default: false },
			value:{
				default: 0,
				type: Number,
				validator: val => val >= 0
			},
			mode: { type: String, default: "" },
			step: {
			    default: 1,
				type: Number
			},
			min: {
			    default: 1,
				type: Number
			},
			max: {
			    default: Number.MAX_SAFE_INTEGER,
				type: Number
			},
			name: {
			   type: String
			}
		},
		data(){
			return{
				myvalue:this.value
			}
		},
		watch: {
	    value(val) {
	      this.myvalue = val;
	    }
	  },
		computed:{
			classes() {
				return [
				"k-digital",
				{
					["k-digital-disabled"]: this.disabled,
					[`k-digital-${this.mode}`]: this.mode
				}
				]
			}
		},
		methods:{
			increase(){
				this.myvalue = this.myvalue + this.step
				if (this.myvalue > this.max) {
					this.myvalue = this.max
				}
			},
			decrease(){
			    this.myvalue = this.myvalue - this.step
				if (this.myvalue < this.min) {
					this.myvalue = this.min
				}
			}
		}
	}
</script>

