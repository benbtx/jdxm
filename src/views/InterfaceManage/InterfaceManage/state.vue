<template>
  <el-switch
    v-model="value"
    active-color="#007CFF"
    inactive-color="#ff4949"
    active-text="启用"
    @change="change"
    inactive-text="禁用">
  </el-switch>
</template>

<script>
export default {
  name: 'state',
  props: {
    state: {
      type: Number
    }
  },
  data () {
    return {
      value: true
    }
  },
  mounted () {
    if (this.state === 1) {
      this.value = true
    } else if (this.state === 2) {
      this.value = false
    } else {
      this.value = true
    }
  },
  methods: {
    change () {
      this.$emit('handleChange', this.value === true ? 1 : 2)
    }
  }
}
</script>

<style scoped>

</style>
