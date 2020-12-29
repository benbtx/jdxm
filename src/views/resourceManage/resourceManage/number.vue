<template>
  <el-input-number v-model="value" controls-position="right" :min="min" :max="max" @change="change" :disabled="row.isSystem?true:disable"></el-input-number>
</template>

<script>
export default {
  name: 'number',
  props: {
    column: {
      type: String
    },
    num: {
      type: [String, Number]
    },
    row: {
      type: Object
    },
    typeOptions: {
      type: Array
    }
  },
  data () {
    return {
      value: '',
      max: 99999999,
      min: 0,
      disable: false
    }
  },
  created () {
    this.value = this.num
    this.setDisable()
  },
  methods: {
    change () {
      var len = this.row.columnTypeLength !== undefined ? 'columnTypeLength' : 'dataLength'
      var sca = this.row.columnTypeScale !== undefined ? 'columnTypeScale' : 'dataScale'
      if (this.column === '精度') {
        if (this.value !== '' && this.row[sca] !== '') {
          if (this.value < this.row[sca]) {
            this.$message.warning('精度不能小于标度')
            this.value = this.row[sca]
          }
        }
      } else if (this.column === '标度') {
        if (this.value !== '') {
          if (this.row[len] === '') {
            this.$message.warning('标度不能大于精度')
            this.value = ''
          } else {
            if (this.value > this.row[len]) {
              this.$message.warning('标度不能大于精度')
              this.value = this.row[len]
            }
          }
        }
      }
      this.$emit('handleChange', this.value)
    },
    handleClick () {
      this.$emit('handleChange', this.value)
    },
    setDisable () {
      var len = this.row.columnTypeLength !== undefined ? 'columnTypeLength' : 'dataLength'
      var sca = this.row.columnTypeScale !== undefined ? 'columnTypeScale' : 'dataScale'
      if (this.row.type) {
        this.typeOptions.map(value => {
          if (value.name === this.row.type) {
            if (this.column === '精度') {
              this.max = value.maxLength === null ? 99999999 : value.maxLength
              this.min = value.minLength === null ? 0 : value.minLength > this.row[sca] ? value.minLength : this.row[sca]
              this.disable = !value.length
            } else if (this.column === '标度') {
              this.max = value.maxScale === null ? 99999999 : value.maxScale > this.row[len] ? this.row[len] : value.maxScale
              this.min = value.minScale === null ? 0 : value.minScale
              this.disable = !value.scale
            }
          }
        })
      }
    }
  },
  watch: {
    num () {
      this.value = this.num
    },
    row () {
      this.setDisable()
    }
  }
}
</script>

<style scoped>

</style>
