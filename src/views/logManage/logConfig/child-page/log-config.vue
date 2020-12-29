<template>
  <div
    class="log-config"
    v-loading.fullscreen.lock="loading"
    element-loading-text="等待服务响应"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
  >
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
        <el-form-item label="日志类型:" prop="logType">
          <el-select v-model="form.params.logType" placeholder="请选择日志类型">
            <el-option
              v-for="log of logTypeOptions"
              :key="log.value"
              :label="log.label"
              :value="log.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="服务平台"
          v-if="form.params.logType === 'external'"
          prop="index"
        >
          <el-select v-model="form.params.index" placeholder="请选择服务平台">
            <el-option
              v-for="log of platformOptions"
              :key="log.value"
              :label="log.label"
              :value="log.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="清理周期(天):" prop="period">
          <el-input-number
            v-model="form.params.period"
            :controls="false"
            placeholder="请输入清理周期（天）:"
          >
          </el-input-number>
        </el-form-item>
        <el-form-item label="是否启用:" prop="used">
          <el-switch
            v-model="form.params.used"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
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
  fetchClearList,
  createClear,
  modifyClear,
  deleteClear,
  fetchExternalList
} from '@/projectModule/api/logManage/index.js'

import configSearchBar from '../components/config-search-bar.vue'
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
      logTypes: {
        operation: '操作日志',
        command: '信令日志',
        interface: '接口日志',
        external: '三方日志',
        system: '系统日志'
      },
      platformOptions: [],
      logTypeOptions: [
        { value: 'operation', label: '操作日志' },
        { value: 'command', label: '信令日志' },
        { value: 'interface', label: '接口日志' },
        { value: 'external', label: '三方日志' },
        { value: 'system', label: '系统日志' }
      ],
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
          logType: '',
          index: '',
          period: '',
          used: false
        },

        rules: {
          logType: [
            {
              required: true,
              trigger: 'blur',
              message: '请选择日志类型'
            }
          ],
          index: [
            {
              required: true,
              trigger: 'blur',
              message: '请选择服务平台'
            }
          ],
          period: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入清理周期'
            }
          ]
        }
      },
      tableConfig: {
        showPagination: true
      },
      rows: [],
      total: 0,
      columns: [
        { prop: 'platform', label: '平台名称' },
        {
          prop: 'logType',
          label: '日志类型',
          formatter (row) {
            return _this.logTypes[row.logType] || row.logType
          }
        },
        { prop: 'period', label: '清理周期' },
        {
          prop: 'used',
          label: '启用状态',
          width: 120,
          render (h, params) {
            const used = params.row.used
            const color = {
              color: used ? '#13ce66' : '#ff4949',
              marginLeft: '8px'
            }
            return (
              <div>
                <el-switch
                  v-has='logmanage:logConfig:disable'
                  value={used}
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  onChange={() => {
                    _this.updateClear({ ...params.row, used: !used })
                  }}
                />
                <span style={color}>{used ? '启用' : '禁用'}</span>
              </div>
            )
          }
        },
        {
          prop: 'opppp',
          label: '操作',
          width: 160,
          render (h, params) {
            return (
              <div>
                <el-button
                  v-has='logmanage:logConfig:edit'
                  style="margin-right:8px"
                  type="text"
                  onClick={() => {
                    _this.form.params = { ...params.row }
                    _this.form.title = '编辑'
                    _this.form.visible = true
                  }}
                >
                  编辑
                </el-button>
                <el-popconfirm
                  v-has='logmanage:logConfig:delete'
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
              </div>
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
          type: 'primary',
          plain: false,
          text: '新增',
          permission: 'sys:logConfig:add',
          icon: 'el-icon-plus',
          fn: () => {
            this.form.title = '新增'
            this.form.visible = true
            this.$nextTick(() => {
              this.form.params = {
                logType: '',
                index: '',
                period: '',
                used: false
              }
              this.$refs.inputForm.resetFields()
            })
          }
        }
      ]
    }
  },
  watch: {
    loading (val) {
      if (val) {
        setTimeout(() => {
          this.loading = false
        }, 5000)
      }
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
    this.initPlatForm()
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
        if (params[propName] === null || params[propName] === undefined || params[propName] === '') {
          delete params[propName]
        }
      }
      const result = await fetchClearList(params)
      const {
        code,
        data: { total = 0, rows = [] }
      } = result
      if (code === 0) {
        this.total = total
        this.rows = rows
      }
    },
    async updateClear (row) {
      this.loading = true
      const { id, used, period, platform } = row
      const result = await modifyClear({
        id,
        used,
        period,
        platform
      })
      const { code } = result
      this.loading = false
      if (code === 0) {
        this.form.visible = false
        this.$message.success('操作成功！')
        this.fetchTableData()
      }
    },
    async doDelete (row) {
      const { id } = row
      this.loading = true
      const result = await deleteClear({
        id
      })
      this.loading = false
      if (result.code === 0) {
        this.$message.success('删除成功！')
        this.fetchTableData()
      }
    },
    async initPlatForm () {
      const params = {
        pageNum: 1,
        pageSize: 10000
      }
      const result = await fetchExternalList(params)
      const {
        code,
        data: { rows = [] }
      } = result
      if (code === 0) {
        this.platformOptions = rows.map((item) => {
          const { name: label, index: value } = item
          return { label, value }
        })
      }
    },
    async confirmSubmit () {
      this.$refs.inputForm.validate((valid) => {
        if (valid) {
          // 成功
          this.loading = true
          if (this.form.params.logType !== 'external') {
            // 非第三方"platform"为空
            this.form.params.platform = ''
            this.form.params.index = ''
          } else {
            const index = this.form.params.index
            const plat = this.platformOptions.find((it) => it.value === index)
            this.form.params.platform = plat.label
          }
          if (this.form.params.id) {
            return this.updateClear(this.form.params)
          }
          createClear(this.form.params).then((res) => {
            if (res.code === 0) {
              this.form.visible = false
              this.fetchTableData()
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.log-config {
  .inputForm {
    /deep/ {
      .el-input,
      .el-input__inner {
        width: 440px;
        text-align: left;
      }
      .el-form-item__label {
        text-align: right;
      }
    }
  }
}
</style>
