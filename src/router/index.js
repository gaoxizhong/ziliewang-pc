import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import talentSide from '../views/talentSide/Main.vue';


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
    icon: 'svg-name'             the icon show in the sidebar
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
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/bossSide/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' },
      },
    ]
  },
  {
    path: '/jobCenter',
    component: Layout,
    redirect: '/jobCenter',
    children: [
      {
        path: '/jobCenter',
        name: 'JobCenter',
        component: () => import('@/views/bossSide/jobCenter/index'),
        meta: { title: '职位中心', icon: 'dashboard' },
      },
    ]
  },
  {
    path: '/recommendTalents',
    component: Layout,
    redirect: '/recommendTalents',
    children: [
      {
        path: '/recommendTalents',
        name: 'RecommendTalents',
        component: () => import('@/views/bossSide/recommendTalents/index'),
        meta: { title: '推荐人才', icon: 'dashboard' },
      },
    ]
  },
  {
    path: '/searchTalent',
    component: Layout,
    redirect: '/searchTalent',
    children: [
      {
        path: '/searchTalent',
        name: 'SearchTalent',
        component: () => import('@/views/bossSide/searchTalent/index'),
        meta: { title: '搜索人才', icon: 'dashboard' },
      },
    ]
  },
  {
    path: '/interaction',
    component: Layout,
    redirect: '/interaction',
    children: [
      {
        path: '/interaction',
        name: 'Interaction',
        component: () => import('@/views/bossSide/interaction/index'),
        meta: { title: '互动', icon: 'dashboard' },
      },
    ]
  },
  {
    path: '/talentManagement',
    component: Layout,
    redirect: '/talentManagement',
    children: [
      {
        path: '/talentManagement',
        name: 'TalentManagement',
        component: () => import('@/views/bossSide/talentManagement/index'),
        meta: { title: '人才管理', icon: 'dashboard' },
      },
    ]
  },
  {
    path: '/myRecruitmentData',
    component: Layout,
    redirect: '/myRecruitmentData',
    children: [
      {
        path: '/myRecruitmentData',
        name: 'MyRecruitmentData',
        component: () => import('@/views/bossSide/myRecruitmentData/index'),
        meta: { title: '我的招聘数据', icon: 'dashboard' },
      },
    ]
  },
  {
    path: '/myInterviewSchedule',
    component: Layout,
    redirect: '/myInterviewSchedule',
    children: [
      {
        path: '/myInterviewSchedule',
        name: 'MyInterviewSchedule',
        component: () => import('@/views/bossSide/myInterviewSchedule/index'),
        meta: { title: '我的面试安排', icon: 'dashboard' },
      },
    ]
  },
  {
    path:'/postJob',
    component: Layout,
    redirect: '/postJob',
    hidden: true,
    children: [
      {
        path: '/postJob',
        name: 'PostJob',
        component: () => import('@/views/bossSide/postJob/index'),
        meta: { title: '发布职位' },
      },
    ]
  },
  // 人才端
  {
    path: "/talentSide",
    component: talentSide,
    redirect: '/talentHome',
    meta: { title: '人才端', icon: 'dashboard' },
    hidden: true,
    children: [
      {
        path: '/talentHome',
        name: 'talentHome',
        component: () => import('@/views/talentSide/talentHome'),
        meta: { 
          title: '首页',
          keepAlive: true,
        },
      },
      {
        path: '/position',
        name: 'position',
        component: () => import('@/views/talentSide/position'),
        meta: { 
          title: '职位',
          keepAlive: true,
        },
      },
      {
        path: '/myResume',
        name: 'myResume',
        component: () => import('@/views/talentSide/myResume'),
        meta: { 
          title: '我的简历',
          keepAlive: true,
        },
      },
      {
        path: '/myDelivery',
        name: 'myDelivery',
        component: () => import('@/views/talentSide/myDelivery'),
        meta: { 
          title: '我的投递',
          keepAlive: true,
        },
      },
      {
        path: '/myProfessionalCircle',
        name: 'myProfessionalCircle',
        component: () => import('@/views/talentSide/myProfessionalCircle/index.vue'),
        meta: { 
          title: '我的职圈',
          // keepAlive: true,
        },
      },
      {
        path: '/talentSideSettings',
        name: 'talentSideSettings',
        component: () => import('@/views/talentSide/talentSideSettings'),
        meta: { 
          title: '设置',
          keepAlive: true,
        },
      },
      {
        path: '/professionalCircle',
        name: 'professionalCircle',
        component: () => import('@/views/talentSide/professionalCircle'),
        meta: { 
          title: '职圈',
          keepAlive: true,
        },
      },
      {
        path: '/circleCentre',
        name: 'circleCentre',
        component: () => import('@/views/talentSide/professionalCircle/circleCentre'),
        meta: { 
          title: '个人职圈',
          keepAlive: true,
        },
      },
      {
        path: '/circleDetails',
        name: 'circleDetails',
        component: () => import('@/views/talentSide/professionalCircle/circleDetails'),
        meta: { 
          title: '帖子详情',
          keepAlive: true,
        },
      },
      {
        path: '/attentionFans',
        name: 'attentionFans',
        component: () => import('@/views/talentSide/attentionFans'),
        meta: { 
          title: '关注',
          // keepAlive: true,
        },
      },
      {
        path: '/JobDetails',
        name: 'JobDetails',
        component: () => import('@/views/talentSide/JobDetails'),
        meta: { 
          title: '岗位详情',
          // keepAlive: true,
        },
      },
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
