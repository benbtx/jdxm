<template>
<el-col :span="8">
  <div class="search-content">
    <div class="label" :style="'width:'+labelWidth+'px'" v-if="label"><div style="float: right;margin-right:5px ">{{label}}</div></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</el-col>
</template>

<script>
export default {
  name: 'item',
  props: {
    labelWidth: {
      type: Number,
      default: 50
    },
    label: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/projectModule/assets/css/basic-color.scss";
  .search-content{
    display: flex;
    line-height: 50px;
    .content{
      flex: 1;
    }
  }

</style>
