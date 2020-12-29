<template>
<div class="main">
  <kr-search @keyup.enter.native="query">
    <kr-search-item label="数据源类型:" :labelWidth="80">
      <el-select v-model="search.datasource" placeholder="请选择" style="width: 100%">
        <el-option
          v-for="item in databaseOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </kr-search-item>
    <kr-search-item label="数据源名称:" :labelWidth="80">
      <el-input v-model="search.datasourceName" placeholder="请输入"></el-input>
    </kr-search-item>
    <kr-search-item label="IP主机名:" :labelWidth="80">
      <el-input v-model="search.datasource_ip" placeholder="请输入"></el-input>
    </kr-search-item>
    <kr-search-item label="端口:" :labelWidth="80">
      <el-input v-model="search.datasource_port" placeholder="请输入"></el-input>
    </kr-search-item>
    <kr-search-item label="数据库名称:" :labelWidth="80">
      <el-input v-model="search.databaseName" placeholder="请输入"></el-input>
    </kr-search-item>
    <kr-search-item>
      <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
      <el-button icon="el-icon-refresh-right" @click="reset">重置</el-button>
    </kr-search-item>
  </kr-search>
  <div class="table-box">
    <div style="margin-bottom: 20px">
      <el-button type="primary" icon="el-icon-plus" @click="addData">创建数据源</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="edit">编辑</el-button>
      <el-button type="primary" @click="see"><i class="iconfont iconai-eye" style="font-size: 12px"></i> 查看</el-button>
      <el-button icon="el-icon-delete" type="danger" plain @click="deleteData">删除({{selectRows.length}})</el-button>
      <el-button @click="empty" ><i class="iconfont iconshuazi-1" style="font-size: 12px"></i>清空({{selectRows.length}})</el-button>
    </div>
    <div>
      <kr-el-table
        v-kr-loading="loading"
        ref="table"
        :options="options"
        :columns="columns"
        :rows="table"
        :total="total"
        :pageNum="current"
        @row-click="rowClick"
        @selection-change="selectionChange"
        @on-page-change="onPageChange"
        style="margin-top: 20px"
      />
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      @close="cancel"
      width="500px">
      <div>
        <div v-if="title=='查看详情'">
          <el-form  class="demo-ruleForm">
            <el-form-item label="数据源类型:" prop="datasource">
              <span>{{ruleForm.datasource}}</span>
            </el-form-item>
            <el-form-item label="数据源名称：" prop="datasourceName">
              <span>{{ruleForm.datasourceName}}</span>
            </el-form-item>
            <el-form-item label="描述：" prop="comments">
              <span>{{ruleForm.comments}}</span>
            </el-form-item>
            <el-form-item label="ip主机名：" prop="datasource_ip">
              <span>{{ruleForm.datasource_ip}}</span>
            </el-form-item>
            <el-form-item label="端口：" prop="datasource_port">
              <span>{{ruleForm.datasource_port}}</span>
            </el-form-item>
            <el-form-item label="数据库名称：" prop="databaseName">
              <span>{{ruleForm.databaseName}}</span>
            </el-form-item>
            <el-form-item label="用户名称：" prop="jdbcUsername">
              <span>{{ruleForm.jdbcUsername}}</span>
            </el-form-item>
            <el-form-item label="密码：" prop="jdbcPassword">
              <span>{{ruleForm.jdbcPassword}}</span>
            </el-form-item>
            <el-form-item label="jdbc连接参数：" prop="jdbc_param">
              <span>{{ruleForm.jdbc_param}}</span>
            </el-form-item>
          </el-form>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" class="demo-ruleForm" v-else>
          <el-form-item label="数据源类型:" prop="datasource">
            <el-select v-model="ruleForm.datasource" placeholder="" style="width: 100%" @change="datasourceChange">
              <el-option v-for="item in databaseOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据源名称：" prop="datasourceName">
            <el-input v-model="ruleForm.datasourceName"></el-input>
          </el-form-item>
          <el-form-item label="描述：" prop="comments">
            <el-input v-model="ruleForm.comments"></el-input>
          </el-form-item>
          <el-form-item label="ip主机名：" prop="datasource_ip">
            <el-input v-model="ruleForm.datasource_ip" @change="datasourceChange"></el-input>
          </el-form-item>
          <el-form-item label="端口：" prop="datasource_port">
            <el-input v-model="ruleForm.datasource_port" @change="datasourceChange"></el-input>
          </el-form-item>
          <el-form-item label="数据库名称：" prop="databaseName">
            <el-input v-model="ruleForm.databaseName" @change="datasourceChange"></el-input>
          </el-form-item>
          <el-form-item label="用户名称：" prop="jdbcUsername">
            <el-input v-model="ruleForm.jdbcUsername"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="jdbcPassword">
            <el-input placeholder="请输入密码" v-model="ruleForm.jdbcPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="jdbc连接参数：" prop="jdbc_param">
            <el-input type="textarea" disabled :rows="3" v-model="ruleForm.jdbc_param"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" v-if="title!='查看详情'">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="success" @click="test">测试连接</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import { addJobJdbcDatasource, getOne, testDatabase } from '@/projectModule/api/dataShareCollection/dataSource.js'
