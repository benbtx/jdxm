<template>
  <div class="bcgColor logConfig" id="logConfig">
    <el-tabs v-model="pageType" @tab-click="tagsClick">
      <el-tab-pane name="logConfig">
        <p slot="label" class="slot-tab-pane">日志配置</p>
        <log-config class="content-view"></log-config>
      </el-tab-pane>
            <!-- <el-tab-pane name="otherLogDir">
        <p slot="label" class="slot-tab-pane">三方日志目录</p>
        <other-log-dir></other-log-dir>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import logConfig from './child-page/log-config.vue'
// import otherLogDir from './child-page/other-log-dir.vue'
export default {
  components: {
    logConfig
  // otherLogDir
  },
  props: {},
  data () {
    return {
      pageType: 'logConfig'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    tagsClick () {}
  }
}
</script>
<style lang="scss" scoped>
.logConfig {
  height: 100%;
  position: relative;
  background: #FFF;
  .slot-tab-pane {
    padding: 0 14px;
    // transform: translateY(-10px);
  }
}
</style>
