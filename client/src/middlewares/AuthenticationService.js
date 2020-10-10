/* eslint-disable consistent-return */
import Api from './Api';
import Cookie from './Cookie';
import checkCredentials from '../utils/checkCredentials';

export default {
  /**
   * Login
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    const credentialsStatus = checkCredentials(email, password);

    if (!credentialsStatus.success) {
      return credentialsStatus;
    }

    try {
      const response = await Api('login', { method: 'POST' }, {
        email,
        password,
      });

      if (!response.success) {
        return response;
      }

      if (response.success) {
        Cookie.set('token', response.data.token);
        return {
          ...response,
        };
      }
    } catch (errors) {
      return {
        errors,
        messages: [],
      };
    }
  },

  /**
   * Register
   * @param {string} email
   * @param {string} password
   */
  async register(email, password) {
    const credentialsStatus = checkCredentials(email, password);

    if (!credentialsStatus.success) {
      return credentialsStatus;
    }

    try {
      const response = await Api('register', { method: 'POST' }, {
        email,
        password,
      });

      if (!response.success) {
        return response;
      }

      if (response.success) {
        Cookie.set('token', response.data.token);
        return {
          success: true,
          ...response.data,
        };
      }
    } catch (errors) {
      return {
        errors,
        success: false,
        messages: [],
      };
    }
  },
};
