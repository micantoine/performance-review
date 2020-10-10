import Vue from 'vue';
import Vuex from 'vuex';
import { SET_FLASH_MESSAGE, SET_USER } from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isUserLoggedIn: false,
    flashMessage: [],
  },
  getters: {
    isUserLoggedIn(state) {
      return state.isUserLoggedIn;
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
      state.user = user;
    },
  },
  actions: {
    setFlashMessage({ commit }, messages) {
      commit(SET_FLASH_MESSAGE, messages);
    },
    setUser({ commit }, user) {
      commit(SET_USER, user);
    },
  },
});
