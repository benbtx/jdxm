<template>
    <div style="height: 100%" id="tabs" v-kr-loading="loading">
      <kr-search @keyup.enter.native="query">
        <kr-search-item label="接口标识:" :labelWidth="100">
          <el-input v-model="search.identityName" placeholder="请输入"></el-input>
        </kr-search-item>
        <kr-search-item label="接口名称:" :labelWidth="100">
          <el-input v-model="search.name" placeholder="请输入"></el-input>
        </kr-search-item>
        <kr-search-item label="描述:" :labelWidth="100">
          <el-input v-model="search.describe" placeholder="请输入"></el-input>
        </kr-search-item>
        <kr-search-item label="附件所属表:" :labelWidth="100">
          <el-input v-model="search.fileTableName" placeholder="请输入"></el-input>
        </kr-search-item>
        <kr-search-item label="附件对应字段:" :labelWidth="100">
          <el-input v-model="search.fileFieldName" placeholder="请输入"></el-input>
        </kr-search-item>
        <kr-search-item>
          <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
          <el-button icon="el-icon-refresh-right" @click="reset">重置</el-button>
        </kr-search-item>
      </kr-search>
      <div style="margin-top: 20px">
        <el-button type="primary" icon="el-icon-plus" @click="add" v-has="'InterfaceManage:enclosureInterfaceManage:add'">新增</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="edit" v-has="'InterfaceManage:enclosureInterfaceManage:edit'">编辑</el-button>
        <el-button type="primary" @click="copy" v-has="'InterfaceManage:enclosureInterfaceManage:copy'"><i class="iconfont iconfuzhi" style="font-size: 13px"></i> 复制</el-button>
        <el-button type="primary" @click="enable" v-has="'InterfaceManage:enclosureInterfaceManage:enable'"><i class="iconfont iconqiyong" style="font-size: 13px"></i> 启用({{selectRows.length}})</el-button>
        <el-button type="primary" @click="forbidden" v-has="'InterfaceManage:enclosureInterfaceManage:enable'"><i class="iconfont iconjinyong" style="font-size: 13px"></i> 禁用({{selectRows.length}})</el-button>
        <el-dropdown @command="test" v-has="'InterfaceManage:enclosureInterfaceManage:test'">
          <el-button type="primary" style="margin: 0 10px">
            接口测试<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="upload">上传</el-dropdown-item>
            <el-dropdown-item command="download">下载</el-dropdown-item>
            <el-dropdown-item command="preview">预览</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" @click="interfaceDoc" v-has="'InterfaceManage:enclosureInterfaceManage:interfaceDoc'"><i class="iconfont iconfuzhi" style="font-size: 13px"></i> 接口文档</el-button>
        <el-button icon="el-icon-delete" type="danger" plain @click="deleteData" v-has="'InterfaceManage:enclosureInterfaceManage:delete'">删除({{selectRows.length}})</el-button>
        <el-button @click="empty"><i class="iconfont iconshuazi-1" style="font-size: 13px"></i>清空({{selectRows.length}})</el-button>
        <kr-el-table
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
          width="550px">
          <div id="dialog3" style="overflow-y: auto;overflow-x: hidden">
            <el-form :model="copyRuleForm" :rules="copyRules" ref="copyRuleForm" label-width="120px" class="demo-ruleForm" v-if="title==='复制'">
              <el-form-item label="目录：" prop="directoryId">
                  <el-cascader
                    v-model="copyRuleForm.directoryId"
                    style="width: 100%"
                    :options="tree"
                    @change="treeChange"
                    :props="{ checkStrictly: true,label:'name',value:'id', emitPath:false}"
                    clearable></el-cascader>
                </el-form-item>
              <el-form-item label="接口标识：" prop="identityName">
                <el-input v-model="unitCode" style="width: 100px" disabled :clearable="false"></el-input> —
                <el-input v-model="copyRuleForm.identityName" placeholder="请输入" style="width: 150px"></el-input>
                <el-button type="primary" @click="genIdentityName" style="float: right">自动获取</el-button>
              </el-form-item>
              <el-form-item label="接口名称：" prop="name">
                <el-input v-model="copyRuleForm.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="描述：" prop="describe">
                <el-input v-model="copyRuleForm.describe" placeholder="请输入"></el-input>
              </el-form-item>
            </el-form>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-else>
              <el-form-item label="目录：" prop="directoryId">
                  <el-cascader
                    v-model="ruleForm.directoryId"
                    style="width: 100%"
                    :options="tree"
                    @change="treeChange"
                    :props="{ checkStrictly: true,label:'name',value:'id', emitPath:false }"
                    clearable></el-cascader>
                </el-form-item>
              <el-form-item label="接口标识：" prop="identityName">
                <el-input v-model="unitCode" style="width: 100px" disabled :clearable="false"></el-input> —
                <el-input v-model="ruleForm.identityName" placeholder="请输入" style="width: 150px"></el-input>
                <el-button type="primary" @click="genIdentityName" style="float: right">自动获取</el-button>
              </el-form-item>
              <el-form-item label="接口名称：" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="描述：" prop="describe">
                <el-input v-model="ruleForm.describe" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="模式：" prop="fileSchemaName">
                <el-select v-model="ruleForm.fileSchemaName" placeholder="请选择" style="width: 100%" @change="schemaNameChange">
                  <el-option
                    v-for="item in dmOptions"
                    :key="item.schema"
                    :label="item.name"
                    :value="item.schema">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="附件所属表：" prop="fileTableName">
                <el-select v-model="ruleForm.fileTableName" placeholder="请选择" style="width: 100%" @change="tableChange">
                  <el-option
                    v-for="item in allTables[ruleForm.fileSchemaName]"
                    :key="item.tableName"
                    :label="item.tableName"
                    :value="item.tableName">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="附件对应字段：" prop="fileFieldName">
                <el-select v-model="ruleForm.fileFieldName" style="width: 100%" placeholder="请选择">
                  <el-option
                    v-for="item in fielsOptions"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择该表主键：" prop="fileUniqueFieldName">
                <el-select v-model="ruleForm.fileUniqueFieldName" style="width: 100%" multiple placeholder="请选择">
                  <el-option
                    v-for="item in fielsOptions"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="接口文档"
          :visible.sync="docDialogVisible"
          :append-to-body="false"
          width="1000px">
          <div id="dialog4" style="overflow-y: auto;overflow-x: hidden">
            <h1>智慧戒毒-附件接口文档</h1>
            <h2>接口基本信息</h2>
            <h3>接口标识<span class="detail">{{doc.identityName}}</span></h3>
            <h3>接口名称<span class="detail">{{doc.name}}</span></h3>
            <h3>接口描述 <span class="detail">{{doc.describe}}</span></h3>
            <h3>接口密码<span class="detail">{{doc.password}}</span></h3>
            <h2>附件上传接口</h2>
            <h3>接口地址json: <span class="detail">{{doc.uploadJsonUrl}}</span></h3>
            <h3>接口地址xml: <span class="detail">{{doc.uploadXmlUrl}}</span></h3>
            <h3>请求方式:  <span class="detail">POST</span></h3>
            <h3>Content-Type:  <span class="detail">multipart/form-data</span></h3>
            <h3>参数说明</h3>
            <kr-el-table
              :options="{showIndex: false}"
              :columns="paramsColumns"
              :rows="paramsTable"
              :total="0"/>
            <h3>返回结果</h3>
            <kr-el-table
              :options="{showIndex: false}"
              :columns="paramsColumns"
              :rows="resultTable"
              :total="0"/>
            <h2>附件下载接口</h2>
            <h3>接口地址: <span class="detail">{{doc.downloadUrl}}</span></h3>
            <h3>请求方式: <span class="detail">GET POST</span></h3>
            <h3>参数说明</h3>
            <kr-el-table
              :options="{showIndex: false}"
              :columns="paramsColumns"
              :rows="paramsTable1"
              :total="0"/>
            <h3>POST请求示例</h3>
            <div style="padding-left: 20px;line-height: 30px">
              <div>{</div>
              <div style="padding-left: 20px">identityName:{{doc.identityName}}</div>
              <div style="padding-left: 20px">password:{{doc.password}}</div>
              <div style="padding-left: 20px">uniqueFieldValue:{{doc.uniqueFieldFormat}}</div>
              <div>}</div>
            </div>
            <div style="line-height: 30px;color: red;padding-left: 20px">注意：{{doc.uniqueFieldFormat}}需要替换为真实值用','隔开</div>
            <h3>Get请求示例 <br/><br/><span class="detail">{{doc.downloadUrl+doc.downloadAndPreviewGetUrlParams}}</span></h3>
            <div style="line-height: 30px;color: red;padding-left: 20px">注意：{{doc.uniqueFieldFormat}}需要替换为真实值用','隔开</div>
            <h2>附件预览接口</h2>
            <h3>接口地址: <span class="detail">{{doc.previewUrl}}</span></h3>
            <h3>请求方式: <span class="detail">GET POST</span></h3>
            <h3>参数说明</h3>
            <kr-el-table
              :options="{showIndex: false}"
              :columns="paramsColumns"
              :rows="paramsTable1"
              :total="0"/>
            <h3>POST请求示例</h3>
            <div style="padding-left: 20px;line-height: 30px">
              <div>{</div>
              <div style="padding-left: 20px">identityName:{{doc.identityName}}</div>
              <div style="padding-left: 20px">password:{{doc.password}}</div>
              <div style="padding-left: 20px">uniqueFieldValue:{{doc.uniqueFieldFormat}}</div>
              <div>}</div>
            </div>
            <div style="line-height: 30px;color: red;padding-left: 20px">注意：{{doc.uniqueFieldFormat}}需要替换为真实值用','隔开</div>
            <h3>Get请求示例<br/><br/><span class="detail">{{doc.previewUrl+doc.downloadAndPreviewGetUrlParams}}</span></h3>
            <div style="line-height: 30px;color: red;padding-left: 20px">注意：{{doc.uniqueFieldFormat}}需要替换为真实值用','隔开</div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="exportReport">下载文档</el-button>
            <el-button @click="docDialogVisible=false">取 消</el-button>
          </div>
        </el-dialog>
        <el-dialog
          :title="testTitle"
          :visible.sync="testDialogVisible"
          @close="testCancel"
          :append-to-body="false"
          width="700px">
          <div>
            <el-form :model="testRuleForm" :rules="testRules" ref="testRuleForm" label-width="200px" class="demo-ruleForm">
              <el-form-item label="接口标识：" prop="identityName">
                {{testRuleForm.identityName}}
              </el-form-item>
              <el-form-item label="主键值（多个值用','分隔）：" prop="uniqueFieldValue">
                <el-input v-model="testRuleForm.uniqueFieldValue" placeholder="请输入" v-if="testTitle==='上传'"></el-input>
                <el-select v-model="testRuleForm.uniqueFieldValue" placeholder="请选择" style="width: 100%" v-else>
                  <el-option
                    v-for="item in uniqueValuesOptions"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上传文件："   v-if="testTitle==='上传'">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  drag
                  action="/api/detoxification-data/sys-file-interface/uploadForTest"
                  :multiple="false"
                  :limit="1"
                  :http-request="uploadFile"
                  :on-success="success"
                  :auto-upload="false">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="testSubmitForm('ruleForm')">确认提交</el-button>
            <el-button @click="testCancel">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
