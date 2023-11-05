import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: localStorage.getItem('name') || 'text',
  staffName: localStorage.getItem('staff_name') || 'text', // 企业的个人姓名
  staffAvatar: localStorage.getItem('staffAvatar') || '', // 企业的个人头像
  realAvatar: localStorage.getItem('realAvatar') || '' // 用户端的个人头像
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_staffName: (state, staffName) => {
    state.staffName = staffName
  },
  SET_staffAvatar: (state, staffAvatar) => {
    state.staffAvatar = staffAvatar
  },
  SET_realAvatar: (state, realAvatar) => {
    state.realAvatar = realAvatar

  }
}

const actions = {

  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  set_realAvatar({ commit }, data) {
    commit('SET_realAvatar', data);
  },
  SET_NAME({ commit }, data) {
    commit('SET_NAME', data);
  },
  SET_staffName({ commit }, data) {
    commit('SET_staffName', data);
  },
  SET_staffAvatar({ commit }, data) {
    commit('SET_staffAvatar', data);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

