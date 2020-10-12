import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { SET_FLASH_MESSAGE, SET_USER } from './mutation-types';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['isUserLoggedIn', 'isAdmin'],
  })],
  state: {
    user: null,
    isUserLoggedIn: false,
    isAdmin: false,
    flashMessage: [],
  },
  getters: {
    isUserLoggedIn(state) {
      return state.isUserLoggedIn;
    },
    isAdmin(state) {
      return state.isAdmin;
    },
    me(state) {
      return state.user;
    },
  },
  mutations: {
    [SET_FLASH_MESSAGE](state, messages) {
      state.flashMessage = messages;
    },
    [SET_USER](state, user) {
      state.isUserLoggedIn = user !== null;
      state.isAdmin = user !== null && user.admin;
      state.user = user;
    },
  },
  actions,
});
