<template>
  <div class="analysis-log-form">
    <el-form
      :model="form"
      :inline="true"
      ref="form"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="分配角色:" prop="logLevel"
        ><el-select v-model="form.role" placeholder="请选择角色">
          <el-option
            v-for="option of roleOptions"
            :key="option.roleId"
            :label="option.roleName"
            :value="option.roleId"
          ></el-option> </el-select
      ></el-form-item>

      <!-- <el-form-item label="用户名称:" prop="department"
        ><el-select v-model="form.department" placeholder="请输入">
          <el-option
            v-for="option of userDepartOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option></el-select
      ></el-form-item> -->
      <el-form-item label="用户名称:" prop="user"
        ><el-input v-model="form.user" placeholder="请输入"></el-input
      ></el-form-item>
      <el-form-item label="报表名称:" prop="reportName"
        ><el-input v-model="form.reportName" placeholder="请输入"></el-input
      ></el-form-item>
      <el-form-item label="报表描述:" prop="des"
        ><el-input v-model="form.des" placeholder="请输入"></el-input
      ></el-form-item>
      <el-form-item label="发布时间:" prop="time"
        ><el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker
      ></el-form-item>
      <el-form-item class="custom-buttons"
        ><el-button type="primary" @click="doSearch" icon="el-icon-search"
          >查询</el-button
        ><el-button @click="reset" icon="el-icon-refresh-right">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    roleOptions: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      form: {
        role: '',
        user: null,
        reportName: '',
        des: '',
        time: ''
      },
      logLevelOptions: [{ label: 'aa', value: 1 }],
      userDepartOptions: [{ label: 'bb', value: 2 }]
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
      this.$refs.form.resetFields()
      this.form.role = ''
      this.doSearch()
    }
  }
}
</script>
<style lang="scss" scoped>
.analysis-log-form {
  padding: 20px;
  padding-bottom: 6px;
  background-color: rgba(0, 124, 255, 0.0980392156862745);
  .el-form-item {
    margin-bottom: 14px;
  }
  .custom-buttons {
    padding-left: 100px;
  }
  /deep/ {
    .el-form-item__label {
      text-align: right;
    }
  }
}
</style>
