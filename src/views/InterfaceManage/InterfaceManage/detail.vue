<template>
    <div style="height: 100%" id="tabs" v-kr-loading="loading">
      <kr-search @keyup.enter.native="query">
        <kr-search-item label="接口标识:" :labelWidth="85">
          <el-input v-model="search.identityName" placeholder="请输入"></el-input>
        </kr-search-item>
        <kr-search-item label="接口名称:" :labelWidth="85">
          <el-input v-model="search.name" placeholder="请输入"></el-input>
        </kr-search-item>
        <kr-search-item label="描述:" :labelWidth="85">
          <el-input v-model="search.describe" placeholder="请输入"></el-input>
        </kr-search-item>
        <kr-search-item>
          <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
          <el-button icon="el-icon-refresh-right" @click="reset">重置</el-button>
        </kr-search-item>
      </kr-search>
      <div style="margin-top: 20px">
        <el-button type="primary" icon="el-icon-plus" @click="add" v-has="'InterfaceManage:InterfaceManage:add'">新增</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="edit" v-has="'InterfaceManage:InterfaceManage:edit'">编辑</el-button>
        <el-button type="primary" @click="copy" v-has="'InterfaceManage:InterfaceManage:copy'"><i class="iconfont iconfuzhi" style="font-size: 13px"></i> 复制</el-button>
        <el-button type="primary" @click="enable" v-has="'InterfaceManage:InterfaceManage:enable'"><i class="iconfont iconqiyong" style="font-size: 13px"></i> 启用({{selectRows.length}})</el-button>
        <el-button type="primary" @click="forbidden" v-has="'InterfaceManage:InterfaceManage:enable'"><i class="iconfont iconjinyong" style="font-size: 13px"></i> 禁用({{selectRows.length}})</el-button>
        <el-button type="primary" @click="interfaceDoc" v-has="'InterfaceManage:InterfaceManage:interfaceDoc'"><i class="iconfont iconfuzhi" style="font-size: 13px"></i> 接口文档</el-button>
        <el-button icon="el-icon-delete" type="danger" plain @click="deleteData" v-has="'InterfaceManage:InterfaceManage:delete'">删除({{selectRows.length}})</el-button>
        <el-button @click="empty" ><i class="iconfont iconshuazi-1" style="font-size: 12px"></i>清空({{selectRows.length}})</el-button>
        <kr-el-table
          :key="id"
          style="margin-top: 20px"
          :options="options"
          :columns="columns"
          :rows="table"
          :total="total"
          :pageNum="current"
          @row-click="rowClick"
          @selection-change="selectionChange"
          @on-page-change="onPageChange"
          ref="table"/>
        <el-dialog
          :title="title"
          :visible.sync="dialogVisible"
          @close="cancel"
          :append-to-body="false"
          width="1200px">
          <el-dialog
            :width="innerTitle=='详情'?'1000px':'800px'"
            :title="innerTitle"
            :visible.sync="innerVisible"
            append-to-body>
            <div v-if="innerTitle==='编辑sql'">
              <textarea ref="mycode" placeholder="按Ctrl键进行代码提示" class="codesql" style="height:200px;width:600px;"/>
            </div>
            <div v-else-if="innerTitle==='配置参数'">
              <el-form label-width="200px" class="demo-ruleForm">
                <el-form-item v-for="(val, key) in parameterMap" :key="key" :label="key">
                  <el-input v-model="parameterMap[key]"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div v-else-if="innerTitle==='详情'">
              <kr-el-table
                :options="sqlOptions"
                :columns="sqlColumns"
                :rows="sqlTable"
                :total="sqlTotal"
                :pageNum="sqlCurrent"
                @on-page-change="sqlOnPageChange"/>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="submitSql" v-if="innerTitle!=='详情'">确认提交</el-button>
              <el-button @click="innerVisible=false">取 消</el-button>
            </div>
          </el-dialog>
          <div id="dialog" style="overflow-y: auto;overflow-x: hidden">
            <template v-if="title==='复制'">
              <kr-title-box title="接口基本信息">
                <el-form :model="copyRuleForm" :rules="copyRules" ref="copyRuleForm" label-width="100px" class="demo-ruleForm">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="目录：" prop="directoryId">
                        <el-cascader
                          v-model="copyRuleForm.directoryId"
                          style="width: 220px"
                          :options="tree"
                          ref="tree"
                          @change="treeChange"
                          :props="{ checkStrictly: true,label:'name',value:'id',emitPath:false }"
                          clearable></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12"><el-form-item label="接口标识：" prop="identityName">
                      <el-input v-model="unitCode" style="width: 100px" disabled :clearable="false"></el-input> —
                      <el-input v-model="copyRuleForm.identityName" placeholder="请输入" style="width: 150px"></el-input>
                      <el-button type="primary" style="float: right" @click="genIdentityName">自动获取</el-button>
                    </el-form-item></el-col>
                    <el-col :span="12">
                      <el-form-item label="接口名称：" prop="name">
                        <el-input v-model="copyRuleForm.name" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="描述：" prop="describe">
                        <el-input v-model="copyRuleForm.describe" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </kr-title-box>
            </template>
            <template v-else>
              <kr-title-box title="接口基本信息">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="目录：" prop="directoryId">
                        <el-cascader
                          v-model="ruleForm.directoryId"
                          style="width: 220px"
                          :options="tree"
                          @change="treeChange"
                          :props="{ checkStrictly: true,label:'name',value:'id', emitPath:false }"
                          clearable></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12"><el-form-item label="接口标识：" prop="identityName">
                      <el-input v-model="unitCode" style="width: 100px" disabled :clearable="false"></el-input> —
                      <el-input v-model="ruleForm.identityName" placeholder="请输入" style="width: 150px"></el-input>
                      <el-button type="primary" style="float: right" @click="genIdentityName">自动获取</el-button>
                    </el-form-item></el-col>
                    <el-col :span="12"><el-form-item label="接口名称：" prop="name">
                      <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item></el-col>
                    <el-col :span="12"><el-form-item label="描述：" prop="describe">
                      <el-input v-model="ruleForm.describe" placeholder="请输入"></el-input>
                    </el-form-item></el-col>
                    <el-col :span="12"><el-form-item label="接口类型：" prop="type">
                      <el-select v-model="ruleForm.type" multiple placeholder="请选择" style="width: 100%" @change="typeChange">
                        <el-option
                          v-for="item in typeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item></el-col>
                  </el-row>
                </el-form>
              </kr-title-box>
              <kr-title-box title="可视化编辑器"
                            v-loading="isEdit"
                            element-loading-text="SQL编辑后不可修改"
                            element-loading-spinner="1"
                            element-loading-background="rgba(0, 0, 0, 0.5)">
                <div style="position: relative">
                  选择模式：<el-select v-model="ruleForm.schemaName" placeholder="请选择" style="width: 200px" @change="schemaNameChange">
                  <el-option
                    v-for="item in dmOptions"
                    :key="item.schema"
                    :label="item.name"
                    :value="item.schema">
                  </el-option>
                </el-select>
                  选择表：<el-select v-model="ruleForm.shareTableName" placeholder="请选择" style="width: 200px;margin-bottom: 20px" @change="tableChange">
                  <el-option
                    v-for="item in allTables[ruleForm.schemaName]"
                    :key="item.tableName"
                    :label="item.tableName"
                    :value="item.tableName">
                  </el-option>
                </el-select>
                  <el-button type="primary" style="position: absolute;top:55px;right: 0px;z-index: 1" @click="confirmSet">生成SQL</el-button>
                </div>
                <el-tabs v-model="activeName" type="card">
                  <el-tab-pane :label="'选择字段('+fieldTable.length+')'" name="first">
                    <div>
                      <kr-el-table
                        style="margin-top: 20px"
                        :columns="fieldColumns"
                        :rows="fieldTable"
                        :total="0"
                        :pageNum="current"
                        @selection-change="selectionChange"/>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane :label="'添加条件('+conditionTable.length+')'" name="second">
                    <div
                      v-loading="false"
                      element-loading-text="SQL编辑后不可修改"
                      element-loading-spinner="el-icon-folder-delete"
                      element-loading-background="rgba(0, 0, 0, 0.5)">
                      <kr-el-table
                        :columns="conditionColumns"
                        :rows="conditionTable"
                        :total="0"
                        :pageNum="current"/>
                      <div class="add" @click="addRow" style="line-height: 40px;border: 1px dashed gainsboro;border-radius: 3px;text-align: center;cursor: pointer;margin-top: 20px">
                        +添加条件
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </kr-title-box>
              <kr-title-box title="SQL接口设置" style="margin-top: 20px">
                <div v-for="(item,index) in sqlList" :key="item.value" style="margin-top: 20px">
                  {{item.title}}：<el-input placeholder="请输入" v-model="item.sql" style="width: 600px" disabled></el-input>
                  <el-button type="primary" style="float: right;margin-left: 10px;margin-right: 10px"  @click="openCodeMirror(item.sql,index)">SQL编辑</el-button>
                  <el-button type="success" style="float: right" @click="test(item.sql,item.type)">接口测试</el-button>
                </div>
              </kr-title-box>
            </template>
          </div>
          <div slot="footer" class="dialog-footer" v-if="title!='查看详情'">
            <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="接口文档"
          :visible.sync="docDialogVisible"
          :append-to-body="false"
          width="1000px">
          <div id="dialog1" style="overflow-y: auto;overflow-x: hidden">
            <h1>{{doc.title}}</h1>
            <h2>接口基本信息</h2>
            <h3>接口标识<span class="detail">{{doc.identityName}}</span></h3>
            <h3>接口名称<span class="detail">{{doc.name}}</span></h3>
            <h3>接口描述 <span class="detail">{{doc.describe}}</span></h3>
            <h3>接口地址(JSON格式)<span class="detail">{{doc.jsonUrl}}</span></h3>
            <h3>接口地址(XML格式)<span class="detail">{{doc.xmlUrl}}</span></h3>
            <h3>请求方式<span class="detail">{{doc.requestMethod}}</span></h3>
            <h3>接口密码<span class="detail">{{doc.password}}</span></h3>
            <h3>接口类型<span class="detail">{{doc.supportInterfaceType.join(' ')}}</span></h3>
            <h2>公共参数</h2>
            <kr-el-table
              :options="{showIndex: false}"
              :columns="paramsColumns"
              :rows="doc.paramInfos"
              :total="0"/>
            <template v-if="doc.selectParams">
              <h2>查询接口说明</h2>
              <kr-el-table
                :columns="paramsColumns"
                :rows="doc.selectParams.params"
                :total="0"/>
              <h3>POST请求示例</h3>
              <pre style="padding-left: 20px">{{doc.selectParams.postRequestExample}}</pre>
              <h3>GET请求示例</h3>
              <h4>返回JSON格式: <br/><span class="detail">{{doc.selectParams.getJsonRequestExample}}</span></h4>
              <h4>返回XML格式: <br/><span class="detail">{{doc.selectParams.getXmlRequestExample}}</span></h4>
            </template>
            <template v-if="doc.insertParams">
              <h2>插入接口说明</h2>
              <kr-el-table
                :options="{showIndex: false}"
                :columns="paramsColumns"
                :rows="doc.insertParams.params"
                :total="0"/>
              <h3>POST请求示例</h3>
              <pre style="padding-left: 20px">{{doc.insertParams.postRequestExample}}</pre>
              <h3>GET请求示例</h3>
              <h4>返回JSON格式: <br/><span class="detail">{{doc.insertParams.getJsonRequestExample}}</span></h4>
              <h4>返回XML格式: <br/><span class="detail">{{doc.insertParams.getXmlRequestExample}}</span></h4>
            </template>
            <template v-if="doc.updateParams">
              <h2>修改接口说明</h2>
              <kr-el-table
                :options="{showIndex: false}"
                :columns="paramsColumns"
                :rows="doc.updateParams.params"
                :total="0"/>
              <h3>POST请求示例</h3>
              <pre style="padding-left: 20px">{{doc.updateParams.postRequestExample}}</pre>
              <h3>GET请求示例</h3>
              <h4>返回JSON格式: <br/><span class="detail">{{doc.updateParams.getJsonRequestExample}}</span></h4>
              <h4>返回XML格式: <br/><span class="detail">{{doc.updateParams.getXmlRequestExample}}</span></h4>
            </template>
            <template v-if="doc.deleteParams">
              <h2>删除接口说明</h2>
              <kr-el-table
                :options="{showIndex: false}"
                :columns="paramsColumns"
                :rows="doc.deleteParams.params"
                :total="0"/>
              <h3>POST请求示例</h3>
              <pre style="padding-left: 20px">{{doc.deleteParams.postRequestExample}}</pre>
              <h3>GET请求示例</h3>
              <h4>返回JSON格式: <br/><span class="detail">{{doc.deleteParams.getJsonRequestExample}}</span></h4>
              <h4>返回XML格式: <br/><span class="detail">{{doc.deleteParams.getXmlRequestExample}}</span></h4>
            </template>

            <h2>返回结果</h2>
            <kr-el-table
              :options="{showIndex: false}"
              :columns="paramsColumns"
              :rows="doc.responseParam"
              :total="0"/>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="exportReport">下载文档</el-button>
            <el-button @click="docDialogVisible=false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
