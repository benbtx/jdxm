<template>
  <el-scrollbar
    class="container-left"
    wrap-class="container-left-wrap"
    :class="{ 'slide-hide': isCollapse }"
  >
    <el-menu
      class="menu"
      :default-active="onRoutes"
      :collapse="isCollapse"
      style="border: none"
      text-color="rgb(241, 245, 233)"
      background-color="rgb(13, 78, 149)"
    >
      <template v-for="(item, index) in menus">
        <el-menu-item
          :key="index"
          :index="item.path"
          v-if="!item.children"
          @click="menuClick(item.path)"
        >
          <i class="iconfont icon-shuju1"></i>
          {{ item.name }}
        </el-menu-item>
        <el-submenu :index="index + '-' + 1" :key="index" v-else>
          <template slot="title">
            <i :icon="item.icon" style="margin-right: 5px"></i>
            <span>{{ item.name }}</span>
          </template>
          <div v-for="(it, ind) in item.children" :key="ind">
            <el-menu-item
              v-if="it.children.length == 0"
              :key="ind"
              :index="it.path"
              @click="menuClick(it.path)"
            >
              {{ it.name }}
            </el-menu-item>
            <el-submenu v-else :index="index + '-' + ind + 1">
              <template slot="title">{{ it.name }}</template>
              <el-menu-item
                v-for="(its, inde) in it.children"
                :key="inde"
                :index="its.path"
                @click="menuClick(its.path)"
                >{{ its.name }}</el-menu-item
              >
            </el-submenu>
          </div>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      isCollapse: false,
      menus: [
        {
          name: '资源管理',
          path: '/resourceManage',
          children: [
            {
              name: '资源概览',
              path: '/resourceManage/resourceOverview',
              children: []
            },
            {
              name: '资源管理',
              path: '/resourceManage/resourceManage',
              children: []
            }
          ]
        },
        // {
        //   name: '数据共享采集',
        //   path: '/dataSourceManage',
        //   children: [
        //     {
        //       name: '数据库数据源',
        //       path: '/dataSourceManage/dataSource',
        //       children: []
        //     },
        //     {
        //       name: '数据库采集任务',
        //       path: '/dataSourceManage/dataCollectionTask',
        //       children: []
        //     },
        //     {
        //       name: '文件采集任务',
        //       path: '/dataSourceManage/fileCollectTask',
        //       children: []
        //     }
        //   ]
        // },
        {
          name: '接口管理',
          path: '/dataSourceManage',
          children: [
            {
              name: '接口目录管理',
              path: '/interfaceManage/interfaceCatalogManage',
              children: []
            },
            {
              name: '数据接口管理',
              path: '/interfaceManage/InterfaceManage',
              children: []
            },
            {
              name: '附件接口管理',
              path: '/interfaceManage/enclosureInterfaceManage',
              children: []
            }
          ]
        },
        {
          name: '日志管理',
          path: '/dataSourceManage',
          children: [
            {
              name: '日志分析',
              path: '/logManage/analysisLog',
              children: []
            },
            {
              name: '资源管理',
              path: '/logManage/resourceManage',
              children: []
            },
            {
              name: '日志配置',
              path: '/logManage/logConfig',
              children: []
            }
          ]
        },
        {
          name: '报表管理',
          path: '/dataSourceManage',
          children: [
            {
              name: '报表设计',
              path: '/reportManage/reportDesign',
              children: []
            },
            {
              name: '报表管理',
              path: '/reportManage/reportConfig',
              children: []
            },
            {
              name: '报表查看',
              path: '/reportManage/reportSearch',
              children: []
            }
          ]
        },
        {
          path: '/dataSync/strategy',
          name: '数据同步',
          children: [
            {
              path: '/dataSync/strategy',
              name: '同步策略',
              children: []
            },
            {
              path: '/dataSync/monitor',
              name: '同步监控',
              children: []
            },
            {
              path: '/dataSync/dispatch',
              name: '同步调度',
              children: []
            }
          ]
        },
        {
          path: '/sjdp',
          name: '数据大屏'
          // children: []
        },
        {
          path: '/bigDataScreen',
          name: '数据大屏-iframe'
          // children: []
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    menuClick (path) {
      if (path !== this.$route.path) {
        this.$router.push({
          path: path,
          query: this.$route.query,
          params: this.$route.params
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/basic-color.scss";

.collapse {
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  line-height: 50px;
  background-color: $menu-title-hover;
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0px;
  color: #bfcbd9;
  &:hover {
    color: #fff;
  }
}
/deep/ .el-submenu__title {
  background: rgb(37, 100, 172) !important;
}
.el-menu-item.is-active,
.el-menu-item:hover {
  color: rgb(241, 245, 233) !important;
  background: rgb(0, 124, 255) !important;
}
.el-header {
  /*background-color: #eef1f6;*/
  color: #333;
  padding: 0 10px;
}

.el-aside {
  color: #333;
}
.main {
  height: 100%;
}
.el-main {
  position: relative;
  background-color: $content-background-color;
}
.main-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  z-index: 100;
  background-color: #000;
  opacity: 0.3;
}

.move-enter-active,
.move-leave-active {
  transition: opacity 0.5s;
}

.move-enter,
.move-leave {
  opacity: 0;
}

.wrapper {
  height: 100%;
  overflow-y: hidden;
  background-color: #f5f7f9;
}

.container-box {
  height: 100%;
  transition: -webkit-transform 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
  overflow-y: auto;
}

.container-left {
  background-color: rgb(15, 89, 160);
  transition: left 0.23s ease-in-out;
  height: 100%;
  flex: 0 0 auto;
}
.container-left-wrap {
  overflow-x: hidden !important;
}

.container-left .svg-icon {
  font-size: 20px;
  margin-right: 5px;
}

.container-left:not(.slide-hide) {
  width: 200px;
}

.container-left.slide-hide {
  .logo img {
    display: none;
  }
  .logo span {
    display: inline-block;
  }
}

.menu {
  width: 100% !important;
  margin-bottom: 50px !important;
}

/*.menu::-webkit-scrollbar{*/
/*display: none;*/
/*}*/

.header {
  position: relative;
  text-align: left;
  font-size: 18px;
  line-height: $header-height;
  border-bottom: 1px solid #d8dce5;
  background-color: #fff;
  color: #0c1231;
  font-weight: 500;
}

.logo {
  display: block;
  width: 100%;
  line-height: 80px;
  text-align: center;
  color: #fff;
  transition: display 0.7s ease-in-out;
  img {
    vertical-align: middle;
  }
  span {
    display: none;
  }
}

.header-left {
  display: inline-block;
  height: $header-height;
  overflow: hidden;
}

.header-tabs-box {
  display: inline-block;
  height: $header-height;
  max-width: 60%;
  overflow: hidden;
}

.header-right {
  display: flex;
  width: 80px;
  height: 100%;
  margin-left: 10px;
  float: right;
  .el-dropdown {
    display: flex;
    cursor: pointer;
  }
  span {
    display: inline-block;
    @include text-overflow;
  }
  i {
    line-height: $header-height;
    margin-top: 2px;
  }
}

.app-levelbar {
  margin-left: 20px;
  line-height: 57px !important;
}

/*宽屏时出现*/
.slide-toggle {
  display: inline-block;
  height: $header-height;
  line-height: $header-height;
  text-align: center;
  cursor: pointer;
}

.slide-toggle span {
  display: inline-block;
  width: 2px;
  height: 12px;
  background-color: rgba(135, 141, 153, 0.8);
  margin-left: 5px;
}
.slide-toggle-open span {
  display: block;
  margin-left: 4px;
  margin-top: 4px;
  width: 16px;
  height: 2px;
}
.slide-toggle-open {
  padding-top: 17px;
}

@media screen and (min-width: 768px) {
  .main-mask {
    display: none;
  }
}

/*.slide-hide {*/
/*width: 64px !important;*/
/*}*/

@media screen and (max-width: 768px) {
  .main {
    overflow-y: scroll !important;
    -webkit-overflow-scrolling: touch;
  }

  .slide-hide.slide-in-left {
    -webkit-transform: translate3d(64px, 0, 0) !important;
    transform: translate3d(64px, 0, 0) !important;
  }
  .container-left.slide-hide.slide-in-left {
    left: -64px;
    width: 64px;
  }
  .container-left.slide-in-left {
    left: 0;
  }
  .container-left {
    margin-right: 0;
    opacity: 1;
    position: absolute !important;
    top: 0;
    left: -225px;
    z-index: 10;
    padding: 0;
  }

  .container-box.slide-in-left {
    min-width: 0;
    opacity: 1;
    -webkit-transform: translate3d(187px, 0, 0);
    transform: translate3d(187px, 0, 0);
    overflow: initial;
  }
  .header-toggle {
    display: block;
    /*background-color: #26a2ff;*/
    border-radius: 4px;
    /*border: 1px solid #fff;*/
    height: 40px;
    margin: 10px 0;
    padding: 2px 6px;
    outline: none;
    width: 40px;
    z-index: 10;
  }

  .header-toggle span {
    display: block;
    width: 100%;
    height: 4px;
    margin: 5px auto;
    background-color: rgba(135, 141, 153, 0.8);
  }

  .logo {
    display: none;
  }
  .slide-toggle {
    display: none;
  }
}
</style>
