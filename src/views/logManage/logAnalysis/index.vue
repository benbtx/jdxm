<template>
  <div class="bcgColor analysis-log" id="analysisLog">
    <el-tabs v-model="activeLogType" @tab-click="tagsClick">
      <el-tab-pane name="operateLog"
        >
        <p slot="label" class="slot-tab-pane">操作日志</p>
        <operate-log ></operate-log
      ></el-tab-pane>
      <el-tab-pane name="messageLog" :lazy="true">
        <p slot="label" class="slot-tab-pane">信令日志</p>
        <message-log></message-log>
      </el-tab-pane>
      <el-tab-pane name="interfaceLog" :lazy="true">
        <p slot="label" class="slot-tab-pane">接口日志</p>
        <interface-log></interface-log>
      </el-tab-pane>
      <!--<el-tab-pane name="customLog" :lazy="true">-->
        <!--<p slot="label" class="slot-tab-pane">三方日志</p>-->
        <!--<custom-log></custom-log>-->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane name="systemLog" :lazy="true">-->
        <!--<p slot="label" class="slot-tab-pane">系统日志</p>-->
        <!--<system-log></system-log>-->
      <!--</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
import operateLog from './child-pages/operator-log.vue'
import messageLog from './child-pages/message-log.vue'
import interfaceLog from './child-pages/interface-log.vue'
import customLog from './child-pages/custom-log.vue'
import systemLog from './child-pages/system-log.vue'
export default {
  components: { operateLog, messageLog, interfaceLog, customLog, systemLog },
  props: {},
  data () {
    return {
      activeLogType: 'operateLog'
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
.analysis-log {
  height: 100%;
  position: relative;
  .slot-tab-pane{
    padding: 0 14px;
    // transform: translateY(-10px);
  }
}
</style>
