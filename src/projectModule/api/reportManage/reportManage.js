import axios from '@/projectModule/utils/axios'

// 获取发布列表
export function getReportList (data) {
  return axios({
    // url: '/bi/manageReport/report/list',
    url: '/api/zhjd/bi/manageReport/report/manageList',
    method: 'post',
    data
  })
}

export function reportAuth (data) {
  return axios({
    url: '/api/zhjd/bi/manageReport/report/auth',
    method: 'post',
    data
  })
}

// manageReport/report/delete 删除报表

export function reportDelete (data) {
  return axios({
    url: '/api/zhjd/bi/manageReport/report/delete',
    method: 'post',
    data
  })
}

// manageReport/report/enbale 启用报表

export function reportEnable (data) {
  return axios({
    url: '/api/zhjd/bi/manageReport/report/enbale',
    method: 'post',
    data
  })
}

// manageReport/report/check 检查报表状态
export function reportCheck (data) {
  return axios({
    url: '/api/zhjd/bi/manageReport/report/check',
    method: 'post',
    data
  })
}

// manageReport/report/viewList 报表查看-查询报表
export function reportViewList (data) {
  return axios({
    url: '/api/zhjd/bi/manageReport/report/viewList',
    method: 'post',
    data
  })
}

// api/zhjd/bi/manageReport/report/preview 预览报表 记录 日志

export function setPreviewLog (data) {
  return axios({
    url: '/api/zhjd/bi/manageReport/report/preview',
    method: 'post',
    data
  })
}

// 获取角色
export function getRole (params) {
  return axios({
    url: '/api/zhjd/bi/manageReport/report/listRole',
    method: 'get',
    params
  })
}
export function getUser (params) {
  return axios({
    url: '/api/zhjd/bi/manageReport/report/listUser',
    method: 'get',
    params
  })
}

//获取报表地址/api/zhjd/bi/manageReport/report/getReportServerAddress
export function getReportServerAddress (params) {
  return axios({
    url: '/api/zhjd/bi/manageReport/report/getReportServerAddress',
    method: 'get',
    params
  })
}
