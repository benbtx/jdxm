<template>
  <el-select v-model="value" placeholder="请选择" @change="change">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'conditionSelect',
  props: {
    row: {
      type: Object
    }
  },
  data () {
    return {
      value: '',
      options: [
        {
          value: '=',
          label: '=',
          exclude: []
        },
        {
          value: '<>',
          label: '<>',
          exclude: []
        },
        {
          value: '<',
          label: '<',
          exclude: []
        },
        {
          value: '<=',
          label: '<=',
          exclude: []
        },
        {
          value: '>',
          label: '>',
          exclude: []
        },
        {
          value: '>=',
          label: '>=',
          exclude: []
        },
        {
          value: 'IN',
          label: 'IN',
          exclude: ['DATE', 'TIM', 'TIMESTAMP']
        },
        {
          value: 'LIKE',
          label: 'LIKE',
          exclude: ['DATE', 'TIME', 'TIMESTAMP']
        }
      ],
      options1: []
    }
  },
  mounted () {
    this.value = this.row.operator
    this.setOptions()
  },
  methods: {
    change () {
      this.$emit('handleChange', this.value)
    },
    setOptions () {
      this.options1 = []
      if (this.row.fieldType) {
        var isHave = false
        this.options.map(value => {
          if (value.exclude.findIndex(v => v === this.row.fieldType) === -1) {
            if (value.value === this.value) {
              isHave = true
            }
            this.options1.push(value)
          }
        })
        if (!isHave) {
          this.value = ''
          this.change()
        }
      }
    }
  },
  watch: {
    row () {
      this.setOptions()
    }
  }
}
</script>

<style scoped>

</style>