import axios from '@/projectModule/utils/axios'
import { queryInterface } from '@/projectModule/api/InterfaceManage/InterfaceCatalogManage.js'
import { getDmSchemaOption } from '@/projectModule/api/resourceManage/resourceManage.js'
import { getAllTables, getColumnInfosByTableName } from '@/projectModule/api/InterfaceManage/InterfaceManage.js'
import { queryAll, genIdentityName, addInterface, updateInterface, queryDetail, copyInterface, deleteInterface, updateBatchEnable, queryInterfaceDoc, getInterfaceAddr, getFileUniqueValues } from '@/projectModule/api/InterfaceManage/enclosureInterfaceManage.js'
import state from './../InterfaceManage/components/state.vue'
import { getToken } from '@/projectModule/utils/token'

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
      testDialogVisible: false,
      testTitle: '',
      fileList: [],
      uniqueValuesOptions: [],
      dmOptions: [],
      fielsOptions: [],
      search: {
        describe: '',
        directoryId: '',
        enable: '',
        identityName: '',
        name: '',
        fileTableName: '',
        fileFieldName: ''
      },
      options: {
        showIndex: true,
        showSelection: true,
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
          label: '状态',
          prop: 'enable',
          render (h, row) {
            return h(state, {
              props: {
                state: row.row.enable
              },
              on: {
                handleChange (value) {
                  shelf.updateBatchEnable(value, 'ids=' + row.row.id)
                }
              }
            })
          }
        },
        {
          label: '附件所属表',
          prop: 'fileTableName'
        },
        {
          label: '附件对应字段',
          prop: 'fileFieldName'
        },
        {
          label: '表主键',
          prop: 'fileUniqueFieldName'
        }
      ],
      total: 0,
      loading: false,
      current: 1,
      size: 10,
      selectRows: [],
      dialogVisible: false,
      docDialogVisible: false,
      testRuleForm: {
        identityName: '',
        uniqueFieldValue: ''
      },
      testRules: {
        uniqueFieldValue: [
          { required: true, message: '请输入主键值', trigger: 'blur' },
          { required: true, message: '请选择主键值', trigger: 'change' }
        ]
      },
      ruleForm: {
        id: '',
        name: '',
        identityName: '',
        describe: '',
        directoryId: '',
        directoryName: '',
        enable: 1,
        fileFieldName: '',
        fileTableName: '',
        fileSchemaName: '',
        fileUniqueFieldName: []
      },
      rules: {
        name: [
          { required: true, message: '请输入接口名称', trigger: 'blur' }
        ],
        identityName: [
          { required: true, validator: validate, trigger: 'blur' }
        ],
        fileSchemaName: [
          { required: true, message: '请选择接模式', trigger: 'change' }
        ],
        fileFieldName: [
          { required: true, message: '请选择接口类型', trigger: 'change' }
        ],
        fileTableName: [
          { required: true, message: '请选择接口类型', trigger: 'change' }
        ],
        fileUniqueFieldName: [
          { required: true, message: '请选择接口类型', trigger: 'change' }
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
      title: '',
      unitCode: '',
      allTables: [],
      directoryName: '',
      paramsTable: [
        {
          name: 'file',
          describe: '本地存放文件的地址',
          type1: 'formData',
          type: 'File',
          must: '是'
        },
        {
          name: 'identityName',
          describe: '调用标识',
          type: 'String',
          type1: 'formData',
          must: '是'
        },
        {
          name: 'password',
          describe: '接口密码',
          type1: 'formData',
          type: 'String',
          must: '是'
        },
        {
          name: 'uniqueFieldValue',
          describe: '唯一字段值，多个字段组合使用英文逗号","分割',
          type1: 'formData',
          type: 'String',
          must: '是'
        }
      ],
      paramsTable1: [
        {
          name: 'identityName',
          describe: '调用标识',
          type: 'String',
          must: '是'
        },
        {
          name: 'password',
          describe: '接口密码',
          type: 'String',
          must: '是'
        },
        {
          name: 'uniqueFieldValue',
          describe: '唯一字段值，多个字段组合使用英文逗号","分割',
          type: 'String',
          must: '是'
        }
      ],
      resultTable: [
        {
          name: 'code',
          describe: '响应状态，0：成功',
          type: 'Integer',
          must: '是'
        },
        {
          name: 'msg',
          describe: '响应信息',
          type: 'String',
          must: '是'
        },
        {
          name: 'data',
          describe: '响应数据',
          type: 'String',
          must: '否'
        }
      ],
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
          label: '请求类型',
          prop: 'type1'
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
      doc: {
        describe: '',
        downloadAndPreviewGetUrlParams: '',
        downloadUrl: '',
        identityName: '',
        name: '',
        password: '',
        previewUrl: '',
        title: '',
        uniqueFieldFormat: '',
        uploadJsonUrl: '',
        uploadXmlUrl: ''
      }
    }
  },
  mounted () {
    this.resize()
    window.addEventListener('resize', this.resize, false)
  },
  methods: {
    query () {
      if (this.search.directoryId !== '') {
        this.current = 1
        this.queryAll()
      } else {
        this.$message.warning('请先选择数据目录')
      }
    },

    getList (data) {
      this.search.directoryId = data.id
      this.ruleForm.directoryId = data.canEdit === 0 ? data.id : ''
      this.directoryName = data.canEdit === 0 ? data.name : ''
      this.current = 1
      this.queryAll()
    },

    resize () {
      this.options['max-height'] = document.getElementById('tabs').offsetHeight - 265
      if (document.getElementById('dialog3')) {
        document.getElementById('dialog3').style['max-height'] = document.body.clientHeight - 250 + 'px'
      }
      if (document.getElementById('dialog4')) {
        document.getElementById('dialog4').style['max-height'] = document.body.clientHeight - 250 + 'px'
      }
    },

    reset () {
      this.search.describe = ''
      this.search.identityName = ''
      this.search.name = ''
      this.search.fileFieldName = ''
      this.search.fileTableName = ''
    },

    selectionChange (rows) {
      this.selectRows = rows
    },

    onPageChange (current, size) {
      this.current = current
      this.size = size
      this.getInterfaceList()
    },

    add () {
      this.queryInterface()
      this.getDmSchemaOption()
      this.getAllTables()
      this.genIdentityName()
      this.ruleForm.directoryName = this.directoryName
      this.title = '新增'
      this.dialogVisible = true
      setTimeout(() => {
        this.$refs.ruleForm.clearValidate()
        this.resize()
      })
    },

    edit () {
      if (this.selectRows.length === 0) {
        this.$message.warning('请选择需要编辑的列')
      } else if (this.selectRows.length === 1) {
        if (this.selectRows[0].canEdit === 1) {
          this.$message.warning('此接口不能修改')
          return
        }
        this.queryInterface()
        this.getAllTables()
        this.genIdentityName()
        this.queryDetail(this.selectRows[0].id)
        this.title = '编辑'
        this.dialogVisible = true
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
        this.queryInterface()
        this.genIdentityName()
        this.copyRuleForm.id = this.selectRows[0].id
        this.copyRuleForm.directoryId = this.search.directoryId
        this.copyRuleForm.directoryName = this.directoryName
        this.title = '复制'
        this.dialogVisible = true
        setTimeout(() => {
          this.$refs.copyRuleForm.clearValidate()
        })
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
        var ids = this.selectRows.map(value => 'ids=' + value.id).join('&')
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
        var ids = this.selectRows.map(value => 'ids=' + value.id).join('&')
        this.updateBatchEnable(2, ids)
      }
    },

    restAllCondition () {
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
            this.deleteInterface(this.selectRows.map(value => 'ids=' + value.id).join('&'))
          })
      }
    },

    cancel () {
      this.dialogVisible = false
      this.ruleForm = {
        id: '',
        name: '',
        identityName: '',
        describe: '',
        directoryId: '',
        directoryName: '',
        enable: 1,
        fileFieldName: '',
        fileTableName: '',
        fileUniqueFieldName: []
      }
      this.copyRuleForm = {
        id: '',
        name: '',
        identityName: '',
        describe: '',
        directoryId: '',
        directoryName: ''
      }
    },

    submitForm (formName) {
      if (this.title === '复制') {
        this.$refs.copyRuleForm.validate((valid) => {
          if (valid) {
            this.copyInterface()
            this.dialogVisible = false
          } else {
            return false
          }
        })
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.title === '新增') {
              this.addInterface()
            }
            if (this.title === '编辑') {
              this.updateInterface()
            }
            this.dialogVisible = false
          } else {
            return false
          }
        })
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

    queryAll () {
      this.loading = true
      var params = {
        ...this.search,
        pageNum: this.current,
        pageSize: this.size
      }
      this.table = []
      queryAll(params).then(data => {
        this.loading = false
        if (data.code === 0) {
          this.table = data.data.rows
          this.total = data.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },

    queryInterface () {
      queryInterface().then(data => {
        if (data.code === 0) {
          this.tree = data.data ? data.data : []
        }
      })
    },

    getAllTables () {
      this.allTables = []
      getAllTables().then(data => {
        if (data.code === 0) {
          this.allTables = data.data ? data.data : []
        }
      })
    },

    tableChange () {
      this.getColumnInfosByTableName(this.ruleForm.fileTableName, this.ruleForm.fileSchemaName)
      this.ruleForm.fileFieldName = ''
      this.ruleForm.fileUniqueFieldName = []
    },

    getColumnInfosByTableName (name, schemaName) {
      this.fielsOptions = []
      getColumnInfosByTableName({
        tableName: name,
        schemaName
      }).then(data => {
        if (data.code === 0 && data.data) {
          this.fielsOptions = data.data
        }
      })
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

    addInterface () {
      var param = {
        ...this.ruleForm
      }
      param.fileUniqueFieldName = param.fileUniqueFieldName.join(',')
      param.identityName = this.unitCode + param.identityName
      addInterface(param).then(data => {
        if (data.code === 0) {
          this.$message.success('新增成功')
          this.queryAll()
        }
      })
    },

    queryDetail (id) {
      queryDetail({ id }).then(data => {
        if (data.code === 0) {
          if (this.title === '复制') {

          } else {
            this.ruleForm = {
              ...data.data
            }
            this.ruleForm.fileUniqueFieldName = data.data.fileUniqueFieldName.split(',')
            this.getColumnInfosByTableName(data.data.fileTableName, data.data.fileSchemaName)
            this.ruleForm.identityName = this.getUnitCode(data.data.identityName, false)
            this.unitCode = this.getUnitCode(data.data.identityName, true) + '_'
          }
        }
      })
    },

    updateInterface () {
      var param = {
        ...this.ruleForm
      }
      param.fileUniqueFieldName = param.fileUniqueFieldName.join(',')
      param.identityName = this.unitCode + param.identityName
      updateInterface(param).then(data => {
        if (data.code === 0) {
          this.$message.success('修改成功')
          this.queryAll()
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

    copyInterface () {
      var param = {
        ...this.copyRuleForm
      }
      param.identityName = this.unitCode + param.identityName
      copyInterface(param).then(data => {
        if (data.code === 0) {
          this.$message.success('复制成功')
          this.queryAll()
        }
      })
    },

    deleteInterface (id) {
      deleteInterface(id).then(data => {
        if (data.code === 0) {
          this.$message.success('删除成功')
          this.queryAll()
        }
      })
    },

    updateBatchEnable (enable, ids) {
      var params = 'enable=' + enable + '&' + ids
      updateBatchEnable(params).then(data => {
        if (data.code === 0) {
          if (enable === 1) {
            this.$message.success('启用成功')
          } else {
            this.$message.success('禁用用成功')
          }
          this.queryAll()
        }
      })
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
      const shelf = this
      var name = this.doc.name
      PizZipUtils.getBinaryContent('interface1.docx', function (error, content) {
        if (error) { throw error };

        var zip = new PizZip(content)
        var doc = new docxtemplater(zip)

        doc.setData({
          ...shelf.doc,
          left: '{',
          right: '}'
        })
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

    schemaNameChange () {
      this.ruleForm.fileTableName = ''
      this.ruleForm.fileFieldName = ''
      this.fielsOptions = []
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
        }
      })
    },

    setDisabled (data) {
      data.map(value => {
        value.disabled = value.canEdit === 1
        if (value.children) {
          this.setDisabled(value.children)
        }
      })
    },

    test (value) {
      if (this.selectRows.length === 0) {
        this.$message.warning('请选择需要操作的行')
      } else if (this.selectRows.length === 1) {
        if (value === 'upload') {
          this.testRuleForm.identityName = this.selectRows[0].identityName
          this.testDialogVisible = true
          this.testTitle = '上传'
        }
        if (value === 'download') {
          this.testRuleForm.identityName = this.selectRows[0].identityName
          this.testDialogVisible = true
          this.testTitle = '下载'
          this.getFileUniqueValues()
        }
        if (value === 'preview') {
          this.testRuleForm.identityName = this.selectRows[0].identityName
          this.testDialogVisible = true
          this.testTitle = '预览'
          this.getFileUniqueValues()
        }
      } else {
        this.$message.warning('只能选择一行')
      }
    },

    testSubmitForm () {
      this.$refs.testRuleForm.validate((valid) => {
        if (valid) {
          if (this.testTitle === '上传') {
            if (this.$refs.upload.uploadFiles.length) {
              this.$refs.upload.submit()
              this.testDialogVisible = false
            } else {
              this.$message.warning('请选择文件')
            }
          }
          if (this.testTitle === '下载') {
            this.downloadForTest(this.testRuleForm)
            this.testDialogVisible = false
          }
          if (this.testTitle === '预览') {
            this.previewForTest(this.testRuleForm)
          }
        } else {
          return false
        }
      })
    },

    uploadFile (params) {
      const formdata = new FormData()
      formdata.append('file', params.file)
      formdata.append('identityName', this.testRuleForm.identityName)
      formdata.append('uniqueFieldValue', this.testRuleForm.uniqueFieldValue)
      axios
        .postFile('/api/detoxification-data/sys-file-interface/uploadForTest', formdata).then(data => {
          if (data.code === 0) {
            this.$message.success('上传成功')
          }
        })
    },

    success () {
      this.$message.success('上传成功')
    },
    testCancel () {
      this.testRuleForm.uniqueFieldValue = ''
      this.$refs.testRuleForm.clearValidate()
      this.testDialogVisible = false
      if (this.$refs.upload) {
        this.$refs.upload.clearFiles()
      }
    },

    downloadForTest (params) {
      var name = []
      for (const key in params) {
        name.push(key + '=' + params[key])
      }
      name.push('token=' + getToken())
      getInterfaceAddr().then(data => {
        if (data.code === 0) {
          var downloadElement = document.createElement('a')
          downloadElement.href = data.data + '/api/detoxification-data/sys-file-interface/downloadForTest?' + name.join('&')
          document.body.appendChild(downloadElement)
          downloadElement.click()
          document.body.removeChild(downloadElement)
        }
      })
    },

    previewForTest (params) {
      var name = []
      for (const key in params) {
        name.push(key + '=' + params[key])
      }
      name.push('token=' + getToken())
      getInterfaceAddr().then(data => {
        if (data.code === 0) {
          window.open(data.data + '/api/detoxification-data/sys-file-interface/previewForTest?' + name.join('&'))
        }
      })
    },

    getFileUniqueValues () {
      getFileUniqueValues({
        interfaceIdentityName: this.testRuleForm.identityName
      }).then(data => {
        if (data.code === 0) {
          this.uniqueValuesOptions = data.data
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