import { cloneDeep } from 'loadsh'
import { getDmSchemaOption } from '@/projectModule/api/resourceManage/resourceManage.js'
import { queryInterface } from '@/projectModule/api/InterfaceManage/InterfaceCatalogManage.js'
import { getInterfaceList, addInterface, getAllTables, getColumnInfosByTableName, genIdentityName, genSql, testDataInterface, queryDetail, copyInterface, updateInterface, updateBatchEnable, deleteBatchEnable, queryInterfaceDoc } from '@/projectModule/api/InterfaceManage/InterfaceManage.js'
import checkBox from './components/check-box.vue'
import state from './components/state.vue'
import fieldSelect from './components/fieldSelect.vue'
import conditionSelect from './components/conditionSelect.vue'
import contentValue from './components/contentValue.vue'
import tag from './components/tag.vue'

import 'codemirror/theme/ambiance.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'

import * as CodeMirror from 'codemirror'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/sql-hint.js'
import sqlFormatter from 'sql-formatter'

import PizZip from 'pizzip'
import 'pizzip/dist/pizzip-utils'
import docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'

export default {
  name: 'detail',
  data () {
    const shelf = this
    var validate = (rule, value, callback) => {
      var regex = /^[A-Z][A-Z0-9_]{2,12}$/
      if (value.trim() === '') {
        callback(new Error('请输入接口标识'))
      } else {
        if (regex.test(value)) {
          callback()
        } else {
          callback(new Error('只能包含大写字母、数字、下划线（以字母开头，长度最大14）'))
        }
      }
    }
    return {
      id: new Date().getTime(),
      dmOptions: [],
      fielsOptions: [],
      search: {
        describe: '',
        directoryId: '',
        identityName: '',
        name: ''
      },
      options: {
        showIndex: true,
        showSelection: true,
        'max-height': 1000
      },
      sqlOptions: {
        showIndex: true,
        'max-height': 1000
      },
      tree: [],
      table: [],
      fieldTable: [],
      conditionTable: [],
      columns: [
        {
          label: '接口标识',
          prop: 'identityName'
        },
        {
          label: '接口名称',
          prop: 'name'
        },
        {
          label: '描述',
          prop: 'describe'
        },
        {
          label: '接口类型',
          render (h, row) {
            var name = []
            if (row.row.isQuery) {
              name.push('查询')
            }
            if (row.row.isDelete) {
              name.push('删除')
            }
            if (row.row.isUpdate) {
              name.push('更新')
            }
            if (row.row.insertSql) {
              name.push('插入')
            }
            return h(tag, {
              props: {
                list: name
              }
            })
          }
        },
        {
          label: '状态',
          prop: 'enable',
          width: 150,
          render (h, row) {
            return h(state, {
              props: {
                state: row.row.enable
              },
              on: {
                handleChange (value) {
                  shelf.enableChange(value, row.row)
                }
              }
            })
          }
        },
        {
          label: '查询SQL',
          prop: 'querySql',
          'show-overflow-tooltip': true
        },
        {
          label: '插入SQL',
          prop: 'insertSql',
          'show-overflow-tooltip': true
        },
        {
          label: '更新SQL',
          prop: 'updateSql',
          'show-overflow-tooltip': true
        },
        {
          label: '删除SQL',
          prop: 'deleteSql',
          'show-overflow-tooltip': true
        }
      ],
      fieldColumns: [
        {
          label: '字段名称',
          prop: 'name'
        },
        {
          label: '字段类型',
          prop: 'type'
        },
        {
          label: '字段描述',
          prop: 'comment'
        }
      ],
      conditionColumns: [
        {
          label: '字段名称',
          render (h, row) {
            return h(fieldSelect, {
              props: {
                options: shelf.fielsOptions,
                field: row.row.field
              },
              on: {
                handleChange (field, type) {
                  shelf.changeField(row.row, field, type)
                }
              }
            })
          }
        },
        {
          label: '关系',
          width: 120,
          render (h, row) {
            return h(conditionSelect, {
              props: {
                row: row.row
              },
              on: {
                handleChange (value) {
                  row.row.operator = value
                }
              }
            })
          }
        },
        {
          label: '内容',
          width: 300,
          render (h, row) {
            return h(contentValue, {
              props: {
                row: row.row
              },
              on: {
                handleChange (value) {
                  row.row.value = value
                }
              }
            })
          }
        },
        {
          label: '操作',
          render (h, row) {
            return (
              <el-button type="text" style="color:red" onClick={() => {
                shelf.deleteCondition(row.ind)
              }}>删除</el-button>
            )
          }
        }
      ],
      sqlTable: [],
      sqlColumns: [],
      sqlTotal: 0,
      sqlCurrent: 1,
      sqlSize: 10,
      total: 0,
      loading: false,
      current: 1,
      size: 10,
      selectRows: [],
      dialogVisible: false,
      innerVisible: false,
      docDialogVisible: false,
      title: '',
      copyRules: {
        name: [
          { required: true, message: '请输入接口名称', trigger: 'blur' }
        ],
        identityName: [
          { required: true, validator: validate, trigger: 'blur' }
        ],
        directoryId: [
          { required: true, message: '请选择接目录', trigger: 'change' }
        ]
      },
      copyRuleForm: {
        id: '',
        name: '',
        identityName: '',
        describe: '',
        directoryId: '',
        directoryName: ''
      },
      ruleForm: {
        type: ['isQuery'],
        id: '',
        name: '',
        identityName: '',
        describe: '',
        directoryId: '',
        directoryName: '',
        enable: 1,
        shareTableName: '',
        schemaName: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入接口名称', trigger: 'blur' }
        ],
        identityName: [
          { required: true, validator: validate, trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择接口类型', trigger: 'change' }
        ],
        directoryId: [
          { required: true, message: '请选择接目录', trigger: 'change' }
        ]
      },
      activeName: 'first',
      typeOptions: [
        { label: '查询', value: 'isQuery', title: '查询SQL', key: 'querySql', type: 'select' },
        { label: '插入', value: 'isInsert', title: '插入SQL', key: 'insertSql', type: 'insert' },
        { label: '更新', value: 'isUpdate', title: '更新SQL', key: 'updateSql', type: 'update' },
        { label: '删除', value: 'isDelete', title: '删除SQL', key: 'deleteSql', type: 'delete' }
      ],
      code: '',
      isFirst: true,
      isEdit: false,
      allTables: [],
      sqlList: [],
      sql: {},
      parameterList: [],
      parameterMap: {},
      innerTitle: '',
      testParams: {},
      sqlIndex: '',
      unitCode: '',
      paramsColumns: [
        {
          label: '参数名称',
          prop: 'name',
          width: 200
        },
        {
          label: '参数描述',
          prop: 'describe'
        },
        {
          label: '参数类型',
          prop: 'type',
          width: 100
        },
        {
          label: '是否必须',
          prop: 'must',
          width: 100
        }
      ],
      paramsTable: [],
      doc: {
        title: '',
        identityName: '',
        name: '',
        describe: '',
        jsonUrl: '',
        xmlUrl: '',
        requestMethod: '',
        password: '',
        supportInterfaceType: [],
        paramInfos: [],
        selectParams: {
          params: [],
          postRequestExample: '',
          getJsonRequestExample: '',
          getXmlRequestExample: ''
        },
        insertParams: {
          params: [],
          postRequestExample: '',
          getJsonRequestExample: '',
          getXmlRequestExample: ''
        },
        updateParams: {
          params: [],
          postRequestExample: '',
          getJsonRequestExample: '',
          getXmlRequestExample: ''
        },
        deleteParams: {
          params: [],
          postRequestExample: '',
          getJsonRequestExample: '',
          getXmlRequestExample: ''
        },
        responseParam: []
      }
    }
  },
  mounted () {
    this.resize()
    window.addEventListener('resize', this.resize, false)
    this.queryInterface()
  },
  methods: {
    query () {
      if (this.search.directoryId !== '') {
        this.current = 1
        this.getInterfaceList()
      } else {
        this.$message.warning('请先选择数据目录')
      }
    },

    getList (data) {
      this.search = {
        describe: '',
        directoryId: data.id,
        identityName: '',
        name: ''
      }
      this.ruleForm.directoryId = data.canEdit === 0 ? data.id : ''
      this.ruleForm.directoryName = data.canEdit === 0 ? data.name : ''
      this.current = 1
      this.getInterfaceList()
    },

    resize () {
      this.options['max-height'] = document.getElementById('tabs').offsetHeight - 265
      this.sqlOptions['max-height'] = document.getElementById('tabs').offsetHeight - 240
      if (document.getElementById('dialog')) {
        document.getElementById('dialog').style['max-height'] = document.body.clientHeight - 250 + 'px'
      }
      if (document.getElementById('dialog1')) {
        document.getElementById('dialog1').style['max-height'] = document.body.clientHeight - 250 + 'px'
      }
    },

    reset () {
      this.search.describe = ''
      this.search.identityName = ''
      this.search.name = ''
    },

    queryInterface () {
      queryInterface().then(data => {
        if (data.code === 0) {
          this.tree = data.data ? data.data : []
        }
      })
    },

    getInterfaceList () {
      var params = {
        ...this.search,
        pageSize: this.size,
        pageNum: this.current
      }
      this.id = new Date().getTime()
      this.loading = true
      this.table = []
      getInterfaceList(params).then(data => {
        this.loading = false
        if (data.code === 0) {
          this.table = data.data.rows
          this.total = data.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },

    selectionChange (rows) {
      this.selectRows = rows
    },

    onPageChange (current, size) {
      this.current = current
      this.size = size
      this.getInterfaceList()
    },

    sqlOnPageChange (current, size) {
      this.sqlCurrent = current
      this.sqlSize = size
      this.testParams.pageSize = this.sqlSize
      this.testParams.pageNum = this.sqlCurrent
      this.testDataInterface()
    },

    add () {
      this.title = '新增'
      this.dialogVisible = true
      this.isEdit = false

      this.getDmSchemaOption()
      this.typeChange()
      this.genIdentityName(1)
      this.queryInterface()
      setTimeout(() => {
        this.$refs.ruleForm.clearValidate()
        this.resize()
      })
    },

    edit () {
      if (this.selectRows.length === 0) {
        this.$message.warning('请选择需要编辑的列')
      } else if (this.selectRows.length === 1) {
        if (this.selectRows[0].canEdit !== 0) {
          this.$message.warning('此接口不能修改')
          return
        }
        this.isEdit = false
        this.title = '编辑'
        this.dialogVisible = true
        this.queryInterface()
        this.queryDetail(this.selectRows[0].id)
        this.getDmSchemaOption()
        setTimeout(() => {
          this.$refs.ruleForm.clearValidate()
        })
      } else {
        this.$message.warning('只能选择一列需要编辑的对象')
      }
    },

    copy () {
      if (this.selectRows.length === 0) {
        this.$message.warning('请选择需要复制的列')
      } else if (this.selectRows.length === 1) {
        this.copyRuleForm.id = this.selectRows[0].id
        this.copyRuleForm.directoryId = this.ruleForm.directoryId
        this.copyRuleForm.directoryName = this.ruleForm.directoryName
        this.copyRuleForm.name = this.selectRows[0].name
        this.title = '复制'
        this.dialogVisible = true
        setTimeout(() => {
          this.$refs.copyRuleForm.clearValidate()
        })
        this.genIdentityName()
        this.queryInterface()
      } else {
        this.$message.warning('只能选择一列需要复制的对象')
      }
    },

    enable () {
      if (this.selectRows.length) {
        for (let n = 0; n < this.selectRows.length; n++) {
          if (this.selectRows[n].canEdit === 1) {
            this.$message.warning(this.selectRows[n].name + '不能修改状态')
            return
          }
        }
        var ids = this.selectRows.map(value => 'ids=' + value.id)
        this.updateBatchEnable(1, ids)
      }
    },

    forbidden () {
      if (this.selectRows.length) {
        for (let n = 0; n < this.selectRows.length; n++) {
          if (this.selectRows[n].canEdit === 1) {
            this.$message.warning(this.selectRows[n].name + '不能修改状态')
            return
          }
        }
        var ids = this.selectRows.map(value => 'ids=' + value.id)
        this.updateBatchEnable(2, ids)
      }
    },

    restAllCondition () {
      var directoryId = this.ruleForm.directoryId; var directoryName = this.ruleForm.directoryName
      this.conditionTable = []
      this.fieldTable = []
      this.sqlList = []
      this.ruleForm = {
        type: ['isQuery'],
        id: '',
        name: '',
        identityName: '',
        describe: '',
        directoryId,
        directoryName,
        enable: 1,
        shareTableName: '',
        schemaName: ''
      }
      this.copyRuleForm = {
        id: '',
        identityName: '',
        name: '',
        describe: ''
      }
    },

    empty () {
      this.$refs.table.$refs.refTable.clearSelection()
    },

    deleteData () {
      if (this.selectRows.length) {
        for (let n = 0; n < this.selectRows.length; n++) {
          if (this.selectRows[n].canEdit === 1) {
            this.$message.warning(this.selectRows[n].name + '不能删除')
            return
          }
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
            var ids = this.selectRows.map(value => 'ids=' + value.id).join('&')
            this.deleteBatchEnable(ids)
          })
      }
    },

    cancel () {
      this.restAllCondition()
      this.dialogVisible = false
    },

    submitForm (formName) {
      if (this.title === '复制') {
        this.$refs.copyRuleForm.validate((valid) => {
          if (valid) {
            this.copyInterface()
          } else {
            return false
          }
        })
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var isC = true
            for (let n = 0; n < this.conditionTable.length; n++) {
              if (this.conditionTable[n].field === '' || this.conditionTable[n].operator === '' || this.conditionTable[n].value === '') {
                this.$message.warning('条件填写不完整，就重新填写')
                isC = false
              }
            }
            if (isC) {
              var isS = true
              this.sqlList.map(value => {
                if (value.sql === undefined || value.sql === '') {
                  isS = false
                  this.$message.warning(value.title + '不能为空')
                }
              })
              if (isS) {
                if (this.title === '新增') {
                  this.addInterface()
                }
                if (this.title === '编辑') {
                  this.updateInterface()
                }
              }
            }
          } else {
            return false
          }
        })
      }
    },

    addRow () {
      if (this.ruleForm.shareTableName) {
        this.conditionTable.push({
          field: '',
          fieldType: '',
          operator: '',
          value: ''
        })
      } else {
        this.$message.warning('请先选择表再添加条件')
      }
      this.setConditionTable()
    },

    openCodeMirror (sql, index) {
      this.innerVisible = true
      this.isFirst = true
      this.innerTitle = '编辑sql'
      this.sqlIndex = index
      setTimeout(() => {
        this.initCodeMirror()
        this.editor.setValue(sqlFormatter.format(sql))
        this.editor.focus()
        this.editor.setCursor(this.editor.lineCount(), 0)
      })
    },

    initCodeMirror () {
      if (this.editor) {
        if (document.getElementsByClassName('CodeMirror')[0]) {
          document.getElementsByClassName('CodeMirror')[0].style.display = 'block'
          if (document.getElementsByClassName('codesql')[0]) {
            document.getElementsByClassName('codesql')[0].style.display = 'none'
          }
        }
        return
      }
      this.editor = CodeMirror.fromTextArea(this.$refs.mycode, {
        lineNumbers: true, // 显示行号
        styleActiveLine: true, // 当前行背景高亮
        lineWrapping: true, // 自动换行
        autofocus: true,
        mode: { name: 'text/x-mysql' }, // 定义mode

        theme: 'ambiance', // 设置黑色主题

        hintOptions: {
          completeSingle: false
        },

        extraKeys: {
          Ctrl: () => {
            this.editor.showHint()
            var doc = document.getElementsByClassName('CodeMirror-hints')[0]
            if (doc) {
              doc.style.zIndex = '99999'
              if (this.isFirst) {
                doc.style.top = parseInt(doc.style.top) + 20 + 'px'
              }
              setTimeout(() => {
                this.isFirst = false
              }, 1)
            }
          }
        }
      })
    },

    submitSql () {
      if (this.innerTitle === '编辑sql') {
        this.sqlList[this.sqlIndex].sql = this.editor.getValue()
        this.innerVisible = false
        this.isEdit = true
        this.conditionTable = []
        this.fieldTable = []
        this.ruleForm.shareTableName = ''
      } else if (this.innerTitle === '配置参数') {
        this.testDataInterface()
      }
    },

    getAllTables (schemaName) {
      this.allTables = []
      getAllTables({ schemaName }).then(data => {
        if (data.code === 0) {
          this.allTables = data.data ? data.data : []
        }
      })
    },

    tableChange () {
      this.fieldTable = []
      this.conditionTable = []
      if (this.ruleForm.shareTableName !== '') {
        this.getColumnInfosByTableName(this.ruleForm.shareTableName, this.ruleForm.schemaName)
      }
    },

    getColumnInfosByTableName (name, schemaName) {
      this.fieldTable = []
      this.fielsOptions = []
      getColumnInfosByTableName({
        tableName: name,
        schemaName
      }).then(data => {
        if (data.code === 0 && data.data) {
          this.fielsOptions = data.data
          this.fieldTable = data.data.map(value => {
            this.ruleForm.type.map(key => {
              value[key] = true
            })
            return value
          })
        }
      })
    },

    typeChange () {
      this.sqlList = []
      this.typeOptions.map(value => {
        if (this.ruleForm.type.findIndex(v => v === value.value) !== -1) {
          this.sqlList.push({ ...value })
        }
      })
      this.setFieldColumns()
      this.setConditionColumns()
    },

    setFieldColumns () {
      var deleteV = []
      var fieldConfig = {
        isQuery: {
          label: '查询',
          width: 50,
          render (h, row) {
            return h(checkBox, {
              props: {
                check: row.row.isQuery,
                row: row.row
              },
              on: {
                handleChange: (value) => {
                  row.row.isQuery = value
                }
              }
            })
          }
        },
        isInsert: {
          label: '插入',
          width: 50,
          render (h, row) {
            return h(checkBox, {
              props: {
                check: row.row.isInsert,
                row: row.row
              },
              on: {
                handleChange: (value) => {
                  row.row.isInsert = value
                }
              }
            })
          }
        },
        isUpdate: {
          label: '更新',
          width: 50,
          render (h, row) {
            return h(checkBox, {
              props: {
                check: row.row.isUpdate,
                row: row.row
              },
              on: {
                handleChange: (value) => {
                  row.row.isUpdate = value
                }
              }
            })
          }
        }
      }
      this.fieldColumns = [
        {
          label: '字段名称',
          prop: 'name'
        },
        {
          label: '字段类型',
          prop: 'type',
          width: 200
        },
        {
          label: '字段描述',
          prop: 'comment'
        }
      ]
      this.typeOptions.map(value => {
        if (this.ruleForm.type.findIndex(key => key === value.value) === -1) {
          deleteV.push(value.value)
        }
      })

      this.fieldTable.map(value => {
        this.ruleForm.type.map(key => {
          if (value[key] === undefined && key !== 'isDelete') {
            value[key] = true
          }
        })
        deleteV.map(key => {
          if (value[key] !== undefined) {
            delete value[key]
          }
        })
      })

      this.ruleForm.type.map(key => {
        if (fieldConfig[key]) {
          this.fieldColumns.push(fieldConfig[key])
        }
      })
    },

    setConditionColumns () {
      const shelf = this
      var add = []
      var conditionConfig = {
        isQuery: {
          label: '查询',
          width: 50,
          render (h, row) {
            return h(checkBox, {
              props: {
                check: row.row.isQuery,
                row: row.row
              },
              on: {
                handleChange: (value) => {
                  row.row.isQuery = value
                }
              }
            })
          }
        },
        isUpdate: {
          label: '更新',
          width: 50,
          render (h, row) {
            return h(checkBox, {
              props: {
                check: row.row.isUpdate,
                row: row.row
              },
              on: {
                handleChange: (value) => {
                  row.row.isUpdate = value
                }
              }
            })
          }
        },
        isDelete: {
          label: '删除',
          width: 50,
          render (h, row) {
            return h(checkBox, {
              props: {
                check: row.row.isDelete,
                row: row.row
              },
              on: {
                handleChange: (value) => {
                  row.row.isDelete = value
                }
              }
            })
          }
        }
      }
      this.conditionColumns = [
        {
          label: '字段名称',
          width: 250,
          render (h, row) {
            return h(fieldSelect, {
              props: {
                options: shelf.fielsOptions,
                field: row.row.field
              },
              on: {
                handleChange (field, type) {
                  shelf.changeField(row.row, field, type)
                }
              }
            })
          }
        },
        {
          label: '关系',
          width: 150,
          render (h, row) {
            return h(conditionSelect, {
              props: {
                row: row.row
              },
              on: {
                handleChange (value) {
                  row.row.operator = value
                }
              }
            })
          }
        },
        {
          label: '内容',
          render (h, row) {
            return h(contentValue, {
              props: {
                row: row.row
              },
              on: {
                handleChange (value) {
                  row.row.value = value
                }
              }
            })
          }
        },
        {
          label: '操作',
          width: 120,
          render (h, row) {
            return (
              <el-button type="text" style="color:red" onClick={() => {
                shelf.deleteCondition(row.ind)
              }}>删除</el-button>
            )
          }
        }
      ]
      this.setConditionTable()
      this.ruleForm.type.map(key => {
        if (conditionConfig[key]) {
          add.push(conditionConfig[key])
        }
      })
      this.conditionColumns.splice(3, 0, ...add)
    },

    setConditionTable () {
      var deleteV = []
      this.typeOptions.map(value => {
        if (this.ruleForm.type.findIndex(key => key === value.value) === -1) {
          deleteV.push(value.value)
        }
      })
      this.conditionTable.map(value => {
        this.ruleForm.type.map(key => {
          if (value[key] === undefined && key !== 'isInsert') {
            value[key] = true
          }
        })
        deleteV.map(key => {
          if (value[key] !== undefined) {
            delete value[key]
          }
        })
      })
      this.conditionTable = cloneDeep(this.conditionTable)
    },

    changeField (row, field, type) {
      row.field = field
      row.fieldType = type
      this.conditionTable = cloneDeep(this.conditionTable)
    },

    deleteCondition (index) {
      this.conditionTable.splice(index, 1)
    },

    genIdentityName () {
      genIdentityName().then(data => {
        if (data.code === 0) {
          this.unitCode = data.data.unitCode + '_'
          if (this.title === '复制') {
            this.copyRuleForm.identityName = data.data.identityCode
          } else {
            this.ruleForm.identityName = data.data.identityCode
          }
        }
      })
    },

    genSql (params) {
      this.sql = {}
      genSql(params).then(data => {
        if (data.code === 0) {
          this.sqlList.map(value => {
            value.sql = data.data[value.key]
          })
          this.sqlList = cloneDeep(this.sqlList)
        }
      })
    },

    confirmSet () {
      var params = {
        deleteFields: [],
        insertFields: [],
        queryFields: [],
        updateFields: [],
        tableName: this.ruleForm.shareTableName,
        schemaName: this.ruleForm.schemaName,
        shareQueryCondition: {
          deleteConditionDtos: [],
          insertConditionDtos: [],
          queryConditionDtos: [],
          updateConditionDtos: []
        }
      }

      this.fieldTable.map(value => {
        if (value.isQuery) {
          params.queryFields.push({
            fieldName: value.name,
            fieldType: value.type
          })
        }
        if (value.isInsert) {
          params.insertFields.push({
            fieldName: value.name,
            fieldType: value.type
          })
        }
        if (value.isDelete) {
          params.deleteFields.push({
            fieldName: value.name,
            fieldType: value.type
          })
        }
        if (value.isUpdate) {
          params.updateFields.push({
            fieldName: value.name,
            fieldType: value.type
          })
        }
      })
      this.conditionTable.map(value => {
        console.log(value)
        if (value.isQuery) {
          params.shareQueryCondition.queryConditionDtos.push({
            field: value.field,
            fieldType: value.fieldType,
            operator: value.operator,
            value: value.value
          })
        }
        if (value.isInsert) {
          params.shareQueryCondition.insertConditionDtos.push({
            field: value.field,
            fieldType: value.fieldType,
            operator: value.operator,
            value: value.value
          })
        }
        if (value.isDelete) {
          params.shareQueryCondition.deleteConditionDtos.push({
            field: value.field,
            fieldType: value.fieldType,
            operator: value.operator,
            value: value.value
          })
        }
        if (value.isUpdate) {
          params.shareQueryCondition.updateConditionDtos.push({
            field: value.field,
            fieldType: value.fieldType,
            operator: value.operator,
            value: value.value
          })
        }
      })

      this.genSql(params)
    },

    setParameter (str = '') {
      var s = str.indexOf('#{'); var e = str.indexOf('}')
      if (s !== -1 && e !== -1 && s < e) {
        this.parameterList.push(str.slice(s + 2, e))
        if (str.length > e + 1) {
          return this.setParameter(str.substring(e + 1, str.length))
        }
      }
    },

    treeChange (data) {
      var name = this.getName(data, this.tree)
      if (this.title === '复制') {
        this.copyRuleForm.directoryName = name
      } else {
        this.ruleForm.directoryName = name
      }
    },

    getName (val = '', opt = []) {
      var name = ''
      opt.map(value => {
        if (value.id === val) {
          name = value.name
          if (value.children) {
            return this.getName(val, value.children)
          }
        }
      })
      return name
    },

    test (sql, type) {
      var list = []
      if (sql === '') {
        this.$message.warning('sql不能为空')
        return
      }
      this.parameterList = []
      this.sqlColumns = []
      this.sqlTotal = 0
      this.sqlTable = []
      this.setParameter(sql)
      for (let i = 0; i < this.parameterList.length; i++) {
        if (list.indexOf(this.parameterList[i]) === -1) {
          list.push(this.parameterList[i])
        }
      }
      this.parameterList = list
      this.sqlCurrent = 1
      this.testParams = {
        interfaceType: type,
        params: null,
        sql: sql,
        pageSize: this.sqlSize,
        pageNum: this.sqlCurrent
      }
      if (this.parameterList.length) {
        this.innerVisible = true
        this.innerTitle = '配置参数'
        setTimeout(() => {
          if (document.getElementsByClassName('CodeMirror')[0]) {
            document.getElementsByClassName('CodeMirror')[0].style.display = 'none'
          }
        })
        this.parameterMap = {}
        this.parameterList.map(value => {
          this.parameterMap[value] = ''
        })
        this.parameterMap = { ...this.parameterMap }
        this.testParams.params = this.parameterMap
      } else {
        this.testDataInterface()
      }
    },

    testDataInterface () {
      if (this.testParams.interfaceType === 'select') {
        this.innerVisible = true
        this.innerTitle = '详情'
        setTimeout(() => {
          if (document.getElementsByClassName('CodeMirror')[0]) {
            document.getElementsByClassName('CodeMirror')[0].style.display = 'none'
          }
        })
      } else {
        this.innerVisible = false
      }
      testDataInterface(this.testParams).then(data => {
        if (data.code === 0) {
          if (this.testParams.interfaceType === 'select') {
            if (!this.sqlColumns.length) {
              if (data.data.rows[0]) {
                for (var key in data.data.rows[0]) {
                  this.sqlColumns.push({
                    label: key,
                    prop: key
                  })
                }
              }
            }
            this.sqlTable = data.data.rows
            this.sqlTotal = data.data.total
          } else {
            this.$message.success('测试成功')
          }
        }
      })
    },

    addInterface () {
      var params = {
        id: this.ruleForm.id,
        name: this.ruleForm.name,
        identityName: this.unitCode + this.ruleForm.identityName,
        describe: this.ruleForm.describe,
        directoryId: this.ruleForm.directoryId,
        directoryName: this.ruleForm.directoryName,
        enable: 1,
        isDelete: 0,
        isInsert: 0,
        isQuery: 0,
        isUpdate: 0,
        deleteSql: '',
        querySql: '',
        updateSql: '',
        insertSql: '',
        shareFieldDto: {
          deleteFields: [],
          insertFields: [],
          queryFields: [],
          updateFields: [],
          shareQueryCondition: {
            deleteConditionDtos: [],
            insertConditionDtos: [],
            queryConditionDtos: [],
            updateConditionDtos: []
          },
          tableName: this.ruleForm.shareTableName,
          schemaName: this.ruleForm.schemaName
        },
        shareQueryCondition: {
          deleteConditionDtos: [],
          insertConditionDtos: [],
          queryConditionDtos: [],
          updateConditionDtos: []
        },
        shareTableName: this.ruleForm.shareTableName,
        shareSchemaName: this.ruleForm.schemaName
      }
      this.ruleForm.type.map(value => {
        params[value] = 1
      })
      this.conditionTable.map((value, index) => {
        if (value.isQuery) {
          params.shareQueryCondition.queryConditionDtos.push({
            field: value.field,
            fieldType: value.fieldType,
            operator: value.operator,
            value: value.value,
            id: index
          })
        }
        if (value.isInsert) {
          params.shareQueryCondition.insertConditionDtos.push({
            field: value.field,
            fieldType: value.fieldType,
            operator: value.operator,
            value: value.value,
            id: index
          })
        }
        if (value.isDelete) {
          params.shareQueryCondition.deleteConditionDtos.push({
            field: value.field,
            fieldType: value.fieldType,
            operator: value.operator,
            value: value.value,
            id: index
          })
        }
        if (value.isUpdate) {
          params.shareQueryCondition.updateConditionDtos.push({
            field: value.field,
            fieldType: value.fieldType,
            operator: value.operator,
            value: value.value,
            id: index
          })
        }
      })
      params.shareFieldDto.shareQueryCondition = params.shareQueryCondition
      this.fieldTable.map(value => {
        if (value.isQuery) {
          params.shareFieldDto.queryFields.push({
            fieldName: value.name,
            fieldType: value.type
          })
        }
        if (value.isInsert) {
          params.shareFieldDto.insertFields.push({
            fieldName: value.name,
            fieldType: value.type
          })
        }
        if (value.isDelete) {
          params.shareFieldDto.deleteFields.push({
            fieldName: value.name,
            fieldType: value.type
          })
        }
        if (value.isUpdate) {
          params.shareFieldDto.updateFields.push({
            fieldName: value.name,
            fieldType: value.type
          })
        }
      })
      this.sqlList.map(value => {
        params[value.key] = value.sql
      })
      addInterface(params).then(data => {
        if (data.code === 0) {
          this.dialogVisible = false
          this.getInterfaceList()
          this.$message.success('新增成功')
        }
      })
    },

    queryDetail (id) {
      queryDetail({ id }).then(data => {
        if (data.code === 0) {
          var detail = data.data
          this.ruleForm.type = []
          if (detail.isQuery === 1) {
            this.ruleForm.type.push('isQuery')
          }
          if (detail.isInsert === 1) {
            this.ruleForm.type.push('isInsert')
          }
          if (detail.isDelete === 1) {
            this.ruleForm.type.push('isDelete')
          }
          if (detail.isUpdate === 1) {
            this.ruleForm.type.push('isUpdate')
          }
          this.typeChange()
          this.ruleForm.id = id
          this.ruleForm.name = detail.name

          this.ruleForm.identityName = this.getUnitCode(detail.identityName, false)
          this.unitCode = this.getUnitCode(detail.identityName, true) + '_'
          this.ruleForm.describe = detail.describe
          this.ruleForm.enable = detail.enable
          this.ruleForm.schemaName = detail.shareSchemaName
          this.ruleForm.shareTableName = detail.shareTableName
          this.sqlList.map(value => {
            value.sql = detail[value.key]
          })
          if (detail.shareTableName) {
            this.conditionTable = []
            detail.shareQueryCondition.deleteConditionDtos.map(item => {
              let isHave = false; let ind = ''
              this.conditionTable.map((value, index) => {
                if (value.id === parseInt(item.id)) {
                  isHave = true
                  ind = index
                }
              })
              if (isHave) {
                this.conditionTable[ind].isDelete = true
              } else {
                this.conditionTable.push({
                  field: item.field,
                  fieldType: item.fieldType,
                  operator: item.operator,
                  value: item.value,
                  isDelete: true,
                  id: parseInt(item.id)
                })
              }
            })
            detail.shareQueryCondition.insertConditionDtos.map(item => {
              let isHave = false; let ind = ''
              this.conditionTable.map((value, index) => {
                if (value.id === parseInt(item.id)) {
                  isHave = true
                  ind = index
                }
              })
              if (isHave) {
                this.conditionTable[ind].isInsert = true
              } else {
                this.conditionTable.push({
                  field: item.field,
                  fieldType: item.fieldType,
                  operator: item.operator,
                  value: item.value,
                  isInsert: true,
                  id: parseInt(item.id)
                })
              }
            })
            detail.shareQueryCondition.queryConditionDtos.map(item => {
              let isHave = false; let ind = ''
              this.conditionTable.map((value, index) => {
                if (value.id === parseInt(item.id)) {
                  isHave = true
                  ind = index
                }
              })
              if (isHave) {
                this.conditionTable[ind].isQuery = true
              } else {
                this.conditionTable.push({
                  field: item.field,
                  fieldType: item.fieldType,
                  operator: item.operator,
                  value: item.value,
                  isQuery: true,
                  id: parseInt(item.id)
                })
              }
            })
            detail.shareQueryCondition.updateConditionDtos.map(item => {
              let isHave = false; let ind = ''
              this.conditionTable.map((value, index) => {
                if (value.id === parseInt(item.id)) {
                  isHave = true
                  ind = index
                }
              })
              if (isHave) {
                this.conditionTable[ind].isUpdate = true
              } else {
                this.conditionTable.push({
                  field: item.field,
                  fieldType: item.fieldType,
                  operator: item.operator,
                  value: item.value,
                  isUpdate: true,
                  id: parseInt(item.id)
                })
              }
            })
            getColumnInfosByTableName({
              schemaName: detail.shareSchemaName,
              tableName: detail.shareTableName
            }).then(data => {
              if (data.code === 0 && data.data) {
                this.fielsOptions = data.data
                this.fieldTable = data.data.map(value => {
                  detail.shareFieldDto.deleteFields.map(item => {
                    if (item.fieldName === value.name) {
                      value.isDelete = true
                    }
                  })
                  detail.shareFieldDto.insertFields.map(item => {
                    if (item.fieldName === value.name) {
                      value.isInsert = true
                    }
                  })
                  detail.shareFieldDto.queryFields.map(item => {
                    if (item.fieldName === value.name) {
                      value.isQuery = true
                    }
                  })
                  detail.shareFieldDto.updateFields.map(item => {
                    if (item.fieldName === value.name) {
                      value.isUpdate = true
                    }
                  })
                  return value
                })
              }
            })
          } else {
            this.isEdit = true
          }
        }
      })
    },

    copyInterface () {
      var params = cloneDeep(this.copyRuleForm)
      params.identityName = this.unitCode + this.copyRuleForm.identityName
      copyInterface(params).then(data => {
        if (data.code === 0) {
          this.dialogVisible = false
          this.getInterfaceList()
          this.$message.success('复制成功')
        }
      })
    },

    updateInterface () {
      var params = {
        id: this.ruleForm.id,
        name: this.ruleForm.name,
        identityName: this.unitCode + this.ruleForm.identityName,
        describe: this.ruleForm.describe,
        directoryId: this.ruleForm.directoryId,
        directoryName: this.ruleForm.directoryName,
        enable: 1,
        isDelete: 0,
        isInsert: 0,
        isQuery: 0,
        isUpdate: 0,
        deleteSql: '',
        querySql: '',
        updateSql: '',
        insertSql: '',
        shareFieldDto: {
          deleteFields: [],
          insertFields: [],
          queryFields: [],
          updateFields: [],
          schemaName: this.ruleForm.schemaName,
          shareQueryCondition: {
            deleteConditionDtos: [],
            insertConditionDtos: [],
            queryConditionDtos: [],
            updateConditionDtos: []
          },
          tableName: this.ruleForm.shareTableName,
          shareSchemaName: this.ruleForm.schemaName
        },
        shareQueryCondition: {
          deleteConditionDtos: [],
          insertConditionDtos: [],
          queryConditionDtos: [],
          updateConditionDtos: []
        },
        shareTableName: this.ruleForm.shareTableName,
        shareSchemaName: this.ruleForm.schemaName
      }
      this.ruleForm.type.map(value => {
        params[value] = 1
      })
      this.conditionTable.map((value, index) => {
        if (value.isQuery) {
          params.shareQueryCondition.queryConditionDtos.push({
            field: value.field,
            fieldType: value.fieldType,
            operator: value.operator,
            value: value.value,
            id: index
          })
        }
        if (value.isInsert) {
          params.shareQueryCondition.insertConditionDtos.push({
            field: value.field,
            fieldType: value.fieldType,
            operator: value.operator,
            value: value.value,
            id: index
          })
        }
        if (value.isDelete) {
          params.shareQueryCondition.deleteConditionDtos.push({
            field: value.field,
            fieldType: value.fieldType,
            operator: value.operator,
            value: value.value,
            id: index
          })
        }
        if (value.isUpdate) {
          params.shareQueryCondition.updateConditionDtos.push({
            field: value.field,
            fieldType: value.fieldType,
            operator: value.operator,
            value: value.value,
            id: index
          })
        }
      })
      params.shareFieldDto.shareQueryCondition = params.shareQueryCondition
      this.fieldTable.map(value => {
        if (value.isQuery) {
          params.shareFieldDto.queryFields.push({
            fieldName: value.name,
            fieldType: value.type
          })
        }
        if (value.isInsert) {
          params.shareFieldDto.insertFields.push({
            fieldName: value.name,
            fieldType: value.type
          })
        }
        if (value.isDelete) {
          params.shareFieldDto.deleteFields.push({
            fieldName: value.name,
            fieldType: value.type
          })
        }
        if (value.isUpdate) {
          params.shareFieldDto.updateFields.push({
            fieldName: value.name,
            fieldType: value.type
          })
        }
      })
      this.sqlList.map(value => {
        params[value.key] = value.sql
      })
      updateInterface(params).then(data => {
        if (data.code === 0) {
          this.dialogVisible = false
          this.getInterfaceList()
          this.$message.success('修改成功')
        }
      })
    },

    updateBatchEnable (enable, ids) {
      var params = '?enable=' + enable + '&' + ids.join('&')
      updateBatchEnable(params).then(data => {
        if (data.code === 0) {
          if (enable === 1) {
            this.$message.success('启用成功')
          } else {
            this.$message.success('禁用用成功')
          }
          this.getInterfaceList()
        }
      })
    },

    deleteBatchEnable (id) {
      deleteBatchEnable(id).then(data => {
        if (data.code === 0) {
          this.$message.success('删除成功')
          this.getInterfaceList()
        }
      })
    },

    getUnitCode (name, type) {
      var list = name.split('_')
      if (type) {
        if (list.length === 1) {
          return ''
        } else if (list.length === 2) {
          return list[0]
        } else {
          return list[0] + '_' + list[1]
        }
      } else {
        if (list.length === 1) {
          return list[0]
        } else if (list.length === 2) {
          return list[1]
        } else {
          var t = list.splice(2, name.length - 1)
          return t.join('_')
        }
      }
    },

    interfaceDoc () {
      if (this.selectRows.length === 0) {
        this.$message.warning('请选择查看的行')
      } else if (this.selectRows.length === 1) {
        this.docDialogVisible = true
        this.queryInterfaceDoc(this.selectRows[0].id)
        setTimeout(() => {
          this.resize()
        })
      } else {
        this.$message.warning('只能选择一列需要查看的对象')
      }
    },

    queryInterfaceDoc (id) {
      queryInterfaceDoc({ id }).then(data => {
        if (data.code === 0) {
          this.doc = data.data
        }
      })
    },

    exportReport () {
      var params = {
        title: this.doc.title,
        identityName: this.doc.identityName,
        name: this.doc.name,
        describe: this.doc.describe,
        jsonUrl: this.doc.jsonUrl,
        xmlUrl: this.doc.xmlUrl,
        requestMethod: this.doc.requestMethod,
        password: this.doc.password,
        supportInterfaceType: this.doc.supportInterfaceType.join(' '),
        paramInfos: this.doc.paramInfos,
        selectParams: this.doc.selectParams ? this.doc.selectParams.params : [],
        selectPost: this.doc.selectParams ? this.doc.selectParams.postRequestExample : '',
        selectJson: this.doc.selectParams ? this.doc.selectParams.getJsonRequestExample : '',
        selectXml: this.doc.selectParams ? this.doc.selectParams.getXmlRequestExample : '',
        insertParams: this.doc.insertParams ? this.doc.insertParams.params : [],
        insertPost: this.doc.insertParams ? this.doc.insertParams.postRequestExample : '',
        insertJson: this.doc.insertParams ? this.doc.insertParams.getJsonRequestExample : '',
        insertXml: this.doc.insertParams ? this.doc.insertParams.getXmlRequestExample : '',
        updateParams: this.doc.updateParams ? this.doc.updateParams.params : '',
        updatePost: this.doc.updateParams ? this.doc.updateParams.postRequestExample : '',
        updateJson: this.doc.updateParams ? this.doc.updateParams.getJsonRequestExample : '',
        updateXml: this.doc.updateParams ? this.doc.updateParams.getXmlRequestExample : '',
        deleteParams: this.doc.deleteParams ? this.doc.deleteParams.params : [],
        deletePost: this.doc.deleteParams ? this.doc.deleteParams.postRequestExample : '',
        deleteJson: this.doc.deleteParams ? this.doc.deleteParams.getJsonRequestExample : '',
        deleteXml: this.doc.deleteParams ? this.doc.deleteParams.getXmlRequestExample : '',
        responseParam: this.doc.responseParam
      }
      var name = this.doc.name
      PizZipUtils.getBinaryContent('interface.docx', function (error, content) {
        if (error) { throw error };

        var zip = new PizZip(content)
        var doc = new docxtemplater(zip)

        doc.setData(params)
        doc.render()

        var out = doc.getZip().generate({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        })
        saveAs(out, name + '接口文档.docx')
      })
    },

    rowClick (row) {
      this.$refs.table.$refs.refTable.toggleRowSelection(row)
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
          this.getAllTables()
        }
      })
    },

    schemaNameChange (val) {
      if (val) {
        this.getAllTables(val)
      }
      this.ruleForm.shareTableName = ''
      this.fieldTable = []
      this.conditionTable = []
    },

    enableChange (value, row) {
      if (row.canEdit === 1) {
        this.$message.warning('此接口不能修改状态')
        this.getInterfaceList()
      } else {
        this.updateBatchEnable(value, ['ids=' + row.id])
      }
    },

    setDisabled (data) {
      data.map(value => {
        value.disabled = value.canEdit === 1
        if (value.children) {
          this.setDisabled(value.children)
        }
      })
    }
  },
  watch: {
    tree () {
      this.setDisabled(this.tree)
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style scoped lang="scss">
.content{
  display: flex;
  height: 100%;
  .add {
    line-height: 30px;
    border: 1px dashed gainsboro;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }
}
h3{
  padding-left: 20px;
  .detail{
    display: inline-block;
    padding-left: 10px;
    font-size: 14px;
    font-weight: normal;
  }
}
h4{
  padding-left: 20px;
  .detail{
    display: inline-block;
    font-size: 14px;
    font-weight: normal;
  }
}
</style>
