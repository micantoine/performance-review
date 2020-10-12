import AuthenticationService from '../middlewares/AuthenticationService';
import { SET_FLASH_MESSAGE, SET_USER } from './mutation-types';

export default {
  /**
   * Fetch identity of loggedin user
   */
  async fetchIdentity({ commit }) {
    const response = await AuthenticationService.identity();
    if (!response.success) {
      commit('SET_USER', null);
      return null;
    }
    commit('SET_USER', response.data.user);
    return response.data.user;
  },

  /**
   * Set FlashMessage
   * @param {Vuex} context the store methods/properties
   * @param {array} messages
   */
  setFlashMessage({ commit }, messages) {
    commit(SET_FLASH_MESSAGE, messages);
  },

  /**
   * Set User
   * @param {Vuex} context the store methods/properties
   * @param {object} user the user object data
   */
  setUser({ commit }, user) {
    commit(SET_USER, user);
  },
};
