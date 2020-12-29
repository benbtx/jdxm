import axios from '@/projectModule/utils/axios'
import { resolveApi } from '../config'

// 分页查询所有数据
export function getPageList (params) {
  return axios({
    url: resolveApi('/zhjd/database/pageList'),
    method: 'get',
    params
  })
}

// 添加数据库采集任务
export function addCollectionTask (params) {
  return axios({
    url: resolveApi('/zhjd/database/add'),
    method: 'post',
    data: params
  })
}

// 删除数据库采集任务信息
export function deleteById (params) {
  return axios({
    url: resolveApi('/zhjd/database/deleteById'),
    method: 'delete',
    params
  })
}

// 根据采集表信息生成目标表信息
export function getCollectColumnInfofoBySourceTableInfo (params) {
  return axios({
    url: resolveApi('/zhjd/database/getCollectColumnInfofoBySourceTableInfo'),
    method: 'get',
    params
  })
}

// 查看数据库采集任务信息
export function searchDatabaseCollectById (params) {
  return axios({
    url: resolveApi('/zhjd/database/searchDatabaseCollectById'),
    method: 'get',
    params
  })
}
