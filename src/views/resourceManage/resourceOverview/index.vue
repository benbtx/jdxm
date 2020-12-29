<template>
<div class="bcgColor content">
  <el-row :gutter="20" >
    <el-col :span="8" >
      <div class="num-box box-shadow">
        <box-title title="数据总量"></box-title>
        <div class="num-content ">
          <div class="icon data-num">
            <i class="iconfont iconshujuku"></i>
          </div>
          <div class="num">
            <div style="font-size: 36px;font-weight: 600">{{num[0]?toThousands(num[0].num):0}} 条</div>
            <div>比昨日增加<span style="margin-left: 20px">{{num[0]?toThousands(num[0].numInc):0}} 条</span></div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8" >
      <div class="num-box box-shadow">
        <box-title title="表个数"></box-title>
        <div class="num-content ">
          <div class="icon form-num">
            <i class="iconfont iconshujuku"></i>
          </div>
          <div class="num">
            <div style="font-size: 36px;font-weight: 600">{{num[1]?toThousands(num[1].num):0}} 个</div>
            <div>比昨日增加<span style="margin-left: 20px">{{num[1]?toThousands(num[1].numInc):0}} 个</span></div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8" >
      <div class="num-box box-shadow">
        <box-title title="表储存量"></box-title>
        <div class="num-content ">
          <div class="icon form-stock">
            <i class="iconfont iconshujuku"></i>
          </div>
          <div class="num">
            <div style="font-size: 36px;font-weight: 600">{{num[2]?toThousands(num[2].num):0}} M</div>
            <div>比昨日增加<span style="margin-left: 20px">{{num[2]?toThousands(num[2].numInc):0}} M</span></div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
  <div class="trend box-shadow" style="margin-top: 20px">
    <box-title title="总数据量趋势">
      <div>
        <el-button type="text" @click="timeClick(1,1)">今日</el-button>
        <el-button type="text" @click="timeClick(2,1)">最近1周</el-button>
        <el-button type="text" @click="timeClick(3,1)">最近1月</el-button>
        <el-button type="text" @click="timeClick(4,1)">最近1年</el-button>
        <el-date-picker
          v-model="date"
          @change="dateChange"
          style="margin-left: 10px"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </box-title>
    <div class="trend-graph">
      <vue-charts :options="options" style="width:100%;height:100%" />
    </div>
  </div>
  <!--<el-row :gutter="20" style="margin-top: 20px">-->
    <!--<el-col :span="24">-->
      <!--<div class="trend box-shadow" style="margin-top: 20px">-->
        <!--<box-title title="任务调度执行情况统计"/>-->
        <!--<div class="trend-graph">-->
          <!--<vue-charts :options="options1" style="width:100%;height:100%" />-->
        <!--</div>-->
      <!--</div>-->
    <!--</el-col>-->
    <!--<el-col :span="8">-->
      <!--<div class="system box-shadow">-->
        <!--<box-title title="采集系统资源信息"/>-->
        <!--<div >-->
          <!--<vue-charts :options="options2" style="width:100%;height:237px" />-->
          <!--<vue-charts :options="options3" style="width:100%;height:237px" />-->
          <!--<div style="position: relative">-->
            <!--<vue-charts :options="options4" style="width:100%;height:237px" />-->
            <!--<div style="position: absolute;top:110px;width: 100%;text-align: center">{{loadAverage}}</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</el-col>-->
  <!--</el-row>-->
</div>
</template>

