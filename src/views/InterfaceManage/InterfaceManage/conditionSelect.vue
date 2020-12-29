<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'conditionSelect',
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
          value: '!=',
          label: '!=',
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
          exclude: []
        },
        {
          value: 'LIKE',
          label: 'LIKE',
          exclude: ['DATE', 'TIME', 'TIMESTAMP']
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
