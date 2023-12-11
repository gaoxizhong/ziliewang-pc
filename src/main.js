import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import './utils/rem'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import axios from '@/axios/index';

// 引入弹窗拖拽
import '@/utils/dialogDrag'

// 引入视频直播
import VueVideoPlayer from 'vue-video-player'
// 使用视频直播组件
Vue.use(VueVideoPlayer)

// 引入视频直播样式
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'



import vPreviewImage from 'v-preview-image'
Vue.use(vPreviewImage)



Vue.prototype.$axios = axios;

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想使用中文版，按以下声明
Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  data: function(){ // 全局样式
    return {
      login_bgurl_1:{
        backgroundImage:'url(' + require('./assets/image/demo2.png') + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize: '100% 100%',
      },
      login_bgurl_2:{
        backgroundImage:'url(' + require('./assets/image/bg_2.jpg') + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize: '100% 100%',
      },
      positionItems: {}, // 职位中心选中的信息
    }
  },
  render: h => h(App)
})
