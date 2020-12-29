<template>
  <div class="rightAside">
    <p class="title">数据源</p>
    <div class="summary">
      <div class="circle">
        <p class="amount">
          <span class="number">{{ count }}</span>
          <span class="text">种</span>
        </p>
        <p class="desc">数据源种类</p>
      </div>
    </div>
    <div class="linesContainer" id="linesContainer">
      <div class="lines" id="lines">
        <div
          class="line"
          :class="index % 2 === 0 ? 'single' : ''"
          v-for="(item, index) of list"
          :key="index"
        >
          <span class="text">{{ item.name }}</span>
          <span class="number">{{ addChineseUnit(item.count, 1) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    // count: {
    //   type: [Number, String],
    //   default: 0
    // },
    // list: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data () {
    return {
      timer: null,
      count: 7,
      list: [
        {
          name: '全省警员基本信息',
          count: 43256
        },
        {
          name: '全省强戒人员基本信息',
          count: 32154
        },
        {
          name: '组织机构表',
          count: 85
        },
        {
          name: '所基本信息',
          count: 17
        },
        {
          name: '接口目录表',
          count: 145
        },
        {
          name: '数据接口表',
          count: 456
        },
        {
          name: '附件接口表',
          count: 45
        }
      ]
    }
  },
  created () {},
  mounted () {
    this.startAnimate()
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(this.timer)
    })
  },
  methods: {
    /**
     * 通过动态获取容器及数据源容器的高度来动态呈现数据源的滚动
     * @param oldTranslateY 已经移动的距离
     */
    startAnimate (oldTranslateY = 0) {
      clearTimeout(this.timer)
      const boxHeight = document.getElementById('linesContainer').offsetHeight
      const lines = document.getElementById('lines')
      const linesHeight = lines.offsetHeight
      const moveDistance = linesHeight - boxHeight
      if (moveDistance <= 0) {
        // 容器足够装下元素时，不需要动画
        this.timer = setTimeout(() => {
          this.startAnimate()
        }, 2000)
      } else if (oldTranslateY >= moveDistance) {
        // 到达容器底部时回滚

        this.timer = setTimeout(() => {
          lines.style.transform = 'translateY(' + 0 + 'px)'
          this.startAnimate()
        }, 4000)
      } else {
        this.timer = setTimeout(() => {
          const translateDistance = oldTranslateY + 43 * 5
          lines.style.transform = 'translateY(-' + translateDistance + 'px)'
          this.startAnimate(translateDistance)
        }, 4000)
      }
    },
    /**
     * 为数字加上单位：万或亿
     *
     * 例如：
     * 1000.01 => 1000.01
     * 10000 => 1万
     * 99000 => 9.9万
     * 566000 => 56.6万
     * 5660000 => 566万
     * 44440000 => 4444万
     * 11111000 => 1111.1万
     * 444400000 => 4.44亿
     * 40000000,00000000,00000000 => 4000万亿亿
     * 4,00000000,00000000,00000000 => 4亿亿亿
     *
     * @param {number} number 输入数字.
     * @param {number} decimalDigit 小数点后最多位数，默认为2
     * @return {string} 加上单位后的数字
     */

    addWan: function (integer, number, mutiple, decimalDigit) {
      var me = this
      var digit = me.getDigit(integer)
      if (digit > 3) {
        var remainder = digit % 8
        if (remainder >= 5) {
          // ‘十万’、‘百万’、‘千万’显示为‘万’
          remainder = 4
        }
        return (
          Math.round(
            number / Math.pow(10, remainder + mutiple - decimalDigit)
          ) /
            Math.pow(10, decimalDigit) +
          '万'
        )
      } else {
        return (
          Math.round(number / Math.pow(10, mutiple - decimalDigit)) /
          Math.pow(10, decimalDigit)
        )
      }
    },
    getDigit: function (integer) {
      var digit = -1
      while (integer >= 1) {
        digit++
        integer = integer / 10
      }
      return digit
    },
    addChineseUnit: function (number, decimalDigit) {
      var me = this
      decimalDigit = decimalDigit == null ? 2 : decimalDigit
      var integer = Math.floor(number)
      var digit = me.getDigit(integer)
      // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
      var unit = []
      if (digit > 3) {
        var multiple = Math.floor(digit / 8)
        if (multiple >= 1) {
          var tmp = Math.round(integer / Math.pow(10, 8 * multiple))
          unit.push(me.addWan(tmp, number, 8 * multiple, decimalDigit))
          for (var i = 0; i < multiple; i++) {
            unit.push('亿')
          }
          return unit.join('')
        } else {
          return me.addWan(integer, number, 0, decimalDigit)
        }
      } else {
        return number
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./scss/right-aside.scss";
</style>
