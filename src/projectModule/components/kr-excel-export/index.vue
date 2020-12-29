<template>
    <span v-if="plainOptions.type === 'span'" @click="handleClick">
        {{ loading ? plainOptions.loadingTitle : plainOptions.title }}
    </span>
    <a v-else-if="plainOptions.type === 'a'" @click="handleClick">
        {{ loading ? plainOptions.loadingTitle : plainOptions.title }}
    </a>
    <el-button
        v-else
        :type="buttonType"
        :size="buttonSize"
        :loading="loading"
        @click="handleClick"
        :disabled="disabled"
        :icon="icon"
        :class="selfClass"
        >{{ title }}</el-button
    >
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'kr_excel_export',
  props: {
    orderNum: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    buttonType: {
      type: String,
      default: ''
    },
    icon: {
      type: String
    },
    buttonSize: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      default: '全部列表.xlsx'
    },
    sheetName: {
      type: String,
      default: 'sheet1'
    },
    fnGetData: {
      type: Function,
      default: () => {}
    },
    config: {
      type: Object,
      default () {
        return {}
      }
    },
    exportConfig: {
      type: [Array, Object, Function],
      default: null
      // () => {
      //     return {
      //         sheetName: "sheet", // sheet名称
      //         config: {},
      //         fnGetData: () => []
      //     };
      // }
    },
    title: {
      type: String,
      default: '导出'
    },
    // span 样式的按钮
    plainOptions: {
      type: Object,
      default () {
        return {
          type: '',
          title: ''
        }
      }
    },
    selfClass: {
      type: String
    }
  },
  computed: {
    fileNameChecked () {
      const reg = /(\.xlsx|\.xls)$/
      if (reg.test(this.fileName)) {
        const temp = this.fileName.split('.')
        return temp[0] + this.getCurrentTime() + '.' + temp[1]
      } else {
        return this.fileName + this.getCurrentTime() + '.xlsx'
      }
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    handleClick () {
      this.loading = true
      function getType (obj) {
        return Object.prototype.toString.call(obj).slice(8, -1)
      }
      let exportConfig = []
      const configType = getType(this.exportConfig)
      switch (configType) {
        case 'Function':
          exportConfig = this.exportConfig()
          break
        case 'Array':
          exportConfig = this.exportConfig
          break
        case 'Object':
          exportConfig = [{ ...this.exportConfig }]
          break
        case 'Null':
          var { config, fnGetData, sheetName } = this
          exportConfig = [{ config, fnGetData, sheetName }]
          break
        default:
          return this.$message.error(
            '参数配置错误，请检查导出配置！'
          )
      }
      setTimeout(() => {
        this.loading = false // 超时自动将按钮状态置为可点击状态。
      }, 10000)
      const syncGetDatas = exportConfig.map(item => {
        return item.fnGetData
      })
      // solve bug 解决传入异步函数时导致的代码执行顺序紊乱
      // now: 用Promise.all不管是否传入的是async 函数都先完成数据获取再执行其他操作
      Promise.all(syncGetDatas).then(values => {
        values.forEach((resData, index) => {
          if (!resData.length) {
            const obj = {}
            // 空数据处理，现在允许导出空表，但是只有表头
            exportConfig[index].config.includes.map(key => {
              obj[key] = ''
            })
            resData = [obj]
          }
          exportConfig[index].resData = resData
        })
        this.solveData2Sheet(exportConfig)
      })
    },
    solveData2Sheet (exportConfig) {
      const _this = this
      const workbook = {
        SheetNames: [],
        Sheets: {}
        // SheetNames: [sheetName, "sheet2"],
        // Sheets: {
        //     sheet1: sheet,
        //     sheet2: sheet
        // }
      }
      exportConfig.forEach(function (vm, index) {
        const { config, resData, sheetName = `sheet${index + 1}` } = vm
        const { includes, formatters } = config
        // const resData = testData;
        if (!resData) {
          _this.$message.error('导出数据失败！')
          return
        }
        if (resData.length === 0) {
          _this.$message.error('暂无数据！')
          return
        }
        const newAllList = _this.exportDataFilter(
          resData,
          includes,
          formatters
        ) // 数据构造
        const sheet = XLSX.utils.aoa_to_sheet(newAllList) // 转换为 sheet 对象
        // sheet["!margin"] = {
        //   left: 1.0,
        //   right: 1.0,
        //   top: 1.0,
        //   bottom: 1.0,
        //   header: 0.5,
        //   footer: 0.5
        // };
        sheet['!cols'] = [
          { wpx: 50 },
          ...widthFormatter(includes, formatters)
        ]
        workbook.SheetNames.push(sheetName)
        workbook.Sheets[sheetName] = sheet
      })
      _this.loading = false

      // // sheet["!margin"] = {
      // //   left: 1.0,
      // //   right: 1.0,
      // //   top: 1.0,
      // //   bottom: 1.0,
      // //   header: 0.5,
      // //   footer: 0.5
      // // };
      // sheet["!cols"] = [
      //     { wpx: 50 },
      //     ...widthFormatter(includes, formatters)
      // ];
      this.downloadExcelFlie(
        this.sheet2blob(workbook),
        this.fileNameChecked
      )

      // 格式化单元格列宽
      function widthFormatter (list, option) {
        return list.map(item => {
          if (option[item] && option[item].width) {
            return { wpx: option[item].width }
          } else {
            return { wpx: 80 }
          }
        })
      }
    },
    /**
         * @description 文件下载
         * @param {string, blob} url 下载链接，或是一个 blob 对象
         * @param {string} fileName 保存的文件名
         */
    downloadExcelFlie (url, fileName = '列表.xlsx') {
      if (typeof url === 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url) // 创建 blob地址
      }
      const aLink = document.createElement('a')
      aLink.href = url
      aLink.download = fileName

      // 模拟点击事件
      const body = document.getElementsByTagName('body')[0]
      body.appendChild(aLink)
      aLink.click()
      aLink.remove()
    },

    /**
         * @description 将 sheet 对象转换成 blob 类型
         * @param {sheet} sheet sheet对象
         * @param {string} sheetName 表名
         */
    sheet2blob (workbook) {
      // 生成excel的配置项
      const wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
      }
      const wbout = XLSX.write(workbook, wopts)
      const blob = new Blob([s2ab(wbout)], {
        type: 'application/octet-stream'
      })

      // 字符串转ArrayBuffer
      function s2ab (s) {
        const buf = new ArrayBuffer(s.length)
        const view = new Uint8Array(buf)
        for (let i = 0; i !== s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xff
        }
        return buf
      }
      return blob
    },

    /**
         * @description 筛选出需要导出的字段，并格式化
         * @param {Array} list 被筛选数据
         * @param {Array} titles 字段名数组
         */
    exportDataFilter (list, includes, formatters) {
      const newList = []
      const header = this.orderNum ? ['序号'] : []
      // 构造标题组
      includes.map(item => {
        if (formatters[item] && formatters[item].title) {
          header.push(formatters[item].title)
        } else {
          header.push(item)
        }
      })
      newList.push(header)

      // 筛选相应字段的数据，并格式化
      list.map((item, index) => {
        const temp = this.orderNum ? [index + 1] : []
        includes.map(it => {
          const value = item[it]

          if (formatters[it] && formatters[it].formatter) {
            temp.push(formatters[it].formatter(value, item))
          } else {
            temp.push(value)
          }
        })
        newList.push(temp)
      })
      return newList
    },

    // 获取当前时间
    getCurrentTime () {
      const date = new Date()
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date
        .getDate()
        .toString()
        .padStart(2, '0')
      const hour = date
        .getHours()
        .toString()
        .padStart(2, '0')
      const minute = date
        .getMinutes()
        .toString()
        .padStart(2, '0')
      const second = date
        .getSeconds()
        .toString()
        .padStart(2, '0')
      return `${year}${month}${day}${hour}${minute}${second}`
    }
  }
}
</script>

<style lang="scss" module></style>
