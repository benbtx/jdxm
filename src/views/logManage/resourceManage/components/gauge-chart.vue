<template>
  <div class="gauge-chart">
    <v-charts :options="options" :autoresize="true"></v-charts>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
export default {
  components: { 'v-charts': ECharts },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  computed: {
    options () {
      let { percent } = this
      percent = Number(percent.toFixed(2))
      return {
        title: {
          text: '内存使用率',
          textStyle: {
            fontSize: '14',
            fontWeight: '600'
          },
          padding: [0, 0, 0, 24]
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '内存使用率',
            type: 'gauge',
            radius: '90%',
            min: 0,
            max: 100,
            detail: {
              formatter: '{value}%',
              padding: [20, 0, 0, 0],
              // color: '#5a5a5a',
              color: 'auto',
              fontSize: 18
            },
            data: [{ value: percent, name: '使用率' }],
            title: {
              show: true,
              padding: [180, 0, 0, 0],
              fontSize: 16,
              color: '#5a5a5a'
            },
            splitNumber: 10,
            splitLine: {
              show: true,
              length: 14,
              lineStyle: {
                color: 'auto',
                width: 3
              }
            },
            axisTick: {
              show: false,
              splitNumber: 5
            },
            axisLabel: {
              show: true,
              distance: 5,
              // color: '#5a5a5a',
              color: 'auto',
              fontSize: 14,
              // backgroundColor: 'auto',
              // borderRadius: 2,
              // color: '#eee',
              // padding: 3,
              formatter (value) {
                if (value === 10) {
                  return '优'
                } else if (value === 40) {
                  return '良'
                } else if (value === 70) {
                  return '中'
                } else if (value === 90) {
                  return '差'
                }
              }
            },
            axisLine: {
              lineStyle: {
                width: 8,
                color: [
                  [0.2, '#67C23A'],
                  [0.6, '#409EFF'],
                  [0.8, '#E6A23C'],
                  [1, '#F56C6C']
                ]
              }
            }
          }
        ]
      }
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.gauge-chart {
  /deep/ {
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
