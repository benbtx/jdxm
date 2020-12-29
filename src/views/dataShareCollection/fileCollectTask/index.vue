<template>
<div class="main">
  <kr-search @keyup.enter.native="query">
    <kr-search-item label="任务名称:" :labelWidth="100">
      <el-input v-model="search.name" placeholder="请输入"></el-input>
    </kr-search-item>
    <kr-search-item label="端口地址:" :labelWidth="100">
      <el-input v-model="search.host" placeholder="请输入"></el-input>
    </kr-search-item>
    <kr-search-item label="端口:" :labelWidth="100">
      <el-input v-model="search.port" placeholder="请输入"></el-input>
    </kr-search-item>
    <kr-search-item label="标签:" :labelWidth="100">
      <el-input v-model="search.tag" placeholder="请输入"></el-input>
    </kr-search-item>
    <kr-search-item label="是否自动调度:" :labelWidth="100">
      <el-select v-model="search.autoScheduler" placeholder="请选择" style="width: 100%">
        <el-option label="是" value="0"/>
        <el-option label="否" value="1"/>
      </el-select>
    </kr-search-item>
    <kr-search-item label="采集文件路径:" :labelWidth="100">
      <el-input v-model="search.sourceUri" placeholder="请输入"></el-input>
    </kr-search-item>
    <kr-search-item label="本地路径:" :labelWidth="100">
      <el-input v-model="search.resultUri" placeholder="请输入"></el-input>
    </kr-search-item>
    <kr-search-item label="创建时间:" :labelWidth="100">
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
      <el-button type="primary" @click="see"><i class="iconfont iconai-eye" style="font-size: 12px"></i> 查看</el-button>
      <el-button icon="el-icon-delete" type="danger" plain @click="deleteData">删除({{selectRows.length}})</el-button>
      <el-button icon="" @click="empty"><i class="iconfont iconshuazi-1" style="font-size: 12px"></i>清空({{selectRows.length}})</el-button>
    </div>
    <div>
      <kr-el-table
        v-kr-loading="loading"
        ref="table"
        :options="options"
        :columns="columns"
        :rows="table"
        :total="total"
        @row-click="rowClick"
        :pageNum="current"
        @selection-change="selectionChange"
        @on-page-change="onPageChange"
        style="margin-top: 20px"
      />
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      @close="cancel"
      width="550px">
      <div>
        <div v-if="title=='查看详情'">
          <el-form  class="demo-ruleForm">
            <el-form-item label="任务名称:" prop="name">
              <span>{{detail.name}}</span>
            </el-form-item>
            <el-form-item label="任务描述：" prop="memo">
              <span>{{detail.memo}}</span>
            </el-form-item>
            <el-form-item label="描述：" prop="comments">
              <span>{{detail.comments}}</span>
            </el-form-item>
            <el-form-item label="标签：" prop="tag">
              <span>{{detail.tag}}</span>
            </el-form-item>
            <el-form-item label="服务器端口地址：" prop="serverHost">
              <span>{{detail.serverHost}}</span>
            </el-form-item>
            <el-form-item label="服务器端口：" prop="serverPort">
              <span>{{detail.serverPort}}</span>
            </el-form-item>
            <el-form-item label="服务器用户名：" prop="serverUserName">
              <span>{{detail.serverUserName}}</span>
            </el-form-item>
            <el-form-item label="密码：" prop="serverPassword">
              <span>{{detail.serverPassword}}</span>
            </el-form-item>
            <el-form-item label="采集文件全路径：" prop="sourceUri">
              <span>{{detail.sourceUri}}</span>
            </el-form-item>
            <el-form-item label="本地路径：" prop="resultUri">
              <span>{{detail.resultUri}}</span>
            </el-form-item>
            <el-form-item label="是否生成调度任务：" prop="autoScheduler">
              <span>{{detail.autoScheduler===0?'是':'否'}}</span>
            </el-form-item>
          </el-form>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm" v-else>
          <el-form-item label="任务名称：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="描述：" prop="memo">
            <el-input v-model="ruleForm.memo" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="填写标签：" prop="tag">
            <el-input v-model="ruleForm.tag" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="服务器端口地址：" prop="serverHost">
            <el-input v-model="ruleForm.serverHost" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="服务器端口：" prop="serverPort">
            <el-input v-model="ruleForm.serverPort" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="服务器用户名：" prop="serverUserName">
            <el-input v-model="ruleForm.serverUserName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="serverPassword">
            <el-input placeholder="请输入" v-model="ruleForm.serverPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="采集文件全路径：" prop="sourceUri">
            <el-input v-model="ruleForm.sourceUri" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="本地路径：" prop="resultUri">
            <el-input v-model="ruleForm.resultUri" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="是否生成调度任务：" prop="autoScheduler">
            <el-switch
              v-model="ruleForm.autoScheduler"
              active-color="#007CFF"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否">
            </el-switch>
            <el-alert
              style="width: 230px;float: right;height: 32px;margin-left: 10px"
              title="生成的调度任务为禁用状态"
              show-icon
              type="warning"
            ></el-alert>
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
import { addFileCollect, getFileCollect, getPageList, removeFileCollect } from '@/projectModule/api/dataShareCollection/fileCollectTask.js'
export default {
  name: 'index',
  data () {
    return {
      search: {
        autoScheduler: '',
        endDate: '',
        host: '',
        name: '',
        port: '',
        resultUri: '',
        sourceUri: '',
        startDate: '',
        tag: ''
      },
      date: [],
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
          prop: 'name'
        },
        {
          label: '描述',
          prop: 'memo'
        },
        {
          label: '标签',
          prop: 'tag'
        },
        {
          label: '服务器地址',
          prop: 'serverHost'
        },
        {
          label: '服务器端口',
          prop: 'serverPort'
        },
        {
          label: '服务器用户名',
          prop: 'serverUserName'
        },
        {
          label: '采集文件全路径',
          prop: 'sourceUri'
        },
        {
          label: '本地路径',
          prop: 'resultUri'
        },
        {
          label: '是否自动调度',
          formatter: function (row) {
            return row.autoScheduler === 0 ? '是' : '否'
          }
        },
        {
          label: '创建时间',
          prop: 'ctreateTime'
        }
      ],
      selectRows: [],
      dialogVisible: false,
      ruleForm: {
        autoScheduler: true,
        memo: '',
        name: '',
        resultUri: '',
        serverHost: '',
        serverPassword: '',
        serverPort: '',
        serverUserName: '',
        sourceUri: '',
        tag: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写采集任务名称', trigger: 'change' }
        ],
        resultUri: [
          { required: true, message: '请填写本地路径', trigger: 'blur' }
        ],
        serverHost: [
          { required: true, message: '请填写服务器端口地址', trigger: 'blur' }
        ],
        serverPassword: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ],
        serverPort: [
          { required: true, message: '请填写服务器端口', trigger: 'blur' }
        ],
        serverUserName: [
          { required: true, message: '请填写服务器用户名', trigger: 'blur' }
        ],
        sourceUri: [
          { required: true, message: '请填写采集文件全路径', trigger: 'blur' }
        ],
        tag: [
          { required: true, message: '填写标签', trigger: 'blur' }
        ]
      },
      current: 1,
      size: 10,
      loading: false,
      title: '',
      detail: {}
    }
  },
  mounted () {
    this.getPageData()
  },
  methods: {
    reset () {
      this.search = {
        autoScheduler: '',
        endDate: '',
        host: '',
        name: '',
        port: '',
        resultUri: '',
        sourceUri: '',
        startDate: '',
        tag: ''
      }
      this.date = []
    },
    query () {
      this.current = 1
      this.search.startDate = this.date[0] ? this.date[0] : ''
      this.search.endDate = this.date[1] ? this.date[1] : ''
      this.getPageData()
    },
    see () {
      if (this.selectRows.length === 0) {
        this.$message.warning('请选择一个需要查看的列')
      } else if (this.selectRows.length === 1) {
        this.dialogVisible = true
        this.title = '查看详情'
        this.getFileCollect(this.selectRows[0].id)
      } else {
        this.$message.warning('只能选择一个需要查看的列')
      }
    },
    addData () {
      this.dialogVisible = true
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
        autoScheduler: '',
        memo: '',
        name: '',
        resultUri: '',
        serverHost: '',
        serverPassword: '',
        serverPort: '',
        serverUserName: '',
        sourceUri: '',
        tag: ''
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addFileCollect(this.ruleForm)
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    getPageData () {
      this.loading = true
      this.table = []
      this.total = 0
      getPageList({
        size: this.size,
        current: this.current,
        ...this.search
      }).then(data => {
        this.loading = false
        if (data.code === 0) {
          this.table = data.data.records ? data.data.records : []
          this.total = data.data.total
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
            this.removeFileCollect({ idList: idList.join(',') })
          })
      }
    },
    addFileCollect (params) {
      var p = { ...params }
      p.autoScheduler = p.autoScheduler ? 0 : 1
      addFileCollect(p).then(data => {
        if (data.code === 0) {
          this.$message.success('创建成功')
          this.getPageData()
        }
      })
    },
    getFileCollect (id) {
      this.detail = {}
      getFileCollect(id).then(data => {
        if (data.code === 0) {
          this.detail = data.data
        }
      })
    },
    removeFileCollect (id) {
      removeFileCollect(id).then(data => {
        if (data.code === 0) {
          this.$message.success('删除成功')
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
