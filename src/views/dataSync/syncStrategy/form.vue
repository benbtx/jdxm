<template>
  <div class="strategyForm">
    <el-scrollbar style="height: 70vh" wrap-style="overflow-x: hidden;">
      <el-form
        :model="form"
        :rules="rules"
        ref="strategyForm"
        size="small"
        label-position="left"
        label-width="120px"
      >
        <el-form-item label="同步模式：" prop="strategyType">
          <el-select
            @change="syncModeChange"
            placeholder="请选择同步模式"
            v-model="form.strategyType"
            :clearable="false"
          >
            <el-option
              v-for="item of modeOptions"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述：" prop="explain">
          <el-input type="textarea" v-model="form.explain"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="数据源节点：" :required="true">
              <el-scrollbar
                style="height: 60vh"
                wrap-style="overflow-x: hidden;"
              >
                <div class="dynamicNodeBox">
                  <div
                    class="nodeCard"
                    v-for="(node, index) in form.source"
                    :key="index"
                  >
                    <el-form-item
                      label-width="70px"
                      :label="'节点' + (index + 1)"
                      :prop="'source.' + index + '.instanceId'"
                      :rules="{
                        required: true,
                        message: '请选择（局/所）节点',
                        trigger: 'change',
                      }"
                    >
                      <el-select
                        v-model="node.instanceId"
                        @clear="node.tableName = ''"
                        @change="
                          leftNodeChange($event);
                          node.tableName = '';
                        "
                        placeholder="请选择节点"
                      >
                        <el-option
                          v-for="(node, index) of leftNodeOptions"
                          :key="node.value + '' + index"
                          :label="node.label"
                          :value="node.value"
                          :disabled="leftNodeDisabled(node)"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label-width="70px"
                      label="表选择"
                      :prop="'source.' + index + '.tableName'"
                      :rules="{
                        required: true,
                        message: '请选择表',
                        trigger: 'change',
                      }"
                    >
                      <el-select
                        placeholder="请选择表"
                        v-model="node.tableName"
                      >
                        <el-option
                          v-for="(item, index) of getTablesByInstanceId(
                            node.instanceId
                          )"
                          :key="item.value + '' + index"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <i
                      @click="removePrimaryNode(index)"
                      v-show="form.source.length > 1"
                      class="el-icon-delete"
                    ></i>
                  </div>
                  <div
                    class="addButton"
                    v-if="isUploadMode || !leftIsPrimary"
                    @click="addPrimaryNode"
                  >
                    + 新增节点
                  </div>
                </div>
              </el-scrollbar>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标节点：" :required="true">
              <el-scrollbar
                style="height: calc(60vh - 40px)"
                wrap-style="overflow-x: hidden;"
              >
                <div class="dynamicNodeBox">
                  <div
                    class="nodeCard"
                    v-for="(node, index) in form.target"
                    :key="index"
                  >
                    <el-form-item
                      label-width="70px"
                      :label="'节点' + (index + 1)"
                      :prop="'target.' + index + '.instanceId'"
                      :rules="{
                        required: true,
                        message: '请选择节点',
                        trigger: 'change',
                      }"
                    >
                      <el-select
                        v-model="node.instanceId"
                        @clear="node.tableName = ''"
                        @change="
                          rightNodeChange($event);
                          node.tableName = '';
                        "
                        placeholder="请选择节点"
                      >
                        <el-option
                          v-for="(node, index) of rightNodeOptions"
                          :key="node.value + '' + index"
                          :label="node.label"
                          :value="node.value"
                          :disabled="rightNodeDisabled(node)"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label-width="70px"
                      label="表选择"
                      :prop="'target.' + index + '.tableName'"
                      :rules="{
                        required: true,
                        message: '请选择表',
                        trigger: 'change',
                      }"
                    >
                      <el-select
                        placeholder="请选择表"
                        v-model="node.tableName"
                      >
                        <el-option
                          v-for="(item, index) of getTablesByInstanceId(
                            node.instanceId
                          )"
                          :key="item.value + '' + index"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <i
                      @click="removeSubNodes(index)"
                      v-show="form.target.length > 1"
                      class="el-icon-delete"
                    ></i>
                  </div>
                  <div
                    class="addButton"
                    v-if="!isUploadMode && leftIsPrimary"
                    @click="addSubNode"
                  >
                    + 新增节点
                  </div>
                </div>
              </el-scrollbar>
            </el-form-item>
          </el-col>
          <div class="formSplitLine"></div>
        </el-row>
      </el-form>
    </el-scrollbar>
    <div class="footer">
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" @click="doSubmit()">确人提交</el-button>
    </div>
  </div>
</template>

