<template>
  <div class="bcgColor main">
    <kr-search @keyup.enter.native="query">
      <kr-search-item label="目录名称:" :labelWidth="80">
        <el-input v-model="search.name" placeholder="请输入"></el-input>
      </kr-search-item>
      <kr-search-item label="描述:" :labelWidth="80">
        <el-input v-model="search.describe" placeholder="请输入"></el-input>
      </kr-search-item>
      <kr-search-item label="IP:" :labelWidth="80">
        <el-input v-model="search.ipWhitelist" placeholder="请输入"></el-input>
      </kr-search-item>
      <kr-search-item label="有效期:" :labelWidth="80">
        <el-date-picker
          v-model="search.date"
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
        <el-button type="primary" icon="el-icon-plus" @click="addData" v-has="'InterfaceManage:InterfaceCatalogManage:add'">新增接口目录</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="edit" v-has="'InterfaceManage:InterfaceCatalogManage:edit'">编辑</el-button>
        <el-button type="primary" @click="see" v-has="'InterfaceManage:InterfaceCatalogManage:see'"><i class="iconfont iconai-eye" style="font-size: 12px"></i> 查看</el-button>
        <el-button icon="el-icon-delete" type="danger" plain @click="deleteData" v-has="'InterfaceManage:InterfaceCatalogManage:delete'">删除({{selectRows.length}})</el-button>
        <el-button @click="empty" ><i class="iconfont iconshuazi-1" style="font-size: 12px"></i>清空({{selectRows.length}})</el-button>
      </div>
      <div>
        <el-table
          ref="table"
          :data="table"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @row-click="rowClick"
          @select-all="selectAll"
          @selection-change="selectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="数据目录名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="describe"
            label="描述"
            width="180">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码">
          </el-table-column>
          <el-table-column
            prop="ipWhitelist"
            label="IP白名单">
            <template slot-scope="scope">
              <el-tag v-for="(item,index) in scope.row.ipWhitelist" :key="index" style="margin-right: 5px">
                {{item}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="validPeriod"
            label="有效期">
          </el-table-column>
        </el-table>
        <kr-pagination
          v-if="total"
          :total="total"
          :defaultCurrent="current"
          @on-page-change="onPageChange"
        ></kr-pagination>
      </div>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        @close="cancel"
        width="550px">
        <div>
          <div v-if="title=='查看详情'">
            <el-form  class="demo-ruleForm">
              <el-form-item label="父目录名称：" prop="parentId">
                <el-cascader
                  disabled
                  v-model="ruleForm.parentId"
                  style="width: 220px"
                  :options="options"
                  :props="{ checkStrictly: true,label:'name',value:'id' }"
                  clearable></el-cascader>
              </el-form-item>
              <el-form-item label="数据目录名称：" prop="name">
                <span>{{ruleForm.name}}</span>
              </el-form-item>
              <el-form-item label="描述：" prop="describe">
                <span>{{ruleForm.describe}}</span>
              </el-form-item>
              <el-form-item label="密码：" prop="password">
                <span>{{ruleForm.password}}</span>
              </el-form-item>
              <el-form-item label="有效期：" prop="validPeriod">
                <span>{{ruleForm.validPeriod}}</span>
              </el-form-item>
              <el-form-item label="IP白名单：" prop="ipWhitelist">
                <el-tag
                  :key="tag"
                  v-for="(tag,index) in ruleForm.ipWhitelist"
                  :disable-transitions="false"
                  style="margin-right: 5px"
                  @close="handleClose(index)">
                  {{tag}}
                </el-tag>
              </el-form-item>
            </el-form>
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm" v-else>
            <el-form-item label="父目录名称：" prop="parentId">
              <el-cascader
                v-model="ruleForm.parentId"
                style="width: 220px"
                :options="options"
                :props="{ checkStrictly: true,label:'name',value:'id',emitPath:false }"
                clearable></el-cascader>
            </el-form-item>
            <el-form-item label="数据目录名称：" prop="name">
              <el-input style="width: 220px" v-model="ruleForm.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="描述：" prop="describe">
              <el-input style="width: 220px" v-model="ruleForm.describe" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input style="width: 220px;margin-right: 10px" v-model="ruleForm.password" placeholder="请输入"></el-input>
              <el-button type="primary" @click="getPassword">自动生成</el-button>
            </el-form-item>
            <el-form-item label="有效期：" prop="validPeriod">
              <el-date-picker
                v-model="ruleForm.validPeriod"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="IP白名单：" prop="ipWhitelist">
              <el-tag
                :key="tag"
                v-for="tag in ruleForm.ipWhitelist"
                closable
                :disable-transitions="false"
                style="margin-right: 5px"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                style="width: 150px"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ IP</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer" v-if="title!='查看详情'">
          <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addInterface, deleteInterface, getPassword, queryInterface, updateInterface, queryCondition } from '@/projectModule/api/InterfaceManage/InterfaceCatalogManage.js'
