<template>
  <div class="centerFrame">
    <!-- <div class="circle circle1"></div>
        <div class="circle circle2"></div>
        <div class="circle circle3"></div> -->
    <div class="center-header">
      <span class="text first">总数据量</span>
      <span
        class="num-card"
        v-for="(num, index) of totalNumbers"
        :key="num + '-' + index"
      >
        <animate-integer class="number" v-bind:value="num" />
      </span>
      <span class="text">条</span>
    </div>

    <svg
      version="1.1"
      viewBox="0 0 1320 1080"
      preserveAspectRatio="xMinYMin meet"
      class="svg-content"
    >
      <!-- 文档流的顺序能决定节点的z-index值，不用额外设置样式 -->
      <!-- 因此选择从下层往上进行绘图 -->
      <defs>
        <linearGradient id="gradColor" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            style="stop-color: rgb(255, 255, 255); stop-opacity: 0"
          />
          <stop offset="100%" style="stop-color: #00f6ff; stop-opacity: 1" />
        </linearGradient>
      </defs>
      <defs>
        <radialGradient
          id="shadow_blue1"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop
            offset="0%"
            style="stop-color: rgba(0, 0, 0, 0); stop-opacity: 0"
          />
          <stop
            offset="70%"
            style="stop-color: rgb(7, 182, 226, 0); stop-opacity: 1"
          />
          <stop
            offset="90%"
            style="stop-color: rgb(7, 182, 226, 0.1); stop-opacity: 1"
          />
          <stop
            offset="100%"
            style="stop-color: rgb(7, 182, 226, 0.4); stop-opacity: 1"
          />
        </radialGradient>
      </defs>
      <ellipse
        v-for="index of [0, 1, 2, 3]"
        :key="index"
        cx="650"
        cy="800"
        rx="0"
        ry="0"
        style="fill: url(#shadow_blue1)"
      >
        <!-- rx="600"
                ry="240" -->
        <animate
          attributeName="rx"
          from="0"
          to="600"
          dur="9s"
          :begin="3 * index + 's'"
          repeatCount="indefinite"
        />
        <animate
          attributeName="ry"
          from="0"
          to="240"
          dur="9s"
          :begin="3 * index + 's'"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="1"
          to="0.1"
          dur="9s"
          :begin="3 * index + 's'"
          repeatCount="indefinite"
        />
      </ellipse>
      <!-- boxs -->
      <!-- 上面的&从左至右 -->
      <g>
        <image
          width="88"
          height="88"
          x="310"
          y="600"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="400"
          y="570"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="470"
          y="570"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="540"
          y="530"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="610"
          y="530"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="680"
          y="540"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="750"
          y="570"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="820"
          y="570"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="920"
          y="600"
          xlink:href="./images/center/box.png"
        />

        <!-- boxs -->
        <!-- 下面的&从左至右 -->
        <image
          width="88"
          height="88"
          x="240"
          y="650"
          xlink:href="./images/center/box.png"
        />

        <image
          x="210"
          y="750"
          width="88"
          height="88"
          xlink:href="./images/center/box.png"
        />

        <image
          width="88"
          height="88"
          x="270"
          y="810"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="360"
          y="850"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="460"
          y="880"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="565"
          y="890"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="680"
          y="880"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="800"
          y="850"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="920"
          y="800"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="1000"
          y="740"
          xlink:href="./images/center/box.png"
        />
        <image
          width="88"
          height="88"
          x="980"
          y="660"
          xlink:href="./images/center/box.png"
        />
      </g>
      <!-- boxs end -->
      <image
        width="680"
        height="251"
        x="310"
        y="530"
        xlink:href="./images/center/3.png"
      />

      <!--candles-->
      <!-- 上面的&从左至右 -->
      <g>
        <image
          width="80"
          height="210"
          x="470"
          y="400"
          opacity="0.7"
          xlink:href="./images/center/candle.png"
        />
        <image
          width="80"
          height="210"
          x="620"
          y="380"
          opacity="0.6"
          xlink:href="./images/center/candle.png"
        />
        <image
          width="80"
          height="210"
          x="760"
          y="400"
          opacity="0.7"
          xlink:href="./images/center/candle.png"
        />
        <image
          width="80"
          height="210"
          x="880"
          y="450"
          opacity="0.8"
          xlink:href="./images/center/candle.png"
        />
        <!-- 下面的蜡烛&从左至右 -->
        <image
          width="80"
          height="210"
          x="360"
          y="450"
          xlink:href="./images/center/candle.png"
        />
        <image
          width="80"
          height="210"
          x="470"
          y="510"
          xlink:href="./images/center/candle.png"
        />
        <image
          width="80"
          height="210"
          x="620"
          y="530"
          xlink:href="./images/center/candle.png"
        />
        <image
          width="80"
          height="210"
          x="760"
          y="510"
          xlink:href="./images/center/candle.png"
        />
      </g>

      <!--candles End-->
      <image
        width="508"
        height="193"
        x="400"
        y="342"
        xlink:href="./images/center/2.png"
      />
      <image
        width="188"
        height="211"
        x="560"
        y="222"
        xlink:href="./images/center/1.png"
      />
      <!--lines-->
      <g>
        <path
          v-for="line of lines"
          :key="line.index + 'path'"
          fill="transparent"
          stroke="#05b4e6"
          stroke-width="2"
          :d="line.path"
          class="path"
        ></path>
        <rect
          v-for="line of lines"
          :key="line.index + 'rect'"
          x="-20"
          y="-2.5"
          width="40"
          height="5"
          fill="url(#gradColor)"
        >
          <animateMotion
            :path="line.path"
            dur="4s"
            :delay="line.index + 's'"
            repeatCount="indefinite"
            rotate="auto"
          />
        </rect>
        <!-- <path
                    fill="transparent"
                    stroke="red"
                    stroke-width="2"
                    d="M650 246 Q 850 130,920 540 Q 1000 655 1045 760"
                    class="path"
                ></path> -->
      </g>
      <image
        width="788"
        height="453"
        x="210"
        xlink:href="./images/center/light.png"
      />
      <text class="zichanText" x="240" y="650">接口</text>
      <text class="zichanText" x="210" y="750">信令</text>
      <text class="zichanText" x="270" y="810">接口</text>
      <text class="zichanText" x="360" y="850">信令</text>
      <text class="zichanText" x="460" y="880">基础资源</text>
      <text class="zichanText" x="565" y="890">接口</text>
      <text class="zichanText" x="680" y="880">信令</text>
      <text class="zichanText" x="800" y="850">基础资源</text>
      <text class="zichanText" x="920" y="800">信令</text>
      <text class="zichanText" x="1060" y="740">接口</text>
      <text class="zichanText" x="1040" y="660">信令</text>

      <text class="zichanText" x="320" y="500">所级数据</text>
      <text class="zichanText" x="430" y="580">所级数据</text>
      <text class="zichanText" x="580" y="600">所级数据</text>
      <text class="zichanText" x="820" y="580">所级数据</text>
      <text class="zichanText" x="940" y="500">所级数据</text>

      <text class="zichanText" x="625" y="182">局级数据</text>
    </svg>
  </div>
