<template>
  <div class="sir-table">
    <el-table :data="data" :border="border" :height="height" :stripe="stripe" :span-method="spanMethod">
      <slot></slot>
    </el-table>
  </div>
</template>
<script>
export default {
  name:'YTable',
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    border: Boolean,
    height: [String, Number],
    stripe: Boolean,
    spanMethod: Function    
  },
  
}
</script>
<style>
  .el-table{
    color:#666;
  }
 .el-table .el-table__header-wrapper th{
  padding:9px 0 !important;
  background: #f4f4f4;
  color:#333;
  font-size: 16px;
  font-weight:normal;
 }
 .el-table .el-table__header th{
  padding:9px 0 !important;
  background: #f4f4f4;
  color:#333;
  font-size: 16px;
  font-weight:normal;
 }
 .el-table td{
    padding: 8px 0 !important;
 }
 .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
  padding-left:20px;
 }
</style>