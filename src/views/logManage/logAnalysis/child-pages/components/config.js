import dayjs from 'dayjs'
const levelObj = {
  info: '信息日志',
  warn: '警告日志',
  error: '错误日志',
  fatal: '致命日志'
}
const messageOperationObj = {
  register: '注册',
  publish: '发布',
  subscription: '订阅',
  check: '审核',
  send: '发送'

}
const interfaceOperationObj = {
  query: '查询',
  write: '写入',
  dispatch: '调度',
  sync: '同步'
}
export const interfaceOperation = obj2OptionArr(interfaceOperationObj)
export const levelOptions = obj2OptionArr(levelObj)
export const operationTypeOptions = obj2OptionArr(messageOperationObj)
function obj2OptionArr (obj) {
  const items = Object.entries(obj)
  return items.map(item => {
    const [value, label] = item
    return { value, label }
  })
}

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

// 操作日志-详情弹窗配置
export const operateDetailCells = [
  { key: 'service', label: '服务名称' },
  { key: 'ip', label: '服务器IP' },
  { key: 'menu', label: '菜单' },
  { key: 'function', label: '功能' },
  {
    key: 'time',
    label: '时间',
    formatter: (row) => {
      return dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  { key: 'level', label: '日志级别' },
  { key: 'organization', label: '用户单位' },
  { key: 'userName', label: '用户名' },
  { key: 'msg', label: '日志内容', colspan: 3 }
]

// 操作日志表格配置
export const operateTableCfg = [
  // { prop: 'service', label: '服务名称', align: 'left' },
  { prop: 'ip', label: '服务器IP', align: 'left' },
  { prop: 'menu', label: '菜单', align: 'left' },
  { prop: 'function', label: '功能', align: 'left' },
  {
    prop: 'operationType', label: '操作类型', align: 'left'
  },
  {
    prop: 'time',
    label: '时间',
    sortable: 'custom',
    formatter: (row) => {
      return dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')
    },
    align: 'left'
  },
  { prop: 'level', label: '日志级别', align: 'left' },
  { prop: 'organization', label: '用户单位', align: 'left' },
  { prop: 'userName', label: '用户名', align: 'left' },
  { prop: 'msg', label: '日志内容', align: 'left', 'show-overflow-tooltip': true }
]
// 操作日志-导出配置
export const operateExpCfg = tableCfg2ExportCfg(operateTableCfg)
// 信令日志-表格配置
export const messageTableCfg = [
  { prop: 'service', label: '平台服务名称', align: 'left' },
  { prop: 'ip', label: '服务器IP', align: 'left' },
  {
    prop: 'operationType',
    label: '操作类型',
    align: 'left'
  },
  {
    prop: 'time',
    label: '时间',
    sortable: 'custom',
    formatter: (row) => {
      return dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')
    },
    align: 'left'
  },
  { prop: 'level', label: '日志级别', align: 'left' },
  { prop: 'organization', label: '用户单位', align: 'left' },
  { prop: 'clientName', label: '信令服务名称', align: 'left' },
  { prop: 'clientAuthCode', label: '服务授权码', align: 'left' },
  { prop: 'clientIp', label: '服务调用IP', align: 'left' }
]
// 信令日志-导出配置
export const messageExpCfg = tableCfg2ExportCfg(messageTableCfg)
// 信令日志-详情弹窗配置

export const messageDetailCells = [
  { key: 'service', label: '服务名称' },
  { key: 'ip', label: '服务器IP' },
  {
    key: 'operationType',
    label: '操作类型'
  },
  {
    key: 'time',
    label: '时间',
    formatter: (row) => {
      return dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  { key: 'level', label: '日志级别' }, { key: 'userName', label: '用户名' },
  { key: 'organization', label: '用户单位', colspan: 3 },

  { key: 'msg', label: '日志内容', colspan: 3 }
]
// 接口日志-表格配置
export const interfaceTableCfg = [
  // { prop: 'platform', label: '服务平台' },
  { prop: 'service', label: '服务名称', align: 'left' },
  { prop: 'ip', label: '服务器IP', align: 'left' },
  {
    key: 'time',
    label: '时间',
    sortable: 'custom',
    formatter: (row) => {
      return dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')
    },
    align: 'left'
  },
  { prop: 'iname', label: '接口名称', align: 'left' },
  // { prop: 'url', label: '接口url', align: 'left' },
  { prop: 'level', label: '日志级别', align: 'left' },
  { prop: 'operationType', label: '操作类型', align: 'left' },
  // { prop: 'organization', label: '用户单位', align: 'left' },
  { prop: 'identityName', label: '接口标志名', align: 'left' },
  { prop: 'params', label: '参数列表', align: 'left' },
  { prop: 'resultCode', label: '返回结果码', align: 'left' },
  { prop: 'data', label: '数据', align: 'left' }

]
// 接口日志-导出配置
export const interfaceExpCfg = tableCfg2ExportCfg(interfaceTableCfg)
// 接口日志-详情弹窗
export const interfaceDetailCells = [
  { key: 'service', label: '服务名称' },
  { key: 'ip', label: '服务器IP' },
  {
    key: 'time',
    label: '时间',
    formatter: (row) => {
      return dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  { key: 'iname', label: '接口名称' },
  { key: 'url', label: '接口url' },
  { key: 'level', label: '日志级别' },
  { key: 'operationType', label: '操作类型' },
  { key: 'organization', label: '用户单位' },
  { key: 'userName', label: '用户名' },
  { key: 'msg', label: '日志内容' }
]
// 三方日志-表格配置
export const customTableCfg = [
  { prop: 'platform', label: '平台名称' },
  { prop: 'ip', label: '服务器IP' },
  {
    key: 'time',
    label: '时间',
    sortable: 'custom',
    formatter: (row) => {
      return dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')
    },
    align: 'left'
  },
  { prop: 'level', label: '日志级别' },
  { prop: 'msg', label: '日志内容', 'show-overflow-tooltip': true }
]
// 三方日志-导出
export const customExpCfg = tableCfg2ExportCfg(customTableCfg)
// 三方日志-详情弹窗
export const customDetailCells = [
  { key: 'platform', label: '平台名称' },
  { key: 'ip', label: '服务器IP' },
  {
    key: 'time',
    label: '时间',
    sortable: 'custom',
    formatter: (row) => {
      return dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')
    },
    align: 'left'
  },
  { key: 'level', label: '日志级别' },
  { key: 'msg', label: '日志内容', colspan: 3 }
]

// 系统日志-表格配置
export const systemLogTableCfg = [
  { prop: 'platform', label: '服务平台' },
  { prop: 'service', label: '服务名称' },
  { prop: 'ip', label: '服务器IP' },
  {
    key: 'time',
    label: '时间',
    sortable: 'custom',
    formatter: (row) => {
      return dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')
    },
    align: 'left'
  },
  { prop: 'level', label: '日志级别' },
  { prop: 'thread', label: '线程名' },
  { prop: 'msg', label: '日志内容', 'show-overflow-tooltip': true }
]
// 系统日志-导出配置
export const systemExpCfg = tableCfg2ExportCfg(systemLogTableCfg)
// 系统日志-详情弹窗
export const systemDetailCells = [
  { key: 'platform', label: '服务平台' },
  { key: 'service', label: '服务名称' },
  { key: 'ip', label: '服务器IP' },
  {
    key: 'time',
    label: '时间',
    formatter: (row) => {
      return dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')
    },
    align: 'left'
  },
  { key: 'level', label: '日志级别' },
  { key: 'thread', label: '线程名' },
  { key: 'msg', label: '日志内容', colspan: 3 }
]
