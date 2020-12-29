<template>
    <div class="leftAside">
        <p class="title">数据资源</p>
        <div class="summary">
            <div class="circle">
                <p class="amount">
                    <span class="number">{{ count }}</span>
                    <span class="text">类</span>
                </p>
                <p class="desc">数据资源类别</p>
            </div>
        </div>
        <div class="detail" id="detail">
            <div class="cards" id="cards">
                <div
                    class="card"
                    :class="index % 2 === 0 ? 'single' : ''"
                    v-for="(item, index) of list"
                    :key="index"
                >
                    <p class="amount">
                        <span class="number">{{ item.count | fixedNum }}</span>
                        <span class="text">万</span>
                    </p>
                    <p class="desc">{{ item.name }}</p>
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
  filters: {
    fixedNum (val) {
      let num = val / 10000
      num = num < 1 ? num.toFixed(3) : num.toFixed(1)
      return num
    }
  },
  data () {
    return {
      count: 7,
      list: [
        {
          count: 42315,
          name: '警员值班信息'
        },
        {
          count: 65412,
          name: '强戒人员位置信息'
        },
        {
          count: 2301,
          name: '各所预警信息'
        },
        {
          count: 218455,
          name: '安防设备信息'
        },
        {
          count: 492315,
          name: '日志信息'
        },
        {
          count: 392315,
          name: '电子巡更信息'
        },
        {
          count: 785464,
          name: '信令'
        }
      ],
      timer: null
    }
  },
  computed: {},
  watch: {},
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
      const boxHeight = document.getElementById('detail').offsetHeight
      const cards = document.getElementById('cards')
      const cardsHeight = cards.offsetHeight
      const moveDistance = cardsHeight - boxHeight

      if (moveDistance <= 0) {
        // 容器足够装下元素时，不需要动画
        this.timer = setTimeout(() => {
          this.startAnimate()
        }, 3000)
      } else if (oldTranslateY >= moveDistance) {
        // 到达容器底部时回滚

        this.timer = setTimeout(() => {
          cards.style.transform = 'translateY(' + 0 + 'px)'
          this.startAnimate()
        }, 3000)
      } else {
        this.timer = setTimeout(() => {
          const translateDistance = oldTranslateY + 132
          cards.style.transform =
                        'translateY(-' + translateDistance + 'px)'
          this.startAnimate(translateDistance)
        }, 3000)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./scss/left-aside.scss";
</style>
