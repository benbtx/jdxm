<template>
  <el-select v-model="value" placeholder="请选择" @change="change">
    <el-option
      v-for="item in options"
      :key="item.name"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'fieldSelect',
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    field: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: '',
      type: ''
    }
  },
  mounted () {
    this.value = this.field
  },
  methods: {
    change () {
      this.options.map(value => {
        if (value.name === this.value) {
          this.type = value.type
        }
      })
      this.$emit('handleChange', this.value, this.type)
    }
  }
}
</script>

<style scoped>

</style>
