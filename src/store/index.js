import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken } from '@/utils/auth';

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    // 存储token
    token:"",
    userName:"" // 可选
  },
  getters: {
    getToken(state){
      return state.token || getToken() || "";
    }
  },
  // 修改全局变量必须通过mutations中的方法
  mutations: {
    // 修改token，并将token存入localStorage
    setToken(state,token) {
      state.token = token;
      // localStorage.setItem('token', token);
      setToken(token)
      console.log('store、localstorage保存token成功！');
    },
    delToken(state) {
      state.token = "";
      // localStorage.removeItem("token");
      removeToken();
    },
     // 可选
     setUserInfo(state, userName) {
      state.userName = userName;
    }
  },
  // 异步方法用actions
  // actions不能直接修改全局变量，需要调用commit方法来触发mutations中的方法
  actions: {
  },
  modules: {
  }
})

export default store;