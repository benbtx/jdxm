import axios from '@/projectModule/utils/axios'
import { resolveApi } from '../config'
import Qs from 'querystring'

// 查询列表
export function getInterfaceList (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-interface/queryAll'),
    method: 'post',
    data: params
  })
}

// 新增
export function addInterface (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-interface/add'),
    method: 'post',
    data: params
  })
}

// 查询所有表
export function getAllTables (params) {
  return axios({
    url: resolveApi('/detoxification-data/resource-manage/getAllTables'),
    method: 'post',
    data: params
  })
}

// 查询表字段
export function getColumnInfosByTableName (params) {
  return axios({
    url: resolveApi('/detoxification-data/resource-manage/getColumnInfosByTableName'),
    method: 'post',
    params
  })
}

// 生产接口标识
export function genIdentityName (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-interface/genIdentityName'),
    method: 'post',
    params
  })
}

// 生成SQL
export function genSql (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-interface/genSql'),
    method: 'post',
    data: params
  })
}

// 测试接口
export function testDataInterface (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-interface/testDataInterface'),
    method: 'post',
    data: params
  })
}

// 查询明细
export function queryDetail (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-interface/queryDetail'),
    method: 'post',
    params
  })
}

// 复制接口
export function copyInterface (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-interface/copy'),
    method: 'post',
    data: params
  })
}

// 修改接口
export function updateInterface (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-interface/update'),
    method: 'post',
    data: params
  })
}

// 批量启用禁用
export function updateBatchEnable (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-interface/updateBatchEnable' + params),
    method: 'post'
  })
}

// 删除
export function deleteBatchEnable (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-interface/delete?' + params),
    method: 'post'
  })
}

// 查询接口文档
export function queryInterfaceDoc (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-interface/queryInterfaceDoc'),
    method: 'post',
    params
  })
}
