<template>
<div class="title">
  <div style="height: 32px">
    <span class="name">{{title}}</span>
    <div class="button"><slot></slot></div>
  </div>

</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  name: 'boxTitle'
}
</script>

<style scoped lang="scss">
  @import "@/projectModule/assets/css/basic-color.scss";
.title{
  padding: 10px 10px 10px 24px;
  box-sizing: border-box;
  border-bottom: 1px solid $color-border;
  .name{
    font-weight: 600;
    font-style: normal;
    font-size: 16px;
    color: #000000;
    line-height: 32px;
  }
  .button{
    display: inline-block;
    float: right;
  }
}
</style>
