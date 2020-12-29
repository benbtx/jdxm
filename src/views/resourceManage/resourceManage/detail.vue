<template>
    <div style="height: 100%" id="tabs">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="字段信息" name="first">
          <div>
            <kr-el-table
              :options="options"
              :columns="columns"
              :rows="table"
              :total="total"
              ref="table"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据详情" name="second">
            <div>
              <div style="font-family: monospace">
                <span style="color: #AC4142">SELECT</span> * <span style="color: #AC4142">FROM</span> "{{schemaName}}"."{{tableName}}"
              </div>
              <div style="color: #AC4142;line-height: 30px;font-family: monospace">
                WHERE
              </div>
              <div style="border: 1px solid gainsboro;height: 100px">
                <textarea ref="code" placeholder="按Ctrl键进行代码提示" class="codesql"/>
              </div>
              <div style="margin-top: 10px">
                <el-alert
                  style="width: 500px;display: inline-block"
                  type="warning"
                  :closable="false"
                  description="允许输入过滤条件，注意：不要写'WHERE'字符。示例：a=1 AND (b=2 OR c=3)">
                </el-alert>
                <el-button type="primary" style="float:right" @click="getSql">提交</el-button>
              </div>
            </div>
            <kr-el-table
              style="margin-top: 10px"
              :options="options1"
              :columns="detailColumns"
              :rows="detailTable"
              :total="detailTotal"
              :pageNum="page"
              @on-page-change="onDetailPageChange"/>

        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import { getColumnInfosByTableName, queryPageByTableName } from '@/projectModule/api/resourceManage/resourceManage.js'

import 'codemirror/theme/base16-light.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'

import * as CodeMirror from 'codemirror'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/sql-hint.js'

export default {
  name: 'detail',
  data () {
    return {
      activeName: 'first',
      input: '',
      options: {
        showIndex: true,
        showSelection: false,
        'max-height': 1000
      },
      options1: {
        showIndex: true,
        showSelection: false,
        'max-height': 1000
      },
      table: [],
      columns: [
        {
          label: '是否为主键',
          prop: 'ifPrimaryKey',
          width: 120,
          formatter (row) {
            return row.ifPrimaryKey ? '是' : '否'
          }
        },
        {
          label: '字段名称',
          prop: 'name'
        },
        {
          label: '非空',
          prop: 'isnull',
          width: 100,
          formatter (row) {
            return row.isnull === 0 ? '是' : '否'
          }
        },
        {
          label: '字段类型',
          prop: 'type',
          width: 120
        },
        {
          label: '字段精度',
          width: 100,
          prop: 'dataLength',
          formatter (row) {
            return row.dataLength === null ? '-' : row.dataLength
          }
        },
        {
          label: '字段标度',
          width: 100,
          prop: 'dataScale',
          formatter (row) {
            return row.dataScale === null ? '-' : row.dataScale
          }
        },
        {
          label: '默认值',
          width: 100,
          prop: 'defaultValue'
        },
        {
          label: '字段注释',
          prop: 'comment',
          'show-overflow-tooltip': true
        }
      ],
      total: 0,
      detailTable: [],
      detailColumns: [],
      detailTotal: 0,
      loading: false,
      page: 1,
      size: 10,
      tableName: '',
      schemaName: '',
      editor: '',
      sql: ''
    }
  },
  mounted () {
    this.resize()
    window.addEventListener('resize', this.resize, false)
    this.initCodeMirror()
  },
  methods: {
    resize () {
      this.options['max-height'] = document.getElementById('tabs').offsetHeight - 62
      this.options1['max-height'] = document.getElementById('tabs').offsetHeight - 310
    },
    onDetailPageChange (current, size) {
      this.page = current
      this.size = size
      this.getDetail({
        pageSize: this.size,
        pageNum: this.page,
        tableName: this.tableName,
        schemaName: this.schemaName
      })
    },
    getColumnInfosByTableName (schemaName, tableName) {
      this.loading = true
      this.page = 1
      this.tableName = tableName
      this.schemaName = schemaName
      this.detailColumns = []
      getColumnInfosByTableName({
        schemaName,
        tableName
      }).then(data => {
        this.loading = false
        this.table = []
        if (data.code === 0) {
          this.table = data.data ? data.data : []
          this.detailColumns = this.table.map(value => {
            return {
              label: value.name,
              prop: value.name
            }
          })
          this.page = 1
          this.getDetail({
            pageSize: this.size,
            pageNum: this.page,
            tableName: this.tableName,
            schemaName: this.schemaName
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },

    getDetail (params) {
      if (this.editor) {
        this.sql = this.editor.getValue()
      } else {
        this.sql = ''
      }
      params.where = this.sql
      queryPageByTableName(params).then(data => {
        this.detailTable = []
        if (data.code === 0) {
          this.detailTable = data.data.rows
          this.detailTotal = data.data.total
        }
      })
    },

    initCodeMirror () {
      if (this.editor) {
        return
      }
      this.editor = CodeMirror.fromTextArea(this.$refs.code, {
        lineNumbers: false, // 显示行号
        styleActiveLine: true, // 当前行背景高亮
        lineWrapping: true, // 自动换行
        autofocus: true,
        mode: { name: 'text/x-mysql' }, // 定义mode

        theme: 'base16-light', // 设置黑色主题
        hintOptions: {
          completeSingle: false
        },

        extraKeys: {
          Ctrl: () => {
            this.editor.showHint()
          }
        }
      })
    },

    getSql () {
      if (!this.tableName) {
        this.$message.warning('请选择表')
        return
      }
      this.page = 1
      this.getDetail({
        pageSize: this.size,
        pageNum: this.page,
        tableName: this.tableName,
        schemaName: this.schemaName
      })
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
}
</style>
<style>
#tabs .CodeMirror{
  height: 100px;
}
</style>
