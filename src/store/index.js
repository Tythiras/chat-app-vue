import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user') || '',
    status: '',
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    }
  },
  mutations: {
    AUTH_REQUEST: (state) => {
      state.status = 'loading'
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    AUTH_ERROR: (state) => {
      state.status = 'Der skete en fejl ved login'
    },
    AUTH_LOGOUT: (state) => {
      state.status = 'Logged out'
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  actions: {
    AUTH_REQUEST: ({commit}, user) => {
      commit('AUTH_REQUEST')
      Vue.prototype.$socket.emit('auth', user);
    },
    AUTH_SUCCESS: ({commit, state}, token) => {
      commit('AUTH_SUCCESS')
      localStorage.setItem('user', token)
      state.token = token;
    },
    AUTH_FAILED: ({commit}) => {
      commit('AUTH_ERROR')
    },
    AUTH_LOGOUT: ({commit, state}) => {
      return new Promise((resolve) => {
        localStorage.removeItem('user')
        state.token = ''
        commit('AUTH_LOGOUT')
        resolve("tester")
      })
    }
  },
  modules: {
  }
})
