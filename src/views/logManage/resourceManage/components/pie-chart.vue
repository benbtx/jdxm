<template>
  <div class="pieBox">
    <v-charts :options="pieOptions" :autoresize="true"></v-charts>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'

export default {
  components: { 'v-charts': ECharts },
  props: {
    pieData: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    color: {
      type: Array,
      default: () => ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    }
  },
  data () {
    return {}
  },
  computed: {
    pieOptions () {
      const _this = this
      const { pieData, color } = this
      const total = pieData.map(it => it.value).reduce((a, sum) => (sum += Number(a) || 0))
      return {
        title: {
          text: '占用情况',
          textStyle: {
            fontSize: 14,
            fontWeight: 600
          },
          padding: [0, 0, 0, 24]
        },
        color,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 10,
        //   data: ['三方日志', '操作日志', '系统日志', '接口日志', '信令日志']
        // },
        series: [
          {
            name: '占用情况',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['70%', '90%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              formatter: ['{a|总占用}', '{b|' + _this.bytesToSize(total) + '}'].join('\n'),

              rich: {
                a: {
                  fontSize: 18,
                  color: '#b2b2b2',
                  lineHeight: 30
                },
                b: {
                  color: '#5a5a5a',
                  height: 40,
                  fontSize: 20
                }
              }
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: '30',
            //     fontWeight: 'bold'
            //   }
            // },
            labelLine: {
              show: false
            },
            data: pieData
            // [
            //   { value: 335, name: '三方日志' },
            //   { value: 310, name: '操作日志' },
            //   { value: 234, name: '系统日志' },
            //   { value: 135, name: '接口日志' },
            //   { value: 1548, name: '信令日志' }
            // ]
          }
        ]
      }
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    bytesToSize (size) {
      const bytes = parseInt(size) * 1024
      if (bytes === 0) return '0 B'
      var k = 1024 // or 1000
      var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      var i = Math.floor(Math.log(bytes) / Math.log(k))

      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
    }
  }
}
</script>
<style lang="scss" scoped>
.pieBox {
  /deep/ {
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
