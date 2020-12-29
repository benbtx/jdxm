import Vue from 'vue'
import VueRouter from 'vue-router'
import routerView from '@/views/redirect-router-view'

Vue.use(VueRouter)
const routes = [
  {
    path: '/resourceManage',
    redirect: '/resourceManage/resourceOverview',
    component: routerView,
    children: (log => [
      {
        path: 'resourceOverview',
        name: `${log}resourceOverview`,
        chText: '资源概览',
        component: () => import(/* webpackChunkName: "resourceOverview" */ '../views/resourceManage/resourceOverview/index.vue')
      },
      {
        path: 'resourceManage',
        name: `${log}resourceManage`,
        chText: '资源管理',
        component: () => import(/* webpackChunkName: "resourceManage" */ '../views/resourceManage/resourceManage/index.vue')
      }
    ])('resourceOverview_')
  },
  {
    path: '/dataSourceManage',
    redirect: '/dataSourceManage/dataSource',
    component: routerView,
    children: (log => [
      {
        path: 'dataSource',
        name: `${log}dataSource`,
        chText: '数据库数据源',
        component: () => import(/* webpackChunkName: "dataSource" */ '../views/dataShareCollection/dataSource/index.vue')
      },
      {
        path: 'dataCollectionTask',
        name: `${log}dataCollectionTask`,
        chText: '数据采集任务',
        component: () => import(/* webpackChunkName: "dataCollectionTask" */ '../views/dataShareCollection/dataCollectionTask/index.vue')
      },
      {
        path: 'fileCollectTask',
        name: `${log}fileCollectTask`,
        chText: '文件采集任务',
        component: () => import(/* webpackChunkName: "dataSource" */ '../views/dataShareCollection/fileCollectTask/index.vue')
      }
    ])('dataSourceManage_')
  },
  {
    path: '/interfaceManage',
    redirect: '/interfaceManage/interfaceCatalogManage',
    component: routerView,
    children: (log => [
      {
        path: 'interfaceCatalogManage',
        name: `${log}interfaceCatalogManage`,
        chText: '接口目录管理',
        component: () => import(/* webpackChunkName: "InterfaceCatalogManage" */ '../views/InterfaceManage/InterfaceCatalogManage/index.vue')
      },
      {
        path: 'InterfaceManage',
        name: `${log}InterfaceManage`,
        chText: '接口管理',
        component: () => import(/* webpackChunkName: "InterfaceManage" */ '../views/InterfaceManage/InterfaceManage/index.vue')
      },
      {
        path: 'enclosureInterfaceManage',
        name: `${log}enclosureInterfaceManage`,
        chText: '附件接口管理',
        component: () => import(/* webpackChunkName: "enclosureInterfaceManage" */ '../views/InterfaceManage/enclosureInterfaceManage/index.vue')
      }
    ])('interfaceManage_')
  },
  {
    path: '/logManage',
    redirect: '/logManage/analysisLog',
    component: routerView,
    children: (log => [
      {
        path: 'analysisLog',
        name: `${log}logAnalysis`,
        chText: '日志分析',
        component: () => import(/* webpackChunkName: "logAnalysis" */ '@/views/logManage/logAnalysis')
      },
      {
        path: 'logConfig',
        name: `${log}logConfig`,
        chText: '日志配置',
        component: () => import(/* webpackChunkName: "logConfig" */'@/views/logManage/logConfig')
      },
      {
        path: 'resourceManage',
        name: `${log}resourceManage`,
        chText: '资源管理',
        component: () => import(/* webpackChunkName: "resourceManage" */'@/views/logManage/resourceManage')
      }
    ])('logManage_')
  },
  {
    path: '/reportManage',
    redirect: '/reportManage/reportDesign',
    component: routerView,
    children: (report => [
      {
        path: 'reportDesign',
        name: `${report}reportDesign`,
        chText: '报表设计',
        component: () => import(/* webpackChunkName: "reportDesign" */ '../views/reportManage/reportDesign/index.vue')
      },
      {
        path: 'reportConfig',
        name: `${report}reportConfig`,
        chText: '报表管理',
        component: () => import(/* webpackChunkName: "reportConfig" */'../views/reportManage/reportConfig/index.vue')
      },
      {
        path: 'reportSearch',
        name: `${report}reportSearch`,
        chText: '报表查看',
        component: () => import(/* webpackChunkName: "reportSearch" */'../views/reportManage/reportSearch/index.vue')
      }
      // {
      //   path: 'reportPreview',
      //   name: `${report}reportPreview`,
      //   chText: '报表预览',
      //   component: () => import(/* webpackChunkName: "reportPreview" */ '../views/reportManage/reportPreview/index.vue')
      // }
    ])('reportManage_')
  },
  {
    path: '/dataSync',
    redirect: '/dataSync/strategy',
    component: routerView,
    children: (first => [
      {
        path: 'strategy',
        name: `${first}strategy`,
        chText: '同步策略',
        component: () => import(/* webpackChunkName: "dataSync-strategy" */ '@/views/dataSync/syncStrategy/index.vue')
      },
      {
        path: 'monitor',
        name: `${first}monitor`,
        chText: '同步监控',
        component: () => import(/* webpackChunkName: "dataSync-monitor" */'@/views/dataSync/syncMonitor/index.vue')
      },
      {
        path: 'dispatch',
        name: `${first}dispatch`,
        chText: '同步调度',
        component: () => import(/* webpackChunkName: "dataSync-dispatch" */'@/views/dataSync/syncDispatch/index.vue')
      }
    ])('dataSync_')
  },
  {
    path: '/sjdp',
    name: 'sjdp',
    redirect: '/sjdp/index',
    component: routerView,
    children: [{
      path: 'index',
      name: 'sjdp_index',
      component: () => import(/* webpackChunkName: "bigdata-screen" */'@/views/sjdp/index.vue')
    }]

  },
  {
    path: '/bigDataScreen',
    name: 'bigDataScreen',
    component: () => import(/* webpackChunkName: "bigdata-screen" */'@/views/bigData/index.vue')
  }
  // {
  //   path: '*',
  //   redirect: '/resourceManage'
  // }
]

const router = new VueRouter({
  routes
})

export default router
