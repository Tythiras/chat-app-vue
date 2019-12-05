import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user') || '',
    status: false,
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    }
  },
  mutations: {
    SOCKET_connect: (state) => {
      state.socket.isConnected = true;
      if(state.token) {
        //reiniziate socket connection with saved token
        Vue.prototype.$socket.emit('auth', {token: state.token});
      }
    },
    SOCKET_auth: (state, data) => {
      if(data.success===false&&router.currentRoute.name!='login') {
        localStorage.removeItem('user')
        state.token = ''
        router.push("/login")
      }
    },
    AUTH_REQUEST: (state) => {
      state.status = {content: 'Loading...', error: false}
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = {content: 'Success', error: false}
      state.token = token
    },
    AUTH_ERROR: (state) => {
      state.status = {content: 'Bruger ikke oprettet', error: true}
    },
    AUTH_LOGOUT: (state) => {
      state.status = false
    },
    CREATION_REQUEST: (state) => {
      state.status = {content: 'Loading...', error: false}
    },
    CREATION_SUCCESS: (state) => {
      state.status = {content: 'Du kan nu logge ind', error: false}
    },
    CREATION_ERROR: (state) => {
      state.status = {content: 'Der skete en fejl ved oprettelsen', error: true}
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  actions: {
    CREATION_REQUEST: ({commit}, user) => {
      commit('CREATION_REQUEST');
      Vue.prototype.$socket.emit('creation', user);
    },
    CREATION_SUCCESS: ({commit}) => {
      commit('CREATION_SUCCESS');
    },
    CREATION_ERROR: ({commit}) => {
      commit('CREATION_ERROR');
    },
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
        resolve()
      })
    }
  },
  modules: {
  }
})
