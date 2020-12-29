<template>
<div>
  <div class="title"><span class="tip"></span>{{title}}</div>
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'index',
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/projectModule/assets/css/basic-color.scss";
  .title{
    padding: 10px;
    background-color: $color-secondary;
    border-radius: 3px;
    margin-bottom: 20px;
    .tip{
      border-left: 3px solid $color-primary;
      padding-right: 10px;
    }
  }

</style>
