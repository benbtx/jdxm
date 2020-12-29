import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/projectModule/element'
// 统一到 '@/projectModule/element'里取注册项目依赖文件
// import '@/projectModule/assets/css/main.scss'
// import '@/projectModule/assets/css/rewrite-element.scss'
// import '@/projectModule/assets/icon/iconfont.css'
// import ECharts from 'vue-echarts/components/ECharts.vue'
// import 'echarts'
// import dayjs from 'dayjs'

Vue.config.productionTip = false
// Vue.prototype.$dayjs = dayjs
// Vue.component('vue-charts', ECharts)
// 鉴权
const permission = function () {

}
permission.check = function (permissionId) {
  // permissionId 建议结构为按照模块功能进行分级，例如 sys:user:add、sys:role:edit
  if (permissionId === 'sys:xxx:nopermission') { return false }
  return true
}
window.permission = permission
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
