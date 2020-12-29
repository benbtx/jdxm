<template>
  <div class="box">
    <el-row :gutter="40" >
      <slot :labelWidth="labelWidth"></slot>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    labelWidth: {
      type: Number,
      default: 50
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/projectModule/assets/css/basic-color.scss";
.box{
  background-color: $color-secondary;
  padding: 10px;
}

</style>
