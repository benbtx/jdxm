// :config 组件传入的配置
// :fnGetData 要导出的数据数组
export const phoneListConfig = {
  includes: [
    'phoneNum',
    'operatorCity',
    'userName',
    'idCard',
    'score',
    'count',
    'labels',
    'createUserName',
    'createTime',
    'attentionState'
  ],
  formatters: {
    userName: {
      title: '机主姓名'
    },
    idCard: {
      title: '身份证',
      width: 140
    },
    score: {
      title: '话单积分'
    },
    count: {
      title: '话单记录(条)',
      formatter: (val, row) => {
        // row 数据行对象，val 当前键的值
        return val
      }
    }
  }
}
