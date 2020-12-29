<template>
  <div class="relation-watch">
    <!-- <kr-search class="searchForm"> -->
      <!-- <kr-search-item label="同步模式:" :labelWidth="80"
        ><el-select
          v-model="searchParams.syncMode"
          placeholder="请选择同步模式"
        >
          <el-option
            v-for="option of syncModeOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option> </el-select
      ></kr-search-item>
      <kr-search-item label="全局搜索:" :labelWidth="80">
        <el-input placeholder="请输入" v-model="searchParams.keyword"></el-input>
      </kr-search-item>
      <kr-search-item
        ><el-button type="primary" @click="fetchTableData" icon="el-icon-search"
          >查询</el-button
        ><el-button @click="reset" icon="el-icon-refresh-right">重置</el-button>
      </kr-search-item>
    </kr-search> -->
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
    <el-dialog
      width="70vw"
      :title="dialogData.title"
      :visible.sync="dialogData.visible"
    >
      <kr-el-table
        class="kr-el-table"
        ref="tableComponent"
        @sort-change="sortChange"
        @on-page-change="pageChange"
        :options="dialogData.tableConfig"
        :columns="dialogData.columns"
        :rows="dialogData.rows"
        :total="dialogData.total"
      ></kr-el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchMonitorRelation,
  fetchErrorMonitorRelation
} from '@/projectModule/api/dataSync/index.js'
export default {
  components: {},
  props: {},
  data () {
    const _this = this
    return {
      // syncModeOptions: [
      //   {
      //     label: '系统模式',
      //     value: 0
      //   },
      //   {
      //     label: '上报模式',
      //     value: 1
      //   }
      // ],
      total: 10,
      rows: [],
      tableConfig: {
        showSelection: false,
        showPagination: true,
        'max-height': null
      },
      columns: [
        {
          prop: 'syncFlag',
          label: '同步模式',
          align: 'left',
          formatter (row) {
            const obj = { 0: '系统模式', 1: '上报模式' }
            return obj[row.syncFlag] || row.syncFlag
          }
        },
        { prop: 'minstName', label: '源节点', align: 'left' },
        { prop: 'sinstName', label: '目标节点', align: 'left' },
        {
          prop: 'repName', label: '复制关系', align: 'left'
        },
        { prop: 'desc', label: '描述', align: 'left' },
        {
          prop: 'validFlag',
          label: '状态',
          width: 180,
          render (h, params) {
            const row = params.row
            const type = row.validFlag === 0 ? 'primary' : 'danger'
            return (
              <el-tag hit={true} effect="light" type={type}>
                {row.validDesc}
              </el-tag>
            )
          }
        },
        {
          prop: 'opt',
          label: '操作',
          width: 80,
          render (h, params) {
            const row = params.row
            return <el-button v-has="dataSync:monitor:detail" onClick={() => { _this.fetchErrorTableData(row) }} type="text">异常记录</el-button>
          }
        }
      ],
      dialogData: {
        title: '',
        visible: false,
        searchParams: {
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
          { prop: 'objName', label: '故障节点或关系', align: 'left' },
          // { prop: 'faultType', label: '故障类型', align: 'left' },
          { prop: 'faultDesc', label: '故障描述', align: 'left' },
          {
            prop: 'startTime',
            label: '故障开始时间',
            width: 160,
            align: 'left',
            formatter (row) {
              return _this.$dayjs(row.startTime).format('YYYY-MM-DD HH:mm:ss')
            }
          },
          {
            prop: 'endTime',
            label: '故障结束时间',
            width: 160,
            align: 'left',
            formatter (row) {
              return _this.$dayjs(row.endTime).format('YYYY-MM-DD HH:mm:ss')
            }
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    const parentDom = document.getElementById('syncMonitor')
    this.tableConfig['max-height'] = parentDom.offsetHeight - 190
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
      this.dialogData.searchParams.sortName = prop
      this.dialogData.searchParams.sortRule = sortRule
      this.fetchErrorTableData()
    },
    pageChange (current, size) {
      this.dialogData.searchParams.pageNum = current
      this.dialogData.searchParams.pageSize = size
      this.fetchErrorTableData()
    },
    async fetchErrorTableData (row) {
      if (row) {
        // 第一次打开
        this.dialogData.searchParams.objName = row.repName
        this.dialogData.searchParams.pageNum = 1
        this.dialogData.title = row.repName + '  异常记录'
        this.dialogData.visible = true
      }

      const result = await fetchErrorMonitorRelation(this.dialogData.searchParams)
      const { code, data } = result
      const { total = 0, rows = [] } = data || {}
      if (code === 0) {
        this.dialogData.rows = rows
        this.dialogData.total = total
      }
    },
    async fetchTableData () {
      const result = await fetchMonitorRelation()
      const { code, data } = result
      if (code === 0) {
        this.rows = data || []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.relation-watch {
  .searchForm  {
    .el-input,
    .el-select
     {
      width: 100%;
    }
  }
}
</style>
