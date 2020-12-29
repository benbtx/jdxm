import dayjs from 'dayjs'
// const levelObj = {
//   info: '信息日志',
//   warn: '警告日志',
//   error: '错误日志',
//   fatal: '致命日志'
// }
// const messageOperationObj = {
//   register: '注册',
//   publish: '发布',
//   subscription: '订阅',
//   check: '审核',
//   send: '发送'

// }
// const interfaceOperationObj = {
//   query: '查询',
//   write: '写入',
//   dispatch: '调度',
//   sync: '同步'
// }
// export const interfaceOperation = obj2OptionArr(interfaceOperationObj)
// export const levelOptions = obj2OptionArr(levelObj)
// export const operationTypeOptions = obj2OptionArr(messageOperationObj)
// function obj2OptionArr (obj) {
//   const items = Object.entries(obj)
//   return items.map(item => {
//     const [value, label] = item
//     return { value, label }
//   })
// }

function tableCfg2ExportCfg (columns) {
  const formatters = {}
  const includes = columns.map(col => {
    const { prop, label, formatter } = col
    formatters[prop] = {
      title: label
    }
    if (formatter) {
      formatters[prop].formatter = (val, row) => formatter(row)
    }
    return prop
  })
  return {
    includes,
    formatters
  }
}

// 操作日志表格配置
export const reportTableCfg = [
  { prop: 'reportName', label: '报表名称' },
  { prop: 'des', label: '描述' },
  { prop: 'authRoles', label: '分配角色' },
  { prop: 'authUsers', label: '分配用户' },
  { prop: 'createUser', label: '创建人员' },
  // { prop: 'releaseTime', label: '发布时间', sortable: 'custom' }
  {
    prop: 'reportStatus',
    label: '状态',
    formatter: (row) => {
      return row.reportStatus == 1 ? '启用' : '禁用'
    }
  },
  {
    prop: 'releaseTime',
    label: '发布时间',
    sortable: 'custom',
    // formatter: (row) => {
    //   return dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')
    // },
    align: 'left'
  }
]
// 操作日志-导出配置
export const reportExpCfg = tableCfg2ExportCfg(reportTableCfg)
