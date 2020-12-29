<template>
  <div class="bigDataScreen">
         <iframe :src="iframeHref" style="height:100%;width: 100%;border: 0;"></iframe>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      iframeHref: 'http://30.29.2.6:7001/'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.bigDataScreen{
  height: 100%;
}
</style>
