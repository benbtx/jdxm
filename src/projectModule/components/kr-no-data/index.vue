<template>
  <div class="noData">
    <p class="flex-column">
      <img :src="img" alt="" />
      <span class="text">{{ text }}</span>
    </p>
  </div>
</template>

<script>
import img from './no-data.png'
export default {
  props: {
    text: {
      type: String,
      default: '暂无数据！'
    }
  },
  data () {
    return {
      img
    }
  }
}
</script>
<style lang="scss" scoped>
.noData {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .text {
    font-size: 24px;
    color: #ccc;
  }
}
</style>
