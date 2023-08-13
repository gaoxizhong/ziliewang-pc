import Vue from 'vue';
import Router from 'vue-router';
import { getToken } from '@/utils/auth'; // get token from cookie
Vue.use(Router);
import talentSide from '@/views/talentSide/Mian.vue';
import getPageTitle from '@/utils/get-page-title';

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { 
      title: '登录',
    },
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  // {
  //   path: "/",
  //   name: "HomeView",
  //   component:  () => import('@/views/HomeView'),
  // },
  {
    path: "/",
    component: talentSide,
    redirect: '/talentHome',
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
    ]
  },
];

const router = new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });
  
const whiteList = ['/login','/404']; // 添加路由白名单


//路由判断
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  if(hasToken){
      // 有路由表直接放行
      next();
  }else{
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单内直接放行
      next();
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面。
      next(`/login?redirect=${to.path}`);
    }
  }

  if(to.path == from.path ){
    // 让 列表页 即不缓存，刷新
    to.meta.keepAlive = false; 
  }
  next()
  document.title = getPageTitle(to.meta.title);

})
  



export default router;