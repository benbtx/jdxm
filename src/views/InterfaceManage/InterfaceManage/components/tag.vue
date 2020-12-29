<template>
  <div>
    <el-tag
      :key="tag"
      v-for="tag in list"
      style="margin-right: 5px">
      {{tag}}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: 'tag',
  props: {
    list: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
