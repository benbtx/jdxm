<template>
  <div class="kr-el-table">
    <search-bar @doSearch="doSearch" :roleOptions="roleOptions"></search-bar>
    <buttons-bar :buttons="buttons"></buttons-bar>
    <kr-el-table
      @sort-change="sortChange"
      @row-click="tableRowClick"
      :options="tableConfig"
      :columns="columns"
      :rows="rows"
      :total="total"
      @on-page-change="pageChange"
      @selection-change="selectionChange"
    ></kr-el-table>
    <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="30%">
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="报表名称：" prop="reportName_edit">
              <el-input v-model="ruleForm.reportName_edit"></el-input>
            </el-form-item>
            <el-form-item label="描述：" prop="des_edit">
              <el-input v-model="ruleForm.des_edit"></el-input>
            </el-form-item>
            <el-form-item label="分配角色：" prop="role_edit">
              <el-select v-model="ruleForm.role_edit"  multiple collapse-tags  placeholder="" style="width: 100%">
                <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分配用户：" prop="user_edit">
              <el-select v-model="ruleForm.user_edit"  multiple collapse-tags  placeholder="" style="width: 100%">
                <el-option
                  v-for="item in userOptions"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="状态：" prop="status">
              <el-input v-model="ruleForm.status"></el-input>
            </el-form-item> -->
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmSubmit()">确认提交</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reportExpCfg,
  // reportDetailCells,
  reportTableCfg
} from './components/config'
import krExcelExport from '@/projectModule/components/kr-excel-export/index.vue'
import { getReportList, getRole, getUser, reportAuth, reportDelete, reportEnable, setPreviewLog } from '@/projectModule/api/reportManage/reportManage.js'

