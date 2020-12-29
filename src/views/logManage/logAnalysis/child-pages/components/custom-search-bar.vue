<template>
  <div class="analysis-log-form">
    <kr-search>
      <kr-search-item label="服务平台" :labelWidth="80">
        <el-select v-model="form.authorization" placeholder="请选择服务平台">
          <el-option
            v-for="(log, index) of platformOptions"
            :key="log.value + index"
            :label="log.label"
            :value="log.value"
          ></el-option>
        </el-select>
      </kr-search-item>
      <kr-search-item label="时间:" :labelWidth="80"
        ><el-date-picker
          v-model="form.datePickerRange"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :unlink-panels="true"
        ></el-date-picker
      ></kr-search-item>
    </kr-search>
    <kr-search>
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
import { fetchExternalList } from '@/projectModule/api/logManage/index.js'
import { levelOptions } from './config'
export default {
  components: {},
  props: {},
  data () {
    return {
      form: {
        authorization: '',
        datePickerRange: null,
        msg: ''
      },
      platformOptions: [],
      levelOptions,
      organizationOptions: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.initPlatForm()
  },
  methods: {
    async initPlatForm () {
      const params = {
        pageNum: 1,
        pageSize: 10000
      }
      const result = await fetchExternalList(params)
      const {
        code,
        data: { rows = [] }
      } = result
      if (code === 0) {
        this.platformOptions = rows.map((item) => {
          const { name: label, index: value } = item
          return { label, value }
        })
        this.form.index = this.platformOptions[0].value
      }
    },
    doSearch () {
      const {
        authorization,
        datePickerRange,
        msg
      } = this.form
      if (!this.platformOptions.length) {
        return this.$message.error(
          '未查询到三方平台信息，请先到日志配置中添加三方日志目录！'
        )
      }
      if (!authorization) {
        return this.$message.error('请先选择服务平台！')
      }
      let [startTime = '', endTime = ''] = datePickerRange || []
      startTime = new Date(startTime + ' 00:00:00')
      endTime = new Date(endTime + ' 23:59:59')
      this.$emit('doSearch', {
        authorization,
        msg,
        startTime,
        endTime
      })
    },
    reset () {
      this.form = {
        index: this.platformOptions[0] || '',
        level: '',
        datePickerRange: null,
        organization: '',
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
