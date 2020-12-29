<template>
    <div class="main">
      <div class="title">表({{dataTable.length}})<el-button type="text" icon="el-icon-plus" style="float: right;font-size: 14px" @click="addTable">新增表</el-button></div>
      <div class="search">
        <el-input
        placeholder="请输入"
        suffix-icon="el-icon-search"
        v-model="input1">
      </el-input>
      </div>
      <div class="content">
        <el-tree
          ref="tree"
          :data="allDataTable"
          node-key="id"
          :props="defaultProps"
          default-expand-all
          @node-click="handleClick"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :render-content="renderContent">
        </el-tree>
      </div>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="1400px">
        <div v-kr-loading="loading">
          <el-dialog
            width="1400px"
            title="字段设置"
            :visible.sync="innerVisible"
            :show-close="false"
            :close-on-click-modal="false"
            append-to-body>
            <div>
              <div v-for="item in sqlList" :key="item">
                {{item}}
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="executeDDL">确认提交</el-button>
              <el-button @click="innerVisible=false">取 消</el-button>
            </div>
          </el-dialog>
          <kr-title-box title="基本信息">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="模式：" prop="schemaName">
                    <el-select v-model="ruleForm.schemaName" placeholder="请选择" style="width: 100%" :disabled="title==='编辑'?true:false"  @change="schemaNameChange">
                      <el-option
                        v-for="item in dmOptions"
                        :key="item.schema"
                        :label="item.name"
                        :value="item.schema">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="数据表名称：" prop="name">
                    <template v-if="title==='编辑'">
                      <el-input v-model="ruleForm.name" style="width: 100%;" :disabled="true"></el-input>
                    </template>
                    <template v-else>
                      {{tableNameStart}}
                      <el-input v-model="ruleForm.name" style="width: 80%;float: right"></el-input>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="表中文名：" prop="Cname">
                    <el-input v-model="ruleForm.Cname" @change="changTableName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="表描述：" prop="comment">
                    <el-input v-model="ruleForm.comment" @change="changTableName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </kr-title-box>
          <kr-title-box title="字段设置">
            <div id="columns">
              字段数量：{{ruleForm.columns.length}}
              <kr-el-table
                :options="options"
                :columns="columns"
                :rows="ruleForm.columns"
                style="margin-top: 20px"
              />
              <div class="add" @click="addRow" style="line-height: 40px;border: 1px dashed gainsboro;border-radius: 3px;text-align: center;cursor: pointer;margin-top: 20px">
                +添加字段
              </div>
            </div>
          </kr-title-box>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确认提交</el-button>
          <el-button @click="cancel(1)">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import selectOptions from './selectOptions.vue'
