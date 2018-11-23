<template>
  <div class="sir-table-column">
    <el-table-column :label="label" :prop="prop" :width="width" :fixed="fixed">
    </el-table-column>
  </div>
</template>
<script>
export default {
  name:'YTableColumn',
  props: {
    label: String,
    prop: String,
    fixed: [Boolean, String],
    width: {}
  },
  data () {
    return {
      showData: []
    }
  },
  methods: {
  },
  mounted () {
    this.showData = this.data
    console.log(this.showData)
  }

}
</script>
<style>
 .el-table__header thead tr{
    background: #eee !important;
  }
</style>