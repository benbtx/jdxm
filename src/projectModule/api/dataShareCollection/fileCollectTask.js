import axios from '@/projectModule/utils/axios'
import { resolveApi } from '../config'
// 添加文件采集任务
export function addFileCollect (params) {
  return axios({
    url: resolveApi('/zhjd/fileCollect/add'),
    method: 'post',
    data: params
  })
}

// 根据id获取文件采集任务
export function getFileCollect (params) {
  return axios({
    url: resolveApi('/zhjd/fileCollect/get/' + params),
    method: 'get'
  })
}

// 文件采集任务列表
export function getPageList (params) {
  return axios({
    url: resolveApi('/zhjd/fileCollect/pageList'),
    method: 'post',
    data: params
  })
}

// 删除文件采集任务
export function removeFileCollect (params) {
  return axios({
    url: resolveApi('/api/zhjd/fileCollect/remove/' + params),
    method: 'post'
  })
}
