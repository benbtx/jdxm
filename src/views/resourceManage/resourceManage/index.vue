<template>
<div class="bcgColor box">
  <div class="database"><data-table @getDetail="getDetail"/></div>
  <div class="table"><detail ref="table"/></div>
</div>
</template>

<script>
import dataTable from './data-table.vue'
import detail from './detail.vue'
export default {
  name: 'index',
  components: {
    dataTable,
    detail
  },
  methods: {
    getDetail (schemaName, tableName) {
      this.$refs.table.getColumnInfosByTableName(schemaName, tableName)
    },
    edit (schemaName, tableName) {
      this.$refs.table.getColumn(schemaName, tableName)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/projectModule/assets/css/basic-color.scss";
.box{
  background-color: #fff;
  height: 100%;
  box-sizing: border-box;
  border: solid 1px $color-border;
  padding: 20px;
  display: flex;
  .database{
    width: 300px;
  }
  .table{
    flex: 1;
    padding: 0 0 0 20px;
    overflow: hidden;
  }
}
</style>
