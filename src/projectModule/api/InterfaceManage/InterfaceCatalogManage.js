import axios from '@/projectModule/utils/axios'
import { resolveApi } from '../config'

// 新增目录
export function addInterface (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-directory/add'),
    method: 'post',
    data: params
  })
}

// 删除目录
export function deleteInterface (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-directory/delete'),
    method: 'post',
    params
  })
}

// 新增目录
export function getPassword (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-directory/getPassword'),
    method: 'post',
    data: params
  })
}

// 查询目录
export function queryInterface (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-directory/query'),
    method: 'post',
    data: params
  })
}

// 修改目录
export function updateInterface (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-directory/update'),
    method: 'post',
    data: params
  })
}

// 条件查询
export function queryCondition (params) {
  return axios({
    url: resolveApi('/detoxification-data/sys-data-directory/queryCondition'),
    method: 'post',
    data: params
  })
}
