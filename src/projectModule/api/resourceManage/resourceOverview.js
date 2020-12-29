import axios from '@/projectModule/utils/axios'
import { resolveApi } from '../config'
// 任务调度执行情况统计
export function resouceChartInfo (params) {
  return axios({
    url: resolveApi('/zhjd/resouce/chartInfo'),
    method: 'get',
    params
  })
}

// 数据库资源汇总信息
export function getCollectCountByDateAndFlags (params) {
  return axios({
    url: resolveApi('/zhjd/resouce/getCollectCountByDateAndFlags'),
    method: 'get',
    params
  })
}

// 执行器资源监控
export function getServerStatus (params) {
  return axios({
    url: resolveApi('/zhjd/resouce/getServerStatus'),
    method: 'get',
    params
  })
}

// 获取今日数据量、表个数、表存储的数量和增量
export function getTodayCollectCount (params) {
  return axios({
    url: resolveApi('/zhjd/resouce/getTodayCollectCount'),
    method: 'get',
    params
  })
}
