<template>
  <el-input v-model="value" @change="handleChange" :disabled="row.isSystem?true:false" :placeholder="placeholder"></el-input>
</template>

<script>
export default {
  name: 'input-box',
  props: {
    input: {
      type: String
    },
    row: {
      type: Object
    },
    isUpperCase: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    }
  },
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.value = this.input
  },
  methods: {
    handleChange () {
      this.$emit('handleChange', this.value)
    }
  },
  watch: {
    input () {
      this.value = this.input
    },
    value () {
      if (this.isUpperCase) {
        this.value = this.value.toUpperCase()
      }
    }
  }
}
</script>

<style scoped>

</style>
