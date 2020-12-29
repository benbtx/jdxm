<template>
  <el-checkbox v-model="checked" @change="change" :disabled="disabled"></el-checkbox>
</template>

<script>
export default {
  name: 'checkBox',
  props: {
    check: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: false,
      disable: false
    }
  },
  mounted () {
    this.checked = this.check
    console.log(this.check)
  },
  methods: {
    change () {
      this.$emit('handleChange', this.checked)
    }
  },
  watch: {
  }
}
</script>

<style scoped>

</style>
