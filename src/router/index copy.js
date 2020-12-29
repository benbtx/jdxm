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
      },
      {
        path: 'reportPreview',
        name: `${report}reportPreview`,
        chText: '报表预览',
        component: () => import(/* webpackChunkName: "reportPreview" */ '../views/reportManage/reportPreview/index.vue')
      }
    ])('reportManage_')
  },
  // {
  //   path: '/reportManage/reportDesign',
  //   name: 'reportDesign',
  //   chText: '报表设计',
  //   component: () => import('../views/reportManage/reportDesign/index.vue')
  // },
  // {
  //   path: '/reportManage/reportConfig',
  //   name: 'reportConfig',
  //   chText: '报表管理',
  //   component: () => import('../views/reportManage/reportConfig/index.vue')
  // },
  // {
  //   path: '/reportManage/reportSearch',
  //   name: 'reportSearch',
  //   chText: '报表查看',
  //   component: () => import('../views/reportManage/reportSearch/index.vue')
  // }
  // {
  //   path: '*',
  //   redirect: '/resourceManage'
  // }
]

const router = new VueRouter({
  routes
})

export default router
