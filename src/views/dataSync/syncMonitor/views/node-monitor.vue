<template>
  <div class="nodeMonitorBox">
    <el-row :gutter="20">
      <el-col
        :span="8"
        v-for="(node, index) of nodesArr"
        :key="node.instId + index"
      >
        <div class="nodeCard">
          <p class="title">
            <span class="text">
              {{ node.instName }}
            </span>
            <el-button
              type="primary"
              v-has="'dataSync:monitor:detail'"
              @click="fetchErrorList(node)"
              >异常记录</el-button
            >
          </p>
          <div class="nodeState">
            <div class="icon">
              <span class="iconfont iconfuwuqi"></span>
            </div>
            <div class="state">
              <p class="name">系统状态</p>
              <el-tag
                :type="node.validFlag | nodeStateType"
                :hit="true"
                effect="light"
                >{{ node.validDesc }}</el-tag
              >
              <p class="text" v-if="node.validFlag !== 0">
                异常时间：{{ node.netFaultTime }}
              </p>
              <p class="name">网络状态</p>
              <el-tag
                :type="node.netValidFlag | nodeStateType"
                :hit="true"
                effect="light"
                >{{ node.netValidDesc }}</el-tag
              >
              <p class="text" v-if="node.netValidFlag !== 0">
                异常时间：{{ node.netFaultTime }}
              </p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
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
  fetchAllMonitorInstance,
  fetchErrorMonitorInstance
} from '@/projectModule/api/dataSync/index.js'
export default {
  components: {},
  props: {},
  data () {
    const _this = this
    return {
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
      },
      nodesArr: []
    }
  },
  filters: {
    nodeStateType (state) {
      const type = state === 0 ? 'primary' : 'error'
      return type
    }
  },
  created () {
    this.fetchTableData()
  },
  mounted () {},
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
      this.fetchErrorList()
    },
    pageChange (current, size) {
      this.dialogData.searchParams.pageNum = current
      this.dialogData.searchParams.pageSize = size
      this.fetchErrorList()
    },
    async fetchErrorList (row) {
      if (row) {
        // 第一次打开
        this.dialogData.searchParams.objName = row.instName
        this.dialogData.searchParams.pageNum = 1
        this.dialogData.title = row.instName + '  异常记录'
        this.dialogData.visible = true
      }

      const result = await fetchErrorMonitorInstance(
        this.dialogData.searchParams
      )
      const { code, data } = result
      const { total = 0, rows = [] } = data || {}
      if (code === 0) {
        this.dialogData.rows = rows
        this.dialogData.total = total
      }
    },
    async fetchTableData () {
      const result = await fetchAllMonitorInstance()
      if (result.code === 0) {
        this.nodesArr = result.data || []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$border-color: #ebebeb;
$danger-text-color: #f15973;
.nodeMonitorBox {
  padding: 20px;
  padding-top: 0;
  .el-col .nodeCard {
    margin-bottom: 20px;
    border: 1px solid $border-color;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .title {
      margin: 0;
      padding: 0;
      height: 60px;
      border-bottom: 1px solid $border-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        font-size: 16px;
        margin-left: 20px;
        font-weight: bold;
        color: #272727;
      }
      .el-button {
        margin-right: 20px;
      }
    }
    .nodeState {
      padding: 20px;
      display: flex;
      .icon {
        display: block;
        width: 132px;
        height: 132px;
        margin-right: 40px;
        line-height: 132px;
        text-align: center;
        border-radius: 50%;
        background: #cce5ff;
      }
      .iconfont {
        font-size: 61px;
        color: #007cff;
      }
    }
    .state {
      p {
        margin-top: 8px;
        margin-bottom: 8px;
      }
      p.name {
        font-size: 14px;
        font-weight: bold;
      }
      .el-tag {
        // padding: 12px 14px;
        // height: unset;
        // line-height: unset;
        font-size: 16px;
        font-weight: bold;
      }
      p.text {
        font-size: 14px;
        color: #a3a4b5;
      }
      span.danger {
        color: $danger-text-color;
      }
    }
  }
}
</style>
