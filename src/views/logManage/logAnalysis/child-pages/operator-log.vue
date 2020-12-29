<template>
  <div class="operate-log" v-kr-loading="loading">
    <search-bar @doSearch="fetchTableData"></search-bar>
    <div style="padding: 14px">
      <buttons-bar :buttons="buttons" style="margin-bottom: 14px"></buttons-bar>
      <kr-el-table
        ref="tableComponent"
        @sort-change="sortChange"
        @row-click="tableRowClick"
        @selection-change="selectedRows = $event"
        @on-page-change="pageChange"
        :options="tableConfig"
        :columns="columns"
        :rows="rows"
        :total="total"
      ></kr-el-table>
      <el-dialog
        :title="dialogData.title"
        :close-on-click-modal="false"
        :visible.sync="dialogData.visible"
      >
        <table-info
          :inOneCell="false"
          :data="dialogData.row"
          :cells="dialogData.cells"
        ></table-info>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  fetchLogAnalysisLogList,
  deleteAnalysisLogByIds,
  deleteAnalysisLogByCondition
} from '@/projectModule/api/logManage/index.js'
import searchBar from './components/search-bar.vue'
import krExcelExport from '@/projectModule/components/kr-excel-export/index.vue'
import {
  operateExpCfg,
  operateDetailCells,
  operateTableCfg
} from './components/config'

import buttonsBar from './components/buttons-bar.vue'
import tableInfo from './components/kr-table-info/index.vue'
export default {
  components: {

    buttonsBar,
    searchBar,
    tableInfo
  },
  props: {},
  data () {
    // const _this = this
    return {
      loading: false,
      tableConfig: {
        showSelection: true,
        showPagination: true
      },
      searchParams: {
        pageNum: 1,
        pageSize: 10,
        sortName: 'time',
        sortRule: 'DESC',
        logType: 'operation'
      },
      dialogData: {
        title: '详情',
        visible: false,
        row: {},
        cells: operateDetailCells
      },
      rows: [],
      total: 0,
      activeRow: {},
      selectedRows: [],
      columns: operateTableCfg
    }
  },
  computed: {
    buttons () {
      const _this = this
      const length = this.selectedRows.length
      return [
        {
          permission: 'logmanage:operation:view',
          type: 'primary',
          plain: false,
          text: '查看',
          icon: 'iconfont iconai-eye',
          // number: length,
          fn: () => {
            const { activeRow } = this
            if (JSON.stringify(activeRow) === '{}') {
              this.$message.error('请先单击表格行，再执行此操作！')
            } else {
              this.dialogData.row = { ...activeRow }
              this.dialogData.visible = true
            }
          }
        },
        {
          permission: 'logmanage:operation:export',
          render (h, row) {
            return h(krExcelExport, {
              props: {
                icon: 'el-icon-download',
                fileName: '操作日志',
                buttonType: 'primary',
                title: '导出' + (length ? ` (${length})` : ''),
                disabled: !length,
                exportConfig: () => _this.exportData({ isExportAll: false })
              },
              on: {
                // someEv: (type) => {
                //   _this.someFunc()
                // }
              }
            })
          }
        },
        {
          permission: 'logmanage:operation:delete',
          number: length,
          render (h) {
            const numberText = length ? `(${length})` : ''
            return (
              <el-popconfirm
                confirm-button-text="确定删除"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                confirm-button-type="danger"
                title="删除后无法逆转，确定删除吗？"
                onConfirm={() => {
                  _this.doMultiDelete()
                }}
              >
                <el-button
                  icon="el-icon-delete-solid"
                  type="danger"
                  slot="reference"
                >
                  删除已选 {numberText}
                </el-button>
              </el-popconfirm>
            )
          }
        },
        {
          type: '-',
          plain: true,
          text: '清空',
          icon: 'iconfont iconshuazi-1',
          number: length,
          fn: () => {
            this.$refs.tableComponent.clearSelection()
          }
        },
        {
          permission: 'logmanage:operation:exportAll',
          render (h) {
            return h(krExcelExport, {
              props: {
                icon: 'el-icon-download',
                fileName: '操作日志',
                buttonType: 'primary',
                title: '全部导出' + (_this.total ? ` (${_this.total})` : ''),
                disabled: !_this.total,
                exportConfig: () => _this.exportData({ isExportAll: true })
              },
              on: {
                // someEv: (type) => {
                //   _this.someFunc()
                // }
              }
            })
          }
        },
        {
          permission: 'logmanage:operation:deleteAll',
          number: length,
          render (h) {
            return (
              <el-popconfirm
                confirm-button-text="确定删除"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                confirm-button-type="danger"
                title="删除后无法逆转，确定删除吗？"
                onConfirm={() => {
                  _this.doDeleteAll()
                }}
              >
                <el-button
                  icon="el-icon-delete-solid"
                  type="danger"
                  slot="reference"
                >
                  全部删除 {_this.total ? ` (${_this.total})` : ''}
                </el-button>
              </el-popconfirm>
            )
          }
        }
      ]
    }
  },
  watch: {
    loading (val) {
      if (val) {
        setTimeout(() => {
          this.loading = false
        }, 5000)
      }
    }
  },
  created () {},
  mounted () {
    const parentDom = document.getElementById('analysisLog')
    this.tableConfig['max-height'] = parentDom.offsetHeight - 46
    this.fetchTableData()
  },
  methods: {
    sortChange ({ order, prop }) {
      let sortRule = ''
      if (order === 'ascending') {
        sortRule = 'ASC'
      } else {
        sortRule = 'DESC'
      }
      if (order === null) {
        prop = ''
      }
      this.searchParams.sortName = prop
      this.searchParams.sortRule = sortRule
      this.fetchTableData()
    },
    tableRowClick (row, column, event) {
      this.activeRow = { ...row }
    },
    pageChange (current, size) {
      this.searchParams.pageNum = current
      this.searchParams.pageSize = size
      this.fetchTableData()
    },
    async fnGetData (isExportAll) {
      if (!isExportAll) {
        return this.selectedRows || []
      }
      const params = { ...this.searchParams, pageNum: 1, pageSize: 10000 }
      this.searchParams = params
      const result = await fetchLogAnalysisLogList(params, 'operation')
      const {
        data: { rows = [] }
      } = result
      return rows
    },
    async doMultiDelete () {
      const ids = this.selectedRows.map((it) => it.id)
      if (!ids.length) {
        return this.$message.error('请先选择数据，再进行删除操作！')
      }
      this.loading = true

      const logType = 'operation'
      const result = await deleteAnalysisLogByIds({ ids, logType })
      this.loading = false
      if (result.code === 0) {
        this.$message.success('删除成功！')
        this.fetchTableData()
      }
    },
    async doDeleteAll () {
      this.loading = true
      const params = {
        ...this.searchParams,
        pageNum: 1,
        pageSize: 10 // this.total
      }
      const result = await deleteAnalysisLogByCondition(params, 'operation')
      this.loading = false
      if (result.code === 0) {
        this.$message.success('删除成功！')
        this.fetchTableData()
      }
    },
    exportData ({ isExportAll }) {
      const fnGetData = this.fnGetData(isExportAll)
      return [
        {
          fnGetData,
          config: operateExpCfg
        }
      ]
    },
    async fetchTableData (form = {}) {
      const params = { ...this.searchParams, ...form }
      this.searchParams = params
      const result = await fetchLogAnalysisLogList(params, 'operation')
      const {
        code,
        data: { total = 0, rows = [] }
      } = result
      if (code === 0) {
        this.total = total
        this.rows = rows
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.operate-log {
  // padding: 14px;
}
</style>