</template>

<script>
const animateInteger = () => import('./animate-integer/index.vue')
export default {
  components: { animateInteger },
  props: {
    totalDataCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      lines: [
        {
          index: 1,
          path: 'M290 665 Q 290 550, 400 550 Q 460 110 650 246'
        },
        {
          index: 2,
          path: 'M260 770 Q 280 655, 400 550 Q 460 110 650 246'
        },
        {
          index: 3,
          path: 'M325 825 Q 320 655,510 610 Q 520 130 650 246'
        },
        {
          index: 4,
          path: 'M400 880 Q 420 655,510 610 Q 520 130 650 246'
        },
        {
          index: 5,
          path: 'M505 900 Q 520 655,660 625 Q 660 130 650 246'
        },
        {
          index: 6,
          path: 'M610 912 Q 600 655,660 625 Q 660 130 650 246'
        },
        {
          index: 7,
          path: 'M725 905 Q 720 655,660 625 Q 660 130 650 246'
        },
        {
          index: 11, // 11在10前面是为了实现视觉的遮挡效果
          path: 'M1040 680 Q 1040 655,920 540 Q 850 110 650 246'
        },
        {
          index: 10, // 10在9前面是为了实现视觉的遮挡效果
          path: 'M1045 760 Q 1000 655,920 540 Q 850 110 650 246'
        },
        {
          index: 8,
          path: 'M845 875 Q855 655 ,800 610 Q 800 100 650 246'
        },
        {
          index: 9,
          path: 'M965 820 Q 900 655,800 610 Q 800 100 650 246'
        }
      ]
    }
  },
  computed: {
    totalNumbers () {
      const total = Number(this.totalDataCount)
      let str = '00000000'
      if (Number.isInteger(total) && total >= 0) {
        if (String(total).length < 8) {
          str += total
          const arr = str
            .split('')
            .reverse()
            .slice(0, 8)
            .reverse()
            .map((item) => Number(item))
          return arr
        } else {
          str = String(total)
        }
      }
      return str.split('').map((item) => Number(item))
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
@import "./scss/_vars.scss";
@import "./scss/center.scss";
.zichanText {
  font-size: 20px;
//   font-weight: 700;
  fill:$number-color;
}
</style>
