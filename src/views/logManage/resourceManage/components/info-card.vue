<template>
  <div class="info-card">
    <div class="title">
      <h2>{{ row.title }}</h2>
      <!-- <p>
        <el-button type="danger" icon="el-icon-delete">清理日志</el-button>
        <el-button type="primary" icon="el-icon-plus">增加资源</el-button>
      </p> -->
    </div>
    <div class="dataContainer">
      <div class="totalMemory">
        <div class="text">总内存</div>
        <div class="icon">
          <i class="iconfont iconshujuku"></i>
        </div>
        <div>
          <p class="totalNum">{{ row.diskTotal | bytesToSize }}</p>
          <p class="remainNum">
            <span>剩余内存</span>
            <span>{{ row.diskAvail | bytesToSize }}</span>
          </p>
        </div>
      </div>
      <div class="chartView">
        <gauge-chart class="chart" :percent="row.diskPercent"></gauge-chart>
      </div>

      <div class="chartView pieView">
        <pie-chart
          class="chart"
          :pieData="row.pieData"
          :color="pieColors"
          :total="123456"
        ></pie-chart>
        <div class="dataItems">
          <div
            class="dataItem"
            v-for="(item, idx) of row.pieData"
            :key="item.name + idx"
          >
            <p class="front">
              <i class="circle" :style="{ background: pieColors[idx] }"></i>
              <span class="text">{{ item.name }}</span>
              <span class="text" style="color: #e1e1e1">|</span>
              <span class="percent">{{ data2Percent(item) }}</span>
            </p>
            <p class="back">
              <span class="number">{{ item.value | bytesToSize }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pieChart from './pie-chart.vue'
import gaugeChart from './gauge-chart.vue'
export default {
  components: { pieChart, gaugeChart },
  props: {
    row: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      pieColors: [
        '#3ba1ff',
        '#4fcb74',
        '#fbd438',
        '#f04864',
        '#37cbcb',
        '#c23531',
        '#2f4554',
        '#61a0a8',
        '#d48265',
        '#91c7ae',
        '#749f83',
        '#ca8622',
        '#bda29a',
        '#6e7074',
        '#546570',
        '#c4ccd3'
      ]
    }
  },
  filters: {
    bytesToSize (size) {
      const bytes = parseInt(size) * 1024
      if (bytes === 0) return '0 B'
      var k = 1000 // or 1024
      var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      var i = Math.floor(Math.log(bytes) / Math.log(k))

      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
    }
  },
  methods: {
    data2Percent (item) {
      const sum = this.row.pieData
        .map((it) => it.value)
        .reduce((i, sum) => (sum += i))
      return ((item.value / sum) * 100).toFixed(2) + '%'
    }
  }
}
</script>
<style lang="scss" scoped>
.info-card {
  position: relative;
  height: 246px;
  border: 1px solid #e1e1e1;
  margin-bottom: 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  .title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;
    padding: 0 14px;
    box-sizing: border-box;
    margin: 0;
    line-height: 60px;
    h2 {
      margin: 0;
    }
  }
  .dataContainer {
    position: relative;
    display: flex;
    height: 188px;
    padding: 14px;
    box-sizing: border-box;
    justify-content: space-around;
    .totalMemory {
      display: flex;

      .text {
        // line-height: 128px;
        font-size: 14px;
        font-weight: bold;
      }
      .icon {
        width: 130px;
        height: 130px;
        margin-right: 30px;
        border-radius: 50%;
        background: #cce5ff;
        text-align: center;
        line-height: 130px;
        .iconfont {
          font-size: 60px;
          color: #007cff;
        }
      }
      .totalNum {
        font-size: 34px;
        // font-weight: bold;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .remainNum {
        margin: 0;
        text-align: center;
        font-size: 14px;
        color: #f56c6c;
        span:first-child {
          margin-right: 12px;
        }
      }
    }
    .pieView {
      display: flex;
      .dataItems {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        transform: translateX(-60px);
        .dataItem {
          width: 240px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .front {
          display: flex;
          align-items: center;
        }
        .front,
        .back {
          margin: 0;
        }
        i,
        span {
          margin-right: 6px;
        }
        .circle {
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
      }
    }
    .chart {
      width: 320px;
      height: 100%;
    }
  }
}
</style>
