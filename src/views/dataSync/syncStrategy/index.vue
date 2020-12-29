<template>
  <div class="bcgColor sync-strategy" id="sync-strategy">
    <kr-search class="searchForm">
      <kr-search-item label="同步模式:" :labelWidth="80"
        ><el-select
          v-model="searchParams.strategyType"
          placeholder="请选择同步模式"
          :clearable="false"
        >
          <el-option
            v-for="option of syncModeOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option> </el-select
      ></kr-search-item>
      <kr-search-item label="全局搜索:" :labelWidth="80">
        <el-input
          placeholder="请输入"
          v-model="searchParams.keyword"
        ></el-input>
      </kr-search-item>
      <kr-search-item
        ><el-button type="primary" @click="fetchTableData" icon="el-icon-search"
          >查询</el-button
        ><el-button @click="reset" icon="el-icon-refresh-right">重置</el-button>
      </kr-search-item>
    </kr-search>
    <div style="padding: 14px">
      <buttons-bar :buttons="buttons" style="margin-bottom: 14px"></buttons-bar>
      <kr-el-table
        class="kr-el-table"
        ref="tableComponent"
        @sort-change="sortChange"
        @on-page-change="pageChange"
        :options="tableConfig"
        :columns="columns"
        :rows="rows"
        :total="total"
      ></kr-el-table>
    </div>
    <el-dialog
      :title="dialogData.title"
      width="70%"
      top="10vh"
      :close-on-click-modal="false"
      :visible.sync="dialogData.visible"
    >
      <strategy-form
        @addSuccess="
          dialogData.visible = false;
          dialogData.showForm = false;
          fetchTableData();
        "
        @cancel="
          dialogData.visible = false;
          dialogData.showForm = false;
        "
        :visible="dialogData.visible && dialogData.showForm"
        v-if="dialogData.showForm"
      ></strategy-form>
    </el-dialog>
  </div>
</template>

<script>
import strategyForm from './form.vue'
import buttonsBar from '@/views/logManage/logAnalysis/child-pages/components/buttons-bar.vue'
import {
  deleteStrategy,
  queryAllStrategy,
  releaseStrategy,
  cancelStrategy
} from '@/projectModule/api/dataSync/index.js'
export default {
  components: { buttonsBar, strategyForm },
  props: {},
  data () {
    const _this = this
    return {
      syncModeOptions: [
        { label: '全部', value: 2 },
        {
          label: '系统模式',
          value: 0
        },
        {
          label: '上报模式',
          value: 1
        }
      ],
      dialogData: {
        visible: false,
        showForm: false,
        title: '新增',
        row: {}
      },
      searchParams: {
        strategyType: 2,
        keyword: '',
        pageNum: 1,
        pageSize: 10,
        sortName: '',
        sortRule: 'DESC'
      },
      total: 10,
      rows: [],
      tableConfig: {
        showSelection: false,
        showPagination: true,
        'max-height': null
      },
      columns: [
        {
          prop: 'strategyType',
          label: '同步模式',
          align: 'left',
          formatter (row) {
            const obj = { 0: '系统模式', 1: '上报模式' }
            return obj[row.strategyType]
          }
        },
        { prop: 'sourceInstance', label: '源节点', align: 'left' },
        { prop: 'sourceTable', label: '源表', align: 'left' },
        { prop: 'targetInstance', label: '目标节点', align: 'left' },
        { prop: 'targetTable', label: '目标表', align: 'left' },
        { prop: 'explain', label: '描述', align: 'left' },
        {
          prop: 'createTime',
          label: '创建时间',
          width: 160,
          align: 'left',
          formatter (row) {
            return _this.$dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          prop: 'state',
          label: '状态',
          width: 100,
          render (h, params) {
            const row = params.row
            const typeObj = { 1: 'success', 0: 'danger' }
            const textObj = { 1: '已发布', 0: '未发布' }
            return (
              <el-tag hit={true} effect="light" type={typeObj[row.state]}>
                {textObj[row.state]}
              </el-tag>
            )
          }
        },
        {
          prop: 'opt',
          label: '操作',
          width: 110,
          render (h, params) {
            const row = params.row
            return (
              <div>
                {row.state === 0 && (
                  <el-button
                    v-has="syncData:syncStrategy:release"
                    style="margin-right:8px"
                    type="text"
                    slot="reference"
                    onClick={() => {
                      _this.releaseStrategy(row)
                    }}
                  >
                    发布
                  </el-button>
                )}
                {row.state === 1 && (
                  <el-button
                    v-has="syncData:syncStrategy:cancel"
                    style="margin-right:8px"
                    type="text"
                    slot="reference"
                    onClick={() => {
                      _this.cancelStrategy(row)
                    }}
                  >
                    取消
                  </el-button>
                )}
                <el-popconfirm
                  v-has="syncData:syncStrategy:delete"
                  confirm-button-text="确定删除"
                  cancel-button-text="取消"
                  icon="el-icon-info"
                  icon-color="red"
                  confirm-button-type="danger"
                  title="删除后无法逆转，确定删除吗？"
                  onConfirm={() => {
                    _this.doDelete(row)
                  }}
                >
                  <el-button style="color:red" type="text" slot="reference">
                    删除
                  </el-button>
                </el-popconfirm>
              </div>
            )
          }
        }
      ]
    }
  },
  computed: {
    buttons () {
      return [
        {
          permission: 'syncData:syncStrategy:add',
          type: 'primary',
          plain: false,
          text: '新增',
          icon: 'el-icon-plus',
          fn: () => {
            this.dialogData.title = '新增'
            this.dialogData.showForm = true
            this.dialogData.visible = true
          }
        }
      ]
    }
  },
  watch: {},
  created () {},
  mounted () {
    const parentDom = document.getElementById('sync-strategy')
    this.tableConfig['max-height'] = parentDom.offsetHeight - 180
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
    pageChange (current, size) {
      this.searchParams.pageNum = current
      this.searchParams.pageSize = size
      this.fetchTableData()
    },
    async fetchTableData () {
      const searchParams = { ...this.searchParams }
      searchParams.pageNum--
      const result = await queryAllStrategy(searchParams)
      const { code, data } = result
      const { total = 0, rows = [] } = data || {}
      if (code === 0) {
        this.rows = rows
        this.total = total
      }
    },
    async cancelStrategy (row) {
      const result = await cancelStrategy({ id: row.id })
      if (result.code === 0) {
        this.fetchTableData()
      }
    },
    async releaseStrategy (row) {
      const result = await releaseStrategy({ id: row.id })
      if (result.code === 0) {
        this.fetchTableData()
      }
    },
    async doDelete (row) {
      const result = await deleteStrategy({ id: row.id })
      if (result.code === 0) {
        this.fetchTableData()
      }
    },
    reset () {
      this.searchParams = {
        pageNum: 1,
        pageSize: 10,
        sortName: '',
        sortRule: 'DESC'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sync-strategy {
  height: 100%;
  position: relative;
  background: #fff;
  .searchForm {
    .el-input,
    .el-select {
      width: 100%;
    }
  }
}
.kr-el-table {
  margin-top: 20px;
}
</style>
