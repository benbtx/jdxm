<template>
  <div class="config-search-form">
    <kr-search>
      <kr-search-item label="日志类型:" :labelWidth="80"
        ><el-select v-model="form.logType" placeholder="请选择日志类型">
          <el-option
            v-for="option of logTypeOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option> </el-select
      ></kr-search-item>
      <kr-search-item label="启用状态:" :labelWidth="80"
        ><el-select v-model="form.used" placeholder="请选择启用状态">
          <el-option
            label="启用"
            :value="true"
          ></el-option>
          <el-option
            label="禁用"
            :value="false"
          ></el-option>
          </el-select
      ></kr-search-item>
      <kr-search-item
        ><el-button type="primary" @click="doSearch" icon="el-icon-search"
          >查询</el-button
        ><el-button @click="reset" icon="el-icon-refresh-right">重置</el-button>
      </kr-search-item>
    </kr-search>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      form: {
        logType: '',
        used: ''
      },
      logTypeOptions: [{ value: 'operation', label: '操作日志' },
        { value: 'command', label: '信令日志' },
        { value: 'interface', label: '接口日志' },
        { value: 'external', label: '三方日志' },
        { value: 'system', label: '系统日志' }],
      logLevelOptions: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    doSearch () {
      this.$emit('doSearch', this.form)
    },
    reset () {
      this.form = {
        logType: '',
        datePickerRange: null,
        logLevel: '',
        keyword: ''
      }
      this.doSearch()
    }
  }
}
</script>
<style lang="scss" scoped>
.config-search-form {
  /deep/ {
    .el-input,
    .el-select,
    .el-input__inner {
      width: 100%;
    }
    .kr-search-item__label {
      text-align: right;
    }
  }
}
</style>
