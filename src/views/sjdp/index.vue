<template>
    <div class="sjdp" id="sjdp">
        <div class="header">
            <p class="headerTitle">
                大数据资源信息统计
            </p>
            <img
                class="titleBorder"
                src="./images/title-border.png"
                alt=""
            />
            <div class="text">
                <p>
                    <!-- 当前统计：**市 -->
                </p>
                <p class="right">
                    <i class="el-icon-time" style="margin-right:8px"></i>
                    <span style="margin-right:76px">{{ nowTime }}</span>
                    <img
                        @click="fullscreen()"
                        src="./images/close.png"
                        style="width:30px;cursor:pointer"
                        alt=""
                    />
                </p>
            </div>
        </div>
        <div class="big_screen_main">
            <left-aside
                class="aside"
                :count="dataRelations.count"
                :list="dataRelations.list"
            ></left-aside>
            <center-frame
                :totalDataCount="totalDataCount"
                class="centerFrame"
            ></center-frame>
            <right-aside
                class="aside"
                :count="dataSource.count"
                :list="dataSource.list"
            ></right-aside>
        </div>
    </div>
</template>

<script>
// import { fetchDataRelation, fetchDataSource } from '@/api/shujuDP/index.js'
const fetchDataRelation = () => { return {} } // 接口
const fetchDataSource = () => { return {} } // 接口
const leftAside = () => import(/* webpackChunkName: "sjdp" */ './left-aside.vue')
const centerFrame = () => import(/* webpackChunkName: "sjdp" */ './center.vue')
const rightAside = () => import(/* webpackChunkName: "sjdp" */ './right-aside.vue')
export default {
  components: {
    leftAside,
    centerFrame,
    rightAside
  },
  props: {},
  data () {
    return {
      dataRelations: {
        count: 0,
        list: []
      },
      dataSource: {
        count: 0,
        list: []
      },
      totalDataCount: 0,
      nowTime: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.getDataRelation()
    this.getDataSource()
    const timer = setInterval(() => {
      this.getDataRelation()
      this.getDataSource()
    }, 3000)
    this.nowTime = this.$dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    const timerNowTime = setInterval(() => {
      this.nowTime = this.$dayjs(new Date()).format(
        'YYYY-MM-DD HH:mm:ss'
      )
    }, 1000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
      clearInterval(timerNowTime)
    })
  },
  methods: {
    fullscreen (div) {
      div = div || document.getElementById('sjdp')
      const fullEle =
                document.fullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement ||
                document.webkitFullscreenElement
      if (fullEle) {
        // 退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        // 进入全屏
        if (div.requestFullscreen) {
          div.requestFullscreen()
        } else if (div.webkitRequestFullScreen) {
          console.log(div)
          div.webkitRequestFullScreen()
        } else if (div.mozRequestFullScreen) {
          div.mozRequestFullScreen()
        } else if (div.msRequestFullscreen) {
          div.msRequestFullscreen()
        }
      }
    },
    async getDataRelation () {
      const result = await fetchDataRelation()
      if (result.code === 0) {
        const {
          dataRelationDetailList: list = [],
          dataRelationTypeCount: count = 0
        } = result.data || {}
        this.dataRelations = { list, count }
      }
    },
    async getDataSource () {
      const result = await fetchDataSource()
      if (result.code === 0) {
        const {
          dataSourceCount: count = 0,
          dataSourceDetailList: list = [],
          totalDataCount = 0
        } = result.data || {}
        this.dataSource = { list, count }
        this.totalDataCount = totalDataCount
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sjdp {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    // background: #0e1f42;
    background-image: url(./images/bg.png);
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
}
.header {
    position: relative;
    width: 100%;
    height: 94px;
    overflow: hidden;
    color: #7dc9ff;
    .titleBorder {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    .headerTitle {
        height: 100%;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        letter-spacing: 3px;
    }
    .text {
        position: absolute;
        top: 0;
        left: 0;
        height: 50%;
        width: 100%;
        padding: 0 34px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .right {
        display: flex;
        align-items: center;
        padding-right:70px;
    }
}
.big_screen_main {
    width: 100%;
    height: calc(100% - 94px);
    padding: 0 33px 33px 40px;
    box-sizing: border-box;
    display: flex;
    .centerFrame {
        flex: 1;
    }
    .aside {
        width: 300px;
    }
}
</style>
