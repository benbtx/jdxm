<template>
  <div class="bcgColor syncDispatch" id="syncDispatch">
    <kr-search class="searchForm" style="margin-bottom: -10px">
      <kr-search-item label="数据源:" :labelWidth="80"
        ><el-select v-model="searchParams.sourceId" placeholder="请先选择数据源">
          <el-option
            v-for="option of sourceOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option> </el-select
      ></kr-search-item>
      <kr-search-item label="模式选择:" :labelWidth="80"
        ><el-select v-model="searchParams.schema" placeholder="请选择模式">
          <el-option
            v-for="option of schemaOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option> </el-select
      ></kr-search-item>
       </kr-search
    ><kr-search>
      <kr-search-item label="全局搜索:" :labelWidth="80">
        <el-input
          placeholder="请输入表名或者表注释"
          v-model="searchParams.keyword"
        ></el-input>
      </kr-search-item>
      <kr-search-item
        ><el-button type="primary" @click="fetchTableData" icon="el-icon-search"
          >查询</el-button
        ><el-button @click="reset" icon="el-icon-refresh-right">重置</el-button>
      </kr-search-item>
    </kr-search>
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
</template>

<script>
import {
  fetchAlterList,
  modifyAlter,
  fetchAllSource
} from '@/projectModule/api/dataSync/index.js'
export default {
  components: {},
  props: {},
  data () {
    const _this = this
    return {
      schemaOptions: [
        {
          label: '私有化',
          value: 'JD_PRIVATE'
        },
        {
          label: '公有化',
          value: 'JD_PUBLIC'
        }
      ],
      sourceOptions: [],
      searchParams: {
        schema: '',
        sourceId: '',
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
        'max-heigth': null
      },
      columns: [
        { prop: 'tableName', label: '表名称', align: 'left' },
        { prop: 'comments', label: '表备注', align: 'left' },
        { prop: 'owner', label: '表模式', align: 'left' },
        {
          prop: 'opt',
          label: '操作',
          width: 110,
          render (h, params) {
            const row = params.row
            return (
              <el-button
                v-has="dataSync:dispatch:modify"
                type="text"
                onClick={() => {
                  _this.modifyTableMode(row)
                }}
              >
                修改模式
              </el-button>
            )
          }
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    const parentDom = document.getElementById('syncDispatch')
    this.tableConfig['max-height'] = parentDom.offsetHeight - 180
    this.fecthSourceOptions()
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
      if (this.searchParams.sourceId === '') {
        return this.$message.error('请先选择数据源再执行查询！')
      }
      const result = await fetchAlterList(this.searchParams)
      const { code, data } = result
      const { total = 0, rows = [] } = data || {}
      if (code === 0) {
        this.rows = rows
        this.total = total
      }
    },
    async fecthSourceOptions () {
      const result = await fetchAllSource()
      let { code, data } = result
      if (code === 0) {
        data = data || []
        this.sourceOptions = data.map((node) => {
          // level 0是局级数据，1是所级数据
          const { dbName: label, sourceId: value } = node
          return { ...node, label, value }
        })
      }
    },
    async modifyTableMode (row) {
      const { sourceId } = this.searchParams
      const { owner: schema, tableName } = row
      const result = await modifyAlter({ sourceId, schema, tableName })
      const { code } = result
      if (code === 0) {
        this.$message.success(result.msg)
        this.fetchTableData()
      }
    },
    reset () {
      this.searchParams = {
        schema: '',
        sourceId: '',
        keyword: '',
        pageNum: 1,
        pageSize: 10,
        sortName: '',
        sortRule: 'DESC'
      }
      this.fetchTableData()
    }
  }
}
</script>
<style lang="scss" scoped>
.syncDispatch {
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