export default {
  name: 'index',
  data () {
    return {
      options: [],
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      search: {
        describe: '',
        ipWhitelist: '',
        name: '',
        date: null
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
        describe: '',
        ipWhitelist: [],
        name: '',
        parentId: '',
        password: '',
        validPeriod: ''
      },
      rules: {
        parentId: [
          { required: true, message: '请填选择父级目录', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请填写数据目录名称', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请填写密码' }
        ],
        validPeriod: [
          { required: true, message: '请选择过去时间', trigger: 'blur' }
        ]
      },
      current: 1,
      size: 10,
      loading: false,
      isEdit: false,
      title: '',
      detail: {},
      allData: []
    }
  },
  mounted () {
    this.queryInterface()
    this.query()
  },
  methods: {
    queryInterface (type) {
      this.loading = true
      queryInterface().then(data => {
        this.loading = false
        if (data.code === 0) {
          if (type) {
            this.table = data.data ? data.data : []
          } else {
            this.options = data.data ? data.data : []
          }
        }
      }).catch(() => {
        this.loading = false
      })
    },

    queryCondition () {
      var params = {
        describe: this.search.describe,
        ipWhitelist: this.search.ipWhitelist,
        name: this.search.name,
        startValidPeriod: this.search.date ? this.search.date[0] + ' 00:00:00' : '',
        endValidPeriod: this.search.date ? this.search.date[1] + ' 00:00:00' : '',
        pageSize: this.size,
        pageNum: this.current
      }
      this.loading = true
      this.table = []
      queryCondition(params).then(data => {
        this.loading = false
        if (data.code === 0) {
          this.table = data.data.rows ? data.data.rows : []
          this.total = data.data.total ? data.data.total : []
        }
      }).catch(() => {
        this.loading = false
      })
    },

    getPassword () {
      getPassword().then(data => {
        if (data.code === 0) {
          this.ruleForm.password = data.data
        }
      })
    },

    addInterface (params) {
      addInterface(params).then(data => {
        if (data.code === 0) {
          this.$message.success('新增成功')
          this.query()
        }
      })
    },

    updateInterface (params) {
      updateInterface(params).then(data => {
        if (data.code === 0) {
          this.$message.success('修改成功')
          this.query()
        }
      })
    },

    deleteInterface (id) {
      deleteInterface({ id }).then(data => {
        if (data.code === 0) {
          this.$message.success('删除成功')
          this.query()
        }
      })
    },

    selectAll (selection) {
      if (selection.length > this.selectRows.length) {
        this.$refs.table.data.map((items) => {
          if (selection.length) {
            if (items.children) {
              this.setChecked(items.children, true)
            }
          } else {
            if (items.children) {
              this.setChecked(items.children, false)
            }
          }
        })
      } else {
        this.$refs.table.clearSelection()
      }
    },

    setChecked (data = [], is) {
      data.map(row => {
        this.$refs.table.toggleRowSelection(row, is)
        if (row.children) {
          this.setChecked(row.children, is)
        }
      })
    },

    handleClose (index) {
      this.ruleForm.ipWhitelist.splice(index, 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      const inputValue = this.inputValue.trim()
      var re = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
      if (inputValue === '') {
        this.inputVisible = false
      } else {
        if (re.test(inputValue)) {
          this.ruleForm.ipWhitelist.push(inputValue)
          this.inputValue = ''
          this.inputVisible = false
        } else {
          this.$message.error('请输入正确的IP地址')
        }
      }
    },

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

    query (type) {
      this.current = 1
      if (this.search.describe === '' && this.search.ipWhitelist === '' && this.search.name === '' && this.search.date == null) {
        this.queryInterface(true)
      } else {
        this.queryCondition()
      }
    },

    see () {
      if (this.selectRows.length === 0) {
        this.$message.warning('请选择一个需要查看的列')
      } else if (this.selectRows.length === 1) {
        this.dialogVisible = true
        this.isEdit = true
        this.title = '查看详情'
        this.ruleForm = {
          describe: this.selectRows[0].describe,
          ipWhitelist: this.selectRows[0].ipWhitelist ? this.selectRows[0].ipWhitelist : [],
          name: this.selectRows[0].name,
          parentId: this.selectRows[0].parentId,
          password: this.selectRows[0].password,
          validPeriod: this.selectRows[0].validPeriod,
          id: this.selectRows[0].id
        }
      } else {
        this.$message.warning('只能选择一个需要查看的列')
      }
    },

    edit () {
      if (this.selectRows.length === 0) {
        this.$message.warning('请选择一个需要编辑的列')
      } else if (this.selectRows.length === 1) {
        if (this.selectRows[0].canEdit === 0) {
          this.queryInterface()
          this.isEdit = true
          this.dialogVisible = true
          this.title = '编辑目录'
          this.ruleForm = {
            describe: this.selectRows[0].describe,
            ipWhitelist: this.selectRows[0].ipWhitelist ? [...this.selectRows[0].ipWhitelist] : [],
            name: this.selectRows[0].name,
            parentId: this.selectRows[0].parentId,
            password: this.selectRows[0].password,
            validPeriod: this.selectRows[0].validPeriod,
            id: this.selectRows[0].id
          }
        } else {
          this.$message.warning('此目录不能编辑')
        }
      } else {
        this.$message.warning('只能选择一个需要编辑的列')
      }
    },

    addData () {
      this.dialogVisible = true
      this.isEdit = false
      this.title = '新增数据目录'
      this.queryInterface()
    },

    selectionChange (rows) {
      setTimeout(() => {
        this.selectRows = rows
      })
    },

    empty () {
      this.$refs.table.clearSelection()
    },

    cancel () {
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.clearValidate()
      }
      this.dialogVisible = false
      this.ruleForm = {
        describe: '',
        ipWhitelist: [],
        name: '',
        parentId: '',
        password: '',
        validPeriod: ''
      }
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = { ...this.ruleForm }
          params.ipWhitelist = params.ipWhitelist.join(',')
          params.validPeriod = params.validPeriod + ' 00:00:00'
          params.parentId = params.parentId === '' ? 0 : params.parentId
          if (!this.isEdit) {
            params.id = null
            this.addInterface(params)
          } else {
            this.updateInterface(params)
          }
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },

    onPageChange (current, size) {
      this.current = current
      this.size = size
      this.queryCondition()
    },

    deleteData () {
      if (!this.selectRows.length) {
        this.$message.warning('请选择需要删除的列')
      } else if (this.selectRows.length === 1) {
        if (this.selectRows[0].canEdit !== 0) {
          this.$message.warning('此目录不能修改')
          return
        }
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
            this.deleteInterface(this.selectRows[0].id)
          })
      } else {
        this.$message.warning('只能选择一个删除的目录')
      }
    },

    rowClick (row) {
      this.$refs.table.toggleRowSelection(row)
    },

    setDisabled (data, is) {
      data.map(value => {
        if (!is) {
          if (this.isEdit && value.id === this.selectRows[0].id) {
            value.disabled = true
            if (value.children) {
              this.setDisabled(value.children, true)
            }
          } else {
            value.disabled = value.canEdit === 1
            if (value.children) {
              this.setDisabled(value.children, false)
            }
          }
        } else {
          value.disabled = true
          if (value.children) {
            this.setDisabled(value.children, true)
          }
        }
      })
    },

    setIpWhitelist (data) {
      data.map(value => {
        value.ipWhitelist = value.ipWhitelist ? value.ipWhitelist.split(',') : []
        if (value.children) {
          this.setIpWhitelist(value.children)
        }
      })
    }
  },
  watch: {
    table () {
      this.setIpWhitelist(this.table)
    },

    options () {
      this.setDisabled(this.options, false)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/projectModule/assets/css/basic-color.scss";
  .main{
    box-sizing:border-box;
    border: 1px solid $color-border;
    background-color: #fff;
    .table-box{
      border-top: 1px solid $color-border;
      padding: 20px;
    }
  }

</style>
