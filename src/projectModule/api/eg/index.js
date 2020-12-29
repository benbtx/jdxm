import axios from '@/projectModule/utils/axios'

// use form
export function useGetAndFormData (params) {
  return axios({
    url: '/archives/getLb',
    method: 'get',
    params
  })
}
// use json body
export function usePostAndJsonBody (data) {
  return axios({
    url: '/archives/query',
    method: 'post',
    data
  })
}
