<template>
  <div class="bcgColor syncMonitor" id="syncMonitor">
    <el-tabs v-model="pageType" @tab-click="tagsClick">
      <el-tab-pane name="node">
        <p slot="label" class="slot-tab-pane">节点监控</p>
        <node-monitor></node-monitor>
      </el-tab-pane>
      <el-tab-pane :lazy="true" name="relation">
        <p slot="label" class="slot-tab-pane">关系监控</p>
        <relation-monitor></relation-monitor>
      </el-tab-pane>
      <el-tab-pane :lazy="true" name="dataConflict">
        <p slot="label" class="slot-tab-pane">数据冲突监控</p>
        <data-conflict></data-conflict>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import nodeMonitor from './views/node-monitor.vue'
import relationMonitor from './views/relation-monitor.vue'
import dataConflict from './views/data-conflict.vue'
export default {
  components: { nodeMonitor, relationMonitor, dataConflict },
  props: {},
  data () {
    return {
      pageType: 'node'
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
.syncMonitor {
  height: 100%;
  position: relative;
  background: #fff;
  .slot-tab-pane {
    padding: 0 14px;
    // transform: translateY(-10px);
  }
}
</style>
