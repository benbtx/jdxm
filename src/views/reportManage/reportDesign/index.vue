<template>
  <div class="bcgColor wrapper">
    <!-- <report-config></report-config> -->
     <iframe :src="reportDesignUrl" style="height:100%;width: 100%;border: 0;">
          IE：你们都看我干吗，我现在也是支持的
      </iframe>
  </div>
</template>

<script>
import { getReportServerAddress } from '@/projectModule/api/reportManage/reportManage.js'
export default {
  // components: { reportConfig },
  props: {},
  data () {
    return {
      reportDesignUrl:''
    }
  },
  computed: {},
  watch: {},
  created () {
    // this.$route.params.token
    // //方法一  传id name ,考虑安全可自行加密解密
    // const id = localStorage.getItem('id') || '04c46b4d1089481bba75e8507f2ccce5'
    // const name = localStorage.getItem('name') || 'admin'
    // const cs = 'id=' + id + '&name=' + name
    // const encodeData = window.btoa(cs)// 编码aWQ9MjIyJm5hbWU9Y3My
    // const token = encodeData.slice(0, 5) + 'Mk4' + encodeData.slice(5)
    // this.reportDesignUrl = 'http://192.168.7.233:8848//?#/login?token=' + token || this.$route.params.token

    // // 方法二 直接传token
    // const token = localStorage.getItem('token') || '123456'
    // this.reportDesignUrl = 'http://192.168.7.233:8848//?#/login?token=' + token
    // this.reportDesignUrl = reportURL+'//?#/login?token=' + token
    this.getAddress();

  },
  mounted () {},
  methods: {
    
    getAddress() {
      var _this=this;
      const data = {}
      const token = localStorage.getItem('token') || '123456'
      getReportServerAddress(data).then(data => {
        if (data.success) {
          _this.reportDesignUrl =  data.data+'//?#/login?token=' + token

        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>