<script>
import {
  fetchAllTable,
  fetchAllSource,
  insertStrategy
} from '@/projectModule/api/dataSync/index.js'
export default {
  components: {},
  props: {},
  data () {
    return {
      leftIsPrimary: undefined,
      modeOptions: [
        {
          label: '上报模式',
          value: 1
        },
        {
          label: '系统模式',
          value: 0
        }
      ],
      tablesObject: {
        // 节点对应的表 hash 列如：xxx:[{label:'table1',value:'ssid1123'}]
      },
      allNodes: [
        // {
        //   label: '局节点',
        //   value: '1-1',
        //   isMain: true
        // },
        // {
        //   label: '次节点1',
        //   value: '1',
        //   isMain: false
        // }
      ],
      form: {
        strategyType: 1, // 模式
        source: [
          // 数据源节点
          {
            instanceId: '',
            tableName: ''
          }
        ],
        target: [
          // 目标节点
          {
            instanceId: '',
            tableName: ''
          }
        ]
      },
      rules: {
        strategyType: [
          {
            required: true,
            message: '请选择同步模式',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    isUploadMode () {
      return this.form.strategyType === 1
    },
    leftNodeOptions () {
      const { isUploadMode, leftIsPrimary, allNodes } = this
      if (isUploadMode) {
        // 上报模式左边只能选择下级节点
        return allNodes.filter((node) => !node.isMain)
      } else if (leftIsPrimary === false) {
        // 第一次选择下级节点
        return allNodes.filter((node) => !node.isMain)
      }
      return allNodes
      // 复制模式 左边选择了上级则不能再新增次级节点，
      // 选择了次节点可继续新增次节点不可选择主节点
    },
    rightNodeOptions () {
      // 上报模式右边只能选择上级节点
      const { isUploadMode, leftIsPrimary, allNodes } = this
      if (isUploadMode) {
        return allNodes.filter((node) => node.isMain)
      } else if (leftIsPrimary === false) {
        // 第一次选择下级节点
        return allNodes.filter((node) => node.isMain)
      } else if (leftIsPrimary) {
        return allNodes.filter((node) => !node.isMain)
      }
      return allNodes
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.fetchAllSourceList()
  },
  methods: {
    syncModeChange () {
      // 模式切换 手动使两边重置
      this.leftIsPrimary = undefined
      this.form.target = [
        {
          instanceId: '',
          tableName: ''
        }
      ]
      this.form.source = [
        {
          instanceId: '',
          tableName: ''
        }
      ]
    },
    leftNodeChange (val) {
      this.fetchTableList(val)
      // 上报模式不做处理
      const node = this.allNodes.find((item) => item.value === val)
      if (node === undefined) {
        this.leftIsPrimary = undefined
      } else if (node && node.isMain) {
        // 上级节点
        this.leftIsPrimary = true
        this.form.source = [
          {
            instanceId: val,
            tableName: ''
          }
        ]
      } else {
        this.leftIsPrimary = false
      }
    },
    rightNodeChange (val) {
      const node = this.allNodes.find((item) => item.value === val)
      if (node && node.isMain) {
        // 右边上级节点
        this.leftIsPrimary = false
        this.form.target = [
          {
            instanceId: val,
            tableName: ''
          }
        ]
      }
      this.fetchTableList(val)
    },
    async fetchTableList (sourceId) {
      // 查询对应节点的表
      if (sourceId) {
        // 查询并赋值
        const type = this.form.strategyType
        const result = await fetchAllTable({ sourceId, type })
        let { code, data } = result
        if (code === 0) {
          data = data || []
          this.tablesObject[sourceId + ''] = data.map((table) => {
            const { tableName: value, tableName: label } = table
            return {
              ...table,
              value,
              label
            }
          })
          // 数据延迟导致 v-for 的对象未响应变更，强制重绘
          this.$forceUpdate()
        }
      }
    },
    getTablesByInstanceId (instanceId) {
      return this.tablesObject[instanceId]
    },
    async fetchAllSourceList () {
      // 查询所有的节点列表
      const result = await fetchAllSource()
      let { code, data } = result
      if (code === 0) {
        data = data || []
        this.allNodes = data.map((node) => {
          // level 0是局级数据，1是所级数据
          const { dbName: label, sourceId: value } = node
          return { ...node, isMain: node.level === 0, label, value }
        })
      }
    },
    addPrimaryNode () {
      this.form.source.push({
        instanceId: '',
        tableName: ''
      })
    },
    removePrimaryNode (index) {
      this.form.source.splice(index, 1)
    },
    addSubNode () {
      this.form.target.push({
        instanceId: '',
        tableName: ''
      })
    },
    removeSubNodes (index) {
      this.form.target.splice(index, 1)
    },
    leftNodeDisabled (node) {
      // 查询是否在其他节点里被选择
      const value = node.value
      return this.form.source.map((item) => item.instanceId).includes(value)
    },
    rightNodeDisabled (node) {
      // 查询是否在其他节点里被选择
      const value = node.value
      return this.form.target.map((item) => item.instanceId).includes(value)
    },
    doSubmit () {
      this.$refs.strategyForm.validate((valid) => {
        if (valid) {
          insertStrategy(this.form).then((res) => {
            if (res.code === 0) {
              this.$emit('addSuccess')
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$border-color: #dcdfe6;
.el-form {
  width: 100%;
  height: 70vh;
  position: relative;
  /deep/ {
    .el-input,
    .el-select,
    .el-input__inner {
      width: 100%;
      text-align: left;
    }
    .el-form-item__label {
      text-align: right;
    }
  }
}
.el-row {
  position: relative;
}
.dynamicNodeBox {
  position: relative;
  height: 100%;
  padding-right: 80px;
  .nodeCard {
    position: relative;
    padding: 18px;
    padding-bottom: 0;
    margin-bottom: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid $border-color;
    .el-icon-delete {
      position: absolute;
      right: -50px;
      font-size: 26px;
      top: calc(50% - 13px);
      cursor: pointer;
      color: #f56c6c;
    }
  }
}
.addButton {
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  border: 1px dashed $border-color;
}
.formSplitLine {
  position: absolute;
  width: 1px;
  height: 100%;
  background: $border-color;
  left: 50%;
}
.footer {
  text-align: right;
}
</style>
