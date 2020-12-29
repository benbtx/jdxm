import axios from '@/projectModule/utils/axios'
import { resolveApi } from '../config'

// 根据类型查询所有表
export function fetchAllTable (params) {
  return axios({
    url: resolveApi('/sync/table/all'),
    method: 'get',
    params
  })
}
// 获取所有数据源
export function fetchAllSource (params) {
  return axios({
    url: resolveApi('/sync/source/get/all'),
    method: 'get',
    params
  })
}
// # 监控
// ## 节点监控
export function fetchAllMonitorInstance (data) {
  return axios({
    url: resolveApi('/sync/monitor/instance'),
    method: 'get',
    data
  })
}
// ## 节点异常记录
export function fetchErrorMonitorInstance (data) {
  return axios({
    url: resolveApi('/sync/monitor/instance/fault'),
    method: 'post',
    data
  })
}
// ## 关系监控
export function fetchMonitorRelation () {
  return axios({
    url: resolveApi('/sync/monitor/relation'),
    method: 'post'
  })
}
// ## 关系监控异常记录
export function fetchErrorMonitorRelation (data) {
  return axios({
    url: resolveApi('/sync/monitor/relation/fault'),
    method: 'post',
    data
  })
}
// ## 数据冲突记录
export function fetchMonitorConflict (data) {
  return axios({
    url: resolveApi('/sync/monitor/conflict'),
    method: 'post',
    data
  })
}
// ## 修改数据冲突状态
export function modifyMonitorConflict (data) {
  return axios({
    url: resolveApi('/sync/monitor/conflict/modify'),
    method: 'post',
    data
  })
}
// # 同步策略
// ## 添加同步策略
export function insertStrategy (data) {
  return axios({
    url: resolveApi('/sync/strategy/insert'),
    method: 'post',
    data
  })
}
// ## 删除同步策略
export function deleteStrategy (params) {
  return axios({
    url: resolveApi('/sync/strategy/del'),
    method: 'post', // get 也可以
    params
  })
}
// ## 按类型查找同步策略
export function queryAllStrategy (params) {
  return axios({
    url: resolveApi('/sync/strategy/query/all'),
    method: 'get',
    params
  })
}
// ## 发步策略
export function releaseStrategy (params) {
  return axios({
    url: resolveApi('/sync/strategy/release'),
    method: 'post',
    params
  })
}
// ## 取消策略
export function cancelStrategy (params) {
  return axios({
    url: resolveApi('/sync/strategy/cancel'),
    method: 'post',
    params
  })
}

// # 同步调度
// ## 列表
export function fetchAlterList (data) {
  return axios({
    url: resolveApi('/sync/alter/table'),
    method: 'post',
    data
  })
}
// ## 修改表模式
export function modifyAlter (params) {
  return axios({
    url: resolveApi('/sync/alter/alter'),
    method: 'post',
    params
  })
}
// ## 数据目录
export function fetchAlterInstance (data) {
  return axios({
    url: resolveApi('/sync/alter/instance'),
    method: 'post' // post
  })
}
