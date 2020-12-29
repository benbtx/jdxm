<template>
  <div class="main">
    <kr-search @keyup.enter.native="query">
      <kr-search-item label="任务名称:" :labelWidth="140">
        <el-input v-model="search.taskName" placeholder="请输入"></el-input>
      </kr-search-item>
      <kr-search-item label="数据源数据库:" :labelWidth="140">
        <el-input v-model="search.sourceDataBaseId" placeholder="请输入"></el-input>
      </kr-search-item>
      <kr-search-item label="是否自动调度:" :labelWidth="140">
        <el-select v-model="search.sfzdscddrw" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in isOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </kr-search-item>
      <kr-search-item label="采前是否删除数据:" :labelWidth="140">
        <el-select v-model="search.sfzlcj" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in isOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </kr-search-item>
      <kr-search-item label="标签:" :labelWidth="140">
        <el-input v-model="search.taskTag" placeholder="请输入"></el-input>
      </kr-search-item>
      <kr-search-item label="是否增量采集:" :labelWidth="140">
        <el-select v-model="search.sfzlcj" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in isOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </kr-search-item>
      <kr-search-item label="创建时间:" :labelWidth="140">
        <el-date-picker
          v-model="date"
          style="width: 100%"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </kr-search-item>
      <kr-search-item>
        <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
        <el-button icon="el-icon-refresh-right" @click="reset">重置</el-button>
      </kr-search-item>
    </kr-search>
    <div class="table-box">
      <div style="margin-bottom: 20px">
        <el-button type="primary" icon="el-icon-plus" @click="addData">创建采集任务</el-button>
        <!--<el-button type="primary" icon="el-icon-edit" @click="edit">编辑</el-button>-->
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
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" v-else>
            <el-form-item label="数据源名称：" prop="datasourceName">
              <el-input v-model="ruleForm.datasourceName"></el-input>
            </el-form-item>
            <el-form-item label="描述：" prop="comments">
              <el-input v-model="ruleForm.comments"></el-input>
            </el-form-item>
            <el-form-item label="数据库数据源:" prop="datasource">
              <el-select v-model="ruleForm.datasource" placeholder="" style="width: 100%">
                <el-option v-for="item in databaseOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="填写标签：" prop="datasource_ip">
              <el-input v-model="ruleForm.datasource_ip"></el-input>
            </el-form-item>
            <el-form-item label="采集的表:" prop="datasource">
              <el-select v-model="ruleForm.datasource" placeholder="" style="width: 100%">
                <el-option v-for="item in databaseOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="目标表字段名称：" prop="databaseName">
              <el-input v-model="ruleForm.databaseName"></el-input>
            </el-form-item>
            <el-form-item label="目标表名称：" prop="jdbcUsername">
              <el-input v-model="ruleForm.jdbcUsername"></el-input>
            </el-form-item>
            <el-form-item label="采前是否删除数据：" prop="jdbcPassword">
              <el-input placeholder="请输入密码" v-model="ruleForm.jdbcPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="是否增量采集：" prop="jdbc_param">
              <el-input type="textarea" disabled :rows="3" v-model="ruleForm.jdbc_param"></el-input>
            </el-form-item>
            <el-form-item label="是否生成调度任务：" prop="jdbc_param">
              <el-input type="textarea" disabled :rows="3" v-model="ruleForm.jdbc_param"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer" v-if="title!='查看详情'">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPageList } from '@/projectModule/api/dataShareCollection/dataCollectionTask.js'
export default {
  name: 'index',
  data () {
    return {
      search: {
        createTime: '',
        sfzdscddrw: 0,
        sfzlcj: 0,
        sourceDataBaseId: '',
        taskName: '',
        taskTag: ''
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
          label: '任务名称',
          prop: 'datasourceName'
        },
        {
          label: '描述',
          prop: 'datasource'
        },
        {
          label: '数据库数据源',
          prop: 'jdbc_param'
        },
        {
          label: '标签',
          prop: 'comments'
        },
        {
          label: '采集的表',
          prop: 'username'
        },
        {
          label: '目标表名称',
          prop: 'username'
        },
        {
          label: '采集前删除',
          prop: 'username'
        },
        {
          label: '是否自动调度',
          prop: 'username'
        },
        {
          label: '增量字段',
          prop: 'username'
        },
        {
          label: '字段格式',
          prop: 'username'
        },
        {
          label: '创建时间',
          prop: 'username'
        }
      ],
      selectRows: [],
      dialogVisible: false,
      ruleForm: {
        cjqsfsc: 0,
        databaseCollectDetailList: [],
        databaseSourceId: 0,
        id: '',
        sfscddrw: 0,
        sfzlcj: 0,
        sourceTableName: '',
        targetTableName: '',
        taskName: '',
        taskRemark: '',
        taskTag: '',
        zlcjzd: '',
        zlcjzdgs: ''
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
      title: '',
      isOptions: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      date: []
    }
  },
  mounted () {
    this.getPageData()
  },
  methods: {
    reset () {
      this.search = {
        createTime: '',
        sfzdscddrw: 0,
        sfzlcj: 0,
        sourceDataBaseId: '',
        taskName: '',
        taskTag: ''
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
      } else {
        this.$message.warning('只能选择一个需要查看的列')
      }
    },
    addData () {
      this.dialogVisible = true
      this.isEdit = false
      this.title = '创建采集任务'
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
    cancel () {
      this.$refs.ruleForm.clearValidate()
      this.dialogVisible = false
      this.ruleForm = {
        createTime: '',
        sfzdscddrw: 0,
        sfzlcj: 0,
        sourceDataBaseId: '',
        taskName: '',
        taskTag: ''
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false
        }
      })
    },
    getPageData () {
      this.loading = true
      getPageList({
        current: this.current,
        size: this.size,
        ...this.search
      }).then(data => {
        this.loading = false
        if (data.code === 0) {
        }
      }).catch(() => {
        this.loading = false
      })
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
          })
      }
    },
    create (params) {
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
