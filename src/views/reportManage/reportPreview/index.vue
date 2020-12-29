<template>
  <div class="wrapper">
     <buttons-bar :buttons="buttons"></buttons-bar>
    <!-- <report-config></report-config> -->
     <iframe :src="reportPreviewUrl" style="height:calc(100% - 60px);;width: 100%;border: 0;">
          IE：你们都看我干吗，我现在也是支持的
      </iframe>
  </div>
</template>

<script>
// import reportConfig from './child-pages/report-config.vue'
import buttonsBar from './buttons-bar.vue'
export default {
  components: { buttonsBar },
  
  props: {},
  data () {
    return {}
  },
   computed: {
    buttons () {
      const _this = this
    
      return [
        {
          permission: 'reportmanage:config:auth',
          type: 'primary',
          plain: false,
          text: '返回',
          icon: 'el-icon-arrow-left',
          fn: () => {
            // console.log('click------>')
            console.log(this)
            _this.$router.back(-1)
          }
        },
        
      ]
    }
  },
  watch: {},
  created () {
    console.log(1,this.$route)
    this.reportPreviewUrl=this.$route.params.url
  },
  mounted () {},
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>
