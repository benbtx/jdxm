<template>
  <div>
    <el-time-picker
      @change="change"
      style="width: 100%"
      v-if="row.fieldType==='TIME'"
      v-model="value"
      placeholder="">
    </el-time-picker>
    <el-date-picker
      style="width: 100%"
      @change="change"
      v-else-if="row.fieldType==='DATE'"
      v-model="value"
      type="date"
      placeholder="">
    </el-date-picker>
    <el-date-picker
      style="width: 100%"
      @change="change"
      v-else-if="row.fieldType==='TIMESTAMP'"
      v-model="value"
      type="datetime"
      placeholder="">
    </el-date-picker>
    <el-input v-else v-model="value" placeholder="请输入内容" @change="change"></el-input>
  </div>

</template>

<script>
export default {
  name: 'contentValue',
  props: {
    row: {
      type: Object
    }
  },
  data () {
    return {
      value: ''
    }
  },
  mounted () {
    this.value = this.row.value
  },
  methods: {
    change () {
      this.$emit('handleChange', this.value)
    }
  },
  watch: {
    row () {
      console.log(this.row)
      this.value = this.row.value
    }
  }
}
</script>

<style scoped>

</style>
