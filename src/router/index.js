import Vue from 'vue'
import Router from 'vue-router'

import lazyload from '../helpers/lazyload'
import http from 'xd-http'
import config from '@/config.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: `${config.base}`,
  routes: [
     {
      path: '/board/:bId', // 看板编辑页
      name: 'board',
      component: lazyload('Board')
    },
    {
      path: '/module/:bId', // 模块页
      name: 'module',
      component: lazyload('Module')
    },
    {
      path: '/preview/:bId', // 用户预览页（无顶部操作按钮，有定时任务）
      name: 'preview',
      component: lazyload('Preview')
    },
    {
      path: '/developerPreview/:bId', // 编辑者预览页（有顶部操作按钮，有定时任务）
      name: 'developerPreview',
      component: lazyload('DeveloperPreview')
    },
    {
      path: '/',
      name: 'home',
      component: lazyload('Home'),
      redirect: '/directory',
      children: [
        {
          path: '/dashboard', // 看板列表页
          name: 'dashboard',
          component: lazyload('Dashboard')
        },
        {
          path: '/directory',
          name: 'directory',
          component: lazyload('Directory')
        },
        {
          path: '/dataSource',
          name: 'dataSource',
          component: lazyload('DataSource')
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  http.clearHttpRequestList()
  next()
})

export default router
