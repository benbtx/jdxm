<template>
  <div class="analysis-log-form">
    <kr-search>
      <kr-search-item label="日志级别:" :labelWidth="80"
        ><el-select v-model="form.level" placeholder="请选择日志级别">
          <el-option
            v-for="option of levelOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option> </el-select
      ></kr-search-item>
      <kr-search-item label="操作类型:" :labelWidth="80"
        ><el-select v-model="form.operationType" placeholder="请选择操作类型">
          <el-option
            v-for="option of operationTypeOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select> </kr-search-item
      ><kr-search-item label="时间:" :labelWidth="80"
        ><el-date-picker
          v-model="form.datePickerRange"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :unlink-panels="true"
        ></el-date-picker
      ></kr-search-item> </kr-search
    ><kr-search>
      <kr-search-item label="用户单位:" :labelWidth="80"
        ><el-select v-model="form.organization" placeholder="请选择用户单位">
          <el-option
            v-for="option of organizationOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option></el-select
      ></kr-search-item>
      <kr-search-item label="全文检索:" :labelWidth="80"
        ><el-input v-model="form.msg" placeholder="请输入关键词"></el-input
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
import { levelOptions, operationTypeOptions } from './config'
export default {
  components: {},
  props: {},
  data () {
    return {
      form: {
        level: '',
        datePickerRange: null,
        organization: '',
        msg: '',
        operationType: ''
      },
      levelOptions,
      operationTypeOptions,
      organizationOptions: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    doSearch () {
      const { level, datePickerRange, organization, msg, operationType } = this.form
      let [startTime = '', endTime = ''] = datePickerRange || []
      startTime = new Date(startTime + ' 00:00:00')
      endTime = new Date(endTime + ' 23:59:59')
      this.$emit('doSearch', {
        level,
        organization,
        msg,
        startTime,
        endTime,
        operationType
      })
    },
    reset () {
      this.form = {
        level: '',
        datePickerRange: null,
        organization: '',
        operationType: '',
        msg: ''
      }
      this.doSearch()
    }
  }
}
</script>
<style lang="scss" scoped>
.analysis-log-form {
  /deep/ {
    .el-input,
    .el-select,
    .el-input__inner {
      width: 100%;
    }
    .kr-search-item__label {
      text-align: right;
    }
        .box{
      padding-top: 0;
    }
    .box:first-child{
      padding-top: 10px;
      padding-bottom: 0;
    }
  }
}
</style>
