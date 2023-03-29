import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/indexForCustomer',
    component: () => import('@/views/forCustomer/index'),
    hidden: true
  },
  {
    path: '/contentForCustomer',
    component: () => import('@/views/forCustomer/essay'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Home', icon: 'us' }
    }]
  },

  {
    path: '/wordHelper',
    component: Layout,
    redirect: '/wordHelper/wordList',
    name: 'WordHelper',
    meta: { title: 'WordHelper', icon: 'form' },
    children: [
      {
        path: 'wordList',
        name: 'WordList',
        component: () => import('@/views/wordHelper/wordList'),
        meta: { title: 'WordList', icon: 'form' }
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/wordHelper/setting'),
        meta: { title: 'setting', icon: 'tree' }
      },
      {
        path: 'wordEdit',
        name: 'wordEdit',
        component: () => import('@/views/wordHelper/wordEdit')
      },
      {
        path: 'review',
        name: 'review',
        component: () => import('@/views/wordHelper/review'),
        meta: { title: 'review', icon: 'review' }
      }
    ]

  },
  {
    path: '/essay',
    component: Layout,
    redirect: '/essay/essayCatalog',
    name: 'essay',
    meta: { title: 'essay', icon: 'essay' },
    children: [
      {
        path: 'essayCatalog',
        name: 'essayCatalog',
        component: () => import('@/views/essay/essayCatalog'),
        meta: { title: 'Catalog', icon: 'tree' }
      },
      {
        path: 'essayContent',
        name: 'essayContent',
        component: () => import('@/views/essay/essayContent'),
      },
      {
        path: 'essayEdit',
        name: 'essayEdit',
        component: () => import('@/views/essay/essayEdit'),
        meta: { title: 'Edit', icon: 'tree' }
      },
      {
        path: 'essayCatalogEdit',
        name: 'essayCatalogEdit',
        component: () => import('@/views/essay/essayCatalogEdit'),
      }
    ]

  },
  {
    path: '/status',
    component: Layout,
    redirect: '/status/statusIndex',
    name: 'status',
    meta: { title: 'status', icon: 'form' },
    children: [
      {
        path: 'statusIndex',
        name: 'statusIndex',
        component: () => import('@/views/status/statusIndex'),
        meta: { title: 'Index', icon: 'form' }
      },
      {
        path: 'groupEdit',
        name: 'groupEdit',
        component: () => import('@/views/status/groupEdit'),
        meta: { title: 'Manager', icon: 'tree' }
      }
    ]

  },
  {
    path: '/music',
    component: Layout,
    redirect: '/music/musicContainer',
    name: 'music',
    meta: { title: 'music', icon: 'form' },
    children: [
      {
        path: 'musicIndex',
        name: 'musicIndex',
        component: () => import('@/views/music/musicIndex'),
        meta: { title: 'index', icon: 'tree' }
      },
      {
        path: 'musicContainer',
        name: 'musicContainer',
        component: () => import('@/views/music/musicContainer'),
        meta: { title: 'player', icon: 'form' }
      },
      {
        path: 'personal',
        name: 'personal',
        component: () => import('@/views/music/personal'),
        meta: { title: 'personal', icon: 'tree' }
      },
      {
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/music/manage'),
        meta: { title: 'manage', icon: 'tree' }
      }
    ]

  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
