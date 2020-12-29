<template>
  <el-select v-model="value" filterable  @change="typeChange" :disabled="row.isSystem?true:false">
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
  name: 'selectOptions',
  props: {
    type: {
      type: String
    },
    row: {
      type: Object
    },
    options: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.value = this.type
  },
  methods: {
    typeChange () {
      this.$emit('handleChangeType', this.value)
    }
  },
  watch: {
    type () {
      this.value = this.type
    }
  }
}
</script>

<style scoped>

</style>
