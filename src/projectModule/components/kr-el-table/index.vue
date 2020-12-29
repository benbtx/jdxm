<template>
    <!--
    作者:zhouzhiyi
    日期:2019/12/13
    关于：由于d2-crub未支持展开行（或者未找到对应文档）因此自行封装el-table来达到逐步替换d2-crub的目的
 -->
    <div class="kr-table-contaier">
        <el-table
            header-cell-class-name="headerCell"
            @sort-change="$emit('sort-change',$event)"
            :data="rows"
            :stripe="mixinOptions.stripe"
            :highlight-current-row="true"
            :border="mixinOptions.border"
            :size="mixinOptions.size"
            :height="mixinOptions.height"
            :max-height="mixinOptions['max-height']"
            :span-method="mixinOptions['span-method']"
            ref="refTable"
            @selection-change="selectionChange"
            @row-click="rowClick"
        >
            <el-table-column
                v-if="mixinOptions.showSelection || showSelection"
                type="selection"
                width="50"
                label="全选"
                align="center"
            ></el-table-column>
            <el-table-column
                v-if="mixinOptions.showIndex"
                type="index"
                width="50"
                label="序号"
                align="center"
            ></el-table-column>

            <template v-for="(column, index) in columns">
                <!-- <template v-if="!column.needHidden"> -->
                <el-table-column
                    :prop="column.prop"
                    :key="index"
                    :label="column.label"
                    :align="column.align || 'center'"
                    :width="column.width"
                    :type="column.type"
                    :fixed="column.fixed"
                    :sortable="column.sortable"
                    :sort-orders="column.sortOrders"
                    :show-overflow-tooltip="showTooltip(column)"
                >
                    <template slot-scope="scope">
                        <template v-if="!column.render">
                            <template v-if="column.formatter">
                                <span
                                    v-html="column.formatter(scope.row, column)"
                                ></span>
                            </template>
                            <template v-else>
                                <span>{{ scope.row[column.prop] }}</span>
                            </template>
                        </template>
                        <template v-else>
                            <expand-dom
                                :column="column"
                                :row="scope.row"
                                :render="column.render"
                                :index="index"
                                :ind="scope.$index"
                            ></expand-dom>
                        </template>
                    </template>
                </el-table-column>
                <!-- </template> -->
            </template>
            <el-table-column
                ref="fixedColumn"
                label="操作"
                align="center"
                :width="operates.width"
                :fixed="operates.fixed"
                v-if="operates.list.filter(_x => _x.show === true).length > 0"
            >
                <template slot-scope="scope">
                    <div class="operate-group">
                        <template v-for="(btn, key) in operates.list">
                            <div
                                class="item"
                                v-if="btn.show"
                                :key="btn.id"
                            >
                                <el-button
                                    :type="btn.type"
                                    size="mini"
                                    :icon="btn.icon"
                                    :disabled="btn.disabled"
                                    :plain="btn.plain"
                                    @click.native.prevent="
                                        btn.method(key, scope.row)
                                    "
                                    >{{ btn.label }}</el-button
                                >
                            </div>
                        </template>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <kr-pagination
            v-if="mixinOptions.showPagination"
            :total="total"
            :defaultCurrent="pageNum"
            :pageSizes="mixinOptions.pageSizes"
            @on-page-change="pageChange"
        ></kr-pagination>
    </div>
</template>

<script>
import krPagination from '@/projectModule/components/kr-pagination/index.vue'
import {
  Table,
  TableColumn
} from 'element-ui'
export default {
  name: 'kr-el-table',
  props: {
    // 表格数据总量
    total: {
      type: Number,
      default: 0
    },
    // 页码
    pageNum: {
      type: Number,
      default: 1
    },
    // 通用设置项，可用来覆盖mixinOptions
    options: {
      type: Object,
      default: () => {}
    },
    // 表头
    columns: {
      type: Array,
      default: () => []
    },
    // 展示数据
    rows: {
      type: Array,
      default: () => []
    },
    // 是否添加选择项
    showSelection: {
      type: Boolean,
      default: false
    },
    // 操作项
    operates: {
      type: Object,
      default: () => {
        return {
          list: []
        }
      }
    }
  },
  // 组件
  components: {
    'el-table': Table,
    'el-table-column': TableColumn,
    krPagination,
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        ind: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
          ind: ctx.props.ind
        }
        if (ctx.props.column) params.column = ctx.props.column
        return ctx.props.render(h, params)
      }
    }
  },

  computed: {
    mixinOptions () {
      return {
        // 是否为斑马纹 table
        stripe: false,
        // 是否带有纵向边框
        border: true,
        // 是否显示序号
        showIndex: true,
        // 是否为选择项
        showSelection: false,
        // 表格大小
        size: 'medium',
        showPagination: true,
        total: 0,
        current: 1,
        'span-method': () => {
          // let { row, colume, rowIndex, columnIndex } = params;
          return undefined
        },
        ...this.options
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    showTooltip (column) {
      // 如果自定义了show-overflow-tooltip直接使用，否则为true
      return !!column['show-overflow-tooltip']
    },
    pageChange (current, size) {
      this.$emit('on-page-change', current, size)
    },
    selectionChange (selection) {
      this.$emit('selection-change', selection)
    },
    rowClick (row, column, event) {
      this.$emit('row-click', row, column, event)
    },
    clearSelection () {
      this.$refs.refTable.clearSelection()
    }
  }
}
</script>
<style lang="scss" scoped>
.operate-group {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
        margin-right: 5px;
    }
}
.kr-table-contaier {
    /deep/ {
        .headerCell {
            padding: 15px 0;
            text-align: center;
            font-weight: bold;
            color: #333;
            font-size: 14px;
            background: #fafafa;
        }
    }
    .el-table__body tr.current-row>td {
    background: #e6f2ff;
}
}
</style>