import inputBox from './input-box.vue'
import checkBox from './check-box.vue'
import numberInput from './number.vue'
import { cloneDeep } from 'loadsh'
import { getAllTables, getDmColumnTypeOption, createTableByMetaAndSaveMetaInfo, dropTableInNoData, getDmSchemaOption, getDeptId, getColumnInfosByTableName, executeDDL } from '@/projectModule/api/resourceManage/resourceManage.js'
export default {
  name: 'data-table',
  data () {
    const shelf = this
    var checkColumns = (rule, value, callback) => {
      if (!value.length) {
        return callback(new Error('请设置字段'))
      } else {
        callback()
      }
    }
    var tableName = (rule, value, callback) => {
      var regex = /[0-9A-Z_]$/
      if (value.trim() === '') {
        callback(new Error('请输入数据表名'))
      } else {
        if (regex.test(value)) {
          callback()
        } else {
          callback(new Error('只能包含大写字母、数字、下划线(下划线不能结尾)'))
        }
      }
    }
    var schemaName = (rule, value, callback) => {
      if (!shelf.ruleForm.schemaName) {
        callback(new Error('请选择模式'))
      } else {
        callback()
      }
    }
    return {
      title: '',
      options: {
        showIndex: false,
        showSelection: false,
        'max-height': 1000
      },
      input1: '',
      dialogVisible: false,
      innerVisible: false,
      defaultProps: {
        children: 'children',
        label: 'schemaName'
      },
      ruleForm: {
        name: '',
        comment: '',
        schemaName: '',
        columns: [
          {
            autoIncrement: true,
            columnTypeLength: '',
            columnTypeScale: '',
            comment: '数据自增ID',
            ifPrimaryKey: true,
            isnull: 0,
            name: 'ID',
            type: 'INT'
          }
        ],
        Cname: ''
      },
      rules: {
        schemaName: [
          { required: true, validator: schemaName, trigger: 'change' }
        ],
        name: [
          { required: true, validator: tableName, trigger: 'blur' }
        ],
        Cname: [
          { required: true, message: '请填写表中文名', trigger: 'blur' }
        ],
        columns: [
          { required: true, validator: checkColumns }
        ]
      },
      columns: [
        {
          label: '自增',
          prop: 'fieldName',
          width: 60,
          render (h, row) {
            return h(checkBox, {
              props: {
                check: row.row.autoIncrement,
                type: 'radio',
                row: row.row
              },
              on: {
                handleChange: (type) => {
                  shelf.handleChange(row.row, type, '自增')
                }
              }
            })
          }
        },
        {
          label: '主键',
          width: 60,
          prop: 'fieldName',
          render (h, row) {
            return h(checkBox, {
              props: {
                check: row.row.ifPrimaryKey,
                disabled: shelf.isDisabled,
                row: row.row
              },
              on: {
                handleChange: (type) => {
                  shelf.handleChange(row.row, type, 'ifPrimaryKey')
                }
              }
            })
          }
        },
        {
          label: '字段名称',
          prop: 'name',
          render (h, row) {
            return h(inputBox, {
              props: {
                input: row.row.name,
                row: row.row,
                isUpperCase: true
              },
              on: {
                handleChange: (type) => {
                  shelf.handleChange(row.row, type, 'name')
                }
              }
            })
          }
        },
        {
          label: '字段类型',
          width: 150,
          prop: 'type',
          render (h, row) {
            return h(selectOptions, {
              props: {
                type: row.row.type,
                options: shelf.typeOptions,
                row: row.row
              },
              on: {
                handleChangeType: (type) => {
                  shelf.handleChangeType(row.row, type, 'type')
                }
              }
            })
          }
        },
        {
          label: '非空',
          width: 60,
          prop: 'isnull',
          render (h, row) {
            return h(checkBox, {
              props: {
                check: row.row.isnull === 0,
                row: row.row
              },
              on: {
                handleChange: (type) => {
                  shelf.handleChange(row.row, type ? 0 : 1, 'isnull')
                }
              }
            })
          }
        },
        {
          label: '精度',
          width: 160,
          prop: 'columnTypeLength',
          render (h, row) {
            return h(numberInput, {
              props: {
                num: row.row.columnTypeLength,
                row: row.row,
                typeOptions: shelf.typeOptions,
                column: '精度'
              },
              on: {
                handleChange: (type) => {
                  shelf.handleChange(row.row, type, 'columnTypeLength')
                }
              }
            })
          }
        },
        {
          label: '标度',
          width: 160,
          prop: 'columnTypeScale',
          render (h, row) {
            return h(numberInput, {
              props: {
                num: row.row.columnTypeScale,
                row: row.row,
                typeOptions: shelf.typeOptions,
                column: '标度'
              },
              on: {
                handleChange: (type) => {
                  shelf.handleChange(row.row, type, 'columnTypeScale')
                }
              }
            })
          }
        },
        {
          label: '字段注释',
          prop: 'comment',
          render (h, row) {
            return h(inputBox, {
              props: {
                input: row.row.comment,
                row: row.row
              },
              on: {
                handleChange: (type) => {
                  shelf.handleChange(row.row, type, 'comment')
                }
              }
            })
          }
        },
        {
          label: '默认值',
          prop: 'defaultValue',
          render (h, row) {
            return h(inputBox, {
              props: {
                input: row.row.defaultValue,
                row: row.row
              },
              on: {
                handleChange: (type) => {
                  shelf.handleChange(row.row, type, 'defaultValue')
                }
              }
            })
          }
        },
        {
          label: '操作',
          width: 120,
          prop: 'comment',
          render (h, row) {
            return (
              <div>
                <el-button type="text" onClick={() => { shelf.deleteOne(row.ind) }} disabled={!!row.row.isSystem}>删除</el-button>
                <el-button type="text" onClick={() => { shelf.move(row.ind, true) }} disabled={!!row.row.isSystem}>上移</el-button>
                <el-button type="text" onClick={() => { shelf.move(row.ind, false) }} disabled={!!row.row.isSystem}>下移</el-button>
              </div>
            )
          }
        }
      ],
      table: [
        {}
      ],
      dataTable: [],
      allDataTable: [],
      active: '',
      isDisabled: false,
      typeOptions: [],
      dmOptions: [],
      tree: [],
      tableNameStart: '',
      isSystem: ['ID', 'SYSTEM_ID', 'CREATE_TIME', 'UPDATE_TIME'],
      modifyTableName: '',
      deleteColums: [],
      loading: false,
      sqlList: []
    }
  },
  created () {
    this.resize()
    window.addEventListener('resize', this.resize, false)
    this.getAllTables()
  },
  methods: {
    resize () {
      this.options['max-height'] = document.body.clientHeight - 580 > 100 ? document.body.clientHeight - 580 : 300
    },
    search () {
      this.$refs.tree.filter(this.input1)
    },
    addTable () {
      this.ruleForm = {
        name: '',
        comment: '',
        schemaName: '',
        columns: [
          {
            autoIncrement: true,
            columnTypeLength: '',
            columnTypeScale: '',
            comment: '数据自增ID',
            ifPrimaryKey: true,
            isnull: 0,
            name: 'ID',
            type: 'INT',
            defaultValue: '',
            isSystem: true
          },
          {
            autoIncrement: false,
            columnTypeLength: '10',
            columnTypeScale: '',
            comment: '系统ID',
            ifPrimaryKey: true,
            isnull: 0,
            name: 'SYSTEM_ID',
            type: 'VARCHAR',
            defaultValue: '',
            isSystem: true
          },
          {
            autoIncrement: false,
            columnTypeLength: '',
            columnTypeScale: '',
            comment: '创建时间',
            ifPrimaryKey: false,
            isnull: 1,
            name: 'CREATE_TIME',
            type: 'DATETIME',
            defaultValue: 'SYSDATE',
            isSystem: true
          },
          {
            autoIncrement: false,
            columnTypeLength: '',
            columnTypeScale: '',
            comment: '修改时间',
            ifPrimaryKey: false,
            isnull: 1,
            name: 'UPDATE_TIME',
            type: 'DATETIME',
            defaultValue: 'SYSDATE',
            isSystem: true
          }
        ]
      }
      this.title = '数据资源注册'
      this.isDisabled = true
      this.dialogVisible = true
      this.setColumns(true)
      this.getDeptId()
      this.getDmColumnTypeOption()
      this.getDmSchemaOption()
    },
    addRow () {
      if (this.title === '编辑') {
        this.ruleForm.columns.push({
          dataLength: '',
          dataScale: '',
          comment: '',
          ifPrimaryKey: false,
          isnull: 1,
          name: '',
          type: '',
          defaultValue: '',
          isAdd: true
        })
      } else {
        this.ruleForm.columns.splice(this.ruleForm.columns.length - 2, 0, {
          autoIncrement: false,
          columnTypeLength: '',
          columnTypeScale: '',
          comment: '',
          ifPrimaryKey: false,
          isnull: 1,
          name: '',
          type: '',
          defaultValue: ''
        })
      }
      setTimeout(() => {
        var e = document.getElementById('columns').getElementsByClassName('el-table__body-wrapper')[0]
        e.scrollTop = e.scrollHeight
      })
    },
    handleChangeType (row, type) {
      row.type = type
      if (type !== '') {
        this.typeOptions.map(value => {
          if (value.name === type) {
            if (this.title === '编辑') {
              row.dataLength = value.defaultLength !== null ? value.defaultLength : ''
              row.dataScale = value.defaultScale !== null ? value.defaultScale : ''
            } else {
              row.columnTypeLength = value.defaultLength !== null ? value.defaultLength : ''
              row.columnTypeScale = value.defaultScale !== null ? value.defaultScale : ''
            }
          }
        })
      }
      this.ruleForm.columns = cloneDeep(this.ruleForm.columns)
    },
    sureField () {
      var data = this.ruleForm.columns
      for (let n = 0; n < data.length; n++) {
        for (const key in data[n]) {
          if (key === 'name' && data[n][key] === '') {
            this.$message.warning('字段名称不能为空')
            return
          }
          if (key === 'type' && data[n][key] === '') {
            this.$message.warning('字段类型不能为空')
            return
          }
          if (data[n].type) {
            var option
            this.typeOptions.map(value => {
              if (value.name === data[n].type) {
                option = value
              }
            })
            if (option.length) {
              if (data[n].columnTypeLength === '') {
                this.$message.warning(option.name + '字段类型精度不能为空')
                return
              }
            }
            if (option.scale) {
              if (data[n].columnTypeScale === '') {
                this.$message.warning(option.name + '字段类型标度不能为空')
                return
              }
            }
          }
        }
      }
    },
    handleChange (row, value, type) {
      let is = false
      if (type === '自增') {
        this.ruleForm.columns.map(item => {
          if (value) {
            item.autoIncrement = false
          }
        })
        row.autoIncrement = value
        if (value) {
          this.ruleForm.columns.map(item => {
            item.ifPrimaryKey = false
          })
          row.ifPrimaryKey = !!value
        }
      } else {
        row[type] = value
      }
      this.ruleForm.columns.map(item => {
        if (item.autoIncrement) {
          is = true
        }
      })
      this.isDisabled = is
    },
    getAllTables () {
      this.allDataTable = []
      getAllTables().then(data => {
        if (data.code === 0) {
          getDmSchemaOption().then(item => {
            for (const key in data.data) {
              var name = ''
              item.data.map(value => {
                if (value.schema === key) {
                  name = value.name
                }
              })
              this.allDataTable.push({
                schemaName: '',
                tableName: name ? `${key} ( ${name} ) ` : key,
                children: data.data[key]
              })
            }
          })

          this.search()
        }
      })
    },
    handleClick (val) {
      if (val.schemaName) {
        this.$emit('getDetail', val.schemaName, val.tableName)
      }
    },
    handleEdit (val) {
      this.$emit('edit', val.schemaName, val.tableName)
    },
    cancel (type) {
      if (type === 1) {
        this.$refs.ruleForm.clearValidate()
        this.dialogVisible = false
        this.ruleForm = {
          name: '',
          comment: '',
          columns: []
        }
      } else {
        if (this.ruleForm.columns.length) {
          this.$msgbox
            .confirm(
              '点击取消会清空当前数据，是否确认当前操作？',
              '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }
            )
            .then(() => {
              this.innerVisible = false
              this.ruleForm.columns = [
                {
                  autoIncrement: true,
                  columnTypeLength: '',
                  columnTypeScale: '',
                  comment: '数据自增ID',
                  ifPrimaryKey: true,
                  isnull: 0,
                  name: 'ID',
                  type: 'INT'
                }
              ]
              this.isDisabled = true
            })
        } else {
          this.innerVisible = false
        }
      }
    },
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          var data = this.ruleForm.columns
          for (let n = 0; n < data.length; n++) {
            for (const key in data[n]) {
              if (key === 'name' && data[n][key] === '') {
                this.$message.warning('字段名称不能为空')
                return
              }
              if (key === 'type' && data[n][key] === '') {
                this.$message.warning('字段类型不能为空')
                return
              }
              if (data[n].type) {
                var option
                this.typeOptions.map(value => {
                  if (value.name === data[n].type) {
                    option = value
                  }
                })
                if (option.length) {
                  if (data[n].columnTypeLength === '') {
                    this.$message.warning(option.name + '字段类型精度不能为空')
                    return
                  }
                }
                if (option.scale) {
                  if (data[n].columnTypeScale === '') {
                    this.$message.warning(option.name + '字段类型标度不能为空')
                    return
                  }
                }
              }
            }
          }
          if (this.title === '编辑') {
            this.getAllSql()
          } else {
            this.createTableByMetaAndSaveMetaInfo()
          }
        } else {
          return false
        }
      })
    },
    getDmColumnTypeOption () {
      getDmColumnTypeOption().then(data => {
        if (data.code === 0) {
          this.typeOptions = data.data ? data.data : []
        }
      })
    },
    createTableByMetaAndSaveMetaInfo () {
      createTableByMetaAndSaveMetaInfo({
        columns: this.ruleForm.columns,
        comment: this.ruleForm.Cname + '$' + this.ruleForm.comment,
        name: this.tableNameStart + this.ruleForm.name,
        schemaName: this.ruleForm.schemaName
      }).then(data => {
        if (data.code === 0) {
          this.$message.success('创建成功')
          this.dialogVisible = false
          this.getAllTables()
        }
      })
    },
    dropTableInNoData (tableName, schemaName, event, row) {
      event.stopPropagation()
      if (row.schemaName === 'JD_SYSTEM') {
        this.$message.warning('系统模式下的表禁止删除')
        return
      }
      this.$msgbox
        .confirm(
          '是否确认删除（一旦删除无法恢复）？',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }
        )
        .then(() => {
          dropTableInNoData({ tableName, schemaName }).then(data => {
            if (data.code === 0) {
              this.$message.success('删除成功')
              this.getAllTables()
            }
          })
        })
    },
    deleteOne (index, row) {
      if (this.title === '编辑') {
        if (!row.isAdd) {
          this.deleteColums.push(`alter table "${this.ruleForm.schemaName}"."${this.ruleForm.name}"  drop column "${row.row.oName}"`)
        }
      }
      this.ruleForm.columns.splice(index, 1)
    },

    getDmSchemaOption () {
      getDmSchemaOption().then(data => {
        if (data.code === 0) {
          this.dmOptions = []
          data.data.map(value => {
            if (value.show) {
              this.dmOptions.push(value)
            }
          })
          this.dmOptions.map(value => {
            if (value.name === '公共模式') {
              this.ruleForm.schemaName = value.schema
              this.tableNameStart = value.tableNameStart
            }
          })
          this.ruleForm.schemaName = this.ruleForm.schemaName ? this.ruleForm.schemaName : this.dmOptions[0].schema
          this.tableNameStart = this.tableNameStart ? this.tableNameStart : this.dmOptions[0].tableNameStart
        }
      })
    },

    filterNode (value, data) {
      if (!value) return true
      return data.tableName.indexOf(value) !== -1
    },

    renderContent (h, { node, data, store }) {
      const shelf = this
      if (data.schemaName) {
        return (
          <div class="detail">
            <div class="name">
              <el-tooltip class="item" effect="light" placement="bottom-start">
                <div slot="content">表名：{data.tableName}<br/>描述：{data.comment}</div>
                <span><i class="el-icon-document iconColor"></i> {data.tableName}</span>
              </el-tooltip>
            </div>
            <div class="tool">
              <i class="el-icon-edit" style="color: #1490FF;margin-right:10px" v-has="resourceManage:resourceManage:edit" onClick={(event) => { shelf.edit(data.tableName, data.schemaName, event, data) }}></i>
              <i class="el-icon-delete" style="color: red" v-has="resourceManage:resourceManage:delete" onClick={(event) => { shelf.dropTableInNoData(data.tableName, data.schemaName, event, data) }}></i>

            </div>
          </div>
        )
      } else {
        return (<span><i class="el-icon-document iconColor" ></i> {data.tableName}</span>)
      }
    },

    schemaNameChange () {
      this.dmOptions.map(value => {
        if (value.schema === this.ruleForm.schemaName) {
          this.tableNameStart = value.tableNameStart
        }
      })
    },

    getDeptId () {
      getDeptId().then(data => {
        if (data.code === 0) {
          this.ruleForm.columns[1].defaultValue = `'${data.data}'`
        }
      })
    },

    setName () {
      this.ruleForm.name = this.ruleForm.name.toUpperCase()
    },

    move (index, isUp) {
      if (isUp) {
        if (index > 2) {
          this.ruleForm.columns.splice(index - 1, 0, this.ruleForm.columns[index])
          this.ruleForm.columns.splice(index + 1, 1)
        }
      } else {
        if (index < this.ruleForm.columns.length - 3) {
          this.ruleForm.columns.splice(index + 2, 0, this.ruleForm.columns[index])
          this.ruleForm.columns.splice(index, 1)
        }
      }
    },

    edit (tableName, schemaName, event, row) {
      event.stopPropagation()
      this.deleteColums = []
      this.setColumns()
      if (row.schemaName === 'JD_SYSTEM') {
        this.$message.warning('系统模式下的表禁止编辑')
        return
      }
      this.getDmColumnTypeOption()
      getDmSchemaOption().then(data => {
        if (data.code === 0) {
          this.dmOptions = []
          data.data.map(value => {
            if (value.show) {
              this.dmOptions.push(value)
            }
          })
          getColumnInfosByTableName({
            tableName,
            schemaName
          }).then(data => {
            if (data.code === 0) {
              this.dialogVisible = true
              var list = row.comment !== '' && row.comment !== null ? row.comment.split('$') : ['']
              this.ruleForm.name = row.tableName
              this.ruleForm.comment = row.comment.slice(row.comment.indexOf('$') + 1, row.comment.length)
              this.ruleForm.schemaName = row.schemaName
              this.ruleForm.Cname = list[0]
              this.title = '编辑'
              this.isDisabled = true
              this.ruleForm.columns = data.data
              this.ruleForm.columns.map(value => {
                value.oName = value.name
                value.isAdd = false
                if (this.isSystem.findIndex(v => v === value.name) !== -1) {
                  value.isSystem = true
                }
              })
              setTimeout(() => {
                this.$refs.ruleForm.clearValidate()
              })
            }
          })
        }
      })
    },

    setColumns (is) {
      const shelf = this
      if (is) {
        this.columns = [
          {
            label: '自增',
            prop: 'fieldName',
            width: 60,
            render (h, row) {
              return h(checkBox, {
                props: {
                  check: row.row.autoIncrement,
                  type: 'radio',
                  row: row.row
                },
                on: {
                  handleChange: (type) => {
                    shelf.handleChange(row.row, type, '自增')
                  }
                }
              })
            }
          },
          {
            label: '主键',
            width: 60,
            prop: 'fieldName',
            render (h, row) {
              return h(checkBox, {
                props: {
                  check: row.row.ifPrimaryKey,
                  disabled: true,
                  row: row.row
                },
                on: {
                  handleChange: (type) => {
                    shelf.handleChange(row.row, type, 'ifPrimaryKey')
                  }
                }
              })
            }
          },
          {
            label: '字段名称',
            prop: 'name',
            render (h, row) {
              return h(inputBox, {
                props: {
                  input: row.row.name,
                  row: row.row,
                  isUpperCase: true
                },
                on: {
                  handleChange: (type) => {
                    shelf.handleChange(row.row, type, 'name')
                  }
                }
              })
            }
          },
          {
            label: '字段类型',
            width: 150,
            prop: 'type',
            render (h, row) {
              return h(selectOptions, {
                props: {
                  type: row.row.type,
                  options: shelf.typeOptions,
                  row: row.row
                },
                on: {
                  handleChangeType: (type) => {
                    shelf.handleChangeType(row.row, type, 'type')
                  }
                }
              })
            }
          },
          {
            label: '非空',
            width: 60,
            prop: 'isnull',
            render (h, row) {
              return h(checkBox, {
                props: {
                  check: row.row.isnull === 0,
                  row: row.row,
                  disabled: !!row.row.isSystem
                },
                on: {
                  handleChange: (type) => {
                    shelf.handleChange(row.row, type ? 0 : 1, 'isnull')
                  }
                }
              })
            }
          },
          {
            label: '精度',
            width: 160,
            prop: 'columnTypeLength',
            render (h, row) {
              return h(numberInput, {
                props: {
                  num: row.row.columnTypeLength,
                  row: row.row,
                  typeOptions: shelf.typeOptions,
                  column: '精度'
                },
                on: {
                  handleChange: (type) => {
                    shelf.handleChange(row.row, type, 'columnTypeLength')
                    shelf.ruleForm.columns = cloneDeep(shelf.ruleForm.columns)
                  }
                }
              })
            }
          },
          {
            label: '标度',
            width: 160,
            prop: 'columnTypeScale',
            render (h, row) {
              return h(numberInput, {
                props: {
                  num: row.row.columnTypeScale,
                  row: row.row,
                  typeOptions: shelf.typeOptions,
                  column: '标度'
                },
                on: {
                  handleChange: (type) => {
                    shelf.handleChange(row.row, type, 'columnTypeScale')
                    shelf.ruleForm.columns = cloneDeep(shelf.ruleForm.columns)
                  }
                }
              })
            }
          },
          {
            label: '字段注释',
            prop: 'comment',
            render (h, row) {
              return h(inputBox, {
                props: {
                  input: row.row.comment,
                  row: row.row
                },
                on: {
                  handleChange: (type) => {
                    shelf.handleChange(row.row, type, 'comment')
                  }
                }
              })
            }
          },
          {
            label: '默认值',
            prop: 'defaultValue',
            render (h, row) {
              return h(inputBox, {
                props: {
                  input: row.row.defaultValue,
                  row: row.row
                },
                on: {
                  handleChange: (type) => {
                    shelf.handleChange(row.row, type, 'defaultValue')
                  }
                }
              })
            }
          },
          {
            label: '操作',
            width: 120,
            prop: 'comment',
            render (h, row) {
              return (
                <div>
                  <el-button type="text" onClick={() => { shelf.deleteOne(row.ind) }} disabled={!!row.row.isSystem}>删除</el-button>
                  <el-button type="text" onClick={() => { shelf.move(row.ind, true) }} disabled={!!row.row.isSystem}>上移</el-button>
                  <el-button type="text" onClick={() => { shelf.move(row.ind, false) }} disabled={!!row.row.isSystem}>下移</el-button>
                </div>
              )
            }
          }
        ]
      } else {
        this.columns = [
          {
            label: '主键',
            width: 60,
            prop: 'fieldName',
            render (h, row) {
              return h(checkBox, {
                props: {
                  check: row.row.ifPrimaryKey,
                  disabled: true,
                  row: row.row
                },
                on: {
                  handleChange: (type) => {
                    shelf.handleChange(row.row, type, 'ifPrimaryKey')
                  }
                }
              })
            }
          },
          {
            label: '字段名称',
            prop: 'name',
            render (h, row) {
              return h(inputBox, {
                props: {
                  input: row.row.name,
                  row: row.row,
                  isUpperCase: true
                },
                on: {
                  handleChange: (type) => {
                    row.row.name = type
                    if (row.row.isAdd) {
                      shelf.setAddSql(row.row)
                    } else {
                      row.row.mName = `alter table "${shelf.ruleForm.schemaName}"."${shelf.ruleForm.name}" alter column "${row.row.oName}" rename to "${type}"`
                    }
                  }
                }
              })
            }
          },
          {
            label: '字段类型',
            width: 150,
            prop: 'type',
            render (h, row) {
              return h(selectOptions, {
                props: {
                  type: row.row.type,
                  options: shelf.typeOptions,
                  row: row.row
                },
                on: {
                  handleChangeType: (type) => {
                    row.row.type = type
                    if (type !== '') {
                      shelf.typeOptions.map(value => {
                        if (value.name === type) {
                          row.row.dataLength = value.defaultLength !== null ? value.defaultLength : ''
                          row.row.dataScale = value.defaultScale !== null ? value.defaultScale : ''
                        }
                      })
                    }
                    if (row.row.isAdd) {
                      shelf.setAddSql(row.row)
                    } else {
                      var l = row.row.dataLength === null || row.row.dataLength === '' ? type : row.row.dataScale === null || row.row.dataScale === '' ? `${type}(${row.row.dataLength})` : `${type}(${row.row.dataLength},${row.row.dataScale})`
                      row.row.mType = `alter table "${shelf.ruleForm.schemaName}"."${shelf.ruleForm.name}" modify "${row.row.oName}" ${l}`
                    }
                    shelf.ruleForm.columns = cloneDeep(shelf.ruleForm.columns)
                  }
                }
              })
            }
          },
          {
            label: '非空',
            width: 60,
            prop: 'isnull',
            render (h, row) {
              return h(checkBox, {
                props: {
                  check: row.row.isnull === 0,
                  row: row.row,
                  disabled: !!row.row.isSystem
                },
                on: {
                  handleChange: (type) => {
                    row.row.isnull = type ? 0 : 1
                    if (row.row.isAdd) {
                      shelf.setAddSql(row.row)
                    } else {
                      row.row.mIsnull = `alter table "${shelf.ruleForm.schemaName}"."${shelf.ruleForm.name}" alter column "${row.row.oName}" set ${type ? 'not null' : 'null'}`
                    }
                  }
                }
              })
            }
          },
          {
            label: '精度',
            width: 160,
            prop: 'columnTypeLength',
            render (h, row) {
              return h(numberInput, {
                props: {
                  num: row.row.dataLength,
                  row: row.row,
                  typeOptions: shelf.typeOptions,
                  column: '精度'
                },
                on: {
                  handleChange: (type) => {
                    row.row.dataLength = type
                    if (row.row.isAdd) {
                      shelf.setAddSql(row.row)
                    } else {
                      var l = row.row.dataLength === null || row.row.dataLength === '' ? row.row.type : row.row.dataScale === null || row.row.dataScale === '' ? `${row.row.type}(${row.row.dataLength})` : `${row.row.type}(${row.row.dataLength},${row.row.dataScale})`
                      row.row.mType = `alter table "${shelf.ruleForm.schemaName}"."${shelf.ruleForm.name}" modify "${row.row.oName}" ${l}`
                    }
                    shelf.ruleForm.columns = cloneDeep(shelf.ruleForm.columns)
                  }
                }
              })
            }
          },
          {
            label: '标度',
            width: 160,
            prop: 'columnTypeScale',
            render (h, row) {
              return h(numberInput, {
                props: {
                  num: row.row.dataScale,
                  row: row.row,
                  typeOptions: shelf.typeOptions,
                  column: '标度'
                },
                on: {
                  handleChange: (type) => {
                    row.row.dataScale = type
                    if (row.row.isAdd) {
                      shelf.setAddSql(row.row)
                    } else {
                      var l = row.row.dataLength === null || row.row.dataLength === '' ? row.row.type : row.row.dataScale === null || row.row.dataScale === '' ? `${row.row.type}(${row.row.dataLength})` : `${row.row.type}(${row.row.dataLength},${row.row.dataScale})`
                      row.row.mType = `alter table "${shelf.ruleForm.schemaName}"."${shelf.ruleForm.name}" modify "${row.row.oName}" ${l}`
                    }
                    shelf.ruleForm.columns = cloneDeep(shelf.ruleForm.columns)
                  }
                }
              })
            }
          },
          {
            label: '字段注释',
            prop: 'comment',
            render (h, row) {
              return h(inputBox, {
                props: {
                  input: row.row.comment,
                  row: row.row
                },
                on: {
                  handleChange: (type) => {
                    row.row.comment = type
                    if (row.row.isAdd) {
                      shelf.setAddSql(row.row)
                    } else {
                      row.row.mComment = `comment on column "${shelf.ruleForm.schemaName}"."${shelf.ruleForm.name}"."${row.row.oName}" is '${type.replace(/'/g, '\'\'')}'`
                    }
                  }
                }
              })
            }
          },
          {
            label: '默认值',
            prop: 'defaultValue',
            render (h, row) {
              return h(inputBox, {
                props: {
                  input: row.row.defaultValue,
                  row: row.row
                },
                on: {
                  handleChange: (type) => {
                    row.row.defaultValue = type
                    if (row.row.isAdd) {
                      shelf.setAddSql(row.row)
                    } else {
                      if (type === '') {
                        row.row.mDefaultValue = `alter table "${shelf.ruleForm.schemaName}"."${shelf.ruleForm.name}" alter column "${row.row.oName}" drop default`
                      } else {
                        row.row.mDefaultValue = `alter table "${shelf.ruleForm.schemaName}"."${shelf.ruleForm.name}" alter column "${row.row.oName}" set default (${type})`
                      }
                    }
                  }
                }
              })
            }
          },
          {
            label: '操作',
            width: 120,
            prop: 'comment',
            render (h, row) {
              return (
                <div>
                  <el-button type="text" onClick={() => { shelf.deleteOne(row.ind, row) }} disabled={!!row.row.isSystem}>删除</el-button>
                </div>
              )
            }
          }
        ]
      }
    },

    changTableName () {
      this.modifyTableName = `comment on table "${this.ruleForm.schemaName}"."${this.ruleForm.name}" is '${this.ruleForm.Cname}$${this.ruleForm.comment}'`
    },

    setAddSql (row) {
      var l = row.dataLength === null || row.dataLength === '' ? row.type : row.dataScale === null || row.dataScale === '' ? `${row.type}(${row.dataLength})` : `${row.type}(${row.dataLength},${row.dataScale})`
      var d = row.defaultValue !== '' ? ` default(${row.defaultValue})` : ''
      var n = row.isnull === 0 ? ' not null' : ' null'
      var t = l + d + n
      row.add = `alter table "${this.ruleForm.schemaName}"."${this.ruleForm.name}" add column("${row.name}" ${t})`
      row.mComment = row.comment !== '' ? `comment on column "${this.ruleForm.schemaName}"."${this.ruleForm.name}"."${row.name}" is '${row.comment.replace(/'/g, '\'\'')}'` : ''
    },

    getAllSql () {
      var list = [...this.deleteColums]
      if (this.modifyTableName) {
        list.push(this.modifyTableName)
      }
      this.ruleForm.columns.map(value => {
        if (value.isAdd) {
          if (value.add) {
            list.push(value.add)
          }
          if (value.mComment) {
            list.push(value.mComment)
          }
        } else {
          if (value.mType) {
            list.push(value.mType)
          }
          if (value.mIsnull) {
            list.push(value.mIsnull)
          }
          if (value.mComment) {
            list.push(value.mComment)
          }
          if (value.mDefaultValue) {
            list.push(value.mDefaultValue)
          }
          if (value.mName) {
            list.push(value.mName)
          }
        }
      })
      this.sqlList = list.map(val => val + ';')
      if (this.sqlList.length) {
        this.executeDDL()
      } else {
        this.$message.warning('无任何修改')
      }
    },

    executeDDL () {
      this.loading = true
      executeDDL(this.sqlList).then(data => {
        this.loading = false
        if (data.code === 0) {
          this.dialogVisible = false
          this.$message.success('修改成功')
          this.getAllTables()
        }
      }).catch(() => {
        this.loading = false
      })
    }
  },
  watch: {
    input1 () {
      this.search()
    },
    'ruleForm.name': 'setName'
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style scoped lang="scss">
@import "@/projectModule/assets/css/basic-color.scss";
.main{
  height: 100%;
  box-sizing: border-box;
  border: solid 1px $color-border;
  width: 300px;
  .title{
    background-color: #F9F9FB;
    padding: 0 10px;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    border-bottom: solid 1px $color-border;
  }
  .search{
    padding: 10px;
  }
  .content{
    height: calc(100% - 84px);
    overflow-y: auto;
    .active{
      background-color: $color-secondary;
    }
    .detail{
      padding: 10px;
      font-size: 14px;
      display: flex;
      cursor: pointer;
      width: 80%;
      &:hover{
        background-color: $color-secondary;
      }
      .name{
        flex: 1;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        i{
          color: $color-primary;
        }
      }
      .tool{
        width: 20px;
        i{
          color: $color-primary;
          cursor: pointer;
        }
        i:nth-child(1){
          color: red;
        }
      }
    }
  }
  .add {
    line-height: 30px;
    border: 1px dashed gainsboro;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
@import "@/projectModule/assets/css/basic-color.scss";
.iconColor{
  color: $color-primary;
}
.detail{
  padding: 10px;
  font-size: 14px;
  display: flex;
  cursor: pointer;
  width: 80%;
    .name{
      flex: 1;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      i{
        color: $color-primary;
      }
    }
    .tool{
      width: 30px;
      i{
        color: $color-primary;
        cursor: pointer;
      }
      i:nth-child(1){
        color: red;
      }
    }
  }
</style>
