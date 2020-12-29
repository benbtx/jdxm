import axios from '@/projectModule/utils/axios'
import { resolveApi } from '../config'
// 新增数据
export function addJobJdbcDatasource (params, type) {
  if (type === 'put') {
    return axios({
      url: resolveApi('/zhjd/jobJdbcDatasource'),
      method: type,
      ...params
    })
  } else {
    return axios({
      url: resolveApi('/zhjd/jobJdbcDatasource'),
      method: type,
      data: type === 'post' ? params : '',
      params: type !== 'post' ? params : ''
    })
  }
}

// 分页查询所有数据
export function getJobJdbcDatasource (params) {
  return axios({

    url: resolveApi('/zhjd/jobJdbcDatasource'),
    method: 'get',
    params
  })
}

// 测试数据
export function testDatabase (params) {
  return axios({

    url: resolveApi('/zhjd/jobJdbcDatasource/test'),
    method: 'post',
    data: params
  })
}

// 获取所有数据源
export function getAll (params) {
  return axios({
    url: resolveApi('/zhjd/jobJdbcDatasource/all'),
    method: 'get',
    data: params
  })
}

// 获取所有数据源
export function getOne (params) {
  return axios({
    url: resolveApi('/zhjd/jobJdbcDatasource/' + params),
    method: 'get'
  })
}