<script>
import { getTodayCollectCount, resouceChartInfo, getServerStatus, getCollectCountByDateAndFlags } from '@/projectModule/api/resourceManage/resourceOverview.js'
import { getYestoday, getWeek, getLastMonthYestdy, getLastYearYestdy } from '@/projectModule/utils/time.js'
import boxTitle from './boxTitle.vue'
export default {
  name: 'index',
  components: {
    boxTitle
  },
  data () {
    return {
      loadAverage: '',
      num: [],
      date: [],
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['总数据量', '数据增量'],
          bottom: 10
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0
          }
        ],
        series: [
          {
            name: '总数据量',
            type: 'bar',
            data: [],
            itemStyle: {
              normal: {
                color: '#007CFF'
              }
            }
          },
          {
            name: '数据增量',
            type: 'line',
            data: [],
            itemStyle: {
              normal: {
                color: '#09BB07'
              }
            }
          }
        ]
      },
      options1: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          top: 20,
          data: ['成功', '失败', '执行中']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            smooth: true,
            name: '成功',
            type: 'line',
            stack: '总量',
            areaStyle: {
              opacity: 0.2
            },
            data: [],
            itemStyle: {
              normal: {
                color: '#09BB07'
              }
            }
          },
          {
            smooth: true,
            name: '失败',
            type: 'line',
            stack: '总量',
            areaStyle: {
              opacity: 0.2
            },
            data: [],
            itemStyle: {
              normal: {
                color: '#E02020'
              }
            }
          },
          {
            smooth: true,
            name: '执行中',
            type: 'line',
            stack: '总量',
            areaStyle: {
              opacity: 0.2
            },
            data: [],
            itemStyle: {
              normal: {
                color: '#007CFF'
              }
            }
          }
        ]
      },
      options2: {
        title: {
          text: 'CPU使用情况',
          textStyle: {
            fontSize: '14',
            fontWeight: '600'
          },
          padding: [10, 0, 0, 24]
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: 'CPU使用情况',
            type: 'gauge',
            radius: '90%',
            detail: { formatter: '{value}%', padding: [60, 0, 0, 0], fontSize: 24 },
            data: [{ value: 0, name: '使用率' }],
            title: {
              show: true,
              padding: [170, 0, 0, 0],
              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                width: 20,
                color: [[0.5, '#09BB07'], [0.7, '#ffd10d'], [0.9, '#E08300'], [1, '#E02020']]
              }
            }
          }
        ]
      },
      options3: {
        title: {
          text: '内存使用率',
          textStyle: {
            fontSize: '14',
            fontWeight: '600'
          },
          padding: [10, 0, 0, 24]
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '内存使用率',
            type: 'gauge',
            radius: '90%',
            detail: { formatter: '{value}%', padding: [60, 0, 0, 0], fontSize: 24 },
            data: [{ value: 0, name: '使用率' }],
            title: {
              show: true,
              padding: [170, 0, 0, 0],
              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                width: 20,
                color: [[0.5, '#09BB07'], [0.7, '#ffd10d'], [0.9, '#E08300'], [1, '#E02020']]
              }
            }
          }
        ]
      },
      options4: {
        title: {
          text: '平均负载',
          textStyle: {
            fontSize: '14',
            fontWeight: '600'
          },
          padding: [10, 0, 0, 24]
        },
        series: [
          {
            name: '平均负载',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: false,
            legendHoverLink: false,
            hoverAnimation: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 0,
                itemStyle: {
                  color: '#09BB07',
                  normal: { color: '#09BB07' },
                  emphasis: { color: '#09BB07' }
                }
              },
              {
                value: 0,
                itemStyle: {
                  color: '#f7f7f7',
                  normal: { color: '#f7f7f7' },
                  emphasis: { color: '#f7f7f7' }
                }
              }
            ]
          }
        ]
      }
    }
  },
  mounted () {
    this.getTodayCollectCount()
    // this.resouceChartInfo()
    // this.getServerStatus()
    this.getCollectCountByDateAndFlags(
      { endtDate: this.$dayjs(getWeek(new Date())[1]).format('YYYY-MM-DD'), startDate: this.$dayjs(getWeek(new Date())[0]).format('YYYY-MM-DD'), flags: 0 }
    )
  },
  methods: {
    timeClick (type) {
      this.date = this.setTime(type)
      this.getCollectCountByDateAndFlags({
        endtDate: this.$dayjs(this.date[1]).format('YYYY-MM-DD'),
        startDate: this.$dayjs(this.date[0]).format('YYYY-MM-DD'),
        flags: 0
      })
    },
    setTime (type) {
      let date = []
      if (type === 1) {
        // date = getYestoday(new Date())
        date = [new Date(), new Date()]
      }
      if (type === 2) {
        // date = getWeek(new Date())
        date = [this.$dayjs(new Date()).subtract(1, 'week'), new Date()]
      }
      if (type === 3) {
        // date = getLastMonthYestdy(new Date())
        date = [this.$dayjs(new Date()).subtract(1, 'month'), new Date()]
      }
      if (type === 4) {
        // date = getLastYearYestdy(new Date())
        date = [this.$dayjs(new Date()).subtract(1, 'year'), new Date()]
      }
      return date
    },
    dateChange () {
      this.getCollectCountByDateAndFlags({
        endtDate: this.$dayjs(this.date[1]).format('YYYY-MM-DD'),
        startDate: this.$dayjs(this.date[0]).format('YYYY-MM-DD'),
        flags: 0
      })
    },
    toThousands (num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    },
    getTodayCollectCount () {
      this.num = []
      getTodayCollectCount().then(data => {
        if (data.code === 0) {
          this.num = data.data
        }
      })
    },
    resouceChartInfo () {
      resouceChartInfo().then(data => {
        if (data.code === 0) {
          this.options1.xAxis[0].data = data.data.triggerDayList
          this.options1.series[0].data = data.data.triggerDayCountSucList
          this.options1.series[1].data = data.data.triggerDayCountFailList
          this.options1.series[2].data = data.data.triggerDayCountRunningList
        }
      })
    },
    getServerStatus () {
      getServerStatus().then(data => {
        if (data.code === 0) {
          this.options2.series[0].data[0].value = data.data.cpuUsage
          this.options3.series[0].data[0].value = data.data.memoryUsage
          this.loadAverage = data.data.loadAverage
          if (data.data.loadAverage <= 3) {
            this.options4.series[0].data[0].itemStyle = {
              color: '#09BB07',
              normal: { color: '#09BB07' },
              emphasis: { color: '#09BB07' }
            }
            this.options4.series[0].data[0].value = data.data.loadAverage
            this.options4.series[0].data[1].value = 9 - data.data.loadAverage
          } else if (data.data.loadAverage <= 5) {
            const num = 3 + (data.data.loadAverage - 3) / 2 * 3
            this.options4.series[0].data[0].itemStyle = {
              color: '#E08300',
              normal: { color: '#E08300' },
              emphasis: { color: '#E08300' }
            }
            this.options4.series[0].data[0].value = num
            this.options4.series[0].data[1].value = 9 - num
          } else {
            this.options4.series[0].data[0].itemStyle = {
              color: '#E02020',
              normal: { color: '#E02020' },
              emphasis: { color: '#E02020' }
            }
            if (data.data.loadAverage > 20) {
              this.options4.series[0].data[1].value = 0
              this.options4.series[0].data[0].value = 9
            } else {
              const num = 6 + (data.data.loadAverage - 5) / 15 * 3
              this.options4.series[0].data[0].value = num
              this.options4.series[0].data[1].value = 9 - num
            }
          }
        }
      })
    },
    getCollectCountByDateAndFlags (params) {
      getCollectCountByDateAndFlags(params).then(data => {
        var time = []; var num = []; var inc = []
        if (data.code === 0) {
          data.data.map(value => {
            time.push(value.dt)
            num.push(value.num)
            inc.push(value.numInc)
          })
        }
        this.options.xAxis[0].data = time
        this.options.series[0].data = num
        this.options.series[1].data = inc
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/projectModule/assets/css/basic-color.scss";
  .content{
    height: 100%;
    .num-box{
      border-radius: 5px;
      overflow: hidden;
      background-color: #fff;
      .num-content{
        height: 170px;
        display: flex;
        padding-left: 24px;
        align-items:center;
        justify-content:center;
        .data-num{
          background-color: transparentize($color-primary,0.8);
          color: $color-primary;
        }
        .form-num{
          background-color: transparentize($color-success,0.8);
          color: $color-success;
        }
        .form-stock{
          background-color: transparentize($color-warning,0.8);
          color: $color-warning;
        }
        .icon{
          width: 120px;
          height: 120px;
          line-height: 100%;
          text-align: center;
          i{
            font-size: 50px;
            line-height: 120px;
          }
        }
        .num{
          flex: 1;
          height: 120px;
          padding-left: 24px;
          line-height: 60px;
        }
      }
    }
    .trend{
      border-radius: 5px;
      background-color: #fff;
      height: calc(100% - 240px);
      .trend-graph{
        height: calc(100% - 60px);
      }
    }
    .system{
      border-radius: 5px;
      background-color: #fff;
      height: 766px;
    }
  }
</style>
