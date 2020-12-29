<template>
  <div class="bcgColor wrapper">
    <report-config></report-config>
  </div>
</template>

<script>
import reportConfig from './child-pages/report-config.vue'
export default {
  components: { reportConfig },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