import buttonsBar from './components/buttons-bar.vue'
import searchBar from './components/search-bar.vue'
export default {
  components: {

    buttonsBar,
    searchBar
  },
  props: {},
  data () {
    const _this = this
    const $shelf = this
    return {
      // buttons: [
      //   { type: 'danger', plain: true, text: '操作', icon: 'el-icon-search', number: 1, fn: () => {} }
      // ],
      tableConfig: {
        showPagination: true,
        showSelection: true,
        height: 500
      },
      rows: [],
      columns: [
        // { prop: 'AAAA', label: '服务平台' },
        { prop: 'reportName', label: '报表名称' },
        { prop: 'des', label: '描述' },
        { prop: 'authRoles', label: '分配角色' },
        { prop: 'authUsers', label: '分配用户' },
        {
          prop: 'reportStatus',
          label: '状态',
          render (h, row) {
            // $shelf.ruleForm.status=row.row.reportStatus=="启用中";
            const status = row.row.reportStatus == true
            const color = {
              color: status ? '#13ce66' : '#ff4949',
              marginLeft: '8px'
            }
            return (
              <div>
                <el-switch
                  v-has='reportmanage:config:disable'
                  onChange={() => $shelf.statusChange(row)}
                  v-model={status}
                  active-color='#13ce66'
                  // active-text="启用中"
                  // inactive-text="禁用中"
                  inactive-color='#ff4949'>
                </el-switch>
                <span style={color}>{status ? '启用' : '禁用'}</span>
              </div>

            )
          }
        },
        { prop: 'createUser', label: '创建人员' },
        { prop: 'releaseTime', label: '发布时间', sortable: 'custom' }

      ],
      total: 0,
      activeRow: {},
      current: 1,
      size: 10,
      asc: false,
      col: 'releaseTime',
      selection: [],
      roleOptions: [],
      userOptions: [],
      dialogVisible: false,
      ruleForm: {

        reportName: '',
        des: '',
        role: '', // 用于查询
        user: '', // 用于查询
        status: '',
        time: '',
        reportName_edit: '',
        des_edit: '',
        role_edit: [], // 用于授权 ['黄金糕','双皮奶']
        user_edit: [], // 用于授权 ['黄金糕','双皮奶']
        role_submit: [], // 用于授权 ['黄金糕','双皮奶']
        user_submit: []// 用于授权 ['黄金糕','双皮奶']
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    buttons () {
      const _this = this
      const length = this.rows.length || this.total
      const yllength = this.activeRow.length
      return [
        {
          permission: 'reportmanage:config:auth',
          type: 'primary',
          plain: false,
          text: '授权',
          icon: 'el-icon-edit',
          fn: () => {
            // console.log('click------>')
            console.log(this)
            // if (this.selection.length != 1) {
            //   this.$message('请选中一条记录')
            //   return
            // }
            const { activeRow } = this
            if (JSON.stringify(activeRow) === '{}') {
              this.$message.error('请先单击表格行，再执行此操作！')
              return
            }
            this.ruleForm.reportName_edit = activeRow.reportName
            this.ruleForm.des_edit = activeRow.des
            this.ruleForm.role_submit = []
            this.ruleForm.role_edit = []
            activeRow.authRoleList.forEach(element => {
              this.ruleForm.role_edit.push(element.roleId)
              // this.ruleForm.role_submit.push({
              //   "extValues": {},
              //   "roleId": element.roleId,
              //   "roleName":element.roleName});
            })
            this.ruleForm.user_submit = []
            this.ruleForm.user_edit = []
            activeRow.authUserList.forEach(element => {
              this.ruleForm.user_edit.push(element.userId)
              // this.ruleForm.user_submit.push({
              //   "extValues": {},
              //   "userId": element.userId,
              //   "userName": element.userName });
            })

            this.dialogVisible = true
          }
        },
        {
          permission: 'reportmanage:config:preview',
          type: 'primary',
          plain: false,
          text: '预览',
          icon: 'el-icon-view',
          number: yllength,
          fn: () => {
            var _this = this
            // console.log('click------>')
            // if (this.selection.length != 1) {
            //   this.$message('请选中一条记录')
            //   return
            // }
            // this.selection[0].token
            const { activeRow } = this
            if (JSON.stringify(activeRow) === '{}') {
              this.$message.error('请先单击表格行，再执行此操作！')
              return
            }

            const data = {
              reportId: activeRow.id, // _this.selection[0].id,
              reportName: activeRow.reportName// _this.selection[0].reportName
            }
            setPreviewLog(data).then(data => {
              if (data.success) {

              } else {
                this.$message('日志记录失败')
              }
            })
            // window.open(this.selection[0].token)
            window.open(activeRow.token)
                  // window.open(activeRow.token,"","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=yes");
            // _this.$router.push({
            //   // path: '/reportManage/reportPreview',
            //   // query:{url: activeRow.token},
            //   name:"reportManage_reportPreview",
            //   params:{url: activeRow.token}
            // })
          }
        },
        {
          permission: 'reportmanage:config:delete',
          type: 'danger',
          plain: true,
          text: '删除',
          icon: 'el-icon-delete-solid',
          // number: length,
          fn: () => {
            var _this = this
            if (this.selection.length != 1) {
              this.$message('请选中一条记录')
              return
            }
            console.log(this.selection[0])
            this.$confirm('将删除该数据, 是否确定?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const data = {
                reportId: _this.selection[0].id
              }
              reportDelete(data).then(data => {
                if (data.success) {
                  _this.getList()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }
        }
        // {
        //   permission: 'reportmanage:config:exportAll',
        //   render (h) {
        //     return h(krExcelExport, {
        //       props: {
        //         icon: 'el-icon-download',
        //         fileName: '报表管理',
        //         buttonType: 'primary',
        //         title: '全部导出' + (_this.total ? ` (${_this.total})` : ''),
        //         disabled: !_this.total,
        //         exportConfig: () => _this.exportData({ isExportAll: true })
        //       },
        //       on: {
        //         // someEv: (type) => {
        //         //   _this.someFunc()
        //         // }
        //       }
        //     })
        //   }
        // },
        // {
        //   type: 'info',
        //   plain: true,
        //   text: '清空',
        //   icon: 'el-icon-brush',
        //   number: length,
        //   fn: () => {
        //     console.log('click------>')
        //   }
        // },
        // {
        //   type: 'primary',
        //   plain: false,
        //   text: '导出',
        //   icon: 'el-icon-download',
        //   number: length,
        //   fn: () => {
        //     console.log('click------>')
        //   }
        // },

        // {
        //   type: 'info',
        //   plain: true,
        //   text: '全部导出',
        //   icon: 'el-icon-download',
        //   fn: () => {
        //     console.log('click------>')
        //   }
        // },
        // {
        //   type: 'info',
        //   plain: true,
        //   text: '全部删除',
        //   icon: 'el-icon-delete-solid',
        //   fn: () => {
        //     console.log('click------>')
        //   }
        // }
      ]
    }
  },
  watch: {},
  created () {},
  mounted () {
    // setTimeout(() => {
    //   this.rows = [{}, {}, {}]
    // }, 3000)
    this.getRoleList()
    this.getUserList()
    this.getList()
  },
  methods: {
    async fnGetData (isExportAll) {
      if (!isExportAll) {
        return this.selectedRows || []
      }
      const data = {
        needTotalCount: true,
        offset: 0,
        orderDescs: [
          {
            asc: this.asc,
            col: this.col
          }
        ],
        pageNum: 1,
        pageSize: 10000,
        releaseTimeRange: this.ruleForm.time || '2000-09-01to2055-12-01',
        reportDes: this.ruleForm.des,
        reportName: this.ruleForm.reportName,
        roleId: this.ruleForm.role,
        userName: this.ruleForm.user
      }
      const result = await getReportList(data)
      // const {
      //   data: { rows = [] }
      // } = result
      const rows = result.data
      console.log(1, result)
      return rows
    },
    exportData ({ isExportAll }) {
      const fnGetData = this.fnGetData(isExportAll)
      console.log(fnGetData)
      return [
        {
          fnGetData,
          config: reportExpCfg
        }
      ]
    },
    statusChange (row) {
      // alert(1)
      row.row.reportStatus = !row.row.reportStatus
      const data = {
        enable: row.row.reportStatus,
        reportId: row.row.id
      }
      reportEnable(data).then(data => {
        if (data.success) {
          this.getList()
        }
      })

      // this.ruleForm.status=!this.ruleForm.status
      // if(this.ruleForm.status){
      //   row.row.reportStatus="启用中"
      // }else{
      //   row.row.reportStatus="禁用中"
      // }
    },
    sortChange ({ order, prop }) {
      let sortRule = null
      if (order === 'ascending') {
        sortRule = 'ASC'
        this.asc = true
      } else if (order === 'descending') {
        sortRule = 'DESC'
        this.asc = false
      }
      // console.log(order, sortRule, prop)
      this.col = prop
      this.getList()
    },
    tableRowClick (row, column, event) {
      this.activeRow = { ...row }
    },
    pageChange (current, size) {
      // alert(current, size)
      this.current = current
      this.size = size
      this.getList()
    },
    selectionChange (selection) {
      this.selection = selection
    },
    // fetchTableData () {},
    confirmSubmit () {
      var _this = this
      var role_edit = []
      var user_edit = []
      this.roleOptions.forEach(el => {
        _this.ruleForm.role_edit.forEach(el2 => {
          if (el.roleId == el2) {
            role_edit.push({
              extValues: {},
              roleId: el.roleId,
              roleName: el.roleName
            })
          }
        })
      })

      this.userOptions.forEach(el => {
        _this.ruleForm.user_edit.forEach(el2 => {
          if (el.userId == el2) {
            user_edit.push({
              extValues: {},
              userId: el.userId,
              userName: el.userName
            })
          }
        })
      })

      const data = {
        reportAuthRoles: role_edit,
        reportAuthUsers: user_edit,
        reportId: this.activeRow.id
      }
      reportAuth(data).then(data => {
        if (data.success) {
          this.dialogVisible = false
          this.getList()
          this.activeRow = {}
        }
      })
    },
    getRoleList () {
      const data = {}
      getRole(data).then(data => {
        if (data.success) {
          this.roleOptions = data.data
        }
      })
    },
    getUserList () {
      const data = {}
      getUser(data).then(data => {
        if (data.success) {
          this.userOptions = data.data
        }
      })
    },

    getList () {
      const data = {
        needTotalCount: true,
        offset: 0,
        orderDescs: [
          {
            asc: this.asc,
            col: this.col
          }
        ],
        pageNum: this.current,
        pageSize: this.size,
        releaseTimeRange: this.ruleForm.time || '2000-09-01to2055-12-01',
        reportDes: this.ruleForm.des,
        reportName: this.ruleForm.reportName,
        roleId: this.ruleForm.role,
        userName: this.ruleForm.user
      }
      getReportList(data).then(data => {
        if (data.success) {
          this.rows = data.data
          this.total = data.total
        }
      })
    },
    doSearch (form) {
      // this.ruleForm=[...this.ruleForm,...from]
      this.ruleForm.role = form.role
      this.ruleForm.user = form.user
      this.ruleForm.reportName = form.reportName
      this.ruleForm.des = form.des
      if (form.time != null && form.time != '') {
        var start = form.time[0].toLocaleDateString()
          .split('/')
          .map(element => {
            if (element.length == 1) {
              return (element = '0' + element)
            } else {
              return element
            }
          })
          .join('-')
        var end = form.time[1].toLocaleDateString()
          .split('/')
          .map(element => {
            if (element.length == 1) {
              return (element = '0' + element)
            } else {
              return element
            }
          })
          .join('-')
        this.ruleForm.time = start + 'to' + end
      } else {
        this.ruleForm.time = ''
      }

      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.kr-el-table {
  padding: 14px;
  border: 1px solid #eee;
}
</style>
