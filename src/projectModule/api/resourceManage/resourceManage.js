import axios from '@/projectModule/utils/axios'
import { resolveApi } from '../config'
// 查询所有数据表
export function getAllTables (params) {
  return axios({
    url: resolveApi('/detoxification-data/resource-manage/getAllTables'),
    method: 'post',
    data: params
  })
}

// 查询该表下所有字段信息
export function getColumnInfosByTableName (params) {
  return axios({
    url: resolveApi('/detoxification-data/resource-manage/getColumnInfosByTableName'),
    method: 'post',
    params
  })
}

// 分页查询指定表数据
export function queryPageByTableName (params) {
  return axios({
    url: resolveApi('/detoxification-data/resource-manage/queryPageByTableNameAndWhere'),
    method: 'post',
    data: params
  })
}

// 根据元数据创建表 并保存元数据信息
export function createTableByMetaAndSaveMetaInfo (params) {
  return axios({
    url: resolveApi('/zhjd/resouceManagement/createTableByMetaAndSaveMetaInfo'),
    method: 'post',
    data: params
  })
}

// 获取dm数据类型的下拉选项
export function getDmColumnTypeOption (params) {
  return axios({
    url: resolveApi('/zhjd/resouceManagement/getDmColumnTypeOption'),
    method: 'get',
    params
  })
}

// 根据表名删除表，假删，修改表名称为DELETE#前缀
export function dropTableInNoData (params) {
  return axios({
    url: resolveApi('/zhjd/resouceManagement/alterTableNameToDelete'),
    method: 'post',
    params
  })
}

// 模式
export function getDmSchemaOption (params) {
  return axios({
    url: resolveApi('/zhjd/resouceManagement/getDmSchemaOption'),
    method: 'get',
    params
  })
}

// 获取单位编码
export function getDeptId (params) {
  return axios({
    url: resolveApi('/zhjd/resouceManagement/getDeptId'),
    method: 'get',
    params
  })
}

// 执行DDL SQL 修改表结构
export function executeDDL (params) {
  return axios({
    url: resolveApi('/zhjd/resouceManagement/executeDDL'),
    method: 'post',
    data: params
  })
}
