import axios from '@/projectModule/utils/axios'
import { resolveApi } from '../config'

// 查询列表
export function queryAll (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-file-interface/queryAll'),
    method: 'post',
    data: params
  })
}

// 获取接口标识
export function genIdentityName (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-file-interface/genIdentityName'),
    method: 'post',
    data: params
  })
}

// 新增
export function addInterface (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-file-interface/add'),
    method: 'post',
    data: params
  })
}

// 修改
export function updateInterface (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-file-interface/update'),
    method: 'post',
    data: params
  })
}

// 查询明细
export function queryDetail (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-file-interface/queryDetail'),
    method: 'post',
    params
  })
}

// 复制
export function copyInterface (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-file-interface/copy'),
    method: 'post',
    data: params
  })
}

// 删除
export function deleteInterface (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-file-interface/delete?' + params),
    method: 'post'
  })
}

// 批量启用禁用
export function updateBatchEnable (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-file-interface/updateBatchEnable?' + params),
    method: 'post'
  })
}

// 查询接口文档
export function queryInterfaceDoc (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-file-interface/queryInterfaceDoc'),
    method: 'post',
    params
  })
}

// 下载
export function downloadForTest (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-file-interface/downloadForTest'),
    method: 'get',
    params
  })
}

// 获取IP
export function getInterfaceAddr (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-file-interface/getInterfaceAddr'),
    method: 'get',
    params
  })
}

// 获取附件唯一字段值下拉列表
export function getFileUniqueValues (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-file-interface/getFileUniqueValues'),
    method: 'get',
    params
  })
}
