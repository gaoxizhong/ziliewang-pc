import Vue from 'vue';
import Router from 'vue-router';
import { getToken } from '@/utils/auth'; // get token from cookie

Vue.use(Router);

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  {
    path: "/",
    name: "home",
    component:  () => import('@/views/HomeView'),
  }

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

})
  



export default router;