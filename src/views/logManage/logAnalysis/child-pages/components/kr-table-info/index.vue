<template>
  <table class="table" style="table-layout: fixed">
    <tbody>
      <tr
        :class="inOneCell ? 'inOneCell' : ''"
        v-for="(cells, Lidx) of computedCells"
        :key="Lidx"
      >
        <template v-for="(cell, Cidx) of cells">
          <template v-if="inOneCell">
            <td
              :style="normalCellStyle"
              :colspan="cell.colspan"
              v-if="cell.label"
              :key="Cidx"
            >
              <template v-if="cell.render">
                <expand-dom :cell="cell"></expand-dom>
              </template>
              <div v-else class="td_cell">
                <span :style="cell | computedLenth">{{ cell.label }}:</span
                ><span :style="cell.textSpanStyle">{{ cell|textFilter }} </span>
              </div>
            </td>
          </template>
          <template v-else>
            <td :style="labelCellStyle" v-if="cell.label" :key="Cidx + 'label'">
              <div class="cell">
                {{ cell.label }}
              </div>
            </td>
            <td :colspan="cell.colspan" v-if="cell.label" :key="Cidx + 'text'">
              <template v-if="cell.render">
                <expand-dom
                  :data="data"
                  :cell="cell"
                  :render="cell.render"
                ></expand-dom>
              </template>

              <div v-else class="cell">
                {{ cell|textFilter  }}
              </div>
            </td>
          </template>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  components: {
    expandDom: {
      functional: true,
      props: {
        data: Object,
        cell: Object,
        render: Function
      },
      render: (h, ctx) => {
        const params = {
          cell: ctx.props.cell,
          data: ctx.props.data
        }
        return ctx.props.render(h, params)
      }
    }
  },
  props: {
    cellsPerLine: {
      // 每行渲染多少格
      type: Number,
      default: 4
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    cells: {
      type: Array,
      default: () => [
        // { 列的数组
        //  label: String, // 数据名称
        //  key: String, // 数据键名
        //  colspan: Number // colspan合并多少列
        // }
        //
      ]
    },
    normalCellStyle: {
      type: [String, Object],
      default: () => {
        return {}
      }
    },
    inOneCell: {
      // 数据名和值放同一格？<td>{{label}}{{data[key]}}</td>:<td>{{label}}</td><td>{{value}}</td>
      type: Boolean,
      default: true
    },
    labelCellStyle: {
      type: [String, Object],
      default: () => {
        return { background: '#FAFAFA', fontWeight: '700' }
      }
    },
    textCellStyle: {
      type: [String, Object],
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  filters: {
    computedLenth (cell = {}) {
      const width = (cell.label.length + 1) * 14 + 'px'
      return { width, minWidth: width }
    },
    textFilter (cell) {
      const { formatter, text } = cell
      if (formatter) {
        return formatter(text)
      } else {
        return text
      }
    }
  },
  computed: {
    computedCells () {
      const { cells, cellsPerLine, data } = this
      const lines = []
      let solvedCells = []
      cells.forEach((cell) => {
        const { colspan = 1 } = cell
        if (!colspan) {
          solvedCells.push(cell)
        } else {
          const arr = Array.from({ length: colspan + 1 }).fill({})
          arr[0] = cell
          solvedCells = solvedCells.concat(...arr)
        }
      })
      for (let i = 0, len = solvedCells.length; i < len; i += cellsPerLine) {
        const arr = []
        solvedCells.slice(i, i + cellsPerLine).map((item) => {
          if (item.label) {
            const td = {
              ...item,
              label: item.label,
              text: data[item.key] || '-',
              colspan: item.colspan || 1
            }
            if (item.render) {
              td.render = item.render
            }
            arr.push(td)
          }
        })
        lines.push(arr)
      }
      return lines
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.table {
  width: 100%;
  border-spacing: 0;
  border-top: 1px solid #e1e1e1;
  border-left: 1px solid #e1e1e1;
  tr.inOneCell {
    display: flex;
    td {
      flex: 1;
    }
  }
  td {
    font-size: 14px;
    border-right: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    padding: 15px;
    color: rgb(0, 0, 0);
    .td_cell {
      padding-left: 10px;
      box-sizing: border-box;
      white-space: normal;
      word-break: break-all;
      line-height: 23px;
      display: flex;
    }
  }
}
</style>
