<template>
  <div class="dataconflict-watch">
    <kr-search class="searchForm">
      <kr-search-item label="冲突状态:" :labelWidth="80"
        ><el-select
          v-model="searchParams.state"
          placeholder="请选择冲突状态"
        >
          <el-option
            v-for="option of stateOption"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option> </el-select
      ></kr-search-item>
      <kr-search-item label="节点Id:" :labelWidth="80">
        <el-input
          placeholder="请输入节点Id"
          v-model="searchParams.instanceId"
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
    <el-dialog
      title="手动修改状态"
      width="40%"
      :visible.sync="dialogData.visible"
    >
    <el-form ref="modifyConfForm" :model="dialogData.params" :rules="dialogData.rules">
      <el-form-item label="状态" prop="state" label-width="80px">
        <el-select
        style="width:100%"
          v-model="dialogData.params.state"
          placeholder="请选择冲突状态"
        >
          <el-option
            v-for="option of stateOption"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option> </el-select
      >
      </el-form-item>
      <el-form-item label-width="80px">
        <el-button type="primary" @click="modifyState">确  定</el-button>
        <el-button @click="dialogData.visible=false">取消</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  modifyMonitorConflict,
  fetchMonitorConflict
} from '@/projectModule/api/dataSync/index.js'
export default {
  components: {},
  props: {},
  data () {
    const _this = this
    return {
      stateOption: [
        {
          label: '未解决',
          value: 1
        },
        {
          label: '已解决',
          value: 2
        }
      ],
      dialogData: {
        visible: false,
        params: {
          seqNo: '',
          state: ''
        },
        rules: {
          state: [
            {
              required: true,
              message: '请选择状态',
              trigger: 'change'
            }
          ]
        }
      },
      searchParams: {
        instanceId: '',
        state: '',
        pageNum: 1,
        pageSize: 10,
        sortName: '',
        sortRule: 'DESC'
      },
      total: 0,
      rows: [
      ],
      tableConfig: {
        showSelection: false,
        showPagination: true,
        'max-heigth': null
      },
      columns: [
        { prop: 'seqNo', label: '冲突序号', width: 80, align: 'left' },
        {
          prop: 'instName',
          label: '产生冲突的节点编号',
          align: 'left',
          formatter (row) {
            return row.instName + `  id:(${row.instId})`
          }
        },
        {
          prop: 'repName',
          label: '对应复制名',
          align: 'left',
          formatter (row) {
            return row.repName + `  id:(${row.repId})`
          }
        },
        {
          prop: 'tableName',
          label: '冲突表 ID',
          align: 'left',
          formatter (row) {
            return row.tableName || row.tableId
          }
        },
        // { prop: 'type', label: '操作类型', align: 'left' },
        { prop: 'keyData', label: '冲突数据的PK值', align: 'left' },
        {
          prop: 'occTime',
          label: '冲突产生时间',
          align: 'left',
          width: 160,
          formatter (row) {
            return _this.$dayjs(row.occTime).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          prop: 'state',
          label: '状态',
          width: 80,
          render (h, params) {
            const row = params.row
            const typeObj = { 2: 'primary', 1: 'danger' }
            const textObj = { 2: '已修改', 1: '未修改' }
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
          fixed: 'right',
          render (h, params) {
            const row = params.row
            return <el-button v-has="dataSync:monitor:modify" type="text" onClick={() => {
              _this.dialogData.visible = true
              _this.dialogData.params.seqNo = row.seqNo
            }}>修改状态</el-button>
          }
        }
      ]
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
      const result = await fetchMonitorConflict(this.searchParams)
      const { code, data } = result
      const { total = 0, rows = [] } = data || {}
      if (code === 0) {
        this.rows = rows
        this.total = total
      }
    },
    modifyState (row) {
      this.$refs.modifyConfForm.validate(valid => {
        if (valid) {
          modifyMonitorConflict(this.dialogData.params).then(result => {
            if (result.code === 0) {
              this.$message.success(result.msg)
              this.dialogData.visible = false
              this.dialogData.params.state = ''
              this.fetchTableData()
            }
          })
        }
      })
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
.dataconflict-watch {
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
