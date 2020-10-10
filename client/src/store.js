import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isUserLoggedIn: false,
  },
  getters: {
    isUserLoggedIn(state) {
      return state.isUserLoggedIn;
    },
  },
  mutations: {
    setUser(state, user) {
      state.isUserLoggedIn = user !== null;
      state.user = user;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
  },
});
