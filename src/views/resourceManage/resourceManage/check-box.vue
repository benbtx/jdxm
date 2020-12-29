<template>
  <el-checkbox v-model="checked" @change="change" v-if="type==='checkbox'" :disabled="disabled"></el-checkbox>
  <el-radio v-model="radio" label=" " @click.native.prevent="handleClick()" v-else :disabled="true"><span></span></el-radio>
</template>

<script>
export default {
  name: 'checkBox',
  props: {
    check: {
      type: Boolean
    },
    row: {
      type: Object
    },
    type: {
      type: String,
      default: 'checkbox'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: false,
      radio: '',
      disable: false
    }
  },
  created () {
    this.setValue()
  },
  methods: {
    change () {
      this.$emit('handleChange', this.checked)
    },
    handleClick () {
      if (!this.disable) {
        this.radio = this.radio ? '' : ' '
        this.$emit('handleChange', !!this.radio)
      }
    },
    setValue () {
      if (this.type === 'checkbox') {
        this.checked = this.check
      } else {
        if (this.row.type === 'INT' || this.row.type === 'BIGINT' || this.row.type === 'INTEGER') {
          this.radio = this.check ? ' ' : ''
          this.disable = false
        } else {
          this.radio = ''
          this.disable = true
        }
      }
    }
  },
  watch: {
    check () {
      this.setValue()
    },
    row () {
      if (this.type === 'radio') {
        if (this.row.type === 'INT' || this.row.type === 'BIGINT') {
          this.disable = false
        } else {
          this.radio = ''
          this.disable = true
          this.$emit('handleChange', !!this.radio)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
