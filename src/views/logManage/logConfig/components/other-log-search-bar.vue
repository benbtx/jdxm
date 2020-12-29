<template>
  <div class="other-log-search-form">
    <kr-search>
      <kr-search-item label="平台名称:" :labelWidth="80"
        ><el-input v-model="form.name" placeholder="请选择平台名称">
          </el-input
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
        name: '',
        used: ''
      },
      nameOptions: [{ label: 'aa', value: 1 }],
      logLevelOptions: [{ label: 'bb', value: 2 }]
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
        name: '',
        used: ''
      }
      this.doSearch()
    }
  }
}
</script>
<style lang="scss" scoped>
.other-log-search-form {
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
