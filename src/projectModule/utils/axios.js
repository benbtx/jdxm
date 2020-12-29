import axios from 'axios'
import { getToken } from './token'
import { Message } from 'element-ui'
// 默认请求头
const token = getToken()
const headers = {
}
if (token) headers.token = token
// 创建axios实例
const service = axios.create({
  baseURL: '', // api的base_url
  timeout: 20000, // 请求超时时间
  headers
})

// request拦截器
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const data = response.data
    // 请求不成功
    if (data && data.code !== undefined) {
      if (data.code !== 0 && data.code !== 1000 && data.code !== 200) {
        // 约定0为成功不提示消息 1000为失败也不提示消息
        Message({
          message: data.msg,
          type: 'error'
        })
      }
    }
    return data
  },
  error => {
    if (error && error.response && error.response.status == 401) {
      window.location.href = window.loginUrl
      return Promise.reject(error)
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 1000
    })
    return Promise.reject(error)
  }
)

service.postFile = function (url, data) {
  return service({
    method: 'post',
    url,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export default service
