import { createApp } from "vue";
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
// Vue.use(ElementUI)



createApp(App).use(store).use(router).use(ElementUI).mount("#app");