export default {
  name: 'index',
  data () {
    return {
      search: {
        datasource: '',
        datasourceName: '',
        databaseName: '',
        datasource_ip: '',
        datasource_port: ''
      },
      input: '',
      options: {
        showIndex: true,
        showSelection: true,
        'max-height': 1000
      },
      table: [],
      total: 0,
      columns: [
        {
          label: '数据源名称',
          prop: 'datasourceName'
        },
        {
          label: '数据源类型',
          prop: 'datasource'
        },
        {
          label: '数据源参数',
          prop: 'jdbc_param'
        },
        {
          label: '描述',
          prop: 'comments'
        },
        {
          label: '创建时间',
          prop: 'username'
        },
        {
          label: '更新时间',
          prop: 'username'
        }
      ],
      selectRows: [],
      dialogVisible: false,
      ruleForm: {
        datasource: '',
        datasourceName: '',
        databaseName: '',
        datasource_ip: '',
        datasource_port: '',
        jdbcUsername: '',
        jdbcPassword: '',
        jdbc_param: '',
        comments: ''
      },
      rules: {
        datasource: [
          { required: true, message: '请选择数据源类型', trigger: 'change' }
        ],
        datasourceName: [
          { required: true, message: '请输入数据源名称', trigger: 'blur' }
        ],
        databaseName: [
          { required: true, message: '请输入数据库名称', trigger: 'blur' }
        ],
        datasource_ip: [
          { required: true, message: '请输入ip主机名', trigger: 'blur' }
        ],
        datasource_port: [
          { required: true, message: '请输入端口', trigger: 'blur' }
        ],
        jdbcUsername: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        jdbcPassword: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        jdbc_param: [
          { required: true, message: '', trigger: 'blur' }
        ]
      },
      databaseOptions: [
        {
          value: 'mysql',
          label: 'mysql',
          port: 3306
        },
        {
          value: 'oracle',
          label: 'oracle',
          port: 1521
        },
        {
          value: 'dm',
          label: '达梦数据库',
          port: 5236
        }
      ],
      dataConfig: {
        mysql: 'mysql:',
        oracle: 'oracle:thin:@',
        dm: 'dm:'
      },
      jdbcConfig: {
        mysql: 'com.mysql.jdbc.Driver',
        oracle: 'oracle.jdbc.OracleDriver',
        dm: 'dm.jdbc.driver.DmDriver'
      },
      current: 1,
      size: 10,
      isEdit: false,
      loading: false,
      title: ''
    }
  },
  mounted () {
    this.datasourceChange()
    this.getPageData()
  },
  methods: {
    reset () {
      this.search = {
        datasource: '',
        datasourceName: '',
        databaseName: '',
        datasource_ip: '',
        datasource_port: ''
      }
    },
    query () {
      this.current = 1
      this.getPageData()
    },
    see () {
      if (this.selectRows.length === 0) {
        this.$message.warning('请选择一个需要查看的列')
      } else if (this.selectRows.length === 1) {
        this.dialogVisible = true
        this.title = '查看详情'
        getOne(this.selectRows[0].id).then(data => {
          if (data.code === 0) {
            for (const key in this.ruleForm) {
              this.ruleForm[key] = data.data[key]
            }
            this.dialogVisible = true
          }
        })
      } else {
        this.$message.warning('只能选择一个需要查看的列')
      }
    },
    addData () {
      this.dialogVisible = true
      this.isEdit = false
      this.title = '创建数据源'
    },
    selectionChange (rows) {
      this.selectRows = rows
    },
    onPageChange (current, size) {
      this.current = current
      this.size = size
      this.getPageData()
    },
    empty () {
      this.$refs.table.$refs.refTable.clearSelection()
    },
    edit () {
      if (this.selectRows.length === 0) {
        this.$message.warning('请选择一个需要编辑的列')
      } else if (this.selectRows.length === 1) {
        this.isEdit = true
        this.title = '编辑数据源'
        getOne(this.selectRows[0].id).then(data => {
          if (data.code === 0) {
            for (const key in this.ruleForm) {
              this.ruleForm[key] = data.data[key]
            }
            this.dialogVisible = true
          }
        })
      } else {
        this.$message.warning('只能选择一个需要编辑的列')
      }
    },
    cancel () {
      this.$refs.ruleForm.clearValidate()
      this.dialogVisible = false
      this.ruleForm = {
        datasource: '',
        datasourceName: '',
        databaseName: '',
        datasource_ip: '',
        datasource_port: '',
        jdbcUsername: '',
        jdbcPassword: '',
        jdbc_param: '',
        comments: ''
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params
          this.dialogVisible = false
          params = {
            ...this.ruleForm,
            jdbcDriverClass: this.jdbcConfig[this.ruleForm.datasource]
          }
          if (!this.isEdit) {
            this.create(params)
          } else {
            this.getData(params, 'put')
          }
        } else {
          return false
        }
      })
    },
    test () {
      testDatabase(this.ruleForm).then(data => {
        if (data.code === 0) {
          this.$message.success('连接成功')
        } else {
          this.$message.error('连接失败')
        }
      }).catch(() => {
        this.$message.error('连接失败')
      })
    },
    datasourceChange () {
      this.databaseOptions.map(value => {
        if (value.value === this.ruleForm.datasource) {
          this.ruleForm.datasource_port = value.port
        }
      })
      var ip = this.ruleForm.datasource_ip ? this.ruleForm.datasource_ip : '{host}'
      var port = this.ruleForm.datasource_port ? this.ruleForm.datasource_port : '{port}'
      var data = this.ruleForm.datasource ? this.dataConfig[this.ruleForm.datasource] : '{datasource}'
      var database = this.ruleForm.databaseName ? this.ruleForm.databaseName : '{database}'
      this.ruleForm.jdbc_param = `jdbc:${data}//${ip}:${port}/${database}`
    },
    getData (params, type) {
      addJobJdbcDatasource(params, type).then(data => {
        if (data.code === 0) {
          if (type === 'post') {
            this.$message.success('创建成功')
          }
          if (type === 'put') {
            this.$message.success('修改成功')
          }
          if (type === 'delete') {
            this.$message.success('删除成功')
          }
          if (type === 'get') {
            this.loading = false
            this.table = data.data.records
            this.total = data.data.total
          } else {
            this.getPageData()
          }
        } else {
          if (type === 'post') {
            this.$message.error('添加失败')
          }
          if (type === 'put') {
            this.$message.error('修改失败')
          }
          if (type === 'delete') {
            this.$message.error('删除失败')
          }
        }
      }).catch(() => {
        this.loading = false
        if (type === 'post') {
          this.$message.error('添加失败')
        }
        if (type === 'put') {
          this.$message.error('修改失败')
        }
        if (type === 'delete') {
          this.$message.error('删除失败')
        }
      })
    },
    getPageData () {
      this.loading = true
      this.getData({
        current: this.current,
        size: this.size,
        ascs: '',
        ...this.search
      }, 'get')
    },
    deleteData () {
      if (this.selectRows.length) {
        this.$msgbox
          .confirm(
            '是否确定删除选择的数据？',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
          .then(() => {
            var idList = this.selectRows.map(value => value.id)
            this.getData({ idList: idList.join(',') }, 'delete')
          })
      }
    },
    create (params) {
      testDatabase(params).then(data => {
        if (data.code === 0) {
          this.getData(params, 'post')
        }
      })
    },

    rowClick (row) {
      this.$refs.table.$refs.refTable.toggleRowSelection(row)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/projectModule/assets/css/basic-color.scss";
  .main{
    border: 1px solid $color-border;
    background-color: #fff;
    .table-box{
      border-top: 1px solid $color-border;
      padding: 20px;
    }
  }

</style>
