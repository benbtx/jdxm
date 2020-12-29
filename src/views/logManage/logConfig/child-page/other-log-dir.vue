<template>
  <div class="other-log-dir" v-kr-loading="loading">
    <config-search-bar @doSearch="fetchTableData"></config-search-bar>
    <div style="padding: 14px">
      <buttons-bar :buttons="buttons" style="margin-bottom: 14px"></buttons-bar>
      <kr-el-table
        ref="tableComponent"
        @sort-change="sortChange"
        @on-page-change="pageChange"
        :options="tableConfig"
        :columns="columns"
        :rows="rows"
        :total="total"
      ></kr-el-table>
    </div>
    <el-dialog
      :visible.sync="form.visible"
      :close-on-click-modal="false"
      :title="form.title"
      width="660px"
    >
      <el-form
        class="inputForm"
        ref="inputForm"
        :model="form.params"
        :rules="form.rules"
        label-position="left"
        label-width="120px"
      >
        <el-form-item label="三方系统名称" prop="name">
          <el-input v-model="form.params.name" placeholder="请输入三方系统名称">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmSubmit">确认提交</el-button>
        <el-button @click="form.visible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchExternalList,
  addExternal,
  modifyExternal,
  deleteExternal
} from '@/projectModule/api/logManage/index.js'

import configSearchBar from '../components/other-log-search-bar.vue'
import buttonsBar from '../../logAnalysis/child-pages/components/buttons-bar.vue'

export default {
  components: {
    buttonsBar,
    configSearchBar
  },
  props: {},
  data () {
    const _this = this
    return {
      loading: false,
      searchParams: {
        pageNum: 1,
        pageSize: 10,
        sortName: '',
        sortRule: 'DESC'
      },
      form: {
        title: '新增',
        visible: false,
        params: {
          name: ''
        },
        rules: {
          name: [
            {
              required: true,
              trigger: 'blur',
              message: '请选择服务平台'
            }
          ]
        }
      },
      tableConfig: {
        showPagination: true
      },
      rows: [],
      total: 100,
      columns: [
        { prop: 'name', label: '三方平台名称', align: 'left' },
        { prop: 'creator', label: '创建人', align: 'left' },
        {
          sortable: 'custom',
          key: 'updateTime',
          label: '更新时间',
          formatter: (row) => {
            return _this.$dayjs(row.updateTime).format('YYYY-MM-DD HH:mm:ss')
          },
          align: 'left'
        },
        {
          sortable: 'custom',
          key: 'createTime',
          label: '创建时间',
          formatter: (row) => {
            return _this.$dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
          },
          align: 'left'
        },
        {
          key: 'used',
          label: '状态',
          width: 120,
          align: 'center',
          fixed: 'right',
          render (h, params) {
            const used = params.row.used
            const color = {
              color: used ? '#13ce66' : '#ff4949',
              marginLeft: '8px'
            }
            return (
              <div>
                <el-switch
                  v-has="logmanage:operation:disable"
                  value={used}
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  onChange={() => {
                    _this.updateUsed({ ...params.row })
                  }}
                />
                <span style={color}>{used ? '启用' : '禁用'}</span>
              </div>
            )
          }
        },
        {
          key: 'used',
          label: '操作',
          width: 120,
          align: 'center',
          fixed: 'right',
          render (h, params) {
            return (
              <el-popconfirm
                v-has="logmanage:operation:delete"
                confirm-button-text="确定删除"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                confirm-button-type="danger"
                title="删除后无法逆转，确定删除吗？"
                onConfirm={() => {
                  _this.doDelete(params.row)
                }}
              >
                <el-button type="text" style="color:red" slot="reference">
                  删除
                </el-button>
              </el-popconfirm>
            )
          }
        }
      ]
    }
  },
  computed: {
    buttons () {
      return [
        {
          permission: 'logmanage:operation:add',
          type: 'primary',
          plain: false,
          text: '新增',
          icon: 'el-icon-plus',
          fn: () => {
            this.form.title = '新增'
            this.form.visible = true
            this.$nextTick(() => {
              this.$refs.inputForm.resetFields()
            })
          }
        }
      ]
    }
  },
  watch: {
    loading (val) {
      setTimeout(() => {
        this.loading = false
      }, 5000)
    },
    'form.visible' (val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.inputForm.clearValidate()
        })
      }
    }
  },
  created () {},
  mounted () {
    const parentDom = document.getElementById('logConfig')
    this.tableConfig['max-height'] = parentDom.offsetHeight - 46
    this.fetchTableData()
  },
  methods: {
    sortChange ({ order, prop }) {
      let sortRule = ''
      if (order === 'ascending') {
        sortRule = 'ASC'
      } else {
        sortRule = 'DESC'
      }
      if (order === null) {
        prop = ''
      }
      this.searchParams.sortName = prop
      this.searchParams.sortRule = sortRule
      this.fetchTableData()
    },
    pageChange (current, size) {
      this.searchParams.pageNum = current
      this.searchParams.pageSize = size
      this.fetchTableData()
    },
    async fetchTableData (form = {}) {
      const params = { ...this.searchParams, ...form }
      this.searchParams = { ...params }
      for (var propName in params) {
        if (
          params[propName] === null ||
          params[propName] === undefined ||
          params[propName] === ''
        ) {
          delete params[propName]
        }
      }
      const result = await fetchExternalList(params)
      const {
        code,
        data: { total = 0, rows = [] }
      } = result
      if (code === 0) {
        this.total = total
        this.rows = rows
      }
    },
    async updateUsed (row) {
      this.loading = true
      let { id, used } = row
      used = !used
      const result = await modifyExternal({
        id,
        used
      })
      const { code } = result
      this.loading = false
      if (code === 0) {
        this.$message.success('状态修改成功！')
        this.fetchTableData()
      }
    },
    async doDelete (row) {
      const { id, index } = row
      this.loading = true
      const result = await deleteExternal({
        id,
        index
      })
      this.loading = false
      if (result.code === 0) {
        this.$message.success('删除成功！')
        this.fetchTableData()
      }
    },
    async confirmSubmit () {
      this.$refs.inputForm.validate((valid) => {
        if (valid) {
          // 成功
          this.loading = true
          addExternal(this.form.params)
            .then((res) => {
              if (res.code === 0) {
                this.form.visible = false

                this.fetchTableData()
              }
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.other-log-dir {
  /deep/ .el-dialog__body {
    padding-bottom: 0;
  }
  .inputForm {
    /deep/ {
      .el-input,
      .el-input__inner {
        width: 440px;
      }
      .el-form-item__label {
        text-align: right;
      }
    }
  }
}
</style>
