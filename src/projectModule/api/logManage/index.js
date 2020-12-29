import axios from '@/projectModule/utils/axios'
import { resolveApi } from '../config'

// 查询日志管理-资源管理
export function fetchResourceList () {
  return axios({
    url: resolveApi('/drc/monitor/general'),
    method: 'get'
  })
}

// 查询日志管理-日志分析
export function fetchLogAnalysisLogList (data, logType) {
  return axios({
    url: resolveApi('/drc/retrieve/' + logType),
    method: 'post',
    data
  })
}
// 日志管理-按id删除日志
export function deleteAnalysisLogByIds (data) {
  // data = {
  //   "index": "interface",
  //   "ids": [
  //     "ODp4v3UBEOskp78ICPBa",
  //     "kuB4v3UBxHYf8aQHjVDM"
  //   ]
  // }
  return axios({
    url: resolveApi('/drc/clear/ids'),
    method: 'post',
    data
  })
}
// 日志管理-按条件删除日志
export function deleteAnalysisLogByCondition (data, logType) {
  return axios({
    url: resolveApi('/drc/clear/' + logType),
    method: 'post',
    data
  })
}
// 日志配置-三方日志
// 查询列表
export function fetchExternalList (data) {
  return axios({
    url: resolveApi('/drc/conf/external/load'),
    method: 'post',
    data
  })
}
// 新增
export function addExternal (data) {
  return axios({
    url: resolveApi('/drc/conf/external/add'),
    method: 'post',
    data
  })
}
// 修改开启状态
export function modifyExternal (data) {
  return axios({
    url: resolveApi('/drc/conf/external/modify'),
    method: 'post',
    data
  })
}
// 删除三方配置
export function deleteExternal (data) {
  return axios({
    url: resolveApi('/drc/conf/external/remove'),
    method: 'post',
    data
  })
}
// 日志配置
// 日志清理配置查询
export function fetchClearList (data) {
  return axios({
    url: resolveApi('/drc/conf/clear/load'),
    method: 'post',
    data
  })
}
// 创建定期日志清理
export function createClear (data) {
  return axios({
    url: resolveApi('/drc/conf/clear/create'),
    method: 'post',
    data
  })
}
// 修改定期日志清理
export function modifyClear (data) {
  return axios({
    url: resolveApi('/drc/conf/clear/modify'),
    method: 'post',
    data
  })
}
export function deleteClear (data) {
  return axios({
    url: resolveApi('/drc/conf/clear/remove'),
    method: 'post',
    data
  })
}
