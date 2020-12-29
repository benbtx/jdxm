<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
<menu-nav></menu-nav>
      </el-aside>
      <el-main> <router-view class="main"/></el-main>
    </el-container>
  </div>
</template>
<script>
import menuNav from './menu-nav.vue'
export default {
  components: {
    menuNav
  }
}
</script>
<style lang="scss">
#app {
  height: 100%;
  margin: 0;
  background-color: #F9F9FB;
  .el-container{
    height: 100%;
  }
}
</style>
