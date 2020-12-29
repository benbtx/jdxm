<template>
  <div class="bcgColor resourceManage">
    <info-card v-for="(row, index) of rows" :key="index" :row="row"></info-card>
    <kr-no-data v-if="!rows.length"></kr-no-data>
  </div>
</template>

<script>
import infoCard from './components/info-card.vue'
import { fetchResourceList } from '@/projectModule/api/logManage/index.js'
export default {
  components: {
    infoCard
  },
  props: {},
  data () {
    return {
      rows: [],
      total: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      const type2Chn = {
        operation: '操作日志', command: '信令日志', interface: '接口日志', other: '其他日志', system: '系统日志', external: '三方日志'
      }
      const result = await fetchResourceList()
      const { code, data: { rows = [] }, data: { total = 0 } } = result
      if (code === 0) {
        const resourceList = rows.map(row => {
          const {
            diskAvail, /** 可用空间 */
            // diskIndices, /** 节点使用磁盘空间 */
            diskPercent, /** 磁盘使用占比 */
            diskTotal, /** 磁盘空间 */
            // diskUsed, /** 已用空间 **/
            // host,
            // ip,
            node: title = '', /** 节点名 */
            // shards, /** 分区 */
            indicesVOS = []
          } = row
          const pieData = indicesVOS.map(log => {
            // type 文档类型
            //  status health 保留字段
            //  index 索引名称
            // docs 文档数量
            //  store 占用空间
            // percent 占用节点空间百分比

            const name = type2Chn[log.type]
            const value = log.store
            return { name, value }
          })
          return {
            pieData,
            diskAvail,
            diskTotal,
            diskPercent,
            title
          }
        })
        this.rows = resourceList
        this.total = total
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.resourceManage {
}
</style>
