<template>
  <div class="bcgColor box">
    <div class="database"><catalog @getDetail="getDetail"/></div>
    <div class="table"><detail ref="table"/></div>
  </div>
</template>

<script>
import catalog from './catalog.vue'
import detail from './detail.vue'
export default {
  name: 'index',
  components: {
    catalog,
    detail
  },
  methods: {
    getDetail (id, name) {
      this.$refs.table.getList(id, name)
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
      padding: 0 0px 0 20px;
      overflow: hidden;
    }
  }
</style>
