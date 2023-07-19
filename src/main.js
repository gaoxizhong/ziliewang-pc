import Vue from 'vue'

import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// baseUrl = '/api
import axios from '@/axios/index';
import '@/styles/index.scss'; // global css


Vue.prototype.$axios = axios;
// set ElementUI lang to EN
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
new Vue({
  store,
  router,
  data: function(){ // 全局样式
    return {
      login_bgurl:{
        backgroundImage:'url(' + require('./assets/image/demo2.png') + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize: '100% 100%',
      },
    }
  },
  render: h => h(App)
}).$mount('#app')

