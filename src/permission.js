import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

import { bossSideRoutes } from '@/utils/bossSideRoutes' // 企业端路由
import { talentSideRoutes } from '@/utils/talentSideRoutes' // 人才端路由
const tag = localStorage.getItem('tag'); // 类型 企业、人才

// console.log(bossSideRoutes)
// console.log(talentSideRoutes)
// console.log(tag)


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/bossSignIn'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.staffName
      
      if (hasGetUserInfo) {
        next()
      } else {
        // user:人才端 company:企业端缓存
        let tag = localStorage.getItem('tag');
        if(tag == 'company' ){
          try {
            // get user info
            // await store.dispatch('user/getInfo')
            const {role_desc} = await store.dispatch('user/getStaffProfileInfo')
            // 在角色权限基础上生成动态路由表
            const accessedRoutes = await store.dispatch('generateRoutes',role_desc)
            console.log('accessedRoutes-->>',accessedRoutes);
            for( let i=0; i<accessedRoutes.length; i++){
              router.addRoute(accessedRoutes[i]);
            } // 添加路由
            next({...to,replace:true})
          } catch (error) {
            // remove token and go to login page to re-login
            // await store.dispatch('user/resetToken')
            next();
            NProgress.done()
          }
        }else{
          next()
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`);
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
